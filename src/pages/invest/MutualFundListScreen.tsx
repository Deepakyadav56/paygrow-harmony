import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, X, Filter, Star, ChevronRight, ChevronDown, CheckSquare, ChevronUp, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import BottomNavigation from '@/components/BottomNavigation';

// Enhanced mock data for mutual funds
const mutualFunds = [
  {
    id: 1,
    name: 'Axis Bluechip Fund',
    category: 'Equity Large Cap',
    subcategory: 'Large Cap',
    returns: {
      oneYear: 12.5,
      threeYear: 15.8,
      fiveYear: 14.2,
    },
    riskLevel: 'Moderate',
    rating: 5,
    minInvestment: 500,
    amc: 'Axis Mutual Fund',
    logo: '💼',
  },
  {
    id: 2,
    name: 'HDFC Mid-Cap Opportunities',
    category: 'Equity Mid Cap',
    subcategory: 'Mid Cap',
    returns: {
      oneYear: 18.2,
      threeYear: 16.9,
      fiveYear: 15.7,
    },
    riskLevel: 'High',
    rating: 4,
    minInvestment: 1000,
    amc: 'HDFC Mutual Fund',
    logo: '💰',
  },
  {
    id: 3,
    name: 'SBI Small Cap Fund',
    category: 'Equity Small Cap',
    subcategory: 'Small Cap',
    returns: {
      oneYear: 22.7,
      threeYear: 19.5,
      fiveYear: 18.2,
    },
    riskLevel: 'Very High',
    rating: 4,
    minInvestment: 500,
    amc: 'SBI Mutual Fund',
    logo: '📊',
  },
  {
    id: 4,
    name: 'Mirae Asset Large Cap Fund',
    category: 'Equity Large Cap',
    subcategory: 'Large Cap',
    returns: {
      oneYear: 11.9,
      threeYear: 14.8,
      fiveYear: 13.5,
    },
    riskLevel: 'Moderate',
    rating: 5,
    minInvestment: 1000,
    amc: 'Mirae Asset Mutual Fund',
    logo: '📈',
  },
  {
    id: 5,
    name: 'Parag Parikh Flexi Cap Fund',
    category: 'Equity Flexi Cap',
    subcategory: 'Flexi Cap',
    returns: {
      oneYear: 17.2,
      threeYear: 18.3,
      fiveYear: 16.9,
    },
    riskLevel: 'Moderate',
    rating: 5,
    minInvestment: 1000,
    amc: 'PPFAS Mutual Fund',
    logo: '🌱',
  },
  {
    id: 6,
    name: 'Aditya Birla Sun Life Tax Relief 96',
    category: 'Equity ELSS',
    subcategory: 'ELSS',
    returns: {
      oneYear: 13.2,
      threeYear: 14.5,
      fiveYear: 13.8,
    },
    riskLevel: 'High',
    rating: 4,
    minInvestment: 500,
    amc: 'Aditya Birla Sun Life Mutual Fund',
    logo: '☀️',
  },
  {
    id: 7,
    name: 'ICICI Prudential Value Discovery',
    category: 'Equity Value',
    subcategory: 'Value',
    returns: {
      oneYear: 14.9,
      threeYear: 13.7,
      fiveYear: 12.9,
    },
    riskLevel: 'Moderate',
    rating: 5,
    minInvestment: 1000,
    amc: 'ICICI Prudential Mutual Fund',
    logo: '🔷',
  },
  {
    id: 8,
    name: 'Motilal Oswal Midcap Fund',
    category: 'Equity Mid Cap',
    subcategory: 'Mid Cap',
    returns: {
      oneYear: 19.2,
      threeYear: 28.0,
      fiveYear: 17.5,
    },
    riskLevel: 'High',
    rating: 5,
    minInvestment: 500,
    amc: 'Motilal Oswal Mutual Fund',
    logo: '🟠',
  },
  {
    id: 9,
    name: 'Quant Small Cap Fund',
    category: 'Equity Small Cap',
    subcategory: 'Small Cap',
    returns: {
      oneYear: 22.3,
      threeYear: 21.2,
      fiveYear: 19.6,
    },
    riskLevel: 'Very High',
    rating: 5,
    minInvestment: 500,
    amc: 'Quant Mutual Fund',
    logo: '📉',
  },
  {
    id: 10,
    name: 'Nippon India Small Cap Fund',
    category: 'Equity Small Cap',
    subcategory: 'Small Cap',
    returns: {
      oneYear: 20.8,
      threeYear: 21.7,
      fiveYear: 18.9,
    },
    riskLevel: 'Very High',
    rating: 4,
    minInvestment: 1000,
    amc: 'Nippon India Mutual Fund',
    logo: '🔴',
  },
];

