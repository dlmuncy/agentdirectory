import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    default: () => crypto.randomUUID()
  },
  agent_id: {
    type: String,
    required: true
  },
  user_name: String,
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  title: String,
  content: String,
  company_size: String,
  verified: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

ReviewSchema.index({ agent_id: 1 });

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);
