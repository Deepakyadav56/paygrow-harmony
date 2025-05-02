
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Bell, Menu, ChevronRight, ArrowUpRight, 
  BarChart4, Calendar, Bookmark, RotateCw } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import BottomNavigation from '@/components/BottomNavigation';

// Fund data
const popularFunds = [
  {
    id: 1,
    name: 'HDFC Small Cap',
    logo: '🟥',
    category: 'Small Cap',
    riskLevel: 'Low Risk',
    riskColor: 'bg-green-100 text-green-800',
    rating: 5,
    returns: {
      oneYear: '+65.2%',
      threeYear: '+50.2%',
      fiveYear: '+45.2%'
    },
    minSip: 100
  },
  {
    id: 2,
    name: 'SBI Mid Cap Fund',
    logo: '🔵',
    category: 'Mid Cap',
    riskLevel: 'High Risk',
    riskColor: 'bg-red-100 text-red-800',
    rating: 4,
    returns: {
      oneYear: '+65.2%',
      threeYear: '+50.2%',
    },
    minSip: 100
  },
  {
    id: 3,
    name: 'ICICI Large Cap Fund',
    logo: '🟠',
    category: 'Large Cap',
    riskLevel: 'Very High Risk',
    riskColor: 'bg-red-100 text-red-800',
    rating: 3,
    returns: {
      oneYear: '+65.2%',
    },
    minSip: 100
  },
  {
    id: 4,
    name: 'HDFC Mid Cap Fund',
    logo: '🟥',
    category: 'Mid Cap',
    riskLevel: 'Moderate High Risk',
    riskColor: 'bg-orange-100 text-orange-800',
    rating: 4,
    returns: {
      oneYear: '+65.2%',
      threeYear: '+50.2%',
    },
    minSip: 100
  }
];

// Collections categories
const collections = [
  { icon: '🏙️', name: 'Large Cap', color: 'bg-blue-100' },
  { icon: '🏢', name: 'Mid Cap', color: 'bg-orange-100' },
  { icon: '📊', name: 'Small Cap', color: 'bg-yellow-100' },
  { icon: '🛡️', name: 'Low Risk', color: 'bg-green-100' },
  { icon: '📈', name: 'High Return', color: 'bg-red-100' },
  { icon: '💰', name: 'Tax Saving', color: 'bg-purple-100' },
  { icon: '₹500', name: 'SIP with ₹500', color: 'bg-pink-100' },
  { icon: '₹100', name: 'SIP with ₹100', color: 'bg-blue-100' },
];

const MutualFundsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('holdings');

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-400 text-white pt-8 pb-2 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="mr-3">
              <ArrowLeft className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-bold">Mutual Funds</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="h-6 w-6" />
            <Menu className="h-6 w-6" />
          </div>
        </div>
      </div>
      
      {/* Portfolio Card */}
      <div className="px-4 -mt-2">
        <Card className="bg-gradient-to-br from-teal-600 to-teal-500 text-white p-4 rounded-xl border-none">
          <h2 className="font-medium text-lg mb-1">Your Portfolio</h2>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-white/80">Current Value</p>
              <p className="text-3xl font-bold">₹12,500</p>
              <div className="flex items-center mt-1">
                <p className="text-sm">Returns: <span className="font-medium">+ ₹2,500</span></p>
                <p className="ml-auto text-sm">Last Day: <span className="font-medium">+ ₹500</span></p>
              </div>
            </div>
            <div className="bg-green-400/30 text-white px-3 py-1 rounded-full text-sm">
              +8.64 %
            </div>
          </div>
        </Card>
      </div>
      
      {/* Quick Navigation Tabs */}
      <div className="bg-white mx-4 mt-4 p-3 rounded-xl grid grid-cols-4 gap-4 shadow-sm">
        <div 
          className={`flex flex-col items-center ${activeTab === 'holdings' ? 'text-teal-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('holdings')}
        >
          <BarChart4 className="h-6 w-6 mb-1" />
          <span className="text-xs">Holdings</span>
        </div>
        <div
          className={`flex flex-col items-center ${activeTab === 'my-sips' ? 'text-teal-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('my-sips')}
        >
          <Calendar className="h-6 w-6 mb-1" />
          <span className="text-xs">My SIP's</span>
        </div>
        <div
          className={`flex flex-col items-center ${activeTab === 'wishlist' ? 'text-teal-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('wishlist')}
        >
          <Bookmark className="h-6 w-6 mb-1" />
          <span className="text-xs">Wishlist</span>
        </div>
        <div
          className={`flex flex-col items-center ${activeTab === 'transactions' ? 'text-teal-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('transactions')}
        >
          <RotateCw className="h-6 w-6 mb-1" />
          <span className="text-xs">Transactions</span>
        </div>
      </div>
      
      {/* Wealth Banner */}
      <div className="mx-4 my-5">
        <div className="bg-gradient-to-r from-teal-600 to-blue-500 p-4 rounded-xl flex text-white relative overflow-hidden">
          <div className="z-10 flex-1">
            <h3 className="text-xl font-bold mb-2">Your Smart Path to Wealth</h3>
            <p className="text-sm mb-4">Start small, invest regularly, grow steadily</p>
            <Button className="bg-white text-teal-700 hover:bg-white/90 rounded-full px-4 py-2 text-sm font-medium">
              Start SIP Today <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/2">
            <div className="w-full h-full bg-contain bg-right-bottom bg-no-repeat" 
                style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNDAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMjQwIDEyMCI+PHBhdGggZD0iTTAgMTIwaDI0MFYwSDB6TTIzNSAxNWMyLjggMCAxLjggMi4zLjEgMy4yLTEuNSAyLjktMTYuMSAyMC40LTE5LjMgMjVzLTEwLjggMTYuNi0xNi4yIDI0LjQtOS41IDE0LjMtMTYgMTdjLTYuMyAyLjYtMTguNC02LjItMjkuNy0yMy0xMS4yLTE2LjgtMzkuMy00NS4yLTQ5LTUzLjRTNzguOC0yLjcgNjggNS44Yy0xMS42IDktMjEuNSAyMC40LTMwLjggMjguNGE5Mi41IDkyLjUgMCAwIDEtMzAgMTkuM2MtMi44IDEuNCAwIDEuMiA0LjUgMS4zIDcuMi0uNCAyNS40IDkgNDAgMjAuN3MzNy40IDI3LjQgNTIuNCAyN2MxNC0uMyAyNC4yLTguNiAzNS4xLTE5LjRDMTUwIDcyLjQgMTYzIDY3IDE3NSA2NHMzNC4zLTYuNiA0My03LjhjOC44LTEuMiAxMy4yLTMuNCAxNi0zMS40LjgtMTAgLjctMTAgMS0xMHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjI1Ii8+PC9zdmc+')" }}></div>
          </div>
        </div>
      </div>
      
      {/* Collections Section */}
      <div className="px-4 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Collections</h2>
          <Link to="/invest/mutual-funds" className="text-teal-600 text-sm font-medium">
            All Mutual Funds
          </Link>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          {collections.map((item, i) => (
            <Link to={`/invest/mutual-funds?category=${item.name.toLowerCase().replace(' ', '-')}`} key={i} className="text-center">
              <div className={`${item.color} w-14 h-14 mx-auto rounded-full flex items-center justify-center text-2xl mb-1`}>
                {item.icon}
              </div>
              <p className="text-xs text-gray-700 mt-1">{item.name}</p>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Popular Funds Section */}
      <div className="px-4 mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Popular Funds</h2>
          <Link to="/invest/mutual-funds" className="text-teal-600 text-sm font-medium">
            View All
          </Link>
        </div>
        
        <div className="space-y-4">
          {popularFunds.map((fund) => (
            <Link key={fund.id} to={`/invest/mutual-fund/${fund.id}`}>
              <Card className="p-4 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mr-3 text-2xl">
                      {fund.logo}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{fund.name}</h3>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-500 mr-2">{fund.category}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${fund.riskColor}`}>
                          {fund.riskLevel}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    {Array(5).fill(0).map((_, i) => (
                      <span key={i} className={`text-sm ${i < fund.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className="text-sm text-gray-700 mb-1">Returns:</p>
                  <div className="flex gap-2">
                    {fund.returns.oneYear && (
                      <Badge variant="outline" className="text-green-700 bg-green-50">
                        {fund.returns.oneYear}<span className="text-xs">(1Y)</span>
                      </Badge>
                    )}
                    {fund.returns.threeYear && (
                      <Badge variant="outline" className="text-green-700 bg-green-50">
                        {fund.returns.threeYear}<span className="text-xs">(3Y)</span>
                      </Badge>
                    )}
                    {fund.returns.fiveYear && (
                      <Badge variant="outline" className="text-green-700 bg-green-50">
                        {fund.returns.fiveYear}<span className="text-xs">(5Y)</span>
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className="text-sm text-gray-500">Minimum SIP: <span className="font-semibold text-gray-900">₹{fund.minSip}</span></p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      
      <BottomNavigation activeTab="invest" />
    </div>
  );
};

export default MutualFundsScreen;
