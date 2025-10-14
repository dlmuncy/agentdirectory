/**
 * Calculate lead score (0-100) based on custom request data
 * Higher score = higher quality lead
 */
export function calculateLeadScore(data) {
  let score = 0;
  
  // Budget (40 points max)
  const budgetScores = {
    '$150,000+': 40,
    '$75,000 - $150,000': 35,
    '$30,000 - $75,000': 28,
    '$15,000 - $30,000': 20,
    '$5,000 - $15,000': 10,
    'Not sure yet': 5
  };
  score += budgetScores[data.budget_range] || 0;
  
  // Company size (25 points max)
  const companySizeScores = {
    '1,000+': 25,
    '201-1,000': 22,
    '51-200': 18,
    '11-50': 12,
    '1-10': 5
  };
  score += companySizeScores[data.company_size] || 0;
  
  // Timeline (20 points max)
  const timelineScores = {
    'ASAP (2-4 weeks)': 20,
    '1-2 months': 16,
    '2-3 months': 12,
    '3-6 months': 8,
    'Just exploring': 4
  };
  score += timelineScores[data.timeline] || 0;
  
  // Integration complexity (15 points max)
  const integrationCount = (data.integrations_needed || []).length;
  score += Math.min(integrationCount * 3, 15);
  
  return Math.min(score, 100);
}
