import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { BookOpen, Video, FileText, TrendingUp } from 'lucide-react';

const resources = [
  {
    title: 'Getting Started with AI Agents',
    description: 'A comprehensive guide to understanding AI agents and how they can transform your business operations.',
    category: 'Guide',
    icon: BookOpen,
    readTime: '8 min read'
  },
  {
    title: 'Choosing the Right AI Agent for Customer Support',
    description: 'Key factors to consider when selecting an AI-powered customer support solution for your business.',
    category: 'Tutorial',
    icon: FileText,
    readTime: '6 min read'
  },
  {
    title: 'ROI Calculator: Measuring AI Agent Success',
    description: 'Learn how to calculate and maximize the return on investment from your AI agent implementation.',
    category: 'Tool',
    icon: TrendingUp,
    readTime: '10 min read'
  },
  {
    title: 'Video: AI Agents Demo Compilation',
    description: 'Watch demos of the top-performing AI agents across different categories and industries.',
    category: 'Video',
    icon: Video,
    readTime: '15 min watch'
  },
  {
    title: 'Integration Best Practices',
    description: 'Step-by-step guide to integrating AI agents with your existing tech stack seamlessly.',
    category: 'Guide',
    icon: BookOpen,
    readTime: '12 min read'
  },
  {
    title: 'Custom AI Development: What to Expect',
    description: 'Everything you need to know about commissioning a custom-built AI agent for your specific needs.',
    category: 'Guide',
    icon: FileText,
    readTime: '9 min read'
  }
];

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Resources & Guides</h1>
          <p className="text-xl text-muted-foreground">
            Learn everything you need to know about AI agents and how to implement them successfully
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, idx) => {
            const Icon = resource.icon;
            return (
              <Card key={idx} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary">{resource.category}</Badge>
                    <span className="text-sm text-muted-foreground">{resource.readTime}</span>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{resource.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="mt-16 text-center">
          <Card className="bg-gray-50">
            <CardContent className="pt-12 pb-12">
              <h2 className="text-3xl font-bold mb-4">Need Personalized Help?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our team is here to help you find the perfect AI solution for your business
              </p>
              <Link
                href="/custom-request"
                className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Request Custom Consultation
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
