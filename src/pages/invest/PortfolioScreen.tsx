import React, { useState } from 'react';
import { ArrowLeft, PieChart, TrendingUp, Plus, ChevronRight, ArrowUpRight, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from '@/components/ui/progress';

// Mock data for portfolio holdings
const portfolioData = {
  totalValue: 54280.75,
  invested: 50000,
  returns: 4280.75,
  returnsPercentage: 8.56,
  
  mutualFunds: [
    {
      id: 1,
      name: 'Axis Bluechip Fund',
      category: 'Large Cap',
      units: 214.56,
      avgNav: 41.25,
      currentNav: 45.67,
      invested: 8850.60,
      current: 9800.37,
      returns: 10.73,
    },
    {
      id: 2,
      name: 'HDFC Mid-Cap Opportunities',
      category: 'Mid Cap',
      units: 118.32,
      avgNav: 72.45,
      currentNav: 78.34,
      invested: 8572.28,
      current: 9269.78,
      returns: 8.14,
    },
    {
      id: 3,
      name: 'SBI Small Cap Fund',
      category: 'Small Cap',
      units: 45.78,
      avgNav: 103.54,
      currentNav: 112.45,
      invested: 4740.06,
      current: 5147.96,
      returns: 8.61,
    },
  ],
  
  stocks: [
    {
      id: 1,
      name: 'Reliance Industries',
      symbol: 'RELIANCE',
      quantity: 4,
      avgPrice: 2425.50,
      currentPrice: 2540.75,
      invested: 9702.00,
      current: 10163.00,
      returns: 4.75,
    },
    {
      id: 2,
      name: 'Infosys',
      symbol: 'INFY',
      quantity: 6,
      avgPrice: 1520.75,
      currentPrice: 1467.80,
      invested: 9124.50,
      current: 8806.80,
      returns: -3.48,
    },
    {
      id: 3,
      name: 'HDFC Bank',
      symbol: 'HDFCBANK',
      quantity: 5,
      avgPrice: 1580.20,
      currentPrice: 1634.25,
      invested: 7901.00,
      current: 8171.25,
      returns: 3.42,
    },
  ],
  
  others: [
    {
      id: 1,
      type: 'Digital Gold',
      quantity: '1.45 grams',
      avgPrice: 5850,
      currentPrice: 6250,
      invested: 8482.50,
      current: 9062.50,
      returns: 6.84,
    },
  ],
  
  assetAllocation: [
    { type: 'Mutual Funds', percentage: 42, amount: 24218.11 },
    { type: 'Stocks', percentage: 50, amount: 27141.05 },
    { type: 'Gold', percentage: 8, amount: 9062.50 },
  ],
};

const PortfolioScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('mutual-funds');
  
  return (
    <div className="min-h-screen flex flex-col pb-16">
      {/* Header */}
      <div className="bg-paygrow-green text-white pt-12 pb-6 px-4">
        <div className="flex items-center mb-4">
          <Link to="/invest" className="mr-4">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">Your Portfolio</h1>
        </div>
        
        {/* Portfolio Summary Card */}
        <Card className="bg-white/10 backdrop-blur-sm border-none text-white p-4 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Current Value</h3>
            <PieChart className="w-5 h-5" />
          </div>
          
          <div className="mb-4">
            <p className="text-3xl font-bold">₹{portfolioData.totalValue.toLocaleString('en-IN')}</p>
            <div className="flex items-center mt-1">
              <div className="bg-white/20 rounded-full px-2 py-0.5 text-xs inline-flex items-center mr-2">
                <TrendingUp className="w-3 h-3 mr-1" />
                <span>+{portfolioData.returnsPercentage}%</span>
              </div>
              <span className="text-sm">
                Invested: ₹{portfolioData.invested.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-sm opacity-80">Overall Returns</p>
              <p className="text-xl font-bold">₹{portfolioData.returns.toLocaleString('en-IN')}</p>
            </div>
            <div className="text-right">
              <Button 
                size="sm" 
                className="bg-white text-paygrow-green hover:bg-white/90"
                asChild
              >
                <Link to="/invest">
                  <Plus className="w-4 h-4 mr-1" />
                  Invest More
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Asset Allocation */}
      <div className="bg-white p-4 border-b">
        <h3 className="font-medium mb-3">Asset Allocation</h3>
        
        <div className="mb-4">
          {portfolioData.assetAllocation.map((asset, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between mb-1">
                <span className="text-sm">{asset.type}</span>
                <span className="text-sm font-medium">{asset.percentage}% (₹{asset.amount.toLocaleString('en-IN')})</span>
              </div>
              <Progress 
                value={asset.percentage} 
                className="h-2" 
                indicatorClassName={
                  index === 0 ? 'bg-paygrow-green' : 
                  index === 1 ? 'bg-blue-500' : 'bg-yellow-500'
                }
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Holdings Tabs */}
      <div className="flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="mutual-funds">Mutual Funds</TabsTrigger>
            <TabsTrigger value="stocks">Stocks</TabsTrigger>
            <TabsTrigger value="others">Others</TabsTrigger>
          </TabsList>
          
          {/* Mutual Funds Tab */}
          <TabsContent value="mutual-funds" className="p-4">
            <div className="space-y-4">
              {portfolioData.mutualFunds.map(fund => (
                <Card key={fund.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{fund.name}</h4>
                      <p className="text-xs text-gray-500">{fund.category} • {fund.units.toFixed(2)} units</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{fund.current.toLocaleString('en-IN')}</p>
                      <p className={`text-xs ${fund.returns > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {fund.returns > 0 ? '+' : ''}{fund.returns}%
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-3 text-sm">
                    <div>
                      <p className="text-xs text-gray-500">Invested</p>
                      <p className="font-medium">₹{fund.invested.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Gain/Loss</p>
                      <p className={`font-medium ${(fund.current - fund.invested) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ₹{(fund.current - fund.invested).toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Current NAV</p>
                      <p className="font-medium">₹{fund.currentNav}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1 bg-paygrow-green">
                      <Plus className="h-4 w-4 mr-1" />
                      Invest More
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Redeem
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Stocks Tab */}
          <TabsContent value="stocks" className="p-4">
            <div className="space-y-4">
              {portfolioData.stocks.map(stock => (
                <Card key={stock.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{stock.name}</h4>
                      <p className="text-xs text-gray-500">{stock.symbol} • {stock.quantity} shares</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{stock.current.toLocaleString('en-IN')}</p>
                      <p className={`text-xs ${stock.returns > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {stock.returns > 0 ? '+' : ''}{stock.returns}%
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-3 text-sm">
                    <div>
                      <p className="text-xs text-gray-500">Invested</p>
                      <p className="font-medium">₹{stock.invested.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Gain/Loss</p>
                      <p className={`font-medium ${(stock.current - stock.invested) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ₹{(stock.current - stock.invested).toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">LTP</p>
                      <p className="font-medium">₹{stock.currentPrice}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1 bg-blue-500">
                      <Plus className="h-4 w-4 mr-1" />
                      Buy More
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Sell
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Others Tab */}
          <TabsContent value="others" className="p-4">
            <div className="space-y-4">
              {portfolioData.others.map(asset => (
                <Card key={asset.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{asset.type}</h4>
                      <p className="text-xs text-gray-500">{asset.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{asset.current.toLocaleString('en-IN')}</p>
                      <p className={`text-xs ${asset.returns > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {asset.returns > 0 ? '+' : ''}{asset.returns}%
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-3 text-sm">
                    <div>
                      <p className="text-xs text-gray-500">Invested</p>
                      <p className="font-medium">₹{asset.invested.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Gain/Loss</p>
                      <p className={`font-medium ${(asset.current - asset.invested) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ₹{(asset.current - asset.invested).toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Current Rate</p>
                      <p className="font-medium">₹{asset.currentPrice}/gm</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1 bg-yellow-500">
                      <Plus className="h-4 w-4 mr-1" />
                      Buy More
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Sell
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PortfolioScreen;
