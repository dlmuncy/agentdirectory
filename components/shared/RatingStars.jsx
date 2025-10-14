import { Star, StarHalf } from 'lucide-react';

export default function RatingStars({ rating, showNumber = false, size = 'sm' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };
  
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star
        key={`full-${i}`}
        className={`${sizeClasses[size]} fill-yellow-400 text-yellow-400`}
      />
    );
  }
  
  if (hasHalfStar) {
    stars.push(
      <StarHalf
        key="half"
        className={`${sizeClasses[size]} fill-yellow-400 text-yellow-400`}
      />
    );
  }
  
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Star
        key={`empty-${i}`}
        className={`${sizeClasses[size]} text-gray-300`}
      />
    );
  }
  
  return (
    <div className="flex items-center gap-1">
      {stars}
      {showNumber && (
        <span className="ml-1 text-sm font-medium text-gray-700">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
