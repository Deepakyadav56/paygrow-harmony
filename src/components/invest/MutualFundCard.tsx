
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ChevronRight, ArrowUpRight, TrendingUp, Shield, Info, LineChart } from 'lucide-react';
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
      case 'Low': return 'bg-fountain-blue-50 text-fountain-blue-600';
      case 'Moderate': return 'bg-fountain-blue-100 text-fountain-blue-600';
      case 'High': return 'bg-fountain-blue-200 text-fountain-blue-700';
      case 'Very High': return 'bg-fountain-blue-300 text-fountain-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getReturnsColor = (returnValue: number) => {
    if (returnValue > 15) return 'text-green-600 font-semibold';
    if (returnValue > 10) return 'text-fountain-blue-600 font-medium';
    if (returnValue > 5) return 'text-fountain-blue-500';
    if (returnValue > 0) return 'text-yellow-600';
    return 'text-red-500';
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg group relative border-fountain-blue-100/30 bg-white dark:bg-gray-800 dark:border-fountain-blue-900/20 rounded-xl">
      {trending && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-fountain-blue-600 to-fountain-blue-700 text-white text-xs py-1 px-3 rounded-bl-lg font-medium flex items-center">
          <TrendingUp className="w-3 h-3 mr-1" /> Trending
        </div>
      )}
      
      {/* Card Header */}
      <div className="p-4 border-b border-fountain-blue-50 dark:border-fountain-blue-900/20">
        <div className="flex justify-between items-start">
          <div>
            <Link to={`/invest/mutual-fund/${id}`} className="group-hover:text-fountain-blue-600 transition-colors">
              <h4 className="font-semibold text-gray-800 dark:text-gray-100">{name}</h4>
            </Link>
            <div className="flex items-center flex-wrap mt-1">
              <p className="text-xs text-gray-500 dark:text-gray-400 mr-2">{fundHouse}</p>
              <div className={`px-2 py-0.5 rounded-full text-xs ${getRiskColor(riskLevel)}`}>
                {riskLevel} Risk
              </div>
            </div>
          </div>
          {fundHouse && <FundLogo type={category} fundHouse={fundHouse} size="sm" />}
        </div>
        
        <div className="flex items-center mt-2">
          <div className="flex">{renderStars(rating)}</div>
          {tags.length > 0 && (
            <div className="ml-2 flex gap-1">
              {tags.slice(0, 1).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-[10px] bg-fountain-blue-50 text-fountain-blue-600 border-fountain-blue-200 dark:bg-fountain-blue-900/30 dark:text-fountain-blue-300 dark:border-fountain-blue-800/50">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Returns Section */}
      <div className="grid grid-cols-3 gap-2 p-4 bg-fountain-blue-50/50 dark:bg-fountain-blue-900/10">
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">1Y Returns</p>
          <p className={`text-sm ${getReturnsColor(returns.oneYear)}`}>
            {returns.oneYear > 0 ? '+' : ''}{returns.oneYear}%
          </p>
        </div>
        <div className="text-center border-x border-fountain-blue-100/30 dark:border-fountain-blue-800/30">
          <p className="text-xs text-gray-500 dark:text-gray-400">3Y Returns</p>
          <p className={`text-sm ${getReturnsColor(returns.threeYear)}`}>
            {returns.threeYear > 0 ? '+' : ''}{returns.threeYear}%
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">5Y Returns</p>
          <p className={`text-sm ${getReturnsColor(returns.fiveYear)}`}>
            {returns.fiveYear > 0 ? '+' : ''}{returns.fiveYear}%
          </p>
        </div>
      </div>
      
      {/* Fund Details */}
      <div className="flex justify-between items-center p-4 text-sm">
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="flex items-center text-gray-600 dark:text-gray-300">
                <p className="text-xs">NAV:</p>
                <p className="font-medium ml-1">₹{nav.toFixed(2)}</p>
                {navChange !== 0 && (
                  <span className={`text-xs ml-1 flex items-center ${navChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {navChange > 0 && <ArrowUpRight className="h-3 w-3" />}
                    {navChange >= 0 ? '+' : ''}{navChange}%
                  </span>
                )}
              </TooltipTrigger>
              <TooltipContent className="bg-white dark:bg-gray-800 border-fountain-blue-200 dark:border-fountain-blue-800">
                <p className="text-xs">Net Asset Value</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex items-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="flex items-center text-gray-600 dark:text-gray-300">
                <p className="text-xs">Min:</p>
                <p className="font-medium ml-1">₹{minInvestment}</p>
              </TooltipTrigger>
              <TooltipContent className="bg-white dark:bg-gray-800 border-fountain-blue-200 dark:border-fountain-blue-800">
                <p className="text-xs">Minimum Investment</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="flex items-center text-gray-600 dark:text-gray-300">
                <p className="text-xs">Expense:</p>
                <p className="font-medium ml-1">{expenseRatio}%</p>
                <Info className="w-3 h-3 ml-1 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent className="bg-white dark:bg-gray-800 border-fountain-blue-200 dark:border-fountain-blue-800">
                <p className="text-xs">Annual fund management fee</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      {/* Action Button */}
      <div className="p-4 pt-0">
        <Button 
          className="w-full bg-gradient-to-r from-fountain-blue-500 to-fountain-blue-600 hover:from-fountain-blue-600 hover:to-fountain-blue-700 text-white dark:from-fountain-blue-600 dark:to-fountain-blue-700 dark:hover:from-fountain-blue-700 dark:hover:to-fountain-blue-800"
          asChild
        >
          <Link to={`/invest/mutual-fund/${id}`} className="flex items-center justify-center">
            Invest Now
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Card>
  );
};

export default MutualFundCard;
