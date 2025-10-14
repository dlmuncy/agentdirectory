import mongoose from 'mongoose';

const AffiliateClickSchema = new mongoose.Schema({
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
  session_id: String,
  referrer: String,
  clicked_at: {
    type: Date,
    default: Date.now
  }
});

AffiliateClickSchema.index({ agent_id: 1 });
AffiliateClickSchema.index({ clicked_at: -1 });

export default mongoose.models.AffiliateClick || mongoose.model('AffiliateClick', AffiliateClickSchema);
