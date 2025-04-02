
import React, { useState } from 'react';
import { ArrowLeft, Calendar, Info, CheckCircle2 } from 'lucide-react';
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const SIPSetupScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const defaultType = searchParams.get('type') === 'onetime' ? 'onetime' : 'sip';
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [investmentType, setInvestmentType] = useState<'sip' | 'onetime'>(defaultType as 'sip' | 'onetime');
  const [amount, setAmount] = useState(investmentType === 'onetime' ? '5000' : '500');
  const [date, setDate] = useState<Date | undefined>(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)); // Default to 7 days from now
  const [selectedDay, setSelectedDay] = useState(1); // Default SIP day
  const [isLoading, setIsLoading] = useState(false);
  
  // Quick amount suggestions
  const quickAmounts = investmentType === 'onetime' 
    ? ['1000', '5000', '10000', '25000']
    : ['500', '1000', '2500', '5000'];
    
  // SIP day options
  const sipDays = [1, 5, 10, 15, 20];
  
  const handleProceed = () => {
    if (!amount || parseFloat(amount) < (investmentType === 'onetime' ? 1000 : 500)) {
      toast({
        title: "Invalid amount",
        description: `Minimum investment amount is ₹${investmentType === 'onetime' ? 1000 : 500}`,
        variant: "destructive"
      });
      return;
    }

    if (investmentType === 'sip' && !date) {
      toast({
        title: "SIP Date Required",
        description: "Please select a date for your monthly SIP",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call, but proceed to order summary screen
    setTimeout(() => {
      setIsLoading(false);
      navigate('/invest/order-summary');
    }, 500);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white text-black py-4 px-4 flex items-center shadow-sm">
        <Link to={`/invest/mutual-fund/${id}`} className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-semibold">
          Invest
        </h1>
      </div>
      
      {/* Fund Info Card */}
      <div className="p-4">
        <Card className="p-6 mb-3 shadow-sm rounded-xl">
          <h2 className="text-2xl font-bold mb-1">HDFC Mid-Cap Opportunities Fund</h2>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-gray-700">Equity - Mid Cap</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-700">Moderate to High</span>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-gray-500 text-sm mb-1">NAV</p>
              <p className="text-2xl font-bold">₹{98.75}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">NAV Date</p>
              <p className="text-lg font-medium">30 Aug 2023</p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Investment Form */}
      <div className="flex-1 px-4">
        <Card className="p-5 mb-6 shadow-sm rounded-xl overflow-hidden">
          {/* Toggle between SIP and One-time */}
          <ToggleGroup 
            type="single" 
            value={investmentType}
            onValueChange={(value) => {
              if (value) {
                setInvestmentType(value as 'sip' | 'onetime');
                setAmount(value === 'onetime' ? '5000' : '500');
              }
            }}
            className="w-full bg-gray-100 p-1 rounded-full mb-6"
            pillStyle
          >
            <ToggleGroupItem 
              value="sip" 
              className="w-1/2 rounded-full py-3 text-center font-medium"
              pillStyle
            >
              SIP
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="onetime" 
              className="w-1/2 rounded-full py-3 text-center font-medium"
              pillStyle
            >
              One-time
            </ToggleGroupItem>
          </ToggleGroup>
          
          <h3 className="font-medium mb-4 text-gray-800">
            {investmentType === 'onetime' ? 'Enter one-time amount' : 'Enter monthly SIP amount'}
          </h3>
          
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-xl font-semibold text-gray-500">₹</span>
            </div>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pl-8 pr-4 py-6 text-xl font-bold border rounded-lg focus:ring-paygrow-blue focus:border-paygrow-blue block w-full"
              placeholder="0"
            />
          </div>
          
          <p className="text-sm text-gray-500 mb-4">
            Minimum {investmentType === 'sip' ? 'SIP' : 'investment'} amount: ₹{investmentType === 'onetime' ? '1,000' : '500'}
          </p>
          
          <div className="flex gap-2 flex-wrap mb-6">
            {quickAmounts.map((quickAmount) => (
              <Button
                key={quickAmount}
                variant="outline"
                onClick={() => setAmount(quickAmount)}
                className={`flex-grow rounded-full ${amount === quickAmount ? 'bg-blue-50 border-paygrow-blue text-paygrow-blue' : ''}`}
              >
                ₹{quickAmount}
              </Button>
            ))}
          </div>
          
          {investmentType === 'sip' && (
            <>
              <h3 className="font-medium mb-4 text-gray-800">SIP Date</h3>
              <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                {sipDays.map((day) => (
                  <Button
                    key={day}
                    type="button"
                    variant={selectedDay === day ? "default" : "outline"}
                    className={`rounded-full w-14 h-14 ${selectedDay === day ? 'bg-paygrow-blue text-white' : 'bg-white'}`}
                    onClick={() => setSelectedDay(day)}
                  >
                    {day}
                  </Button>
                ))}
              </div>
              
              <div className="mb-4">
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal p-5 bg-green-50 border-green-100 rounded-lg"
                >
                  <Calendar className="mr-2 h-5 w-5 text-green-600" />
                  Apr 1, 2025
                </Button>
              </div>
              
              <p className="text-sm text-blue-600 mb-4">
                First SIP will be debited on 01 May 2025
              </p>
            </>
          )}
        </Card>
        
        <Card className="p-5 mb-6 shadow-sm rounded-xl">
          <div className="flex items-start">
            <Info className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-lg mb-2">Important Information</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-gray-500 mt-2 mr-2"></span>
                  <span className="text-sm text-gray-700">
                    NAV applicable will be the NAV of the date on which your payment is realized.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-gray-500 mt-2 mr-2"></span>
                  <span className="text-sm text-gray-700">
                    Redemption of funds typically takes 2-3 working days to reflect in your bank account.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
        
        <Button 
          className="w-full bg-blue-500 text-white h-12 shadow-md rounded-lg font-medium text-base mb-6"
          onClick={handleProceed}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Continue to pay'}
        </Button>
      </div>
    </div>
  );
};

export default SIPSetupScreen;
