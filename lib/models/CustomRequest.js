import mongoose from 'mongoose';

const CustomRequestSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    default: () => crypto.randomUUID()
  },
  status: {
    type: String,
    enum: ['new', 'reviewing', 'matched', 'quoted', 'closed'],
    default: 'new'
  },
  
  // Client info
  company_name: {
    type: String,
    required: true
  },
  contact_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: String,
  company_size: String,
  industry: String,
  website: String,
  
  // Project details
  use_case: [String],
  problem_description: {
    type: String,
    required: true
  },
  integrations_needed: [String],
  expected_volume: String,
  budget_range: String,
  timeline: String,
  previous_ai_experience: String,
  how_heard: String,
  additional_notes: String,
  
  // Scoring
  lead_score: Number
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

CustomRequestSchema.index({ status: 1 });
CustomRequestSchema.index({ created_at: -1 });

export default mongoose.models.CustomRequest || mongoose.model('CustomRequest', CustomRequestSchema);
