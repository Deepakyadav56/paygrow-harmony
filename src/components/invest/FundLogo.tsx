
import React from 'react';

interface FundLogoProps {
  type: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const FundLogo: React.FC<FundLogoProps> = ({ type, size = 'md', className = '' }) => {
  const getSize = () => {
    switch(size) {
      case 'sm': return 'w-8 h-8';
      case 'lg': return 'w-12 h-12';
      default: return 'w-10 h-10';
    }
  };

  const getLogoByType = () => {
    switch(type.toLowerCase()) {
      case 'large cap':
      case 'largecap':
        return (
          <div className={`${getSize()} rounded-lg bg-blue-100 flex items-center justify-center ${className}`}>
            <span className="text-lg font-medium text-timepay-blue">💼</span>
          </div>
        );
      case 'mid cap':
      case 'midcap':
        return (
          <div className={`${getSize()} rounded-lg bg-yellow-100 flex items-center justify-center ${className}`}>
            <span className="text-lg font-medium text-yellow-800">💰</span>
          </div>
        );
      case 'small cap':
      case 'smallcap':
        return (
          <div className={`${getSize()} rounded-lg bg-green-100 flex items-center justify-center ${className}`}>
            <span className="text-lg font-medium text-green-800">📊</span>
          </div>
        );
      case 'flexi cap':
      case 'flexicap':
        return (
          <div className={`${getSize()} rounded-lg bg-purple-100 flex items-center justify-center ${className}`}>
            <span className="text-lg font-medium text-purple-800">🌱</span>
          </div>
        );
      case 'elss':
        return (
          <div className={`${getSize()} rounded-lg bg-orange-100 flex items-center justify-center ${className}`}>
            <span className="text-lg font-medium text-orange-800">☀️</span>
          </div>
        );
      case 'gold':
        return (
          <div className={`${getSize()} rounded-lg bg-yellow-100 flex items-center justify-center ${className}`}>
            <span className="text-lg font-medium text-yellow-800">🔶</span>
          </div>
        );
      case 'fd':
      case 'fixed deposit':
        return (
          <div className={`${getSize()} rounded-lg bg-timepay-light-green flex items-center justify-center ${className}`}>
            <span className="text-lg font-medium text-timepay-green">🏦</span>
          </div>
        );
      case 'stock':
        return (
          <div className={`${getSize()} rounded-lg bg-purple-100 flex items-center justify-center ${className}`}>
            <span className="text-lg font-medium text-purple-800">📈</span>
          </div>
        );
      default:
        return (
          <div className={`${getSize()} rounded-lg bg-gray-100 flex items-center justify-center ${className}`}>
            <span className="text-lg font-medium text-gray-800">📈</span>
          </div>
        );
    }
  };

  return getLogoByType();
};

export default FundLogo;
