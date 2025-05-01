
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Mock fund data
const fundsList = [
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

// Category filters
const categories = [
  'All Funds',
  'Large Cap',
  'Mid Cap',
  'Small Cap',
  'Low Risk',
  'High Risk'
];

const MutualFundList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Funds');
  const [funds] = useState(fundsList);

  // Generate stars based on rating
  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  // Filter funds based on search and category
  const filteredFunds = funds.filter(fund => {
    const matchesSearch = fund.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = 
      activeCategory === 'All Funds' || 
      fund.category === activeCategory ||
      fund.risk === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-teal-600 text-white pt-10 pb-6 px-5">
        <div className="flex items-center mb-4">
          <Link to="/mutual-funds" className="mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="m15 18-6-6 6-6"></path></svg>
          </Link>
          <h1 className="text-xl font-bold">Explore Mutual Funds</h1>
          <div className="flex-1"></div>
          <Link to="/" className="ml-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          </Link>
        </div>
        
        {/* Search */}
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 absolute left-3 top-3 text-gray-500">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          <Input 
            type="text" 
            placeholder="Search..." 
            className="pl-10 bg-white text-black" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Categories */}
      <div className="px-4 pt-4 pb-2 overflow-x-auto flex gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant="outline"
            className={`whitespace-nowrap ${
              activeCategory === category
                ? 'bg-teal-600 text-white border-teal-600'
                : 'bg-white text-gray-700 border-gray-300'
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      
      {/* Funds Count & Filter */}
      <div className="px-4 pt-6 pb-2 flex justify-between items-center">
        <p className="text-gray-700 font-medium">{filteredFunds.length} Funds</p>
        <Link to="/mutual-funds/filter">
          <Button variant="outline" className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"></path></svg>
            Filter
          </Button>
        </Link>
      </div>
      
      {/* Funds List */}
      <div className="px-4 pb-16">
        {filteredFunds.map((fund) => (
          <Link to={`/mutual-funds/${fund.id}`} key={fund.id} className="block border rounded-lg p-4 mb-3">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-red-100 rounded-md flex items-center justify-center text-lg mr-3">
                {fund.logo}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium">{fund.name}</h3>
                  <div className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-sm">
                    {fund.rating}★
                  </div>
                </div>
                
                <div className="flex items-center my-1">
                  <span className="text-sm text-gray-600">{fund.category}</span>
                  <div className="ml-4">
                    {fund.risk === 'Low Risk' && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                        Low Risk
                      </span>
                    )}
                    {fund.risk === 'High Risk' && (
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                        High Risk
                      </span>
                    )}
                    {fund.risk === 'Very High Risk' && (
                      <span className="text-xs bg-red-200 text-red-900 px-2 py-0.5 rounded-full">
                        Very High Risk
                      </span>
                    )}
                    {fund.risk === 'Moderate High Risk' && (
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                        Moderate High Risk
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="text-sm">
                  <div>
                    Returns: 
                    {fund.returns['1Y'] && <span className="text-green-600 ml-1">{fund.returns['1Y']}(1Y)</span>}
                    {fund.returns['3Y'] && <span className="text-green-600 ml-2">{fund.returns['3Y']}(3Y)</span>}
                    {fund.returns['5Y'] && <span className="text-green-600 ml-2">{fund.returns['5Y']}(5Y)</span>}
                  </div>
                  <div className="mt-1">
                    <p>Minimum SIP: <span className="text-gray-900 font-medium">₹{fund.minSIP}</span></p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MutualFundList;
