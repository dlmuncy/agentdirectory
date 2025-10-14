import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb.js';
import Agent from '../../../lib/models/Agent.js';
import CustomRequest from '../../../lib/models/CustomRequest.js';
import AffiliateClick from '../../../lib/models/AffiliateClick.js';
import Review from '../../../lib/models/Review.js';
import { calculateLeadScore } from '../../../lib/utils/leadScoring.js';
import { sendCustomRequestConfirmation, sendAdminLeadAlert } from '../../../lib/email.js';

// Helper to parse path segments
function parsePath(pathname) {
  const segments = pathname.replace('/api/', '').split('/').filter(Boolean);
  return segments;
}

// Helper function to handle CORS
function handleCORS(response) {
  response.headers.set('Access-Control-Allow-Origin', process.env.CORS_ORIGINS || '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  return response
}

// OPTIONS handler for CORS
export async function OPTIONS() {
  return handleCORS(new NextResponse(null, { status: 200 }))
}

// GET handler
export async function GET(request) {
  const { pathname, searchParams } = new URL(request.url);
  const segments = parsePath(pathname);
  
  try {
    await connectDB();
    
    // GET /api or /api/ - Root endpoint
    if (segments.length === 0) {
      return handleCORS(NextResponse.json({ message: 'AI Agent Directory API v1.0' }));
    }
    
    // GET /api/agents - List agents with filters
    if (segments[0] === 'agents' && segments.length === 1) {
      // Extract query parameters
      const category = searchParams.get('category');
      const industry = searchParams.get('industry');
      const priceRange = searchParams.get('price');
      const features = searchParams.get('features');
      const difficulty = searchParams.get('difficulty');
      const search = searchParams.get('search');
      const sort = searchParams.get('sort') || 'popular';
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '12');
      
      // Build filter query
      const filter = { published: true };
      
      if (category) {
        const categories = category.split(',');
        filter.category = { $in: categories };
      }
      
      if (industry) {
        const industries = industry.split(',');
        filter.industry_fit = { $in: industries };
      }
      
      if (priceRange) {
        if (priceRange === 'free') {
          filter.price_from = 0;
        } else if (priceRange === 'under-100') {
          filter.price_from = { $lt: 10000 };
        } else if (priceRange === '100-500') {
          filter.price_from = { $gte: 10000, $lt: 50000 };
        } else if (priceRange === '500-1000') {
          filter.price_from = { $gte: 50000, $lt: 100000 };
        } else if (priceRange === '1000-plus') {
          filter.price_from = { $gte: 100000 };
        } else if (priceRange === 'custom') {
          filter.pricing_model = 'custom';
        }
      }
      
      if (difficulty) {
        const difficulties = difficulty.split(',');
        filter.technical_difficulty = { $in: difficulties };
      }
      
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { short_description: { $regex: search, $options: 'i' } },
          { long_description: { $regex: search, $options: 'i' } }
        ];
      }
      
      // Build sort query
      let sortQuery = {};
      if (sort === 'popular') {
        sortQuery = { review_count: -1, average_rating: -1 };
      } else if (sort === 'rating') {
        sortQuery = { average_rating: -1, review_count: -1 };
      } else if (sort === 'price-low') {
        sortQuery = { price_from: 1 };
      } else if (sort === 'price-high') {
        sortQuery = { price_from: -1 };
      } else if (sort === 'newest') {
        sortQuery = { created_at: -1 };
      }
      
      // Execute query with pagination
      const skip = (page - 1) * limit;
      const agents = await Agent.find(filter)
        .sort(sortQuery)
        .skip(skip)
        .limit(limit)
        .lean();
      
      const total = await Agent.countDocuments(filter);
      
      return handleCORS(NextResponse.json({
        agents,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }));
    }
    
    // GET /api/agents/:slug - Get single agent
    if (segments[0] === 'agents' && segments.length === 2) {
      const slug = segments[1];
      const agent = await Agent.findOne({ slug, published: true }).lean();
      
      if (!agent) {
        return handleCORS(NextResponse.json({ error: 'Agent not found' }, { status: 404 }));
      }
      
      // Get reviews for this agent
      const reviews = await Review.find({ agent_id: agent.id })
        .sort({ created_at: -1 })
        .lean();
      
      // Get similar agents (same category, different slug)
      const similarAgents = await Agent.find({
        category: { $in: agent.category },
        slug: { $ne: slug },
        published: true
      })
        .limit(3)
        .lean();
      
      return handleCORS(NextResponse.json({
        agent,
        reviews,
        similarAgents
      }));
    }
    
    // GET /api/reviews/:agentId - Get reviews for agent
    if (segments[0] === 'reviews' && segments.length === 2) {
      const agentId = segments[1];
      const sort = searchParams.get('sort') || 'recent';
      
      let sortQuery = { created_at: -1 };
      if (sort === 'rating-high') {
        sortQuery = { rating: -1, created_at: -1 };
      } else if (sort === 'rating-low') {
        sortQuery = { rating: 1, created_at: -1 };
      }
      
      const reviews = await Review.find({ agent_id: agentId })
        .sort(sortQuery)
        .lean();
      
      return handleCORS(NextResponse.json({ reviews }));
    }
    
    // GET /api/compare - Compare multiple agents
    if (segments[0] === 'compare') {
      const agentIds = searchParams.get('agents')?.split(',') || [];
      
      if (agentIds.length === 0 || agentIds.length > 3) {
        return handleCORS(NextResponse.json({ error: 'Provide 1-3 agent IDs' }, { status: 400 }));
      }
      
      const agents = await Agent.find({ id: { $in: agentIds }, published: true }).lean();
      
      return handleCORS(NextResponse.json({ agents }));
    }
    
    // GET /api/categories - Get categories with agent counts
    if (segments[0] === 'categories') {
      const categories = await Agent.aggregate([
        { $match: { published: true } },
        { $unwind: '$category' },
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);
      
      return handleCORS(NextResponse.json({ categories }));
    }
    
    return handleCORS(NextResponse.json({ error: 'Not found' }, { status: 404 }));
    
  } catch (error) {
    console.error('API Error:', error);
    return handleCORS(NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 }));
  }
}