// AMC list for filter
const amcList = [
  'Axis Mutual Fund',
  'HDFC Mutual Fund',
  'SBI Mutual Fund',
  'Mirae Asset Mutual Fund',
  'PPFAS Mutual Fund',
  'Aditya Birla Sun Life Mutual Fund',
  'ICICI Prudential Mutual Fund',
  'Motilal Oswal Mutual Fund',
  'Quant Mutual Fund',
  'Nippon India Mutual Fund',
  '360 ONE Mutual Fund',
  'Bandhan Mutual Fund',
  'Bank of India Mutual Fund',
  'Baroda BNP Paribas Mutual Fund',
  'Canara Robeco Mutual Fund',
  'DSP Mutual Fund',
  'Edelweiss Mutual Fund',
  'Franklin Templeton Mutual Fund',
  'Groww Mutual Fund',
];

// Fund categories
const fundCategories = [
  { value: 'Equity', label: 'Equity', subcategories: [
    'Large Cap',
    'Mid Cap',
    'Small Cap',
    'Multi Cap',
    'Large & MidCap',
    'Flexi Cap',
    'ELSS',
    'Sectoral',
    'Thematic',
    'Value Oriented',
    'International',
  ]},
  { value: 'Debt', label: 'Debt', subcategories: [
    'Liquid',
    'Ultra Short',
    'Low Duration',
    'Short Duration',
    'Corporate Bond',
    'Banking & PSU',
    'Gilt',
    'Credit Risk',
  ]},
  { value: 'Hybrid', label: 'Hybrid', subcategories: [
    'Aggressive',
    'Balanced',
    'Conservative',
    'Multi Asset',
  ]},
  { value: 'Commodities', label: 'Commodities', subcategories: [
    'Gold',
    'Silver',
  ]},
];

// Risk levels
const riskLevels = [
  'Low',
  'Moderately Low',
  'Moderate',
  'Moderately High',
  'High',
  'Very High',
];

// Ratings
const ratings = [
  { value: '5', label: '5 ★' },
  { value: '4+', label: '4+ ★' },
  { value: '3+', label: '3+ ★' },
  { value: '2+', label: '2+ ★' },
  { value: '1+', label: '1+ ★' },
];

// Sort options
const sortOptions = [
  { value: 'popularity', label: 'Popularity' },
  { value: '1y', label: '1Y Returns' },
  { value: '3y', label: '3Y Returns' },
  { value: '5y', label: '5Y Returns' },
  { value: 'rating', label: 'Rating' },
];

const MutualFundListScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedRiskLevels, setSelectedRiskLevels] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [selectedAmcs, setSelectedAmcs] = useState<string[]>([]);
  const [filteredFunds, setFilteredFunds] = useState(mutualFunds);
  const [indexOnly, setIndexOnly] = useState(false);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'sort' | 'categories' | 'risk' | 'ratings' | 'fundHouse' | null>(null);
  const [sortBy, setSortBy] = useState('popularity');
  const [loading, setLoading] = useState(true);
  const [totalFunds, setTotalFunds] = useState(mutualFunds.length);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  
  // Navigation tabs
  const tabs = [
    { id: 'explore', label: 'Explore' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'sips', label: 'SIPs' },
    { id: 'watchlist', label: 'Watchlist' },
  ];
  const [activeTab, setActiveTab] = useState('explore');
  
  // Applied filters for chip display
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter funds based on all criteria
  useEffect(() => {
    let filtered = mutualFunds;
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(fund => 
        fund.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fund.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fund.amc.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filters
    if (selectedCategories.length > 0 || selectedSubcategories.length > 0) {
      filtered = filtered.filter(fund => {
        const categoryMatch = selectedCategories.length === 0 || 
          selectedCategories.some(cat => fund.category.includes(cat));
        
        const subcategoryMatch = selectedSubcategories.length === 0 || 
          selectedSubcategories.some(subcat => fund.subcategory === subcat || fund.category.includes(subcat));
        
        return categoryMatch && subcategoryMatch;
      });
    }
    
    // Apply risk level filter
    if (selectedRiskLevels.length > 0) {
      filtered = filtered.filter(fund => 
        selectedRiskLevels.includes(fund.riskLevel)
      );
    }
    
    // Apply rating filter
    if (selectedRatings.length > 0) {
      filtered = filtered.filter(fund => {
        for (const ratingFilter of selectedRatings) {
          const minRating = parseInt(ratingFilter.charAt(0));
          if (fund.rating >= minRating) return true;
        }
        return false;
      });
    }
    
    // Apply AMC filter
    if (selectedAmcs.length > 0) {
      filtered = filtered.filter(fund => 
        selectedAmcs.includes(fund.amc)
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case '1y':
        filtered.sort((a, b) => b.returns.oneYear - a.returns.oneYear);
        break;
      case '3y':
        filtered.sort((a, b) => b.returns.threeYear - a.returns.threeYear);
        break;
      case '5y':
        filtered.sort((a, b) => b.returns.fiveYear - a.returns.fiveYear);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      // For popularity we'll use the default order
      default:
        break;
    }
    
    // Update filtered funds and total count
    setFilteredFunds(filtered);
    setTotalFunds(filtered.length);
    
    // Collect applied filters for chips display
    const applied: string[] = [];
    if (selectedSubcategories.length > 0) {
      applied.push(...selectedSubcategories);
    }
    if (selectedRatings.length > 0) {
      applied.push(...selectedRatings.map(r => r));
    }
    setAppliedFilters(applied);
    
  }, [searchQuery, selectedCategories, selectedSubcategories, selectedRiskLevels, selectedRatings, selectedAmcs, sortBy, indexOnly]);
  
  // Toggle a category selection
  const toggleCategory = (category: string) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
    }
  };
  
  // Toggle a subcategory selection
  const toggleSubcategory = (subcategory: string) => {
    setSelectedSubcategories(prev => 
      prev.includes(subcategory)
        ? prev.filter(sc => sc !== subcategory)
        : [...prev, subcategory]
    );
  };
  
  // Toggle a risk level selection
  const toggleRiskLevel = (riskLevel: string) => {
    setSelectedRiskLevels(prev => 
      prev.includes(riskLevel)
        ? prev.filter(rl => rl !== riskLevel)
        : [...prev, riskLevel]
    );
  };
  
  // Toggle a rating selection
  const toggleRating = (rating: string) => {
    setSelectedRatings(prev => 
      prev.includes(rating)
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
  };
  
  // Toggle an AMC selection
  const toggleAmc = (amc: string) => {
    setSelectedAmcs(prev => 
      prev.includes(amc)
        ? prev.filter(a => a !== amc)
        : [...prev, amc]
    );
  };
  
  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedSubcategories([]);
    setSelectedRiskLevels([]);
    setSelectedRatings([]);
    setSelectedAmcs([]);
    setIndexOnly(false);
    setSortBy('popularity');
    setAppliedFilters([]);
  };
  
  // Close filter drawer and apply filters
  const applyFilters = () => {
    setShowFilterDrawer(false);
  };
  
  // Render stars for rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {rating} <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 ml-1" />
      </div>
    );
  };
  
  // Remove a specific filter
  const removeFilter = (filter: string) => {
    setSelectedSubcategories(prev => prev.filter(sc => sc !== filter));
    setSelectedRatings(prev => prev.filter(r => r !== filter));
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Navigation Tabs */}
      <div className="pt-12 pb-4 px-4 bg-white">
        <div className="flex space-x-2 overflow-x-auto hide-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`px-6 py-2 rounded-full whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-gray-200 font-medium' 
                  : 'border border-gray-300 text-gray-600'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Page Title */}
      <div className="px-4 pt-2 pb-4 bg-white">
        <h1 className="text-2xl font-bold text-gray-800">All Mutual Funds</h1>
      </div>
      
      {/* Filter Chips */}
      <div className="px-4 py-2 flex space-x-2 overflow-x-auto hide-scrollbar bg-white">
        <button
          className="p-2 border border-gray-300 rounded-full flex items-center justify-center"
          onClick={() => {
            setShowFilterDrawer(true);
            setActiveFilter('sort');
          }}
        >
          <Filter className="h-5 w-5 text-gray-600" />
        </button>
        
        <button
          className="flex items-center space-x-2 border border-gray-300 rounded-full px-4 py-2"
          onClick={() => {
            setShowFilterDrawer(true);
            setActiveFilter('sort');
          }}
        >
          <span>Sort by</span>
          <ChevronDown className="h-4 w-4" />
        </button>
        
        <button
          className={`flex items-center space-x-2 border rounded-full px-4 py-2 ${
            indexOnly ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-gray-300'
          }`}
          onClick={() => setIndexOnly(!indexOnly)}
        >
          <span>Index only</span>
          <div className="ml-2">
            <Switch checked={indexOnly} onCheckedChange={setIndexOnly} className="data-[state=checked]:bg-blue-600" />
          </div>
        </button>
        
        {appliedFilters.map(filter => (
          <button
            key={filter}
            className="flex items-center space-x-1 bg-blue-50 border border-blue-300 text-blue-700 rounded-full px-3 py-2"
            onClick={() => removeFilter(filter)}
          >
            <span>{filter}</span>
            <X className="h-3 w-3" />
          </button>
        ))}
        
        {appliedFilters.length > 0 && (
          <button
            className="text-blue-600 whitespace-nowrap px-3 py-2"
            onClick={clearAllFilters}
          >
            Clear all
          </button>
        )}
      </div>
      
      {/* Fund Count & Sort */}
      <div className="px-4 py-3 flex justify-between items-center bg-white border-b border-gray-200">
        <span className="text-gray-600">{totalFunds.toLocaleString()} funds</span>
        <div className="flex items-center space-x-1">
          <span className="text-sm text-gray-500">3Y Returns</span>
          <div className="flex">
            <ChevronUp className="h-4 w-4 text-gray-500" />
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
        </div>
      </div>
      
      {/* Fund List */}
      <div className="flex-1 bg-white">
        {loading ? (
          <div className="py-6 space-y-4 px-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="flex mb-2">
                  <div className="w-10 h-10 bg-gray-200 rounded mr-2"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="w-16">
                    <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
                <div className="border-b border-gray-100 mt-4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {filteredFunds.map((fund) => (
              <Link to={`/invest/mutual-fund/${fund.id}`} key={fund.id}>
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex">
                    <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center mr-3 text-lg">
                      {fund.logo}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800 mb-1">{fund.name}</h3>
                      <div className="flex items-center">
                        <p className="text-sm text-gray-500 mr-2">{fund.subcategory}</p>
                        {fund.rating > 0 && (
                          <div className="flex items-center text-sm text-gray-600">
                            <span>·</span>
                            <span className="mx-1">{fund.rating}</span>
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">{fund.returns.threeYear.toFixed(2)}%</p>
                      <p className="text-sm text-gray-500">3Y</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            
            {filteredFunds.length === 0 && (
              <div className="py-10 text-center">
                <p className="text-gray-500">No mutual funds found</p>
                <p className="text-sm text-gray-400">Try adjusting your filters</p>
              </div>
            )}
            
            {filteredFunds.length > 0 && (
              <div className="p-4">
                <Link to="/invest/mutual-funds?viewAll=true" className="flex items-center justify-center text-blue-600">
                  <span>View all</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            )}
            
            <div className="px-4 py-6 text-center text-gray-400 text-xs border-t">
              <p>Paygrow Invest Tech Pvt. Ltd.</p>
              <p className="mt-1">(Formerly known as Paygrow Technology Pvt. Ltd.)</p>
              <p className="mt-1">SEBI-Stock Broker-INZ000301838</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Filter Drawer */}
      {showFilterDrawer && (
        <div className="fixed inset-0 bg-black/50 z-50 flex flex-col">
          <div className="bg-white min-h-screen max-h-screen w-full flex flex-col">
            <div className="p-4 flex justify-between items-center border-b">
              <div className="flex items-center">
                <button onClick={() => setShowFilterDrawer(false)} className="mr-3">
                  <X className="h-5 w-5" />
                </button>
                <h2 className="text-xl font-medium">Filters</h2>
              </div>
              <button 
                className="text-gray-400 text-sm"
                onClick={clearAllFilters}
              >
                Clear all
              </button>
            </div>
            
            <div className="flex flex-1 overflow-hidden">
              {/* Left sidebar menu */}
              <div className="w-1/3 border-r">
                <div 
                  className={`p-4 border-l-4 ${activeFilter === 'sort' ? 'border-l-green-500 bg-green-50' : 'border-l-transparent'}`}
                  onClick={() => setActiveFilter('sort')}
                >
                  <span className={activeFilter === 'sort' ? 'text-green-600 font-medium' : ''}>Sort by</span>
                </div>
                <div 
                  className={`p-4 border-l-4 ${activeFilter === 'categories' ? 'border-l-green-500 bg-green-50' : 'border-l-transparent'}`}
                  onClick={() => setActiveFilter('categories')}
                >
                  <span className={activeFilter === 'categories' ? 'text-green-600 font-medium' : ''}>Categories</span>
                </div>
                <div 
                  className={`p-4 border-l-4 ${activeFilter === 'risk' ? 'border-l-green-500 bg-green-50' : 'border-l-transparent'}`}
                  onClick={() => setActiveFilter('risk')}
                >
                  <span className={activeFilter === 'risk' ? 'text-green-600 font-medium' : ''}>Risk</span>
                </div>
                <div 
                  className={`p-4 border-l-4 ${activeFilter === 'ratings' ? 'border-l-green-500 bg-green-50' : 'border-l-transparent'}`}
                  onClick={() => setActiveFilter('ratings')}
                >
                  <span className={activeFilter === 'ratings' ? 'text-green-600 font-medium' : ''}>Ratings</span>
                </div>
                <div 
                  className={`p-4 border-l-4 ${activeFilter === 'fundHouse' ? 'border-l-green-500 bg-green-50' : 'border-l-transparent'}`}
                  onClick={() => setActiveFilter('fundHouse')}
                >
                  <span className={activeFilter === 'fundHouse' ? 'text-green-600 font-medium' : ''}>Fund House</span>
                </div>
              </div>
              
              {/* Right content area */}
              <div className="w-2/3 overflow-y-auto pb-24">
                {/* Index only toggle (appears on every filter screen) */}
                {activeFilter && (
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between rounded-full bg-gray-100 p-4">
                      <span className="font-medium">Index Funds only</span>
                      <Switch 
                        checked={indexOnly} 
                        onCheckedChange={setIndexOnly} 
                        className="data-[state=checked]:bg-green-500"
                      />
                    </div>
                  </div>
                )}
                
                {/* Sort options */}
                {activeFilter === 'sort' && (
                  <div className="p-4">
                    <RadioGroup value={sortBy} onValueChange={setSortBy}>
                      {sortOptions.map(option => (
                        <div key={option.value} className="flex items-center py-3 border-b">
                          <RadioGroupItem 
                            value={option.value} 
                            id={`sort-${option.value}`} 
                            className="border-green-500 text-green-500"
                          />
                          <Label htmlFor={`sort-${option.value}`} className="ml-2">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}
                
                {/* Categories */}
                {activeFilter === 'categories' && (
                  <div>
                    {fundCategories.map(category => (
                      <div key={category.value}>
                        <div 
                          className="p-4 flex items-center justify-between border-b"
                          onClick={() => toggleCategory(category.value)}
                        >
                          <div className="flex items-center">
                            <Checkbox
                              checked={selectedCategories.includes(category.value)}
                              onCheckedChange={() => {
                                const isSelected = selectedCategories.includes(category.value);
                                setSelectedCategories(prev => 
                                  isSelected 
                                    ? prev.filter(c => c !== category.value)
                                    : [...prev, category.value]
                                );
                              }}
                              className="border-gray-400 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                            />
                            <Label className="ml-2">{category.label}</Label>
                          </div>
                          {expandedCategory === category.value ? (
                            <ChevronUp className="h-5 w-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                          )}
                        </div>
                        
                        {expandedCategory === category.value && (
                          <div className="px-4 py-2 bg-gray-50">
                            {category.subcategories.map(subcategory => (
                              <div key={subcategory} className="py-2 px-4 flex items-center">
                                {selectedSubcategories.includes(subcategory) ? (
                                  <div 
                                    className="w-5 h-5 bg-green-500 rounded flex items-center justify-center"
                                    onClick={() => toggleSubcategory(subcategory)}
                                  >
                                    <Check className="h-4 w-4 text-white" />
                                  </div>
                                ) : (
                                  <div 
                                    className="w-5 h-5 border border-gray-300 rounded"
                                    onClick={() => toggleSubcategory(subcategory)}
                                  ></div>
                                )}
                                <span className="ml-2">{subcategory}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Risk levels */}
                {activeFilter === 'risk' && (
                  <div className="p-4">
                    {riskLevels.map(risk => (
                      <div key={risk} className="py-3 flex items-center border-b">
                        <Checkbox
                          checked={selectedRiskLevels.includes(risk)}
                          onCheckedChange={() => toggleRiskLevel(risk)}
                          className="border-gray-400 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                        />
                        <Label className="ml-2">{risk}</Label>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Ratings */}
                {activeFilter === 'ratings' && (
                  <div className="p-4">
                    <RadioGroup value={selectedRatings.length > 0 ? selectedRatings[0] : ''} onValueChange={(value) => {
                      if (value) {
                        setSelectedRatings([value]);
                      } else {
                        setSelectedRatings([]);
                      }
                    }}>
                      {ratings.map(rating => (
                        <div key={rating.value} className="py-3 flex items-center border-b">
                          <RadioGroupItem
                            value={rating.value}
                            id={`rating-${rating.value}`}
                            className="border-gray-400 text-green-500"
                          />
                          <Label className="ml-2" htmlFor={`rating-${rating.value}`}>
                            {rating.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}
                
                {/* Fund houses */}
                {activeFilter === 'fundHouse' && (
                  <div className="p-4">
                    <div className="mb-4">
                      <Input
                        placeholder="Search fund house"
                        className="border-gray-300"
                      />
                    </div>
                    
                    {amcList.map(amc => (
                      <div key={amc} className="py-3 flex items-center border-b">
                        <Checkbox
                          checked={selectedAmcs.includes(amc)}
                          onCheckedChange={() => toggleAmc(amc)}
                          className="border-gray-400 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                        />
                        <Label className="ml-2">{amc}</Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-4 border-t bg-white sticky bottom-0">
              <Button 
                className="w-full py-6 bg-green-500 hover:bg-green-600"
                onClick={applyFilters}
              >
                View {totalFunds} funds
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <BottomNavigation activeTab="invest" />
    </div>
  );
};

export default MutualFundListScreen;
