
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, ChevronRight, CreditCard, Smartphone, Banknote, Shield, CheckCircle2, Lock, ChevronDown, Info } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { motion } from '@/components/ui/motion';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const PaymentMethodScreen: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>('netbanking');
  const [selectedBank, setSelectedBank] = useState<string>('hdfc');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Animation effect when screen loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
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
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-paygrow-blue to-blue-600 text-white pt-12 pb-6 px-5 rounded-b-[2.5rem] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-x-16 -translate-y-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400/20 rounded-full translate-x-8 translate-y-16 blur-2xl"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://source.unsplash.com/random/1000x500/?finance')] bg-cover opacity-10 mix-blend-overlay"></div>
        
        <div className="flex items-center mb-3 relative z-10">
          <Link to="/invest/order-summary" className="mr-4 bg-white/20 p-2 rounded-full hover:bg-white/30 transition-all duration-300 active:scale-95">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold">Select Payment Method</h1>
        </div>
        <p className="text-white/90 text-sm relative z-10 mb-2">Complete your investment of ₹5,000 in Axis Bluechip Fund</p>
        
        {/* Premium Features Banner */}
        <div className="mt-4 mb-6 bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 backdrop-blur-sm rounded-xl p-3 flex items-center relative z-10 border border-yellow-400/30">
          <div className="bg-yellow-400 rounded-full p-1 mr-3">
            <Info className="h-4 w-4 text-yellow-800" />
          </div>
          <div>
            <p className="text-xs font-medium text-white">Become a Premium Member</p>
            <p className="text-[10px] text-white/80">Zero platform fees & premium research reports</p>
          </div>
          <Button className="ml-auto text-xs py-1 h-auto px-3 bg-white text-yellow-600 hover:bg-white/90">
            Upgrade
          </Button>
        </div>
        
        {/* Progress Steps */}
        <div className="mt-4 flex items-center justify-between text-xs text-white/80 px-1 relative z-10">
          <div className="flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white mb-1">
              <Check className="w-4 h-4" />
            </div>
            <span className="text-[10px]">Details</span>
          </div>
          <div className="flex-1 h-0.5 bg-white/20 mx-1">
            <div className="h-full bg-white/90 w-full"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white mb-1">
              <Check className="w-4 h-4" />
            </div>
            <span className="text-[10px]">Order</span>
          </div>
          <div className="flex-1 h-0.5 bg-white/20 mx-1">
            <div className="h-full bg-white/90 w-full"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-paygrow-blue mb-1 animate-pulse-subtle">
              <span className="text-xs font-bold">3</span>
            </div>
            <span className="text-[10px] text-white font-medium">Payment</span>
          </div>
          <div className="flex-1 h-0.5 bg-white/20 mx-1"></div>
          <div className="flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white mb-1">
              <span className="text-xs">4</span>
            </div>
            <span className="text-[10px]">Complete</span>
          </div>
        </div>
      </div>
      
      {/* Order Summary - Collapsible Card */}
      <Card className="mx-5 -mt-8 p-4 shadow-lg rounded-2xl border-0 bg-white z-10 relative">
        <div 
          className="flex items-center justify-between mb-2 cursor-pointer"
          onClick={() => setShowDetails(!showDetails)}
        >
          <h2 className="text-base font-medium flex items-center">
            <span className="bg-blue-50 p-1.5 rounded-full mr-2">
              <CheckCircle2 className="h-4 w-4 text-paygrow-blue" />
            </span>
            Order Summary
          </h2>
          <div className="flex items-center">
            <span className="text-xs text-gray-500 mr-2 bg-gray-100 px-2 py-0.5 rounded-full">Ref: #INV86452</span>
            <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
          </div>
        </div>
        
        {showDetails && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-3 text-sm pt-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Fund</span>
                <span className="font-medium flex items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-100 mr-1.5 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600"></div>
                  </div>
                  Axis Bluechip Fund
                </span>
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
            
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs text-gray-500">Expected returns (5Y)</span>
                  <p className="font-medium text-green-600">₹7,380</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500">Est. CAGR</span>
                  <p className="font-medium text-green-600">14.8%</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </Card>
      
      {/* Payment Methods */}
      <div className="px-5 py-6">
        <h2 className="text-lg font-medium mb-4 flex items-center">
          <span className="bg-blue-50 p-1.5 rounded-full mr-2">
            <CreditCard className="h-4 w-4 text-paygrow-blue" />
          </span>
          Choose Payment Method
        </h2>
        
        <RadioGroup 
          value={paymentMethod} 
          onValueChange={setPaymentMethod}
          className="space-y-4"
        >
          {/* UPI */}
          <Card className={`p-0 rounded-xl transition-all duration-300 overflow-hidden ${paymentMethod === 'upi' ? 'border-2 border-paygrow-blue shadow-lg bg-blue-50/50' : 'border border-gray-200 hover:border-gray-300'}`}>
            <div className="flex items-center p-4">
              <RadioGroupItem id="upi" value="upi" className="mr-3" />
              <Label htmlFor="upi" className="flex-1 flex items-center cursor-pointer">
                <div className="h-11 w-11 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mr-3 shadow-sm">
                  <Smartphone className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">UPI</p>
                  <p className="text-xs text-gray-500">Google Pay, PhonePe, Paytm & more</p>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-100 shadow-sm">
                    <img src="https://source.unsplash.com/random/100x100/?googlepay" alt="Google Pay" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-100 shadow-sm">
                    <img src="https://source.unsplash.com/random/100x100/?phonepe" alt="PhonePe" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-100 shadow-sm">
                    <img src="https://source.unsplash.com/random/100x100/?paytm" alt="Paytm" className="w-full h-full object-cover" />
                  </div>
                </div>
              </Label>
            </div>
            
            {paymentMethod === 'upi' && (
              <div className="animate-fade-in border-t border-gray-100">
                <div className="bg-gradient-to-b from-white to-gray-50 p-5 rounded-b-xl">
                  <div className="flex justify-center mb-4">
                    <div className="h-52 w-52 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl flex items-center justify-center relative overflow-hidden shadow-inner">
                      <div className="absolute inset-0 bg-[url('https://source.unsplash.com/random/400x400/?pattern')] opacity-5 mix-blend-overlay"></div>
                      <div className="relative z-10 text-center">
                        <div className="h-40 w-40 bg-white rounded-lg shadow-md flex items-center justify-center mx-auto">
                          <div className="w-36 h-36 rounded-lg bg-gray-50 flex items-center justify-center relative overflow-hidden border border-gray-100">
                            <div className="absolute inset-0 opacity-5 bg-[url('https://source.unsplash.com/random/400x400/?code')] bg-center bg-no-repeat bg-cover"></div>
                            <div className="relative z-10 p-2 bg-white/80 backdrop-blur-sm rounded-lg">
                              <div className="grid grid-cols-5 grid-rows-5 gap-1">
                                {Array.from({length: 25}).map((_, i) => (
                                  <div key={i} className={`w-3 h-3 ${Math.random() > 0.5 ? 'bg-gray-800' : 'bg-transparent'} rounded-sm`}></div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs mt-2 text-gray-600">Scan with any UPI app</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-sm mb-3 font-medium">Or pay using UPI ID</p>
                  <div className="flex items-center justify-center mb-4">
                    <span className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium bg-gray-50 select-all flex items-center">
                      invest@paygrow
                      <Button variant="ghost" className="ml-2 h-6 w-6 p-0" onClick={() => {
                        navigator.clipboard.writeText('invest@paygrow');
                        toast({
                          title: "UPI ID copied",
                          description: "UPI ID copied to clipboard",
                        });
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                      </Button>
                    </span>
                  </div>
                  <Separator className="my-4" />
                  <Button className="w-full bg-gradient-to-r from-paygrow-blue to-blue-500 text-white h-12 rounded-xl hover:shadow-lg transition-all">Continue with UPI App</Button>
                </div>
              </div>
            )}
          </Card>
          
          {/* Net Banking */}
          <Card className={`p-0 rounded-xl transition-all duration-300 ${paymentMethod === 'netbanking' ? 'border-2 border-paygrow-blue shadow-lg bg-blue-50/50' : 'border border-gray-200 hover:border-gray-300'}`}>
            <div className="flex items-center p-4">
              <RadioGroupItem id="netbanking" value="netbanking" className="mr-3" />
              <Label htmlFor="netbanking" className="flex-1 flex items-center cursor-pointer">
                <div className="h-11 w-11 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mr-3 shadow-sm">
                  <Banknote className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Net Banking</p>
                  <p className="text-xs text-gray-500">All Indian banks supported</p>
                </div>
                <div className="ml-auto text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Fastest</div>
              </Label>
            </div>
            
            {paymentMethod === 'netbanking' && (
              <div className="animate-fade-in border-t border-gray-100">
                <div className="bg-gradient-to-b from-white to-gray-50 p-5 rounded-b-xl">
                  <p className="text-sm mb-3 text-gray-700 font-medium">Select your bank</p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {banks.map((bank) => (
                      <div 
                        key={bank.id}
                        className={`p-3 rounded-xl flex items-center ${
                          selectedBank === bank.id ? 'border-2 border-blue-500 bg-blue-50' : 'border border-gray-200 bg-white'
                        } cursor-pointer shadow-sm hover:shadow-md transition-all duration-200`}
                        onClick={() => setSelectedBank(bank.id)}
                      >
                        <div className="h-9 w-9 rounded-lg overflow-hidden mr-2 shadow-sm">
                          <img src={bank.logo} alt={bank.name} className="h-full w-full object-cover" />
                        </div>
                        <p className="text-sm font-medium">{bank.name}</p>
                        {selectedBank === bank.id && (
                          <CheckCircle2 className="h-4 w-4 text-blue-600 ml-auto" />
                        )}
                      </div>
                    ))}
                  </div>
                  <Button className="w-full bg-gradient-to-r from-paygrow-blue to-blue-600 text-white h-12 rounded-xl hover:shadow-lg transition-all">
                    Continue with {banks.find(b => b.id === selectedBank)?.name}
                  </Button>
                </div>
              </div>
            )}
          </Card>
          
          {/* Debit/Credit Card */}
          <Card className={`p-0 rounded-xl transition-all duration-300 ${paymentMethod === 'card' ? 'border-2 border-paygrow-blue shadow-lg bg-blue-50/50' : 'border border-gray-200 hover:border-gray-300'}`}>
            <div className="flex items-center p-4">
              <RadioGroupItem id="card" value="card" className="mr-3" />
              <Label htmlFor="card" className="flex-1 flex items-center cursor-pointer">
                <div className="h-11 w-11 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mr-3 shadow-sm">
                  <CreditCard className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">Card Payment</p>
                  <p className="text-xs text-gray-500">Credit / Debit / ATM cards</p>
                </div>
                <div className="ml-auto flex items-center space-x-1">
                  <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-100 shadow-sm">
                    <img src="https://source.unsplash.com/random/100x100/?visa" alt="Visa" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-100 shadow-sm">
                    <img src="https://source.unsplash.com/random/100x100/?mastercard" alt="Mastercard" className="w-full h-full object-cover" />
                  </div>
                </div>
              </Label>
            </div>
            
            {paymentMethod === 'card' && (
              <div className="animate-fade-in border-t border-gray-100">
                <div className="bg-gradient-to-b from-white to-gray-50 p-5 rounded-b-xl">
                  <div className="mb-4">
                    <div className="relative h-48 w-full rounded-xl overflow-hidden p-5 shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 via-purple-500 to-blue-500 opacity-90"></div>
                      <div className="absolute inset-0 bg-[url('https://source.unsplash.com/random/400x200/?pattern')] opacity-10 mix-blend-overlay"></div>
                      <div className="relative z-10 h-full flex flex-col justify-between text-white">
                        <div className="flex justify-between items-start">
                          <div className="w-12 h-8">
                            <div className="w-full h-full bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-md shadow-sm"></div>
                          </div>
                          <CreditCard className="h-7 w-7 text-white/80" />
                        </div>
                        
                        <div className="my-4">
                          <div className="h-6 bg-white/20 rounded-md w-full mb-1 backdrop-blur-sm shadow-sm"></div>
                        </div>
                        
                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-xs text-white/70 mb-1">CARD HOLDER</p>
                            <p className="font-medium">Your Name</p>
                          </div>
                          <div>
                            <p className="text-xs text-white/70 mb-1">EXPIRES</p>
                            <p className="font-medium">MM/YY</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white h-12 rounded-xl hover:shadow-lg transition-all">Add New Card</Button>
                </div>
              </div>
            )}
          </Card>
        </RadioGroup>
        
        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 flex items-start shadow-sm">
          <Shield className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-800">100% Secure Payments</p>
            <p className="text-xs text-blue-700">
              All your payment data is encrypted with bank-level security. We don't store your card details.
            </p>
          </div>
        </div>
        
        {/* Payment Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              className={`w-full h-14 mt-8 mb-2 rounded-xl shadow-xl transition-all duration-300 relative overflow-hidden ${isLoading ? 'bg-gray-100' : 'bg-gradient-to-r from-paygrow-blue to-blue-600 hover:shadow-2xl hover:from-blue-600 hover:to-paygrow-blue text-white'}`}
              onClick={isLoading ? undefined : handleProceed}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-full">
                  <p className="mb-2 font-medium">Processing Payment...</p>
                  <Progress value={progress} className="h-2 bg-blue-200" />
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <span className="mr-2 font-medium text-base">Pay ₹5,000</span>
                  <Lock className="h-4 w-4" />
                </div>
              )}
              
              {!isLoading && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute -inset-x-full top-0 h-[2px] bg-white/20 animate-[shine_2s_ease-in-out_infinite]"></div>
                </div>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md p-0 overflow-hidden rounded-xl bg-white">
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 opacity-90"></div>
              <div className="absolute inset-0 bg-[url('https://source.unsplash.com/random/400x200/?finance')] bg-cover opacity-10 mix-blend-overlay"></div>
              <div className="relative p-6 text-white">
                <DialogHeader className="text-center">
                  <DialogTitle className="text-2xl font-bold mb-2">Confirm Payment</DialogTitle>
                  <DialogDescription className="text-white/90">
                    You're about to invest ₹5,000 in Axis Bluechip Fund
                  </DialogDescription>
                </DialogHeader>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Investment Amount</span>
                  <span className="font-semibold">₹5,000.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Payment Method</span>
                  <span className="font-semibold">{
                    paymentMethod === 'upi' ? 'UPI' :
                    paymentMethod === 'netbanking' ? 'Net Banking' :
                    'Card Payment'
                  }</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="font-medium">Total Amount</span>
                  <span className="font-bold text-lg text-paygrow-blue">₹5,000.00</span>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  className="w-full h-12 bg-gradient-to-r from-paygrow-blue to-blue-600 text-white hover:shadow-lg transition-all rounded-xl"
                  onClick={handleProceed}
                >
                  Confirm and Pay
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
        
        <p className="text-center text-xs text-gray-500 mt-3">
          By proceeding, you agree to our <Link to="/terms" className="text-blue-600 font-medium">Terms</Link> & <Link to="/privacy" className="text-blue-600 font-medium">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
};

export default PaymentMethodScreen;
