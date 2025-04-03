
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Filter, ChevronDown, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const fundData = [
  {
    id: 5,
    name: 'Mirae Asset Large Cap Fund Direct Growth',
    category: 'Equity - Large Cap • Mirae Asset',
    returns: {
      oneDay: 0.2,
      oneYear: 14.2,
      threeYear: 19.3,
      fiveYear: 15.8
    },
    rating: 5,
    aum: '26,293 Cr',
    expenseRatio: 1.75,
    minInvestment: 500,
    riskLevel: 'Moderate',
    tags: ['Top Performer', 'Popular']
  },
  {
    id: 6,
    name: 'ICICI Prudential Liquid Fund Direct Growth',
    category: 'Debt - Liquid • ICICI Prudential',
    returns: {
      oneDay: 0.01,
      oneYear: 6.5,
      threeYear: 6.2,
      fiveYear: 7.1
    },
    rating: 4,
    aum: '31,456 Cr',
    expenseRatio: 0.65,
    minInvestment: 1000,
    riskLevel: 'Low',
    tags: []
  },
  {
    id: 7,
    name: 'Aditya Birla Sun Life Tax Relief 96 Direct Growth',
    category: 'ELSS • Aditya Birla Sun Life',
    returns: {
      oneDay: 0.3,
      oneYear: 13.8,
      threeYear: 17.6,
      fiveYear: 14.2
    },
    rating: 4,
    aum: '12,852 Cr',
    expenseRatio: 1.8,
    minInvestment: 500,
    riskLevel: 'Moderate to High',
    tags: ['Tax Saving']
  }
];

const getRiskBadgeStyle = (risk: string) => {
  switch (risk) {
    case 'Low':
      return 'bg-green-100 text-green-800';
    case 'Moderate':
      return 'bg-blue-100 text-blue-800';
    case 'High':
      return 'bg-orange-100 text-orange-800';
    case 'Moderate to High':
      return 'bg-amber-100 text-amber-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }).map((_, i) => (
    <Star
      key={i}
      className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
    />
  ));
};

const AllFundsSection: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('1Y');
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">All Funds</h2>
        <Link to="/invest/mutual-funds" className="text-paygrow-green flex items-center">
          View All <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      
      <div className="flex justify-between mb-4">
        <div className="w-1/2 mr-2">
          <Button variant="outline" className="w-full justify-between">
            Best Returns <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <div className="w-1/2 ml-2">
          <Button variant="outline" className="w-full justify-center">
            <Filter className="h-4 w-4 mr-2" /> Filters
          </Button>
        </div>
      </div>
      
      <div className="flex justify-end mb-2">
        <div className="flex space-x-2 text-sm">
          <button 
            className={`${selectedPeriod === '1Y' ? 'text-paygrow-green font-medium' : 'text-gray-500'}`}
            onClick={() => setSelectedPeriod('1Y')}
          >
            1Y
          </button>
          <span className="text-gray-300">/</span>
          <button 
            className={`${selectedPeriod === '3Y' ? 'text-paygrow-green font-medium' : 'text-gray-500'}`}
            onClick={() => setSelectedPeriod('3Y')}
          >
            3Y
          </button>
          <span className="text-gray-300">/</span>
          <button 
            className={`${selectedPeriod === '5Y' ? 'text-paygrow-green font-medium' : 'text-gray-500'}`}
            onClick={() => setSelectedPeriod('5Y')}
          >
            5Y
          </button>
        </div>
      </div>
      
      {fundData.map((fund) => (
        <Link key={fund.id} to={`/invest/mutual-fund/${fund.id}`} className="block">
          <div className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-100">
            <div className="flex justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-lg">{fund.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{fund.category}</p>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  <div>
                    <p className="text-xs text-gray-500">AUM</p>
                    <p className="font-medium">₹{fund.aum}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Expense Ratio</p>
                    <p className="font-medium">{fund.expenseRatio}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Min. Investment</p>
                    <p className="font-medium">₹{fund.minInvestment}</p>
                  </div>
                </div>
                
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500">1Y Returns</p>
                    <p className="font-medium text-green-500">{fund.returns.oneYear}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">3Y Returns</p>
                    <p className="font-medium text-green-500">{fund.returns.threeYear}%</p>
                  </div>
                </div>
                
                <div className="mt-2">
                  <p className="text-xs text-gray-500">Rating</p>
                  <div className="flex">
                    {renderStars(fund.rating)}
                  </div>
                </div>
                
                {fund.tags && fund.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {fund.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs bg-blue-50 text-blue-700 rounded-full px-2 py-0.5">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="ml-4">
                <span className={`text-xs px-3 py-1 rounded-full ${getRiskBadgeStyle(fund.riskLevel)}`}>
                  {fund.riskLevel}
                </span>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-2">
              <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">
                Invest Now
              </Button>
              <Button variant="outline" className="flex-1">
                Details <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AllFundsSection;
