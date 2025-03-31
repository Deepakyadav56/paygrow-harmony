
import React from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  ArrowUpRight, 
  BarChart2, 
  PieChart,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { motion } from '@/components/ui/motion';

// Pie chart data
const allocationData = [
  { name: 'Equity', value: 65, color: 'bg-blue-500' },
  { name: 'Debt', value: 20, color: 'bg-green-500' },
  { name: 'Gold', value: 10, color: 'bg-amber-400' },
  { name: 'Others', value: 5, color: 'bg-purple-500' }
];

const InvestmentInsights: React.FC = () => {
  return (
    <div className="p-4 space-y-5">
      {/* Main investment summary card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-5 bg-gradient-to-br from-paygrow-blue to-blue-700 text-white rounded-xl">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center">
                <h2 className="text-lg font-bold">Portfolio Value</h2>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 ml-1 text-white/70" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Total value of all your investments</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-3xl font-bold mt-1">₹35,750.50</p>
              <div className="mt-1 flex items-center text-sm">
                <div className="bg-white/20 rounded-full px-2 py-0.5 text-xs flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>+12.45%</span>
                </div>
                <span className="ml-2 text-white/70 text-xs">Overall returns</span>
              </div>
            </div>
            
            <Button 
              className="bg-white/20 hover:bg-white/30 text-white text-xs"
              size="sm"
              asChild
            >
              <Link to="/invest/portfolio">View Details</Link>
            </Button>
          </div>
          
          {/* Grid with investment stats */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
              <p className="text-sm text-white/80">Invested</p>
              <p className="text-xl font-bold">₹30,000.00</p>
              <div className="flex items-center mt-1">
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-white h-full rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
              <p className="text-sm text-white/80">Returns</p>
              <p className="text-xl font-bold">₹5,750.50</p>
              <div className="flex items-center mt-1 text-xs">
                <div className="bg-green-400/30 text-white px-2 py-0.5 rounded-full">
                  XIRR: 18.25%
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
      
      {/* Asset allocation card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <PieChart className="h-5 w-5 text-gray-700 mr-2" />
              <h3 className="font-semibold text-gray-900">Asset Allocation</h3>
            </div>
            <Button variant="ghost" size="sm" className="h-8 text-xs" asChild>
              <Link to="/invest/portfolio">View All</Link>
            </Button>
          </div>
          
          <div className="space-y-3">
            {allocationData.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{item.name}</span>
                  <span className="font-medium">{item.value}%</span>
                </div>
                <Progress value={item.value} className="h-2 bg-gray-100" indicatorClassName={item.color} />
              </div>
            ))}
          </div>
          
          <div className="mt-4 bg-blue-50 p-3 rounded-lg border border-blue-100">
            <div className="flex items-start">
              <div className="bg-blue-100 p-1 rounded">
                <Info className="h-4 w-4 text-blue-600" />
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium text-blue-700">Insight</p>
                <p className="text-xs text-blue-600">Your portfolio is well-diversified but slightly overweight in equities. Consider rebalancing for better risk management.</p>
              </div>
            </div>
            <Button size="sm" variant="link" className="text-xs mt-1 text-blue-600 p-0" asChild>
              <Link to="/invest/rebalance">Rebalance Portfolio</Link>
            </Button>
          </div>
        </Card>
      </motion.div>
      
      {/* Top performers card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-gray-700 mr-2" />
              <h3 className="font-semibold text-gray-900">Top Performers</h3>
            </div>
            <Button variant="ghost" size="sm" className="h-8 text-xs" asChild>
              <Link to="/invest/portfolio">View All</Link>
            </Button>
          </div>
          
          <div className="space-y-3 divide-y divide-gray-100">
            {[
              { name: 'ICICI Tech Fund', type: 'Mutual Fund', returns: 28.5 },
              { name: 'Axis Small Cap', type: 'Mutual Fund', returns: 24.2 },
              { name: 'HDFC Digital India', type: 'Mutual Fund', returns: 18.7 }
            ].map((item, index) => (
              <div key={index} className={`${index > 0 ? 'pt-3' : ''} flex justify-between items-center`}>
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-green-600 font-bold">+{item.returns}%</p>
                  <p className="text-xs text-gray-500">1Y Returns</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
      
      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button className="bg-gradient-to-r from-paygrow-blue to-blue-600 hover:from-blue-600 hover:to-paygrow-blue text-white" asChild>
          <Link to="/invest/mutual-funds">Explore Funds</Link>
        </Button>
        <Button className="bg-gradient-to-r from-paygrow-green to-green-600 hover:from-green-600 hover:to-paygrow-green text-white" asChild>
          <Link to="/sip-calculator">SIP Calculator</Link>
        </Button>
      </div>
    </div>
  );
};

export default InvestmentInsights;
