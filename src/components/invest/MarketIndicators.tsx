
import React from 'react';
import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

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
      <h3 className="text-lg font-semibold mb-3">Market Indices</h3>
      <div className="grid grid-cols-3 gap-3">
        {indices.map((index, i) => (
          <Card key={i} className="p-3 border border-gray-200">
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
        ))}
      </div>
    </div>
  );
};

export default MarketIndicators;
