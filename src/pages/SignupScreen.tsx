
import React from 'react';
import AuthForm from '@/components/AuthForm';
import { motion } from '@/components/ui/motion';
import { ThemeControls } from '@/components/ThemeControls';

const SignupScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background flex flex-col justify-center">
      <div className="absolute top-4 right-4 z-50">
        <ThemeControls />
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-6">
          <div className="flex justify-center">
            <img 
              src="/logo.png" 
              alt="TimePay Logo" 
              className="h-12 mb-2"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  const h1 = document.createElement('h1');
                  h1.className = "text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent";
                  h1.textContent = "TimePay";
                  parent.appendChild(h1);
                }
              }}
            />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Join TimePay</h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">Start your investment journey today</p>
        </div>
        <AuthForm mode="signup" />
        
        {/* Added Indian regulatory information */}
        <div className="mt-8 text-center px-6">
          <p className="text-xs text-gray-500 dark:text-gray-400">TimePay is a SEBI registered investment advisor</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Registration Number: INA000016298</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">By signing up, you agree to our Terms & Conditions and Privacy Policy</p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupScreen;
