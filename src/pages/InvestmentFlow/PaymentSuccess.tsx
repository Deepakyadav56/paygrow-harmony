
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  const formattedTime = currentDate.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-green-500 text-white">
      {/* Header */}
      <div className="px-5 py-6">
        <div className="flex items-center">
          <Link to="/mutual-funds" className="mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          </Link>
        </div>
      </div>
      
      {/* Success Content */}
      <div className="flex flex-col items-center text-center px-6 pt-8">
        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        
        <h1 className="text-4xl font-bold mb-2">Payment Successful</h1>
        <p className="text-3xl font-medium mb-2">₹ 1000</p>
        <p className="mb-8">{formattedDate}, {formattedTime}</p>
        
        {/* Transaction Details */}
        <div className="bg-white text-black rounded-lg w-full p-5 mb-4">
          <h3 className="text-left mb-4">To</h3>
          <div className="flex items-start mb-6">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-3">
              <div className="text-red-500 font-bold text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                  <rect width="12" height="12" x="4" y="4" fill="#FF0000" />
                  <rect width="12" height="12" x="16" y="4" fill="#FF0000" />
                  <rect width="12" height="12" x="4" y="16" fill="#FF0000" />
                  <rect width="4" height="4" x="18" y="18" fill="#0000FF" />
                </svg>
              </div>
            </div>
            <div>
              <h2 className="font-medium">HDFC Gilt Fund - IDWN Plan</h2>
              <p className="text-sm text-gray-600">Debit(Gilt Fund)</p>
            </div>
          </div>
          
          <h3 className="text-left mb-4">From</h3>
          <div className="flex items-start mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-blue-700">
                <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                <line x1="2" x2="22" y1="10" y2="10"></line>
              </svg>
            </div>
            <div>
              <h2 className="font-medium">State Bank of India - XX7590</h2>
              <p className="text-sm text-gray-600">Onetime Investment</p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4 mb-4">
            <div className="flex justify-between mb-2">
              <p className="text-gray-600">Order ID</p>
              <p>CONMGHTRIE1254798520</p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between">
              <p className="text-gray-600">Order Status</p>
              <p className="bg-amber-200 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                In Progress
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6">
        <Button 
          className="w-full bg-teal-700 hover:bg-teal-800 text-white py-6"
          onClick={() => navigate('/mutual-funds')}
        >
          Home
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
