
import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, Info, TrendingUp, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

interface MarketIndex {
  name: string;
  value: string;
  change: number;
  previousClose?: string;
  open?: string;
  dayHigh?: string;
  dayLow?: string;
  fiftyTwoWeekHigh?: string;
  fiftyTwoWeekLow?: string;
}

interface MarketIndicatorsProps {
  indices: MarketIndex[];
}

const MarketIndicators: React.FC<MarketIndicatorsProps> = ({ indices: propIndices }) => {
  const [indices, setIndices] = useState(propIndices);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<MarketIndex | null>(null);
  const [timeframe, setTimeframe] = useState('1D');
  
  const handleIndexClick = (index: MarketIndex) => {
    setSelectedIndex(index);
    setShowDetailDialog(true);
  };
  
  // Simulate live updates
  useEffect(() => {
    const timer = setInterval(() => {
      setIndices(prev => 
        prev.map(index => ({
          ...index,
          change: index.change + (Math.random() * 0.1 - 0.05),
          value: (parseFloat(index.value.replace(/,/g, '')) + (Math.random() * 10 - 5)).toLocaleString('en-IN', {
            maximumFractionDigits: 2
          })
        }))
      );
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Add details to each index
  useEffect(() => {
    setIndices(prev => 
      prev.map(index => ({
        ...index,
        previousClose: (parseFloat(index.value.replace(/,/g, '')) - (index.change / 100 * parseFloat(index.value.replace(/,/g, '')))).toLocaleString('en-IN', {
          maximumFractionDigits: 2
        }),
        open: (parseFloat(index.value.replace(/,/g, '')) - (Math.random() * 50)).toLocaleString('en-IN', {
          maximumFractionDigits: 2
        }),
        dayHigh: (parseFloat(index.value.replace(/,/g, '')) + (Math.random() * 30)).toLocaleString('en-IN', {
          maximumFractionDigits: 2
        }),
        dayLow: (parseFloat(index.value.replace(/,/g, '')) - (Math.random() * 40)).toLocaleString('en-IN', {
          maximumFractionDigits: 2
        }),
        fiftyTwoWeekHigh: (parseFloat(index.value.replace(/,/g, '')) * 1.15).toLocaleString('en-IN', {
          maximumFractionDigits: 2
        }),
        fiftyTwoWeekLow: (parseFloat(index.value.replace(/,/g, '')) * 0.80).toLocaleString('en-IN', {
          maximumFractionDigits: 2
        }),
      }))
    );
  }, []);
  
  return (
    <>
      <div className="bg-white dark:bg-gray-900 px-4 py-2 shadow-sm overflow-x-auto whitespace-nowrap sticky top-0 z-10 border-b border-gray-100 dark:border-gray-800">
        <div className="flex space-x-8">
          {indices.map((index) => (
            <div 
              key={index.name} 
              className="flex items-center cursor-pointer transition-transform hover:scale-105"
              onClick={() => handleIndexClick(index)}
            >
              <div className="flex flex-col mr-2">
                <span className="text-xs font-medium">{index.name}</span>
                <span className="text-xs font-bold">{index.value}</span>
              </div>
              <span className={`text-xs flex items-center ${index.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {index.change >= 0 ? 
                  <ArrowUpRight className="h-3 w-3 mr-0.5" /> : 
                  <ArrowDownRight className="h-3 w-3 mr-0.5" />
                }
                {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)}%
              </span>
            </div>
          ))}
          <div className="flex items-center text-xs text-blue-600 cursor-pointer hover:underline">
            <span>More</span>
            <ChevronRight className="h-3 w-3" />
          </div>
        </div>
      </div>
      
      {/* Market Index Details Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-paygrow-blue" />
              {selectedIndex?.name} Details
            </DialogTitle>
            <DialogDescription>
              Live market data and historical performance
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold">{selectedIndex?.value}</p>
                <div className={`flex items-center text-sm ${selectedIndex?.change && selectedIndex.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedIndex?.change && selectedIndex.change >= 0 ? 
                    <ArrowUpRight className="h-4 w-4 mr-0.5" /> : 
                    <ArrowDownRight className="h-4 w-4 mr-0.5" />
                  }
                  {selectedIndex?.change && selectedIndex.change >= 0 ? '+' : ''}{selectedIndex?.change.toFixed(2)}%
                </div>
              </div>
              
              <div className="flex">
                <Button variant="outline" size="sm" className={timeframe === '1D' ? 'bg-blue-50 text-blue-600' : ''} onClick={() => setTimeframe('1D')}>1D</Button>
                <Button variant="outline" size="sm" className={timeframe === '1W' ? 'bg-blue-50 text-blue-600' : ''} onClick={() => setTimeframe('1W')}>1W</Button>
                <Button variant="outline" size="sm" className={timeframe === '1M' ? 'bg-blue-50 text-blue-600' : ''} onClick={() => setTimeframe('1M')}>1M</Button>
                <Button variant="outline" size="sm" className={timeframe === '1Y' ? 'bg-blue-50 text-blue-600' : ''} onClick={() => setTimeframe('1Y')}>1Y</Button>
              </div>
            </div>
            
            <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 text-sm">Chart visualization would go here</p>
            </div>
            
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="components">Components</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Previous Close</p>
                    <p className="font-medium">{selectedIndex?.previousClose}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Open</p>
                    <p className="font-medium">{selectedIndex?.open}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Day High</p>
                    <p className="font-medium">{selectedIndex?.dayHigh}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Day Low</p>
                    <p className="font-medium">{selectedIndex?.dayLow}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">52W High</p>
                    <p className="font-medium">{selectedIndex?.fiftyTwoWeekHigh}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">52W Low</p>
                    <p className="font-medium">{selectedIndex?.fiftyTwoWeekLow}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <p className="text-sm font-medium mb-2">About {selectedIndex?.name}</p>
                  <p className="text-xs text-gray-600">
                    {selectedIndex?.name === 'NIFTY 50' && 
                      "The NIFTY 50 index is National Stock Exchange of India's benchmark stock market index that represents the weighted average of 50 of the largest Indian companies listed on the exchange."
                    }
                    {selectedIndex?.name === 'SENSEX' && 
                      "The S&P BSE SENSEX is a free-float market-weighted stock market index of 30 well-established and financially sound companies listed on Bombay Stock Exchange."
                    }
                    {selectedIndex?.name === 'BANK NIFTY' && 
                      "The BANK NIFTY index is designed to reflect the behavior and performance of the banking sector in the Indian economy."
                    }
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="components" className="space-y-4 pt-4">
                <p className="text-sm">Top 5 constituents by weight</p>
                
                <div className="space-y-2">
                  {selectedIndex?.name === 'NIFTY 50' && (
                    <>
                      <div className="flex justify-between items-center">
                        <p className="text-sm">HDFC Bank Ltd</p>
                        <p className="text-sm font-medium">9.21%</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm">Reliance Industries</p>
                        <p className="text-sm font-medium">8.87%</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm">ICICI Bank Ltd</p>
                        <p className="text-sm font-medium">7.54%</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm">Infosys Ltd</p>
                        <p className="text-sm font-medium">6.32%</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm">TCS Ltd</p>
                        <p className="text-sm font-medium">4.88%</p>
                      </div>
                    </>
                  )}
                  
                  {selectedIndex?.name === 'SENSEX' && (
                    <>
                      <div className="flex justify-between items-center">
                        <p className="text-sm">HDFC Bank Ltd</p>
                        <p className="text-sm font-medium">10.32%</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm">Reliance Industries</p>
                        <p className="text-sm font-medium">9.76%</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm">ICICI Bank Ltd</p>
                        <p className="text-sm font-medium">8.12%</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm">Infosys Ltd</p>
                        <p className="text-sm font-medium">7.45%</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm">TCS Ltd</p>
                        <p className="text-sm font-medium">5.64%</p>
                      </div>
                    </>
                  )}
                  
                  {selectedIndex?.name === 'BANK NIFTY' && (
                    <>
                      <div className="flex justify-between items-center">
                        <p className="text-sm">HDFC Bank Ltd</p>
                        <p className="text-sm font-medium">27.45%</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm">ICICI Bank Ltd</p>
                        <p className="text-sm font-medium">22.18%</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm">Kotak Mahindra Bank</p>
                        <p className="text-sm font-medium">13.76%</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm">Axis Bank Ltd</p>
                        <p className="text-sm font-medium">11.54%</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm">SBI</p>
                        <p className="text-sm font-medium">10.32%</p>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="text-center mt-4">
                  <Button variant="outline" size="sm" className="text-blue-600">
                    View All Components
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MarketIndicators;
