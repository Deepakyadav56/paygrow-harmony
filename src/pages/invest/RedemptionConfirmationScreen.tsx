
import React, { useEffect, useState } from 'react';
import { CheckCircle, Clock, ArrowDown, Download, Share2, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import confetti from 'canvas-confetti';

const RedemptionConfirmationScreen: React.FC = () => {
  const navigate = useNavigate();
  const [transactionId] = useState('TXN' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0'));
  const [currentDate] = useState(new Date());
  
  useEffect(() => {
    // Trigger confetti effect when component mounts
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.5 }
    });
  }, []);
  
  // Format date as "dd MMM yyyy, hh:mm am/pm"
  const formattedDate = currentDate.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }) + ', ' + currentDate.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-12 pb-6 px-4 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center mb-8">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-2">Redemption Initiated</h1>
        <p className="text-gray-600 text-center mb-8">
          Your redemption request has been submitted successfully!
        </p>
        
        <Card className="w-full max-w-md shadow-md bg-white border-0">
          <div className="bg-gradient-to-r from-paygrow-blue to-blue-600 text-white p-4 rounded-t-lg">
            <div className="flex justify-between items-center">
              <h2 className="font-bold">Transaction Details</h2>
              <Clock className="h-5 w-5" />
            </div>
            <p className="text-sm text-white/80">Redemption Request</p>
          </div>
          
          <div className="p-4 space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Transaction ID</p>
              <p className="font-medium">{transactionId}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 mb-1">Date & Time</p>
              <p className="font-medium">{formattedDate}</p>
            </div>
            
            <Separator />
            
            <div>
              <p className="text-sm text-gray-500 mb-1">Fund Name</p>
              <p className="font-medium">Axis Bluechip Fund - Direct Growth</p>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 mb-1">Redemption Amount</p>
                <p className="font-medium text-xl">₹16,270</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <ArrowDown className="h-5 w-5 text-paygrow-blue" />
              </div>
            </div>
            
            <Separator />
            
            <div>
              <p className="text-sm text-gray-500 mb-1">Redemption Type</p>
              <p className="font-medium">Partial Redemption</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 mb-1">Status</p>
              <div className="flex items-center">
                <div className="h-2.5 w-2.5 rounded-full bg-amber-500 mr-2"></div>
                <span className="font-medium">Processing</span>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 mb-1">Expected Credit Date</p>
              <p className="font-medium">
                {new Date(currentDate.getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </p>
            </div>
            
            <Separator />
            
            <div>
              <p className="text-sm text-gray-500 mb-1">Bank Account</p>
              <p className="font-medium">HDFC Bank ****1234</p>
            </div>
            
            <div className="flex space-x-2 pt-2">
              <Button variant="outline" className="flex-1" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" className="flex-1" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </Card>
        
        <div className="w-full max-w-md mt-6 space-y-3">
          <p className="text-sm text-center text-gray-500 mb-2">
            You can track your redemption status in the Transaction History section.
          </p>
          
          <Button 
            className="w-full bg-paygrow-blue"
            onClick={() => navigate('/invest/sip-management')}
          >
            View SIP Status
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full"
            asChild
          >
            <Link to="/home">
              <Home className="h-4 w-4 mr-2" />
              Go to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RedemptionConfirmationScreen;
