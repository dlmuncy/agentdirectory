import connectDB from '../lib/mongodb.js';
import Agent from '../lib/models/Agent.js';
import Review from '../lib/models/Review.js';

const agents = [
  {
    id: crypto.randomUUID(),
    name: 'Intercom AI Chatbot',
    slug: 'intercom-ai-chatbot',
    provider: 'Intercom',
    logo_url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=200&fit=crop',
    short_description: 'AI-powered customer support chatbot that resolves 50% of queries instantly',
    long_description: 'Intercom\'s AI Chatbot uses advanced natural language processing to understand customer intent and provide instant, accurate responses. It seamlessly escalates complex issues to human agents while learning from every interaction to improve over time. Perfect for SaaS companies and e-commerce businesses looking to scale support without scaling headcount.',
    category: ['Customer Support', 'Sales'],
    industry_fit: ['SaaS', 'E-commerce', 'B2B'],
    pricing_model: 'subscription',
    price_from: 9900,
    price_currency: 'USD',
    features: [
      '24/7 automated customer support',
      'Natural language understanding',
      'Seamless handoff to human agents',
      'Multi-language support (40+ languages)',
      'Custom conversation flows',
      'CRM integration',
      'Advanced analytics dashboard',
      'Mobile app support'
    ],
    benefits: {
      time_saved: '15 hours per week on support',
      cost_reduction: 'Up to 50% reduction in support costs',
      customer_satisfaction: '4.8/5 average rating',
      roi_timeline: 'Positive ROI within 2-3 months'
    },
    setup_time: '2-3 hours',
    technical_difficulty: 'Low',
    integration_options: ['Slack', 'Salesforce', 'HubSpot', 'Stripe', 'Shopify'],
    affiliate_link: 'https://example-partner.com/affiliate?ref=agentdirectory&agent=intercom-ai-chatbot',
    commission_rate: 0.20,
    cookie_duration: 60,
    demo_video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    screenshots: [],
    meta_title: 'Intercom AI Chatbot - Automated Customer Support',
    meta_description: 'AI-powered customer support that resolves 50% of queries instantly. Perfect for SaaS and e-commerce.',
    verified: true,
    featured: true,
    published: true,
    pricing_tiers: [
      { name: 'Starter', price: 99, features: ['Up to 1,000 conversations/mo', 'Basic analytics', 'Email support'] },
      { name: 'Pro', price: 499, features: ['Up to 10,000 conversations/mo', 'Advanced analytics', 'Priority support', 'Custom branding'] },
      { name: 'Enterprise', price: 999, features: ['Unlimited conversations', 'Dedicated account manager', 'Custom integrations', 'SLA guarantee'] }
    ],
    average_rating: 4.8,
    review_count: 247
  },
  {
    id: crypto.randomUUID(),
    name: 'Drift Conversational AI',
    slug: 'drift-conversational-ai',
    provider: 'Drift',
    logo_url: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=200&h=200&fit=crop',
    short_description: 'Convert website visitors into qualified leads with AI-powered conversations',
    long_description: 'Drift combines chatbots, live chat, and video into one powerful conversational marketing platform. The AI identifies high-intent visitors and engages them with personalized conversations that book meetings, answer questions, and route leads to the right sales rep. Built specifically for B2B sales teams.',
    category: ['Sales', 'Marketing Automation'],
    industry_fit: ['B2B', 'SaaS', 'Enterprise'],
    pricing_model: 'subscription',
    price_from: 250000,
    price_currency: 'USD',
    features: [
      'Intent-based targeting',
      'Automated meeting scheduling',
      'Lead qualification scoring',
      'Video messaging',
      'Account-based marketing',
      'Salesforce native integration',
      'Real-time notifications',
      'Conversation intelligence'
    ],
    benefits: {
      time_saved: '20 hours per week for sales team',
      cost_reduction: '3x improvement in lead conversion',
      customer_satisfaction: 'N/A',
      roi_timeline: 'Positive ROI within 1-2 months'
    },
    setup_time: '1-2 days',
    technical_difficulty: 'Medium',
    integration_options: ['Salesforce', 'HubSpot', 'Marketo', 'Slack', 'Zapier'],
    affiliate_link: 'https://example-partner.com/affiliate?ref=agentdirectory&agent=drift-conversational-ai',
    commission_rate: 0.25,
    cookie_duration: 60,
    demo_video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    screenshots: [],
    meta_title: 'Drift Conversational AI - B2B Sales Automation',
    meta_description: 'Convert website visitors into qualified leads with AI-powered conversations. Built for B2B.',
    verified: true,
    featured: true,
    published: true,
    pricing_tiers: [
      { name: 'Premium', price: 2500, features: ['Up to 100 conversations/mo', 'Email routing', 'Basic integrations'] },
      { name: 'Advanced', price: 5000, features: ['Unlimited conversations', 'Video chat', 'Advanced integrations', 'Custom playbooks'] },
      { name: 'Enterprise', price: 0, features: ['Custom pricing', 'Dedicated CSM', 'API access', 'Priority support'] }
    ],
    average_rating: 4.6,
    review_count: 189
  },
  {
    id: crypto.randomUUID(),
    name: 'Jasper AI',
    slug: 'jasper-ai',
    provider: 'Jasper',
    logo_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&h=200&fit=crop',
    short_description: 'AI content creation for marketing teams - blog posts, ads, emails, and more',
    long_description: 'Jasper is an AI writing assistant that helps marketing teams create high-quality content 5x faster. From long-form blog posts to social media ads, Jasper learns your brand voice and generates on-brand content in seconds. Includes built-in SEO optimization, plagiarism checking, and collaboration features.',
    category: ['Content Creation', 'Marketing Automation'],
    industry_fit: ['Marketing', 'E-commerce', 'SaaS', 'Agency'],
    pricing_model: 'subscription',
    price_from: 4900,
    price_currency: 'USD',
    features: [
      'Long-form content generation',
      '50+ content templates',
      'Brand voice customization',
      'SEO mode with keyword optimization',
      'Plagiarism checker',
      'Team collaboration',
      'Multi-language support (25+ languages)',
      'Chrome extension'
    ],
    benefits: {
      time_saved: '10 hours per week on content creation',
      cost_reduction: '70% reduction in content production costs',
      customer_satisfaction: 'N/A',
      roi_timeline: 'Immediate value from day 1'
    },
    setup_time: '15 minutes',
    technical_difficulty: 'Low',
    integration_options: ['Surfer SEO', 'Grammarly', 'WordPress', 'Google Docs', 'Webflow'],
    affiliate_link: 'https://example-partner.com/affiliate?ref=agentdirectory&agent=jasper-ai',
    commission_rate: 0.30,
    cookie_duration: 60,
    demo_video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    screenshots: [],
    meta_title: 'Jasper AI - AI Content Creation for Marketing',
    meta_description: 'Create blog posts, ads, and emails 5x faster with AI. Built for marketing teams.',
    verified: true,
    featured: true,
    published: true,
    pricing_tiers: [
      { name: 'Creator', price: 49, features: ['50,000 words/mo', '50+ templates', '1 user'] },
      { name: 'Teams', price: 125, features: ['Unlimited words', 'All features', '3 users', 'Brand voice'] },
      { name: 'Business', price: 499, features: ['Everything in Teams', 'Unlimited users', 'API access', 'Dedicated support'] }
    ],
    average_rating: 4.7,
    review_count: 312
  },
  {
    id: crypto.randomUUID(),
    name: 'Ada Customer Service',
    slug: 'ada-customer-service',
    provider: 'Ada',
    logo_url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=200&h=200&fit=crop',
    short_description: 'Enterprise-grade AI customer service platform for global brands',
    long_description: 'Ada is the enterprise AI customer service platform trusted by global brands. It handles complex customer journeys across chat, email, SMS, and voice with enterprise-grade security and compliance. Ada\'s no-code builder lets non-technical teams create sophisticated automation without developer resources.',
    category: ['Customer Support'],
    industry_fit: ['Enterprise', 'Financial Services', 'Healthcare', 'E-commerce'],
    pricing_model: 'custom',
    price_from: 0,
    price_currency: 'USD',
    features: [
      'No-code conversation builder',
      'Omnichannel support (chat, email, SMS, voice)',
      'Enterprise security & compliance',
      'Advanced analytics & reporting',
      'A/B testing',
      'Multilingual support (100+ languages)',
      'API & webhooks',
      'White-label options'
    ],
    benefits: {
      time_saved: 'Automate 70% of support inquiries',
      cost_reduction: '$1.2M average annual savings',
      customer_satisfaction: '92% CSAT score',
      roi_timeline: 'Positive ROI within 3-6 months'
    },
    setup_time: '1-2 weeks',
    technical_difficulty: 'Medium',
    integration_options: ['Zendesk', 'Salesforce', 'Shopify', 'Kustomer', 'Microsoft Dynamics'],
    affiliate_link: 'https://example-partner.com/affiliate?ref=agentdirectory&agent=ada-customer-service',
    commission_rate: 0.15,
    cookie_duration: 60,
    demo_video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    screenshots: [],
    meta_title: 'Ada Customer Service - Enterprise AI Support',
    meta_description: 'Enterprise AI customer service platform trusted by global brands. Automate 70% of inquiries.',
    verified: true,
    featured: false,
    published: true,
    pricing_tiers: [
      { name: 'Enterprise', price: 0, features: ['Custom pricing based on volume', 'Dedicated implementation team', 'Custom integrations', 'SLA guarantee'] }
    ],
    average_rating: 4.9,
    review_count: 87
  },
  {
    id: crypto.randomUUID(),
    name: 'Copy.ai',
    slug: 'copy-ai',
    provider: 'Copy.ai',
    logo_url: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=200&h=200&fit=crop',
    short_description: 'AI copywriting tool for social media, ads, and website content',
    long_description: 'Copy.ai makes it easy to create compelling copy for any platform. Whether you need Facebook ads, Instagram captions, product descriptions, or email subject lines, Copy.ai generates dozens of variations in seconds. Perfect for small businesses and solopreneurs who need professional copy without hiring a copywriter.',
    category: ['Content Creation', 'Marketing Automation'],
    industry_fit: ['Small Business', 'E-commerce', 'Marketing', 'Agency'],
    pricing_model: 'subscription',
    price_from: 4900,
    price_currency: 'USD',
    features: [
      '90+ copywriting tools',
      'Social media content generator',
      'Ad copy variations',
      'Product descriptions',
      'Email subject lines',
      'Blog post intros & outlines',
      'Tone adjustment',
      'Browser extension'
    ],
    benefits: {
      time_saved: '5-8 hours per week on copywriting',
      cost_reduction: 'Save $2,000+/mo vs. hiring copywriter',
      customer_satisfaction: 'N/A',
      roi_timeline: 'Immediate - pay for 1 month, cancel anytime'
    },
    setup_time: '5 minutes',
    technical_difficulty: 'Low',
    integration_options: ['Chrome', 'WordPress', 'Shopify'],
    affiliate_link: 'https://example-partner.com/affiliate?ref=agentdirectory&agent=copy-ai',
    commission_rate: 0.30,
    cookie_duration: 60,
    demo_video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    screenshots: [],
    meta_title: 'Copy.ai - AI Copywriting Tool',
    meta_description: 'Create compelling copy for ads, social media, and websites in seconds. Perfect for small businesses.',
    verified: true,
    featured: false,
    published: true,
    pricing_tiers: [
      { name: 'Free', price: 0, features: ['2,000 words/mo', 'Basic tools', '1 user'] },
      { name: 'Pro', price: 49, features: ['Unlimited words', 'All 90+ tools', '5 users', 'Priority support'] },
      { name: 'Team', price: 249, features: ['Everything in Pro', 'Unlimited users', 'Brand voice', 'API access'] }
    ],
    average_rating: 4.5,
    review_count: 421
  },
  {
    id: crypto.randomUUID(),
    name: 'Zendesk AI',
    slug: 'zendesk-ai',
    provider: 'Zendesk',
    logo_url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=200&h=200&fit=crop',
    short_description: 'AI-powered help desk with smart ticket routing and automated responses',
    long_description: 'Zendesk AI enhances your existing help desk with intelligent automation. It automatically categorizes and routes tickets, suggests responses to agents, and provides instant answers to common questions. Integrates seamlessly with the Zendesk Suite for a complete customer service solution.',
    category: ['Customer Support'],
    industry_fit: ['SaaS', 'E-commerce', 'B2B', 'Enterprise'],
    pricing_model: 'subscription',
    price_from: 5500,
    price_currency: 'USD',
    features: [
      'Intelligent ticket routing',
      'Auto-response suggestions',
      'Knowledge base AI',
      'Sentiment analysis',
      'Macro suggestions',
      'CSAT prediction',
      'Multi-channel support',
      'Mobile app'
    ],
    benefits: {
      time_saved: '12 hours per week per agent',
      cost_reduction: '25% improvement in first response time',
      customer_satisfaction: '89% CSAT average',
      roi_timeline: 'Positive ROI within 2-4 months'
    },
    setup_time: '3-5 hours',
    technical_difficulty: 'Low',
    integration_options: ['Slack', 'Jira', 'Salesforce', 'Shopify', 'Mailchimp'],
    affiliate_link: 'https://example-partner.com/affiliate?ref=agentdirectory&agent=zendesk-ai',
    commission_rate: 0.20,
    cookie_duration: 60,
    demo_video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    screenshots: [],
    meta_title: 'Zendesk AI - Smart Help Desk Automation',
    meta_description: 'AI-powered help desk with smart ticket routing and automated responses.',
    verified: true,
    featured: false,
    published: true,
    pricing_tiers: [
      { name: 'Suite Team', price: 55, features: ['Basic AI features', 'Email support', '5 agents'] },
      { name: 'Suite Growth', price: 89, features: ['Advanced AI', 'All channels', 'Unlimited agents'] },
      { name: 'Suite Professional', price: 115, features: ['Custom AI training', 'Advanced analytics', 'HIPAA compliance'] }
    ],
    average_rating: 4.4,
    review_count: 1203
  },
  {
    id: crypto.randomUUID(),
    name: 'HubSpot Chatbot',
    slug: 'hubspot-chatbot',
    provider: 'HubSpot',
    logo_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=200&h=200&fit=crop',
    short_description: 'Free AI chatbot that qualifies leads and books meetings automatically',
    long_description: 'HubSpot\'s AI-powered chatbot is included free with HubSpot CRM. It qualifies leads, answers common questions, and books meetings directly into your calendar. The chatbot learns from your website content and CRM data to provide personalized responses. Perfect for inbound marketing teams.',
    category: ['Sales', 'Customer Support', 'Marketing Automation'],
    industry_fit: ['B2B', 'SaaS', 'Professional Services'],
    pricing_model: 'subscription',
    price_from: 4500,
    price_currency: 'USD',
    features: [
      'Lead qualification forms',
      'Meeting scheduler integration',
      'CRM data sync',
      'Custom welcome messages',
      'Knowledge base integration',
      'A/B testing',
      'Mobile optimization',
      'Conversation routing'
    ],
    benefits: {
      time_saved: '8 hours per week on lead qualification',
      cost_reduction: '2x increase in qualified leads',
      customer_satisfaction: 'N/A',
      roi_timeline: 'Positive ROI within 1-2 months'
    },
    setup_time: '1-2 hours',
    technical_difficulty: 'Low',
    integration_options: ['HubSpot CRM', 'Gmail', 'Outlook', 'Slack', 'Zapier'],
    affiliate_link: 'https://example-partner.com/affiliate?ref=agentdirectory&agent=hubspot-chatbot',
    commission_rate: 0.25,
    cookie_duration: 60,
    demo_video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    screenshots: [],
    meta_title: 'HubSpot Chatbot - Lead Qualification & Meeting Booking',
    meta_description: 'AI chatbot that qualifies leads and books meetings automatically. Included with HubSpot.',
    verified: true,
    featured: true,
    published: true,
    pricing_tiers: [
      { name: 'Free Tools', price: 0, features: ['Basic chatbot', 'HubSpot branding', 'Limited to 1 chatbot'] },
      { name: 'Starter', price: 45, features: ['Remove branding', 'Up to 3 chatbots', 'Email support'] },
      { name: 'Professional', price: 800, features: ['Advanced automation', 'Unlimited chatbots', 'Custom reporting'] },
      { name: 'Enterprise', price: 3600, features: ['AI predictions', 'Advanced permissions', 'Dedicated support'] }
    ],
    average_rating: 4.6,
    review_count: 567
  },
  {
    id: crypto.randomUUID(),
    name: 'Tidio AI',
    slug: 'tidio-ai',
    provider: 'Tidio',
    logo_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop',
    short_description: 'Live chat with AI chatbot for small businesses and e-commerce',
    long_description: 'Tidio combines live chat, chatbots, and email in one easy-to-use platform. The AI chatbot handles routine questions while routing complex issues to your team. Includes pre-built templates for e-commerce (order tracking, product recommendations) and lead generation. Perfect for small businesses that want affordable AI support.',
    category: ['Customer Support', 'Sales'],
    industry_fit: ['Small Business', 'E-commerce', 'Online Services'],
    pricing_model: 'subscription',
    price_from: 2900,
    price_currency: 'USD',
    features: [
      'Live chat & chatbots',
      'Email integration',
      'Order tracking automation',
      'Product recommendations',
      'Visitor tracking',
      'Mobile app',
      'Pre-built templates',
      'Analytics dashboard'
    ],
    benefits: {
      time_saved: '6 hours per week on customer inquiries',
      cost_reduction: '40% reduction in support workload',
      customer_satisfaction: '4.7/5 average rating',
      roi_timeline: 'Positive ROI within 1 month'
    },
    setup_time: '30 minutes',
    technical_difficulty: 'Low',
    integration_options: ['Shopify', 'WordPress', 'Wix', 'Zapier', 'Mailchimp'],
    affiliate_link: 'https://example-partner.com/affiliate?ref=agentdirectory&agent=tidio-ai',
    commission_rate: 0.30,
    cookie_duration: 60,
    demo_video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    screenshots: [],
    meta_title: 'Tidio AI - Live Chat & Chatbot for Small Business',
    meta_description: 'Affordable AI chatbot and live chat for small businesses and e-commerce stores.',
    verified: true,
    featured: false,
    published: true,
    pricing_tiers: [
      { name: 'Free', price: 0, features: ['50 conversations/mo', 'Basic chatbot', '3 operators'] },
      { name: 'Starter', price: 29, features: ['100 conversations/mo', 'Email support', 'Remove branding'] },
      { name: 'Growth', price: 59, features: ['2,000 conversations/mo', 'Advanced triggers', '10 operators'] },
      { name: 'Plus', price: 749, features: ['Unlimited conversations', 'Unlimited operators', 'Priority support'] }
    ],
    average_rating: 4.7,
    review_count: 892
  },
  {
    id: crypto.randomUUID(),
    name: 'ManyChat',
    slug: 'manychat',
    provider: 'ManyChat',
    logo_url: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=200&h=200&fit=crop',
    short_description: 'Instagram and Facebook Messenger marketing automation with AI',
    long_description: 'ManyChat is the leading platform for Instagram DM and Facebook Messenger marketing. Create automated conversation flows that nurture leads, recover abandoned carts, and drive sales through social media. AI features include natural language processing, smart segmentation, and personalized recommendations.',
    category: ['Marketing Automation', 'Sales'],
    industry_fit: ['E-commerce', 'Social Media', 'Online Services', 'Influencers'],
    pricing_model: 'subscription',
    price_from: 1500,
    price_currency: 'USD',
    features: [
      'Instagram DM automation',
      'Facebook Messenger bots',
      'SMS marketing',
      'Email integration',
      'Abandoned cart recovery',
      'Product catalog sync',
      'Growth tools (comment triggers)',
      'Analytics & reporting'
    ],
    benefits: {
      time_saved: '10 hours per week on social media engagement',
      cost_reduction: '5x ROI on Messenger campaigns',
      customer_satisfaction: 'N/A',
      roi_timeline: 'Positive ROI within 2-4 weeks'
    },
    setup_time: '1-3 hours',
    technical_difficulty: 'Low',
    integration_options: ['Shopify', 'WooCommerce', 'Klaviyo', 'Google Sheets', 'Zapier'],
    affiliate_link: 'https://example-partner.com/affiliate?ref=agentdirectory&agent=manychat',
    commission_rate: 0.30,
    cookie_duration: 60,
    demo_video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    screenshots: [],
    meta_title: 'ManyChat - Instagram & Facebook Messenger Marketing',
    meta_description: 'Automate Instagram DMs and Facebook Messenger for e-commerce marketing. 5x ROI.',
    verified: true,
    featured: false,
    published: true,
    pricing_tiers: [
      { name: 'Free', price: 0, features: ['Up to 1,000 contacts', 'Basic automation', 'Instagram & Messenger'] },
      { name: 'Pro', price: 15, features: ['Unlimited contacts', 'Advanced automation', 'SMS (pay per message)', 'Priority support'] }
    ],
    average_rating: 4.6,
    review_count: 734
  },
  {
    id: crypto.randomUUID(),
    name: 'Freshchat AI',
    slug: 'freshchat-ai',
    provider: 'Freshworks',
    logo_url: 'https://images.unsplash.com/photo-1560264280-88b68371db39?w=200&h=200&fit=crop',
    short_description: 'Modern messaging software with AI chatbots for SaaS businesses',
    long_description: 'Freshchat is modern messaging software that brings conversations from web, mobile, and social channels into one unified inbox. The AI-powered chatbot handles routine queries, qualifies leads, and routes conversations to the right team. Built specifically for fast-growing SaaS companies.',
    category: ['Customer Support', 'Sales'],
    industry_fit: ['SaaS', 'SMB', 'Technology'],
    pricing_model: 'subscription',
    price_from: 1500,
    price_currency: 'USD',
    features: [
      'Unified messaging inbox',
      'AI-powered chatbot',
      'Proactive messaging',
      'In-app campaigns',
      'Team collaboration',
      'Mobile SDK',
      'Custom reports',
      'CSAT surveys'
    ],
    benefits: {
      time_saved: '8 hours per week on customer messaging',
      cost_reduction: '30% improvement in response time',
      customer_satisfaction: '4.5/5 average rating',
      roi_timeline: 'Positive ROI within 1-2 months'
    },
    setup_time: '2-4 hours',
    technical_difficulty: 'Low',
    integration_options: ['Freshdesk', 'Salesforce', 'Slack', 'Segment', 'Clearbit'],
    affiliate_link: 'https://example-partner.com/affiliate?ref=agentdirectory&agent=freshchat-ai',
    commission_rate: 0.25,
    cookie_duration: 60,
    demo_video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    screenshots: [],
    meta_title: 'Freshchat AI - Modern Messaging for SaaS',
    meta_description: 'AI-powered messaging software that unifies web, mobile, and social conversations.',
    verified: true,
    featured: false,
    published: true,
    pricing_tiers: [
      { name: 'Free', price: 0, features: ['10 agents', 'Basic chatbot', '100 campaigns/mo'] },
      { name: 'Growth', price: 15, features: ['Unlimited agents', 'Advanced chatbot', 'Unlimited campaigns'] },
      { name: 'Pro', price: 39, features: ['Custom roles', 'Advanced reporting', 'Multiple products'] },
      { name: 'Enterprise', price: 69, features: ['Custom bots', 'Audit logs', 'IP whitelisting'] }
    ],
    average_rating: 4.5,
    review_count: 456
  }
];

