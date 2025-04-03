
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Bell, ChevronRight, Wallet, Star, TrendingUp, Shield, Briefcase, Calculator, LineChart } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';
import EnhancedFundCard from '@/components/invest/EnhancedFundCard';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock data for featured funds
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
    riskLevel: 'Moderate',
    rating: 5,
    minInvestment: 500,
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
    rating: 4,
    minInvestment: 1000,
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
    rating: 4,
    minInvestment: 500,
  },
];

// Fund categories
const fundCategories = [
  { name: 'Large Cap', icon: <Shield className="h-10 w-10 text-blue-600" />, description: 'Stable returns' },
  { name: 'Mid Cap', icon: <TrendingUp className="h-10 w-10 text-green-600" />, description: 'Growth focused' },
  { name: 'Small Cap', icon: <Briefcase className="h-10 w-10 text-orange-600" />, description: 'High growth potential' },
  { name: 'ELSS', icon: <Calculator className="h-10 w-10 text-purple-600" />, description: 'Tax saving' },
  { name: 'Index', icon: <LineChart className="h-10 w-10 text-indigo-600" />, description: 'Passive investing' },
];

// Fund collections
const fundCollections = [
  { name: 'High Return', description: 'Funds with 15%+ returns', color: 'bg-gradient-to-r from-orange-500 to-red-500' },
  { name: 'SIP with ₹500', description: 'Start small, grow big', color: 'bg-gradient-to-r from-blue-500 to-indigo-500' },
  { name: 'Tax Saving', description: 'Save tax with ELSS', color: 'bg-gradient-to-r from-green-500 to-teal-500' },
  { name: 'For Beginners', description: 'Low risk options', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
];

const MutualFundDashboardScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('explore');
  
  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-paygrow-blue to-blue-600 text-white pt-12 pb-5 px-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold">Mutual Funds</h1>
            <p className="text-white/80 text-sm">Grow your wealth with expert selections</p>
          </div>
          <div className="flex items-center space-x-2">
            <Link to="/invest/portfolio" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all">
              <Wallet className="h-5 w-5" />
            </Link>
            <Link to="/notifications" className="relative bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </Link>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-white/60" />
          <input
            type="text"
            placeholder="Search mutual funds"
            className="w-full bg-white/10 text-white placeholder:text-white/60 border-0 rounded-xl p-2.5 pl-10 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </div>
      </div>
      
      {/* Tabs */}
      <div className="bg-white border-b">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="explore">Explore</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="sips">SIPs</TabsTrigger>
            <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Main Content */}
      <div className="px-4 py-4">
        <TabsContent value="explore" className="mt-0 space-y-6">
          {/* Collections Section */}
          <section>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Collections</h2>
              <Link to="/invest/collections" className="text-blue-600 text-sm flex items-center">
                View all <ChevronRight className="h-4 w-4 ml-0.5" />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {fundCollections.map((collection, index) => (
                <Link to={`/invest/collections/${collection.name.toLowerCase().replace(/\s+/g, '-')}`} key={index}>
                  <div className={`p-4 rounded-xl text-white ${collection.color}`}>
                    <h3 className="font-semibold">{collection.name}</h3>
                    <p className="text-xs mt-1 text-white/80">{collection.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
          
          {/* Popular Funds Section */}
          <section>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Popular Funds</h2>
              <Link to="/invest/mutual-funds" className="text-blue-600 text-sm flex items-center">
                View all <ChevronRight className="h-4 w-4 ml-0.5" />
              </Link>
            </div>
            
            <div className="space-y-3">
              {featuredFunds.map(fund => (
                <EnhancedFundCard 
                  key={fund.id} 
                  {...fund} 
                  compact
                />
              ))}
            </div>
          </section>
          
          {/* Fund Categories */}
          <section>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Categories</h2>
              <Link to="/invest/categories" className="text-blue-600 text-sm flex items-center">
                View all <ChevronRight className="h-4 w-4 ml-0.5" />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {fundCategories.map((category, index) => (
                <Link to={`/invest/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`} key={index}>
                  <Card className="p-4 border border-gray-100 hover:shadow-sm transition-all">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gray-100 p-2 rounded-lg">
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{category.name}</h3>
                        <p className="text-xs text-gray-500">{category.description}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
          
          {/* Tools & Calculators */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Products & tools</h2>
            <div className="grid grid-cols-3 gap-3">
              <Link to="/invest/sip-calculator">
                <Card className="p-3 flex flex-col items-center justify-center text-center h-24 border-gray-100 hover:shadow-sm transition-all">
                  <Calculator className="h-6 w-6 text-blue-600 mb-2" />
                  <span className="text-sm">SIP Calculator</span>
                </Card>
              </Link>
              <Link to="/invest/compare">
                <Card className="p-3 flex flex-col items-center justify-center text-center h-24 border-gray-100 hover:shadow-sm transition-all">
                  <TrendingUp className="h-6 w-6 text-green-600 mb-2" />
                  <span className="text-sm">Compare funds</span>
                </Card>
              </Link>
              <Link to="/invest/fund-selector">
                <Card className="p-3 flex flex-col items-center justify-center text-center h-24 border-gray-100 hover:shadow-sm transition-all">
                  <Star className="h-6 w-6 text-amber-500 mb-2" />
                  <span className="text-sm">Fund Selector</span>
                </Card>
              </Link>
            </div>
          </section>
          
          {/* All Mutual Funds Section */}
          <section>
            <Link to="/invest/mutual-funds">
              <Button className="w-full bg-paygrow-blue h-12">
                All Mutual Funds
              </Button>
            </Link>
          </section>
        </TabsContent>
        
        <TabsContent value="dashboard" className="mt-0">
          <div className="flex flex-col items-center justify-center py-10">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
              <Wallet className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No investments yet</h3>
            <p className="text-gray-500 text-center mb-6">Start your investment journey by investing in mutual funds</p>
            <Button className="bg-paygrow-blue" asChild>
              <Link to="/invest/mutual-funds">Explore Funds</Link>
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="sips" className="mt-0">
          <div className="flex flex-col items-center justify-center py-10">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
              <Calculator className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No SIPs yet</h3>
            <p className="text-gray-500 text-center mb-6">Start small and build wealth with regular investments</p>
            <Button className="bg-paygrow-blue" asChild>
              <Link to="/invest/sip-calculator">Try SIP Calculator</Link>
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="watchlist" className="mt-0">
          <div className="flex flex-col items-center justify-center py-10">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
              <Star className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Your watchlist is empty</h3>
            <p className="text-gray-500 text-center mb-6">Add funds to your watchlist to track them easily</p>
            <Button className="bg-paygrow-blue" asChild>
              <Link to="/invest/mutual-funds">Browse Funds</Link>
            </Button>
          </div>
        </TabsContent>
      </div>
      
      <BottomNavigation activeTab="invest" />
    </div>
  );
};

export default MutualFundDashboardScreen;
