
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { ArrowRight, TrendingUp, Star, Info } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

// Featured funds data
const featuredFunds = [
  {
    id: 1,
    name: 'Axis Bluechip Fund',
    category: 'Large Cap',
    returns: {
      oneYear: 12.5,
      threeYear: 15.8,
      fiveYear: 14.2,
    },
    risk: 'Moderate',
    minInvestment: 500,
    ratings: 5,
  },
  {
    id: 2,
    name: 'HDFC Mid-Cap Opportunities',
    category: 'Mid Cap',
    returns: {
      oneYear: 18.2,
      threeYear: 16.9,
      fiveYear: 15.7,
    },
    risk: 'High',
    minInvestment: 1000,
    ratings: 4,
  },
  {
    id: 3,
    name: 'SBI Small Cap Fund',
    category: 'Small Cap',
    returns: {
      oneYear: 22.7,
      threeYear: 19.5,
      fiveYear: 18.2,
    },
    risk: 'Very High',
    minInvestment: 500,
    ratings: 4,
  },
];

// Risk level colors
const getRiskColor = (risk: string) => {
  switch(risk) {
    case 'Low': return 'bg-green-100 text-green-800';
    case 'Moderate': return 'bg-blue-100 text-blue-800';
    case 'High': return 'bg-orange-100 text-orange-800';
    case 'Very High': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const FeaturedFundsSection: React.FC = () => {
  const getProgressColor = (returns: number) => {
    if (returns >= 20) return 'bg-green-500';
    if (returns >= 15) return 'bg-green-400';
    if (returns >= 10) return 'bg-blue-500';
    if (returns >= 5) return 'bg-blue-400';
    return 'bg-gray-400';
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <span className="text-blue-600 mr-1">Featured</span> Funds
        </h3>
        <Link to="/invest/mutual-funds" className="text-sm text-blue-600 flex items-center font-medium">
          View All <ArrowRight className="h-3.5 w-3.5 ml-1" />
        </Link>
      </div>
      
      <div className="space-y-4">
        {featuredFunds.map((fund) => (
          <Card key={fund.id} className="p-4 border border-gray-100 overflow-hidden rounded-xl">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <Link to={`/invest/mutual-fund/${fund.id}`} className="font-semibold text-blue-600 hover:underline text-lg block">
                  {fund.name}
                </Link>
                <div className="flex items-center flex-wrap gap-2 mt-1">
                  <span className="text-sm text-gray-500">{fund.category}</span>
                  <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(fund.risk)}`}>
                    {fund.risk} Risk
                  </div>
                </div>
              </div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < fund.ratings ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
              
            <div className="mt-3 mb-3">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="text-gray-500 font-medium">1Y Returns</span>
                <span className={`font-semibold ${fund.returns.oneYear > 15 ? 'text-green-600' : fund.returns.oneYear > 10 ? 'text-blue-600' : 'text-gray-700'}`}>
                  {fund.returns.oneYear}%
                </span>
              </div>
              <Progress 
                value={fund.returns.oneYear * 3} 
                className="h-2 bg-gray-100" 
                indicatorClassName={getProgressColor(fund.returns.oneYear)}
              />
            </div>
              
            <div className="flex flex-col space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500">Min Investment</p>
                  <p className="font-medium">₹{fund.minInvestment}</p>
                </div>
              </div>
              
              <Button 
                variant="investFund" 
                size="pill"
                className="w-full shadow-md hover:shadow-lg transition-all bg-[#1e6bf3]"
                onClick={() => {
                  window.location.href = `/invest/sip-setup/${fund.id}`;
                }}
              >
                Invest
              </Button>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-2 gap-3 mt-5">
        <Link to="/invest/featured">
          <Card className="p-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all">
            <h3 className="font-semibold mb-1 text-lg">Featured Collections</h3>
            <p className="text-sm text-white/90">Best funds for different goals</p>
          </Card>
        </Link>
        <Link to="/invest/tax-planning">
          <Card className="p-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl hover:shadow-lg transition-all">
            <h3 className="font-semibold mb-1 text-lg">Tax Planning</h3>
            <p className="text-sm text-white/90">Save tax with ELSS funds</p>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedFundsSection;
