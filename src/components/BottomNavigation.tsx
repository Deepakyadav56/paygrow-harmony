
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, WalletIcon, QrCodeIcon, TrendingUpIcon, UserIcon } from 'lucide-react';

interface BottomNavigationProps {
  activeTab?: string;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab: propActiveTab }) => {
  const location = useLocation();
  const path = location.pathname;

  // Use the prop if provided, otherwise determine from the path
  const activeTab = propActiveTab || (() => {
    if (path === '/') return 'home';
    if (path.startsWith('/pay')) return 'pay';
    if (path.startsWith('/scan')) return 'scan';
    if (path.startsWith('/invest')) return 'invest';
    if (path.startsWith('/profile')) return 'profile';
    return '';
  })();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-1px_5px_rgba(0,0,0,0.1)] border-t border-gray-100 flex justify-around p-2 z-10">
      <Link
        to="/"
        className={`flex flex-col items-center pt-2 px-4 pb-1 rounded-lg ${
          activeTab === 'home' ? 'text-fountain-blue-500' : 'text-gray-500'
        }`}
      >
        <HomeIcon className="w-5 h-5" />
        <span className="text-xs mt-1">Home</span>
      </Link>
      
      <Link
        to="/pay"
        className={`flex flex-col items-center pt-2 px-4 pb-1 rounded-lg ${
          activeTab === 'pay' ? 'text-fountain-blue-500' : 'text-gray-500'
        }`}
      >
        <WalletIcon className="w-5 h-5" />
        <span className="text-xs mt-1">Pay</span>
      </Link>
      
      <Link
        to="/scan"
        className="relative flex flex-col items-center"
      >
        <div className="absolute -top-5 bg-white rounded-full p-3 shadow-lg border border-gray-100">
          <QrCodeIcon className="w-6 h-6 text-gray-700" />
        </div>
        <span className="text-xs mt-9">Scan</span>
      </Link>
      
      <Link
        to="/invest"
        className={`flex flex-col items-center pt-2 px-4 pb-1 rounded-lg ${
          activeTab === 'invest' ? 'text-fountain-blue-500' : 'text-gray-500'
        }`}
      >
        <TrendingUpIcon className="w-5 h-5" />
        <span className="text-xs mt-1">Invest</span>
      </Link>
      
      <Link
        to="/profile"
        className={`flex flex-col items-center pt-2 px-4 pb-1 rounded-lg ${
          activeTab === 'profile' ? 'text-fountain-blue-500' : 'text-gray-500'
        }`}
      >
        <UserIcon className="w-5 h-5" />
        <span className="text-xs mt-1">Profile</span>
      </Link>
    </div>
  );
};

export default BottomNavigation;
