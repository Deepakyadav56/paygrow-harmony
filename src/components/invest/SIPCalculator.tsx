
import React, { useState, useEffect } from 'react';
import { Calculator, ArrowRight, HelpCircle, PiggyBank } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface CalculatorResult {
  investedAmount: number;
  estimatedReturns: number;
  totalValue: number;
  wealthGain: number;
}

// Default colors for charts
const COLORS = ['#2a7f90', '#46b7c4', '#84d5dc'];

const SIPCalculator: React.FC = () => {
  const [calculatorType, setCalculatorType] = useState<'sip' | 'lumpsum'>('sip');
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
  const [lumpSumAmount, setLumpSumAmount] = useState<number>(100000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [timePeriod, setTimePeriod] = useState<number>(10);
  const [result, setResult] = useState<CalculatorResult>({
    investedAmount: 0,
    estimatedReturns: 0,
    totalValue: 0,
    wealthGain: 0,
  });

  // Calculate SIP returns using formula: M × {[(1 + r)^n - 1] / r} × (1 + r)
  // Where: M = Monthly investment, r = Monthly rate (annual rate/12/100), n = Time period in months
  const calculateSIP = () => {
    const principal = monthlyInvestment * 12 * timePeriod;
    const monthlyRate = expectedReturn / 12 / 100;
    const months = timePeriod * 12;
    const amount =
      monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    
    return {
      investedAmount: principal,
      estimatedReturns: Math.round(amount - principal),
      totalValue: Math.round(amount),
      wealthGain: parseFloat(((amount / principal) * 100 - 100).toFixed(2)),
    };
  };

  // Calculate lump sum returns using formula: P(1+r)^n
  // Where: P = Principal, r = Rate of return/100, n = Time period in years
  const calculateLumpSum = () => {
    const principal = lumpSumAmount;
    const rate = expectedReturn / 100;
    const amount = principal * Math.pow(1 + rate, timePeriod);
    
    return {
      investedAmount: principal,
      estimatedReturns: Math.round(amount - principal),
      totalValue: Math.round(amount),
      wealthGain: parseFloat(((amount / principal) * 100 - 100).toFixed(2)),
    };
  };

  useEffect(() => {
    if (calculatorType === 'sip') {
      setResult(calculateSIP());
    } else {
      setResult(calculateLumpSum());
    }
  }, [calculatorType, monthlyInvestment, lumpSumAmount, expectedReturn, timePeriod]);

  const handleMonthlyInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value.replace(/,/g, '')) || 0;
    setMonthlyInvestment(Math.max(500, Math.min(value, 1000000)));
  };

  const handleLumpSumAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value.replace(/,/g, '')) || 0;
    setLumpSumAmount(Math.max(1000, Math.min(value, 10000000)));
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Data for the pie chart
  const pieData = [
    { name: 'Invested Amount', value: result.investedAmount },
    { name: 'Estimated Returns', value: result.estimatedReturns },
  ];

  return (
    <Card className="p-5 border border-fountain-blue-100 shadow-md rounded-xl bg-white">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center">
          <Calculator className="text-fountain-blue-500 mr-2 h-5 w-5" />
          <h3 className="text-lg font-medium text-gray-800">SIP Calculator</h3>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <HelpCircle className="h-4 w-4 text-gray-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="w-64 p-3">
              <p className="text-xs">
                This calculator helps you estimate the future value of your investments based on regular 
                monthly contributions (SIP) or a one-time investment (Lump Sum).
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Tabs 
        value={calculatorType} 
        onValueChange={(value) => setCalculatorType(value as 'sip' | 'lumpsum')}
        className="mb-4"
      >
        <TabsList className="grid grid-cols-2 mb-5">
          <TabsTrigger value="sip" className="data-[state=active]:bg-fountain-blue-500 data-[state=active]:text-white">
            SIP Investment
          </TabsTrigger>
          <TabsTrigger value="lumpsum" className="data-[state=active]:bg-fountain-blue-500 data-[state=active]:text-white">
            Lump Sum
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sip" className="mt-0 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <Label htmlFor="monthlyAmount" className="text-sm">
                Monthly Investment (₹)
              </Label>
              <span className="text-xs text-gray-500">₹500 - ₹10,00,000</span>
            </div>
            <div className="flex items-center gap-3">
              <Input
                id="monthlyAmount"
                type="text"
                value={formatCurrency(monthlyInvestment)}
                onChange={handleMonthlyInvestmentChange}
                className="border-fountain-blue-200"
              />
              <div className="flex">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-l-md rounded-r-none border-r-0 border-fountain-blue-200"
                  onClick={() => setMonthlyInvestment(prev => Math.max(500, prev - 500))}
                  disabled={monthlyInvestment <= 500}
                >
                  -
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-r-md rounded-l-none border-fountain-blue-200"
                  onClick={() => setMonthlyInvestment(prev => Math.min(1000000, prev + 500))}
                  disabled={monthlyInvestment >= 1000000}
                >
                  +
                </Button>
              </div>
            </div>
            <Slider
              value={[monthlyInvestment]}
              min={500}
              max={1000000}
              step={500}
              onValueChange={(value) => setMonthlyInvestment(value[0])}
              className="my-2"
            />
          </div>
        </TabsContent>

        <TabsContent value="lumpsum" className="mt-0 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <Label htmlFor="lumpSumAmount" className="text-sm">
                Investment Amount (₹)
              </Label>
              <span className="text-xs text-gray-500">₹1,000 - ₹1,00,00,000</span>
            </div>
            <div className="flex items-center gap-3">
              <Input
                id="lumpSumAmount"
                type="text"
                value={formatCurrency(lumpSumAmount)}
                onChange={handleLumpSumAmountChange}
                className="border-fountain-blue-200"
              />
              <div className="flex">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-l-md rounded-r-none border-r-0 border-fountain-blue-200"
                  onClick={() => setLumpSumAmount(prev => Math.max(1000, prev - 5000))}
                  disabled={lumpSumAmount <= 1000}
                >
                  -
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-r-md rounded-l-none border-fountain-blue-200"
                  onClick={() => setLumpSumAmount(prev => Math.min(10000000, prev + 5000))}
                  disabled={lumpSumAmount >= 10000000}
                >
                  +
                </Button>
              </div>
            </div>
            <Slider
              value={[lumpSumAmount]}
              min={1000}
              max={10000000}
              step={1000}
              onValueChange={(value) => setLumpSumAmount(value[0])}
              className="my-2"
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <Label htmlFor="expectedReturn" className="text-sm">
              Expected Annual Return (%)
            </Label>
            <span className="text-xs text-gray-500">1% - 30%</span>
          </div>
          <div className="flex items-center">
            <Input
              id="expectedReturn"
              type="number"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Math.max(1, Math.min(30, Number(e.target.value))))}
              className="border-fountain-blue-200"
            />
            <span className="ml-2">%</span>
          </div>
          <Slider
            value={[expectedReturn]}
            min={1}
            max={30}
            step={0.5}
            onValueChange={(value) => setExpectedReturn(value[0])}
            className="my-2"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <Label htmlFor="timePeriod" className="text-sm">
              Time Period (Years)
            </Label>
            <span className="text-xs text-gray-500">1 - 30 years</span>
          </div>
          <div className="flex items-center">
            <Input
              id="timePeriod"
              type="number"
              value={timePeriod}
              onChange={(e) => setTimePeriod(Math.max(1, Math.min(30, Number(e.target.value))))}
              className="border-fountain-blue-200"
            />
            <span className="ml-2">Years</span>
          </div>
          <Slider
            value={[timePeriod]}
            min={1}
            max={30}
            step={1}
            onValueChange={(value) => setTimePeriod(value[0])}
            className="my-2"
          />
        </div>
      </div>

      <div className="mt-8 bg-fountain-blue-50 p-4 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-700 flex items-center">
              <PiggyBank className="h-4 w-4 mr-2 text-fountain-blue-500" />
              Investment Summary
            </h4>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 mb-0.5">Total Amount Invested</p>
                <p className="text-2xl font-bold text-gray-900">₹{formatCurrency(result.investedAmount)}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-0.5">Estimated Returns</p>
                <p className="text-2xl font-bold text-fountain-blue-600">
                  ₹{formatCurrency(result.estimatedReturns)}
                </p>
              </div>
              
              <div className={cn(
                "p-3 rounded-lg", 
                "bg-gradient-to-r from-fountain-blue-500 to-fountain-blue-600 text-white"
              )}>
                <p className="text-sm opacity-80 mb-0.5">Total Value</p>
                <div className="flex items-baseline">
                  <p className="text-2xl font-bold">₹{formatCurrency(result.totalValue)}</p>
                  <p className="text-sm ml-2">({result.wealthGain}% gain)</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                  label={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value, entry, index) => (
                    <span style={{ color: '#333', fontSize: '12px' }}>{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Button 
          className="bg-gradient-to-r from-fountain-blue-500 to-fountain-blue-600 hover:from-fountain-blue-600 hover:to-fountain-blue-700 rounded-full px-8"
          asChild
        >
          <Link to="/invest/sip-setup">
            Start Investing Now <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="mt-5 pt-4 border-t border-gray-200 text-xs text-gray-500">
        <p>The calculator is for illustrative purposes only. Actual returns may vary based on market conditions.</p>
      </div>
    </Card>
  );
};

export default SIPCalculator;
