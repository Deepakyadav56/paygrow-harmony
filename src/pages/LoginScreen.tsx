
import React from 'react';
import AuthForm from '@/components/AuthForm';
import { motion } from '@/components/ui/motion';

const LoginScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white flex flex-col justify-center">
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
                  h1.className = "text-2xl font-bold bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text text-transparent";
                  h1.textContent = "TimePay";
                  parent.appendChild(h1);
                }
              }}
            />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text text-transparent">TimePay</h1>
          <p className="text-gray-600 text-sm mt-2">India's Trusted Investment Platform</p>
        </div>
        <AuthForm mode="login" />
        
        {/* Added Indian regulatory information */}
        <div className="mt-8 text-center px-6">
          <p className="text-xs text-gray-500">TimePay is a SEBI registered investment advisor</p>
          <p className="text-xs text-gray-500 mt-1">Registration Number: INA000016298</p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginScreen;
