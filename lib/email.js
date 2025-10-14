/**
 * Email service with mock implementation
 * TODO: Replace with actual Resend integration
 * 
 * To integrate Resend:
 * 1. Install: yarn add resend
 * 2. Add RESEND_API_KEY to .env
 * 3. Import: import { Resend } from 'resend'
 * 4. Initialize: const resend = new Resend(process.env.RESEND_API_KEY)
 * 5. Replace console.log calls with resend.emails.send()
 */

export async function sendCustomRequestConfirmation(data) {
  console.log('[EMAIL] Custom Request Confirmation');
  console.log('To:', data.email);
  console.log('Subject: We received your AI Agent request');
  console.log('Body:', {
    greeting: `Hi ${data.contact_name},`,
    message: `Thank you for submitting a custom AI agent request. We've received your information and will review your needs shortly.`,
    details: {
      company: data.company_name,
      use_case: data.use_case,
      timeline: data.timeline,
      budget: data.budget_range
    },
    next_steps: 'Our team will reach out within 24-48 hours to discuss your project in detail.'
  });
  
  return { success: true, mocked: true };
}

export async function sendAdminLeadAlert(data, leadScore) {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@agentdirectory.online';
  
  console.log('[EMAIL] High-Quality Lead Alert');
  console.log('To:', adminEmail);
  console.log('Subject: 🔥 New High-Quality Lead (Score: ' + leadScore + ')');
  console.log('Body:', {
    lead_score: leadScore,
    company: data.company_name,
    contact: data.contact_name,
    email: data.email,
    budget: data.budget_range,
    timeline: data.timeline,
    problem: data.problem_description,
    urgency: leadScore >= 80 ? 'HIGH - Respond immediately' : 'MEDIUM - Respond within 24h'
  });
  
  return { success: true, mocked: true };
}

export async function sendPartnerNotification(data) {
  console.log('[EMAIL] Partner Weekly Digest');
  console.log('To: partners@agentdirectory.online');
  console.log('Subject: New potential project match');
  console.log('Body:', {
    message: 'A new lead matches your specialty',
    company: data.company_name,
    industry: data.industry,
    budget: data.budget_range
  });
  
  return { success: true, mocked: true };
}
