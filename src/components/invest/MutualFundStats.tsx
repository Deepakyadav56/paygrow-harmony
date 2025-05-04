
import React from 'react';
import { Card } from '@/components/ui/card';
import { LineChart, TrendingUp, BarChart, PieChart } from 'lucide-react';

interface MutualFundStatsProps {
  className?: string;
}

const MutualFundStats: React.FC<MutualFundStatsProps> = ({ className = '' }) => {
  return (
    <Card className={`p-4 bg-gradient-to-br from-teal-50 to-white border border-teal-100/50 rounded-xl shadow-sm ${className}`}>
      <div className="flex items-center mb-3">
        <BarChart className="w-5 h-5 text-teal-600 mr-2" />
        <h3 className="font-semibold text-gray-900">Indian Mutual Fund Market</h3>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        As of April 2025, there are approximately <span className="font-semibold text-teal-700">1,478 mutual funds</span> in India, managed by <span className="font-semibold text-teal-700">43 AMCs</span> with total assets under management of <span className="font-semibold text-teal-700">₹65.7 trillion</span>.
      </p>
      
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white p-2 rounded-lg border border-teal-100/50 text-center">
          <LineChart className="w-4 h-4 text-teal-500 mx-auto mb-1" />
          <p className="text-xs text-gray-500">Equity Funds</p>
          <p className="text-sm font-semibold text-teal-700">682</p>
        </div>
        
        <div className="bg-white p-2 rounded-lg border border-teal-100/50 text-center">
          <TrendingUp className="w-4 h-4 text-teal-500 mx-auto mb-1" />
          <p className="text-xs text-gray-500">Debt Funds</p>
          <p className="text-sm font-semibold text-teal-700">531</p>
        </div>
        
        <div className="bg-white p-2 rounded-lg border border-teal-100/50 text-center">
          <PieChart className="w-4 h-4 text-teal-500 mx-auto mb-1" />
          <p className="text-xs text-gray-500">Hybrid Funds</p>
          <p className="text-sm font-semibold text-teal-700">265</p>
        </div>
      </div>
    </Card>
  );
};

export default MutualFundStats;
