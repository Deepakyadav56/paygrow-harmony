
import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ArrowLeftRight, FileText, BarChart4, ArrowRight } from 'lucide-react';

const ProductsToolsSection: React.FC = () => {
  const tools = [
    {
      title: 'SIP Calculator',
      icon: <Calculator className="h-8 w-8 text-white" />,
      path: '/sip-calculator',
      bgColor: 'bg-indigo-500'
    },
    {
      title: 'Compare Funds',
      icon: <ArrowLeftRight className="h-8 w-8 text-white" />,
      path: '/invest/compare',
      bgColor: 'bg-teal-500'
    },
    {
      title: 'Import Portfolio',
      icon: <FileText className="h-8 w-8 text-white" />,
      path: '/invest/portfolio/import',
      bgColor: 'bg-amber-500'
    },
    {
      title: 'Tax Calculator',
      icon: <BarChart4 className="h-8 w-8 text-white" />,
      path: '/tax-calculator',
      bgColor: 'bg-cyan-500'
    }
  ];

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Products & Tools</h2>
        <Link to="/invest/tools" className="text-paygrow-green flex items-center">
          View All <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {tools.map((tool, index) => (
          <Link key={index} to={tool.path}>
            <div className={`${tool.bgColor} rounded-2xl p-6 flex flex-col items-center justify-center h-[120px]`}>
              <div className="mb-2">{tool.icon}</div>
              <h3 className="text-white font-medium text-lg">{tool.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsToolsSection;
