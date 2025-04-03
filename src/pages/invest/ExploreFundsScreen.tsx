
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, Filter, ArrowLeftRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import BottomNavigation from '@/components/BottomNavigation';
import CollectionsSection from '@/components/invest/CollectionsSection';
import ProductsToolsSection from '@/components/invest/ProductsToolsSection';
import PopularFundsSection from '@/components/invest/PopularFundsSection';
import AllFundsSection from '@/components/invest/AllFundsSection';
import FundFilterModal from '@/components/invest/FundFilterModal';

// This is the logo component from your screenshots
const Logo: React.FC = () => (
  <div className="flex items-center">
    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-2">
      <svg viewBox="0 0 24 24" className="h-8 w-8 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
        <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
    <div>
      <span className="text-2xl font-bold">
        <span className="text-green-500">W</span>ealthWise
      </span>
    </div>
  </div>
);

const ExploreFundsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'equity' | 'debt' | 'elss' | 'hybrid'>('all');
  const [showFilterModal, setShowFilterModal] = useState(false);
  
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white px-4 pt-6 pb-3 sticky top-0 z-10 border-b shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <Logo />
          
          <div className="flex items-center">
            <Link to="/search" className="p-2">
              <Search className="h-6 w-6 text-gray-700" />
            </Link>
            <Link to="/notifications" className="p-2 relative">
              <Bell className="h-6 w-6 text-gray-700" />
              <span className="absolute top-1 right-1 bg-green-500 w-2 h-2 rounded-full"></span>
            </Link>
            <Link to="/filters" className="p-2">
              <Filter className="h-6 w-6 text-gray-700" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Explore Funds</h1>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search by fund name, category or fund house"
            className="pl-10 py-3 border-gray-300"
          />
        </div>
        
        {/* Tabs */}
        <div className="flex overflow-x-auto scrollbar-hide mb-6 space-x-2">
          <Button
            variant={activeTab === 'all' ? 'default' : 'outline'}
            className={`rounded-full ${activeTab === 'all' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </Button>
          <Button
            variant={activeTab === 'equity' ? 'default' : 'outline'}
            className={`rounded-full ${activeTab === 'equity' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
            onClick={() => setActiveTab('equity')}
          >
            Equity
          </Button>
          <Button
            variant={activeTab === 'debt' ? 'default' : 'outline'}
            className={`rounded-full ${activeTab === 'debt' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
            onClick={() => setActiveTab('debt')}
          >
            Debt
          </Button>
          <Button
            variant={activeTab === 'elss' ? 'default' : 'outline'}
            className={`rounded-full ${activeTab === 'elss' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
            onClick={() => setActiveTab('elss')}
          >
            ELSS
          </Button>
          <Button
            variant={activeTab === 'hybrid' ? 'default' : 'outline'}
            className={`rounded-full ${activeTab === 'hybrid' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
            onClick={() => setActiveTab('hybrid')}
          >
            Hybrid
          </Button>
        </div>
        
        <div className="mb-6 flex space-x-2">
          <Button 
            variant="outline" 
            className="flex items-center bg-gray-50 border-gray-300"
            onClick={() => setShowFilterModal(true)}
          >
            <Filter className="h-4 w-4 mr-2" /> Filters
          </Button>
          <Button variant="outline" className="flex items-center bg-gray-50 border-gray-300">
            <ArrowLeftRight className="h-4 w-4 mr-2" /> Sort By: Most Popular
          </Button>
        </div>
        
        {/* Collections Section */}
        <CollectionsSection />
        
        {/* Products & Tools */}
        <ProductsToolsSection />
        
        {/* Popular Funds */}
        <PopularFundsSection />
        
        {/* All Funds */}
        <AllFundsSection />
      </div>
      
      {/* Filter Modal */}
      <FundFilterModal 
        open={showFilterModal} 
        onClose={() => setShowFilterModal(false)} 
        onApply={() => setShowFilterModal(false)}
      />
      
      <BottomNavigation activeTab="explore" />
    </div>
  );
};

export default ExploreFundsScreen;
