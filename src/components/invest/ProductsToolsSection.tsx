
import React from 'react';
import { Link } from 'react-router-dom';
import { Download, Megaphone, Percent, Scale, ShoppingCart, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ProductsToolsSection: React.FC = () => {
  const tools = [
    { icon: <Download className="h-6 w-6 text-paygrow-green" />, label: 'Import funds', path: '/invest/import' },
    { 
      icon: <Megaphone className="h-6 w-6 text-paygrow-green" />, 
      label: 'NFOs', 
      path: '/invest/nfos',
      badge: '2'
    },
    { icon: <Percent className="h-6 w-6 text-paygrow-green" />, label: 'SIP calculator', path: '/sip-calculator' },
    { icon: <Scale className="h-6 w-6 text-paygrow-green" />, label: 'Compare funds', path: '/invest/compare' },
  ];

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4">Products & tools</h2>
      
      <div className="grid grid-cols-4 gap-4 mb-6">
        {tools.map((tool, index) => (
          <Link key={index} to={tool.path} className="flex flex-col items-center relative">
            <div className="bg-gray-100 w-14 h-14 rounded-full flex items-center justify-center mb-2">
              {tool.icon}
              {tool.badge && (
                <Badge className="absolute -top-1 -right-1 bg-paygrow-green px-1.5 min-w-5 h-5">
                  {tool.badge}
                </Badge>
              )}
            </div>
            <span className="text-xs text-gray-600 text-center">{tool.label}</span>
          </Link>
        ))}
      </div>
      
      <Link to="/invest/cart" className="flex justify-between items-center p-4 border border-gray-200 rounded-xl mb-6">
        <div className="flex items-center">
          <ShoppingCart className="h-5 w-5 text-paygrow-green mr-3" />
          <span className="font-medium">Cart</span>
        </div>
        <div className="flex items-center">
          <Badge className="bg-gray-200 text-gray-700 mr-2">1</Badge>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </div>
      </Link>
    </div>
  );
};

export default ProductsToolsSection;
