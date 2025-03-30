
import React, { useState } from 'react';
import { ArrowLeft, Check, ChevronRight, CreditCard, Smartphone, Banknote, Shield, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

const PaymentMethodScreen: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>('netbanking');
  const [selectedBank, setSelectedBank] = useState<string>('hdfc');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const banks = [
    { id: 'hdfc', name: 'HDFC Bank', logo: 'https://source.unsplash.com/random/100x100/?bank' },
    { id: 'sbi', name: 'State Bank of India', logo: 'https://source.unsplash.com/random/100x100/?bank' },
    { id: 'icici', name: 'ICICI Bank', logo: 'https://source.unsplash.com/random/100x100/?bank' },
    { id: 'axis', name: 'Axis Bank', logo: 'https://source.unsplash.com/random/100x100/?bank' },
  ];
  
  const handleProceed = () => {
    setIsLoading(true);
    
    // Simulate payment processing with progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 20;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        
        toast({
          title: "Payment successful",
          description: "Your investment has been processed successfully",
          variant: "default",
        });
        
        // Navigate to payment confirmation screen
        navigate('/payment/confirmation');
      }
    }, 400);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-paygrow-blue to-blue-600 text-white pt-12 pb-6 px-4">
        <div className="flex items-center mb-2">
          <Link to="/invest/order-summary" className="mr-4">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">Select Payment Method</h1>
        </div>
        <p className="text-white/80">Choose how you want to pay ₹5,000</p>
        
        {/* Progress Steps */}
        <div className="mt-6 flex items-center justify-between text-xs text-white/70">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white mb-1">1</div>
            <span>Details</span>
          </div>
          <div className="flex-1 h-0.5 bg-white/20 mx-2">
            <div className="h-full bg-white/90 w-full"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white mb-1">2</div>
            <span>Order</span>
          </div>
          <div className="flex-1 h-0.5 bg-white/20 mx-2">
            <div className="h-full bg-white/90 w-full"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-paygrow-blue mb-1">3</div>
            <span className="text-white">Payment</span>
          </div>
          <div className="flex-1 h-0.5 bg-white/20 mx-2"></div>
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white mb-1">4</div>
            <span>Complete</span>
          </div>
        </div>
      </div>
      
      {/* Order Summary */}
      <Card className="mx-4 mt-4 p-4 shadow-sm rounded-xl border border-gray-100">
        <h2 className="text-lg font-medium mb-2">Order Summary</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Fund</span>
            <span className="font-medium">Axis Bluechip Fund</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Plan</span>
            <span className="font-medium">Direct Growth</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Investment Type</span>
            <span className="font-medium">SIP</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Amount</span>
            <span className="font-medium text-green-600">₹5,000</span>
          </div>
        </div>
      </Card>
      
      {/* Payment Methods */}
      <div className="px-4 py-6">
        <h2 className="text-lg font-medium mb-4">Payment Methods</h2>
        <RadioGroup 
          value={paymentMethod} 
          onValueChange={setPaymentMethod}
          className="space-y-4"
        >
          {/* UPI */}
          <Card className={`p-4 border ${paymentMethod === 'upi' ? 'border-paygrow-blue bg-blue-50' : 'border-gray-200'} transition-all duration-200 shadow-sm hover:shadow-md`}>
            <div className="flex items-center">
              <RadioGroupItem id="upi" value="upi" className="mr-3" />
              <Label htmlFor="upi" className="flex-1 flex items-center cursor-pointer">
                <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <Smartphone className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">UPI</p>
                  <p className="text-xs text-gray-500">Pay using any UPI app</p>
                </div>
              </Label>
            </div>
            
            {paymentMethod === 'upi' && (
              <div className="mt-4 pl-7 animate-fade-in">
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex justify-center mb-3">
                    <div className="h-32 w-32 bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50"></div>
                      <div className="relative z-10 text-center">
                        <div className="h-24 w-24 bg-white rounded-lg shadow-md flex items-center justify-center mx-auto">
                          <span className="text-lg font-bold">QR Code</span>
                        </div>
                        <p className="text-xs mt-2 text-gray-500">Scan to pay</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-sm">Scan with any UPI app</p>
                  <Separator className="my-4" />
                  <Button className="w-full bg-gradient-to-r from-paygrow-blue to-blue-500 text-white">Pay with UPI App</Button>
                </div>
              </div>
            )}
          </Card>
          
          {/* Net Banking */}
          <Card className={`p-4 border ${paymentMethod === 'netbanking' ? 'border-paygrow-blue bg-blue-50' : 'border-gray-200'} transition-all duration-200 shadow-sm hover:shadow-md`}>
            <div className="flex items-center">
              <RadioGroupItem id="netbanking" value="netbanking" className="mr-3" />
              <Label htmlFor="netbanking" className="flex-1 flex items-center cursor-pointer">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Banknote className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Net Banking</p>
                  <p className="text-xs text-gray-500">Pay using your internet banking</p>
                </div>
              </Label>
            </div>
            
            {paymentMethod === 'netbanking' && (
              <div className="mt-4 pl-7 animate-fade-in">
                <p className="text-sm mb-2">Select your bank</p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {banks.map((bank) => (
                    <div 
                      key={bank.id}
                      className={`p-3 border rounded-lg flex items-center ${
                        selectedBank === bank.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
                      } cursor-pointer shadow-sm hover:shadow transition-all duration-200`}
                      onClick={() => setSelectedBank(bank.id)}
                    >
                      <div className="h-8 w-8 rounded-full overflow-hidden mr-2 shadow-sm">
                        <img src={bank.logo} alt={bank.name} className="h-full w-full object-cover" />
                      </div>
                      <p className="text-sm font-medium">{bank.name}</p>
                      {selectedBank === bank.id && (
                        <CheckCircle2 className="h-4 w-4 text-blue-600 ml-auto" />
                      )}
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-blue-600 text-white">Continue with {banks.find(b => b.id === selectedBank)?.name}</Button>
              </div>
            )}
          </Card>
          
          {/* Debit/Credit Card */}
          <Card className={`p-4 border ${paymentMethod === 'card' ? 'border-paygrow-blue bg-blue-50' : 'border-gray-200'} transition-all duration-200 shadow-sm hover:shadow-md`}>
            <div className="flex items-center">
              <RadioGroupItem id="card" value="card" className="mr-3" />
              <Label htmlFor="card" className="flex-1 flex items-center cursor-pointer">
                <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <CreditCard className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">Debit / Credit Card</p>
                  <p className="text-xs text-gray-500">Pay using any card</p>
                </div>
              </Label>
            </div>
            
            {paymentMethod === 'card' && (
              <div className="mt-4 pl-7 animate-fade-in">
                <div className="rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                  <div className="p-4 bg-gradient-to-r from-purple-100 to-blue-100">
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500">Card Number</p>
                        <p className="font-medium">•••• •••• •••• ••••</p>
                      </div>
                      <div className="flex space-x-4">
                        <div>
                          <p className="text-xs text-gray-500">Expiry</p>
                          <p className="font-medium">MM/YY</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">CVV</p>
                          <p className="font-medium">•••</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white">Add New Card</Button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </RadioGroup>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-start shadow-sm">
          <Shield className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-800">Secure Payments</p>
            <p className="text-xs text-blue-700">
              All your payment information is encrypted with industry-standard security measures.
            </p>
          </div>
        </div>
        
        <div className="mt-6">
          <Button 
            className="w-full bg-gradient-to-r from-paygrow-blue to-blue-600 text-white h-12 shadow-md hover:shadow-lg transition-all"
            onClick={handleProceed}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-full">
                <p className="mb-1">Processing Payment...</p>
                <Progress value={progress} className="h-1.5 bg-blue-200" />
              </div>
            ) : (
              'Pay ₹5,000'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodScreen;
