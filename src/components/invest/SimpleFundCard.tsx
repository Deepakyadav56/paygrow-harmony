
import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface SimpleFundCardProps {
  id: number;
  name: string;
  category: string;
  returns: number;
  rating?: number;
  logoUrl?: string;
}

const SimpleFundCard: React.FC<SimpleFundCardProps> = ({
  id,
  name,
  category,
  returns,
  rating = 0,
  logoUrl
}) => {
  const renderStars = (count: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index}
        className={`h-3.5 w-3.5 ${
          index < count ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`} 
      />
    ));
  };

  return (
    <Link to={`/invest/mutual-fund/${id}`}>
      <div className="py-4">
        <div className="flex items-start">
          {logoUrl && (
            <div className="w-10 h-10 mr-3 rounded overflow-hidden bg-gray-100 flex-shrink-0">
              <img src={logoUrl} alt={name} className="w-full h-full object-cover" />
            </div>
          )}
          
          <div className="flex-1">
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium text-gray-900">{name}</h3>
                <div className="flex items-center mt-1">
                  <p className="text-xs text-gray-500 mr-2">{category}</p>
                  {rating > 0 && (
                    <div className="flex">
                      {rating} {renderStars(rating)}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-semibold text-green-600">{returns}%</p>
                <p className="text-xs text-gray-500">3Y</p>
              </div>
            </div>
          </div>
        </div>
        <Separator className="mt-4" />
      </div>
    </Link>
  );
};

export default SimpleFundCard;