// Generate reviews for each agent
function generateReviews(agentId, agentSlug, count) {
  const reviewTemplates = [
    {
      rating: 5,
      title: 'Game changer for our support team',
      content: 'We\'ve been using this for 6 months and it\'s dramatically reduced our support workload. The AI is surprisingly accurate and customers love the instant responses.',
      user_name: 'Sarah M.',
      company_size: '51-200',
      verified: true
    },
    {
      rating: 4,
      title: 'Great product, minor learning curve',
      content: 'Really powerful tool once you get it set up properly. Took us about a week to train it on our specific use cases, but now it\'s running smoothly.',
      user_name: 'Michael T.',
      company_size: '11-50',
      verified: true
    },
    {
      rating: 5,
      title: 'ROI in the first month',
      content: 'We saw positive ROI within 30 days. The time savings alone justify the cost, but the improvement in customer satisfaction is the real win.',
      user_name: 'Jennifer L.',
      company_size: '201-1,000',
      verified: true
    },
    {
      rating: 4,
      title: 'Solid solution for the price',
      content: 'Good value for money. Not perfect, but handles 80% of what we need it to do. Support team has been responsive when we\'ve had questions.',
      user_name: 'David K.',
      company_size: '1-10',
      verified: false
    },
    {
      rating: 5,
      title: 'Exceeded expectations',
      content: 'We were skeptical about AI at first, but this has completely changed how we handle customer inquiries. Setup was easier than expected.',
      user_name: 'Amanda R.',
      company_size: '11-50',
      verified: true
    }
  ];
  
  return reviewTemplates.slice(0, count).map(template => ({
    id: crypto.randomUUID(),
    agent_id: agentId,
    ...template,
    created_at: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000)
  }));
}

async function seed() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');
    
    // Clear existing data
    await Agent.deleteMany({});
    await Review.deleteMany({});
    console.log('Cleared existing data');
    
    // Insert agents
    await Agent.insertMany(agents);
    console.log(`Inserted ${agents.length} agents`);
    
    // Insert reviews
    const allReviews = [];
    agents.forEach(agent => {
      const reviewCount = Math.floor(Math.random() * 3) + 3; // 3-5 reviews per agent
      const reviews = generateReviews(agent.id, agent.slug, reviewCount);
      allReviews.push(...reviews);
    });
    
    await Review.insertMany(allReviews);
    console.log(`Inserted ${allReviews.length} reviews`);
    
    console.log('\n✅ Seed completed successfully!');
    console.log('\nSample agents:');
    agents.slice(0, 3).forEach(agent => {
      console.log(`  - ${agent.name} (${agent.slug})`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();
