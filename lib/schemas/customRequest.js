import { z } from 'zod';

export const customRequestSchema = z.object({
  // Step 1: About Your Business
  company_name: z.string().min(2, 'Company name is required'),
  contact_name: z.string().min(2, 'Your name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  company_size: z.enum(['1-10', '11-50', '51-200', '201-1,000', '1,000+'], {
    required_error: 'Please select company size'
  }),
  industry: z.string().min(1, 'Industry is required'),
  website: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  
  // Step 2: Your AI Agent Needs
  problem_description: z.string().min(100, 'Please provide at least 100 characters describing your problem'),
  use_case: z.array(z.string()).min(1, 'Select at least one use case'),
  integrations_needed: z.array(z.string()).min(1, 'Select at least one integration'),
  expected_volume: z.string().optional(),
  
  // Step 3: Timeline & Investment
  timeline: z.enum([
    'ASAP (2-4 weeks)',
    '1-2 months',
    '2-3 months',
    '3-6 months',
    'Just exploring'
  ], {
    required_error: 'Please select a timeline'
  }),
  budget_range: z.enum([
    '$5,000 - $15,000',
    '$15,000 - $30,000',
    '$30,000 - $75,000',
    '$75,000 - $150,000',
    '$150,000+',
    'Not sure yet'
  ], {
    required_error: 'Please select a budget range'
  }),
  previous_ai_experience: z.enum([
    'No, this is our first',
    'Yes, looking to improve/expand',
    'We have an internal AI team'
  ], {
    required_error: 'Please select your AI experience'
  }),
  how_heard: z.string().optional(),
  additional_notes: z.string().optional()
});

export const useCases = [
  'Customer Support Automation',
  'Sales Lead Qualification',
  'Content Generation',
  'Data Analysis & Insights',
  'Process Automation',
  'Chatbot/Virtual Assistant',
  'Predictive Analytics',
  'Document Processing',
  'Email Automation',
  'Social Media Management'
];

export const integrations = [
  'CRM (Salesforce, HubSpot)',
  'Email (Gmail, Outlook)',
  'Slack/Teams',
  'Database (MySQL, PostgreSQL)',
  'E-commerce (Shopify, WooCommerce)',
  'Payment (Stripe, PayPal)',
  'Marketing (Mailchimp, SendGrid)',
  'Analytics (Google Analytics)',
  'Cloud Storage (AWS, Google Cloud)',
  'Custom API',
  'Other'
];

export const industries = [
  'SaaS/Technology',
  'E-commerce/Retail',
  'Healthcare',
  'Financial Services',
  'Education',
  'Real Estate',
  'Manufacturing',
  'Professional Services',
  'Media/Entertainment',
  'Non-profit',
  'Government',
  'Other'
];
