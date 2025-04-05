
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Wallet, 
  TrendingUp, 
  Calculator, 
  ChevronRight, 
  Bell, 
  BarChart4, 
  ArrowUp, 
  ArrowDown,
  ExternalLink,
  ShieldCheck,
  Briefcase,
  PiggyBank,
  Percent,
  Lightbulb,
  Menu,
  Star,
  Eye,
  EyeOff,
  Info
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import BottomNavigation from '@/components/BottomNavigation';
import { Progress } from "@/components/ui/progress";
import { motion } from "@/components/ui/motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Logo from '@/components/Logo';

// Market indices data
const marketIndices = [
  {
    name: 'Sensex',
    value: '74,572',
    fullValue: '74,572.30',
    change: 0.38,
    isPositive: true
  },
  {
    name: 'Nifty',
    value: '22,650',
    fullValue: '22,650.75',
    change: 0.42,
    isPositive: true
  },
  {
    name: 'Bank Nifty',
    value: '48,124',
    fullValue: '48,124.80',
    change: -0.21,
    isPositive: false
  }
];

// Quick access buttons data
const quickAccessItems = [
  { label: 'All Funds', icon: <Menu className="h-5 w-5 text-teal-600" />, route: '/invest/mutual-funds', bgColor: 'bg-teal-50' },
  { label: 'Trending', icon: <TrendingUp className="h-5 w-5 text-teal-600" />, route: '/invest/mutual-funds?category=trending', bgColor: 'bg-teal-50' },
  { label: 'Portfolio', icon: <Wallet className="h-5 w-5 text-teal-600" />, route: '/invest/portfolio', bgColor: 'bg-teal-50' },
  { label: 'Calculator', icon: <Calculator className="h-5 w-5 text-teal-600" />, route: '/sip-calculator', bgColor: 'bg-teal-50' },
];

// Fund categories data
const fundCategories = [
  {
    name: 'Large Cap',
    icon: <ShieldCheck className="h-6 w-6 text-teal-600" />,
    bgColor: 'bg-teal-50',
    route: '/invest/mutual-funds?category=large-cap'
  },
  {
    name: 'Mid Cap',
    icon: <TrendingUp className="h-6 w-6 text-teal-600" />,
    bgColor: 'bg-teal-50',
    route: '/invest/mutual-funds?category=mid-cap'
  },
  {
    name: 'Small Cap',
    icon: <Briefcase className="h-6 w-6 text-teal-600" />,
    bgColor: 'bg-teal-50',
    route: '/invest/mutual-funds?category=small-cap'
  },
  {
    name: 'ELSS',
    icon: <Percent className="h-6 w-6 text-teal-600" />,
    bgColor: 'bg-teal-50',
    route: '/invest/mutual-funds?category=elss'
  },
  {
    name: 'Index Funds',
    icon: <Lightbulb className="h-6 w-6 text-teal-600" />,
    bgColor: 'bg-teal-50',
    route: '/invest/mutual-funds?category=index'
  },
  {
    name: 'Debt Funds',
    icon: <PiggyBank className="h-6 w-6 text-teal-600" />,
    bgColor: 'bg-teal-50',
    route: '/invest/mutual-funds?category=debt'
  },
];

// Featured funds data with real Indian mutual funds
const featuredFunds = [
  {
    id: 1,
    name: 'Axis Bluechip Fund',
    logoUrl: '/assets/fund-logos/axis.png',
    company: 'Axis Mutual Fund',
    category: 'Large Cap',
    returns: {
      oneYear: 12.5,
      threeYear: 15.8,
      fiveYear: 14.2,
    },
    riskLevel: 'Moderate',
    nav: 45.67,
    rating: 5,
    tags: ['Top Performer'],
    minInvestment: 500,
  },
  {
    id: 2,
    name: 'HDFC Mid-Cap Opportunities',
    logoUrl: '/assets/fund-logos/hdfc.png',
    company: 'HDFC Mutual Fund',
    category: 'Mid Cap',
    returns: {
      oneYear: 18.2,
      threeYear: 16.9,
      fiveYear: 15.7,
    },
    riskLevel: 'High',
    nav: 78.34,
    rating: 4,
    minInvestment: 1000,
  },
  {
    id: 3,
    name: 'SBI Small Cap Fund',
    logoUrl: '/assets/fund-logos/sbi.png',
    company: 'SBI Mutual Fund',
    category: 'Small Cap',
    returns: {
      oneYear: 22.7,
      threeYear: 19.5,
      fiveYear: 18.2,
    },
    riskLevel: 'Very High',
    nav: 112.45,
    rating: 4,
    minInvestment: 500,
  },
  {
    id: 4,
    name: 'ICICI Prudential Technology Fund',
    logoUrl: '/assets/fund-logos/icici.png',
    company: 'ICICI Prudential Mutual Fund',
    category: 'Sectoral',
    returns: {
      oneYear: 15.8,
      threeYear: 19.2,
      fiveYear: 16.5,
    },
    riskLevel: 'Very High',
    nav: 95.78,
    rating: 4,
    minInvestment: 500,
    tags: ['Trending'],
  }
];

