
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ArrowUpRight, TrendingUp, Info, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ModernFundCardProps {
  id: number;
  name: string;
  fundHouse: string;
  category: string;
  oneYearReturn: number;
  threeYearReturn: number;
  fiveYearReturn: number;
  nav: number;
  aum: string;
  expense: number;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Very High';
  rating: number;
  isTrending?: boolean;
}

const ModernFundCard: React.FC<ModernFundCardProps> = ({
  id,
  name,
  fundHouse,
  category,
  oneYearReturn,
  threeYearReturn,
  fiveYearReturn,
  nav,
  aum,
  expense,
  riskLevel,
  rating,
  isTrending = false
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
  
  const getRiskBadge = (risk: string) => {
    switch(risk) {
      case 'Low': return <Badge variant="secondary" className="bg-teal-100 text-teal-800">Low Risk</Badge>;
      case 'Moderate': return <Badge variant="secondary" className="bg-teal-200 text-teal-800">Moderate Risk</Badge>;
      case 'High': return <Badge variant="secondary" className="bg-teal-300 text-teal-900">High Risk</Badge>;
      case 'Very High': return <Badge variant="secondary" className="bg-teal-400 text-teal-900">Very High Risk</Badge>;
      default: return null;
    }
  };

  const getReturnClass = (returnValue: number) => {
    if (returnValue > 15) return 'text-teal-700 font-semibold';
    if (returnValue > 10) return 'text-teal-600';
    if (returnValue > 5) return 'text-teal-500';
    if (returnValue > 0) return 'text-yellow-600';
    return 'text-red-500';
  };

  return (
    <Card className="overflow-hidden bg-white border border-teal-100/30 hover:shadow-md transition-all rounded-xl">
      {/* Card Header */}
      <div className="p-4 border-b border-teal-50">
        <div className="flex justify-between">
          <div className="flex-1">
            <Link to={`/invest/mutual-fund/${id}`} className="hover:text-teal-700 transition-colors">
              <h3 className="font-medium text-gray-900 line-clamp-2">{name}</h3>
            </Link>
            <p className="text-sm text-gray-500">{fundHouse}</p>
          </div>
          
          {/* Fund House Logo */}
          <div className="flex-shrink-0 ml-3">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center font-bold text-teal-800">
              {fundHouse.substring(0, 2)}
            </div>
          </div>
        </div>
        
        <div className="flex items-center mt-2 gap-2">
          <Badge variant="outline" className="bg-teal-50">{category}</Badge>
          {getRiskBadge(riskLevel)}
          {isTrending && (
            <Badge variant="secondary" className="bg-gradient-to-r from-teal-600 to-teal-800 text-white flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Trending
            </Badge>
          )}
        </div>
      </div>
      
      {/* Card Body */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex">{renderStars(rating)}</div>
          <div className="text-xs text-gray-500 flex items-center">
            <Info className="w-3 h-3 mr-1" /> NAV: ₹{nav.toFixed(2)}
          </div>
        </div>
        
        {/* Returns */}
        <div className="grid grid-cols-3 gap-2 mb-4 p-2 bg-teal-50/50 rounded-lg">
          <div className="text-center">
            <p className="text-xs text-gray-500">1Y Return</p>
            <p className={`text-sm ${getReturnClass(oneYearReturn)}`}>
              {oneYearReturn > 0 ? '+' : ''}{oneYearReturn}%
            </p>
          </div>
          <div className="text-center border-x border-teal-100/30">
            <p className="text-xs text-gray-500">3Y Return</p>
            <p className={`text-sm ${getReturnClass(threeYearReturn)}`}>
              {threeYearReturn > 0 ? '+' : ''}{threeYearReturn}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">5Y Return</p>
            <p className={`text-sm ${getReturnClass(fiveYearReturn)}`}>
              {fiveYearReturn > 0 ? '+' : ''}{fiveYearReturn}%
            </p>
          </div>
        </div>
        
        {/* Fund Details */}
        <div className="flex justify-between text-xs text-gray-500 mb-4">
          <span>AUM: {aum}</span>
          <span>Expense Ratio: {expense}%</span>
        </div>
        
        {/* Action Button */}
        <Button 
          className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white"
          asChild
        >
          <Link to={`/invest/mutual-fund/${id}`} className="flex items-center justify-center">
            Invest Now <ArrowUpRight className="ml-1 w-4 h-4" />
          </Link>
        </Button>
      </div>
    </Card>
  );
};

export default ModernFundCard;
