
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

// Mock data for company funds
const companyFunds = [
  {
    id: 101,
    name: 'PayGrow Value Fund',
    returns: 14.58,
    logoUrl: '/lovable-uploads/65816e74-7f44-49f3-875a-fd49de062998.png'
  },
  {
    id: 102,
    name: 'PayGrow Large Cap Fund',
    returns: 12.35,
    logoUrl: '/lovable-uploads/65816e74-7f44-49f3-875a-fd49de062998.png'
  }
];

const CompanyFundsSection: React.FC = () => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Funds by PayGrow</h2>
        <Link to="/invest/company-funds" className="text-paygrow-blue text-sm">
          View all
        </Link>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {companyFunds.map((fund) => (
          <Link key={fund.id} to={`/invest/mutual-fund/${fund.id}`}>
            <Card className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 mr-3 rounded-full bg-gradient-to-r from-paygrow-blue to-blue-500 flex items-center justify-center">
                  <img 
                    src={fund.logoUrl} 
                    alt="PayGrow" 
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <h3 className="text-sm font-medium">{fund.name}</h3>
              </div>
              
              <div className="flex items-center mt-2">
                <p className="text-xl font-bold text-green-600">{fund.returns}%</p>
                <span className="text-xs text-gray-500 ml-1">3Y</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CompanyFundsSection;
