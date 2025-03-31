
import React from 'react';
import { Card } from "@/components/ui/card";
import { motion } from "@/components/ui/motion";
import { Percent, TrendingUp, Shield, FileText, Leaf, Briefcase, AreaChart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CategoryProps {
  icon: React.ReactNode;
  name: string;
  description: string;
  color: string;
  path: string;
}

const categories: CategoryProps[] = [
  {
    icon: <TrendingUp size={20} />,
    name: "High Return",
    description: "Funds with highest returns",
    color: "bg-gradient-to-br from-red-500 to-orange-400",
    path: "/invest/mutual-funds?category=high-return"
  },
  {
    icon: <Shield size={20} />,
    name: "Low Risk",
    description: "Stable & secure funds",
    color: "bg-gradient-to-br from-blue-500 to-cyan-400",
    path: "/invest/mutual-funds?category=low-risk"
  },
  {
    icon: <FileText size={20} />,
    name: "Tax Saving",
    description: "ELSS & tax efficient funds",
    color: "bg-gradient-to-br from-green-500 to-emerald-400",
    path: "/invest/mutual-funds?category=tax-saving"
  },
  {
    icon: <Percent size={20} />,
    name: "High Yield",
    description: "Dividend focused funds",
    color: "bg-gradient-to-br from-purple-500 to-violet-400",
    path: "/invest/mutual-funds?category=high-yield"
  },
  {
    icon: <Leaf size={20} />,
    name: "ESG",
    description: "Sustainable investments",
    color: "bg-gradient-to-br from-green-600 to-teal-400",
    path: "/invest/mutual-funds?category=esg"
  },
  {
    icon: <Briefcase size={20} />,
    name: "Index",
    description: "Market index trackers",
    color: "bg-gradient-to-br from-indigo-500 to-purple-400",
    path: "/invest/mutual-funds?category=index"
  },
  {
    icon: <AreaChart size={20} />,
    name: "Sectoral",
    description: "Industry specific funds",
    color: "bg-gradient-to-br from-amber-500 to-yellow-400",
    path: "/invest/mutual-funds?category=sectoral"
  }
];

const FundCategoryScroller: React.FC = () => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Explore Categories</h2>
        <Link to="/invest/mutual-funds" className="text-sm text-paygrow-blue font-medium">
          View All
        </Link>
      </div>
      
      <div className="overflow-x-auto -mx-4 px-4 pb-4 scrollbar-none">
        <div className="flex gap-3">
          {categories.map((category, index) => (
            <Link to={category.path} key={index}>
              <motion.div
                className="min-w-[180px] h-[120px] rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                style={{ backgroundImage: `linear-gradient(140deg, var(--tw-gradient-from), var(--tw-gradient-to))` }}
                whileHover={{ scale: 1.03 }}
              >
                <div className={`p-2 rounded-full ${category.color} w-fit`}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="text-xs text-white/80">{category.description}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FundCategoryScroller;
