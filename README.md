# AI Agent Online Directory

A production-ready e-commerce marketplace that connects businesses with AI agent solutions through pre-built software listings and custom development matching.

## 🚀 Features

### Core Functionality
- **Browse & Search Marketplace** - Discover and filter 10+ verified AI agents
- **Advanced Filtering** - Filter by category, industry, price range, and technical difficulty
- **Agent Detail Pages** - Comprehensive information with tabs for overview, pricing, features, and reviews
- **Affiliate Click Tracking** - 60-day cookie-based attribution system
- **Agent Comparison** - Side-by-side comparison of up to 3 agents
- **Custom Build Requests** - Multi-step form with intelligent lead scoring (0-100)
- **Responsive Design** - Mobile-first, works beautifully on all devices

### Business Model
- **Dual Monetization**:
  - Affiliate commissions from pre-built agent links
  - Referral fees from custom development projects
- **Lead Scoring Algorithm** - Automatically prioritizes high-value leads based on budget, company size, timeline, and project complexity

## 📋 Prerequisites

- **Node.js** 20+ 
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)
- **Supabase account** (for future production database)

## 🛠️ Installation

### 1. Clone & Install Dependencies

```bash
# Navigate to project directory
cd ai-agent-directory

# Install dependencies
npm install
# or
yarn install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```bash
# MongoDB Connection (Required)
MONGO_URL=mongodb://localhost:27017
DB_NAME=ai_agent_directory

# Site Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
CORS_ORIGINS=*

# Email Service (Currently Mocked - Optional for Phase 2)
# RESEND_API_KEY=your_resend_api_key
# ADMIN_EMAIL=admin@yourdomain.com

# Supabase (Optional - For Phase 2)
# NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
# SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Database Setup

