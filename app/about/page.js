import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Target, Users, Shield, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-6 text-center">About AI Agent Directory</h1>
        <p className="text-xl text-muted-foreground text-center mb-12">
          Your trusted marketplace for finding and implementing AI agent solutions
        </p>
        
        <div className="prose prose-lg mx-auto mb-12">
          <h2>Our Mission</h2>
          <p>
            We're on a mission to democratize access to AI technology by connecting businesses
            with the perfect AI agent solutions. Whether you need a pre-built chatbot or a
            custom-developed AI system, we make it easy to find, compare, and implement the
            right solution for your needs.
          </p>
          
          <h2>How It Works</h2>
          <p>
            AI Agent Directory combines two powerful approaches:
          </p>
          <ul>
            <li>
              <strong>Pre-Built Solutions:</strong> Browse our curated marketplace of verified
              AI agents. We've done the research so you don't have to, providing transparent
              pricing, real user reviews, and side-by-side comparisons.
            </li>
            <li>
              <strong>Custom Development:</strong> Can't find exactly what you need? Submit a
              custom request and we'll match you with experienced development partners who
              specialize in building bespoke AI solutions.
            </li>
          </ul>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6 text-center">
              <Target className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Curated Selection</h3>
              <p className="text-muted-foreground">
                Every agent in our directory is verified and vetted for quality, reliability,
                and real-world performance.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Expert Matching</h3>
              <p className="text-muted-foreground">
                Our custom request system uses intelligent lead scoring to match you with
                the best-fit development partners.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Transparent Pricing</h3>
              <p className="text-muted-foreground">
                No hidden fees or surprise costs. We provide clear pricing information and
                honest reviews from real users.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Fast Implementation</h3>
              <p className="text-muted-foreground">
                Get up and running quickly with detailed setup guides, integration support,
                and responsive customer service.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="pt-12 pb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join hundreds of businesses that have found their perfect AI solution
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/browse">
                <Button size="lg" variant="secondary">
                  Browse Agents
                </Button>
              </Link>
              <Link href="/custom-request">
                <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  Request Custom Build
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
