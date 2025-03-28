import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, ChevronRight, Info, PieChart, Wallet, LineChart, ArrowUpRight, BellRing, Timer, Star, Award } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';

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
    navChange: 0.23,
    aum: '23,458 Cr',
    expenseRatio: 1.8,
    rating: 5,
    lastUpdated: '1d ago',
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
    navChange: 0.45,
    aum: '28,712 Cr',
    expenseRatio: 1.9,
    rating: 4,
    lastUpdated: '1d ago',
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
    navChange: -0.15,
    aum: '15,890 Cr',
    expenseRatio: 1.2,
    rating: 4,
    lastUpdated: '1d ago',
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
    marketCap: '17.2 Lakh Cr',
    pe: 28.4,
    volume: '2.3M',
  },
  {
    id: 2,
    name: 'Infosys',
    symbol: 'INFY',
    price: 1467.80,
    change: -0.68,
    sector: 'Technology',
    marketCap: '6.1 Lakh Cr',
    pe: 24.1,
    volume: '1.8M',
  },
  {
    id: 3,
    name: 'HDFC Bank',
    symbol: 'HDFCBANK',
    price: 1634.25,
    change: 0.89,
    sector: 'Financial',
    marketCap: '9.3 Lakh Cr',
    pe: 22.5,
    volume: '1.5M',
  },
];

// Market indices data
const marketIndices = [
  { name: 'NIFTY 50', value: '21,754.50', change: 0.82 },
  { name: 'SENSEX', value: '71,394.87', change: 0.75 },
  { name: 'BANK NIFTY', value: '47,896.30', change: 1.15 },
];

// Portfolio summary data
const portfolioSummary = {
  totalValue: 27840.50,
  invested: 25600.00,
  returns: 2240.50,
  returnsPercent: 8.4,
  allocation: [
    { type: 'Mutual Funds', percentage: 65 },
    { type: 'Stocks', percentage: 25 },
    { type: 'Gold', percentage: 10 },
  ]
};

