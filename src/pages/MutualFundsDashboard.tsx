
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowUp, Calendar, BarChart4 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BottomNavigation from '@/components/BottomNavigation';

// Mock fund data
const popularFunds = [
  {
    id: 1,
    name: 'HDFC Small Cap',
    category: 'Small Cap',
    risk: 'Low Risk',
    returns: {
      '1Y': '+65.2%',
      '3Y': '+50.2%',
      '5Y': '+45.2%',
    },
    minSIP: 100,
    rating: 5,
    logo: '📊',
  },
  {
    id: 2,
    name: 'SBI Mid Cap Fund',
    category: 'Mid Cap',
    risk: 'High Risk',
    returns: {
      '1Y': '+65.2%',
      '3Y': '+50.2%',
    },
    minSIP: 100,
    rating: 3,
    logo: '📈',
  },
  {
    id: 3,
    name: 'ICICI Large Cap Fund',
    category: 'Large Cap',
    risk: 'Very High Risk',
    returns: {
      '1Y': '+65.2%',
    },
    minSIP: 100,
    rating: 1,
    logo: '📉',
  },
  {
    id: 4,
    name: 'HDFC Mid Cap Fund',
    category: 'Mid Cap',
    risk: 'Moderate High Risk',
    returns: {
      '1Y': '+65.2%',
      '3Y': '+50.2%',
    },
    minSIP: 100,
    rating: 4,
    logo: '💹',
  }
];

