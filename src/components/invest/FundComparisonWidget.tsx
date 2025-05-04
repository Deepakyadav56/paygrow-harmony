
import React, { useState } from 'react';
import { 
  BarChart4, 
  TrendingUp, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight,
  Info,
  X,
  Plus
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Fund {
  id: number;
  name: string;
  category: string;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Very High';
  aum: string;
  expenseRatio: string;
  returns: {
    oneYear: number;
    threeYear: number;
    fiveYear: number;
  };
  nav: number;
}

// Mock data for comparison
const availableFunds: Fund[] = [
  {
    id: 1,
    name: 'Axis Bluechip Fund',
    category: 'Large Cap',
    riskLevel: 'Moderate',
    aum: '23,458 Cr',
    expenseRatio: '1.8%',
    returns: {
      oneYear: 12.5,
      threeYear: 15.8,
      fiveYear: 14.2,
    },
    nav: 45.67,
  },
  {
    id: 2,
    name: 'HDFC Mid-Cap Opportunities',
    category: 'Mid Cap',
    riskLevel: 'High',
    aum: '31,267 Cr',
    expenseRatio: '1.95%',
    returns: {
      oneYear: 18.2,
      threeYear: 16.9,
      fiveYear: 15.7,
    },
    nav: 78.34,
  },
  {
    id: 3,
    name: 'SBI Small Cap Fund',
    category: 'Small Cap',
    riskLevel: 'Very High',
    aum: '15,823 Cr',
    expenseRatio: '2.1%',
    returns: {
      oneYear: 22.7,
      threeYear: 19.5,
      fiveYear: 18.2,
    },
    nav: 112.45,
  },
  {
    id: 4,
    name: 'ICICI Prudential Value Discovery',
    category: 'Value',
    riskLevel: 'Moderate',
    aum: '27,912 Cr',
    expenseRatio: '1.85%',
    returns: {
      oneYear: 15.3,
      threeYear: 14.7,
      fiveYear: 13.8,
    },
    nav: 56.78,
  },
  {
    id: 5,
    name: 'Aditya Birla Sun Life Tax Relief 96',
    category: 'ELSS',
    riskLevel: 'Moderate',
    aum: '14,823 Cr',
    expenseRatio: '1.7%',
    returns: {
      oneYear: 13.6,
      threeYear: 14.2,
      fiveYear: 12.9,
    },
    nav: 42.56,
  },
  {
    id: 6,
    name: 'Kotak Bluechip Fund',
    category: 'Large Cap',
    riskLevel: 'Moderate',
    aum: '18,756 Cr',
    expenseRatio: '1.65%',
    returns: {
      oneYear: 11.8,
      threeYear: 14.5,
      fiveYear: 13.7,
    },
    nav: 38.92,
  },
];

const FundComparisonWidget: React.FC = () => {
  const [selectedFunds, setSelectedFunds] = useState<Fund[]>([availableFunds[0], availableFunds[1]]);
  const [timeframe, setTimeframe] = useState<'oneYear' | 'threeYear' | 'fiveYear'>('oneYear');
  const [showAddFund, setShowAddFund] = useState(false);

  const handleAddFund = (fundId: string) => {
    if (selectedFunds.length < 3) {
      const fundToAdd = availableFunds.find(f => f.id === parseInt(fundId));
      if (fundToAdd && !selectedFunds.some(f => f.id === fundToAdd.id)) {
        setSelectedFunds([...selectedFunds, fundToAdd]);
      }
    }
    setShowAddFund(false);
  };

  const handleRemoveFund = (fundId: number) => {
    if (selectedFunds.length > 1) {
      setSelectedFunds(selectedFunds.filter(f => f.id !== fundId));
    }
  };

  const getBestFund = (metric: 'oneYear' | 'threeYear' | 'fiveYear' | 'expenseRatio'): number => {
    if (metric === 'expenseRatio') {
      return Math.min(...selectedFunds.map(fund => parseFloat(fund.expenseRatio)));
    } else {
      return Math.max(...selectedFunds.map(fund => fund.returns[metric]));
    }
  };

  const formatTimeframe = (timeframe: string): string => {
    switch(timeframe) {
      case 'oneYear': return '1 Year';
      case 'threeYear': return '3 Years';
      case 'fiveYear': return '5 Years';
      default: return timeframe;
    }
  };

  return (
    <Card className="p-5 border border-fountain-blue-100 shadow-md rounded-xl bg-white">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center">
          <BarChart4 className="text-fountain-blue-500 mr-2 h-5 w-5" />
          <h3 className="text-lg font-medium text-gray-800">Fund Comparison</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeframe} onValueChange={(value) => setTimeframe(value as any)}>
            <SelectTrigger className="w-[120px] border-fountain-blue-100">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="oneYear">1 Year</SelectItem>
              <SelectItem value="threeYear">3 Years</SelectItem>
              <SelectItem value="fiveYear">5 Years</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Funds Table */}
      <Table>
        <TableHeader>
          <TableRow className="bg-fountain-blue-50">
            <TableHead className="w-[250px]">Fund Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Risk</TableHead>
            <TableHead className="text-right">NAV</TableHead>
            <TableHead className="text-right">Returns</TableHead>
            <TableHead className="text-right">Expense</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedFunds.map((fund) => {
            const isTopPerformer = fund.returns[timeframe] === getBestFund(timeframe);
            const isLowestExpense = parseFloat(fund.expenseRatio) === getBestFund('expenseRatio');
            
            return (
              <TableRow key={fund.id} className="hover:bg-fountain-blue-50/30">
                <TableCell className="font-medium">{fund.name}</TableCell>
                <TableCell>{fund.category}</TableCell>
                <TableCell>
                  <Badge className={`
                    ${fund.riskLevel === 'Low' ? 'bg-green-100 text-green-800' : 
                      fund.riskLevel === 'Moderate' ? 'bg-blue-100 text-blue-800' : 
                      fund.riskLevel === 'High' ? 'bg-orange-100 text-orange-800' : 
                      'bg-red-100 text-red-800'}
                  `}>
                    {fund.riskLevel}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">₹{fund.nav}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end">
                    <span className={`flex items-center ${fund.returns[timeframe] > 0 ? 'text-green-600' : 'text-red-600'} font-medium`}>
                      {fund.returns[timeframe] > 0 ? 
                        <ArrowUpRight className="h-3 w-3 mr-0.5" /> : 
                        <ArrowDownRight className="h-3 w-3 mr-0.5" />
                      }
                      {fund.returns[timeframe]}%
                    </span>
                    {isTopPerformer && (
                      <Badge className="ml-2 text-xs bg-green-100 text-green-800 px-1">Best</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end">
                    <span>{fund.expenseRatio}</span>
                    {isLowestExpense && (
                      <Badge className="ml-2 text-xs bg-blue-100 text-blue-800 px-1">Lowest</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {selectedFunds.length > 1 && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-gray-500 hover:bg-red-50 hover:text-red-600"
                      onClick={() => handleRemoveFund(fund.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Add Fund Section */}
      {selectedFunds.length < 3 && !showAddFund && (
        <div className="mt-4 flex justify-center">
          <Button 
            variant="outline" 
            className="border-dashed border-fountain-blue-200 text-fountain-blue-600 hover:bg-fountain-blue-50"
            onClick={() => setShowAddFund(true)}
          >
            <Plus className="h-4 w-4 mr-2" /> Add Fund to Compare
          </Button>
        </div>
      )}

      {showAddFund && (
        <div className="mt-4 p-4 border border-fountain-blue-100 rounded-lg bg-fountain-blue-50/50">
          <h4 className="font-medium mb-3">Select a fund to compare:</h4>
          <Select onValueChange={handleAddFund}>
            <SelectTrigger className="w-full border-fountain-blue-200">
              <SelectValue placeholder="Choose a fund..." />
            </SelectTrigger>
            <SelectContent>
              {availableFunds
                .filter(fund => !selectedFunds.some(selected => selected.id === fund.id))
                .map(fund => (
                  <SelectItem key={fund.id} value={fund.id.toString()}>
                    {fund.name} ({fund.category})
                  </SelectItem>
                ))
              }
            </SelectContent>
          </Select>
          <div className="flex justify-end mt-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-500"
              onClick={() => setShowAddFund(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Performance Summary */}
      <div className="mt-6">
        <div className="flex items-center mb-3">
          <Calendar className="text-fountain-blue-500 mr-2 h-5 w-5" />
          <h3 className="font-medium text-gray-800">Performance Summary</h3>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-fountain-blue-50 p-3 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">1 Year Returns</div>
            <div className="flex items-baseline justify-between">
              <span className="text-lg font-semibold text-fountain-blue-700">
                {Math.max(...selectedFunds.map(fund => fund.returns.oneYear))}%
              </span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Best performing fund over 1 year</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className="bg-fountain-blue-50 p-3 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">3 Year Returns</div>
            <div className="flex items-baseline justify-between">
              <span className="text-lg font-semibold text-fountain-blue-700">
                {Math.max(...selectedFunds.map(fund => fund.returns.threeYear))}%
              </span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Best performing fund over 3 years</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className="bg-fountain-blue-50 p-3 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">5 Year Returns</div>
            <div className="flex items-baseline justify-between">
              <span className="text-lg font-semibold text-fountain-blue-700">
                {Math.max(...selectedFunds.map(fund => fund.returns.fiveYear))}%
              </span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Best performing fund over 5 years</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-gray-200 text-xs text-gray-500 flex items-start">
        <Info className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
        <p>Past performance is not indicative of future results. Compare funds carefully before investing.</p>
      </div>
    </Card>
  );
};

export default FundComparisonWidget;