const InvestScreen = () => {
  const [activeTab, setActiveTab] = useState<'explore' | 'portfolio'>('explore');
  const [hideValues, setHideValues] = useState(false);
  
  // Function to mask financial values
  const maskValue = (value: string | number): string => {
    if (hideValues) {
      return "****";
    }
    return typeof value === 'number' ? value.toLocaleString('en-IN') : value;
  };
  
  return (
    <div className="pb-24 bg-teal-50/50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-teal-700 to-teal-600 text-white pt-12 pb-4 px-4">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h1 className="text-3xl font-bold">Invest</h1>
            <p className="text-white/80">Grow your wealth with mutual funds</p>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/invest/portfolio" className="relative">
              <Wallet className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-teal-300 rounded-full"></span>
            </Link>
            <Link to="/notifications" className="relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-400 rounded-full"></span>
            </Link>
          </div>
        </div>

        {/* Market Stats Bar */}
        <div className="flex justify-between items-center bg-teal-600/40 backdrop-blur-sm rounded-lg p-3 my-4 overflow-x-auto">
          {marketIndices.map((index, i) => (
            <div key={i} className="flex items-center mr-1">
              <BarChart4 className="h-5 w-5 mr-2 text-white/70" />
              <div>
                <p className="text-xs text-white/70">{index.name}</p>
                <div className="flex items-center">
                  <span className="text-sm font-medium">{index.value}</span>
                  <span className={`text-xs ml-1 flex items-center ${index.isPositive ? 'text-teal-200' : 'text-red-300'}`}>
                    {index.isPositive ? 
                      <ArrowUp className="h-3 w-3 mr-0.5" /> : 
                      <ArrowDown className="h-3 w-3 mr-0.5" />
                    } 
                    {Math.abs(index.change)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total Mutual Funds in India Info */}
        <div className="glass-card bg-teal-600/20 backdrop-blur-sm rounded-lg p-3 mb-3 border border-teal-500/20 flex items-center">
          <Info className="h-5 w-5 mr-2 text-teal-200" />
          <p className="text-sm text-white/90">As of April 2025, there are approximately <span className="font-bold">1,245 mutual funds</span> in India</p>
        </div>

        {/* Portfolio Card */}
        <div className="glass-card bg-teal-600/30 backdrop-blur-sm rounded-lg p-4 border border-teal-500/20">
          <div className="flex justify-between items-center mb-1">
            <h2 className="font-medium text-lg">Your Portfolio</h2>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                className="h-8 w-8 p-0 text-white/80 hover:text-white hover:bg-white/10 rounded-full"
                onClick={() => setHideValues(!hideValues)}
              >
                {hideValues ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
              <Link to="/invest/portfolio" className="text-sm text-white/80 flex items-center">
                View Details <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div>
            <p className="text-sm text-white/70">Current Value</p>
            <p className="text-3xl font-bold">₹{maskValue(32450)}</p>
            <div className="flex items-center mt-1">
              <span className="text-xs bg-teal-400/20 text-teal-200 px-2 py-0.5 rounded-full">+8.64%</span>
              <span className="text-xs text-white/70 ml-2">+₹{maskValue(2580)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 -mt-6">
        <div className="relative">
          <Input 
            placeholder="Search mutual funds..." 
            className="pl-10 py-6 rounded-full border-teal-100 bg-white shadow-lg focus:border-teal-500 focus:ring-teal-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" />
        </div>
      </div>

      {/* Quick Access Navigation */}
      <div className="bg-white rounded-xl mx-4 mt-4 p-3 shadow-sm grid grid-cols-4 gap-1 animate-fade-in">
        {quickAccessItems.map((item, index) => (
          <Link to={item.route} key={index} className="flex flex-col items-center p-2 hover-lift">
            <div className={`${item.bgColor} rounded-full p-3 mb-1`}>
              {item.icon}
            </div>
            <span className="text-xs text-gray-600">{item.label}</span>
          </Link>
        ))}
      </div>
      
      {/* Tabs */}
      <div className="px-4 mt-6">
        <div className="flex border-b border-teal-100">
          <button 
            className={`flex-1 py-3 text-center ${activeTab === 'explore' ? 'text-teal-600 border-b-2 border-teal-600 font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveTab('explore')}
          >
            Explore
          </button>
          <button 
            className={`flex-1 py-3 text-center ${activeTab === 'portfolio' ? 'text-teal-600 border-b-2 border-teal-600 font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveTab('portfolio')}
          >
            Portfolio
          </button>
        </div>
      </div>
      
      {activeTab === 'explore' ? (
        <div className="px-4 py-5 space-y-6 animate-fade-in">
          {/* Market Indices */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-teal-600" />
                <h2 className="text-lg font-medium">Market Indices</h2>
              </div>
              <Link to="/invest/research" className="text-teal-600 text-sm flex items-center">
                View All <ExternalLink className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {marketIndices.map((index, i) => (
                <Card key={i} className="p-3 border border-teal-100 hoverable-card">
                  <div className="flex flex-col">
                    <div className="flex justify-between">
                      <p className="text-xs text-gray-500">{index.name === 'Bank Nifty' ? 'BANK NIFTY' : index.name.toUpperCase() + ' 50'}</p>
                      <p className={`text-xs ${index.isPositive ? 'text-teal-600' : 'text-red-600'}`}>
                        {index.isPositive ? '+' : ''}{index.change}%
                      </p>
                    </div>
                    <p className="font-medium text-lg">{index.fullValue}</p>
                    <p className={`text-xs flex items-center ${index.isPositive ? 'text-teal-600' : 'text-red-600'}`}>
                      {index.isPositive ? 
                        <ArrowUp className="h-3 w-3 mr-0.5" /> : 
                        <ArrowDown className="h-3 w-3 mr-0.5" />
                      } 
                      {Math.abs(index.change)}%
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Fund Categories */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-medium">Fund Categories</h2>
              <Link to="/invest/mutual-funds" className="text-teal-600 text-sm flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {fundCategories.map((category, index) => (
                <Link to={category.route} key={index}>
                  <Card className="p-4 border border-teal-100 hoverable-card flex flex-col items-center">
                    <div className={`${category.bgColor} rounded-full p-3 mb-2 w-12 h-12 flex items-center justify-center`}>
                      {category.icon}
                    </div>
                    <span className="text-sm text-center">{category.name}</span>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Featured Funds */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-medium">Featured Funds</h2>
              <Link to="/invest/mutual-funds?category=featured" className="text-teal-600 text-sm flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="space-y-4">
              {featuredFunds.map((fund) => (
                <motion.div
                  key={fund.id}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="p-4 border border-teal-100 transition-all duration-300 hover:shadow-md">
                    <Link to={`/invest/mutual-fund/${fund.id}`}>
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center overflow-hidden mr-3 border border-teal-100">
                          <img 
                            src={fund.logoUrl} 
                            alt={fund.company} 
                            className="w-7 h-7 object-contain"
                            onError={(e) => {
                              // Fallback for missing logos
                              (e.target as HTMLImageElement).src = '/assets/fund-logos/default.png';
                            }}
                          />
                        </div>
                        <div>
                          <h3 className="text-base font-medium text-teal-800">{fund.name}</h3>
                          <p className="text-xs text-gray-500">{fund.company}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">{fund.category}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          fund.riskLevel === 'Low' ? 'bg-teal-100 text-teal-800' :
                          fund.riskLevel === 'Moderate' ? 'bg-blue-100 text-blue-800' :
                          fund.riskLevel === 'High' ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {fund.riskLevel} Risk
                        </span>
                        {fund.tags?.map((tag, i) => (
                          <Badge key={i} variant="info" className="text-xs">{tag}</Badge>
                        ))}
                        <div className="ml-auto flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < fund.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-teal-50/50 rounded-lg mb-3">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="flex flex-col items-center">
                              <p className="text-xs text-gray-500">1Y Returns</p>
                              <p className="text-sm font-bold text-teal-700">{fund.returns.oneYear}%</p>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">Returns over last 1 year</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="flex flex-col items-center border-x border-teal-100">
                              <p className="text-xs text-gray-500">3Y Returns</p>
                              <p className="text-sm font-bold text-teal-700">{fund.returns.threeYear}%</p>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">Average annual returns over last 3 years</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="flex flex-col items-center">
                              <p className="text-xs text-gray-500">5Y Returns</p>
                              <p className="text-sm font-bold text-teal-700">{fund.returns.fiveYear}%</p>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">Average annual returns over last 5 years</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs text-gray-500">Min Investment</p>
                          <p className="font-medium">₹{fund.minInvestment}</p>
                        </div>
                        
                        <Button variant="investment" size="sm">
                          Invest Now
                        </Button>
                      </div>
                    </Link>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Featured Collections and Tax Planning */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <Link to="/invest/featured-collections">
              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <div className="bg-gradient-to-r from-teal-700 to-teal-600 text-white p-4 rounded-xl h-full">
                  <h3 className="text-lg font-medium mb-2">Featured Collections</h3>
                  <p className="text-sm text-white/80">Best funds for different goals</p>
                </div>
              </motion.div>
            </Link>
            <Link to="/invest/tax-planning">
              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-4 rounded-xl h-full">
                  <h3 className="text-lg font-medium mb-2">Tax Planning</h3>
                  <p className="text-sm text-white/80">Save tax with ELSS funds</p>
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      ) : (
        <div className="px-4 py-6 text-center animate-fade-in">
          <div className="bg-gradient-to-r from-teal-100 to-teal-50 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-4">
            <Wallet className="h-10 w-10 text-teal-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No investments yet</h3>
          <p className="text-gray-500 mb-6">Start your investment journey today</p>
          
          <Button className="w-full bg-teal-600 hover:bg-teal-700 mb-3" asChild>
            <Link to="/invest/mutual-funds">
              Explore Mutual Funds
            </Link>
          </Button>
        </div>
      )}
      
      <BottomNavigation activeTab="invest" />
    </div>
  );
};

export default InvestScreen;