#### Option A: Local MongoDB
```bash
# Start MongoDB locally
mongod --dbpath /path/to/data

# Or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

#### Option B: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Update `MONGO_URL` in `.env`

### 4. Seed Database

```bash
# Run seed script to populate 10 agents with reviews
npm run seed
# or
yarn seed
```

Expected output:
```
✅ Seed completed successfully!
Inserted 10 agents
Inserted 38 reviews
```

### 5. Start Development Server

```bash
npm run dev
# or
yarn dev
```

Visit http://localhost:3000

## 📁 Project Structure

```
/
├── app/
│   ├── api/[[...path]]/route.js    # API routes (agents, custom-request, track-click)
│   ├── page.js                      # Homepage
│   ├── layout.js                    # Root layout with header/footer
│   ├── browse/page.js               # Browse agents with filters
│   ├── agents/[slug]/page.js        # Agent detail page
│   ├── custom-request/page.js       # Multi-step custom request form
│   ├── compare/page.js              # Side-by-side agent comparison
│   ├── about/page.js                # About page
│   ├── resources/page.js            # Resources & guides
│   └── globals.css                  # Global styles
├── components/
│   ├── ui/                          # Shadcn/ui components
│   ├── agents/                      # Agent-specific components
│   │   └── AgentCard.jsx           # Reusable agent card
│   ├── layout/                      # Layout components
│   │   ├── Header.jsx              # Site header with navigation
│   │   └── Footer.jsx              # Site footer
│   └── shared/                      # Shared components
│       └── RatingStars.jsx         # Star rating display
├── lib/
│   ├── mongodb.js                   # MongoDB connection
│   ├── models/                      # Mongoose models
│   │   ├── Agent.js
│   │   ├── CustomRequest.js
│   │   ├── AffiliateClick.js
│   │   └── Review.js
│   ├── utils/
│   │   └── leadScoring.js          # Lead scoring algorithm
│   ├── schemas/
│   │   └── customRequest.js        # Zod validation schemas
│   ├── email.js                     # Email service (mocked)
│   └── utils.js                     # Utility functions
├── scripts/
│   └── seed.js                      # Database seeding script
├── public/                          # Static assets
├── .env                             # Environment variables
├── .env.example                     # Example environment file
├── package.json                     # Dependencies
├── tailwind.config.js               # Tailwind configuration
└── README.md                        # This file
```

## 🗄️ Database Schema

### Agents Collection
```javascript
{
  id: String (UUID),
  name: String,
  slug: String (unique),
  provider: String,
  logo_url: String,
  short_description: String,
  long_description: String,
  category: [String],
  industry_fit: [String],
  pricing_model: String,
  price_from: Number (in cents),
  features: [String],
  benefits: {
    time_saved: String,
    cost_reduction: String,
    customer_satisfaction: String,
    roi_timeline: String
  },
  setup_time: String,
  technical_difficulty: String,
  integration_options: [String],
  affiliate_link: String,
  pricing_tiers: [{
    name: String,
    price: Number,
    features: [String]
  }],
  average_rating: Number,
  review_count: Number,
  verified: Boolean,
  featured: Boolean,
  published: Boolean
}
```

### Custom Requests Collection
```javascript
{
  id: String (UUID),
  status: String ('new', 'reviewing', 'matched', 'quoted', 'closed'),
  company_name: String,
  contact_name: String,
  email: String,
  company_size: String,
  industry: String,
  problem_description: String,
  use_case: [String],
  integrations_needed: [String],
  budget_range: String,
  timeline: String,
  lead_score: Number (0-100)
}
```

### Affiliate Clicks Collection
```javascript
{
  id: String (UUID),
  agent_id: String,
  session_id: String,
  referrer: String,
  clicked_at: Date
}
```

### Reviews Collection
```javascript
{
  id: String (UUID),
  agent_id: String,
  user_name: String,
  rating: Number (1-5),
  title: String,
  content: String,
  company_size: String,
  verified: Boolean,
  created_at: Date
}
```

## 🔌 API Endpoints

### GET /api/agents
List agents with filtering, search, and pagination.

**Query Parameters:**
- `category` - Comma-separated categories
- `industry` - Comma-separated industries
- `price` - Price range (free, under-100, 100-500, 500-1000, 1000-plus, custom)
- `difficulty` - Comma-separated difficulties
- `search` - Text search
- `sort` - Sort order (popular, rating, price-low, price-high, newest)
- `page` - Page number
- `limit` - Results per page

**Response:**
```json
{
  \"agents\": [...],
  \"pagination\": {
    \"page\": 1,
    \"limit\": 12,
    \"total\": 10,
    \"pages\": 1
  }
}
```

### GET /api/agents/:slug
Get single agent details with reviews and similar agents.

**Response:**
```json
{
  \"agent\": {...},
  \"reviews\": [...],
  \"similarAgents\": [...]
}
```

### POST /api/custom-request
Submit custom build request with automatic lead scoring.

**Request Body:**
```json
{
  \"company_name\": \"Acme Inc.\",
  \"contact_name\": \"John Doe\",
  \"email\": \"john@acme.com\",
  \"company_size\": \"51-200\",
  \"industry\": \"SaaS/Technology\",
  \"problem_description\": \"...\",
  \"use_case\": [\"Customer Support Automation\"],
  \"integrations_needed\": [\"CRM (Salesforce, HubSpot)\"],
  \"budget_range\": \"$30,000 - $75,000\",
  \"timeline\": \"2-3 months\",
  \"previous_ai_experience\": \"No, this is our first\"
}
```

**Response:**
```json
{
  \"success\": true,
  \"requestId\": \"uuid\",
  \"leadScore\": 75,
  \"message\": \"Your request has been submitted successfully...\"
}
```

### POST /api/track-click
Track affiliate link clicks for attribution.

**Request Body:**
```json
{
  \"agentId\": \"uuid\",
  \"sessionId\": \"sess_xxx\",
  \"referrer\": \"https://example.com\"
}
```

### GET /api/compare?agents=id1,id2,id3
Get multiple agents for comparison.

## 🧪 Testing

### Test API Endpoints

```bash
# List all agents
curl http://localhost:3000/api/agents

# Get specific agent
curl http://localhost:3000/api/agents/intercom-ai-chatbot

# Search agents
curl \"http://localhost:3000/api/agents?search=customer%20support\"

# Filter by category
curl \"http://localhost:3000/api/agents?category=Customer+Support\"

# Submit custom request
curl -X POST http://localhost:3000/api/custom-request \
  -H \"Content-Type: application/json\" \
  -d '{\"company_name\":\"Test\",\"contact_name\":\"John\",\"email\":\"test@test.com\",\"company_size\":\"11-50\",\"industry\":\"SaaS/Technology\",\"problem_description\":\"Test problem description that is longer than 100 characters to meet the minimum requirement for this field\",\"use_case\":[\"Customer Support Automation\"],\"integrations_needed\":[\"CRM (Salesforce, HubSpot)\"],\"budget_range\":\"$30,000 - $75,000\",\"timeline\":\"2-3 months\",\"previous_ai_experience\":\"No, this is our first\"}'
