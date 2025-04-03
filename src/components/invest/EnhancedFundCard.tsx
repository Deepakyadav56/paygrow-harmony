
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

interface EnhancedFundCardProps {
  id: number;
  name: string;
  category: string;
  riskLevel: string;
  returns: {
    oneYear: number;
  };
  rating: number;
  minInvestment: number;
  compact?: boolean;
}

const EnhancedFundCard: React.FC<EnhancedFundCardProps> = ({
  id,
  name,
  category,
  riskLevel,
  returns,
  rating,
  minInvestment,
  compact = false
}) => {
  const renderStars = (rating: number) => (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star 
          key={i} 
          size={16}
          className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
        />
      ))}
    </div>
  );

  const getRiskColor = (risk: string) => {
    switch(risk) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Moderate': return 'bg-blue-100 text-blue-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Very High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className={`p-4 bg-white border-gray-100 hover:shadow-sm transition-all ${compact ? 'mb-3' : 'mb-4'}`}>
      <div className="flex justify-between items-start mb-1">
        <Link to={`/invest/mutual-fund/${id}`}>
          <h3 className="text-blue-600 font-semibold hover:text-blue-700 transition-colors text-lg">
            {name}
          </h3>
        </Link>
        <div className="flex-shrink-0">{renderStars(rating)}</div>
      </div>
      
      <div className="flex flex-wrap items-center gap-1.5 mt-1 mb-3">
        <span className="text-sm text-gray-600">{category}</span>
        <Badge className={getRiskColor(riskLevel)}>
          {riskLevel} Risk
        </Badge>
      </div>
      
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-600">1Y Returns</span>
          <span className="font-semibold text-green-600">{returns.oneYear}%</span>
        </div>
        
        {/* Returns progress bar */}
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden mt-1 mb-3">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 via-green-400 to-green-500"
            style={{ width: `${Math.min(returns.oneYear * 4, 100)}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Min Investment</span>
          <span className="font-semibold">₹{minInvestment}</span>
        </div>
      </div>
      
      <Button 
        className="w-full bg-blue-600 hover:bg-blue-700 font-medium"
        asChild
      >
        <Link to={`/invest/mutual-fund/${id}`}>Invest</Link>
      </Button>
    </Card>
  );
};

export default EnhancedFundCard;
