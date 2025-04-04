
import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import FundLogo from './FundLogo';

interface FundListItemProps {
  id: number;
  name: string;
  category: string;
  rating: number;
  returns: number;
}

const FundListItem: React.FC<FundListItemProps> = ({ id, name, category, rating, returns }) => {
  return (
    <Link to={`/invest/mutual-fund/${id}`} className="block">
      <div className="py-4 px-2 border-b border-gray-100 flex items-center">
        <div className="mr-3">
          <FundLogo type={category} />
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{name}</h3>
          <div className="flex items-center mt-1">
            <span className="text-sm text-gray-500 mr-2">{category}</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <span className="text-timepay-green text-lg font-semibold">{returns.toFixed(2)}%</span>
          <p className="text-xs text-gray-500">3Y</p>
        </div>
      </div>
    </Link>
  );
};

export default FundListItem;
