
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Wallet, BarChart, User, Scan } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navItems = [
    {
      icon: <Home className="w-6 h-6" />,
      label: 'Home',
      path: '/home',
    },
    {
      icon: <Wallet className="w-6 h-6" />,
      label: 'Pay',
      path: '/pay',
    },
    {
      icon: <Scan className="w-6 h-6" />,
      label: 'Scan',
      path: '/scan',
    },
    {
      icon: <BarChart className="w-6 h-6" />,
      label: 'Invest',
      path: '/invest',
    },
    {
      icon: <User className="w-6 h-6" />,
      label: 'Profile',
      path: '/profile',
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
      <div className="flex justify-between items-center px-2">
        {navItems.map((item) => {
          const isActive = currentPath.startsWith(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-2 px-2 relative ${
                isActive 
                  ? 'text-paygrow-blue' 
                  : 'text-gray-500 hover:text-paygrow-blue'
              }`}
            >
              <div className={`${isActive ? 'bg-blue-50 p-2 rounded-full' : ''}`}>
                <span>{item.icon}</span>
              </div>
              <span className="text-xs mt-1">{item.label}</span>
              {isActive && (
                <div className="absolute bottom-0 w-10 h-1 bg-paygrow-blue rounded-t-full" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
