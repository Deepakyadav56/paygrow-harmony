
import React, { useEffect, useState } from 'react';
import { CheckCircle2, ArrowRight, Download, Share2, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import confetti from 'canvas-confetti';

const PaymentConfirmationScreen: React.FC = () => {
  const navigate = useNavigate();
  const [transactionId] = useState(`TXN${Math.floor(Math.random() * 1000000)}`);
  const [currentDate] = useState(new Date());
  
  useEffect(() => {
    // Trigger confetti animation on component mount
    const duration = 3 * 1000;
    const end = Date.now() + duration;
    
    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#0066FF', '#00C853'],
      });
      
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#0066FF', '#00C853'],
      });
      
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    
    frame();
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Payment Successful!</h1>
          <p className="text-gray-600 mt-2">Your investment has been processed successfully</p>
        </div>
        
        <Card className="p-5 shadow-md rounded-xl border-0 mb-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Transaction ID</span>
              <span className="font-medium">{transactionId}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Date & Time</span>
              <span className="font-medium">
                {currentDate.toLocaleDateString('en-IN', { 
                  day: 'numeric', 
                  month: 'short', 
                  year: 'numeric' 
                })}, {currentDate.toLocaleTimeString('en-IN', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Fund</span>
              <span className="font-medium">Axis Bluechip Fund</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Plan</span>
              <span className="font-medium">Direct Growth</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Investment Type</span>
              <span className="font-medium">SIP</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">SIP Date</span>
              <span className="font-medium">7th of every month</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Amount Invested</span>
              <span className="font-medium text-green-600">₹5,000</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Payment Method</span>
              <span className="font-medium">Net Banking (HDFC Bank)</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Status</span>
              <span className="text-green-600 font-medium flex items-center">
                <CheckCircle2 className="h-4 w-4 mr-1" /> Completed
              </span>
            </div>
          </div>
        </Card>
        
        <div className="flex gap-3 mb-6">
          <Button variant="outline" className="flex-1 gap-1">
            <Download className="h-4 w-4" />
            <span>Receipt</span>
          </Button>
          <Button variant="outline" className="flex-1 gap-1">
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>
        </div>
        
        <div className="space-y-3">
          <Button 
            className="w-full bg-gradient-to-r from-paygrow-green to-green-500 text-white gap-1"
            onClick={() => navigate('/invest/portfolio')}
          >
            <span>View Portfolio</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full gap-1"
            onClick={() => navigate('/home')}
          >
            <Home className="h-4 w-4" />
            <span>Back to Home</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmationScreen;
