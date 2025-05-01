
import React, { useState } from 'react';
import { ArrowLeft, Send, MessageSquare } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

const AmountEntryScreen: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const navigate = useNavigate();
  
  // Quick amount suggestions
  const quickAmounts = ['100', '200', '500', '1000', '2000'];
  
  const handleContinue = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    navigate('/payment/upi-pin');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white pt-12 pb-6 px-4 flex items-center">
        <Link to="/payment/contacts" className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Pay to</h1>
          <p className="text-white/80">Rahul Sharma • 9876543210</p>
        </div>
      </div>
      
      {/* Amount Entry */}
      <div className="flex-1 px-4 py-6 bg-gradient-to-br from-teal-50 to-white">
        <Card className="p-6 mb-6 border-teal-100">
          <div className="flex items-baseline mb-6">
            <span className="text-xl font-semibold mr-2 text-teal-700">₹</span>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-3xl font-bold border-none focus-visible:ring-0 p-0 h-auto text-teal-700"
              placeholder="0"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap mb-6">
            {quickAmounts.map((quickAmount) => (
              <Button
                key={quickAmount}
                variant="outline"
                onClick={() => setAmount(quickAmount)}
                className="flex-grow border-teal-200 hover:bg-teal-50 hover:text-teal-700"
              >
                ₹{quickAmount}
              </Button>
            ))}
          </div>
          
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-teal-400" />
            <Textarea
              placeholder="Add a note (optional)"
              className="pl-10 border-teal-200 focus:border-teal-400"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </Card>
        
        <Button 
          className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white hover:from-teal-700 hover:to-teal-800"
          disabled={!amount || parseFloat(amount) <= 0}
          onClick={handleContinue}
        >
          <Send className="mr-2 h-5 w-5" />
          Continue
        </Button>
      </div>
    </div>
  );
};

export default AmountEntryScreen;
