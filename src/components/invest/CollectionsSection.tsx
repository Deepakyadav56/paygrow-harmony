
import React from 'react';
import { TrendingUp, Clock, Receipt, Building, Building2, Warehouse } from 'lucide-react';
import CollectionItem from './CollectionItem';

const CollectionsSection: React.FC = () => {
  const collections = [
    { 
      icon: TrendingUp,
      title: 'High return',
      path: '/invest/mutual-funds?filter=high-return',
      iconColor: 'text-green-500'
    },
    { 
      icon: Clock,
      title: 'SIP with ₹500',
      path: '/invest/mutual-funds?filter=min-500',
      iconColor: 'text-blue-500'
    },
    { 
      icon: Receipt,
      title: 'Tax Saving',
      path: '/invest/mutual-funds?filter=tax-saving',
      iconColor: 'text-orange-500'
    },
    { 
      icon: Building,
      title: 'Large Cap',
      path: '/invest/mutual-funds?filter=large-cap',
      iconColor: 'text-purple-500'
    },
    { 
      icon: Building2,
      title: 'Mid Cap',
      path: '/invest/mutual-funds?filter=mid-cap',
      iconColor: 'text-indigo-500'
    },
    { 
      icon: Warehouse,
      title: 'Small Cap',
      path: '/invest/mutual-funds?filter=small-cap',
      iconColor: 'text-red-500'
    },
  ];

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4">Collections</h2>
      <div className="grid grid-cols-3 gap-y-6">
        {collections.map((collection, index) => (
          <CollectionItem 
            key={index}
            icon={collection.icon}
            title={collection.title}
            path={collection.path}
            iconColor={collection.iconColor}
          />
        ))}
      </div>
    </div>
  );
};

export default CollectionsSection;
