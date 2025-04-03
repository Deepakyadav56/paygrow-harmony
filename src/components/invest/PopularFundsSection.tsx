
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, ChevronRight } from 'lucide-react';
import { Star } from 'lucide-react';

const fundData = [
  {
    id: 1,
    name: 'HDFC Mid-Cap Opportunities Fund',
    category: 'Equity - Mid Cap • HDFC',
    returns: {
      oneDay: 0.4,
      oneYear: 15.8,
      threeYear: 22.4
    },
    rating: 5,
    logo: 'https://example.com/logos/hdfc.png',
    riskLevel: 'Moderate'
  },
  {
    id: 2,
    name: 'SBI Blue Chip Fund Direct Growth',
    category: 'Equity - Large Cap • SBI',
    returns: {
      oneDay: 0.2,
      oneYear: 12.3,
      threeYear: 16.8
    },
    rating: 4,
    logo: 'https://example.com/logos/sbi.png',
    riskLevel: 'Moderate'
  },
  {
    id: 3,
    name: 'Axis Long Term Equity Fund Direct Growth',
    category: 'ELSS • Axis',
    returns: {
      oneDay: 0.3,
      oneYear: 14.5,
      threeYear: 18.9
    },
    rating: 4,
    logo: 'https://example.com/logos/axis.png',
    riskLevel: 'Moderate to High'
  },
  {
    id: 4,
    name: 'Parag Parikh Flexi Cap Fund Direct Growth',
    category: 'Equity - Flexi Cap • PPFAS',
    returns: {
      oneDay: 0.5,
      oneYear: 19.5,
      threeYear: 26.2
    },
    rating: 5,
    logo: 'https://example.com/logos/ppfas.png',
    riskLevel: 'High'
  }
];

const getRiskBadgeStyle = (risk: string) => {
  switch (risk) {
    case 'Low':
      return 'bg-green-100 text-green-800';
    case 'Moderate':
      return 'bg-blue-100 text-blue-800';
    case 'High':
      return 'bg-orange-100 text-orange-800';
    case 'Moderate to High':
      return 'bg-amber-100 text-amber-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }).map((_, i) => (
    <Star
      key={i}
      className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
    />
  ));
};

const FundCard: React.FC<{fund: typeof fundData[0]}> = ({ fund }) => {
  return (
    <Link to={`/invest/mutual-fund/${fund.id}`} className="block">
      <div className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {/* Logo placeholder - can be replaced with actual logos */}
              <div className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center overflow-hidden">
                {fund.logo ? (
                  <img src={fund.logo} alt={fund.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-xs font-bold">{fund.name.charAt(0)}</div>
                )}
              </div>
              <h3 className="font-medium">{fund.name}</h3>
            </div>
            <p className="text-xs text-gray-500 mb-1">{fund.category}</p>
          </div>
          <span className={`text-xs px-3 py-1 rounded-full ${getRiskBadgeStyle(fund.riskLevel)}`}>
            {fund.riskLevel}
          </span>
        </div>
        
        <div className="mt-3 grid grid-cols-3 gap-3">
          <div className="text-center">
            <div className="text-xs text-gray-500">1D</div>
            <div className={`font-semibold flex items-center justify-center ${fund.returns.oneDay > 0 ? 'text-green-500' : 'text-red-500'}`}>
              <TrendingUp className={`h-3 w-3 mr-0.5 ${fund.returns.oneDay > 0 ? '' : 'transform rotate-180'}`} />
              {fund.returns.oneDay}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500">1Y</div>
            <div className={`font-semibold flex items-center justify-center ${fund.returns.oneYear > 0 ? 'text-green-500' : 'text-red-500'}`}>
              <TrendingUp className={`h-3 w-3 mr-0.5 ${fund.returns.oneYear > 0 ? '' : 'transform rotate-180'}`} />
              {fund.returns.oneYear}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500">3Y</div>
            <div className={`font-semibold flex items-center justify-center ${fund.returns.threeYear > 0 ? 'text-green-500' : 'text-red-500'}`}>
              <TrendingUp className={`h-3 w-3 mr-0.5 ${fund.returns.threeYear > 0 ? '' : 'transform rotate-180'}`} />
              {fund.returns.threeYear}%
            </div>
          </div>
        </div>
        
        <div className="mt-2 flex justify-end">
          <div className="flex">
            {renderStars(fund.rating)}
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400 ml-1" />
        </div>
      </div>
    </Link>
  );
};

const PopularFundsSection: React.FC = () => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Popular Funds</h2>
        <Link to="/invest/mutual-funds/popular" className="text-paygrow-green flex items-center">
          View All <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      
      <div>
        {fundData.map((fund) => (
          <FundCard key={fund.id} fund={fund} />
        ))}
      </div>
    </div>
  );
};

export default PopularFundsSection;
