
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Bookmark, Home, Info } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import FundInfoModal from '@/components/invest/FundInfoModal';

// Mock data for the specific mutual fund
const fundDetails = {
  id: 1,
  name: 'HDFC Small Cap',
  category: 'Small Cap',
  description: 'An open-ended equity scheme predominantly investing in small cap stocks.',
  riskLevel: 'Low Risk',
  riskColor: 'bg-green-100 text-green-800',
  nav: 120.5,
  navDate: '01 Apr 2025',
  dayChangePercent: 1.25,
  aum: '225.50 Cr',
  expenseRatio: '0.93%',
  minSIP: '100',
  minOneTime: '100',
  exitLoad: '1.0%',
  fundPlan: 'Growth',
  lockIn: 'No Lock-in',
  launchDate: '28 Jan 2013',
  benchmark: 'Nifty Small Cap 100 TRI',
  rating: 5,
  returns: {
    threeYear: 20.36,
  },
  chartData: [
    { date: 'Jan', value: 98.2 },
    { date: 'Feb', value: 92.1 },
    { date: 'Mar', value: 95.5 },
    { date: 'Apr', value: 105.0 },
    { date: 'May', value: 102.3 },
    { date: 'Jun', value: 110.8 },
    { date: 'Jul', value: 112.4 },
    { date: 'Aug', value: 115.5 },
    { date: 'Sep', value: 116.8 },
    { date: 'Oct', value: 118.2 },
    { date: 'Nov', value: 117.1 },
    { date: 'Dec', value: 120.5 },
  ],
  fundAllocation: [
    { name: 'Equity', value: 60.5, color: '#8884d8' },
    { name: 'Debt', value: 17.3, color: '#ff8042' },
    { name: 'Cash', value: 22.2, color: '#00C5CD' },
  ],
  sectorAllocation: [
    { name: 'Financial Services', value: 15.8, color: '#0088FE' },
    { name: 'IT', value: 18.2, color: '#00C49F' },
    { name: 'Oil & Gas', value: 12.4, color: '#FFBB28' },
    { name: 'Consumer Goods', value: 9.7, color: '#FF8042' },
    { name: 'Automobile', value: 8.3, color: '#A569BD' },
    { name: 'Others', value: 15.8, color: '#839192' },
  ],
  topHoldings: [
    { name: 'Larsen & Turbo', category: 'Infrastructure Development', percentage: 10.93 },
    { name: 'Adani Ports', category: 'Marine Ports & Services', percentage: 10.93 },
    { name: 'ICICI Banks', category: 'Banks', percentage: 10.93 },
    { name: 'NTPC', category: 'Power Generation & Distribution', percentage: 10.93 },
    { name: 'HDFC Bank', category: 'Banks', percentage: 10.93 },
  ]
};

const timeFrames = [
  { id: '1M', label: '1M' },
  { id: '6M', label: '6M' },
  { id: '1Y', label: '1Y' },
  { id: '3Y', label: '3Y', active: true },
  { id: '5Y', label: '5Y' },
  { id: 'All', label: 'All' },
];

const MutualFundDetailScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [activeTimeFrame, setActiveTimeFrame] = useState('3Y');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showInfoModal, setShowInfoModal] = useState(false);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: isWishlisted ? "Fund removed from your wishlist" : "Fund added to your wishlist",
    });
  };
  
  const handleOneTimeInvestment = () => {
    toast({
      title: "One-time investment",
      description: "Proceeding with one-time investment",
    });
    // Navigate to payment page
  };
  
  const handleStartSIP = () => {
    toast({
      title: "Start SIP",
      description: "Proceeding to set up SIP",
    });
    // Navigate to SIP setup page
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#00B5C8] flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-white text-lg">Loading fund details...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-[#00B5C8] text-white pt-10 pb-4 px-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate(-1)} className="p-1">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold">Mutual Fund Info</h1>
          <button onClick={() => navigate('/')}>
            <Home className="h-6 w-6" />
          </button>
        </div>
        
        {/* Fund Info Card */}
        <Card className="bg-[#00B5C8] text-white border-t border-white/20 pt-4">
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-3">
                <img src="/lovable-uploads/3cada487-7916-4161-a148-a5f61f3e7999.png" alt="HDFC Logo" className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold">{fundDetails.name}</h2>
            </div>
            <button onClick={handleWishlist}>
              <Bookmark className={`h-6 w-6 ${isWishlisted ? 'fill-white' : ''}`} />
            </button>
          </div>
          
          <div className="flex items-center space-x-2 mt-4 px-4">
            <Badge className="bg-white/20 text-white border-none">{fundDetails.category}</Badge>
            <Badge className="bg-green-400/30 text-white border-none">{fundDetails.riskLevel}</Badge>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400">★</span>
              ))}
            </div>
          </div>
          
          <div className="mt-6 px-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-white/80">Current NAV</p>
                <div className="flex items-baseline">
                  <p className="text-2xl font-bold">₹{fundDetails.nav}</p>
                  <p className="text-xs ml-2">({fundDetails.navDate})</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-white/80">1 Day Change</p>
                <div className="bg-green-400/20 text-white px-3 py-1 rounded-full text-sm flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
                  +{fundDetails.dayChangePercent}%
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Chart Section */}
      <div className="p-4">
        <Card className="p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">NAV Chart</h3>
            <Badge className="bg-green-100 text-green-800 font-medium">
              +{fundDetails.returns.threeYear}%
            </Badge>
          </div>
          
          <div className="text-right text-xs text-gray-500 mb-1">
            NAV: ₹{fundDetails.nav} | 23 Apr 25
          </div>
          
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={fundDetails.chartData}
                margin={{
                  top: 5,
                  right: 5,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="date" tick={{fontSize: 10}} />
                <YAxis domain={['auto', 'auto']} tick={{fontSize: 10}} />
                <Tooltip formatter={(value) => [`₹${value}`, 'NAV']} />
                <Area type="monotone" dataKey="value" stroke="#00B5C8" fill="#00B5C8" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          {/* Time Frame Selector */}
          <div className="flex justify-between mt-4">
            {timeFrames.map((frame) => (
              <button
                key={frame.id}
                className={`px-4 py-1 rounded-full text-sm ${
                  activeTimeFrame === frame.id 
                  ? 'bg-[#00B5C8] text-white' 
                  : 'text-gray-600'
                }`}
                onClick={() => setActiveTimeFrame(frame.id)}
              >
                {frame.label}
              </button>
            ))}
          </div>
        </Card>
      </div>
      
      {/* Tabs */}
      <div className="px-2">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 bg-transparent">
            <TabsTrigger 
              value="overview" 
              className={`data-[state=active]:border-b-2 data-[state=active]:border-[#00B5C8] data-[state=active]:text-[#00B5C8] rounded-none font-medium py-3 ${activeTab === 'overview' ? 'border-b-2 border-[#00B5C8] text-[#00B5C8]' : 'text-gray-500'}`}
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="holdings" 
              className={`data-[state=active]:border-b-2 data-[state=active]:border-[#00B5C8] data-[state=active]:text-[#00B5C8] rounded-none font-medium py-3 ${activeTab === 'holdings' ? 'border-b-2 border-[#00B5C8] text-[#00B5C8]' : 'text-gray-500'}`}
            >
              Holdings
            </TabsTrigger>
            <TabsTrigger 
              value="returns" 
              className={`data-[state=active]:border-b-2 data-[state=active]:border-[#00B5C8] data-[state=active]:text-[#00B5C8] rounded-none font-medium py-3 ${activeTab === 'returns' ? 'border-b-2 border-[#00B5C8] text-[#00B5C8]' : 'text-gray-500'}`}
            >
              Returns
            </TabsTrigger>
          </TabsList>
          
          {/* Overview Tab Content */}
          <TabsContent value="overview" className="p-0 mt-4">
            <Card className="p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-lg">Funds Overview</h3>
                <button onClick={() => setShowInfoModal(true)}>
                  <Info className="h-5 w-5 text-[#00B5C8]" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-y-6">
                <div>
                  <p className="text-gray-600 text-sm">Min SIP</p>
                  <p className="font-semibold">₹{fundDetails.minSIP}</p>
                </div>
                
                <div>
                  <p className="text-gray-600 text-sm">Min One-Time</p>
                  <p className="font-semibold">₹{fundDetails.minOneTime}</p>
                </div>
                
                <div>
                  <p className="text-gray-600 text-sm">Expense Ratio</p>
                  <p className="font-semibold">{fundDetails.expenseRatio}</p>
                </div>
                
                <div>
                  <p className="text-gray-600 text-sm">Fund Size</p>
                  <p className="font-semibold">₹{fundDetails.aum}</p>
                </div>
                
                <div>
                  <p className="text-gray-600 text-sm">Fund Plan</p>
                  <p className="font-semibold">{fundDetails.fundPlan}</p>
                </div>
                
                <div>
                  <p className="text-gray-600 text-sm">AUM</p>
                  <p className="font-semibold">₹{fundDetails.aum}</p>
                </div>
                
                <div>
                  <p className="text-gray-600 text-sm">Exit Load</p>
                  <p className="font-semibold">{fundDetails.exitLoad}</p>
                </div>
                
                <div>
                  <p className="text-gray-600 text-sm">Lock In</p>
                  <p className="font-semibold">{fundDetails.lockIn}</p>
                </div>
              </div>
            </Card>
            
            {/* Scheme Document */}
            <Card className="p-4 rounded-lg mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-[#00B5C8]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                    <path d="M14 3V7C14 7.26522 14.1054 7.51957 14.2929 7.70711C14.4804 7.89464 14.7348 8 15 8H19M14 3H7C6.46957 3 5.96086 3.21071 5.58579 3.58579C5.21071 3.96086 5 4.46957 5 5V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V8M14 3L19 8" stroke="#00B5C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-[#00B5C8] font-medium">View Scheme Document</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </Card>
          </TabsContent>
          
          {/* Holdings Tab Content */}
          <TabsContent value="holdings" className="p-0 mt-4">
            <Card className="p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-lg mb-4">Fund Allocation</h3>
              
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={fundDetails.fundAllocation}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {fundDetails.fundAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mt-4">
                {fundDetails.fundAllocation.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <div>
                      <p className="text-sm text-gray-600">{item.name}</p>
                      <p className="font-medium">{item.value}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            
            <Card className="p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-lg mb-4">Sector Allocation</h3>
              
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={fundDetails.sectorAllocation}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {fundDetails.sectorAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-4">
                {fundDetails.sectorAllocation.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <div>
                      <p className="text-sm text-gray-600">{item.name}</p>
                      <p className="font-medium">{item.value}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            
            <Card className="p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-lg mb-4">Holdings</h3>
              
              <div className="space-y-4">
                {fundDetails.topHoldings.map((holding, index) => (
                  <div key={index} className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#00B5C8]/10 rounded-full flex items-center justify-center mr-3">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" stroke="#00B5C8" strokeWidth="1.5"/>
                          <path d="M7 12L10 15L17 8" stroke="#00B5C8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">{holding.name}</h4>
                        <p className="text-xs text-gray-500">{holding.category}</p>
                      </div>
                    </div>
                    <p className="font-medium">{holding.percentage}%</p>
                  </div>
                ))}
                
                <div className="text-center mt-4">
                  <Button variant="outline" className="text-[#00B5C8] border-[#00B5C8]">
                    View More
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          {/* Returns Tab Content */}
          <TabsContent value="returns" className="p-0 mt-4">
            <Card className="p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-lg mb-4">Returns Comparison</h3>
              
              <div className="space-y-4">
                {/* Returns comparison content would go here */}
                <p className="text-gray-600">Returns data to be implemented</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Bottom Action Buttons */}
      <div className="mt-auto grid grid-cols-2 gap-4 p-4 bg-white border-t border-gray-200">
        <Button 
          variant="outline" 
          className="h-12 rounded-lg text-[#00B5C8] border-[#00B5C8]"
          onClick={handleOneTimeInvestment}
        >
          One Time
        </Button>
        <Button 
          className="h-12 rounded-lg bg-[#00B5C8] hover:bg-[#00a0b1]"
          onClick={handleStartSIP}
        >
          Start SIP
        </Button>
      </div>
      
      {/* Information Modal */}
      <FundInfoModal open={showInfoModal} onOpenChange={setShowInfoModal} />
    </div>
  );
};

// Add missing ChevronRight component
const ChevronRight = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default MutualFundDetailScreen;
