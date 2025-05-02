
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Bell, Menu, ChevronRight, Clock, Calendar, Bookmark, RotateCw, Filter, Search } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';
import { toast } from '@/hooks/use-toast';

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
      oneYear: '65.2%',
      threeYear: '50.2%',
      fiveYear: '45.2%'
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
      oneYear: '65.2%',
      threeYear: '50.2%',
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
      oneYear: '65.2%',
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
      oneYear: '65.2%',
      threeYear: '50.2%',
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
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search initiated",
      description: `Searching for "${searchTerm}"`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Section */}
      <div className="bg-[#00B5C8] text-white pt-8 pb-2 px-4">
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
        <Card className="bg-[#00B5C8] text-white p-4 rounded-xl border-none shadow-none relative">
          <h2 className="font-medium text-lg mb-1">Your Portfolio</h2>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-white/80">Current Value</p>
              <p className="text-3xl font-bold">₹12,500</p>
              <div className="flex justify-between items-center w-full mt-1">
                <p className="text-sm">Returns: <span className="font-medium">+₹2,500</span></p>
                <p className="text-sm">Last Day: <span className="font-medium">+₹500</span></p>
              </div>
            </div>
            <div className="absolute top-4 right-4 bg-green-400/30 text-white px-3 py-1 rounded-full text-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
              +8.64%
            </div>
          </div>
        </Card>
      </div>
      
      {/* Quick Navigation Tabs */}
      <div className="bg-white mx-4 mt-4 p-2 rounded-xl grid grid-cols-4 gap-1 shadow-sm">
        <div 
          className={`flex flex-col items-center p-2 ${activeTab === 'holdings' ? 'text-[#00B5C8]' : 'text-gray-500'}`}
          onClick={() => setActiveTab('holdings')}
        >
          <Clock className="h-6 w-6 mb-1" />
          <span className="text-xs">Holdings</span>
        </div>
        <div
          className={`flex flex-col items-center p-2 ${activeTab === 'my-sips' ? 'text-[#00B5C8]' : 'text-gray-500'}`}
          onClick={() => setActiveTab('my-sips')}
        >
          <Calendar className="h-6 w-6 mb-1" />
          <span className="text-xs">My SIP's</span>
        </div>
        <div
          className={`flex flex-col items-center p-2 ${activeTab === 'wishlist' ? 'text-[#00B5C8]' : 'text-gray-500'}`}
          onClick={() => setActiveTab('wishlist')}
        >
          <Bookmark className="h-6 w-6 mb-1" />
          <span className="text-xs">Wishlist</span>
        </div>
        <div
          className={`flex flex-col items-center p-2 ${activeTab === 'transactions' ? 'text-[#00B5C8]' : 'text-gray-500'}`}
          onClick={() => setActiveTab('transactions')}
        >
          <RotateCw className="h-6 w-6 mb-1" />
          <span className="text-xs">Transactions</span>
        </div>
      </div>
      
      {/* Wealth Banner */}
      <div className="mx-4 my-5">
        <div className="bg-[#00B5C8] p-4 rounded-xl flex text-white relative overflow-hidden">
          <div className="z-10 flex-1">
            <h3 className="text-xl font-bold mb-2">Your Smart Path to Wealth</h3>
            <p className="text-sm mb-4">Start small, invest regularly, grow steadily</p>
            <Button className="bg-white text-[#00B5C8] hover:bg-white/90 rounded-full px-4 py-2 text-sm font-medium">
              Start SIP Today <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/2 opacity-30">
            <div className="w-full h-full bg-contain bg-right-bottom bg-no-repeat" 
                style={{ backgroundImage: "url('/lovable-uploads/4e240eae-0b55-4312-9e02-fd6bb783ee99.png')" }}></div>
          </div>
        </div>
      </div>
      
      {/* Collections Section */}
      <div className="px-4 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Collections</h2>
          <Link to="/invest/mutual-funds" className="text-[#00B5C8] text-sm font-medium">
            All Mutual Funds
          </Link>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          {collections.slice(0, 8).map((item, i) => (
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
          <Link to="/invest/mutual-funds" className="text-[#00B5C8] text-sm font-medium">
            View All
          </Link>
        </div>
        
        <div className="space-y-4">
          {popularFunds.map((fund) => (
            <Link key={fund.id} to={`/invest/mutual-fund/${fund.id}`}>
              <Card className="p-4 bg-white border border-gray-100 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center mr-3 text-2xl">
                      {fund.logo}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{fund.name}</h3>
                      <div className="flex items-center mt-1 gap-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                          {fund.category}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${fund.riskColor}`}>
                          {fund.riskLevel}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center px-2 py-1 bg-green-500 text-white rounded-md text-xs">
                    {fund.rating}<span className="ml-1">★</span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className="text-sm text-gray-700 mb-1">Returns:</p>
                  <div className="flex gap-2">
                    {Object.entries(fund.returns).map(([key, value], i) => {
                      let label;
                      if (key === 'oneYear') label = '(1Y)';
                      else if (key === 'threeYear') label = '(3Y)';
                      else if (key === 'fiveYear') label = '(5Y)';
                      
                      return (
                        <Badge key={i} variant="outline" className="text-green-700 bg-green-50 border-green-200">
                          <span className="text-green-700">+{value}</span>
                          <span className="text-xs ml-1">{label}</span>
                        </Badge>
                      );
                    })}
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
