
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const fundHouses = [
  'Aditya Birla Sun Life',
  'Axis',
  'Bajaj Fiserv',
  'Bandhan',
  'Bank of India',
  'Baroda BNP Paribas',
  'Baroda',
  'Canara Rebeca',
  'DSP',
  'Edelweiss',
  'Franklin Templeton',
  'Groww',
  'HDFC',
  'Helios',
  'HSBC',
  'ICICI Prdential',
  'Invesco',
  'ITI',
  'JM Financial',
  'Kotak Mahindra',
  'LIC',
  'Mahindra Manulife',
  'Mahindra'
];

const sortOptions = [
  { id: 'returns-high-low', label: 'Returns : High to Low' },
  { id: 'min-invest-low-high', label: 'Min Invest : Low to High' },
  { id: 'ratings-high-low', label: 'Ratings : High to Low' }
];

const categories = [
  'Equity',
  'Debt',
  'Hybrid',
  'Solution Oriented',
  'Others'
];

const subCategories = [
  'Large Cap',
  'Mid Cap',
  'Small Cap',
  'Large & Mid Cap',
  'Multi Cap',
  'Value',
  'ELSS (Tax Saving)',
  'Focused Fund',
  'Dividend Yield',
  'Sectoral'
];

const riskLevels = [
  'Low',
  'Moderate',
  'Moderately High',
  'High',
  'Very High'
];

const MutualFundFiltersScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<'fundHouse' | 'sort' | 'categories' | 'subCategories' | 'riskLevel'>('fundHouse');
  const [selectedFundHouses, setSelectedFundHouses] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState('returns-high-low');

  const handleReset = () => {
    setSelectedFundHouses([]);
    setSelectedSort('returns-high-low');
    toast({
      title: "Filters reset",
      description: "All filters have been reset to default values."
    });
  };

  const handleApply = () => {
    toast({
      title: "Filters applied",
      description: `${selectedFundHouses.length} fund houses selected.`
    });
    navigate('/invest/mutual-funds/explore');
  };

  const toggleFundHouse = (fundHouse: string) => {
    if (selectedFundHouses.includes(fundHouse)) {
      setSelectedFundHouses(selectedFundHouses.filter(fh => fh !== fundHouse));
    } else {
      setSelectedFundHouses([...selectedFundHouses, fundHouse]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-[#00B5C8] text-white pt-8 pb-4 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="mr-3">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-bold">Filters</h1>
        </div>
        <button onClick={() => navigate('/')}>
          <Home className="h-6 w-6" />
        </button>
      </div>

      {/* Filter content */}
      <div className="flex-1 flex">
        {/* Left sidebar */}
        <div className="w-1/3 bg-white border-r border-gray-200">
          <div 
            className={`py-4 px-6 ${activeSection === 'sort' ? 'text-[#00B5C8] border-l-4 border-[#00B5C8]' : 'text-gray-700'}`}
            onClick={() => setActiveSection('sort')}
          >
            Sort by
          </div>
          <div 
            className={`py-4 px-6 ${activeSection === 'categories' ? 'text-[#00B5C8] border-l-4 border-[#00B5C8]' : 'text-gray-700'}`}
            onClick={() => setActiveSection('categories')}
          >
            Categories
          </div>
          <div 
            className={`py-4 px-6 ${activeSection === 'subCategories' ? 'text-[#00B5C8] border-l-4 border-[#00B5C8]' : 'text-gray-700'}`}
            onClick={() => setActiveSection('subCategories')}
          >
            Sub Categories
          </div>
          <div 
            className={`py-4 px-6 ${activeSection === 'riskLevel' ? 'text-[#00B5C8] border-l-4 border-[#00B5C8]' : 'text-gray-700'}`}
            onClick={() => setActiveSection('riskLevel')}
          >
            Risk Level
          </div>
          <div 
            className={`py-4 px-6 ${activeSection === 'fundHouse' ? 'text-[#00B5C8] border-l-4 border-[#00B5C8]' : 'text-gray-700'}`}
            onClick={() => setActiveSection('fundHouse')}
          >
            Fund House <span className="text-[#00B5C8]">•</span>
          </div>
        </div>
        
        {/* Right content area */}
        <div className="w-2/3 p-4 overflow-y-auto">
          {activeSection === 'fundHouse' && (
            <div className="space-y-3">
              {fundHouses.map((house) => (
                <div key={house} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`house-${house}`} 
                    checked={selectedFundHouses.includes(house)}
                    onCheckedChange={() => toggleFundHouse(house)}
                    className={selectedFundHouses.includes(house) ? "text-white border-[#00B5C8] bg-[#00B5C8]" : ""}
                  />
                  <label htmlFor={`house-${house}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {house}
                  </label>
                </div>
              ))}
            </div>
          )}
          
          {activeSection === 'sort' && (
            <div className="space-y-4">
              <RadioGroup value={selectedSort} onValueChange={setSelectedSort}>
                {sortOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={option.id} 
                      id={option.id}
                      className={selectedSort === option.id ? "text-[#00B5C8] border-[#00B5C8]" : ""}
                    />
                    <Label htmlFor={option.id}>{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
          
          {activeSection === 'categories' && (
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox id={`category-${category}`} />
                  <label htmlFor={`category-${category}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          )}
          
          {activeSection === 'subCategories' && (
            <div className="space-y-3">
              {subCategories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox id={`subcategory-${category}`} />
                  <label htmlFor={`subcategory-${category}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          )}
          
          {activeSection === 'riskLevel' && (
            <div className="space-y-3">
              {riskLevels.map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <Checkbox id={`risk-${level}`} />
                  <label htmlFor={`risk-${level}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {level}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom action buttons */}
      <div className="grid grid-cols-2 gap-4 p-4 border-t border-gray-200 bg-white">
        <Button 
          variant="outline" 
          className="border-[#00B5C8] text-[#00B5C8] h-12 rounded-lg"
          onClick={handleReset}
        >
          Reset
        </Button>
        <Button 
          className="bg-[#00B5C8] hover:bg-[#00a0b1] text-white h-12 rounded-lg" 
          onClick={handleApply}
        >
          Apply
        </Button>
      </div>
    </div>
  );
};

export default MutualFundFiltersScreen;
