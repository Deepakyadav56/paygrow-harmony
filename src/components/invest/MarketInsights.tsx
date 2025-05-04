
import React from 'react';
import { TrendingUp, ArrowUpRight, ArrowDownRight, ExternalLink, Info, Calendar } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

interface MarketNews {
  id: number;
  title: string;
  summary: string;
  source: string;
  timestamp: string;
  category: 'market' | 'funds' | 'economy' | 'analysis';
  impact: 'positive' | 'negative' | 'neutral';
  url: string;
}

interface MarketTrend {
  name: string;
  value: string;
  change: number;
  isPositive: boolean;
}

// Mock data for market insights
const marketNews: MarketNews[] = [
  {
    id: 1,
    title: "RBI's Monetary Policy: Key Impact on Debt Funds",
    summary: "The Reserve Bank of India maintained its repo rate, offering stability to debt fund investors and potentially improving returns in the medium term.",
    source: "Financial Express",
    timestamp: "2 hours ago",
    category: 'economy',
    impact: 'positive',
    url: "#"
  },
  {
    id: 2,
    title: "IT Sector Rally: Tech Funds Show Strong Performance",
    summary: "Technology-focused mutual funds have shown exceptional quarterly results, with an average return of 18% driven by the recent rally in IT stocks.",
    source: "Economic Times",
    timestamp: "5 hours ago",
    category: 'funds',
    impact: 'positive',
    url: "#"
  },
  {
    id: 3,
    title: "Global Inflation Concerns: Impact on Market Outlook",
    summary: "Rising global inflation figures have created uncertainty in markets, potentially affecting equity fund performance in the upcoming quarter.",
    source: "Bloomberg",
    timestamp: "1 day ago",
    category: 'economy',
    impact: 'negative',
    url: "#"
  }
];

const marketTrends: MarketTrend[] = [
  {
    name: 'Nifty 50',
    value: '22,650.75',
    change: 0.42,
    isPositive: true
  },
  {
    name: 'Sensex',
    value: '74,572.30',
    change: 0.38,
    isPositive: true
  },
  {
    name: 'Bank Nifty',
    value: '48,124.80',
    change: -0.21,
    isPositive: false
  },
  {
    name: 'IT Index',
    value: '36,785.45',
    change: 1.05,
    isPositive: true
  }
];

const MarketInsights: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="p-5 border border-fountain-blue-100 shadow-sm rounded-xl overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <TrendingUp className="text-fountain-blue-500 mr-2 h-5 w-5" />
            <h3 className="text-lg font-medium text-gray-800">Market Pulse</h3>
          </div>
          <Badge className="bg-fountain-blue-100 text-fountain-blue-700 hover:bg-fountain-blue-200">
            <Calendar className="h-3 w-3 mr-1" />
            {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
          </Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {marketTrends.map((trend, index) => (
            <div key={index} className="bg-gray-50 hover:bg-fountain-blue-50 transition-colors p-3 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">{trend.name}</div>
              <div className="text-lg font-semibold">{trend.value}</div>
              <div className={`flex items-center text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.isPositive ? 
                  <ArrowUpRight className="h-3 w-3 mr-0.5" /> : 
                  <ArrowDownRight className="h-3 w-3 mr-0.5" />
                }
                {Math.abs(trend.change)}%
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="mb-2">
          <h4 className="font-medium text-gray-700 mb-3">Market Updates</h4>
          <div className="space-y-4">
            {marketNews.map((news) => (
              <div key={news.id} className="border-l-2 pl-3 hover:border-fountain-blue-500 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className={`
                    ${news.impact === 'positive' ? 'bg-green-100 text-green-700' : 
                      news.impact === 'negative' ? 'bg-red-100 text-red-700' : 
                      'bg-gray-100 text-gray-700'}
                  `}>
                    {news.impact === 'positive' ? 'Bullish' : 
                     news.impact === 'negative' ? 'Bearish' : 'Neutral'}
                  </Badge>
                  <Badge variant="outline" className="bg-gray-50">
                    {news.category === 'market' ? 'Market' :
                     news.category === 'funds' ? 'Funds' :
                     news.category === 'economy' ? 'Economy' : 'Analysis'}
                  </Badge>
                  <span className="text-xs text-gray-500 ml-auto">{news.timestamp}</span>
                </div>
                <h5 className="font-medium text-gray-800 mb-1">{news.title}</h5>
                <p className="text-sm text-gray-600 mb-2">{news.summary}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Source: {news.source}</span>
                  <Button variant="link" size="sm" className="h-auto p-0 text-fountain-blue-600" asChild>
                    <Link to={news.url}>
                      Read More <ExternalLink className="h-3 w-3 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 text-center">
          <Button 
            variant="outline" 
            className="border-fountain-blue-200 text-fountain-blue-600 hover:bg-fountain-blue-50 rounded-full"
            asChild
          >
            <Link to="/invest/research">
              View Detailed Market Analysis
            </Link>
          </Button>
        </div>
      </Card>

      <div className="bg-fountain-blue-50 p-4 rounded-xl border border-fountain-blue-100 flex items-start">
        <Info className="h-5 w-5 text-fountain-blue-500 mr-3 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-medium text-fountain-blue-700 mb-1">Investment Advisor</h4>
          <p className="text-sm text-fountain-blue-800">
            Market trends suggest a positive outlook for diversified equity funds. Consider reviewing your portfolio allocation to align with current market conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarketInsights;
