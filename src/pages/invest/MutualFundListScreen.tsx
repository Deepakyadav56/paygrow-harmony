
import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, Info, TrendingUp, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for mutual funds
const mutualFunds = [
  {
    id: 1,
    name: 'Axis Bluechip Fund',
    category: 'Large Cap',
    returns: {
      oneYear: 12.5,
      threeYear: 15.8,
      fiveYear: 14.2,
    },
    riskLevel: 'Moderate',
    nav: 45.67,
    rating: 5,
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
    riskLevel: 'High',
    nav: 78.34,
    rating: 4,
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
    riskLevel: 'Very High',
    nav: 112.45,
    rating: 4,
  },
  {
    id: 4,
    name: 'Kotak Equity Hybrid Fund',
    category: 'Hybrid',
    returns: {
      oneYear: 9.8,
      threeYear: 12.4,
      fiveYear: 11.6,
    },
    riskLevel: 'Moderate',
    nav: 34.67,
    rating: 3,
  },
  {
    id: 5,
    name: 'ICICI Prudential Value Discovery',
    category: 'Value',
    returns: {
      oneYear: 14.9,
      threeYear: 13.7,
      fiveYear: 12.9,
    },
    riskLevel: 'Moderate',
    nav: 67.23,
    rating: 5,
  },
  {
    id: 6,
    name: 'Aditya Birla Sun Life Tax Relief 96',
    category: 'ELSS',
    returns: {
      oneYear: 13.2,
      threeYear: 14.5,
      fiveYear: 13.8,
    },
    riskLevel: 'High',
    nav: 45.12,
    rating: 4,
  },
];

const MutualFundListScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredFunds = mutualFunds.filter(fund => 
    fund.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fund.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Filter funds based on active tab
  const displayFunds = activeTab === 'all' 
    ? filteredFunds 
    : filteredFunds.filter(fund => {
        if (activeTab === 'high-return') return fund.returns.oneYear > 15;
        if (activeTab === 'low-risk') return fund.riskLevel === 'Low' || fund.riskLevel === 'Moderate';
        if (activeTab === 'tax-saving') return fund.category === 'ELSS';
        return true;
      });
  
  return (
    <div className="min-h-screen flex flex-col pb-16">
      {/* Header */}
      <div className="bg-paygrow-green text-white pt-12 pb-6 px-4 flex items-center">
        <Link to="/invest" className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold">Mutual Funds</h1>
      </div>
      
      {/* Search & Filters */}
      <div className="px-4 py-4 bg-white sticky top-0 z-10 border-b">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            className="pl-10 bg-gray-100"
            placeholder="Search mutual funds"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="high-return">High Return</TabsTrigger>
            <TabsTrigger value="low-risk">Low Risk</TabsTrigger>
            <TabsTrigger value="tax-saving">Tax Saving</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Mutual Funds List */}
      <div className="flex-1 px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">{displayFunds.length} funds found</span>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
        
        <div className="space-y-4">
          {displayFunds.map(fund => (
            <Link to={`/invest/mutual-fund/${fund.id}`} key={fund.id}>
              <Card className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold">{fund.name}</h3>
                    <p className="text-xs text-gray-500">{fund.category} • {fund.riskLevel} Risk</p>
                  </div>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star 
                        key={index}
                        className={`h-4 w-4 ${
                          index < fund.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div>
                    <p className="text-xs text-gray-500">1Y Returns</p>
                    <p className={`text-sm font-medium ${fund.returns.oneYear > 10 ? 'text-green-600' : 'text-orange-600'}`}>
                      {fund.returns.oneYear}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">3Y Returns</p>
                    <p className="text-sm font-medium">{fund.returns.threeYear}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">NAV</p>
                    <p className="text-sm font-medium">₹{fund.nav}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button className="flex-1 bg-paygrow-green">Invest</Button>
                  <Button variant="outline" className="flex-1">SIP</Button>
                </div>
              </Card>
            </Link>
          ))}
          
          {displayFunds.length === 0 && (
            <div className="text-center py-10">
              <Info className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No mutual funds found</p>
              <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MutualFundListScreen;
