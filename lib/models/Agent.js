import mongoose from 'mongoose';

const AgentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    default: () => crypto.randomUUID()
  },
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  provider: {
    type: String,
    required: true
  },
  logo_url: String,
  short_description: String,
  long_description: String,
  category: [String],
  industry_fit: [String],
  
  // Pricing
  pricing_model: String,
  price_from: Number,
  price_currency: {
    type: String,
    default: 'USD'
  },
  
  // Features & Benefits
  features: [String],
  benefits: {
    time_saved: String,
    cost_reduction: String,
    customer_satisfaction: String,
    roi_timeline: String
  },
  
  // Implementation
  setup_time: String,
  technical_difficulty: String,
  integration_options: [String],
  
  // Affiliate
  affiliate_link: {
    type: String,
    required: true
  },
  commission_rate: Number,
  cookie_duration: Number,
  
  // Media
  demo_video_url: String,
  screenshots: [String],
  
  // SEO
  meta_title: String,
  meta_description: String,
  
  // Status
  verified: {
    type: Boolean,
    default: false
  },
  featured: {
    type: Boolean,
    default: false
  },
  published: {
    type: Boolean,
    default: true
  },
  
  // Pricing tiers for comparison
  pricing_tiers: [{
    name: String,
    price: Number,
    features: [String]
  }],
  
  // Rating aggregation
  average_rating: {
    type: Number,
    default: 0
  },
  review_count: {
    type: Number,
    default: 0
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

AgentSchema.index({ slug: 1 });
AgentSchema.index({ category: 1 });
AgentSchema.index({ industry_fit: 1 });
AgentSchema.index({ published: 1 });

export default mongoose.models.Agent || mongoose.model('Agent', AgentSchema);