```

### Test User Flows

1. **Browse → Detail → Affiliate Click**
   - Go to /browse
   - Click on an agent
   - Click \"Get Started\" button
   - Verify click is tracked in database

2. **Custom Request → Lead Scoring**
   - Go to /custom-request
   - Fill out 3-step form
   - Submit
   - Check MongoDB for lead_score field

3. **Comparison**
   - Go to /browse
   - Check \"Compare\" on 2-3 agents
   - Click \"Compare Now\"
   - View side-by-side comparison

## 🚀 Deployment

### Option 1: Netlify (Recommended)

#### Step 1: Prepare Repository
```bash
git init
git add .
git commit -m \"Initial commit\"
git remote add origin https://github.com/yourusername/ai-agent-directory.git
git push -u origin main
```

#### Step 2: Connect to Netlify
1. Go to https://app.netlify.com
2. Click \"New site from Git\"
3. Choose your repository
4. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`

#### Step 3: Set Environment Variables
In Netlify dashboard → Site settings → Environment variables, add:
```
MONGO_URL=your_mongodb_atlas_url
DB_NAME=ai_agent_directory
NEXT_PUBLIC_BASE_URL=https://your-site.netlify.app
```

#### Step 4: Deploy
Click \"Deploy site\" - done!

### Option 2: Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add MONGO_URL
vercel env add NEXT_PUBLIC_BASE_URL

# Deploy to production
vercel --prod
```

### Option 3: Docker

```dockerfile
# Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD [\"npm\", \"start\"]
```

```bash
docker build -t ai-agent-directory .
docker run -p 3000:3000 --env-file .env ai-agent-directory
```

## 📧 Email Integration (Phase 2)

Currently, email notifications are mocked with `console.log`. To integrate Resend:

### Step 1: Install Resend
```bash
npm install resend
```

### Step 2: Get API Key
1. Sign up at https://resend.com
2. Create API key
3. Add to `.env`: `RESEND_API_KEY=re_xxxxx`

### Step 3: Update `lib/email.js`
```javascript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendCustomRequestConfirmation(data) {
  return await resend.emails.send({
    from: 'noreply@yourdomain.com',
    to: data.email,
    subject: 'We received your AI Agent request',
    html: `<h1>Thank you, ${data.contact_name}!</h1>...`
  });
}

// Update other functions similarly
```

## 🔐 Supabase Setup (Phase 2 - Authentication)

### Step 1: Create Supabase Project
1. Go to https://supabase.com
2. Click \"New Project\"
3. Choose organization and region
4. Set database password

### Step 2: Get Credentials
Go to Project Settings → API:
- Copy `URL` → `NEXT_PUBLIC_SUPABASE_URL`
- Copy `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Copy `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

### Step 3: Run SQL Schema
Go to SQL Editor and run:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";

-- Agents table
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  provider VARCHAR(255) NOT NULL,
  -- Add all other fields from MongoDB schema
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_agents_slug ON agents(slug);
CREATE INDEX idx_agents_published ON agents(published) WHERE published = true;

-- Repeat for other tables (custom_requests, affiliate_clicks, reviews)
```

### Step 4: Migrate from MongoDB
Create migration script to transfer data from MongoDB to Supabase.

## 🔄 Future Enhancements

### Recommended Phase 2 Features
1. **User Authentication** (Supabase Auth)
   - User accounts
   - Save favorite agents
   - Write reviews
   - Track custom request history

2. **Admin Dashboard**
   - Manage agents
   - View lead submissions
   - Respond to custom requests
   - Analytics dashboard

3. **Partner Portal**
   - Development partner logins
   - View matched leads
   - Submit quotes
   - Project management

4. **Advanced Features**
   - AI-powered agent recommendations
   - Live chat support
   - Webhooks for real-time notifications
   - Advanced analytics and reporting

5. **Real Affiliate Integration**
   - Replace placeholder links
   - Integrate with Impact, ShareASale, etc.
   - Conversion tracking
   - Commission reporting

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongosh

# If using Docker
docker ps | grep mongo

# Check connection string format
# mongodb://localhost:27017 (local)
# mongodb+srv://user:pass@cluster.mongodb.net/db (Atlas)
```

### Seed Script Fails
```bash
# Ensure MONGO_URL is set
echo $MONGO_URL

# Run with explicit environment
MONGO_URL=mongodb://localhost:27017 node scripts/seed.js
```

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

## 📝 License

This project is proprietary and confidential.

## 🤝 Support

For questions or issues:
- Email: support@agentdirectory.online
- Documentation: https://docs.agentdirectory.online

---

Built with Next.js 14, MongoDB, Tailwind CSS, and shadcn/ui.
