
import React from 'react';
import AuthForm from '@/components/AuthForm';
import { motion } from '@/components/ui/motion';

const SignupScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white flex flex-col justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text text-transparent">Join TimePay</h1>
          <p className="text-gray-600 text-sm mt-2">Create an account to get started</p>
        </div>
        <AuthForm mode="signup" />
      </motion.div>
    </div>
  );
};

export default SignupScreen;
