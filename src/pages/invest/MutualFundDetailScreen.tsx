
import React, { useState } from 'react';
import { ArrowLeft, Info, LineChart, TrendingUp, Calendar, Download, BarChart } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';

// Mock data for the specific mutual fund
const fundDetails = {
  id: 1,
  name: 'Axis Bluechip Fund',
  category: 'Large Cap',
  description: 'An open-ended equity scheme predominantly investing in large cap stocks.',
  riskLevel: 'Moderate',
  nav: 45.67,
  aum: '23,458 Cr',
  expenseRatio: '1.8%',
  minInvestment: '500',
  exitLoad: '1% for redemption within 1 year',
  fundManager: 'Shreyash Devalkar',
  launchDate: '28 Jan 2013',
  returns: {
    oneMonth: 2.4,
    threeMonth: 5.7,
    sixMonth: 8.3,
    oneYear: 12.5,
    threeYear: 15.8,
    fiveYear: 14.2,
  },
  holdingTypes: [
    { type: 'Equity', percentage: 97.5 },
    { type: 'Debt', percentage: 1.2 },
    { type: 'Cash & Others', percentage: 1.3 },
  ],
  topHoldings: [
    { name: 'HDFC Bank', percentage: 9.8 },
    { name: 'ICICI Bank', percentage: 8.7 },
    { name: 'TCS', percentage: 7.5 },
    { name: 'Reliance Industries', percentage: 7.2 },
    { name: 'Infosys', percentage: 6.8 },
  ],
};

const MutualFundDetailScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  // In a real app, you'd fetch the fund details based on the ID
  // For this example, we'll use the mock data
  
  return (
    <div className="min-h-screen flex flex-col pb-16">
      {/* Header */}
      <div className="bg-paygrow-green text-white pt-12 pb-6 px-4 flex items-center">
        <Link to="/invest/mutual-funds" className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold">{fundDetails.name}</h1>
          <p className="text-white/80">{fundDetails.category} • {fundDetails.riskLevel} Risk</p>
        </div>
        <Info className="w-6 h-6" />
      </div>
      
      {/* Fund Performance Overview */}
      <div className="p-4 bg-white border-b">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-gray-500 text-sm">Current NAV</p>
            <p className="text-xl font-bold">₹{fundDetails.nav}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-sm">AUM</p>
            <p className="text-lg font-medium">₹{fundDetails.aum}</p>
          </div>
        </div>
        
        <div className="flex space-x-4 overflow-x-auto pb-2 mb-4">
          <Card className="p-3 min-w-[120px]">
            <p className="text-xs text-gray-500">1M Returns</p>
            <p className={`text-lg font-medium ${fundDetails.returns.oneMonth > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {fundDetails.returns.oneMonth > 0 ? '+' : ''}{fundDetails.returns.oneMonth}%
            </p>
          </Card>
          
          <Card className="p-3 min-w-[120px]">
            <p className="text-xs text-gray-500">1Y Returns</p>
            <p className={`text-lg font-medium ${fundDetails.returns.oneYear > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {fundDetails.returns.oneYear > 0 ? '+' : ''}{fundDetails.returns.oneYear}%
            </p>
          </Card>
          
          <Card className="p-3 min-w-[120px]">
            <p className="text-xs text-gray-500">3Y Returns</p>
            <p className={`text-lg font-medium ${fundDetails.returns.threeYear > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {fundDetails.returns.threeYear > 0 ? '+' : ''}{fundDetails.returns.threeYear}%
            </p>
          </Card>
        </div>
      </div>
      
      {/* Fund Details Tabs */}
      <div className="flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="returns">Returns</TabsTrigger>
            <TabsTrigger value="holdings">Holdings</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="p-4">
            <Card className="p-4 mb-4">
              <h3 className="font-medium mb-2">About the Fund</h3>
              <p className="text-sm text-gray-600 mb-4">{fundDetails.description}</p>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Expense Ratio</span>
                  <span className="text-sm font-medium">{fundDetails.expenseRatio}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Minimum Investment</span>
                  <span className="text-sm font-medium">₹{fundDetails.minInvestment}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Exit Load</span>
                  <span className="text-sm font-medium">{fundDetails.exitLoad}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Fund Manager</span>
                  <span className="text-sm font-medium">{fundDetails.fundManager}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Launch Date</span>
                  <span className="text-sm font-medium">{fundDetails.launchDate}</span>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <h3 className="font-medium mb-3">Performance Comparison (3 Years)</h3>
              <div className="h-48 flex items-center justify-center bg-gray-100 rounded mb-3">
                <LineChart className="h-10 w-10 text-gray-400" />
                <span className="text-sm text-gray-500 ml-2">Chart placeholder</span>
              </div>
              
              <div className="flex space-x-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-paygrow-green mr-1"></div>
                  <span className="text-xs">Fund: +15.8%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-gray-400 mr-1"></div>
                  <span className="text-xs">Category: +13.2%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-400 mr-1"></div>
                  <span className="text-xs">Nifty 50: +12.5%</span>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          {/* Returns Tab */}
          <TabsContent value="returns" className="p-4">
            <Card className="p-4 mb-4">
              <h3 className="font-medium mb-3">Returns</h3>
              <div className="space-y-4">
                {Object.entries(fundDetails.returns).map(([period, value]) => (
                  <div key={period} className="flex justify-between items-center">
                    <span className="text-sm">
                      {period === 'oneMonth' && '1 Month'}
                      {period === 'threeMonth' && '3 Months'}
                      {period === 'sixMonth' && '6 Months'}
                      {period === 'oneYear' && '1 Year'}
                      {period === 'threeYear' && '3 Years'}
                      {period === 'fiveYear' && '5 Years'}
                    </span>
                    <div className="flex items-center">
                      <TrendingUp className={`h-4 w-4 mr-2 ${value > 0 ? 'text-green-500' : 'text-red-500'}`} />
                      <span className={`font-medium ${value > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {value > 0 ? '+' : ''}{value}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            
            <Card className="p-4">
              <h3 className="font-medium mb-3">Historical Returns</h3>
              <div className="h-48 flex items-center justify-center bg-gray-100 rounded">
                <BarChart className="h-10 w-10 text-gray-400" />
                <span className="text-sm text-gray-500 ml-2">Chart placeholder</span>
              </div>
            </Card>
          </TabsContent>
          
          {/* Holdings Tab */}
          <TabsContent value="holdings" className="p-4">
            <Card className="p-4 mb-4">
              <h3 className="font-medium mb-3">Asset Allocation</h3>
              <div className="mb-4">
                {fundDetails.holdingTypes.map((holding, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">{holding.type}</span>
                      <span className="text-sm font-medium">{holding.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`rounded-full h-2 ${
                          index === 0 ? 'bg-paygrow-green' : 
                          index === 1 ? 'bg-blue-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${holding.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <h3 className="font-medium mb-3">Top Holdings</h3>
              <div className="space-y-3">
                {fundDetails.topHoldings.map((holding, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-sm">{holding.name}</span>
                    <span className="text-sm font-medium">{holding.percentage}%</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
          
          {/* Documents Tab */}
          <TabsContent value="documents" className="p-4">
            <Card className="divide-y">
              <div className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Scheme Information Document</h3>
                  <p className="text-xs text-gray-500">Updated: June 2025</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Key Information Memorandum</h3>
                  <p className="text-xs text-gray-500">Updated: May 2025</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Factsheet</h3>
                  <p className="text-xs text-gray-500">Updated: July 2025</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Invest Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex space-x-4">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => navigate(`/invest/sip-setup/${id}`)}
        >
          <Calendar className="h-5 w-5 mr-2" />
          Start SIP
        </Button>
        <Button 
          className="flex-1 bg-paygrow-green"
          onClick={() => navigate(`/invest/sip-setup/${id}?type=onetime`)}
        >
          One-time Investment
        </Button>
      </div>
    </div>
  );
};

export default MutualFundDetailScreen;
