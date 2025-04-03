
import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Receipt, Building, Building2, Calculator, PiggyBank } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

const CollectionsSection: React.FC = () => {
  const collections = [
    { 
      title: 'High Returns',
      description: 'Funds with highest returns in 3-5 years',
      path: '/invest/mutual-funds?filter=high-return',
      icon: <TrendingUp className="h-6 w-6 text-white" />,
      bgColor: 'bg-purple-500',
      iconBgColor: 'bg-purple-400/30'
    },
    { 
      title: 'Tax Saving',
      description: 'Save taxes under section 80C with ELSS',
      path: '/invest/mutual-funds?filter=tax-saving',
      icon: <Receipt className="h-6 w-6 text-white" />,
      bgColor: 'bg-blue-500',
      iconBgColor: 'bg-blue-400/30'
    },
    { 
      title: 'SIP with ₹500',
      description: 'Start investing with just ₹500 per month',
      path: '/invest/mutual-funds?filter=min-500',
      icon: <Calculator className="h-6 w-6 text-white" />,
      bgColor: 'bg-green-500',
      iconBgColor: 'bg-green-400/30'
    },
    { 
      title: 'Large Cap',
      description: 'Stable funds investing in top 100 companies',
      path: '/invest/mutual-funds?filter=large-cap',
      icon: <Building className="h-6 w-6 text-white" />,
      bgColor: 'bg-red-500',
      iconBgColor: 'bg-red-400/30'
    },
    { 
      title: 'Mid Cap',
      description: 'Growth-oriented funds for medium-sized companies',
      path: '/invest/mutual-funds?filter=mid-cap',
      icon: <Building2 className="h-6 w-6 text-white" />,
      bgColor: 'bg-orange-500',
      iconBgColor: 'bg-orange-400/30'
    },
    { 
      title: 'Small Cap',
      description: 'High growth potential with smaller companies',
      path: '/invest/mutual-funds?filter=small-cap',
      icon: <PiggyBank className="h-6 w-6 text-white" />,
      bgColor: 'bg-pink-500',
      iconBgColor: 'bg-pink-400/30'
    },
  ];

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Collections</h2>
        <Link to="/invest/mutual-funds" className="text-paygrow-green flex items-center">
          View All <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {collections.map((collection, index) => (
          <Link key={index} to={collection.path} className="block">
            <div className={`p-5 rounded-2xl ${collection.bgColor} text-white h-full`}>
              <div className="flex justify-between mb-2">
                <h3 className="text-xl font-bold">{collection.title}</h3>
                <div className={`w-10 h-10 rounded-full ${collection.iconBgColor} flex items-center justify-center`}>
                  {collection.icon}
                </div>
              </div>
              <p className="text-sm text-white/90 mb-4">{collection.description}</p>
              <div className="flex items-center text-sm mt-auto">
                View all <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CollectionsSection;
