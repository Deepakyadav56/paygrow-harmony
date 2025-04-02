
import React from 'react';
import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, TrendingUp, ExternalLink } from 'lucide-react';
import { motion } from '@/components/ui/motion';
import { Link } from 'react-router-dom';

export interface MarketIndicator {
  name: string;
  value: string;
  change: number;
}

export interface MarketIndicatorsProps {
  indices: MarketIndicator[];
}

const MarketIndicators: React.FC<MarketIndicatorsProps> = ({ indices }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
          Market Indices
        </h3>
        <Link to="/invest/research" className="text-sm text-blue-600 flex items-center font-medium">
          View All <ExternalLink className="h-3.5 w-3.5 ml-1" />
        </Link>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {indices.map((index, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="p-3 border border-gray-100 bg-white hover:shadow-md transition-all rounded-xl">
              <h4 className="text-sm text-gray-700 font-medium mb-1">{index.name}</h4>
              <p className="font-semibold text-lg">{index.value}</p>
              <div className={`flex items-center mt-1 ${
                index.change >= 0 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
                {index.change >= 0 ? (
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                )}
                <span className="font-medium text-sm">{Math.abs(index.change)}%</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MarketIndicators;