const MutualFundsDashboard: React.FC = () => {
  const [hideValues, setHideValues] = useState(false);

  // Generate stars based on rating
  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-teal-600 text-white pt-14 pb-6 px-5">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-2xl font-bold">Mutual Funds</h1>
          <div className="flex space-x-4">
            <button className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>
        
        {/* Portfolio Card */}
        <div className="bg-teal-500/20 backdrop-blur-sm rounded-lg p-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-lg">Your Portfolio</h3>
          </div>
          <div className="mt-2">
            <p className="text-sm text-white/80">Current Value</p>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold">₹12,500</p>
              <div className="bg-green-500/30 px-2 py-1 rounded-full flex items-center text-sm">
                <ArrowUp className="h-3 w-3 mr-1" />
                +8.64%
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-sm text-white/80">Returns: <span className="text-white">+₹2,500</span></p>
              <p className="text-sm text-white/80">Last Day: <span className="text-white">+₹500</span></p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-4 divide-x bg-white shadow-sm">
        <Link to="/mutual-funds/holdings" className="flex flex-col items-center py-4">
          <div className="p-2">
            <Clock className="h-6 w-6 text-teal-600" />
          </div>
          <span className="text-xs text-gray-600 mt-1">Holdings</span>
        </Link>
        <Link to="/mutual-funds/sips" className="flex flex-col items-center py-4">
          <div className="p-2">
            <Calendar className="h-6 w-6 text-teal-600" />
          </div>
          <span className="text-xs text-gray-600 mt-1">My SIP's</span>
        </Link>
        <Link to="/mutual-funds/wishlist" className="flex flex-col items-center py-4">
          <div className="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-teal-600"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
          </div>
          <span className="text-xs text-gray-600 mt-1">Wishlist</span>
        </Link>
        <Link to="/mutual-funds/transactions" className="flex flex-col items-center py-4">
          <div className="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-teal-600"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </div>
          <span className="text-xs text-gray-600 mt-1">Transactions</span>
        </Link>
      </div>
      
      {/* Banner */}
      <div className="bg-teal-600 mx-4 mt-6 rounded-xl p-4 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-xl font-bold mb-1">Your Smart Path to Wealth</h2>
          <p className="text-sm text-white/80 mb-4">Start small, invest regularly, grow steadily</p>
          <Button className="bg-white text-teal-700 hover:bg-teal-50 font-medium px-4 py-2 rounded-lg flex items-center">
            Start SIP Today 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 h-4 w-4"><path d="m9 18 6-6-6-6"></path></svg>
          </Button>
        </div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-20">
          <BarChart4 className="h-32 w-32 text-white" />
        </div>
      </div>
      
      {/* Collections */}
      <div className="mt-6 px-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-medium">Collections</h2>
          <Link to="/mutual-funds/all" className="text-teal-600 text-sm">
            All Mutual Funds
          </Link>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white border rounded-lg p-3 text-center">
            <div className="w-10 h-10 bg-blue-100 rounded-lg mx-auto flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-teal-700"><path d="M18 7V4H6v3"></path><path d="M18 11V8H6v3"></path><path d="M18 15v-3H6v3"></path><path d="M18 19v-3H6v3"></path></svg>
            </div>
            <p className="text-sm font-medium">Large Cap</p>
          </div>
          <div className="bg-white border rounded-lg p-3 text-center">
            <div className="w-10 h-10 bg-orange-100 rounded-lg mx-auto flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-teal-700"><path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"></path></svg>
            </div>
            <p className="text-sm font-medium">Mid Cap</p>
          </div>
          <div className="bg-white border rounded-lg p-3 text-center">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg mx-auto flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-teal-700"><path d="M12 3v18"></path><rect width="18" height="18" x="3" y="3" rx="2"></rect></svg>
            </div>
            <p className="text-sm font-medium">Small Cap</p>
          </div>
          <div className="bg-white border rounded-lg p-3 text-center">
            <div className="w-10 h-10 bg-green-100 rounded-lg mx-auto flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-teal-700"><circle cx="12" cy="12" r="10"></circle><path d="M16 12h-6.5a2 2 0 1 0 0 4H12"></path></svg>
            </div>
            <p className="text-sm font-medium">Low Risk</p>
          </div>
          <div className="bg-white border rounded-lg p-3 text-center">
            <div className="w-10 h-10 bg-pink-100 rounded-lg mx-auto flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-teal-700"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
            </div>
            <p className="text-sm font-medium">High Return</p>
          </div>
          <div className="bg-white border rounded-lg p-3 text-center">
            <div className="w-10 h-10 bg-purple-100 rounded-lg mx-auto flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-teal-700"><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg>
            </div>
            <p className="text-sm font-medium">Tax Saving</p>
          </div>
          <div className="bg-white border rounded-lg p-3 text-center">
            <div className="w-10 h-10 bg-red-100 rounded-lg mx-auto flex items-center justify-center mb-2">
              <p className="text-sm font-medium text-teal-700">500</p>
            </div>
            <p className="text-sm font-medium">SIP with ₹500</p>
          </div>
          <div className="bg-white border rounded-lg p-3 text-center">
            <div className="w-10 h-10 bg-blue-100 rounded-lg mx-auto flex items-center justify-center mb-2">
              <p className="text-sm font-medium text-teal-700">100</p>
            </div>
            <p className="text-sm font-medium">SIP with ₹100</p>
          </div>
        </div>
      </div>
      
      {/* Popular Funds */}
      <div className="mt-4 px-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-medium">Popular Funds</h2>
          <Link to="/mutual-funds/popular" className="text-teal-600 text-sm">
            View All
          </Link>
        </div>
        
        <div className="space-y-3">
          {popularFunds.map((fund) => (
            <Link to={`/mutual-funds/${fund.id}`} key={fund.id}>
              <Card className="p-4">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-red-100 flex items-center justify-center rounded-md mr-3">
                    {fund.logo}
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{fund.name}</h3>
                    <div className="flex space-x-2">
                      <span className="text-sm text-gray-600">{fund.category}</span>
                      <span className="text-sm text-yellow-500">{renderStars(fund.rating)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center mb-2">
                  {fund.risk === 'Low Risk' && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Low Risk</span>
                  )}
                  {fund.risk === 'High Risk' && (
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">High Risk</span>
                  )}
                  {fund.risk === 'Very High Risk' && (
                    <span className="text-xs bg-red-200 text-red-900 px-2 py-1 rounded-full">Very High Risk</span>
                  )}
                  {fund.risk === 'Moderate High Risk' && (
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">Moderate High Risk</span>
                  )}
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <p>Returns:</p>
                  {fund.returns['1Y'] && <span className="text-green-600 ml-1">{fund.returns['1Y']}(1Y)</span>}
                  {fund.returns['3Y'] && <span className="text-green-600 ml-2">{fund.returns['3Y']}(3Y)</span>}
                  {fund.returns['5Y'] && <span className="text-green-600 ml-2">{fund.returns['5Y']}(5Y)</span>}
                </div>
                
                <div className="mt-2">
                  <p className="text-sm font-medium">Minimum SIP: <span className="text-black">₹{fund.minSIP}</span></p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default MutualFundsDashboard;
