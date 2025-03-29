
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
      matches: ['/home'],
    },
    {
      icon: <Wallet className="w-6 h-6" />,
      label: 'Pay',
      path: '/pay',
      matches: ['/pay', '/payment', '/scan'],
    },
    {
      icon: <Scan className="w-6 h-6" />,
      label: 'Scan',
      path: '/scan',
      matches: ['/scan'],
    },
    {
      icon: <BarChart className="w-6 h-6" />,
      label: 'Invest',
      path: '/invest',
      matches: ['/invest', '/digital-gold', '/fixed-deposits', '/stocks', '/watchlist', '/sip', '/sip-calculator'],
    },
    {
      icon: <User className="w-6 h-6" />,
      label: 'Profile',
      path: '/profile',
      matches: ['/profile', '/settings', '/transaction-history', '/notifications'],
    },
  ];

  const isActive = (item: typeof navItems[0]) => {
    if (item.matches.some(match => match === currentPath)) {
      return true;
    }
    
    return item.matches.some(match => 
      currentPath.startsWith(match + '/') || 
      (match.includes('/') && currentPath.startsWith(match))
    );
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-xl border-t border-gray-100 dark:border-gray-800 z-50 rounded-t-2xl">
      <div className="flex justify-between items-center px-3 py-1 mx-auto max-w-md">
        {navItems.map((item) => {
          const active = isActive(item);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-300 ${
                active 
                  ? 'text-paygrow-blue bg-blue-50/80 dark:bg-blue-900/20 scale-110' 
                  : 'text-gray-500 hover:text-paygrow-blue dark:text-gray-400 dark:hover:text-white'
              }`}
            >
              <div className={`${active ? 'animate-pulse-subtle' : ''}`}>
                <span>{item.icon}</span>
              </div>
              <span className="text-xs mt-1 font-medium">{item.label}</span>
              {active && (
                <div className="absolute bottom-1 w-10 h-1 bg-paygrow-blue rounded-full animate-scale-in" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
