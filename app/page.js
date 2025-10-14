'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AgentCard from '@/components/agents/AgentCard';
import { Search, ArrowRight, Bot, Zap, Shield, TrendingUp, MessageSquare, ShoppingCart, FileText, Database } from 'lucide-react';

const categories = [
  {
    icon: MessageSquare,
    name: 'Customer Support',
    count: 0,
    href: '/browse?category=Customer+Support',
    description: 'AI chatbots and support automation'
  },
  {
    icon: TrendingUp,
    name: 'Sales',
    count: 0,
    href: '/browse?category=Sales',
    description: 'Lead generation and qualification'
  },
  {
    icon: FileText,
    name: 'Content Creation',
    count: 0,
    href: '/browse?category=Content+Creation',
    description: 'AI writing and content tools'
  },
  {
    icon: Database,
    name: 'Marketing Automation',
    count: 0,
    href: '/browse?category=Marketing+Automation',
    description: 'Automated marketing workflows'
  }
];

const testimonials = [
  {
    quote: "Finding the right AI solution used to take weeks. With AI Agent Directory, we found and implemented our customer support bot in just 3 days.",
    author: "Sarah Johnson",
    company: "TechStart Inc.",
    role: "Head of Customer Success"
  },
  {
    quote: "The custom build request was a game-changer. They matched us with the perfect development partner for our unique needs.",
    author: "Michael Chen",
    company: "GrowthCo",
    role: "CTO"
  },
  {
    quote: "Transparent pricing, verified reviews, and side-by-side comparisons made our decision process so much easier.",
    author: "Emily Rodriguez",
    company: "Scale Solutions",
    role: "Operations Director"
  }
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredAgents, setFeaturedAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchFeaturedAgents = async () => {
      try {
        const response = await fetch('/api/agents?limit=6&sort=popular');
        const data = await response.json();
        setFeaturedAgents(data.agents || []);
      } catch (error) {
        console.error('Error fetching agents:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeaturedAgents();
  }, []);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/browse?search=${encodeURIComponent(searchQuery)}`;
    }
  };
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Find the Perfect <span className="text-primary">AI Agent</span> for Your Business
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Browse verified AI solutions, compare features side-by-side, or request a custom agent built specifically for your needs.
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search for AI agents (e.g., customer support, chatbot, content)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
                <Button type="submit" size="lg" className="px-8">
                  Search
                </Button>
              </div>
            </form>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/browse">
                <Button size="lg" className="w-full sm:w-auto">
                  Browse All Agents
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/custom-request">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Request Custom Build
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link key={category.name} href={category.href}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardHeader className="text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Featured Agents Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Featured AI Agents</h2>
            <Link href="/browse">
              <Button variant="ghost">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="h-80 animate-pulse">
                  <div className="h-full bg-gray-200 rounded-lg" />
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Social Proof Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Trusted by Growing Businesses</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join hundreds of companies that found their perfect AI solution through our platform
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6">
                  <p className="text-sm text-gray-600 mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Can't Find What You Need?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Get a custom AI agent built specifically for your business requirements
          </p>
          <Link href="/custom-request">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Request Custom Build
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
