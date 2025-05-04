
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, QrCode, Users, ArrowRight, CreditCard, Calendar, Clock } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';
import { Link } from 'react-router-dom';

// Mock contacts data
const contacts = [
  { id: 1, name: 'Arun Kumar', phone: '9876543210', recent: true },
  { id: 2, name: 'Priya Singh', phone: '8765432109', recent: true },
  { id: 3, name: 'Rajesh Verma', phone: '7654321098', recent: true },
  { id: 4, name: 'Sneha Gupta', phone: '6543210987', recent: false },
  { id: 5, name: 'Vishal Sharma', phone: '5432109876', recent: false },
  { id: 6, name: 'Neha Patel', phone: '4321098765', recent: false },
];

const PayScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
  );

  return (
    <div className="pb-20"> {/* Add padding at bottom for nav */}
      {/* Header */}
      <div className="bg-gradient-to-r from-fountain-blue-500 to-fountain-blue-700 text-white pt-12 pb-6 px-4">
        <h1 className="text-2xl font-bold mb-4">Pay & Transfer</h1>
        
        {/* Search bar */}
        <div className="relative flex items-center mb-4">
          <Search className="w-5 h-5 absolute left-3 text-gray-500" />
          <Input
            type="text"
            placeholder="Search by name, phone, or UPI ID"
            className="pl-10 bg-white rounded-full text-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Payment options */}
        <div className="grid grid-cols-3 gap-3 mb-2">
          <Card className="p-3 bg-white/10 backdrop-blur-sm border-none flex flex-col items-center">
            <QrCode className="h-6 w-6 mb-1" />
            <span className="text-xs">Scan QR</span>
          </Card>
          
          <Card className="p-3 bg-white/10 backdrop-blur-sm border-none flex flex-col items-center">
            <Users className="h-6 w-6 mb-1" />
            <span className="text-xs">To Contact</span>
          </Card>
          
          <Card className="p-3 bg-white/10 backdrop-blur-sm border-none flex flex-col items-center">
            <ArrowRight className="h-6 w-6 mb-1" />
            <span className="text-xs">Self Transfer</span>
          </Card>
        </div>
      </div>
      
      {/* Recent Contacts Section */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-medium">Recent Contacts</h2>
          <Link to="/contacts/all" className="text-sm text-fountain-blue-600">View All</Link>
        </div>
        
        <div className="flex overflow-x-auto pb-2 space-x-4 hide-scrollbar">
          {contacts.filter(c => c.recent).map((contact) => (
            <Link to={`/payment/contacts/${contact.id}`} key={contact.id} className="flex-shrink-0 flex flex-col items-center">
              <div className="w-14 h-14 bg-fountain-blue-100 rounded-full flex items-center justify-center mb-1 text-fountain-blue-700 font-semibold">
                {contact.name.charAt(0)}
              </div>
              <span className="text-xs font-medium">{contact.name.split(' ')[0]}</span>
            </Link>
          ))}
        </div>
      </div>
      
      {/* All Contacts Section */}
      <div className="bg-gray-50 p-4 rounded-t-xl -mx-1">
        <h2 className="text-lg font-medium mb-4">All Contacts</h2>
        
        <div className="space-y-2">
          {filteredContacts.map((contact) => (
            <Link to={`/payment/contacts/${contact.id}`} key={contact.id}>
              <Card className="p-3 flex items-center hover:bg-fountain-blue-50 transition-colors">
                <div className="w-10 h-10 bg-fountain-blue-100 rounded-full flex items-center justify-center mr-3 text-fountain-blue-700 font-semibold">
                  {contact.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-xs text-gray-500">{contact.phone}</p>
                </div>
              </Card>
            </Link>
          ))}
          
          {filteredContacts.length === 0 && (
            <Card className="p-4 text-center">
              <p className="text-gray-500">No contacts found</p>
            </Card>
          )}
        </div>
      </div>
      
      {/* Quick Access Features */}
      <div className="p-4">
        <h2 className="text-lg font-medium mb-3">Quick Access</h2>
        
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-fountain-blue-100 flex items-center justify-center mr-2">
                <CreditCard className="w-4 h-4 text-fountain-blue-600" />
              </div>
              <span className="font-medium">Pay Bills</span>
            </div>
            <p className="text-xs text-gray-500">Utilities, recharges & more</p>
          </Card>
          
          <Card className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-fountain-blue-100 flex items-center justify-center mr-2">
                <Calendar className="w-4 h-4 text-fountain-blue-600" />
              </div>
              <span className="font-medium">Scheduled</span>
            </div>
            <p className="text-xs text-gray-500">Set up recurring payments</p>
          </Card>
          
          <Card className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-fountain-blue-100 flex items-center justify-center mr-2">
                <Clock className="w-4 h-4 text-fountain-blue-600" />
              </div>
              <span className="font-medium">History</span>
            </div>
            <p className="text-xs text-gray-500">View past transactions</p>
          </Card>
          
          <Card className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-fountain-blue-100 flex items-center justify-center mr-2">
                <QrCode className="w-4 h-4 text-fountain-blue-600" />
              </div>
              <span className="font-medium">My QR Code</span>
            </div>
            <p className="text-xs text-gray-500">Receive payments easily</p>
          </Card>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default PayScreen;
