
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const OneTimeInvestment: React.FC = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(1000);
  const [selectedBank, setSelectedBank] = useState('sbi');
  const [showKeypad, setShowKeypad] = useState(false);
  const [showPaymentModes, setShowPaymentModes] = useState(false);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState<'netbanking' | 'upi' | null>(null);

  const addAmount = (value: number) => {
    setAmount(prev => prev + value);
  };

  const handleNumpadClick = (num: number | string) => {
    if (typeof num === 'number') {
      setAmount(prev => {
        const newVal = Number(prev.toString() + num.toString());
        return newVal;
      });
    } else if (num === 'backspace') {
      setAmount(prev => {
        const str = prev.toString();
        if (str.length > 1) {
          return Number(str.slice(0, -1));
        }
        return 0;
      });
    }
  };

  const handleProceed = () => {
    if (!selectedPaymentMode) {
      setShowPaymentModes(true);
    } else {
      // Navigate to OTP screen
      navigate('/mutual-funds/invest/otp');
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-teal-600 text-white px-5 py-6">
        <div className="flex items-center">
          <Link to="/mutual-funds" className="mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          </Link>
          <h1 className="text-xl font-bold">One time Investment</h1>
          <div className="flex-1"></div>
          <Link to="/" className="ml-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </Link>
        </div>
      </div>
      
      {/* Fund info */}
      <div className="p-4 bg-gray-100">
        <div className="bg-white p-4 rounded-lg flex items-center">
          <div className="w-12 h-12 bg-red-100 rounded-md flex items-center justify-center text-lg mr-3">
            <div className="text-red-500 font-bold text-xs">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                <rect width="12" height="12" x="4" y="4" fill="#FF0000" />
                <rect width="12" height="12" x="16" y="4" fill="#FF0000" />
                <rect width="12" height="12" x="4" y="16" fill="#FF0000" />
                <rect width="4" height="4" x="18" y="18" fill="#0000FF" />
              </svg>
            </div>
          </div>
          <div>
            <h2 className="font-medium">HDFC Gilt Fund - IDWN Plan</h2>
            <p className="text-sm text-gray-600">Debit(Gilt Fund)</p>
          </div>
        </div>
      </div>
      
      {/* Investment amount */}
      <div className="p-6 text-center">
        <p className="text-lg mb-4">Investment Amount</p>
        <p className="text-5xl font-medium mb-4">₹ {amount}</p>
        
        {/* Quick amount buttons */}
        <div className="flex justify-center space-x-2 mb-6">
          <button 
            className="px-4 py-2 border rounded-md text-sm"
            onClick={() => addAmount(1000)}
          >
            +1000
          </button>
          <button 
            className="px-4 py-2 border rounded-md text-sm"
            onClick={() => addAmount(2000)}
          >
            +2000
          </button>
          <button 
            className="px-4 py-2 border rounded-md text-sm"
            onClick={() => addAmount(5000)}
          >
            +5000
          </button>
        </div>
      </div>
      
      {!showPaymentModes && (
        <div className="px-4">
          {/* Debit from */}
          <p className="font-medium mb-4">Debit From</p>
          
          <div className="border rounded-lg p-4 flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-700">
                  <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                  <line x1="2" x2="22" y1="10" y2="10"></line>
                </svg>
              </div>
              <div>
                <p className="font-medium">State Bank of India - XX7590</p>
              </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-400">
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </div>
          
          {/* Keyboard for amount entry */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <Button 
              variant="outline" 
              className="aspect-square text-lg"
              onClick={() => handleNumpadClick(1)}
            >
              1
            </Button>
            <Button 
              variant="outline" 
              className="aspect-square text-lg"
              onClick={() => handleNumpadClick(2)}
            >
              2
            </Button>
            <Button 
              variant="outline" 
              className="aspect-square text-lg"
              onClick={() => handleNumpadClick(3)}
            >
              3
            </Button>
            <Button 
              variant="outline" 
              className="aspect-square text-lg"
              onClick={() => handleNumpadClick(4)}
            >
              4
            </Button>
            <Button 
              variant="outline" 
              className="aspect-square text-lg"
              onClick={() => handleNumpadClick(5)}
            >
              5
            </Button>
            <Button 
              variant="outline" 
              className="aspect-square text-lg"
              onClick={() => handleNumpadClick(6)}
            >
              6
            </Button>
            <Button 
              variant="outline" 
              className="aspect-square text-lg"
              onClick={() => handleNumpadClick(7)}
            >
              7
            </Button>
            <Button 
              variant="outline" 
              className="aspect-square text-lg"
              onClick={() => handleNumpadClick(8)}
            >
              8
            </Button>
            <Button 
              variant="outline" 
              className="aspect-square text-lg"
              onClick={() => handleNumpadClick(9)}
            >
              9
            </Button>
            <Button 
              variant="outline" 
              className="aspect-square text-lg"
              onClick={() => handleNumpadClick('.')}
            >
              .
            </Button>
            <Button 
              variant="outline" 
              className="aspect-square text-lg"
              onClick={() => handleNumpadClick(0)}
            >
              0
            </Button>
            <Button 
              variant="outline" 
              className="aspect-square text-lg bg-gray-100"
              onClick={() => handleNumpadClick('backspace')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path>
                <line x1="18" x2="12" y1="9" y2="15"></line>
                <line x1="12" x2="18" y1="9" y2="15"></line>
              </svg>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <Button 
              variant="outline"
              className="border border-teal-600 text-teal-700"
              onClick={() => navigate(-1)}
            >
              Add to Cart
            </Button>
            <Button 
              className="bg-teal-600 text-white hover:bg-teal-700"
              onClick={handleProceed}
            >
              Invest
            </Button>
          </div>
        </div>
      )}
      
      {/* Payment Mode Selection */}
      {showPaymentModes && (
        <div className="p-4 absolute inset-0 bg-white mt-40 rounded-t-3xl">
          <h2 className="text-2xl font-bold text-center mb-8">Select Payment Mode</h2>
          
          <RadioGroup value={selectedPaymentMode || ''} onValueChange={(value) => setSelectedPaymentMode(value as any)}>
            <div className="mb-4 border rounded-lg p-4">
              <div className="flex items-center">
                <RadioGroupItem value="netbanking" id="netbanking" className="text-teal-600" />
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-teal-600">
                    <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                    <line x1="2" x2="22" y1="10" y2="10"></line>
                  </svg>
                </div>
                <Label htmlFor="netbanking" className="font-medium">Net Banking</Label>
              </div>
            </div>
            
            <div className="mb-4 border rounded-lg p-4">
              <div className="flex items-center">
                <RadioGroupItem value="upi" id="upi" className="text-teal-600" />
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" fill="#E37400"></path>
                    <path d="M12 2L2 7V17L12 22L22 17V7L12 2ZM19.5 16.5L12 20.5L4.5 16.5V7.5L12 3.5L19.5 7.5V16.5Z" fill="white"></path>
                    <path d="M12 11L4.5 7.5L12 3.5L19.5 7.5L12 11Z" fill="white"></path>
                  </svg>
                </div>
                <Label htmlFor="upi" className="font-medium">UPI</Label>
              </div>
            </div>
          </RadioGroup>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <Button 
              variant="outline"
              className="border border-teal-600 text-teal-700"
              onClick={() => setShowPaymentModes(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-teal-600 text-white hover:bg-teal-700"
              onClick={() => navigate('/mutual-funds/invest/otp')}
              disabled={!selectedPaymentMode}
            >
              Pay
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OneTimeInvestment;