const InvestScreen: React.FC = () => {
  const [tabValue, setTabValue] = useState('mutual-funds');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index}
        className={`h-3.5 w-3.5 ${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`} 
      />
    ));
  };

  return (
    <div className="pb-20 bg-gray-50 min-h-screen"> {/* Add padding for bottom navigation */}
      {/* Market Overview Strip */}
      <div className="bg-white px-4 py-2 shadow-sm overflow-x-auto whitespace-nowrap sticky top-0 z-10">
        <div className="flex space-x-6">
          {marketIndices.map((index) => (
            <div key={index.name} className="flex items-center">
              <span className="text-xs font-medium mr-2">{index.name}</span>
              <span className="text-xs font-medium">{index.value}</span>
              <span className={`text-xs ml-1 ${index.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {index.change >= 0 ? '+' : ''}{index.change}%
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Header */}
      <div className="bg-paygrow-blue text-white pt-12 pb-6 px-4">
        <h1 className="text-2xl font-bold mb-2">Investments</h1>
        <p className="text-white/80 mb-6">Grow your wealth with smart investments</p>
        
        {/* Summary Card */}
        <Card className="bg-white/10 backdrop-blur-sm border-none text-white p-4 rounded-xl shadow-lg animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Portfolio Overview</h3>
            <Link to="/invest/portfolio">
              <Button variant="ghost" className="h-8 w-8 p-0 text-white" size="sm">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-sm opacity-80">Current Value</p>
              <p className="text-xl font-bold">₹{portfolioSummary.totalValue.toLocaleString('en-IN')}</p>
              <div className="mt-1 flex items-center">
                <div className="bg-white/20 rounded-full px-2 py-0.5 text-xs inline-flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  <span>+{portfolioSummary.returnsPercent}%</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm opacity-80">Invested Amount</p>
              <p className="text-xl font-bold">₹{portfolioSummary.invested.toLocaleString('en-IN')}</p>
              <div className="mt-1 flex items-center">
                <div className="bg-white/20 rounded-full px-2 py-0.5 text-xs">
                  Profit: ₹{portfolioSummary.returns.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          </div>
          
          {/* Portfolio Allocation */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-1">
              <p className="text-xs text-white/70">Asset Allocation</p>
              <Link to="/invest/portfolio" className="text-xs text-white/70 underline">View Details</Link>
            </div>
            {portfolioSummary.allocation.map((asset, index) => (
              <div key={asset.type} className="mb-1">
                <div className="flex justify-between text-xs mb-1">
                  <span>{asset.type}</span>
                  <span>{asset.percentage}%</span>
                </div>
                <Progress 
                  value={asset.percentage} 
                  className="h-1 bg-white/20"
                  indicatorClassName={
                    index === 0 ? 'bg-green-400' : 
                    index === 1 ? 'bg-blue-400' : 'bg-yellow-400'
                  }
                />
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      {/* Quick Actions */}
      <div className="px-4 py-3 bg-white shadow-sm">
        <div className="grid grid-cols-4 gap-2 text-center">
          <Link to="/invest/mutual-funds" className="flex flex-col items-center space-y-1">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <LineChart className="h-6 w-6" />
            </div>
            <span className="text-xs">Mutual Funds</span>
          </Link>
          <Link to="/stocks" className="flex flex-col items-center space-y-1">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
              <TrendingUp className="h-6 w-6" />
            </div>
            <span className="text-xs">Stocks</span>
          </Link>
          <Link to="/digital-gold" className="flex flex-col items-center space-y-1">
            <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600">
              <Star className="h-6 w-6" />
            </div>
            <span className="text-xs">Gold</span>
          </Link>
          <Link to="/fixed-deposits" className="flex flex-col items-center space-y-1">
            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
              <Wallet className="h-6 w-6" />
            </div>
            <span className="text-xs">Fixed Deposits</span>
          </Link>
        </div>
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
                <h3 className="font-semibold flex items-center">
                  <Award className="w-4 h-4 mr-2 text-blue-600" />
                  Top Performing Funds
                </h3>
                <Button
                  variant="link"
                  className="text-paygrow-blue p-0"
                  asChild
                >
                  <Link to="/invest/mutual-funds">View All <ChevronRight className="h-4 w-4" /></Link>
                </Button>
              </div>
              
              {loading ? (
                // Skeleton loaders for mutual funds
                Array.from({ length: 3 }).map((_, index) => (
                  <Card key={index} className="p-3 animate-pulse">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="h-8 bg-gray-200 rounded"></div>
                      <div className="h-8 bg-gray-200 rounded"></div>
                      <div className="h-8 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="h-10 bg-gray-200 rounded flex-1"></div>
                      <div className="h-10 bg-gray-200 rounded flex-1"></div>
                    </div>
                  </Card>
                ))
              ) : (
                mutualFunds.map((fund) => (
                  <Card key={fund.id} className="p-3 hover:shadow-md transition-all duration-300 border border-gray-100">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-paygrow-blue">{fund.name}</h4>
                        <p className="text-xs text-gray-500">{fund.category} • {fund.riskLevel} Risk</p>
                      </div>
                      <div className="flex items-center">
                        <div className={`px-2 py-0.5 rounded text-xs ${
                          fund.returns.oneYear > 15 
                            ? 'bg-green-100 text-green-800' 
                            : fund.returns.oneYear > 10 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-orange-100 text-orange-800'
                        }`}>
                          {fund.returns.oneYear}% (1Y)
                        </div>
                        <Link to={`/invest/mutual-fund/${fund.id}`}>
                          <ChevronRight className="w-4 h-4 text-gray-400 ml-2" />
                        </Link>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex items-center">
                        <div className="flex mr-2">{renderStars(fund.rating)}</div>
                        <span className="text-xs text-gray-500">Updated {fund.lastUpdated}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 mb-3">
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
                        <p className="text-sm font-medium flex items-center">
                          ₹{fund.nav}
                          <span className={`text-xs ml-1 ${fund.navChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {fund.navChange >= 0 ? '+' : ''}{fund.navChange}%
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <Link to={`/invest/sip-setup/${fund.id}`} className="flex-1">
                        <Button size="sm" className="paygrow-button-primary w-full">
                          Invest
                        </Button>
                      </Link>
                      <Link to={`/invest/mutual-fund/${fund.id}`} className="flex-1">
                        <Button size="sm" variant="outline" className="w-full">
                          Details
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))
              )}
              
              <Button 
                className="w-full paygrow-button-primary mt-4"
                asChild
              >
                <Link to="/invest/mutual-funds" className="flex items-center justify-center">
                  Explore All Mutual Funds
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
            
            {/* SIP Recommendations */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold flex items-center">
                  <Timer className="w-4 h-4 mr-2 text-green-600" />
                  SIP Recommendations
                </h3>
              </div>
              
              <Card className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border-none shadow-sm">
                <h4 className="font-medium mb-2">Start a SIP today!</h4>
                <p className="text-sm text-gray-600 mb-3">Invest as little as ₹500 per month and build wealth over time.</p>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Monthly investment</span>
                    <span className="font-medium">₹1,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Expected returns (10%)</span>
                    <span className="font-medium text-green-600">₹4.3 Lakhs</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Investment period</span>
                    <span className="font-medium">15 years</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-paygrow-green text-white">Create SIP</Button>
              </Card>
            </div>
          </TabsContent>
          
          {/* Stocks Tab */}
          <TabsContent value="stocks">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-blue-600" />
                  Popular Stocks
                </h3>
                <Button
                  variant="link"
                  className="text-paygrow-blue p-0"
                  asChild
                >
                  <Link to="/stocks">View All <ChevronRight className="h-4 w-4" /></Link>
                </Button>
              </div>
              
              {loading ? (
                // Skeleton loaders for stocks
                Array.from({ length: 3 }).map((_, index) => (
                  <Card key={index} className="p-3 animate-pulse">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="h-8 bg-gray-200 rounded"></div>
                      <div className="h-8 bg-gray-200 rounded"></div>
                      <div className="h-8 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="h-10 bg-gray-200 rounded flex-1"></div>
                      <div className="h-10 bg-gray-200 rounded flex-1"></div>
                    </div>
                  </Card>
                ))
              ) : (
                stocks.map((stock) => (
                  <Card key={stock.id} className="p-3 hover:shadow-md transition-all duration-300 border border-gray-100">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-paygrow-blue">{stock.name}</h4>
                        <p className="text-xs text-gray-500">{stock.symbol} • {stock.sector}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{stock.price.toFixed(2)}</p>
                        <p className={`text-xs ${
                          stock.change > 0 
                            ? 'text-green-600 flex items-center justify-end' 
                            : 'text-red-600 flex items-center justify-end'
                        }`}>
                          {stock.change > 0 ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : ''}
                          {stock.change > 0 ? '+' : ''}{stock.change}%
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 mb-3 text-sm">
                      <div>
                        <p className="text-xs text-gray-500">Market Cap</p>
                        <p className="font-medium">{stock.marketCap}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">P/E Ratio</p>
                        <p className="font-medium">{stock.pe}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Volume</p>
                        <p className="font-medium">{stock.volume}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex space-x-2">
                      <Button size="sm" className="flex-1 bg-blue-600 text-white hover:bg-blue-700">Buy</Button>
                      <Button size="sm" variant="outline" className="flex-1">Details</Button>
                    </div>
                  </Card>
                ))
              )}
              
              <Button 
                className="w-full bg-blue-600 text-white hover:bg-blue-700 mt-4"
                asChild
              >
                <Link to="/stocks" className="flex items-center justify-center">
                  Explore All Stocks
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
            
            {/* Market News */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold flex items-center">
                  <BellRing className="w-4 h-4 mr-2 text-orange-600" />
                  Market News
                </h3>
              </div>
              
              <Card className="p-4 border-none shadow-sm bg-gradient-to-r from-blue-50 to-purple-50">
                <p className="text-xs text-gray-500 mb-1">LATEST UPDATES</p>
                <h4 className="font-medium mb-2">Market hits record high as FIIs pump in funds</h4>
                <p className="text-sm text-gray-600 mb-3">Foreign Institutional Investors (FIIs) have been net buyers in the cash segment for the fifth consecutive session, fueling the market rally.</p>
                <Button variant="outline" size="sm" className="text-blue-600 border-blue-200">Read More</Button>
              </Card>
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
                    <p className="text-xs text-green-200 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-0.5" />
                      +1.2% today
                    </p>
                  </div>
                  <Button 
                    className="bg-white text-paygrow-blue hover:bg-white/90"
                    size="sm"
                    asChild
                  >
                    <Link to="/digital-gold">Invest Now</Link>
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
                    <p className="text-xs text-amber-100">No lock-in period</p>
                  </div>
                  <Button 
                    className="bg-white text-amber-600 hover:bg-white/90"
                    size="sm"
                    asChild
                  >
                    <Link to="/fixed-deposits">Open FD</Link>
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
                    <p className="text-xs text-purple-200">Closes in 2 days</p>
                  </div>
                  <Button 
                    className="bg-white text-purple-600 hover:bg-white/90"
                    size="sm"
                    asChild
                  >
                    <Link to="/ipos">Explore IPOs</Link>
                  </Button>
                </div>
              </Card>
              
              <Card className="p-4 bg-gradient-to-r from-green-600 to-teal-500 text-white">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">US Stocks</h3>
                  <Info className="w-4 h-4" />
                </div>
                <p className="text-sm mb-3">Invest in top US companies like Apple, Tesla, Microsoft</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs opacity-80">Market Status</p>
                    <p className="font-bold">Open Now</p>
                    <p className="text-xs text-green-200">NASDAQ +0.8%</p>
                  </div>
                  <Button 
                    className="bg-white text-green-600 hover:bg-white/90"
                    size="sm"
                    asChild
                  >
                    <Link to="/us-stocks">Invest</Link>
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
