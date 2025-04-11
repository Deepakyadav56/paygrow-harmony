import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, ChevronRight, Info, PieChart } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';

// Mock data for mutual funds
const mutualFunds = [
  {
    id: 1,
    name: 'Axis Bluechip Fund',
    category: 'Large Cap',
    returns: {
      oneYear: 12.5,
      threeYear: 15.8,
      fiveYear: 14.2,
    },
    riskLevel: 'Moderate',
    nav: 45.67,
  },
  {
    id: 2,
    name: 'HDFC Mid-Cap Opportunities',
    category: 'Mid Cap',
    returns: {
      oneYear: 18.2,
      threeYear: 16.9,
      fiveYear: 15.7,
    },
    riskLevel: 'High',
    nav: 78.34,
  },
  {
    id: 3,
    name: 'SBI Debt Fund',
    category: 'Debt',
    returns: {
      oneYear: 6.5,
      threeYear: 7.2,
      fiveYear: 7.8,
    },
    riskLevel: 'Low',
    nav: 32.18,
  },
];

// Mock data for stocks
const stocks = [
  {
    id: 1,
    name: 'Reliance Industries',
    symbol: 'RELIANCE',
    price: 2540.75,
    change: 1.24,
    sector: 'Energy',
  },
  {
    id: 2,
    name: 'Infosys',
    symbol: 'INFY',
    price: 1467.80,
    change: -0.68,
    sector: 'Technology',
  },
  {
    id: 3,
    name: 'HDFC Bank',
    symbol: 'HDFCBANK',
    price: 1634.25,
    change: 0.89,
    sector: 'Financial',
  },
];

const InvestScreen: React.FC = () => {
  const [tabValue, setTabValue] = useState('mutual-funds');

  return (
    <div className="pb-20"> {/* Add padding for bottom navigation */}
      {/* Header */}
      <div className="bg-paygrow-green text-white pt-12 pb-6 px-4">
        <h1 className="text-2xl font-bold mb-2">Investments</h1>
        <p className="text-white/80 mb-6">Grow your wealth with smart investments</p>
        
        {/* Summary Card */}
        <Card className="bg-white/10 backdrop-blur-sm border-none text-white p-4 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Portfolio Overview</h3>
            <PieChart className="w-5 h-5" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-sm opacity-80">Current Value</p>
              <p className="text-xl font-bold">₹27,840.50</p>
              <div className="mt-1 flex items-center">
                <div className="bg-white/20 rounded-full px-2 py-0.5 text-xs inline-flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  <span>+8.4%</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm opacity-80">Invested Amount</p>
              <p className="text-xl font-bold">₹25,600.00</p>
              <div className="mt-1 flex items-center">
                <div className="bg-white/20 rounded-full px-2 py-0.5 text-xs">
                  Profit: ₹2,240.50
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Tabs Section */}
      <div className="px-4 mt-4">
        <Tabs defaultValue="mutual-funds" value={tabValue} onValueChange={setTabValue}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="mutual-funds">Mutual Funds</TabsTrigger>
            <TabsTrigger value="stocks">Stocks</TabsTrigger>
            <TabsTrigger value="others">Others</TabsTrigger>
          </TabsList>
          
          {/* Mutual Funds Tab */}
          <TabsContent value="mutual-funds">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Top Performing Funds</h3>
                <Button
                  variant="link"
                  className="text-paygrow-blue p-0"
                  asChild
                >
                  <a href="/mutual-funds">All Funds</a>
                </Button>
              </div>
              
              {mutualFunds.map((fund) => (
                <Card key={fund.id} className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{fund.name}</h4>
                      <p className="text-xs text-gray-500">{fund.category}</p>
                    </div>
                    <div className="flex items-center">
                      <div className={`px-2 py-0.5 rounded text-xs ${
                        fund.returns.oneYear > 10 
                          ? 'bg-green-100 text-green-800' 
                          : fund.returns.oneYear > 5 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-orange-100 text-orange-800'
                      }`}>
                        {fund.returns.oneYear}% (1Y)
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 ml-2" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <p className="text-xs text-gray-500">3Y Returns</p>
                      <p className="text-sm font-medium">{fund.returns.threeYear}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">5Y Returns</p>
                      <p className="text-sm font-medium">{fund.returns.fiveYear}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">NAV</p>
                      <p className="text-sm font-medium">₹{fund.nav}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <Button size="sm" className="paygrow-button-primary flex-1">Invest</Button>
                    <Button size="sm" variant="outline" className="flex-1">Details</Button>
                  </div>
                </Card>
              ))}
              
              <Button 
                className="w-full paygrow-button-primary mt-4"
                asChild
              >
                <a href="/mutual-funds">Explore All Mutual Funds</a>
              </Button>
            </div>
          </TabsContent>
          
          {/* Stocks Tab */}
          <TabsContent value="stocks">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Popular Stocks</h3>
                <Button
                  variant="link"
                  className="text-paygrow-blue p-0"
                  asChild
                >
                  <a href="/stocks">All Stocks</a>
                </Button>
              </div>
              
              {stocks.map((stock) => (
                <Card key={stock.id} className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{stock.name}</h4>
                      <p className="text-xs text-gray-500">{stock.symbol} • {stock.sector}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{stock.price.toFixed(2)}</p>
                      <p className={`text-xs ${
                        stock.change > 0 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {stock.change > 0 ? '+' : ''}{stock.change}%
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <Button size="sm" className="paygrow-button-primary flex-1">Buy</Button>
                    <Button size="sm" variant="outline" className="flex-1">Details</Button>
                  </div>
                </Card>
              ))}
              
              <Button 
                className="w-full paygrow-button-primary mt-4"
                asChild
              >
                <a href="/stocks">Explore All Stocks</a>
              </Button>
            </div>
          </TabsContent>
          
          {/* Others Tab */}
          <TabsContent value="others">
            <div className="space-y-4">
              <Card className="p-4 paygrow-gradient-blue text-white">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Digital Gold</h3>
                  <Info className="w-4 h-4" />
                </div>
                <p className="text-sm mb-3">Invest in 24K 99.9% pure digital gold</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs opacity-80">Current Rate</p>
                    <p className="font-bold">₹6,250/gram</p>
                  </div>
                  <Button 
                    className="bg-white text-paygrow-blue hover:bg-white/90"
                    size="sm"
                    asChild
                  >
                    <a href="/digital-gold">Invest Now</a>
                  </Button>
                </div>
              </Card>
              
              <Card className="p-4 bg-gradient-to-r from-amber-500 to-yellow-400 text-white">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Fixed Deposits</h3>
                  <Info className="w-4 h-4" />
                </div>
                <p className="text-sm mb-3">Earn up to 7.5% interest on your deposits</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs opacity-80">Interest Rates</p>
                    <p className="font-bold">6.5% - 7.5%</p>
                  </div>
                  <Button 
                    className="bg-white text-amber-600 hover:bg-white/90"
                    size="sm"
                    asChild
                  >
                    <a href="/fixed-deposits">Open FD</a>
                  </Button>
                </div>
              </Card>
              
              <Card className="p-4 bg-purple-600 text-white">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">IPOs</h3>
                  <Info className="w-4 h-4" />
                </div>
                <p className="text-sm mb-3">Invest in upcoming Initial Public Offerings</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs opacity-80">Active IPOs</p>
                    <p className="font-bold">3 Available</p>
                  </div>
                  <Button 
                    className="bg-white text-purple-600 hover:bg-white/90"
                    size="sm"
                    asChild
                  >
                    <a href="/ipos">Explore IPOs</a>
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default InvestScreen;
