
import React, { useState } from 'react';
import { X, Star, Search, ArrowUpDown, ChevronsUpDown, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface FundFilterModalProps {
  open: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
}

// Fund house data
const fundHouses = [
  "Axis Mutual Fund",
  "Aditya Birla Sun Life Mutual Fund",
  "DSP Mutual Fund",
  "HDFC Mutual Fund",
  "ICICI Prudential Mutual Fund",
  "Kotak Mutual Fund",
  "Mirae Asset Mutual Fund",
  "Nippon India Mutual Fund",
  "SBI Mutual Fund",
  "UTI Mutual Fund",
];

const FundFilterModal: React.FC<FundFilterModalProps> = ({ open, onClose, onApplyFilters }) => {
  // State for filters
  const [sortBy, setSortBy] = useState<string>("popularity");
  const [showIndexFundsOnly, setShowIndexFundsOnly] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRiskLevels, setSelectedRiskLevels] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [selectedFundHouses, setSelectedFundHouses] = useState<string[]>([]);
  const [fundHouseSearch, setFundHouseSearch] = useState<string>("");

  // Toggle selection in an array
  const toggleSelection = (array: string[], item: string) => {
    if (array.includes(item)) {
      return array.filter(i => i !== item);
    } else {
      return [...array, item];
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSortBy("popularity");
    setShowIndexFundsOnly(false);
    setSelectedCategories([]);
    setSelectedRiskLevels([]);
    setSelectedRatings([]);
    setSelectedFundHouses([]);
  };

  // Apply filters and close modal
  const handleApplyFilters = () => {
    onApplyFilters({
      sortBy,
      showIndexFundsOnly,
      categories: selectedCategories,
      riskLevels: selectedRiskLevels,
      ratings: selectedRatings,
      fundHouses: selectedFundHouses,
    });
    onClose();
  };

  // Filter fund houses based on search input
  const filteredFundHouses = fundHouses.filter(house => 
    house.toLowerCase().includes(fundHouseSearch.toLowerCase())
  );

  // Calculate total number of funds (this would be dynamic in a real app)
  const totalFunds = 1482; // Mock data

  return (
    <Sheet open={open} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="left" className="w-full sm:max-w-md p-0 overflow-y-auto">
        <SheetHeader className="p-4 border-b sticky top-0 bg-white z-10">
          <div className="flex justify-between items-center">
            <SheetTitle className="text-xl font-bold">Filters</SheetTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-9 w-9">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </SheetHeader>

        <div className="px-4 py-3 border-b">
          <h3 className="font-semibold mb-3">Sort by</h3>
          <div className="space-y-2">
            <div 
              className={`flex items-center p-3 rounded-lg border ${sortBy === 'popularity' ? 'bg-blue-50 border-blue-300' : 'border-gray-200'}`}
              onClick={() => setSortBy('popularity')}
            >
              <CheckCircle2 className={`mr-2 h-5 w-5 ${sortBy === 'popularity' ? 'text-blue-600' : 'text-gray-300'}`} />
              <span className="flex-1">Popularity</span>
            </div>
            <div 
              className={`flex items-center p-3 rounded-lg border ${sortBy === '1y_returns' ? 'bg-blue-50 border-blue-300' : 'border-gray-200'}`}
              onClick={() => setSortBy('1y_returns')}
            >
              <CheckCircle2 className={`mr-2 h-5 w-5 ${sortBy === '1y_returns' ? 'text-blue-600' : 'text-gray-300'}`} />
              <span className="flex-1">1Y Returns</span>
            </div>
            <div 
              className={`flex items-center p-3 rounded-lg border ${sortBy === '3y_returns' ? 'bg-blue-50 border-blue-300' : 'border-gray-200'}`}
              onClick={() => setSortBy('3y_returns')}
            >
              <CheckCircle2 className={`mr-2 h-5 w-5 ${sortBy === '3y_returns' ? 'text-blue-600' : 'text-gray-300'}`} />
              <span className="flex-1">3Y Returns</span>
            </div>
            <div 
              className={`flex items-center p-3 rounded-lg border ${sortBy === '5y_returns' ? 'bg-blue-50 border-blue-300' : 'border-gray-200'}`}
              onClick={() => setSortBy('5y_returns')}
            >
              <CheckCircle2 className={`mr-2 h-5 w-5 ${sortBy === '5y_returns' ? 'text-blue-600' : 'text-gray-300'}`} />
              <span className="flex-1">5Y Returns</span>
            </div>
            <div 
              className={`flex items-center p-3 rounded-lg border ${sortBy === 'rating' ? 'bg-blue-50 border-blue-300' : 'border-gray-200'}`}
              onClick={() => setSortBy('rating')}
            >
              <CheckCircle2 className={`mr-2 h-5 w-5 ${sortBy === 'rating' ? 'text-blue-600' : 'text-gray-300'}`} />
              <span className="flex-1">Rating</span>
            </div>
          </div>
        </div>

        <div className="px-4 py-3 border-b">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Index Funds Only</h3>
            <Switch 
              checked={showIndexFundsOnly} 
              onCheckedChange={setShowIndexFundsOnly} 
            />
          </div>
        </div>

        <Accordion type="multiple" className="border-b">
          <AccordionItem value="category" className="border-b">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <span className="font-semibold">Category</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-3">
              <div className="space-y-2">
                {["Equity", "Debt", "Hybrid", "Commodities"].map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`category-${category}`} 
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => setSelectedCategories(toggleSelection(selectedCategories, category))}
                    />
                    <Label htmlFor={`category-${category}`} className="flex-1 cursor-pointer">{category}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="risk" className="border-b">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <span className="font-semibold">Risk</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-3">
              <div className="space-y-2">
                {[
                  "Low", 
                  "Moderately Low", 
                  "Moderate", 
                  "Moderately High", 
                  "High", 
                  "Very High"
                ].map((risk) => (
                  <div key={risk} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`risk-${risk}`} 
                      checked={selectedRiskLevels.includes(risk)}
                      onCheckedChange={() => setSelectedRiskLevels(toggleSelection(selectedRiskLevels, risk))}
                    />
                    <Label htmlFor={`risk-${risk}`} className="flex-1 cursor-pointer">{risk}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="ratings" className="border-b">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <span className="font-semibold">Ratings</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-3">
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`rating-${rating}`} 
                      checked={selectedRatings.includes(rating.toString())}
                      onCheckedChange={() => setSelectedRatings(toggleSelection(selectedRatings, rating.toString()))}
                    />
                    <Label htmlFor={`rating-${rating}`} className="flex-1 cursor-pointer flex items-center">
                      {rating} {Array(rating).fill(0).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400 ml-0.5" />
                      ))}
                      {Array(5-rating).fill(0).map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-gray-300 ml-0.5" />
                      ))}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="fundHouse" className="border-b">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <span className="font-semibold">Fund House</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-3">
              <div className="relative mb-3">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search fund house" 
                  className="pl-9" 
                  value={fundHouseSearch}
                  onChange={(e) => setFundHouseSearch(e.target.value)}
                />
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {filteredFundHouses.map((house) => (
                  <div key={house} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`house-${house}`} 
                      checked={selectedFundHouses.includes(house)}
                      onCheckedChange={() => setSelectedFundHouses(toggleSelection(selectedFundHouses, house))}
                    />
                    <Label htmlFor={`house-${house}`} className="flex-1 cursor-pointer text-sm">{house}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="sticky bottom-0 p-4 bg-white border-t mt-auto">
          <Button 
            className="w-full bg-paygrow-green hover:bg-green-600 text-white py-6 text-base rounded-xl"
            onClick={handleApplyFilters}
          >
            View {totalFunds} funds
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FundFilterModal;
