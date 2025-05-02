
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the login screen instead of splash
    navigate('/login');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text text-transparent">Redirecting to TimePay...</h1>
        <div className="mt-4 w-8 h-8 rounded-full border-4 border-teal-600 border-t-transparent animate-spin mx-auto"></div>
      </div>
    </div>
  );
};

export default Index;
