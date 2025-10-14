'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import RatingStars from '@/components/shared/RatingStars';
import AgentCard from '@/components/agents/AgentCard';
import { Check, ExternalLink, Clock, Zap, TrendingUp, DollarSign, Share2, ChevronLeft } from 'lucide-react';
import Cookies from 'js-cookie';

export default function AgentDetailPage({ params }) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  
  const [agent, setAgent] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [similarAgents, setSimilarAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewSort, setReviewSort] = useState('recent');
  
  useEffect(() => {
    const fetchAgentData = async () => {
      try {
        const response = await fetch(`/api/agents/${slug}`);
        const data = await response.json();
        
        if (data.agent) {
          setAgent(data.agent);
          setReviews(data.reviews || []);
          setSimilarAgents(data.similarAgents || []);
        }
      } catch (error) {
        console.error('Error fetching agent:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAgentData();
  }, [slug]);
  
  const handleGetStarted = async () => {
    if (!agent) return;
    
    try {
      // Track affiliate click
      const response = await fetch('/api/track-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentId: agent.id,
          sessionId: getSessionId(),
          referrer: document.referrer
        })
      });
      
      const data = await response.json();
      
      if (data.success && data.cookieData) {
        // Set 60-day attribution cookie
        Cookies.set(`agent_click_${agent.id}`, JSON.stringify(data.cookieData), {
          expires: 60,
          path: '/'
        });
      }
      
      // Redirect to affiliate link
      window.open(agent.affiliate_link, '_blank');
    } catch (error) {
      console.error('Error tracking click:', error);
      // Still redirect even if tracking fails
      window.open(agent.affiliate_link, '_blank');
    }
  };
  
  const getSessionId = () => {
    let sessionId = Cookies.get('session_id');
    if (!sessionId) {
      sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      Cookies.set('session_id', sessionId, { expires: 365, path: '/' });
    }
    return sessionId;
  };
  
  const shareAgent = () => {
    if (navigator.share) {
      navigator.share({
        title: agent.name,
        text: agent.short_description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };
  
  if (loading) {
    return (
      <div className=\"container mx-auto px-4 py-8\">
        <div className=\"animate-pulse\">
          <div className=\"h-8 bg-gray-200 rounded w-1/3 mb-4\"></div>
          <div className=\"h-64 bg-gray-200 rounded mb-8\"></div>
          <div className=\"h-96 bg-gray-200 rounded\"></div>
        </div>
      </div>
    );
  }
  
  if (!agent) {
    return (
      <div className=\"container mx-auto px-4 py-8 text-center\">
        <h1 className=\"text-2xl font-bold mb-4\">Agent Not Found</h1>
        <Link href=\"/browse\">
          <Button>Browse All Agents</Button>
        </Link>
      </div>
    );
  }
  
  const priceDisplay = agent.pricing_model === 'custom'
    ? 'Custom Pricing'
    : agent.price_from === 0
    ? 'Free'
    : `From $${(agent.price_from / 100).toFixed(0)}/mo`;
  
  // Calculate rating breakdown
  const ratingBreakdown = [5, 4, 3, 2, 1].map(star => {
    const count = reviews.filter(r => r.rating === star).length;
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { star, count, percentage };
  });
  
  return (
    <div className=\"container mx-auto px-4 py-8\">
      {/* Breadcrumb */}
      <div className=\"flex items-center gap-2 text-sm text-muted-foreground mb-6\">
        <Link href=\"/\" className=\"hover:text-primary\">Home</Link>
        <span>/</span>
        <Link href=\"/browse\" className=\"hover:text-primary\">Browse</Link>
        <span>/</span>
        <span className=\"text-foreground\">{agent.name}</span>
      </div>
      
      {/* Header Section */}
      <div className=\"grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8\">
        <div className=\"lg:col-span-2\">
          <div className=\"flex items-start gap-4 mb-6\">
            <div className=\"w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0\">
              <img src={agent.logo_url} alt={agent.name} className=\"w-full h-full object-cover\" />
            </div>
            <div className=\"flex-1\">
              <div className=\"flex items-start justify-between mb-2\">
                <div>
                  <h1 className=\"text-3xl font-bold mb-1\">{agent.name}</h1>
                  <p className=\"text-muted-foreground\">by {agent.provider}</p>
                </div>
                <Button variant=\"ghost\" size=\"sm\" onClick={shareAgent}>
                  <Share2 className=\"w-4 h-4\" />
                </Button>
              </div>
              <div className=\"flex items-center gap-3 mb-4\">
                <RatingStars rating={agent.average_rating} size=\"md\" showNumber />
                <span className=\"text-sm text-muted-foreground\">
                  ({agent.review_count} reviews)
                </span>
                {agent.verified && (
                  <Badge variant=\"secondary\" className=\"flex items-center gap-1\">
                    <Check className=\"w-3 h-3\" />
                    Verified
                  </Badge>
                )}
              </div>
              <p className=\"text-lg text-gray-700\">{agent.short_description}</p>
            </div>
          </div>
          
          <div className=\"flex flex-wrap gap-2 mb-6\">
            {agent.category.map((cat) => (
              <Badge key={cat} variant=\"outline\">{cat}</Badge>
            ))}
          </div>
          
          <div className=\"flex gap-3\">
            <Button size=\"lg\" className=\"flex-1 sm:flex-none\" onClick={handleGetStarted}>
              Get Started
              <ExternalLink className=\"w-4 h-4 ml-2\" />
            </Button>
            {agent.demo_video_url && (
              <Button size=\"lg\" variant=\"outline\">
                Watch Demo
              </Button>
            )}
          </div>
        </div>
        
        {/* Sidebar */}
        <div className=\"lg:col-span-1\">
          <Card className=\"sticky top-20\">
            <CardHeader>
              <div className=\"text-center\">
                <p className=\"text-sm text-muted-foreground mb-2\">Starting at</p>
                <p className=\"text-3xl font-bold text-primary\">{priceDisplay}</p>
              </div>
            </CardHeader>
            <CardContent>
              <Button className=\"w-full mb-4\" size=\"lg\" onClick={handleGetStarted}>
                Get Started
              </Button>
              
              <div className=\"space-y-3 text-sm\">
                <div className=\"flex items-center justify-between\">
                  <span className=\"text-muted-foreground\">Setup Time</span>
                  <span className=\"font-medium\">{agent.setup_time}</span>
                </div>
                <Separator />
                <div className=\"flex items-center justify-between\">
                  <span className=\"text-muted-foreground\">Difficulty</span>
                  <Badge variant=\"outline\">{agent.technical_difficulty}</Badge>
                </div>
                <Separator />
                <div className=\"flex items-center justify-between\">
                  <span className=\"text-muted-foreground\">Commission</span>
                  <span className=\"font-medium\">{(agent.commission_rate * 100).toFixed(0)}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Similar Agents */}
          {similarAgents.length > 0 && (
            <div className=\"mt-6\">
              <h3 className=\"font-semibold mb-4\">Similar Agents</h3>
              <div className=\"space-y-4\">
                {similarAgents.slice(0, 2).map((similar) => (
                  <Link key={similar.id} href={`/agents/${similar.slug}`}>
                    <Card className=\"hover:shadow-md transition-shadow cursor-pointer\">
                      <CardContent className=\"p-4\">
                        <div className=\"flex items-center gap-3\">
                          <img src={similar.logo_url} alt={similar.name} className=\"w-10 h-10 rounded\" />
                          <div className=\"flex-1 min-w-0\">
                            <p className=\"font-medium truncate\">{similar.name}</p>
                            <div className=\"flex items-center gap-1\">
                              <RatingStars rating={similar.average_rating} size=\"sm\" />
                              <span className=\"text-xs text-muted-foreground\">
                                ({similar.review_count})
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Tabs Section */}
      <Tabs defaultValue=\"overview\" className=\"mb-12\">
        <TabsList className=\"w-full justify-start\">
          <TabsTrigger value=\"overview\">Overview</TabsTrigger>
          <TabsTrigger value=\"pricing\">Pricing</TabsTrigger>
          <TabsTrigger value=\"features\">Features</TabsTrigger>
          <TabsTrigger value=\"reviews\">Reviews ({reviews.length})</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value=\"overview\" className=\"mt-6\">
          <div className=\"space-y-8\">
            {/* Long Description */}
            <div>
              <h2 className=\"text-2xl font-bold mb-4\">About {agent.name}</h2>
              <p className=\"text-gray-700 leading-relaxed\">{agent.long_description}</p>
            </div>
            
            {/* Benefits */}
            {agent.benefits && (
              <div>
                <h2 className=\"text-2xl font-bold mb-6\">Key Benefits</h2>
                <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4\">
                  <Card>
                    <CardContent className=\"pt-6 text-center\">
                      <Clock className=\"w-8 h-8 text-primary mx-auto mb-3\" />
                      <p className=\"text-sm text-muted-foreground mb-1\">Time Saved</p>
                      <p className=\"font-semibold\">{agent.benefits.time_saved}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className=\"pt-6 text-center\">
                      <DollarSign className=\"w-8 h-8 text-primary mx-auto mb-3\" />
                      <p className=\"text-sm text-muted-foreground mb-1\">Cost Reduction</p>
                      <p className=\"font-semibold\">{agent.benefits.cost_reduction}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className=\"pt-6 text-center\">
                      <TrendingUp className=\"w-8 h-8 text-primary mx-auto mb-3\" />
                      <p className=\"text-sm text-muted-foreground mb-1\">Customer Satisfaction</p>
                      <p className=\"font-semibold\">{agent.benefits.customer_satisfaction}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className=\"pt-6 text-center\">
                      <Zap className=\"w-8 h-8 text-primary mx-auto mb-3\" />
                      <p className=\"text-sm text-muted-foreground mb-1\">ROI Timeline</p>
                      <p className=\"font-semibold\">{agent.benefits.roi_timeline}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
            
            {/* Top Features */}
            <div>
              <h2 className=\"text-2xl font-bold mb-6\">Top Features</h2>
              <div className=\"grid grid-cols-1 md:grid-cols-2 gap-3\">
                {agent.features.map((feature, idx) => (
                  <div key={idx} className=\"flex items-start gap-2\">
                    <Check className=\"w-5 h-5 text-primary flex-shrink-0 mt-0.5\" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Integrations */}
            {agent.integration_options && agent.integration_options.length > 0 && (
              <div>
                <h2 className=\"text-2xl font-bold mb-4\">Integrations</h2>
                <div className=\"flex flex-wrap gap-2\">
                  {agent.integration_options.map((integration) => (
                    <Badge key={integration} variant=\"secondary\" className=\"px-4 py-2\">
                      {integration}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {/* Demo Video */}
            {agent.demo_video_url && (
              <div>
                <h2 className=\"text-2xl font-bold mb-4\">Demo Video</h2>
                <div className=\"aspect-video rounded-lg overflow-hidden bg-gray-100\">
                  <iframe
                    src={agent.demo_video_url}
                    className=\"w-full h-full\"
                    allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>
        </TabsContent>
        
        {/* Pricing Tab */}
        <TabsContent value=\"pricing\" className=\"mt-6\">
          <h2 className=\"text-2xl font-bold mb-6\">Pricing Plans</h2>
          {agent.pricing_tiers && agent.pricing_tiers.length > 0 ? (
            <div className=\"grid grid-cols-1 md:grid-cols-3 gap-6\">
              {agent.pricing_tiers.map((tier, idx) => (
                <Card key={idx} className={idx === 1 ? 'border-primary border-2' : ''}>
                  <CardHeader>
                    <h3 className=\"text-xl font-bold\">{tier.name}</h3>
                    <div className=\"mt-4\">
                      <span className=\"text-3xl font-bold\">
                        {tier.price === 0 ? 'Free' : `$${tier.price}`}
                      </span>
                      {tier.price > 0 && <span className=\"text-muted-foreground\">/month</span>}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className=\"space-y-2 mb-6\">
                      {tier.features.map((feature, fidx) => (
                        <li key={fidx} className=\"flex items-start gap-2\">
                          <Check className=\"w-4 h-4 text-primary flex-shrink-0 mt-1\" />
                          <span className=\"text-sm\">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className=\"w-full\" variant={idx === 1 ? 'default' : 'outline'} onClick={handleGetStarted}>
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className=\"p-8 text-center\">
              <p className=\"text-lg font-semibold mb-2\">{priceDisplay}</p>
              <p className=\"text-muted-foreground mb-6\">Contact sales for detailed pricing</p>
              <Button onClick={handleGetStarted}>Get Started</Button>
            </Card>
          )}
        </TabsContent>
        
        {/* Features Tab */}
        <TabsContent value=\"features\" className=\"mt-6\">
          <h2 className=\"text-2xl font-bold mb-6\">All Features</h2>
          <div className=\"grid grid-cols-1 md:grid-cols-2 gap-4\">
            {agent.features.map((feature, idx) => (
              <Card key={idx}>
                <CardContent className=\"pt-6 flex items-center gap-3\">
                  <Check className=\"w-5 h-5 text-primary flex-shrink-0\" />
                  <span>{feature}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Reviews Tab */}
        <TabsContent value=\"reviews\" className=\"mt-6\">
          <div className=\"grid grid-cols-1 lg:grid-cols-3 gap-8\">
            {/* Rating Summary */}
            <div className=\"lg:col-span-1\">
              <Card>
                <CardContent className=\"pt-6\">
                  <div className=\"text-center mb-6\">
                    <p className=\"text-5xl font-bold mb-2\">{agent.average_rating.toFixed(1)}</p>
                    <RatingStars rating={agent.average_rating} size=\"lg\" />
                    <p className=\"text-sm text-muted-foreground mt-2\">
                      Based on {agent.review_count} reviews
                    </p>
                  </div>
                  
                  <div className=\"space-y-2\">
                    {ratingBreakdown.map(({ star, count, percentage }) => (
                      <div key={star} className=\"flex items-center gap-2\">
                        <span className=\"text-sm w-4\">{star}</span>
                        <div className=\"flex-1 h-2 bg-gray-200 rounded-full overflow-hidden\">
                          <div
                            className=\"h-full bg-yellow-400\"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className=\"text-sm text-muted-foreground w-8 text-right\">{count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Reviews List */}
            <div className=\"lg:col-span-2\">
              <div className=\"space-y-4\">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className=\"pt-6\">
                      <div className=\"flex items-start justify-between mb-3\">
                        <div>
                          <div className=\"flex items-center gap-2 mb-1\">
                            <p className=\"font-semibold\">{review.user_name}</p>
                            {review.verified && (
                              <Badge variant=\"secondary\" className=\"text-xs\">Verified</Badge>
                            )}
                          </div>
                          <RatingStars rating={review.rating} size=\"sm\" />
                        </div>
                        <p className=\"text-sm text-muted-foreground\">
                          {new Date(review.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      {review.title && (
                        <p className=\"font-medium mb-2\">{review.title}</p>
                      )}
                      <p className=\"text-gray-700\">{review.content}</p>
                      {review.company_size && (
                        <p className=\"text-sm text-muted-foreground mt-2\">
                          Company size: {review.company_size}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Similar Agents Section */}
      {similarAgents.length > 0 && (
        <div>
          <h2 className=\"text-2xl font-bold mb-6\">Similar AI Agents</h2>
          <div className=\"grid grid-cols-1 md:grid-cols-3 gap-6\">
            {similarAgents.map((similar) => (
              <AgentCard key={similar.id} agent={similar} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
