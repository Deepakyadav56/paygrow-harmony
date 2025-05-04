
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

  // Map of fund houses to their logo symbols and colors
  const getFundHouseStyles = () => {
    if (!fundHouse) return { initial: '', bgColor: 'bg-teal-100', textColor: 'text-teal-800' };
    
    const knownFundHouses: Record<string, { initial: string, bgColor: string, textColor: string }> = {
      'SBI': { initial: 'SBI', bgColor: 'bg-teal-600', textColor: 'text-white' },
      'HDFC': { initial: 'HD', bgColor: 'bg-teal-700', textColor: 'text-white' },
      'ICICI': { initial: 'IC', bgColor: 'bg-teal-500', textColor: 'text-white' },
      'Axis': { initial: 'AX', bgColor: 'bg-teal-400', textColor: 'text-teal-900' },
      'Kotak': { initial: 'KO', bgColor: 'bg-teal-800', textColor: 'text-white' },
      'Aditya Birla': { initial: 'AB', bgColor: 'bg-teal-300', textColor: 'text-teal-900' },
      'DSP': { initial: 'DSP', bgColor: 'bg-teal-200', textColor: 'text-teal-900' },
      'Tata': { initial: 'TT', bgColor: 'bg-teal-500', textColor: 'text-white' },
      'UTI': { initial: 'UTI', bgColor: 'bg-teal-600', textColor: 'text-white' },
      'Franklin': { initial: 'FR', bgColor: 'bg-teal-700', textColor: 'text-white' },
      'Nippon India': { initial: 'NI', bgColor: 'bg-teal-400', textColor: 'text-teal-900' },
      'Invesco': { initial: 'IN', bgColor: 'bg-teal-500', textColor: 'text-white' },
      'Mirae': { initial: 'MI', bgColor: 'bg-teal-600', textColor: 'text-white' },
      'Canara Robeco': { initial: 'CR', bgColor: 'bg-teal-700', textColor: 'text-white' },
      'IDFC': { initial: 'ID', bgColor: 'bg-teal-300', textColor: 'text-teal-900' },
      'L&T': { initial: 'LT', bgColor: 'bg-teal-200', textColor: 'text-teal-900' },
      'Bandhan': { initial: 'BN', bgColor: 'bg-teal-400', textColor: 'text-teal-900' },
      'Motilal Oswal': { initial: 'MO', bgColor: 'bg-teal-500', textColor: 'text-white' },
      'Edelweiss': { initial: 'ED', bgColor: 'bg-teal-600', textColor: 'text-white' },
      'Sundaram': { initial: 'SU', bgColor: 'bg-teal-700', textColor: 'text-white' },
      'Parag Parikh': { initial: 'PP', bgColor: 'bg-teal-400', textColor: 'text-teal-900' },
      'PGIM': { initial: 'PG', bgColor: 'bg-teal-500', textColor: 'text-white' },
      'Quant': { initial: 'QU', bgColor: 'bg-teal-600', textColor: 'text-white' },
      'BNP Paribas': { initial: 'BNP', bgColor: 'bg-teal-700', textColor: 'text-white' },
      'Baroda BNP': { initial: 'BB', bgColor: 'bg-teal-300', textColor: 'text-teal-900' },
      'WhiteOak': { initial: 'WO', bgColor: 'bg-teal-400', textColor: 'text-teal-900' },
      'Principal': { initial: 'PR', bgColor: 'bg-teal-500', textColor: 'text-white' },
      'HSBC': { initial: 'HS', bgColor: 'bg-teal-600', textColor: 'text-white' },
      'JM Financial': { initial: 'JM', bgColor: 'bg-teal-700', textColor: 'text-white' },
      'BOI AXA': { initial: 'BA', bgColor: 'bg-teal-400', textColor: 'text-teal-900' },
    };
    
    const fundStyle = knownFundHouses[fundHouse] || { 
      initial: fundHouse.substring(0, 2).toUpperCase(),
      bgColor: 'bg-teal-100',
      textColor: 'text-teal-800'
    };
    
    return fundStyle;
  };

  const fundStyle = getFundHouseStyles();

  return (
    <div className={`${getSize()} rounded-lg ${fundStyle.bgColor} ${className} shadow-sm flex items-center justify-center font-bold`}>
      <span className={`text-sm ${fundStyle.textColor}`}>{fundStyle.initial}</span>
    </div>
  );
};

export default FundLogo;
