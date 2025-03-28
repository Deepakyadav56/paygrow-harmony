
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
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-800 z-50 rounded-t-xl">
      <div className="flex justify-between items-center px-3 py-1 mx-auto max-w-md">
        {navItems.map((item) => {
          const isActive = currentPath.startsWith(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'text-paygrow-blue bg-blue-50 dark:bg-blue-900/20' 
                  : 'text-gray-500 hover:text-paygrow-blue dark:text-gray-400 dark:hover:text-white'
              }`}
            >
              <div className={`${isActive ? 'scale-110 animate-fade-in' : ''}`}>
                <span>{item.icon}</span>
              </div>
              <span className="text-xs mt-1 font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute bottom-0.5 w-10 h-1 bg-paygrow-blue rounded-full animate-scale-in" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
