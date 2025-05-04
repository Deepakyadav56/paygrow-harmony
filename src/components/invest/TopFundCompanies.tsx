
import React from 'react';
import { Card } from '@/components/ui/card';
import { Building2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FundCompanyProps {
  name: string;
  aum: string;
  fundCount: number;
  logo: string; // Short code for logo
}

const TopFundCompanies: React.FC = () => {
  const topCompanies: FundCompanyProps[] = [
    {
      name: "SBI Mutual Fund",
      aum: "₹8.5 trillion",
      fundCount: 156,
      logo: "SBI"
    },
    {
      name: "HDFC Mutual Fund",
      aum: "₹7.2 trillion",
      fundCount: 142,
      logo: "HD"
    },
    {
      name: "ICICI Prudential MF",
      aum: "₹6.8 trillion",
      fundCount: 137,
      logo: "IC"
    },
    {
      name: "Axis Mutual Fund",
      aum: "₹5.1 trillion",
      fundCount: 97,
      logo: "AX"
    },
    {
      name: "Kotak Mahindra MF",
      aum: "₹4.9 trillion",
      fundCount: 94,
      logo: "KO"
    },
    {
      name: "Nippon India MF",
      aum: "₹4.7 trillion",
      fundCount: 102,
      logo: "NI"
    }
  ];

  return (
    <Card className="p-4 bg-gradient-to-br from-white to-teal-50 border border-teal-100/50 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <Building2 className="w-5 h-5 text-teal-600 mr-2" />
          <h3 className="font-semibold text-gray-900">Top AMC Companies</h3>
        </div>
        <Button variant="ghost" size="sm" className="text-teal-600 text-xs flex items-center">
          View All <ExternalLink className="ml-1 w-3 h-3" />
        </Button>
      </div>
      
      <div className="space-y-3">
        {topCompanies.map((company, index) => (
          <div key={index} className="flex items-center p-2 bg-white rounded-lg hover:shadow-sm transition-shadow border border-teal-50">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold mr-3 bg-teal-${(index % 4) * 100 + 300} text-teal-${(index % 2 === 0) ? '900' : '50'}`}>
              {company.logo}
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm text-gray-800">{company.name}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>AUM: {company.aum}</span>
                <span>{company.fundCount} funds</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TopFundCompanies;
