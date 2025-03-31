
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Wallet, TrendingUp, Calculator, Crown, ArrowRight, Menu } from 'lucide-react';
import { Input } from "@/components/ui/input";
import BottomNavigation from '@/components/BottomNavigation';
import InvestmentInsights from '@/components/invest/InvestmentInsights';
import FundCategoryScroller from '@/components/invest/FundCategoryScroller';
import FeaturedFundsSection from '@/components/invest/FeaturedFundsSection';
import MarketIndicators from '@/components/invest/MarketIndicators';
import { motion } from "@/components/ui/motion";

// Quick access buttons data
const quickAccessItems = [
  { label: 'All Funds', icon: <Menu className="h-5 w-5" />, route: '/invest/mutual-funds' },
  { label: 'Trending', icon: <TrendingUp className="h-5 w-5" />, route: '/invest/mutual-funds?category=trending' },
  { label: 'Portfolio', icon: <Wallet className="h-5 w-5" />, route: '/invest/portfolio' },
  { label: 'Calculator', icon: <Calculator className="h-5 w-5" />, route: '/sip-calculator' },
];

const InvestScreen = () => {
  const [activeTab, setActiveTab] = useState<'explore' | 'portfolio'>('explore');
  
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-paygrow-blue to-blue-600 text-white pt-12 pb-6 px-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold">Invest</h1>
            <p className="text-white/80 text-sm">Grow your wealth with mutual funds</p>
          </div>
          <div className="flex items-center">
            <Link to="/invest/portfolio">
              <Wallet className="w-6 h-6 mr-4" />
            </Link>
            <Link to="/notifications">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
            </Link>
          </div>
        </div>
        
        {/* Search input */}
        <div className="relative mt-4">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search mutual funds, stocks..."
            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 pl-10 backdrop-blur-md shadow-sm hover:bg-white/20 transition-colors"
          />
        </div>

        {/* Quick access buttons */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 px-4">
          <Card className="grid grid-cols-4 gap-1 p-1 shadow-md border-0">
            {quickAccessItems.map((item, index) => (
              <Link to={item.route} key={index} className="text-center p-3 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex flex-col items-center">
                  <div className="bg-blue-50 text-paygrow-blue p-2 rounded-full mb-1">
                    {item.icon}
                  </div>
                  <span className="text-xs text-gray-600">{item.label}</span>
                </div>
              </Link>
            ))}
          </Card>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="mt-16 px-4">
        <div className="flex justify-between mb-6">
          <div 
            className={`flex-1 text-center py-3 font-medium ${activeTab === 'explore' ? 'text-paygrow-blue border-b-2 border-paygrow-blue' : 'text-gray-500'}`}
            onClick={() => setActiveTab('explore')}
          >
            Explore
          </div>
          <div 
            className={`flex-1 text-center py-3 font-medium ${activeTab === 'portfolio' ? 'text-paygrow-blue border-b-2 border-paygrow-blue' : 'text-gray-500'}`}
            onClick={() => setActiveTab('portfolio')}
          >
            Portfolio
          </div>
        </div>
        
        {activeTab === 'explore' ? (
          <div className="space-y-6">
            {/* Featured Banner */}
            <Link to="/invest/mutual-funds?category=featured">
              <motion.div 
                className="glass-card bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-5 overflow-hidden relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <Crown className="h-6 w-6 text-yellow-300" />
                  <h3 className="text-lg font-bold">Hand-picked Top Funds</h3>
                </div>
                <p className="text-sm text-white/80 mb-3">Pre-screened quality funds with consistent performance</p>
                <Button className="bg-white text-blue-700 hover:bg-white/90">
                  View Top Funds <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
                <div className="absolute right-0 bottom-0 opacity-20">
                  <TrendingUp className="h-32 w-32 -rotate-12 translate-x-6 translate-y-6" />
                </div>
              </motion.div>
            </Link>
            
            {/* Market Indicators */}
            <MarketIndicators />
            
            {/* Fund Categories */}
            <FundCategoryScroller />
            
            {/* Featured Funds */}
            <FeaturedFundsSection />
            
            {/* Explore more section */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <Link to="/invest/featured">
                <motion.div
                  className="p-4 bg-gradient-to-br from-paygrow-blue to-blue-700 text-white rounded-xl"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="font-semibold mb-1">Featured Collections</h3>
                  <p className="text-xs text-white/80">Best funds for different goals</p>
                </motion.div>
              </Link>
              <Link to="/invest/tax-planning">
                <motion.div
                  className="p-4 bg-gradient-to-br from-paygrow-green to-green-700 text-white rounded-xl"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="font-semibold mb-1">Tax Planning</h3>
                  <p className="text-xs text-white/80">Save tax with ELSS funds</p>
                </motion.div>
              </Link>
            </div>
            
          </div>
        ) : (
          <InvestmentInsights />
        )}
      </div>
      
      <BottomNavigation active="invest" />
    </div>
  );
};

export default InvestScreen;
