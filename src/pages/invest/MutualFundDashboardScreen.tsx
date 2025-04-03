
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, Bell, ChevronRight, Wallet, Star, TrendingUp, Shield, 
  Briefcase, Calculator, LineChart, Filter, X, Check, ArrowDownUp 
} from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';
import EnhancedFundCard from '@/components/invest/EnhancedFundCard';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

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
  {
    id: 4,
    name: 'Motilal Oswal Midcap Fund',
    category: 'Mid Cap',
    returns: {
      oneYear: 16.7,
      threeYear: 28.8,
      fiveYear: 17.5,
    },
    riskLevel: 'High',
    rating: 5,
    minInvestment: 500,
  },
  {
    id: 5,
    name: 'SBI PSU Fund',
    category: 'Sectoral',
    returns: {
      oneYear: 19.5,
      threeYear: 31.3,
      fiveYear: 21.9,
    },
    riskLevel: 'High',
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

// Filter options
const sortOptions = [
  { id: 'popularity', label: 'Popularity' },
  { id: '1y', label: '1Y Returns' },
  { id: '3y', label: '3Y Returns' },
  { id: '5y', label: '5Y Returns' },
  { id: 'rating', label: 'Rating' },
];

const categoryOptions = [
  { id: 'equity', label: 'Equity' },
  { id: 'debt', label: 'Debt' },
  { id: 'hybrid', label: 'Hybrid' },
  { id: 'commodities', label: 'Commodities' },
];

const riskOptions = [
  { id: 'low', label: 'Low' },
  { id: 'moderately_low', label: 'Moderately Low' },
  { id: 'moderate', label: 'Moderate' },
  { id: 'moderately_high', label: 'Moderately High' },
  { id: 'high', label: 'High' },
  { id: 'very_high', label: 'Very High' },
];

const ratingOptions = [
  { id: '5star', label: '5 ★' },
  { id: '4star', label: '4 ★' },
  { id: '3star', label: '3 ★' },
  { id: '2star', label: '2 ★' },
  { id: '1star', label: '1 ★' },
];

const fundHouses = [
  'Axis Mutual Fund',
  'HDFC Mutual Fund',
  'SBI Mutual Fund',
  'Aditya Birla Sun Life Mutual Fund',
  'ICICI Prudential Mutual Fund',
  'Kotak Mahindra Mutual Fund',
  'Nippon India Mutual Fund',
  'DSP Mutual Fund',
  'UTI Mutual Fund',
  'Mirae Asset Mutual Fund',
];

const MutualFundDashboardScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('explore');
  const [filters, setFilters] = useState({
    sort: 'popularity',
    indexOnly: false,
    categories: [] as string[],
    risks: [] as string[],
    ratings: [] as string[],
    fundHouses: [] as string[],
  });
  
  const handleFilterChange = (type: string, value: any) => {
    setFilters(prev => {
      if (type === 'sort') {
        return { ...prev, sort: value };
      } else if (type === 'indexOnly') {
        return { ...prev, indexOnly: value };
      } else {
        // For multi-select options like categories, risks, ratings, fundHouses
        const currentValues = [...prev[type as keyof typeof prev]] as string[];
        
        if (currentValues.includes(value)) {
          return { 
            ...prev, 
            [type]: currentValues.filter(item => item !== value) 
          };
        } else {
          return { 
            ...prev, 
            [type]: [...currentValues, value] 
          };
        }
      }
    });
  };
  
  const clearAllFilters = () => {
    setFilters({
      sort: 'popularity',
      indexOnly: false,
      categories: [],
      risks: [],
      ratings: [],
      fundHouses: [],
    });
  };
  
  const countActiveFilters = () => {
    let count = 0;
    if (filters.sort !== 'popularity') count++;
    if (filters.indexOnly) count++;
    count += filters.categories.length;
    count += filters.risks.length;
    count += filters.ratings.length;
    count += filters.fundHouses.length;
    return count;
  };
  
  const activeFilterCount = countActiveFilters();
  
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
                  {featuredFunds.slice(0, 3).map(fund => (
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
              
              {/* All Mutual Funds Section with Filter */}
              <section className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">All Mutual Funds</h2>
                  
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center space-x-1 h-9">
                        <Filter className="h-4 w-4 mr-1" />
                        <span>Filters</span>
                        {activeFilterCount > 0 && (
                          <Badge variant="secondary" className="ml-1 bg-blue-100 text-blue-700">
                            {activeFilterCount}
                          </Badge>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[85vw] sm:max-w-md overflow-y-auto">
                      <SheetHeader className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Button variant="ghost" size="sm" className="mr-2 p-1 h-8 w-8">
                            <X className="h-5 w-5" />
                          </Button>
                          <SheetTitle>Filters</SheetTitle>
                        </div>
                        {activeFilterCount > 0 && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={clearAllFilters}
                            className="text-blue-600 h-8"
                          >
                            Clear all
                          </Button>
                        )}
                      </SheetHeader>
                      
                      <div className="py-4 space-y-6">
                        {/* Sort options */}
                        <div>
                          <h3 className="text-sm font-medium mb-3 flex items-center">
                            <ArrowDownUp className="h-4 w-4 mr-2 text-gray-500" />
                            Sort by
                          </h3>
                          <RadioGroup 
                            value={filters.sort} 
                            onValueChange={(value) => handleFilterChange('sort', value)}
                            className="space-y-2"
                          >
                            {sortOptions.map(option => (
                              <div key={option.id} className="flex items-center space-x-2">
                                <RadioGroupItem value={option.id} id={option.id} />
                                <label 
                                  htmlFor={option.id} 
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                        
                        <Separator />
                        
                        {/* Index Funds toggle */}
                        <div className="flex items-center justify-between">
                          <label htmlFor="index-funds" className="text-sm font-medium">
                            Index Funds Only
                          </label>
                          <Switch 
                            id="index-funds" 
                            checked={filters.indexOnly}
                            onCheckedChange={(checked) => handleFilterChange('indexOnly', checked)}
                          />
                        </div>
                        
                        <Separator />
                        
                        {/* Category options */}
                        <div>
                          <h3 className="text-sm font-medium mb-3">Category</h3>
                          <div className="space-y-2">
                            {categoryOptions.map(option => (
                              <div key={option.id} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={option.id} 
                                  checked={filters.categories.includes(option.id)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      handleFilterChange('categories', option.id);
                                    } else {
                                      handleFilterChange('categories', option.id);
                                    }
                                  }}
                                />
                                <label 
                                  htmlFor={option.id} 
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <Separator />
                        
                        {/* Risk level options */}
                        <div>
                          <h3 className="text-sm font-medium mb-3">Risk</h3>
                          <div className="space-y-2">
                            {riskOptions.map(option => (
                              <div key={option.id} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={option.id} 
                                  checked={filters.risks.includes(option.id)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      handleFilterChange('risks', option.id);
                                    } else {
                                      handleFilterChange('risks', option.id);
                                    }
                                  }}
                                />
                                <label 
                                  htmlFor={option.id} 
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <Separator />
                        
                        {/* Ratings options */}
                        <div>
                          <h3 className="text-sm font-medium mb-3">Ratings</h3>
                          <div className="space-y-2">
                            {ratingOptions.map(option => (
                              <div key={option.id} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={option.id} 
                                  checked={filters.ratings.includes(option.id)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      handleFilterChange('ratings', option.id);
                                    } else {
                                      handleFilterChange('ratings', option.id);
                                    }
                                  }}
                                />
                                <label 
                                  htmlFor={option.id} 
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <Separator />
                        
                        {/* Fund House options */}
                        <div>
                          <h3 className="text-sm font-medium mb-3">Fund House</h3>
                          <Input 
                            placeholder="Search fund house" 
                            className="mb-3"
                          />
                          <div className="space-y-2 max-h-48 overflow-y-auto">
                            {fundHouses.map((fundHouse, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`fund-house-${index}`} 
                                  checked={filters.fundHouses.includes(fundHouse)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      handleFilterChange('fundHouses', fundHouse);
                                    } else {
                                      handleFilterChange('fundHouses', fundHouse);
                                    }
                                  }}
                                />
                                <label 
                                  htmlFor={`fund-house-${index}`} 
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {fundHouse}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
                        <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                          View {featuredFunds.length} funds
                        </Button>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
                
                {/* Active filters display */}
                {activeFilterCount > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {filters.indexOnly && (
                      <Badge variant="outline" className="flex items-center gap-1 bg-gray-100">
                        Index Only
                        <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => handleFilterChange('indexOnly', false)} />
                      </Badge>
                    )}
                    
                    {filters.sort !== 'popularity' && (
                      <Badge variant="outline" className="flex items-center gap-1 bg-gray-100">
                        {sortOptions.find(opt => opt.id === filters.sort)?.label}
                        <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => handleFilterChange('sort', 'popularity')} />
                      </Badge>
                    )}
                    
                    {filters.categories.map(cat => (
                      <Badge key={cat} variant="outline" className="flex items-center gap-1 bg-gray-100">
                        {categoryOptions.find(opt => opt.id === cat)?.label}
                        <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => handleFilterChange('categories', cat)} />
                      </Badge>
                    ))}
                    
                    {filters.risks.map(risk => (
                      <Badge key={risk} variant="outline" className="flex items-center gap-1 bg-gray-100">
                        {riskOptions.find(opt => opt.id === risk)?.label}
                        <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => handleFilterChange('risks', risk)} />
                      </Badge>
                    ))}
                    
                    {filters.ratings.map(rating => (
                      <Badge key={rating} variant="outline" className="flex items-center gap-1 bg-gray-100">
                        {ratingOptions.find(opt => opt.id === rating)?.label}
                        <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => handleFilterChange('ratings', rating)} />
                      </Badge>
                    ))}
                    
                    {filters.fundHouses.map(house => (
                      <Badge key={house} variant="outline" className="flex items-center gap-1 bg-gray-100">
                        {house.length > 15 ? house.substring(0, 15) + '...' : house}
                        <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => handleFilterChange('fundHouses', house)} />
                      </Badge>
                    ))}
                    
                    {activeFilterCount > 1 && (
                      <Badge variant="outline" className="flex items-center gap-1 bg-blue-100 text-blue-700 cursor-pointer" onClick={clearAllFilters}>
                        Clear All
                      </Badge>
                    )}
                  </div>
                )}
                
                {/* Display all funds */}
                <div className="space-y-3">
                  {featuredFunds.map(fund => (
                    <EnhancedFundCard 
                      key={fund.id} 
                      {...fund} 
                      compact
                    />
                  ))}
                </div>
                
                <Button className="w-full mt-4 bg-paygrow-blue h-12">
                  View All Mutual Funds
                </Button>
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
        </Tabs>
      </div>
      
      <BottomNavigation activeTab="invest" />
    </div>
  );
};

export default MutualFundDashboardScreen;
