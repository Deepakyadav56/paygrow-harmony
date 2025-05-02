
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, Home, Filter } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

// Fund data
const funds = [
  {
    id: 1,
    name: 'HDFC Small Cap',
    logo: '/lovable-uploads/3cada487-7916-4161-a148-a5f61f3e7999.png',
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
    logo: '/lovable-uploads/19c30682-3340-454b-91f8-1c7fca4b592d.png',
    category: 'Mid Cap',
    riskLevel: 'High Risk',
    riskColor: 'bg-red-100 text-red-800',
    rating: 3,
    returns: {
      oneYear: '65.2%',
      threeYear: '50.2%',
    },
    minSip: 100
  },
  {
    id: 3,
    name: 'ICICI Large Cap Fund',
    logo: '/lovable-uploads/90464780-8883-4a0a-817c-ff5cd1b5b8c2.png',
    category: 'Large Cap',
    riskLevel: 'Very High Risk',
    riskColor: 'bg-red-100 text-red-800',
    rating: 1,
    returns: {
      oneYear: '65.2%',
    },
    minSip: 100
  },
  {
    id: 4,
    name: 'HDFC Mid Cap Fund',
    logo: '/lovable-uploads/3cada487-7916-4161-a148-a5f61f3e7999.png',
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

const filterCategories = [
  { id: 'all', label: 'All Funds' },
  { id: 'large-cap', label: 'Large Cap' },
  { id: 'mid-cap', label: 'Mid Cap' },
  { id: 'small-cap', label: 'Small Cap' },
  { id: 'low-risk', label: 'Low Risk' },
];

const ExploreMutualFundsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Section */}
      <div className="bg-[#00B5C8] text-white pt-8 pb-6 px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="mr-3">
              <ArrowLeft className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-bold">Explore Mutual Funds</h1>
          </div>
          <button onClick={() => navigate('/')}>
            <Home className="h-6 w-6" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 pr-4 py-3 rounded-xl border-transparent bg-white text-gray-900"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Filter Tabs */}
      <div className="px-4 overflow-x-auto mt-4">
        <div className="flex space-x-2 pb-2">
          {filterCategories.map((category) => (
            <Button
              key={category.id}
              variant={activeFilter === category.id ? "default" : "outline"}
              className={`rounded-full whitespace-nowrap ${
                activeFilter === category.id 
                ? "bg-[#00B5C8] hover:bg-[#00a0b1] text-white" 
                : "border-gray-200"
              }`}
              onClick={() => setActiveFilter(category.id)}
            >
              {category.label}
            </Button>
          ))}
          <Button
            variant="outline"
            className="rounded-full border-gray-200 bg-white flex items-center gap-1 whitespace-nowrap"
            onClick={() => navigate('/invest/mutual-funds/filters')}
          >
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Fund Count */}
      <div className="px-4 my-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">120 Funds</h2>
        <Button
          variant="outline"
          className="rounded-full border-[#00B5C8] text-[#00B5C8]"
          onClick={() => navigate('/invest/mutual-funds/filters')}
        >
          <Filter className="h-4 w-4 mr-1" />
          Filter
        </Button>
      </div>
      
      {/* Fund List */}
      <div className="px-4 space-y-4">
        {funds.map((fund) => (
          <Link key={fund.id} to={`/invest/mutual-fund/${fund.id}`}>
            <Card className="p-4 bg-white rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 mr-3 flex items-center justify-center">
                    {fund.logo ? (
                      <img src={fund.logo} alt={fund.name} className="w-9 h-9 object-contain" />
                    ) : (
                      <div className="text-2xl">{fund.name.charAt(0)}</div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{fund.name}</h3>
                  </div>
                </div>
                
                <div className="flex items-center px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-sm">
                  {fund.rating}<span className="ml-1">★</span>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                    {fund.category}
                  </Badge>
                  <Badge variant="outline" className={`${fund.riskColor} border-transparent`}>
                    {fund.riskLevel}
                  </Badge>
                </div>
              </div>
              
              <div className="mb-3">
                <p className="text-sm font-medium">Returns:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {Object.entries(fund.returns).map(([key, value]) => {
                    let label;
                    if (key === 'oneYear') label = '(1Y)';
                    else if (key === 'threeYear') label = '(3Y)';
                    else if (key === 'fiveYear') label = '(5Y)';
                    
                    return (
                      <Badge key={key} variant="outline" className="text-green-700 bg-green-50 border-green-200">
                        +{value} <span className="text-xs">{label}</span>
                      </Badge>
                    );
                  })}
                </div>
              </div>
              
              <div className="text-gray-700">
                <p>Minimum SIP: <span className="font-medium text-gray-900">₹{fund.minSip}</span></p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
      
      <BottomNavigation activeTab="invest" />
    </div>
  );
};

export default ExploreMutualFundsScreen;
