
import React from 'react';

interface FundLogoProps {
  type: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fundHouse?: string;
}

const FundLogo: React.FC<FundLogoProps> = ({ type, size = 'md', className = '', fundHouse = '' }) => {
  const getSize = () => {
    switch(size) {
      case 'sm': return 'w-8 h-8';
      case 'lg': return 'w-12 h-12';
      default: return 'w-10 h-10';
    }
  };

  // Map of fund houses to their logo symbols (using first letter as placeholder)
  const getFundHouseInitial = () => {
    if (!fundHouse) return '';
    
    const knownFundHouses: Record<string, string> = {
      'SBI': 'SBI',
      'HDFC': 'HD',
      'ICICI': 'IC',
      'Axis': 'AX',
      'Kotak': 'KO',
      'Aditya Birla': 'AB',
      'DSP': 'DSP',
      'Tata': 'TT',
      'UTI': 'UTI',
      'Franklin': 'FR',
      'Nippon India': 'NI',
      'Invesco': 'IN',
      'Mirae': 'MI',
      'Canara Robeco': 'CR',
      'IDFC': 'ID',
      'L&T': 'LT',
      'Bandhan': 'BN',
      'Motilal Oswal': 'MO',
      'Edelweiss': 'ED',
      'Sundaram': 'SU',
      'Parag Parikh': 'PP',
      'PGIM': 'PG',
      'Quant': 'QU',
      'BNP Paribas': 'BNP',
      'Baroda BNP': 'BB',
      'WhiteOak': 'WO',
      'Principal': 'PR',
      'HSBC': 'HS',
      'JM Financial': 'JM',
      'BOI AXA': 'BA',
    };
    
    const initial = knownFundHouses[fundHouse] || fundHouse.substring(0, 2).toUpperCase();
    return initial;
  };

  const getLogoByType = () => {
    const fundHouseInitial = getFundHouseInitial();
    
    switch(type.toLowerCase()) {
      case 'large cap':
      case 'largecap':
        return (
          <div className={`${getSize()} rounded-lg bg-teal-100 flex items-center justify-center ${className}`}>
            {fundHouseInitial ? (
              <span className="text-xs font-semibold text-teal-800">{fundHouseInitial}</span>
            ) : (
              <span className="text-lg font-medium text-teal-800">💼</span>
            )}
          </div>
        );
      case 'mid cap':
      case 'midcap':
        return (
          <div className={`${getSize()} rounded-lg bg-teal-200 flex items-center justify-center ${className}`}>
            {fundHouseInitial ? (
              <span className="text-xs font-semibold text-teal-800">{fundHouseInitial}</span>
            ) : (
              <span className="text-lg font-medium text-teal-800">💰</span>
            )}
          </div>
        );
      case 'small cap':
      case 'smallcap':
        return (
          <div className={`${getSize()} rounded-lg bg-teal-300 flex items-center justify-center ${className}`}>
            {fundHouseInitial ? (
              <span className="text-xs font-semibold text-teal-800">{fundHouseInitial}</span>
            ) : (
              <span className="text-lg font-medium text-teal-800">📊</span>
            )}
          </div>
        );
      case 'flexi cap':
      case 'flexicap':
        return (
          <div className={`${getSize()} rounded-lg bg-teal-400 flex items-center justify-center ${className}`}>
            {fundHouseInitial ? (
              <span className="text-xs font-semibold text-white">{fundHouseInitial}</span>
            ) : (
              <span className="text-lg font-medium text-white">🌱</span>
            )}
          </div>
        );
      case 'elss':
        return (
          <div className={`${getSize()} rounded-lg bg-teal-500 flex items-center justify-center ${className}`}>
            {fundHouseInitial ? (
              <span className="text-xs font-semibold text-white">{fundHouseInitial}</span>
            ) : (
              <span className="text-lg font-medium text-white">☀️</span>
            )}
          </div>
        );
      case 'gold':
        return (
          <div className={`${getSize()} rounded-lg bg-yellow-100 flex items-center justify-center ${className}`}>
            {fundHouseInitial ? (
              <span className="text-xs font-semibold text-yellow-800">{fundHouseInitial}</span>
            ) : (
              <span className="text-lg font-medium text-yellow-800">🔶</span>
            )}
          </div>
        );
      case 'fd':
      case 'fixed deposit':
        return (
          <div className={`${getSize()} rounded-lg bg-teal-100 flex items-center justify-center ${className}`}>
            {fundHouseInitial ? (
              <span className="text-xs font-semibold text-teal-800">{fundHouseInitial}</span>
            ) : (
              <span className="text-lg font-medium text-teal-800">🏦</span>
            )}
          </div>
        );
      case 'stock':
        return (
          <div className={`${getSize()} rounded-lg bg-teal-600 flex items-center justify-center ${className}`}>
            {fundHouseInitial ? (
              <span className="text-xs font-semibold text-white">{fundHouseInitial}</span>
            ) : (
              <span className="text-lg font-medium text-white">📈</span>
            )}
          </div>
        );
      case 'debt':
      case 'debt fund':
        return (
          <div className={`${getSize()} rounded-lg bg-teal-200 flex items-center justify-center ${className}`}>
            {fundHouseInitial ? (
              <span className="text-xs font-semibold text-teal-800">{fundHouseInitial}</span>
            ) : (
              <span className="text-lg font-medium text-teal-800">💲</span>
            )}
          </div>
        );
      case 'hybrid':
      case 'balanced':
        return (
          <div className={`${getSize()} rounded-lg bg-teal-300 flex items-center justify-center ${className}`}>
            {fundHouseInitial ? (
              <span className="text-xs font-semibold text-teal-800">{fundHouseInitial}</span>
            ) : (
              <span className="text-lg font-medium text-teal-800">⚖️</span>
            )}
          </div>
        );
      case 'index':
      case 'index fund':
        return (
          <div className={`${getSize()} rounded-lg bg-teal-400 flex items-center justify-center ${className}`}>
            {fundHouseInitial ? (
              <span className="text-xs font-semibold text-white">{fundHouseInitial}</span>
            ) : (
              <span className="text-lg font-medium text-white">📉</span>
            )}
          </div>
        );
      default:
        return (
          <div className={`${getSize()} rounded-lg bg-teal-100 flex items-center justify-center ${className}`}>
            {fundHouseInitial ? (
              <span className="text-xs font-semibold text-teal-800">{fundHouseInitial}</span>
            ) : (
              <span className="text-lg font-medium text-teal-800">📈</span>
            )}
          </div>
        );
    }
  };

  return getLogoByType();
};

export default FundLogo;