// POST handler
export async function POST(request) {
  const { pathname } = new URL(request.url);
  const segments = parsePath(pathname);
  
  try {
    await connectDB();
    
    // POST /api/custom-request - Submit custom build request
    if (segments[0] === 'custom-request') {
      const data = await request.json();
      
      // Calculate lead score
      const leadScore = calculateLeadScore(data);
      
      // Create custom request
      const customRequest = await CustomRequest.create({
        id: crypto.randomUUID(),
        ...data,
        lead_score: leadScore,
        status: 'new'
      });
      
      // Send confirmation email (mocked)
      await sendCustomRequestConfirmation(data);
      
      // Send admin alert for high-quality leads
      if (leadScore >= 80) {
        await sendAdminLeadAlert(data, leadScore);
      }
      
      return handleCORS(NextResponse.json({
        success: true,
        requestId: customRequest.id,
        leadScore,
        message: 'Your request has been submitted successfully. We\'ll be in touch within 24-48 hours.'
      }));
    }
    
    // POST /api/track-click - Track affiliate click
    if (segments[0] === 'track-click') {
      const { agentId, sessionId, referrer } = await request.json();
      
      if (!agentId) {
        return handleCORS(NextResponse.json({ error: 'Agent ID required' }, { status: 400 }));
      }
      
      // Create affiliate click record
      const click = await AffiliateClick.create({
        id: crypto.randomUUID(),
        agent_id: agentId,
        session_id: sessionId || 'anonymous',
        referrer: referrer || '',
        clicked_at: new Date()
      });
      
      // Generate cookie data for 60-day attribution
      const cookieData = {
        clickId: click.id,
        agentId,
        timestamp: Date.now(),
        expires: Date.now() + (60 * 24 * 60 * 60 * 1000) // 60 days
      };
      
      return handleCORS(NextResponse.json({
        success: true,
        clickId: click.id,
        cookieData
      }));
    }
    
    return handleCORS(NextResponse.json({ error: 'Not found' }, { status: 404 }));
    
  } catch (error) {
    console.error('API Error:', error);
    return handleCORS(NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 }));
  }
}

export const PUT = GET;
export const DELETE = GET;
export const PATCH = GET;