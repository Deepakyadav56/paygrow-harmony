
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const OTPVerification: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(20);
  const [isResending, setIsResending] = useState(false);
  
  // Handle OTP digit input
  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input field
    if (value !== '' && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };
  
  // Handle numpad input
  const handleNumpadClick = (num: number | string) => {
    // Find the first empty slot or the first filled slot
    const emptyIndex = otp.findIndex(val => val === '');
    if (emptyIndex !== -1) {
      handleOtpChange(emptyIndex, num.toString());
    } else {
      // If all filled, replace the last one
      handleOtpChange(otp.length - 1, num.toString());
    }
  };
  
  // Handle backspace
  const handleBackspace = () => {
    // Find the last non-empty slot
    for (let i = otp.length - 1; i >= 0; i--) {
      if (otp[i] !== '') {
        handleOtpChange(i, '');
        break;
      }
    }
  };
  
  // Timer for OTP resend
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);
  
  // Resend OTP
  const handleResendOtp = () => {
    if (timer === 0) {
      setIsResending(true);
      // Simulate API call
      setTimeout(() => {
        setTimer(20);
        setOtp(['', '', '', '']);
        setIsResending(false);
      }, 1000);
    }
  };
  
  // Submit OTP
  const handleSubmit = () => {
    if (otp.every(digit => digit !== '')) {
      navigate('/mutual-funds/invest/success');
    }
  };

  return (
    <div className="min-h-screen bg-teal-600 text-white">
      {/* Header */}
      <div className="px-5 py-6">
        <div className="flex items-center">
          <Link to="/mutual-funds/invest" className="mr-3">
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
      
      {/* OTP Content */}
      <div className="px-6 pt-8">
        <h2 className="text-2xl font-bold mb-2">Authorize with OTP</h2>
        <p className="mb-8">Enter the 4-digit sent to +917012093378</p>
        
        {/* OTP Input Fields */}
        <div className="flex justify-between mb-8">
          {otp.map((digit, index) => (
            <Input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              className="w-16 h-16 text-center text-2xl bg-white text-black"
            />
          ))}
        </div>
        
        {/* Timer */}
        <div className="text-center mb-16">
          <p>{timer}s</p>
        </div>
        
        {/* Numpad */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-100 rounded-t-3xl p-6 grid grid-cols-3 gap-4">
          <Button 
            variant="outline" 
            className="bg-white aspect-square text-2xl"
            onClick={() => handleNumpadClick(1)}
          >
            1
          </Button>
          <Button 
            variant="outline" 
            className="bg-white aspect-square text-2xl"
            onClick={() => handleNumpadClick(2)}
          >
            2
          </Button>
          <Button 
            variant="outline" 
            className="bg-white aspect-square text-2xl"
            onClick={() => handleNumpadClick(3)}
          >
            3
          </Button>
          <Button 
            variant="outline" 
            className="bg-white aspect-square text-2xl"
            onClick={() => handleNumpadClick(4)}
          >
            4
          </Button>
          <Button 
            variant="outline" 
            className="bg-white aspect-square text-2xl"
            onClick={() => handleNumpadClick(5)}
          >
            5
          </Button>
          <Button 
            variant="outline" 
            className="bg-white aspect-square text-2xl"
            onClick={() => handleNumpadClick(6)}
          >
            6
          </Button>
          <Button 
            variant="outline" 
            className="bg-white aspect-square text-2xl"
            onClick={() => handleNumpadClick(7)}
          >
            7
          </Button>
          <Button 
            variant="outline" 
            className="bg-white aspect-square text-2xl"
            onClick={() => handleNumpadClick(8)}
          >
            8
          </Button>
          <Button 
            variant="outline" 
            className="bg-white aspect-square text-2xl"
            onClick={() => handleNumpadClick(9)}
          >
            9
          </Button>
          <Button 
            variant="outline" 
            className="bg-white aspect-square text-2xl"
            onClick={() => handleOtpChange(3, '')}
          >
            ,
          </Button>
          <Button 
            variant="outline" 
            className="bg-white aspect-square text-2xl"
            onClick={() => handleNumpadClick(0)}
          >
            0
          </Button>
          <Button 
            variant="outline" 
            className="bg-white aspect-square text-2xl"
            onClick={handleBackspace}
          >
            .
          </Button>
          <div className="col-span-3 mt-2">
            <Button 
              variant="outline" 
              className="w-full bg-blue-500 text-white rounded-full py-4"
              onClick={handleSubmit}
              disabled={otp.some(digit => digit === '')}
            >
              →|
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
