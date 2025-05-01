
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from '@/components/ui/motion';

// List of top Indian mutual fund companies
const companies = [
  { 
    id: 1, 
    name: 'SBI Mutual Fund', 
    logo: '/assets/fund-logos/sbi.png',
    aum: '₹7.2 Lakh Cr',
  },
  { 
    id: 2, 
    name: 'HDFC Mutual Fund', 
    logo: '/assets/fund-logos/hdfc.png',
    aum: '₹5.1 Lakh Cr',
  },
  { 
    id: 3, 
    name: 'ICICI Prudential', 
    logo: '/assets/fund-logos/icici.png',
    aum: '₹4.8 Lakh Cr',
  },
  { 
    id: 4, 
    name: 'Axis Mutual Fund', 
    logo: '/assets/fund-logos/axis.png',
    aum: '₹2.9 Lakh Cr',
  },
  { 
    id: 5, 
    name: 'Aditya Birla SL', 
    logo: '/assets/fund-logos/aditya-birla.png',
    aum: '₹2.8 Lakh Cr',
  },
  { 
    id: 6, 
    name: 'Nippon India', 
    logo: '/assets/fund-logos/nippon.png',
    aum: '₹2.7 Lakh Cr',
  },
];

const TopFundCompanies: React.FC = () => {
  return (
    <div className="mt-5">
      <h3 className="text-lg font-medium mb-3">Top AMC Companies</h3>
      
      <div className="grid grid-cols-3 gap-3">
        {companies.map((company) => (
          <motion.div 
            key={company.id}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
          >
            <Link 
              to={`/invest/mutual-funds?company=${company.id}`} 
              className="bg-white rounded-lg p-3 border border-teal-100 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center overflow-hidden mb-2 border border-teal-100">
                <img 
                  src={company.logo} 
                  alt={company.name} 
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/fund-logos/default.png';
                  }}
                />
              </div>
              <span className="text-xs font-medium text-gray-800">{company.name}</span>
              <span className="text-xs text-gray-500 mt-1">{company.aum}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TopFundCompanies;
