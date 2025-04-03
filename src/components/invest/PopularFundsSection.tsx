
import React from 'react';
import { Link } from 'react-router-dom';
import SimpleFundCard from './SimpleFundCard';

// Mock data for popular funds
const popularFunds = [
  {
    id: 1,
    name: 'Motilal Oswal Midcap Fund',
    category: 'Equity Mid Cap',
    returns: 28.82,
    rating: 5,
    logoUrl: 'https://source.unsplash.com/random/100x100/?finance,1'
  },
  {
    id: 2,
    name: 'Parag Parikh Flexi Cap Fund',
    category: 'Equity Flexi Cap',
    returns: 17.12,
    rating: 5,
    logoUrl: 'https://source.unsplash.com/random/100x100/?finance,2'
  }
];

const PopularFundsSection: React.FC = () => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Popular Funds</h2>
        <Link to="/invest/mutual-funds" className="text-paygrow-blue text-sm">
          All Mutual Funds
        </Link>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {popularFunds.map((fund, index) => (
          <SimpleFundCard 
            key={index}
            id={fund.id}
            name={fund.name}
            category={fund.category}
            returns={fund.returns}
            rating={fund.rating}
            logoUrl={fund.logoUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularFundsSection;
