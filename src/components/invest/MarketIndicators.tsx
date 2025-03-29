
import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface MarketIndex {
  name: string;
  value: string;
  change: number;
}

interface MarketIndicatorsProps {
  indices: MarketIndex[];
}

const MarketIndicators: React.FC<MarketIndicatorsProps> = ({ indices }) => {
  return (
    <div className="bg-white dark:bg-gray-900 px-4 py-2 shadow-sm overflow-x-auto whitespace-nowrap sticky top-0 z-10 border-b border-gray-100 dark:border-gray-800">
      <div className="flex space-x-8 animate-slide-in-right">
        {indices.map((index) => (
          <div key={index.name} className="flex items-center">
            <span className="text-xs font-medium mr-2">{index.name}</span>
            <span className="text-xs font-bold">{index.value}</span>
            <span className={`text-xs ml-1 flex items-center ${index.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {index.change >= 0 ? 
                <ArrowUpRight className="h-3 w-3 mr-0.5" /> : 
                <ArrowDownRight className="h-3 w-3 mr-0.5" />
              }
              {index.change >= 0 ? '+' : ''}{index.change}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketIndicators;
