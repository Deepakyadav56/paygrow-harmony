
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, Bookmark, BarChart3, Award } from 'lucide-react';
import EnhancedFundCard from './EnhancedFundCard';
import { motion } from "@/components/ui/motion";

// Mock fund data
const featuredFunds = [
  {
    id: 1,
    name: 'Axis Bluechip Fund Direct Growth',
    category: 'Equity',
    subcategory: 'Large Cap',
    returns: {
      oneYear: 15.8,
      threeYear: 18.2,
      fiveYear: 16.4,
    },
    riskLevel: 'Moderate' as const,
    nav: 45.67,
    navDate: '12 Jun 2023',
    rating: 5,
    tags: ['Top Performer', 'Popular'],
    aum: '23,458 Cr',
    expenseRatio: 0.6,
    minInvestment: 500,
    trending: true,
    highlighted: true,
  },
  {
    id: 2,
    name: 'Mirae Asset Emerging Bluechip Fund Direct Growth',
    category: 'Equity',
    subcategory: 'Large & Mid Cap',
    returns: {
      oneYear: 22.3,
      threeYear: 24.6,
      fiveYear: 19.3,
    },
    riskLevel: 'High' as const,
    nav: 112.78,
    navDate: '12 Jun 2023',
    rating: 5,
    tags: ['High Returns'],
    aum: '28,712 Cr',
    expenseRatio: 0.75,
    minInvestment: 1000,
    trending: true,
  },
  {
    id: 3,
    name: 'Parag Parikh Flexi Cap Fund Direct Growth',
    category: 'Equity',
    subcategory: 'Flexi Cap',
    returns: {
      oneYear: 18.9,
      threeYear: 22.1,
      fiveYear: 18.7,
    },
    riskLevel: 'High' as const,
    nav: 61.32,
    navDate: '12 Jun 2023',
    rating: 5,
    tags: ['Flexi Cap'],
    aum: '35,642 Cr',
    expenseRatio: 0.68,
    minInvestment: 1000,
    trending: true,
  },
  {
    id: 4,
    name: 'HDFC Small Cap Fund Direct Growth',
    category: 'Equity',
    subcategory: 'Small Cap',
    returns: {
      oneYear: 24.5,
      threeYear: 28.7,
      fiveYear: 21.2,
    },
    riskLevel: 'Very High' as const,
    nav: 98.45,
    navDate: '12 Jun 2023',
    rating: 4,
    tags: ['Small Cap'],
    aum: '18,925 Cr',
    expenseRatio: 0.91,
    minInvestment: 500,
    trending: false,
  },
];

const bestSIPFunds = [
  {
    id: 5,
    name: 'SBI Bluechip Fund Direct Growth',
    category: 'Equity',
    subcategory: 'Large Cap',
    returns: {
      oneYear: 14.2,
      threeYear: 17.5,
      fiveYear: 15.8,
    },
    riskLevel: 'Moderate' as const,
    nav: 58.91,
    navDate: '12 Jun 2023',
    rating: 4,
    tags: ['SIP Friendly'],
    aum: '32,890 Cr',
    expenseRatio: 0.65,
    minInvestment: 500,
    trending: false,
  },
  {
    id: 6,
    name: 'ICICI Prudential Value Discovery Fund Direct Growth',
    category: 'Equity',
    subcategory: 'Value',
    returns: {
      oneYear: 16.8,
      threeYear: 19.3,
      fiveYear: 17.2,
    },
    riskLevel: 'High' as const,
    nav: 211.45,
    navDate: '12 Jun 2023',
    rating: 4,
    tags: ['Value'],
    aum: '30,456 Cr',
    expenseRatio: 0.83,
    minInvestment: 1000,
    trending: false,
    highlighted: true,
  },
];

const taxSavingFunds = [
  {
    id: 7,
    name: 'Axis Long Term Equity Fund Direct Growth',
    category: 'Equity',
    subcategory: 'ELSS',
    returns: {
      oneYear: 17.2,
      threeYear: 20.1,
      fiveYear: 16.8,
    },
    riskLevel: 'High' as const,
    nav: 74.32,
    navDate: '12 Jun 2023',
    rating: 5,
    tags: ['Tax Saving'],
    aum: '29,872 Cr',
    expenseRatio: 0.52,
    minInvestment: 500,
    trending: true,
    highlighted: true,
  },
  {
    id: 8,
    name: 'Mirae Asset Tax Saver Fund Direct Growth',
    category: 'Equity',
    subcategory: 'ELSS',
    returns: {
      oneYear: 18.5,
      threeYear: 22.3,
      fiveYear: 18.7,
    },
    riskLevel: 'High' as const,
    nav: 34.78,
    navDate: '12 Jun 2023',
    rating: 5,
    tags: ['Tax Saving'],
    aum: '12,456 Cr',
    expenseRatio: 0.69,
    minInvestment: 500,
    trending: true,
  },
];

const FeaturedFundsSection: React.FC = () => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Award className="text-paygrow-blue mr-2 h-5 w-5" />
          <h2 className="text-lg font-semibold text-gray-800">Featured Funds</h2>
        </div>
        <Link to="/invest/mutual-funds" className="text-sm text-paygrow-blue font-medium flex items-center">
          View All <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      
      <Tabs defaultValue="trending" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="trending" className="text-sm">
            <BarChart3 className="h-4 w-4 mr-1.5" />
            Trending
          </TabsTrigger>
          <TabsTrigger value="best-sip" className="text-sm">
            <Bookmark className="h-4 w-4 mr-1.5" />
            Best for SIP
          </TabsTrigger>
          <TabsTrigger value="tax-saving" className="text-sm">
            <Award className="h-4 w-4 mr-1.5" />
            Tax Saving
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="trending" className="space-y-4 mt-2">
          {featuredFunds.slice(0, 2).map((fund, index) => (
            <motion.div 
              key={fund.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <EnhancedFundCard fund={fund} />
            </motion.div>
          ))}
          
          <Link to="/invest/mutual-funds?category=trending">
            <Button variant="outline" className="w-full mt-2">
              View All Trending Funds <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </TabsContent>
        
        <TabsContent value="best-sip" className="space-y-4 mt-2">
          {bestSIPFunds.map((fund, index) => (
            <motion.div 
              key={fund.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <EnhancedFundCard fund={fund} />
            </motion.div>
          ))}
          
          <Link to="/invest/mutual-funds?category=sip">
            <Button variant="outline" className="w-full mt-2">
              View All SIP Friendly Funds <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </TabsContent>
        
        <TabsContent value="tax-saving" className="space-y-4 mt-2">
          {taxSavingFunds.map((fund, index) => (
            <motion.div 
              key={fund.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <EnhancedFundCard fund={fund} />
            </motion.div>
          ))}
          
          <Link to="/invest/mutual-funds?category=tax-saving">
            <Button variant="outline" className="w-full mt-2">
              View All Tax Saving Funds <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FeaturedFundsSection;
