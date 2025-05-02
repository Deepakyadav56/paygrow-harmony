
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface FundInfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FundInfoModal: React.FC<FundInfoModalProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto rounded-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#00B5C8] font-bold">Information</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Fund Size:</h3>
              <p className="text-gray-700">
                Total money invested by all investors in a mutual fund.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">Expense Ratio:</h3>
              <p className="text-gray-700">
                Annual fee (as a % of fund size) charged by the fund for managing your money.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">Lock-in Period:</h3>
              <p className="text-gray-700">
                Minimum time you must stay invested before you can withdraw.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">Exit Load:</h3>
              <p className="text-gray-700">
                Fee charged if you withdraw money (partially or fully) before a specified time.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">NAV (Net Asset Value):</h3>
              <p className="text-gray-700">
                The price per unit of a mutual fund. It represents the total value of the fund's portfolio divided by the number of outstanding units.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">SIP (Systematic Investment Plan):</h3>
              <p className="text-gray-700">
                A method of investing a fixed amount regularly (typically monthly) in a mutual fund, allowing for rupee cost averaging over time.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">AUM (Assets Under Management):</h3>
              <p className="text-gray-700">
                The total market value of the investments that a mutual fund manages on behalf of investors.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">Fund Categories:</h3>
              <p className="text-gray-700">
                <strong>Large Cap:</strong> Funds that invest in large, established companies.<br/>
                <strong>Mid Cap:</strong> Funds that invest in medium-sized companies with growth potential.<br/>
                <strong>Small Cap:</strong> Funds that invest in smaller companies with high growth potential and higher risk.<br/>
                <strong>ELSS:</strong> Equity Linked Savings Scheme that offers tax benefits under Section 80C.
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default FundInfoModal;
