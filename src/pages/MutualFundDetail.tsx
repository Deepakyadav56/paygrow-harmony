
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info } from 'lucide-react';

// Mock fund data
const fundData = {
  id: 1,
  name: 'HDFC Small Cap',
  category: 'Small Cap',
  risk: 'Low Risk',
  rating: 5,
  currentNAV: 120.5,
  navDate: '01 Apr 2025',
  oneDayChange: '+1.25%',
  navHistory: [110, 112, 115, 113, 116, 119, 120.5],
  overview: {
    minSIP: 100,
    minOneTime: 100,
    expenseRatio: '0.93%',
    fundSize: '₹225.50 Cr',
    fundPlan: 'Growth',
    aum: '₹225.50 Cr',
    exitLoad: '1.0%',
    lockIn: 'No Lock-in',
  },
  holdings: {
    fundAllocation: [
      { name: 'Equity', value: 60.5, color: '#9580FF' },
      { name: 'Debt', value: 17.3, color: '#FF8080' },
      { name: 'Cash', value: 22.2, color: '#5CE0D8' },
    ],
    sectorAllocation: [
      { name: 'Financial Services', value: 18.2, color: '#9580FF' },
      { name: 'IT', value: 15.8, color: '#5CE0D8' },
      { name: 'Oil & gas', value: 12.4, color: '#5CE0D8' },
      { name: 'Consumer Goods', value: 9.7, color: '#FFB672' },
      { name: 'Automobile', value: 8.3, color: '#5E87FF' },
      { name: 'Others', value: 15.8, color: '#68D391' },
    ],
    topHoldings: [
      { name: 'Larsen & Turbo', category: 'Infrastructure Development', value: 10.93 },
      { name: 'Adani Ports', category: 'Marine Ports & Services', value: 10.93 },
      { name: 'ICICI Banks', category: 'Banks', value: 10.93 },
      { name: 'NTPC', category: 'Power Generation & Distribution', value: 10.93 },
      { name: 'HDFC Bank', category: 'Banks', value: 10.93 },
    ],
  },
  returns: {
    '1Y': '+65.2%',
    '3Y': '+50.2%',
    '5Y': '+45.2%',
  },
  information: [
    {
      title: 'Fund Size',
      description: 'Total money invested by all investors in a mutual fund.'
    },
    {
      title: 'Expense Ratio',
      description: 'Annual fee (as a % of fund size) charged by the fund for managing your money.'
    },
    {
      title: 'Lock-in Period',
      description: 'Minimum time you must stay invested before you can withdraw.'
    },
    {
      title: 'Exit Load',
      description: 'Fee charged if you withdraw money (partially or fully) before a specified time.'
    }
  ]
};

const MutualFundDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const [showInfo, setShowInfo] = useState(false);
  
  // Generate stars based on rating
  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-teal-600 text-white pt-10 pb-6 px-5">
        <div className="flex items-center mb-4">
          <Link to="/mutual-funds" className="mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="m15 18-6-6 6-6"></path></svg>
          </Link>
          <h1 className="text-xl font-bold">Mutual Fund Info</h1>
          <div className="flex-1"></div>
          <Link to="/" className="ml-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          </Link>
        </div>
        
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-3">
            <div className="text-red-500 font-bold text-xs">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                <rect width="12" height="12" x="4" y="4" fill="#FF0000" />
                <rect width="12" height="12" x="16" y="4" fill="#FF0000" />
                <rect width="12" height="12" x="4" y="16" fill="#FF0000" />
                <rect width="4" height="4" x="18" y="18" fill="#0000FF" />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">{fundData.name}</h2>
          </div>
          <button className="ml-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
          </button>
        </div>
        
        <div className="flex items-center space-x-2 mb-3">
          <Badge className="bg-white/20 text-white hover:bg-white/30">{fundData.category}</Badge>
          <Badge className="bg-green-500/20 text-white hover:bg-green-500/30">{fundData.risk}</Badge>
          <Badge className="bg-yellow-500/20 text-white hover:bg-yellow-500/30">{renderStars(fundData.rating)}</Badge>
        </div>
        
        <div>
          <p className="text-sm text-white/80">Current NAV</p>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">₹{fundData.currentNAV}</span>
              <span className="text-sm ml-2 opacity-80">({fundData.navDate})</span>
            </div>
            <div className="bg-green-500/30 px-2 py-1 rounded-full flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 mr-1"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
              <span className="text-sm">{fundData.oneDayChange}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* NAV Chart */}
      <div className="p-4">
        <div className="bg-white border rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">NAV Chart</h3>
            <div className="flex items-center">
              <span className="text-xs text-gray-500 mr-2">3 Years</span>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">+20.36%</Badge>
            </div>
          </div>
          
          <div className="flex items-end h-40 mt-4 mb-2">
            {fundData.navHistory.map((nav, index) => {
              const height = (nav / Math.max(...fundData.navHistory)) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-teal-600 rounded-t"
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
              );
            })}
          </div>
          
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <div>1M</div>
            <div>6M</div>
            <div>1Y</div>
            <div className="px-2 py-1 rounded-full bg-teal-600 text-white">3Y</div>
            <div>5Y</div>
            <div>All</div>
          </div>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full px-4">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-teal-600 data-[state=active]:text-teal-600 rounded-none">
            Overview
          </TabsTrigger>
          <TabsTrigger value="holdings" className="data-[state=active]:border-b-2 data-[state=active]:border-teal-600 data-[state=active]:text-teal-600 rounded-none">
            Holdings
          </TabsTrigger>
          <TabsTrigger value="returns" className="data-[state=active]:border-b-2 data-[state=active]:border-teal-600 data-[state=active]:text-teal-600 rounded-none">
            Returns
          </TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="px-0 pt-4">
          <div className="bg-white">
            <div className="relative bg-white p-4 rounded-lg border mb-4">
              <div className="flex justify-between mb-2">
                <h3 className="text-lg font-medium">Funds Overview</h3>
                <button onClick={() => setShowInfo(!showInfo)} className="text-teal-600">
                  <Info className="h-5 w-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-y-4">
                <div>
                  <p className="text-sm text-gray-500">Min SIP</p>
                  <p className="text-base font-medium">₹{fundData.overview.minSIP}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Min One-Time</p>
                  <p className="text-base font-medium">₹{fundData.overview.minOneTime}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Expense Ratio</p>
                  <p className="text-base font-medium">{fundData.overview.expenseRatio}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fund Size</p>
                  <p className="text-base font-medium">{fundData.overview.fundSize}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fund Plan</p>
                  <p className="text-base font-medium">{fundData.overview.fundPlan}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">AUM</p>
                  <p className="text-base font-medium">{fundData.overview.aum}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Exit Load</p>
                  <p className="text-base font-medium">{fundData.overview.exitLoad}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Lock In</p>
                  <p className="text-base font-medium">{fundData.overview.lockIn}</p>
                </div>
              </div>
            </div>
            
            {/* Information Modal */}
            {showInfo && (
              <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
                <div className="bg-white rounded-lg max-w-md mx-4 p-6 animate-fade-in">
                  <h3 className="text-xl font-bold text-teal-700 mb-4">Information</h3>
                  <div className="space-y-4">
                    {fundData.information.map((item, index) => (
                      <div key={index}>
                        <p className="font-medium text-gray-800 mb-1">{item.title}:</p>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    ))}
                  </div>
                  <Button 
                    onClick={() => setShowInfo(false)}
                    className="mt-6 w-full bg-teal-600 hover:bg-teal-700"
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
            
            <div className="px-4 mb-4">
              <Link 
                to="/scheme-document" 
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-gray-600"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" x2="8" y1="13" y2="13"></line><line x1="16" x2="8" y1="17" y2="17"></line><line x1="10" x2="8" y1="9" y2="9"></line></svg>
                  <span className="text-gray-800">View Scheme Document</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-600"><path d="m9 18 6-6-6-6"></path></svg>
              </Link>
            </div>
          </div>
        </TabsContent>
        
        {/* Holdings Tab */}
        <TabsContent value="holdings" className="px-0 pt-4">
          <div className="bg-white px-4">
            {/* Fund Allocation */}
            <div className="mb-6 border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-4">Fund Allocation</h3>
              <div className="flex">
                <div className="w-1/2">
                  <div className="relative w-32 h-32 mx-auto">
                    <svg viewBox="0 0 100 100" className="transform -rotate-90">
                      {/* Create pie chart segments */}
                      {fundData.holdings.fundAllocation.map((item, index) => {
                        const previousEndAngle = fundData.holdings.fundAllocation
                          .slice(0, index)
                          .reduce((acc, curr) => acc + curr.value, 0);
                        const startAngle = (previousEndAngle / 100) * 360;
                        const endAngle = ((previousEndAngle + item.value) / 100) * 360;
                        const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                        const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                        const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
                        const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
                        const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
                        
                        return (
                          <path
                            key={index}
                            d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                            fill={item.color}
                          />
                        );
                      })}
                      <circle cx="50" cy="50" r="25" fill="white" />
                    </svg>
                  </div>
                </div>
                <div className="w-1/2">
                  {fundData.holdings.fundAllocation.map((item, index) => (
                    <div key={index} className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="w-3 h-3 inline-block mr-2" style={{ backgroundColor: item.color }}></span>
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sector Allocation */}
            <div className="mb-6 border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-4">Sector Allocation</h3>
              <div className="flex">
                <div className="w-1/2">
                  <div className="relative w-32 h-32 mx-auto">
                    <svg viewBox="0 0 100 100" className="transform -rotate-90">
                      {/* Create pie chart segments */}
                      {fundData.holdings.sectorAllocation.map((item, index) => {
                        const previousEndAngle = fundData.holdings.sectorAllocation
                          .slice(0, index)
                          .reduce((acc, curr) => acc + curr.value, 0);
                        const startAngle = (previousEndAngle / 100) * 360;
                        const endAngle = ((previousEndAngle + item.value) / 100) * 360;
                        const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                        const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                        const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
                        const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
                        const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
                        
                        return (
                          <path
                            key={index}
                            d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                            fill={item.color}
                          />
                        );
                      })}
                      <circle cx="50" cy="50" r="25" fill="white" />
                    </svg>
                  </div>
                </div>
                <div className="w-1/2">
                  {fundData.holdings.sectorAllocation.map((item, index) => (
                    <div key={index} className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="w-3 h-3 inline-block mr-2" style={{ backgroundColor: item.color }}></span>
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Top Holdings */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Holdings</h3>
              <div className="space-y-4">
                {fundData.holdings.topHoldings.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-3 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-teal-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M16 12h-6.5a2 2 0 1 0 0 4H12"></path></svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{item.value}%</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-center">
                <Button variant="link" className="text-teal-600">
                  View More
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Returns Tab */}
        <TabsContent value="returns" className="px-0 pt-4">
          <div className="bg-white px-4">
            <div className="border rounded-lg p-4 mb-6">
              <h3 className="text-lg font-medium mb-4">Returns</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <p className="text-sm">1 Year</p>
                    <p className="text-sm font-medium text-green-600">{fundData.returns['1Y']}</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-teal-600 h-2 rounded-full" 
                      style={{ width: '65%' }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <p className="text-sm">3 Years</p>
                    <p className="text-sm font-medium text-green-600">{fundData.returns['3Y']}</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-teal-600 h-2 rounded-full" 
                      style={{ width: '50%' }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <p className="text-sm">5 Years</p>
                    <p className="text-sm font-medium text-green-600">{fundData.returns['5Y']}</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-teal-600 h-2 rounded-full" 
                      style={{ width: '45%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Returns comparison */}
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-4">Returns vs Benchmark</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">1 Year Fund Return</p>
                    <p className="text-base font-medium text-green-600">{fundData.returns['1Y']}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">1 Year Benchmark</p>
                    <p className="text-base font-medium">+58.3%</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">3 Year Fund Return</p>
                    <p className="text-base font-medium text-green-600">{fundData.returns['3Y']}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">3 Year Benchmark</p>
                    <p className="text-base font-medium">+45.7%</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">5 Year Fund Return</p>
                    <p className="text-base font-medium text-green-600">{fundData.returns['5Y']}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">5 Year Benchmark</p>
                    <p className="text-base font-medium">+40.1%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 grid grid-cols-2 gap-4">
        <Button variant="outline" className="border border-teal-600 text-teal-700 bg-white hover:bg-teal-50">
          One Time
        </Button>
        <Button className="bg-teal-600 text-white hover:bg-teal-700">
          Start SIP
        </Button>
      </div>
    </div>
  );
};

export default MutualFundDetail;
