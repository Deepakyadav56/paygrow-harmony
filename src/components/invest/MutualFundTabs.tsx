
import React from 'react';
import { Link } from 'react-router-dom';

interface MutualFundTabsProps {
  activeTab: string;
}

const MutualFundTabs: React.FC<MutualFundTabsProps> = ({ activeTab }) => {
  const tabs = [
    { id: 'explore', label: 'Explore', path: '/invest/mutual-funds' },
    { id: 'dashboard', label: 'Dashboard', path: '/invest/portfolio' },
    { id: 'sips', label: 'SIPs', path: '/invest/sip-management' },
    { id: 'watchlist', label: 'Watchlist', path: '/invest/watchlist' },
  ];

  return (
    <div className="flex space-x-2 overflow-x-auto py-2 mb-4 no-scrollbar">
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          to={tab.path}
          className={`px-6 py-2 whitespace-nowrap rounded-full border text-sm font-medium transition-colors
            ${activeTab === tab.id 
              ? 'bg-paygrow-blue text-white border-paygrow-blue' 
              : 'bg-white text-gray-700 border-gray-200'
            }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
};

export default MutualFundTabs;
