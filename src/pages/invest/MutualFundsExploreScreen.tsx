
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, QrCode, ShoppingCart } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';
import MutualFundTabs from '@/components/invest/MutualFundTabs';
import PopularFundsSection from '@/components/invest/PopularFundsSection';
import CollectionsSection from '@/components/invest/CollectionsSection';
import CompanyFundsSection from '@/components/invest/CompanyFundsSection';
import ProductsToolsSection from '@/components/invest/ProductsToolsSection';

const MutualFundsExploreScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="px-4 pt-12 pb-4 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-r from-paygrow-blue to-green-400 mr-3 flex items-center justify-center">
              <img 
                src="/lovable-uploads/65816e74-7f44-49f3-875a-fd49de062998.png" 
                alt="PayGrow" 
                className="w-7 h-7 object-contain"
              />
            </div>
            <h1 className="text-xl font-bold">Mutual Funds</h1>
          </div>
          
          <div className="flex items-center">
            <Link to="/search" className="p-2 mr-2">
              <Search className="h-6 w-6 text-gray-700" />
            </Link>
            <Link to="/scan" className="p-2 mr-2">
              <QrCode className="h-6 w-6 text-gray-700" />
            </Link>
            <Link to="/invest/cart" className="p-2 relative">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                1
              </span>
            </Link>
          </div>
        </div>
        
        <MutualFundTabs activeTab="explore" />
      </div>
      
      <div className="px-4 py-6">
        <PopularFundsSection />
        
        <CollectionsSection />
        
        <CompanyFundsSection />
      </div>
      
      <div className="px-4 py-6 bg-white">
        <ProductsToolsSection />
      </div>
      
      <BottomNavigation activeTab="invest" />
    </div>
  );
};

export default MutualFundsExploreScreen;
