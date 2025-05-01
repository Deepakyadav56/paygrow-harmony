import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

interface LocationState {
  amount: number;
  fundName: string;
  units: number;
  folioNumber: string;
}

const RedemptionConfirmationScreen: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { amount, fundName, units, folioNumber } = location.state as LocationState;

  const handleConfirmRedemption = () => {
    // Simulate successful redemption
    setTimeout(() => {
      navigate('/invest/portfolio', { replace: true });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white dark:bg-gray-800 shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center">Redemption Confirmation</h1>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 dark:text-gray-300 sm:text-lg sm:leading-7">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-8 w-8 text-teal-500" />
                  <span className="font-semibold">Confirmation Details:</span>
                </div>
                <ul className="list-disc pl-5">
                  <li>Fund Name: {fundName}</li>
                  <li>Units to Redeem: {units}</li>
                  <li>Estimated Amount: ₹{amount}</li>
                  <li>Folio Number: {folioNumber}</li>
                </ul>
                <div className="bg-yellow-50 dark:bg-yellow-900/50 border-l-4 border-yellow-500 dark:border-yellow-400 p-4">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
                    <span className="font-medium text-yellow-700 dark:text-yellow-300">Important:</span>
                  </div>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    The final redemption amount may vary slightly based on the NAV at the time of processing.
                  </p>
                </div>
              </div>
              <div className="pt-6 text-base font-semibold leading-6 sm:text-lg sm:leading-7 space-y-4">
                <Button onClick={handleConfirmRedemption} className="w-full bg-gradient-to-r from-teal-600 to-teal-500 text-white hover:from-teal-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50">
                  Confirm Redemption
                </Button>
                <Button variant="outline" asChild className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                  <Link to="/invest/portfolio">Cancel</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedemptionConfirmationScreen;
