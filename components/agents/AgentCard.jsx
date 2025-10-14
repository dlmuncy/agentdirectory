import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import RatingStars from '@/components/shared/RatingStars';
import { ArrowRight, Check } from 'lucide-react';

export default function AgentCard({ agent, showCompare = false, onCompareChange }) {
  const priceDisplay = agent.pricing_model === 'custom' 
    ? 'Custom Pricing'
    : agent.price_from === 0
    ? 'Free'
    : `From $${(agent.price_from / 100).toFixed(0)}/mo`;
  
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200 h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              <img
                src={agent.logo_url}
                alt={agent.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                {agent.name}
              </h3>
              <p className="text-sm text-muted-foreground">{agent.provider}</p>
            </div>
          </div>
          {agent.verified && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Check className="w-3 h-3" />
              Verified
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-1">
        <div className="flex items-center gap-2 mb-3">
          <RatingStars rating={agent.average_rating} size="sm" />
          <span className="text-sm text-muted-foreground">
            ({agent.review_count} reviews)
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {agent.short_description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {agent.category.slice(0, 2).map((cat) => (
            <Badge key={cat} variant="outline" className="text-xs">
              {cat}
            </Badge>
          ))}
        </div>
        
        <div className="text-lg font-bold text-primary">
          {priceDisplay}
        </div>
      </CardContent>
      
      <CardFooter className="pt-4 border-t">
        <div className="w-full flex items-center justify-between">
          {showCompare && (
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                onChange={onCompareChange}
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-sm">Compare</span>
            </label>
          )}
          <Link href={`/agents/${agent.slug}`} className="ml-auto">
            <Button variant="ghost" size="sm" className="group/btn">
              View Details
              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
