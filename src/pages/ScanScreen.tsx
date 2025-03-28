
import React, { useState } from 'react';
import { ArrowLeft, ZapIcon, Upload, Image } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import BottomNavigation from '@/components/BottomNavigation';

const ScanScreen: React.FC = () => {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  
  const handleScan = () => {
    setIsScanning(true);
    
    // Simulate successful QR code scan after 2 seconds
    setTimeout(() => {
      setIsScanning(false);
      toast({
        title: "QR Code Detected",
        description: "Redirecting to payment screen..."
      });
      
      // In a real app, this would navigate to payment screen with the scanned UPI ID
      setTimeout(() => {
        window.location.href = '/payment/amount';
      }, 1000);
    }, 2000);
  };
  
  return (
    <div className="pb-20 h-screen flex flex-col"> {/* Add padding for bottom navigation */}
      {/* Header */}
      <div className="bg-paygrow-blue text-white pt-12 pb-6 px-4 flex items-center">
        <Link to="/pay" className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold">Scan & Pay</h1>
      </div>
      
      {/* Scanner Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className={`w-full aspect-square max-w-xs relative border-2 rounded-lg ${isScanning ? 'border-paygrow-blue animate-pulse' : 'border-gray-300'} mb-8`}>
          {isScanning ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <ZapIcon className="w-12 h-12 text-paygrow-blue animate-bounce" />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-500 text-center px-8">Point your camera at a QR code</p>
            </div>
          )}
          
          {/* Scanner corners for visual effect */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-paygrow-blue"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-paygrow-blue"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-paygrow-blue"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-paygrow-blue"></div>
        </div>
        
        <Button 
          onClick={handleScan} 
          className="w-full max-w-xs bg-paygrow-blue mb-4"
          disabled={isScanning}
        >
          {isScanning ? "Scanning..." : "Scan QR Code"}
        </Button>
        
        <div className="flex gap-4 w-full max-w-xs">
          <Button 
            variant="outline" 
            className="flex-1 flex flex-col items-center gap-2 py-4"
            asChild
          >
            <Link to="/payment/amount">
              <Upload className="w-6 h-6" />
              <span className="text-xs">Pay from Gallery</span>
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex-1 flex flex-col items-center gap-2 py-4"
            asChild
          >
            <Link to="/payment/contacts">
              <Image className="w-6 h-6" />
              <span className="text-xs">UPI ID / Phone</span>
            </Link>
          </Button>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default ScanScreen;
