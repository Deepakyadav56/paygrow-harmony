
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

// Filter categories
const filterCategories = [
  { id: 'sort', name: 'Sort by' },
  { id: 'categories', name: 'Categories' },
  { id: 'subcategories', name: 'Sub Categories' },
  { id: 'risk', name: 'Risk Level' },
  { id: 'fundhouse', name: 'Fund House' },
];

const sortOptions = [
  { id: 'returns-high-low', label: 'Returns : High to Low' },
  { id: 'min-invest-low-high', label: 'Min Invest : Low to High' },
  { id: 'ratings-high-low', label: 'Ratings : High to Low' }
];

const fundHouses = [
  'Aditya Birla Sun Life', 'Axis', 'Bajaj Fiserv', 'Bandhan', 'Bank of India', 
  'Baroda BNP Paribas', 'Baroda', 'Canara Rebeca', 'DSP', 'Edelweiss', 
  'Franklin Templeton', 'Groww', 'HDFC', 'Helios', 'HSBC', 'ICICI Pridential', 
  'Invesco', 'ITI', 'JM Financial', 'Kotak Mahindra', 'LIC', 'Mahindra Manulife', 'Mahindra'
];

const MutualFundFilter: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('sort');
  const [selectedSort, setSelectedSort] = useState('returns-high-low');
  const [selectedFundHouses, setSelectedFundHouses] = useState<string[]>(['HDFC']);

  // Handle checkbox toggle
  const toggleFundHouse = (fundHouse: string) => {
    if (selectedFundHouses.includes(fundHouse)) {
      setSelectedFundHouses(prev => prev.filter(item => item !== fundHouse));
    } else {
      setSelectedFundHouses(prev => [...prev, fundHouse]);
    }
  };

  // Apply filters and go back
  const applyFilters = () => {
    navigate(-1);
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedSort('returns-high-low');
    setSelectedFundHouses([]);
  };

  return (
    <div className="min-h-screen bg-white pb-20 flex flex-col">
      {/* Header */}
      <div className="bg-teal-600 text-white px-5 py-6 flex items-center">
        <Link to="/mutual-funds" className="mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="m15 18-6-6 6-6"></path></svg>
        </Link>
        <h1 className="text-xl font-bold">Filters</h1>
        <div className="flex-1"></div>
        <Link to="/" className="ml-auto">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        </Link>
      </div>
      
      {/* Filter content */}
      <div className="flex-1 flex">
        {/* Left sidebar */}
        <div className="w-1/3 border-r">
          {filterCategories.map((category) => (
            <div 
              key={category.id}
              className={`p-4 border-l-4 ${
                activeCategory === category.id 
                  ? 'border-l-teal-600 bg-teal-50 text-teal-600 font-medium' 
                  : 'border-l-transparent'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </div>
          ))}
        </div>
        
        {/* Right content */}
        <div className="w-2/3 overflow-y-auto">
          {activeCategory === 'sort' && (
            <div className="p-4">
              <RadioGroup value={selectedSort} onValueChange={setSelectedSort}>
                {sortOptions.map((option) => (
                  <div key={option.id} className="flex items-center mb-4">
                    <RadioGroupItem 
                      value={option.id} 
                      id={option.id} 
                      className="text-teal-600 border-teal-600"
                    />
                    <Label 
                      htmlFor={option.id} 
                      className="ml-2 text-base"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
          
          {activeCategory === 'fundhouse' && (
            <div className="p-4">
              {fundHouses.map((fundHouse) => (
                <div key={fundHouse} className="flex items-center mb-4">
                  <Checkbox
                    id={`fundhouse-${fundHouse}`}
                    checked={selectedFundHouses.includes(fundHouse)}
                    onCheckedChange={() => toggleFundHouse(fundHouse)}
                    className="text-teal-600 border-gray-300"
                  />
                  <Label 
                    htmlFor={`fundhouse-${fundHouse}`} 
                    className="ml-2 text-base"
                  >
                    {fundHouse}
                  </Label>
                </div>
              ))}
            </div>
          )}
          
          {/* Placeholder for other filter categories */}
          {activeCategory !== 'sort' && activeCategory !== 'fundhouse' && (
            <div className="p-4">
              <p className="text-gray-500">Select filter options for {activeCategory}</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom buttons */}
      <div className="grid grid-cols-2 gap-4 p-4 border-t">
        <Button 
          variant="outline" 
          onClick={resetFilters}
          className="border-teal-600 text-teal-700"
        >
          Reset
        </Button>
        <Button 
          onClick={applyFilters}
          className="bg-teal-600 text-white hover:bg-teal-700"
        >
          Apply
        </Button>
      </div>
    </div>
  );
};

export default MutualFundFilter;
