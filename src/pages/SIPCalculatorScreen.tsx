import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from '@/components/ui/motion';

const SIPCalculatorScreen: React.FC = () => {
  const [investmentAmount, setInvestmentAmount] = useState<number>(1000);
  const [interestRate, setInterestRate] = useState<number>(8);
  const [timePeriod, setTimePeriod] = useState<number>(5);
  const [futureValue, setFutureValue] = useState<number>(0);
  const { theme } = useTheme();

  useEffect(() => {
    // SIP Calculation Logic
    const calculateFutureValue = () => {
      const monthlyInterestRate = interestRate / (12 * 100);
      const numberOfMonths = timePeriod * 12;
      
      // Formula for Future Value of SIP
      const fv = investmentAmount * (((1 + monthlyInterestRate) ** numberOfMonths - 1) / monthlyInterestRate) * (1 + monthlyInterestRate);
      setFutureValue(fv);
    };

    calculateFutureValue();
  }, [investmentAmount, interestRate, timePeriod]);

  const handleInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setInvestmentAmount(isNaN(value) ? 0 : value);
  };

  const handleInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setInterestRate(isNaN(value) ? 0 : value);
  };

  const handleTimePeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setTimePeriod(isNaN(value) ? 0 : value);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">SIP Calculator</CardTitle>
              <CardDescription>Plan your investments wisely.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              {/* Investment Amount */}
              <div className="grid gap-2">
                <Label htmlFor="investment">Monthly Investment</Label>
                <Input 
                  type="number" 
                  id="investment" 
                  value={investmentAmount} 
                  onChange={handleInvestmentChange} 
                  className="theme-input"
                />
              </div>

              {/* Interest Rate */}
              <div className="grid gap-2">
                <Label htmlFor="interest">Expected Interest Rate (%)</Label>
                <Input 
                  type="number" 
                  id="interest" 
                  value={interestRate} 
                  onChange={handleInterestChange} 
                  className="theme-input"
                />
              </div>

              {/* Time Period */}
              <div className="grid gap-2">
                <Label htmlFor="time">Investment Time Period (Years)</Label>
                <Input 
                  type="number" 
                  id="time" 
                  value={timePeriod} 
                  onChange={handleTimePeriodChange} 
                  className="theme-input"
                />
              </div>

              {/* Calculation Result */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold">
                  Estimated Future Value:
                </h3>
                <p className="text-2xl font-bold text-primary">
                  ₹{futureValue.toFixed(2)}
                </p>
              </div>

              {/* Example SIP Plans */}
              <div className="mt-8">
                <h4 className="text-xl font-semibold mb-4">Explore SIP Plans</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="theme-card">
                    <CardHeader>
                      <CardTitle>Aggressive Growth SIP</CardTitle>
                      <CardDescription>High risk, high return potential.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Invest in equity funds for maximum growth.
                      </p>
                      <Button variant="gradient" className="mt-4">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="theme-card">
                    <CardHeader>
                      <CardTitle>Balanced SIP</CardTitle>
                      <CardDescription>Moderate risk with stable returns.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Diversify across equity and debt funds.
                      </p>
                      <Button variant="gradient" className="mt-4">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* SIP Benefits Section */}
              <div className="mt-8">
                <h4 className="text-xl font-semibold mb-4">Benefits of SIP</h4>
                <ul className="list-disc list-inside">
                  <li>Rupee Cost Averaging</li>
                  <li>Power of Compounding</li>
                  <li>Financial Discipline</li>
                  <li>Flexibility and Affordability</li>
                </ul>
              </div>

              {/* Disclaimer */}
              <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
                <p>
                  Disclaimer: Mutual fund investments are subject to market risks. Read all scheme related documents carefully.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SIPCalculatorScreen;
