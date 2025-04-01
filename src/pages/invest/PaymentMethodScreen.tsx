
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, ChevronRight, CreditCard, Smartphone, Banknote, Shield, CheckCircle2, Lock, ChevronDown, Info, ArrowUpRight } from 'lucide-react';
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
    <div className="min-h-screen bg-white">
      {/* Enhanced Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 pt-12 pb-16 px-5 shadow-lg overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400/20 rounded-full -translate-x-16 -translate-y-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/20 rounded-full translate-x-8 translate-y-16 blur-3xl"></div>
          <div className="absolute inset-0 bg-[url('https://source.unsplash.com/random/1000x500/?finance,technology')] bg-cover opacity-10 mix-blend-overlay"></div>
          
          {/* Animated gradient line */}
          <motion.div 
            className="absolute bottom-0 left-0 w-full h-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1.5 }}
          >
            <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
              <motion.path 
                d="M0,60 C100,30 250,90 400,50 L400,100 L0,100 Z" 
                fill="url(#gradient)"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </div>
        
        {/* Header content */}
        <div className="relative z-10">
          <div className="flex items-center mb-4">
            <Link to="/invest/order-summary" className="mr-4 bg-white/20 p-2 rounded-full hover:bg-white/30 transition-all duration-300 active:scale-95">
              <ArrowLeft className="w-5 h-5 text-white" />
            </Link>
            <div>
              <motion.h1 
                className="text-2xl font-bold text-white"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Complete Payment
              </motion.h1>
              <motion.p 
                className="text-white/80 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Secure your investment in Axis Bluechip Fund
              </motion.p>
            </div>
          </div>
          
          {/* Animated Amount Card */}
          <motion.div 
            className="mt-6 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-white/70 text-sm">Investment Amount</span>
              <span className="text-white text-xs px-2 py-1 bg-white/20 rounded-full">SIP</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-white">₹5,000</span>
              <span className="text-white/70 text-sm ml-2">per month</span>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600"></div>
                </div>
                <div className="ml-2">
                  <p className="text-white text-xs font-medium">Axis Bluechip Fund</p>
                  <p className="text-white/70 text-xs">Direct Growth</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white/80 text-xs hover:text-white hover:bg-white/10"
                onClick={() => navigate('/invest/order-summary')}
              >
                View Details
                <ChevronRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Enhanced Progress Steps */}
        <motion.div 
          className="mt-8 flex items-center justify-between text-xs text-white/80 relative z-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white mb-1">
              <Check className="w-4 h-4" />
            </div>
            <span className="text-[10px]">Details</span>
          </div>
          <div className="flex-1 h-0.5 bg-white/20 mx-1">
            <div className="h-full bg-white/90 w-full"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white mb-1">
              <Check className="w-4 h-4" />
            </div>
            <span className="text-[10px]">Order</span>
          </div>
          <div className="flex-1 h-0.5 bg-white/20 mx-1">
            <div className="h-full bg-white/90 w-full"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-600 mb-1 shadow-md">
              <span className="text-xs font-bold">3</span>
            </div>
            <span className="text-[10px] text-white font-medium">Payment</span>
          </div>
          <div className="flex-1 h-0.5 bg-white/20 mx-1"></div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white mb-1">
              <span className="text-xs">4</span>
            </div>
            <span className="text-[10px]">Complete</span>
          </div>
        </motion.div>
      </div>
      
      {/* Main Content with Premium Banner */}
      <div className="px-5 -mt-5 relative z-20">
        <motion.div 
          className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200/50 shadow-sm flex items-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="bg-gradient-to-br from-amber-400 to-amber-500 rounded-full p-2 mr-3 shadow-sm">
            <ArrowUpRight className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-amber-900">Premium Investor Benefits</p>
            <p className="text-[11px] text-amber-700">Zero platform fees & priority allocation</p>
          </div>
          <Button className="ml-auto text-xs py-1 h-auto px-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-sm">
            Upgrade
          </Button>
        </motion.div>
        
        {/* Order Summary - Redesigned Card */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card className="border-0 rounded-xl shadow-md p-4 bg-white">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setShowDetails(!showDetails)}
            >
              <h2 className="text-base font-medium flex items-center">
                <span className="bg-blue-50 p-1.5 rounded-full mr-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                </span>
                Order Summary
              </h2>
              <div className="flex items-center">
                <span className="text-xs text-gray-500 mr-2 bg-gray-100 px-2 py-0.5 rounded-full font-medium">Ref: #INV86452</span>
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
              </div>
            </div>
            
            {showDetails && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-2 border-t border-gray-100"
              >
                <div className="space-y-3 text-sm">
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
                    <span className="font-semibold text-green-600">₹5,000</span>
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
        </motion.div>
        
        {/* Payment Methods */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <span className="bg-blue-50 p-1.5 rounded-full mr-2">
              <CreditCard className="h-4 w-4 text-blue-600" />
            </span>
            Choose Payment Method
          </h2>
          
          <RadioGroup 
            value={paymentMethod} 
            onValueChange={setPaymentMethod}
            className="space-y-4"
          >
            {/* UPI */}
            <Card className={`p-0 rounded-xl transition-all duration-300 overflow-hidden ${paymentMethod === 'upi' ? 'border-2 border-blue-500 shadow-lg bg-blue-50/30' : 'border border-gray-200 hover:border-gray-300'}`}>
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
                  <div className="ml-auto flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full overflow-hidden bg-white shadow-sm border border-gray-100">
                      <img src="https://source.unsplash.com/random/100x100/?googlepay" alt="Google Pay" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-7 h-7 rounded-full overflow-hidden bg-white shadow-sm border border-gray-100">
                      <img src="https://source.unsplash.com/random/100x100/?phonepe" alt="PhonePe" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-7 h-7 rounded-full overflow-hidden bg-white shadow-sm border border-gray-100">
                      <img src="https://source.unsplash.com/random/100x100/?paytm" alt="Paytm" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </Label>
              </div>
              
              {paymentMethod === 'upi' && (
                <div className="animate-fade-in">
                  <div className="border-t border-gray-100 p-5 bg-gradient-to-b from-white to-gray-50 rounded-b-xl">
                    <div className="flex justify-center mb-6">
                      <div className="h-56 w-56 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl flex items-center justify-center relative overflow-hidden shadow-inner">
                        <div className="absolute inset-0 bg-[url('https://source.unsplash.com/random/400x400/?pattern')] opacity-5 mix-blend-overlay"></div>
                        <div className="relative z-10 text-center">
                          <div className="h-44 w-44 bg-white rounded-lg shadow-md flex items-center justify-center mx-auto">
                            <div className="w-40 h-40 rounded-lg border border-gray-200 bg-white p-2 relative">
                              <div className="absolute inset-0 bg-[url('https://source.unsplash.com/random/400x400/?qrcode')] bg-center bg-contain bg-no-repeat opacity-90"></div>
                            </div>
                          </div>
                          <p className="text-xs mt-2 text-gray-600 font-medium">Scan with any UPI app</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-center text-sm mb-3 font-medium">Or pay using UPI ID</p>
                    <div className="flex items-center justify-center mb-4">
                      <span className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium bg-white select-all flex items-center">
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
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white h-12 rounded-xl hover:shadow-lg transition-all">
                      Continue with UPI App
                    </Button>
                  </div>
                </div>
              )}
            </Card>
            
            {/* Net Banking */}
            <Card className={`p-0 rounded-xl transition-all duration-300 ${paymentMethod === 'netbanking' ? 'border-2 border-blue-500 shadow-lg bg-blue-50/30' : 'border border-gray-200 hover:border-gray-300'}`}>
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
                  <div className="ml-auto text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">Fastest</div>
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
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white h-12 rounded-xl hover:shadow-lg transition-all">
                      Continue to {banks.find(b => b.id === selectedBank)?.name}
                    </Button>
                  </div>
                </div>
              )}
            </Card>
            
            {/* Debit/Credit Card */}
            <Card className={`p-0 rounded-xl transition-all duration-300 ${paymentMethod === 'card' ? 'border-2 border-blue-500 shadow-lg bg-blue-50/30' : 'border border-gray-200 hover:border-gray-300'}`}>
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
                    <div className="w-7 h-7 rounded-full overflow-hidden bg-white shadow-sm border border-gray-100">
                      <img src="https://source.unsplash.com/random/100x100/?visa" alt="Visa" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-7 h-7 rounded-full overflow-hidden bg-white shadow-sm border border-gray-100">
                      <img src="https://source.unsplash.com/random/100x100/?mastercard" alt="Mastercard" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </Label>
              </div>
              
              {paymentMethod === 'card' && (
                <div className="animate-fade-in border-t border-gray-100">
                  <div className="bg-gradient-to-b from-white to-gray-50 p-5 rounded-b-xl">
                    <div className="mb-6">
                      <div className="relative h-48 w-full rounded-xl overflow-hidden p-5 shadow-lg">
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 via-purple-500 to-indigo-500 opacity-95"></div>
                        <div className="absolute inset-0 bg-[url('https://source.unsplash.com/random/400x200/?circuit')] opacity-10 mix-blend-overlay"></div>
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
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white h-12 rounded-xl hover:shadow-lg transition-all">
                      Add New Card
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </RadioGroup>
        </motion.div>
        
        {/* Security Badge */}
        <motion.div 
          className="mt-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 flex items-start shadow-sm">
            <Shield className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-800">100% Secure Payments</p>
              <p className="text-xs text-blue-700">
                All your payment data is encrypted with bank-level security. We don't store your card details.
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Pay Button */}
        <motion.div 
          className="mt-6 pb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                className={`w-full h-14 rounded-xl shadow-xl relative overflow-hidden ${
                  isLoading 
                    ? 'bg-gray-100' 
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                }`}
                onClick={isLoading ? undefined : handleProceed}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-full">
                    <p className="mb-2 font-medium">Processing Payment...</p>
                    <Progress value={progress} className="h-2 bg-blue-100" indicatorClassName="bg-blue-600" />
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
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 opacity-95"></div>
                <div className="absolute inset-0 bg-[url('https://source.unsplash.com/random/400x200/?finance,investment')] bg-cover opacity-10 mix-blend-overlay"></div>
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
                    <span className="font-bold text-lg text-blue-600">₹5,000.00</span>
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg transition-all rounded-xl"
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
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentMethodScreen;
