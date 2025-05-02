
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Filter, Search, X, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import BottomNavigation from '@/components/BottomNavigation';
import MutualFundCard from '@/components/invest/MutualFundCard';
import FundFilterModal from '@/components/invest/FundFilterModal';

// Mock mutual funds data
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
    tags: ['Top Performer', 'Popular'],
    aum: '23,458 Cr',
    expenseRatio: 1.8,
    minInvestment: 500,
    trending: true,
    fundHouse: 'Axis Mutual Fund',
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
    tags: ['High Returns'],
    aum: '28,712 Cr',
    expenseRatio: 1.9,
    minInvestment: 1000,
    trending: true,
    fundHouse: 'HDFC Mutual Fund',
  },
  {
    id: 3,
    name: 'SBI Small Cap Fund',
    category: 'Small Cap',
    returns: {
      oneYear: 22.7,
      threeYear: 31.31,
      fiveYear: 18.2,
    },
    riskLevel: 'Very High',
    nav: 112.45,
    rating: 4,
    tags: ['Sector Leader'],
    aum: '15,890 Cr',
    expenseRatio: 2.1,
    minInvestment: 500,
    trending: true,
    fundHouse: 'SBI Mutual Fund',
  },
  {
    id: 4,
    name: 'Motilal Oswal Midcap Fund',
    category: 'Mid Cap',
    returns: {
      oneYear: 21.4,
      threeYear: 28.82,
      fiveYear: 16.9,
    },
    riskLevel: 'High',
    nav: 34.67,
    rating: 4,
    tags: ['High Returns'],
    aum: '9,456 Cr',
    expenseRatio: 1.7,
    minInvestment: 500,
    trending: true,
    fundHouse: 'Motilal Oswal Mutual Fund',
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
    tags: ['Value Pick'],
    aum: '19,234 Cr',
    expenseRatio: 1.8,
    minInvestment: 1000,
    trending: false,
    fundHouse: 'ICICI Prudential Mutual Fund',
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
    tags: ['Tax Saving'],
    aum: '12,678 Cr',
    expenseRatio: 1.9,
    minInvestment: 500,
    trending: false,
    fundHouse: 'Aditya Birla Sun Life Mutual Fund',
  },
];

// Define category types for filter chips
const categoryOptions = [
  'Flexi Cap', 'Large Cap', 'Mid Cap', 'Small Cap', 'ELSS', 'Sectoral', 'Hybrid'
];

// Define risk options for filter chips
const riskOptions = [
  'Low', 'Moderate', 'High', 'Very High'
];

// Define rating options for filter chips
const ratingOptions = [
  '1+ ★', '2+ ★', '3+ ★', '4+ ★', '5 ★'
];

const AllMutualFundsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [filteredFunds, setFilteredFunds] = useState(mutualFunds);
  
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleApplyFilters = (filters: any) => {
    console.log('Applied filters:', filters);
    
    // In a real app, you would filter the mutualFunds array based on these filters
    // For now, we'll just update active filters for display
    const newActiveFilters: string[] = [];
    
    if (filters.categories.length > 0) {
      newActiveFilters.push(...filters.categories);
    }
    
    if (filters.riskLevels.length > 0) {
      newActiveFilters.push(...filters.riskLevels);
    }
    
    if (filters.ratings.length > 0) {
      newActiveFilters.push(...filters.ratings.map((r: string) => `${r}+ ★`));
    }
    
    setActiveFilters(newActiveFilters);
  };
  
  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };
  
  const clearAllFilters = () => {
    setActiveFilters([]);
  };
  
  const addFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter]);
    }
  };
  
  // Get star rating JSX
  const renderStars = (rating: number) => (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star 
          key={i} 
          size={16}
          className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
        />
      ))}
    </div>
  );
  
  return (
    <div className="min-h-screen flex flex-col pb-24 bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-paygrow-blue to-blue-500 text-white pt-12 pb-6 px-4">
        <div className="flex items-center">
          <Button variant="ghost" className="p-0 mr-3" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-6 w-6 text-white" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">All Mutual Funds</h1>
            <p className="text-sm text-white/80">Explore funds across categories</p>
          </div>
        </div>
      </div>
      
      {/* Search & Filters */}
      <div className="px-4 py-4 bg-white sticky top-0 z-10 border-b shadow-sm">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            className="pl-10 bg-gray-100 border-gray-200"
            placeholder="Search funds by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex justify-between items-center mb-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-white border-gray-300"
            onClick={() => setShowFilterModal(true)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          
          {activeFilters.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 h-8 px-2 text-xs"
              onClick={clearAllFilters}
            >
              Clear all
            </Button>
          )}
        </div>
        
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {activeFilters.map((filter) => (
              <Badge
                key={filter}
                variant="outline"
                className="bg-blue-50 border-blue-200 text-blue-700 py-1.5 px-2 rounded-full"
              >
                {filter}
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() => removeFilter(filter)}
                />
              </Badge>
            ))}
          </div>
        )}
        
        <div className="overflow-x-auto flex space-x-2 py-3 -mr-4 pr-4">
          <div className="flex space-x-2">
            {categoryOptions.map((option) => (
              <Badge
                key={option}
                variant="outline"
                className={`whitespace-nowrap py-1.5 px-3 rounded-full cursor-pointer ${
                  activeFilters.includes(option)
                    ? "bg-blue-50 border-blue-200 text-blue-700"
                    : "bg-gray-50 border-gray-200 text-gray-700"
                }`}
                onClick={() => 
                  activeFilters.includes(option) 
                    ? removeFilter(option) 
                    : addFilter(option)
                }
              >
                {option}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      
      {/* Funds List */}
      <div className="flex-1 p-4">
        <div className="space-y-4">
          {loading ? (
            // Skeleton loaders for funds
            Array.from({ length: 3 }).map((_, idx) => (
              <Card key={idx} className="p-4 animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="h-8 bg-gray-200 rounded"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
                <div className="flex space-x-2">
                  <div className="h-10 bg-gray-200 rounded flex-1"></div>
                </div>
              </Card>
            ))
          ) : (
            filteredFunds.map(fund => (
              <div key={fund.id} className="mb-4">
                <Link to={`/invest/mutual-fund/${fund.id}`}>
                  <Card className="p-4 bg-white border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-blue-600">{fund.name}</h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="text-sm text-gray-600">{fund.category}</span>
                          <Badge 
                            className={`
                              ${fund.riskLevel === 'Low' ? 'bg-green-100 text-green-800' : ''}
                              ${fund.riskLevel === 'Moderate' ? 'bg-blue-100 text-blue-800' : ''}
                              ${fund.riskLevel === 'High' ? 'bg-orange-100 text-orange-800' : ''}
                              ${fund.riskLevel === 'Very High' ? 'bg-red-100 text-red-800' : ''}
                            `}
                          >
                            {fund.riskLevel} Risk
                          </Badge>
                        </div>
                      </div>
                      <div className="flex-shrink-0">{renderStars(fund.rating)}</div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-500">3Y Returns</span>
                        <span className="font-semibold text-green-600">{fund.returns.threeYear}%</span>
                      </div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-500">1Y Returns</span>
                        <span className="font-semibold text-green-600">{fund.returns.oneYear}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Min Investment</span>
                        <span className="font-semibold">₹{fund.minInvestment}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                    >
                      Invest
                    </Button>
                  </Card>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Filter Modal */}
      <FundFilterModal 
        open={showFilterModal} 
        onClose={() => setShowFilterModal(false)} 
        onApplyFilters={handleApplyFilters}
      />
      
      <BottomNavigation activeTab="invest" />
    </div>
  );
};

export default AllMutualFundsScreen;
