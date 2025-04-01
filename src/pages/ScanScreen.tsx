
import React, { useState } from 'react';
import { ArrowLeft, ZapIcon, Upload, Image, ScanLine, Loader2, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import BottomNavigation from '@/components/BottomNavigation';
import { motion } from '@/components/ui/motion';

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
        description: "Redirecting to payment screen...",
        variant: "success",
      });
      
      // In a real app, this would navigate to payment screen with the scanned UPI ID
      setTimeout(() => {
        window.location.href = '/payment/amount';
      }, 1000);
    }, 2000);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="pb-20 h-screen flex flex-col bg-gray-50"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-paygrow-blue to-blue-600 text-white pt-12 pb-6 px-4 flex items-center">
        <Link to="/pay" className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Scan & Pay</h1>
          <p className="text-sm text-white/80">Scan any QR code to make payments</p>
        </div>
      </div>
      
      {/* Scanner Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6">
        <motion.div 
          className={`w-full aspect-square max-w-xs relative border-2 rounded-lg overflow-hidden ${isScanning ? 'border-paygrow-blue' : 'border-gray-300'} mb-8`}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Scanner background with grid effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/5 to-gray-900/10">
            <div className="absolute inset-0" style={{ 
              backgroundImage: 'linear-gradient(to right, transparent 98%, rgba(0,0,0,0.1) 2%), linear-gradient(to bottom, transparent 98%, rgba(0,0,0,0.1) 2%)',
              backgroundSize: '20px 20px'
            }}></div>
          </div>
          
          {isScanning ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <motion.div 
                  className="absolute inset-0 bg-blue-500/10 border border-blue-400/30 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.8, 0.2, 0.8]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <Loader2 className="h-12 w-12 text-paygrow-blue animate-spin" />
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-8">
                <Camera className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">Point your camera at a QR code</p>
              </div>
            </div>
          )}
          
          {/* Scanner corners for visual effect */}
          <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-paygrow-blue"></div>
          <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-paygrow-blue"></div>
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-paygrow-blue"></div>
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-paygrow-blue"></div>
          
          {/* Scanning line animation */}
          {isScanning && (
            <motion.div 
              className="absolute left-0 right-0 h-0.5 bg-paygrow-blue"
              initial={{ top: "0%" }}
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
          )}
        </motion.div>
        
        <Button 
          onClick={handleScan} 
          className="w-full max-w-xs bg-gradient-to-r from-paygrow-blue to-blue-600 mb-4 flex items-center justify-center gap-2 h-12"
          disabled={isScanning}
        >
          {isScanning ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Scanning...</span>
            </>
          ) : (
            <>
              <ScanLine className="h-5 w-5 mr-1" />
              <span>Scan QR Code</span>
            </>
          )}
        </Button>
        
        <div className="flex gap-4 w-full max-w-xs">
          <Button 
            variant="outline" 
            className="flex-1 flex flex-col items-center gap-2 py-4 border-gray-300 bg-white hover:bg-gray-50"
            asChild
          >
            <Link to="/payment/amount">
              <Upload className="w-6 h-6 text-paygrow-blue" />
              <span className="text-xs">Pay from Gallery</span>
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex-1 flex flex-col items-center gap-2 py-4 border-gray-300 bg-white hover:bg-gray-50"
            asChild
          >
            <Link to="/payment/contacts">
              <Image className="w-6 h-6 text-paygrow-blue" />
              <span className="text-xs">UPI ID / Phone</span>
            </Link>
          </Button>
        </div>
        
        {/* Recently Paid Section */}
        <div className="mt-8 w-full max-w-xs">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Recently Paid</h3>
          <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
            <div className="p-3 flex items-center">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <span className="text-green-600 font-medium">A</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">Akash Sharma</p>
                <p className="text-xs text-gray-500">UPI: akash@okaxis</p>
              </div>
              <Button size="sm" variant="ghost" className="text-paygrow-blue h-8 px-3">
                Pay Again
              </Button>
            </div>
            <div className="p-3 flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <span className="text-blue-600 font-medium">S</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">Swiggy</p>
                <p className="text-xs text-gray-500">UPI: swiggy@ybl</p>
              </div>
              <Button size="sm" variant="ghost" className="text-paygrow-blue h-8 px-3">
                Pay Again
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <BottomNavigation activeTab="Pay" />
    </motion.div>
  );
};

export default ScanScreen;
