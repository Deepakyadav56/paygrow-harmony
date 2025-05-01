
import React from 'react';
import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { motion } from "@/components/ui/motion";

type InvestmentType = 'mutual_fund' | 'gold' | 'fd' | 'stock';

interface InvestmentCardProps {
  id: string;
  name: string;
  type: InvestmentType;
  units?: number;
  purchaseValue: number;
  currentValue: number;
  change: number;
  changePercentage: number;
  lastUpdated: string;
  hideValues?: boolean;
  maskValue?: (value: string | number) => string;
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({ 
  id, 
  name, 
  type, 
  units, 
  purchaseValue, 
  currentValue, 
  change, 
  changePercentage, 
  lastUpdated,
  hideValues = false,
  maskValue = (value) => typeof value === 'number' ? value.toLocaleString('en-IN') : value.toString()
}) => {
  const getInvestmentTypeLabel = (type: InvestmentType) => {
    switch (type) {
      case 'mutual_fund':
        return 'Mutual Fund';
      case 'gold':
        return 'Digital Gold';
      case 'fd':
        return 'Fixed Deposit';
      case 'stock':
        return 'Stock';
      default:
        return 'Investment';
    }
  };
  
  const getInvestmentTypeColor = (type: InvestmentType) => {
    switch (type) {
      case 'mutual_fund':
        return 'bg-timepay-light-blue text-timepay-blue';
      case 'gold':
        return 'bg-yellow-100 text-yellow-800';
      case 'fd':
        return 'bg-timepay-light-green text-timepay-green';
      case 'stock':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const isPositive = change >= 0;
  
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
      <Card className="p-4 border rounded-xl hover:shadow-md transition-all duration-300">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-medium text-timepay-blue">{name}</h3>
            <div className="flex items-center mt-1 space-x-2">
              <Badge variant="outline" className={getInvestmentTypeColor(type)}>
                {getInvestmentTypeLabel(type)}
              </Badge>
              <span className="text-xs text-gray-500">Updated {lastUpdated}</span>
            </div>
          </div>
          <div className={`flex items-center ${isPositive ? 'text-timepay-green' : 'text-red-600'}`}>
            {isPositive ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
            <span className="font-medium">{isPositive ? '+' : ''}{changePercentage.toFixed(2)}%</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-500">Current Value</p>
            <p className="text-lg font-medium">₹{maskValue(currentValue)}</p>
            <p className={`text-xs ${isPositive ? 'text-timepay-green' : 'text-red-600'}`}>
              {isPositive ? '+' : ''}₹{maskValue(change)} ({isPositive ? '+' : ''}{changePercentage.toFixed(2)}%)
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Invested Amount</p>
            <p className="text-lg font-medium">₹{maskValue(purchaseValue)}</p>
            {units && <p className="text-xs text-gray-500">{maskValue(units.toFixed(3))} units</p>}
          </div>
        </div>
        
        <div className="flex space-x-2">
          {type === 'mutual_fund' && (
            <Link to={`/invest/mutual-fund/${id}`} className="flex-1">
              <Button variant="outline" size="sm" className="w-full">Details</Button>
            </Link>
          )}
          
          {type === 'mutual_fund' && (
            <Link to={`/invest/partial-redemption/${id}`} className="flex-1">
              <Button size="sm" className="w-full bg-timepay-blue hover:bg-timepay-blue/90">Redeem</Button>
            </Link>
          )}
          
          {type !== 'mutual_fund' && (
            <Button size="sm" className="w-full bg-timepay-blue hover:bg-timepay-blue/90">Manage</Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default InvestmentCard;
