
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { TrendingUp, Shield, Briefcase, PiggyBank, Lightbulb, Percent, ArrowRight } from 'lucide-react';
import { motion } from '@/components/ui/motion';

// Fund categories data
const categories = [
  {
    name: 'Large Cap',
    description: 'Stable returns',
    icon: <Shield className="h-6 w-6 text-blue-600" />,
    route: '/invest/mutual-funds?category=large-cap',
    bgColor: 'bg-blue-50',
  },
  {
    name: 'Mid Cap',
    description: 'Growth focused',
    icon: <TrendingUp className="h-6 w-6 text-green-600" />,
    route: '/invest/mutual-funds?category=mid-cap',
    bgColor: 'bg-green-50',
  },
  {
    name: 'Small Cap',
    description: 'High growth potential',
    icon: <Briefcase className="h-6 w-6 text-orange-600" />,
    route: '/invest/mutual-funds?category=small-cap',
    bgColor: 'bg-orange-50',
  },
  {
    name: 'ELSS',
    description: 'Tax saving',
    icon: <Percent className="h-6 w-6 text-purple-600" />,
    route: '/invest/mutual-funds?category=elss',
    bgColor: 'bg-purple-50',
  },
  {
    name: 'Index Funds',
    description: 'Market tracking',
    icon: <Lightbulb className="h-6 w-6 text-yellow-600" />,
    route: '/invest/mutual-funds?category=index',
    bgColor: 'bg-yellow-50',
  },
  {
    name: 'Debt Funds',
    description: 'Lower risk',
    icon: <PiggyBank className="h-6 w-6 text-cyan-600" />,
    route: '/invest/mutual-funds?category=debt',
    bgColor: 'bg-cyan-50',
  },
];

const FundCategoryScroller: React.FC = () => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Categories</h3>
        <Link to="/invest/mutual-funds" className="text-sm text-paygrow-blue flex items-center">
          View All <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      
      <div className="overflow-x-auto pb-2 -mx-4 px-4">
        <div className="flex space-x-3">
          {categories.map((category, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Link to={category.route}>
                <Card className="w-32 p-3 border border-gray-100 hover:border-paygrow-blue hover:shadow-md transition-all">
                  <div className={`${category.bgColor} rounded-full p-2 w-12 h-12 flex items-center justify-center mb-2`}>
                    {category.icon}
                  </div>
                  <h4 className="font-medium text-sm">{category.name}</h4>
                  <p className="text-xs text-gray-500">{category.description}</p>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FundCategoryScroller;
