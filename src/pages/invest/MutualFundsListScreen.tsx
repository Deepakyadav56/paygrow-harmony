
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter, ChevronDown, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FundListItem from '@/components/invest/FundListItem';
import BottomNavigation from '@/components/BottomNavigation';

const mutualFunds = [
  {
    id: 1,
    name: 'Axis Bluechip Fund',
    category: 'Large Cap',
    returns: 15.80,
    rating: 5,
  },
  {
    id: 2,
    name: 'HDFC Mid-Cap Opportunities',
    category: 'Mid Cap',
    returns: 16.90,
    rating: 4,
  },
  {
    id: 3,
    name: 'SBI Small Cap Fund',
    category: 'Small Cap',
    returns: 19.50,
    rating: 4,
  },
  {
    id: 4,
    name: 'Mirae Asset Large Cap Fund',
    category: 'Large Cap',
    returns: 14.80,
    rating: 5,
  },
  {
    id: 5,
    name: 'Parag Parikh Flexi Cap Fund',
    category: 'Flexi Cap',
    returns: 18.30,
    rating: 5,
  },
  {
    id: 6,
    name: 'Aditya Birla Sun Life Tax Relief 96',
    category: 'ELSS',
    returns: 14.50,
    rating: 4,
  },
];

const MutualFundsListScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [indexOnly, setIndexOnly] = useState(false);
  const [sortBy, setSortBy] = useState('returns');

  const handleIndexToggle = () => {
    setIndexOnly(!indexOnly);
  };

  const filteredFunds = mutualFunds.filter(fund => 
    fund.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fund.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort funds based on selected criteria
  const sortedFunds = [...filteredFunds].sort((a, b) => {
    if (sortBy === 'returns') {
      return b.returns - a.returns;
    } else if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });

  return (
    <div className="min-h-screen pb-16 bg-gray-50">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 pt-12 pb-2 px-4 border-b">
        <div className="flex items-center mb-4">
          <Link to="/invest" className="mr-3">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <h1 className="text-xl font-bold">All Mutual Funds</h1>
        </div>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search funds by name or category"
            className="pl-10 pr-3 py-2 w-full border border-gray-200 rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="explore" className="w-full">
          <TabsList className="grid grid-cols-4 gap-1 bg-gray-100 p-1 rounded-xl">
            <TabsTrigger 
              value="explore" 
              className="rounded-lg text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
              onClick={() => setActiveTab('explore')}
            >
              Explore
            </TabsTrigger>
            <TabsTrigger 
              value="dashboard" 
              className="rounded-lg text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="sips" 
              className="rounded-lg text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
              onClick={() => setActiveTab('sips')}
            >
              SIPs
            </TabsTrigger>
            <TabsTrigger 
              value="watchlist" 
              className="rounded-lg text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
              onClick={() => setActiveTab('watchlist')}
            >
              Watchlist
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Filters */}
      <div className="p-4 bg-white border-b">
        <div className="flex justify-between mb-2">
          <h2 className="text-xl font-bold">All Mutual Funds</h2>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center space-x-1 rounded-full"
              onClick={() => navigate('/invest/fund-screener')}
            >
              <Filter className="h-3.5 w-3.5" />
              <span>Filter</span>
            </Button>
            
            <div className="relative">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center space-x-1 rounded-full"
              >
                <span>Sort by</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Index only</span>
            <Switch 
              checked={indexOnly}
              onCheckedChange={handleIndexToggle}
            />
          </div>
        </div>
      </div>
      
      {/* Fund count */}
      <div className="px-4 py-2 flex justify-between items-center bg-gray-50 text-sm">
        <span className="text-gray-500">{sortedFunds.length} funds</span>
        <div className="flex items-center space-x-1">
          <span className="text-gray-600">3Y Returns</span>
          <ChevronDown className="h-4 w-4 text-gray-600" />
        </div>
      </div>
      
      {/* Fund List */}
      <div className="bg-white">
        {sortedFunds.map((fund) => (
          <FundListItem
            key={fund.id}
            id={fund.id}
            name={fund.name}
            category={fund.category}
            rating={fund.rating}
            returns={fund.returns}
          />
        ))}
      </div>
      
      <BottomNavigation activeTab="invest" />
    </div>
  );
};

export default MutualFundsListScreen;
