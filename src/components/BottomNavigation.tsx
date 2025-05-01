
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Wallet, BarChart2, User, Scan } from 'lucide-react';

interface BottomNavigationProps {
  activeTab?: 'home' | 'pay' | 'scan' | 'invest' | 'profile';
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab }) => {
  const location = useLocation();
  const path = location.pathname;

  const isActive = (tab: string) => {
    if (activeTab) return activeTab === tab;
    
    if (tab === 'home' && (path === '/' || path === '/home')) return true;
    if (tab === 'pay' && path.startsWith('/pay')) return true;
    if (tab === 'scan' && path.startsWith('/scan')) return true;
    if (tab === 'invest' && path.startsWith('/invest')) return true;
    if (tab === 'profile' && path.startsWith('/profile')) return true;
    
    return false;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-20">
      <div className="flex justify-around items-center py-2">
        <Link to="/home" className="flex flex-col items-center p-2">
          <Home className={`h-6 w-6 ${isActive('home') ? 'text-timepay-blue' : 'text-gray-500'}`} />
          <span className={`text-xs mt-1 ${isActive('home') ? 'text-timepay-blue font-medium' : 'text-gray-500'}`}>Home</span>
        </Link>
        
        <Link to="/pay" className="flex flex-col items-center p-2">
          <Wallet className={`h-6 w-6 ${isActive('pay') ? 'text-timepay-blue' : 'text-gray-500'}`} />
          <span className={`text-xs mt-1 ${isActive('pay') ? 'text-timepay-blue font-medium' : 'text-gray-500'}`}>Pay</span>
        </Link>
        
        <Link to="/scan" className="flex flex-col items-center p-2">
          <div className={`rounded-full p-3 ${isActive('scan') ? 'bg-timepay-blue' : 'bg-gray-200'}`}>
            <Scan className={`h-6 w-6 ${isActive('scan') ? 'text-white' : 'text-gray-600'}`} />
          </div>
          <span className={`text-xs mt-1 ${isActive('scan') ? 'text-timepay-blue font-medium' : 'text-gray-500'}`}>Scan</span>
        </Link>
        
        <Link to="/invest" className="flex flex-col items-center p-2">
          <BarChart2 className={`h-6 w-6 ${isActive('invest') ? 'text-timepay-blue' : 'text-gray-500'}`} />
          <span className={`text-xs mt-1 ${isActive('invest') ? 'text-timepay-blue font-medium' : 'text-gray-500'}`}>Invest</span>
        </Link>
        
        <Link to="/profile" className="flex flex-col items-center p-2">
          <User className={`h-6 w-6 ${isActive('profile') ? 'text-timepay-blue' : 'text-gray-500'}`} />
          <span className={`text-xs mt-1 ${isActive('profile') ? 'text-timepay-blue font-medium' : 'text-gray-500'}`}>Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavigation;
