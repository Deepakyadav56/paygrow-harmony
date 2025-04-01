
import React from 'react';
import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';
import { motion } from '@/components/ui/motion';

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
          <TrendingUp className="h-5 w-5 mr-2 text-paygrow-blue" />
          Market Indices
        </h3>
        <button className="text-sm text-paygrow-blue">View All</button>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {indices.map((index, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -3 }} 
            transition={{ duration: 0.2 }}
          >
            <Card className="p-3 border border-gray-200 bg-white hover:shadow-md transition-all">
              <p className="text-xs text-gray-500 mb-1">{index.name}</p>
              <p className="font-semibold">{index.value}</p>
              <div className={`flex items-center text-xs mt-1 ${
                index.change >= 0 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
                {index.change >= 0 ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                )}
                <span>{Math.abs(index.change)}%</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MarketIndicators;
