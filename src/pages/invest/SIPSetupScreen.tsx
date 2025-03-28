
import React, { useState } from 'react';
import { ArrowLeft, Calendar, Info, CheckCircle2 } from 'lucide-react';
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

const SIPSetupScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const isOneTime = searchParams.get('type') === 'onetime';
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [amount, setAmount] = useState(isOneTime ? '5000' : '1000');
  const [sipDate, setSipDate] = useState('7');
  const [isLoading, setIsLoading] = useState(false);
  
  // Quick amount suggestions
  const quickAmounts = isOneTime 
    ? ['1000', '5000', '10000', '25000']
    : ['500', '1000', '2500', '5000'];
  
  const handleInvest = () => {
    if (!amount || parseFloat(amount) < (isOneTime ? 1000 : 500)) {
      toast({
        title: "Invalid amount",
        description: `Minimum investment amount is ₹${isOneTime ? 1000 : 500}`,
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Investment Successful",
        description: isOneTime 
          ? `You have successfully invested ₹${amount} in Axis Bluechip Fund` 
          : `Your SIP of ₹${amount} has been set up successfully`,
      });
      
      navigate('/invest');
    }, 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-paygrow-green text-white pt-12 pb-6 px-4 flex items-center">
        <Link to={`/invest/mutual-fund/${id}`} className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold">
          {isOneTime ? 'One-time Investment' : 'Setup SIP'}
        </h1>
      </div>
      
      {/* Fund Info */}
      <div className="bg-white p-4 border-b">
        <h2 className="font-semibold">Axis Bluechip Fund</h2>
        <p className="text-sm text-gray-500">Large Cap • Direct Growth</p>
      </div>
      
      {/* Investment Form */}
      <div className="flex-1 p-4">
        <Card className="p-4 mb-6">
          <h3 className="font-medium mb-4">
            {isOneTime ? 'Investment Amount' : 'Monthly SIP Amount'}
          </h3>
          
          <div className="flex items-baseline mb-6">
            <span className="text-xl font-semibold mr-2">₹</span>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-2xl font-bold border-none focus-visible:ring-0 p-0 h-auto text-paygrow-green"
              placeholder="0"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap mb-6">
            {quickAmounts.map((quickAmount) => (
              <Button
                key={quickAmount}
                variant="outline"
                onClick={() => setAmount(quickAmount)}
                className="flex-grow"
              >
                ₹{quickAmount}
              </Button>
            ))}
          </div>
          
          {!isOneTime && (
            <>
              <h3 className="font-medium mb-4">SIP Date</h3>
              <div className="grid grid-cols-5 gap-2 mb-4">
                {[1, 7, 14, 21, 28].map((date) => (
                  <Button
                    key={date}
                    variant={sipDate === date.toString() ? "default" : "outline"}
                    className={sipDate === date.toString() ? "bg-paygrow-green" : ""}
                    onClick={() => setSipDate(date.toString())}
                  >
                    {date}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mb-4">
                Your SIP will be processed on the {sipDate}th of every month
              </p>
            </>
          )}
          
          <Separator className="my-4" />
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">
                {isOneTime ? 'Investment Amount' : 'Monthly Investment'}
              </span>
              <span className="text-sm font-medium">₹{amount}</span>
            </div>
            
            {!isOneTime && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">SIP Date</span>
                <span className="text-sm font-medium">{sipDate}th of every month</span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Minimum Investment</span>
              <span className="text-sm font-medium">₹{isOneTime ? '1,000' : '500'}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">NAV Applicability</span>
              <span className="text-sm font-medium">Same day (before 2 PM)</span>
            </div>
          </div>
        </Card>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-6 flex">
          <Info className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-blue-700 mb-1">Important Information</p>
            <p className="text-xs text-blue-600">
              {isOneTime 
                ? 'Investments made before 2 PM will be processed at same day NAV.' 
                : 'Your SIP will be auto-debited from your registered bank account on the selected date every month.'}
            </p>
          </div>
        </div>
        
        <div className="flex items-start mb-6">
          <CheckCircle2 className="h-5 w-5 text-paygrow-green mr-3 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-600">
            I have read and understood the scheme related documents and agree to the terms and conditions of the scheme.
          </p>
        </div>
        
        <Button 
          className="w-full bg-paygrow-green h-12"
          onClick={handleInvest}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : isOneTime ? 'Invest Now' : 'Setup SIP'}
        </Button>
      </div>
    </div>
  );
};

export default SIPSetupScreen;
