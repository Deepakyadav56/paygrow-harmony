
import React, { useState } from 'react';
import { ArrowLeft, Check, ChevronRight, CreditCard, Smartphone, BankNote, CreditCardIcon, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const PaymentMethodScreen: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>('netbanking');
  const [selectedBank, setSelectedBank] = useState<string>('hdfc');
  const [isLoading, setIsLoading] = useState(false);
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
    
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Payment successful",
        description: "Your investment has been processed successfully",
        variant: "default",
      });
      
      // Navigate to payment confirmation screen
      navigate('/payment/confirmation');
    }, 1500);
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
      </div>
      
      {/* Payment Methods */}
      <div className="px-4 py-6">
        <RadioGroup 
          value={paymentMethod} 
          onValueChange={setPaymentMethod}
          className="space-y-4"
        >
          {/* UPI */}
          <Card className={`p-4 ${paymentMethod === 'upi' ? 'border-paygrow-blue bg-blue-50' : 'border-gray-200'}`}>
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
              <div className="mt-4 pl-7">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-center mb-3">
                    <div className="h-24 w-24 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg font-bold">QR Code</span>
                    </div>
                  </div>
                  <p className="text-center text-sm">Scan with any UPI app</p>
                  <Separator className="my-4" />
                  <Button className="w-full">Pay with UPI App</Button>
                </div>
              </div>
            )}
          </Card>
          
          {/* Net Banking */}
          <Card className={`p-4 ${paymentMethod === 'netbanking' ? 'border-paygrow-blue bg-blue-50' : 'border-gray-200'}`}>
            <div className="flex items-center">
              <RadioGroupItem id="netbanking" value="netbanking" className="mr-3" />
              <Label htmlFor="netbanking" className="flex-1 flex items-center cursor-pointer">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <BankNote className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Net Banking</p>
                  <p className="text-xs text-gray-500">Pay using your internet banking</p>
                </div>
              </Label>
            </div>
            
            {paymentMethod === 'netbanking' && (
              <div className="mt-4 pl-7">
                <div className="grid grid-cols-2 gap-3">
                  {banks.map((bank) => (
                    <div 
                      key={bank.id}
                      className={`p-3 border rounded-lg flex items-center ${
                        selectedBank === bank.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
                      } cursor-pointer`}
                      onClick={() => setSelectedBank(bank.id)}
                    >
                      <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
                        <img src={bank.logo} alt={bank.name} className="h-full w-full object-cover" />
                      </div>
                      <p className="text-sm font-medium">{bank.name}</p>
                      {selectedBank === bank.id && (
                        <Check className="h-4 w-4 text-blue-600 ml-auto" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
          
          {/* Debit/Credit Card */}
          <Card className={`p-4 ${paymentMethod === 'card' ? 'border-paygrow-blue bg-blue-50' : 'border-gray-200'}`}>
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
          </Card>
        </RadioGroup>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-start">
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
            className="w-full bg-paygrow-blue h-12"
            onClick={handleProceed}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Pay ₹5,000'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodScreen;
