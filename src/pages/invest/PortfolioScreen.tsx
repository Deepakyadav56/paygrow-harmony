
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Wallet, PieChart, TrendingUp, Clock, CalendarClock, 
  ChevronRight, Landmark, DollarSign, AlertCircle, Eye, EyeOff 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { motion } from '@/components/ui/motion';
import BottomNavigation from '@/components/BottomNavigation';
import { Switch } from '@/components/ui/switch';

// Mock data
const portfolioSummary = {
  totalValue: 89650.75,
  invested: 85000,
  returns: 4650.75,
  returnsPercent: 5.47,
  oneDayReturn: 0.82, // New field for 1D return
  xirr: 12.57, // New field for XIRR
  allocation: [
    { type: 'Equity', percentage: 65 },
    { type: 'Debt', percentage: 20 },
    { type: 'Gold', percentage: 10 },
    { type: 'Others', percentage: 5 },
  ]
};

const investments = [
  {
    id: 1,
    name: 'Axis Bluechip Fund',
    category: 'Large Cap • Direct Growth',
    invested: 30000,
    currentValue: 32540,
    returns: 8.5,
    oneDayReturn: 0.32, // New field for 1D return
    xirr: 15.4, // New field for XIRR
    units: 710.37,
    sipAmount: 5000,
    sipDate: '5th',
  },
  {
    id: 2,
    name: 'HDFC Mid-Cap Opportunities',
    category: 'Mid Cap • Direct Growth',
    invested: 25000,
    currentValue: 26750,
    returns: 7.0,
    oneDayReturn: 0.15, // New field for 1D return
    xirr: 11.2, // New field for XIRR
    units: 341.46,
    sipAmount: 2500,
    sipDate: '15th',
  },
  {
    id: 3,
    name: 'ICICI Prudential Debt Fund',
    category: 'Debt • Direct Growth',
    invested: 20000,
    currentValue: 20360,
    returns: 1.8,
    oneDayReturn: -0.05, // New field for 1D return (negative)
    xirr: 6.4, // New field for XIRR
    units: 632.91,
    sipAmount: 0, // Lump sum investment
    sipDate: null,
  },
  {
    id: 4,
    name: 'SBI Gold Fund',
    category: 'Gold • Direct Growth',
    invested: 10000,
    currentValue: 10000.75,
    returns: 0.01,
    oneDayReturn: 0.22, // New field for 1D return
    xirr: 3.8, // New field for XIRR
    units: 312.54,
    sipAmount: 0, // Lump sum investment
    sipDate: null,
  },
];

const PortfolioScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [hideValues, setHideValues] = useState(false); // State for toggling portfolio visibility
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Function to mask financial values
  const maskValue = (value: string | number): string => {
    if (hideValues) {
      return "****";
    }
    return typeof value === 'number' ? value.toLocaleString('en-IN') : value;
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-fountain-blue-600 to-fountain-blue-700 text-white pt-12 pb-6 px-4">
        <div className="flex items-center mb-4">
          <Link to="/invest" className="mr-4">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">Portfolio</h1>
        </div>
        
        {/* Portfolio Summary Card */}
        <Card className="glass-card bg-white/10 backdrop-blur-sm border-none text-white p-4 rounded-xl shadow-lg animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center">
              <Wallet className="h-5 w-5 mr-2 opacity-80" />
              Investment Value
            </h3>
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                className="h-8 w-8 p-0 text-white/80 hover:text-white hover:bg-white/10 rounded-full"
                onClick={() => setHideValues(!hideValues)}
              >
                {hideValues ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
              <Link to="/transaction-history">
                <Button variant="ghost" className="h-8 px-3 py-1 text-white/80 hover:text-white hover:bg-white/10" size="sm">
                  View History
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-2xl font-bold">₹{maskValue(portfolioSummary.totalValue)}</p>
            <div className="flex items-center space-x-4 mt-1">
              <div className="bg-white/20 rounded-full px-3 py-0.5 text-sm inline-flex items-center">
                <TrendingUp className="w-3.5 h-3.5 mr-1" />
                <span>+{maskValue(portfolioSummary.returnsPercent.toFixed(2))}%</span>
              </div>
              <p className="text-sm text-white/80">
                Returns: ₹{maskValue(portfolioSummary.returns)}
              </p>
            </div>
          </div>
          
          {/* New 1D Return and XIRR values */}
          <div className="flex items-center justify-between text-xs mb-3 bg-white/10 rounded-lg p-2">
            <div className="flex items-center">
              <span className="text-white/70 mr-2">1D:</span>
              <span className={portfolioSummary.oneDayReturn >= 0 ? "text-green-300" : "text-red-300"}>
                {portfolioSummary.oneDayReturn >= 0 ? "+" : ""}{maskValue(portfolioSummary.oneDayReturn.toFixed(2))}%
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-white/70 mr-2">XIRR:</span>
              <span className="text-green-300">
                {maskValue(portfolioSummary.xirr.toFixed(2))}%
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="text-white/80">Invested</p>
              <p className="font-medium">₹{maskValue(portfolioSummary.invested)}</p>
            </div>
            
            <div className="text-right">
              <p className="text-white/80">SIPs</p>
              <p className="font-medium">₹{maskValue(7500)}/month</p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Asset Allocation */}
      <div className="px-4 py-4 bg-white shadow-sm rounded-xl mx-4 mt-4 animate-fade-in">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium flex items-center">
            <PieChart className="h-5 w-5 mr-2 text-fountain-blue-600" />
            Asset Allocation
          </h3>
        </div>
        
        <div className="space-y-2">
          {portfolioSummary.allocation.map((asset, index) => (
            <div key={asset.type} className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span>{asset.type}</span>
                <span>{asset.percentage}%</span>
              </div>
              <Progress 
                value={asset.percentage} 
                className="h-2 bg-gray-200"
                indicatorClassName={
                  index === 0 ? 'bg-fountain-blue-500' : 
                  index === 1 ? 'bg-purple-500' : 
                  index === 2 ? 'bg-yellow-500' : 'bg-green-500'
                }
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* SIP Management Button - New Addition */}
      <div className="p-4 bg-gradient-to-r from-green-500/10 to-green-400/10 m-4 rounded-xl shadow-sm animate-fade-in">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-green-500 rounded-full p-2 mr-3">
              <CalendarClock className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-medium">SIP Management</h3>
              <p className="text-sm text-gray-600">Manage your active SIPs</p>
            </div>
          </div>
          <Button asChild className="bg-fountain-blue-600 hover:bg-fountain-blue-700">
            <Link to="/invest/sip-management">
              Manage SIPs
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Investments */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-fountain-blue-600" />
            Your Investments
          </h3>
        </div>
        
        <div className="space-y-4">
          {loading ? (
            // Skeleton loaders
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="p-3 animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="h-8 bg-gray-200 rounded"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </Card>
            ))
          ) : (
            investments.map((investment) => (
              <motion.div
                key={investment.id}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="animate-fade-in"
              >
                <Card className="p-4 hover:shadow-md transition-all duration-300 border border-gray-100 rounded-xl">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-fountain-blue-600">{investment.name}</h4>
                      <p className="text-xs text-gray-500">{investment.category}</p>
                    </div>
                    <div className={`px-2 py-0.5 rounded text-xs ${
                      investment.returns > 5 
                        ? 'bg-green-100 text-green-800' 
                        : investment.returns > 0 
                          ? 'bg-fountain-blue-100 text-fountain-blue-800' 
                          : 'bg-red-100 text-red-800'
                    }`}>
                      {investment.returns > 0 ? '+' : ''}{investment.returns}%
                    </div>
                  </div>
                  
                  {/* New 1D Return and XIRR metrics */}
                  <div className="flex justify-between mb-3 text-xs">
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-1">1D:</span>
                      <span className={investment.oneDayReturn >= 0 ? "text-green-600" : "text-red-600"}>
                        {investment.oneDayReturn >= 0 ? "+" : ""}{hideValues ? "**" : investment.oneDayReturn.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-1">XIRR:</span>
                      <span className="text-fountain-blue-600">
                        {hideValues ? "**" : investment.xirr.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Invested</p>
                      <p className="text-sm font-medium">₹{maskValue(investment.invested)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Current Value</p>
                      <p className="text-sm font-medium">₹{maskValue(investment.currentValue)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Units</p>
                      <p className="text-sm font-medium">{maskValue(investment.units.toFixed(2))}</p>
                    </div>
                  </div>
                  
                  {/* SIP Information or Lump Sum */}
                  {investment.sipAmount > 0 ? (
                    <div className="flex items-center justify-between bg-fountain-blue-50 p-2.5 rounded-lg mb-3">
                      <div className="flex items-center">
                        <CalendarClock className="h-4 w-4 mr-2 text-fountain-blue-600" />
                        <div>
                          <p className="text-xs font-medium text-fountain-blue-800">Active SIP</p>
                          <p className="text-xs text-fountain-blue-600">₹{maskValue(investment.sipAmount)} on {investment.sipDate} monthly</p>
                        </div>
                      </div>
                      <Link to="/invest/sip-management">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 text-fountain-blue-600 hover:bg-fountain-blue-100"
                        >
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          Manage
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="flex items-center bg-gray-50 p-2.5 rounded-lg mb-3">
                      <Landmark className="h-4 w-4 mr-2 text-gray-500" />
                      <p className="text-xs text-gray-600">One-time Investment</p>
                    </div>
                  )}
                  
                  <div className="flex space-x-2">
                    <Link to={`/invest/mutual-fund/${investment.id}`} className="flex-1">
                      <Button 
                        size="sm" 
                        className="w-full"
                        variant="outline"
                      >
                        Details
                      </Button>
                    </Link>
                    <Link to={`/invest/partial-redemption/${investment.id}`} className="flex-1">
                      <Button 
                        size="sm" 
                        className="w-full bg-fountain-blue-600 hover:bg-fountain-blue-700"
                      >
                        Redeem
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </div>
        
        <div className="mt-6 bg-yellow-50 rounded-lg p-4 space-y-2 animate-fade-in">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800">Tax Planning</h4>
              <p className="text-sm text-yellow-700 mb-2">
                Consider ELSS funds for tax benefits under Section 80C.
              </p>
              <Link to="/invest/tax-planning">
                <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700 text-white">
                  Explore Tax Saving Funds
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default PortfolioScreen;
