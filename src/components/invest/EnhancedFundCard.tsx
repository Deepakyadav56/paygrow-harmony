
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  Info, 
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface FundProps {
  id: number;
  name: string;
  category: string;
  subcategory?: string;
  returns: {
    oneYear: number;
    threeYear: number;
    fiveYear: number;
  };
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Very High';
  nav: number;
  navDate?: string;
  rating: number;
  tags?: string[];
  aum?: string;
  expenseRatio: number;
  minInvestment: number;
  trending?: boolean;
  highlighted?: boolean;
}

const EnhancedFundCard: React.FC<{ fund: FundProps }> = ({ fund }) => {
  const getRiskColor = (riskLevel: string) => {
    switch(riskLevel) {
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      case 'Moderate': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Very High': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getReturnsColor = (returnValue: number) => {
    if (returnValue > 15) return 'text-green-600';
    if (returnValue > 10) return 'text-green-500';
    if (returnValue > 0) return 'text-green-400';
    if (returnValue === 0) return 'text-gray-500';
    return 'text-red-500';
  };

  return (
    <Link to={`/invest/mutual-fund/${fund.id}`}>
      <Card className={`p-4 border ${fund.highlighted ? 'border-paygrow-blue/30 bg-blue-50/30' : 'border-gray-200 bg-white'} rounded-xl shadow-sm mb-3`}>
        {/* Fund header */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-medium text-blue-600">{fund.name}</h3>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{fund.category}</span>
              <div className={`text-sm px-2 py-0.5 rounded-full ${getRiskColor(fund.riskLevel)}`}>
                {fund.riskLevel} Risk
              </div>
              {fund.trending && (
                <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                  Trending
                </Badge>
              )}
            </div>
          </div>
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <Star 
                key={index}
                className={`h-5 w-5 ${
                  index < fund.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                }`} 
              />
            ))}
          </div>
        </div>
        
        {/* Returns Section with Progress Bar */}
        <div className="mb-3">
          <div className="flex justify-between items-center text-sm mb-1">
            <span className="text-gray-500">1Y Returns</span>
            <span className={`font-medium ${getReturnsColor(fund.returns.oneYear)}`}>
              {fund.returns.oneYear}%
            </span>
          </div>
          <Progress value={fund.returns.oneYear * 4} className="h-2" />
        </div>
        
        {/* Investment Info */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500">Min Investment</p>
            <p className="font-medium">₹{fund.minInvestment}</p>
          </div>
          
          <Button className="bg-blue-600 hover:bg-blue-700">
            Invest
          </Button>
        </div>
      </Card>
    </Link>
  );
};

export default EnhancedFundCard;
