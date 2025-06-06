
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, PieChart, AlertTriangle, ArrowRight, Wallet, Eye, EyeOff } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface InvestmentInsightsProps {
  hideValues?: boolean;
  maskValue?: (value: string | number) => string;
}

const InvestmentInsights: React.FC<InvestmentInsightsProps> = ({ 
  hideValues = false, 
  maskValue = (value) => typeof value === 'number' ? value.toLocaleString('en-IN') : value.toString()
}) => {
  // Check if the user has investments
  const hasInvestments = true;
  const [isHidden, setIsHidden] = useState(hideValues);
  
  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };
  
  const formatValue = (value: number | string) => {
    return isHidden ? "●●●●●" : maskValue(value);
  };
  
  return (
    <div className="space-y-6">
      {hasInvestments ? (
        <>
          {/* Portfolio Summary */}
          <Card className="p-4 border-0 bg-gradient-to-r from-timepay-blue to-timepay-indigo text-white">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold mb-0">Your Portfolio</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 text-white/80 hover:text-white hover:bg-white/10 rounded-full"
                onClick={toggleVisibility}
              >
                {isHidden ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-white/70">Current Value</p>
                <p className="text-xl font-bold">₹{formatValue(125430)}</p>
                <div className="flex items-center text-green-300 text-xs mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+12.5% All Time</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-white/70">Invested Amount</p>
                <p className="text-xl font-bold">₹{formatValue(115000)}</p>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-green-300">+₹{formatValue(10430)} Gains</span>
                  <span className="text-white/70">XIRR: 14.2%</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-white/70 mb-2">
              <span>1D Return: +0.76%</span>
              <span>1Y Return: +12.5%</span>
            </div>
            <Button className="w-full bg-white text-timepay-blue hover:bg-white/90">
              View Detailed Portfolio
            </Button>
          </Card>
          
          {/* Active SIPs */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Your SIPs</h3>
              <Link to="/invest/sip-management" className="text-sm text-timepay-blue">
                Manage
              </Link>
            </div>
            
            <Card className="p-4 border border-gray-100 mb-3 hoverable-card">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">Axis Bluechip Fund</h4>
                  <p className="text-xs text-gray-500">Large Cap • Direct Growth</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{formatValue(5000)}</p>
                  <p className="text-xs text-gray-500">Monthly</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-gray-500">Current Value: ₹{formatValue(32540)}</span>
                <span className="text-timepay-green">+8.5%</span>
              </div>
              
              <Progress value={8.5 * 5} className="h-1.5 bg-gray-100">
                <div className="h-full bg-timepay-blue rounded-full" style={{ width: `${8.5 * 5}%` }}></div>
              </Progress>
              
              <div className="mt-4 flex justify-between items-center text-sm">
                <span className="text-gray-500">Next Installment: 5 Jul</span>
                <Link to="/invest/sip-management" className="text-timepay-blue flex items-center">
                  Details <ArrowRight className="h-3.5 w-3.5 ml-0.5" />
                </Link>
              </div>
            </Card>
            
            <Button variant="outline" className="w-full" asChild>
              <Link to="/invest/mutual-funds">
                Start Another SIP
              </Link>
            </Button>
          </div>
        </>
      ) : (
        // Empty portfolio state
        <div className="text-center py-6 space-y-6">
          <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-r from-timepay-light-blue to-blue-50 flex items-center justify-center mb-2">
            <PieChart className="h-12 w-12 text-timepay-blue" />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">No investments yet</h3>
            <p className="text-gray-500 mb-6">Start your investment journey today</p>
            
            <Button className="w-full bg-timepay-blue hover:bg-timepay-blue/90 mb-3" asChild>
              <Link to="/invest/mutual-funds">
                Explore Mutual Funds
              </Link>
            </Button>
            
            <Button variant="outline" className="w-full" asChild>
              <Link to="/sip-calculator">
                Calculate SIP Returns
              </Link>
            </Button>
          </div>
          
          <Card className="p-4 bg-yellow-50 border-yellow-100 text-left">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-800 mb-1">Why invest with TimePay?</p>
                <ul className="text-sm text-yellow-700 list-disc list-inside space-y-1">
                  <li>Zero commission mutual funds</li>
                  <li>Start SIP with just ₹500</li>
                  <li>Simple, paperless process</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default InvestmentInsights;
