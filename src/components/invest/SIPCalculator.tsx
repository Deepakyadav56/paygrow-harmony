import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, InfoIcon, PiggyBank } from "lucide-react";
import { Link } from "react-router-dom";

interface SIPCalculatorProps {
  onboardingComplete: () => void;
}

const SIPCalculator: React.FC<SIPCalculatorProps> = ({ onboardingComplete }) => {
  const [investmentAmount, setInvestmentAmount] = useState(1000);
  const [timePeriod, setTimePeriod] = useState(5);
  const [expectedReturnRate, setExpectedReturnRate] = useState(12);
  const [totalInvestment, setTotalInvestment] = useState(investmentAmount * timePeriod * 12);
  const [maturityValue, setMaturityValue] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [isMonthly, setIsMonthly] = useState(true);

  useEffect(() => {
    const calculateSIP = () => {
      const monthlyReturnRate = expectedReturnRate / 1200;
      const numberOfMonths = timePeriod * 12;
      const futureValue = investmentAmount * (((1 + monthlyReturnRate) ** numberOfMonths - 1) / monthlyReturnRate) * (1 + monthlyReturnRate);
      const totalInvestedAmount = investmentAmount * numberOfMonths;
      const interestEarned = futureValue - totalInvestedAmount;

      setTotalInvestment(totalInvestedAmount);
      setMaturityValue(futureValue);
      setTotalInterest(interestEarned);
    };

    calculateSIP();
  }, [investmentAmount, timePeriod, expectedReturnRate]);

  const handleAmountChange = (value: number[]) => {
    setInvestmentAmount(value[0]);
  };

  const handlePeriodChange = (value: number[]) => {
    setTimePeriod(value[0]);
  };

  const handleReturnRateChange = (value: number[]) => {
    setExpectedReturnRate(value[0]);
  };

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <Card className="p-6 rounded-xl shadow-md border border-gray-100">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">SIP Calculator</h2>
          <p className="text-gray-500 mt-2">Plan your investments wisely.</p>
        </div>

        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="justify-center">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          <TabsContent value="calculator" className="mt-4">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="investmentAmount" className="block text-sm font-medium text-gray-700">Monthly Investment</label>
                  <span className="text-gray-500 text-sm">₹{investmentAmount}</span>
                </div>
                <Slider
                  id="investmentAmount"
                  defaultValue={[investmentAmount]}
                  max={50000}
                  step={500}
                  onValueChange={handleAmountChange}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="timePeriod" className="block text-sm font-medium text-gray-700">Investment Period (Years)</label>
                  <span className="text-gray-500 text-sm">{timePeriod} Years</span>
                </div>
                <Slider
                  id="timePeriod"
                  defaultValue={[timePeriod]}
                  max={30}
                  step={1}
                  onValueChange={handlePeriodChange}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="expectedReturnRate" className="block text-sm font-medium text-gray-700">Expected Return Rate (%)</label>
                  <span className="text-gray-500 text-sm">{expectedReturnRate}%</span>
                </div>
                <Slider
                  id="expectedReturnRate"
                  defaultValue={[expectedReturnRate]}
                  max={20}
                  step={1}
                  onValueChange={handleReturnRateChange}
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="details" className="mt-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Total Investment:</span>
                <span className="text-gray-900 font-semibold">₹{totalInvestment.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Total Interest:</span>
                <span className="text-green-600 font-semibold">₹{totalInterest.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Maturity Value:</span>
                <span className="text-blue-600 font-semibold">₹{maturityValue.toLocaleString()}</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Separator className="my-6" />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <InfoIcon className="h-4 w-4 mr-2 text-gray-400" />
            <span className="text-sm text-gray-500">Calculations are approximate.</span>
          </div>
          <Button variant="outline" className="rounded-full">
            Invest Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Card>

      <div className="mt-6 p-4 bg-fountain-blue-50 rounded-xl border border-fountain-blue-100 flex items-start">
        <PiggyBank className="h-5 w-5 text-fountain-blue-500 mr-3 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-medium text-fountain-blue-700 mb-1">Start Small, Grow Big</h4>
          <p className="text-sm text-fountain-blue-800">
            Start your investment journey with as little as ₹500 and watch your wealth grow over time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SIPCalculator;
