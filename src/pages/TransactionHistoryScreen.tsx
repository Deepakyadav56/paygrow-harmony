
import React, { useState } from 'react';
import { ArrowLeft, Search, Calendar, Download, ArrowUpRight, ArrowDownLeft, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for transactions
const transactions = [
  {
    id: 1,
    type: 'payment',
    direction: 'outgoing',
    amount: 500,
    recipient: 'Rahul Sharma',
    date: '2025-07-10T14:32:00',
    status: 'completed',
    category: 'friends',
  },
  {
    id: 2,
    type: 'investment',
    direction: 'outgoing',
    amount: 5000,
    recipient: 'Axis Bluechip Fund',
    date: '2025-07-08T10:15:00',
    status: 'completed',
    category: 'mutual-fund',
  },
  {
    id: 3,
    type: 'payment',
    direction: 'incoming',
    amount: 1200,
    recipient: 'Priya Verma',
    date: '2025-07-05T18:45:00',
    status: 'completed',
    category: 'friends',
  },
  {
    id: 4,
    type: 'bill',
    direction: 'outgoing',
    amount: 1499,
    recipient: 'Jio Fiber',
    date: '2025-07-02T09:30:00',
    status: 'completed',
    category: 'bills',
  },
  {
    id: 5,
    type: 'payment',
    direction: 'outgoing',
    amount: 850,
    recipient: 'Swiggy',
    date: '2025-06-28T20:15:00',
    status: 'completed',
    category: 'food',
  },
  {
    id: 6,
    type: 'investment',
    direction: 'outgoing',
    amount: 1000,
    recipient: 'SBI Small Cap Fund',
    date: '2025-06-21T11:20:00',
    status: 'completed',
    category: 'mutual-fund',
  },
];

const TransactionHistoryScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter transactions based on search query and active tab
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.amount.toString().includes(searchQuery);
    
    const matchesTab = 
      activeTab === 'all' ||
      (activeTab === 'payments' && transaction.type === 'payment') ||
      (activeTab === 'investments' && transaction.type === 'investment') ||
      (activeTab === 'bills' && transaction.type === 'bill');
    
    return matchesSearch && matchesTab;
  });
  
  // Group transactions by date for display
  const groupedTransactions: Record<string, typeof transactions> = {};
  
  filteredTransactions.forEach(transaction => {
    const date = new Date(transaction.date);
    const dateKey = date.toISOString().split('T')[0];
    
    if (!groupedTransactions[dateKey]) {
      groupedTransactions[dateKey] = [];
    }
    
    groupedTransactions[dateKey].push(transaction);
  });
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };
  
  return (
    <div className="min-h-screen flex flex-col pb-6">
      {/* Header */}
      <div className="bg-paygrow-blue text-white pt-12 pb-6 px-4 flex items-center">
        <Link to="/profile" className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold">Transaction History</h1>
      </div>
      
      {/* Search & Filters */}
      <div className="px-4 py-4 bg-white sticky top-0 z-10 border-b">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            className="pl-10 bg-gray-100"
            placeholder="Search by name, amount"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <Button variant="outline" size="sm" className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            All Time
          </Button>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="investments">Investments</TabsTrigger>
            <TabsTrigger value="bills">Bills</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Transactions List */}
      <div className="flex-1 px-4 py-4">
        {Object.keys(groupedTransactions).length > 0 ? (
          Object.keys(groupedTransactions)
            .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
            .map(dateKey => (
              <div key={dateKey} className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-3">{formatDate(dateKey)}</h3>
                
                <div className="space-y-3">
                  {groupedTransactions[dateKey].map(transaction => (
                    <Card key={transaction.id} className="p-3 flex items-center">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${
                        transaction.direction === 'incoming' ? 'bg-green-100' : 
                        transaction.type === 'investment' ? 'bg-blue-100' : 'bg-red-100'
                      }`}>
                        {transaction.direction === 'incoming' ? (
                          <ArrowDownLeft className={`h-5 w-5 ${
                            transaction.direction === 'incoming' ? 'text-green-600' : 'text-red-600'
                          }`} />
                        ) : (
                          <ArrowUpRight className={`h-5 w-5 ${
                            transaction.type === 'investment' ? 'text-blue-600' : 'text-red-600'
                          }`} />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <p className="font-medium">{transaction.recipient}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(transaction.date).toLocaleTimeString('en-IN', { 
                            hour: '2-digit', 
                            minute: '2-digit',
                            hour12: true
                          })}
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <p className={`font-medium ${
                          transaction.direction === 'incoming' ? 'text-green-600' : 
                          transaction.type === 'investment' ? 'text-blue-600' : 'text-red-600'
                        }`}>
                          {transaction.direction === 'incoming' ? '+' : '-'}₹{transaction.amount}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">{transaction.category.replace('-', ' ')}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No transactions found</p>
            <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistoryScreen;
