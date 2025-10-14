'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import RatingStars from '@/components/shared/RatingStars';
import { Check, X, ChevronLeft } from 'lucide-react';

export default function ComparePage() {
  const searchParams = useSearchParams();
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const agentIds = searchParams.get('agents');
    
    if (agentIds) {
      fetchAgents(agentIds);
    } else {
      setLoading(false);
    }
  }, [searchParams]);
  
  const fetchAgents = async (agentIds) => {
    try {
      const response = await fetch(`/api/compare?agents=${agentIds}`);
      const data = await response.json();
      setAgents(data.agents || []);
    } catch (error) {
      console.error('Error fetching agents:', error);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  if (agents.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">No Agents Selected</h1>
          <p className="text-muted-foreground mb-6">
            Select agents from the browse page to compare them side-by-side
          </p>
          <Link href="/browse">
            <Button>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Go to Browse
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  const maxPriceTier = Math.max(...agents.map(a => a.pricing_tiers?.length || 0));
  const allFeatures = [...new Set(agents.flatMap(a => a.features || []))];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/browse" className="text-primary hover:underline mb-4 inline-flex items-center">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Browse
        </Link>
        <h1 className="text-4xl font-bold mb-2">Compare AI Agents</h1>
        <p className="text-muted-foreground">Side-by-side comparison of {agents.length} agents</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-4 bg-gray-50 border-b font-semibold w-1/4">Feature</th>
              {agents.map((agent) => (
                <th key={agent.id} className="p-4 bg-gray-50 border-b border-l">
                  <div className="text-center">
                    <img
                      src={agent.logo_url}
                      alt={agent.name}
                      className="w-16 h-16 rounded-lg mx-auto mb-3 object-cover"
                    />
                    <h3 className="font-bold text-lg mb-1">{agent.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{agent.provider}</p>
                    <RatingStars rating={agent.average_rating} size="sm" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {agent.review_count} reviews
                    </p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Price */}
            <tr className="border-b hover:bg-gray-50">
              <td className="p-4 font-medium">Starting Price</td>
              {agents.map((agent) => (
                <td key={agent.id} className="p-4 text-center border-l">
                  <p className="text-xl font-bold text-primary">
                    {agent.pricing_model === 'custom'
                      ? 'Custom'
                      : agent.price_from === 0
                      ? 'Free'
                      : `$${(agent.price_from / 100).toFixed(0)}/mo`}
                  </p>
                </td>
              ))}
            </tr>
            
            {/* Category */}
            <tr className="border-b hover:bg-gray-50">
              <td className="p-4 font-medium">Category</td>
              {agents.map((agent) => (
                <td key={agent.id} className="p-4 text-center border-l">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {agent.category.map((cat) => (
                      <Badge key={cat} variant="outline" className="text-xs">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </td>
              ))}
            </tr>
            
            {/* Setup Time */}
            <tr className="border-b hover:bg-gray-50">
              <td className="p-4 font-medium">Setup Time</td>
              {agents.map((agent) => (
                <td key={agent.id} className="p-4 text-center border-l">
                  {agent.setup_time}
                </td>
              ))}
            </tr>
            
            {/* Technical Difficulty */}
            <tr className="border-b hover:bg-gray-50">
              <td className="p-4 font-medium">Technical Difficulty</td>
              {agents.map((agent) => (
                <td key={agent.id} className="p-4 text-center border-l">
                  <Badge variant="outline">{agent.technical_difficulty}</Badge>
                </td>
              ))}
            </tr>
            
            {/* Industry Fit */}
            <tr className="border-b hover:bg-gray-50">
              <td className="p-4 font-medium">Industry Fit</td>
              {agents.map((agent) => (
                <td key={agent.id} className="p-4 text-center border-l">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {agent.industry_fit.slice(0, 3).map((ind) => (
                      <Badge key={ind} variant="secondary" className="text-xs">
                        {ind}
                      </Badge>
                    ))}
                  </div>
                </td>
              ))}
            </tr>
            
            {/* Integrations */}
            <tr className="border-b hover:bg-gray-50">
              <td className="p-4 font-medium">Key Integrations</td>
              {agents.map((agent) => (
                <td key={agent.id} className="p-4 text-center border-l">
                  <div className="text-sm space-y-1">
                    {agent.integration_options.slice(0, 4).map((int) => (
                      <div key={int}>{int}</div>
                    ))}
                    {agent.integration_options.length > 4 && (
                      <div className="text-xs text-muted-foreground">
                        +{agent.integration_options.length - 4} more
                      </div>
                    )}
                  </div>
                </td>
              ))}
            </tr>
            
            {/* Features Comparison */}
            <tr className="bg-gray-50">
              <td colSpan={agents.length + 1} className="p-4 font-bold text-center">
                Feature Comparison
              </td>
            </tr>
            {allFeatures.slice(0, 10).map((feature) => (
              <tr key={feature} className="border-b hover:bg-gray-50">
                <td className="p-4 text-sm">{feature}</td>
                {agents.map((agent) => (
                  <td key={agent.id} className="p-4 text-center border-l">
                    {agent.features.includes(feature) ? (
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
            
            {/* CTA Row */}
            <tr className="bg-gray-50">
              <td className="p-4 font-medium">Action</td>
              {agents.map((agent) => (
                <td key={agent.id} className="p-4 text-center border-l">
                  <div className="space-y-2">
                    <Link href={`/agents/${agent.slug}`}>
                      <Button className="w-full" size="sm">
                        View Details
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => window.open(agent.affiliate_link, '_blank')}
                    >
                      Get Started
                    </Button>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-muted-foreground mb-4">Need help deciding?</p>
        <Link href="/custom-request">
          <Button>Request Custom Recommendation</Button>
        </Link>
      </div>
    </div>
  );
}
