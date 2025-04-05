
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, TrendingUp, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from '@/components/ui/motion';

interface FundReturn {
  oneYear: number;
  threeYear: number;
  fiveYear: number;
}

interface FundCardModernProps {
  id: number;
  name: string;
  company: string;
  logoUrl: string;
  category: string;
  returns: FundReturn;
  riskLevel: string;
  nav: number;
  rating: number;
  minInvestment: number;
  tags?: string[];
}

const FundCardModern: React.FC<FundCardModernProps> = ({
  id,
  name,
  company,
  logoUrl,
  category,
  returns,
  riskLevel,
  nav,
  rating,
  minInvestment,
  tags = [],
}) => {
  const getRiskColor = (level: string) => {
    switch(level) {
      case 'Low': return 'bg-teal-100 text-teal-800';
      case 'Moderate': return 'bg-blue-100 text-blue-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Very High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-4 border border-teal-100 transition-all duration-300 hover:shadow-md">
        <Link to={`/invest/mutual-fund/${id}`}>
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center overflow-hidden mr-3 border border-teal-100">
              <img 
                src={logoUrl} 
                alt={company} 
                className="w-7 h-7 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/fund-logos/default.png';
                }}
              />
            </div>
            <div>
              <h3 className="text-base font-medium text-teal-800">{name}</h3>
              <p className="text-xs text-gray-500">{company}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">{category}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${getRiskColor(riskLevel)}`}>
              {riskLevel} Risk
            </span>
            {tags?.map((tag, i) => (
              <Badge key={i} variant="info" className="text-xs">{tag}</Badge>
            ))}
            <div className="ml-auto flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-teal-50/50 rounded-lg mb-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex flex-col items-center">
                  <p className="text-xs text-gray-500">1Y Returns</p>
                  <p className="text-sm font-bold text-teal-700">{returns.oneYear}%</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Returns over last 1 year</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex flex-col items-center border-x border-teal-100">
                  <p className="text-xs text-gray-500">3Y Returns</p>
                  <p className="text-sm font-bold text-teal-700">{returns.threeYear}%</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Average annual returns over last 3 years</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex flex-col items-center">
                  <p className="text-xs text-gray-500">5Y Returns</p>
                  <p className="text-sm font-bold text-teal-700">{returns.fiveYear}%</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Average annual returns over last 5 years</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500">Min Investment</p>
              <p className="font-medium">₹{minInvestment}</p>
            </div>
            
            <Button variant="investment" size="sm">
              Invest Now
            </Button>
          </div>
        </Link>
      </Card>
    </motion.div>
  );
};

export default FundCardModern;
