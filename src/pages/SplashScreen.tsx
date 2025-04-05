
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import { motion } from '@/components/ui/motion';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Auto-navigate to onboarding after 2.5 seconds
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 2500);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-teal-100 opacity-60 blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-teal-50 opacity-70 blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 rounded-full bg-teal-200 opacity-50 blur-xl"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center z-10"
      >
        <Logo size="lg" className="mb-4" />
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-600 mt-4 font-medium"
        >
          Payments & Investments, Simplified
        </motion.p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-16 relative"
      >
        <div className="w-10 h-10 rounded-full border-4 border-teal-500 border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 rounded-full bg-teal-100 blur-md -z-10"></div>
      </motion.div>

      <div className="absolute bottom-10 w-full text-center text-teal-700/50 text-xs">
        <p>© 2025 TimePay Financial Services</p>
      </div>
    </div>
  );
};

export default SplashScreen;
