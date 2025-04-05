
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ChevronRight, ArrowUpRight, TrendingUp, Shield, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import FundLogo from './FundLogo';

interface MutualFundProps {
  id: number;
  name: string;
  category: string;
  returns: {
    oneYear: number;
    threeYear: number;
    fiveYear: number;
  };
  riskLevel: string;
  nav: number;
  navChange?: number;
  aum: string;
  expenseRatio: number;
  rating: number;
  minInvestment?: number;
  tags?: string[];
  trending?: boolean;
  fundHouse?: string;
}

const MutualFundCard: React.FC<MutualFundProps> = ({
  id,
  name,
  category,
  returns,
  riskLevel,
  nav,
  navChange = 0,
  aum,
  expenseRatio,
  rating,
  minInvestment = 500,
  tags = [],
  trending = false,
  fundHouse = '',
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index}
        className={`h-3.5 w-3.5 ${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`} 
      />
    ));
  };

  const getRiskColor = (riskLevel: string) => {
    switch(riskLevel) {
      case 'Low': return 'bg-teal-100 text-teal-800';
      case 'Moderate': return 'bg-teal-200 text-teal-700';
      case 'High': return 'bg-teal-300 text-teal-800';
      case 'Very High': return 'bg-teal-400 text-teal-900';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getReturnsColor = (returnValue: number) => {
    if (returnValue > 15) return 'text-teal-700 font-semibold';
    if (returnValue > 10) return 'text-teal-600';
    if (returnValue > 5) return 'text-teal-500';
    if (returnValue > 0) return 'text-yellow-600';
    return 'text-red-500';
  };

  return (
    <Card className="p-4 hover:shadow-lg transition-all duration-300 border border-teal-100/30 bg-white rounded-xl overflow-hidden relative">
      {trending && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-teal-600 to-teal-700 text-white text-xs py-1 px-3 rounded-bl-lg font-medium flex items-center">
          <TrendingUp className="w-3 h-3 mr-1" /> Trending
        </div>
      )}
      
      <div className="flex justify-between items-start mb-2">
        <div>
          <Link to={`/invest/mutual-fund/${id}`}>
            <h4 className="font-semibold text-gray-800 hover:text-teal-700 transition-colors">{name}</h4>
          </Link>
          <div className="flex items-center flex-wrap mt-1">
            <p className="text-xs text-gray-500 mr-2">{fundHouse}</p>
            <div className={`px-2 py-0.5 rounded-full text-xs ${getRiskColor(riskLevel)}`}>
              {riskLevel} Risk
            </div>
          </div>
        </div>
        {fundHouse && <FundLogo type={category} fundHouse={fundHouse} size="sm" />}
      </div>
      
      <div className="flex items-center mb-2">
        <div className="flex">{renderStars(rating)}</div>
        {tags.length > 0 && (
          <div className="ml-2 flex gap-1">
            {tags.slice(0, 1).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-[10px] bg-teal-50 text-teal-700 border-teal-200">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-3 gap-2 my-3 p-2 bg-teal-50/50 rounded-lg">
        <div className="text-center">
          <p className="text-xs text-gray-500">1Y Returns</p>
          <p className={`text-sm ${getReturnsColor(returns.oneYear)}`}>
            {returns.oneYear > 0 ? '+' : ''}{returns.oneYear}%
          </p>
        </div>
        <div className="text-center border-x border-teal-100/30">
          <p className="text-xs text-gray-500">3Y Returns</p>
          <p className={`text-sm ${getReturnsColor(returns.threeYear)}`}>
            {returns.threeYear > 0 ? '+' : ''}{returns.threeYear}%
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">5Y Returns</p>
          <p className={`text-sm ${getReturnsColor(returns.fiveYear)}`}>
            {returns.fiveYear > 0 ? '+' : ''}{returns.fiveYear}%
          </p>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-3 text-sm">
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="flex items-center text-gray-600">
                <p className="text-xs">NAV:</p>
                <p className="font-medium ml-1">₹{nav.toFixed(2)}</p>
                {navChange !== 0 && (
                  <span className={`text-xs ml-1 flex items-center ${navChange >= 0 ? 'text-teal-600' : 'text-red-600'}`}>
                    {navChange > 0 && <ArrowUpRight className="h-3 w-3" />}
                    {navChange >= 0 ? '+' : ''}{navChange}%
                  </span>
                )}
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Net Asset Value</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex items-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="flex items-center text-gray-600">
                <p className="text-xs">Min:</p>
                <p className="font-medium ml-1">₹{minInvestment}</p>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Minimum Investment</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="flex items-center text-gray-600">
                <p className="text-xs">Expense:</p>
                <p className="font-medium ml-1">{expenseRatio}%</p>
                <Info className="w-3 h-3 ml-1 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Annual fund management fee</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <Button 
        className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white"
        asChild
      >
        <Link to={`/invest/mutual-fund/${id}`}>Invest Now</Link>
      </Button>
    </Card>
  );
};

export default MutualFundCard;
