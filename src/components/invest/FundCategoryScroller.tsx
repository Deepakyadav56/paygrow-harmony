
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { TrendingUp, Shield, Briefcase, PiggyBank, Lightbulb, Percent } from 'lucide-react';

// Fund categories data
const categories = [
  {
    name: 'Large Cap',
    description: 'Stable returns',
    icon: <Shield className="h-6 w-6 text-blue-600" />,
    route: '/invest/mutual-funds?category=large-cap',
  },
  {
    name: 'Mid Cap',
    description: 'Growth focused',
    icon: <TrendingUp className="h-6 w-6 text-green-600" />,
    route: '/invest/mutual-funds?category=mid-cap',
  },
  {
    name: 'Small Cap',
    description: 'High growth potential',
    icon: <Briefcase className="h-6 w-6 text-orange-600" />,
    route: '/invest/mutual-funds?category=small-cap',
  },
  {
    name: 'ELSS',
    description: 'Tax saving',
    icon: <Percent className="h-6 w-6 text-purple-600" />,
    route: '/invest/mutual-funds?category=elss',
  },
  {
    name: 'Index Funds',
    description: 'Market tracking',
    icon: <Lightbulb className="h-6 w-6 text-yellow-600" />,
    route: '/invest/mutual-funds?category=index',
  },
  {
    name: 'Debt Funds',
    description: 'Lower risk',
    icon: <PiggyBank className="h-6 w-6 text-cyan-600" />,
    route: '/invest/mutual-funds?category=debt',
  },
];

const FundCategoryScroller: React.FC = () => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Categories</h3>
        <Link to="/invest/mutual-funds" className="text-sm text-paygrow-blue">
          View All
        </Link>
      </div>
      
      <div className="overflow-x-auto pb-2 -mx-4 px-4">
        <div className="flex space-x-3">
          {categories.map((category, index) => (
            <Link to={category.route} key={index}>
              <Card className="w-32 p-3 border border-gray-200 hover:border-paygrow-blue hover:shadow-md transition-all">
                <div className="bg-gray-50 rounded-full p-2 w-12 h-12 flex items-center justify-center mb-2">
                  {category.icon}
                </div>
                <h4 className="font-medium text-sm">{category.name}</h4>
                <p className="text-xs text-gray-500">{category.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FundCategoryScroller;
