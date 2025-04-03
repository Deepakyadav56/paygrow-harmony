
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Star } from 'lucide-react';

interface FundFilterModalProps {
  open: boolean;
  onClose: () => void;
  onApply: () => void;
}

const FundFilterModal: React.FC<FundFilterModalProps> = ({ open, onClose, onApply }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 rounded-t-xl max-h-[90vh] overflow-auto">
        <DialogHeader className="p-4 border-b sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">Filter Funds</DialogTitle>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="absolute top-4 right-4">
            <button onClick={() => {}} className="text-indigo-600">
              Reset All
            </button>
          </div>
        </DialogHeader>
        
        <div className="p-4">
          <h3 className="text-lg font-medium mb-4">Category</h3>
          <div className="grid grid-cols-2 gap-y-3">
            <div className="flex items-center">
              <input type="radio" id="equity" name="category" className="h-4 w-4 mr-2 accent-indigo-600" />
              <label htmlFor="equity" className="text-gray-700">Equity</label>
            </div>
            <div className="flex items-center">
              <input type="radio" id="elss" name="category" className="h-4 w-4 mr-2 accent-indigo-600" />
              <label htmlFor="elss" className="text-gray-700">ELSS</label>
            </div>
            <div className="flex items-center">
              <input type="radio" id="debt" name="category" className="h-4 w-4 mr-2 accent-indigo-600" />
              <label htmlFor="debt" className="text-gray-700">Debt</label>
            </div>
          </div>
          
          <h3 className="text-lg font-medium mt-6 mb-4">Risk Level</h3>
          <div className="grid grid-cols-2 gap-y-3">
            <div className="flex items-center">
              <input type="radio" id="moderate" name="risk" className="h-4 w-4 mr-2 accent-indigo-600" />
              <label htmlFor="moderate" className="text-gray-700">Moderate</label>
            </div>
            <div className="flex items-center">
              <input type="radio" id="moderateHigh" name="risk" className="h-4 w-4 mr-2 accent-indigo-600" />
              <label htmlFor="moderateHigh" className="text-gray-700">Moderate to High</label>
            </div>
            <div className="flex items-center">
              <input type="radio" id="high" name="risk" className="h-4 w-4 mr-2 accent-indigo-600" />
              <label htmlFor="high" className="text-gray-700">High</label>
            </div>
            <div className="flex items-center">
              <input type="radio" id="low" name="risk" className="h-4 w-4 mr-2 accent-indigo-600" />
              <label htmlFor="low" className="text-gray-700">Low</label>
            </div>
          </div>
          
          <h3 className="text-lg font-medium mt-6 mb-4">Rating</h3>
          <div className="grid grid-cols-2 gap-y-3">
            <div className="flex items-center">
              <input type="radio" id="5star" name="rating" className="h-4 w-4 mr-2 accent-indigo-600" />
              <label htmlFor="5star" className="text-gray-700 flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="ml-1">(Only)</span>
              </label>
            </div>
            <div className="flex items-center">
              <input type="radio" id="4star" name="rating" className="h-4 w-4 mr-2 accent-indigo-600" />
              <label htmlFor="4star" className="text-gray-700 flex items-center">
                <div className="flex">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                  <Star className="h-4 w-4 text-gray-300" />
                </div>
              </label>
            </div>
            <div className="flex items-center">
              <input type="radio" id="3star" name="rating" className="h-4 w-4 mr-2 accent-indigo-600" />
              <label htmlFor="3star" className="text-gray-700 flex items-center">
                <div className="flex">
                  {[...Array(3)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                  {[...Array(2)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-gray-300" />
                  ))}
                </div>
              </label>
            </div>
            <div className="flex items-center">
              <input type="radio" id="2star" name="rating" className="h-4 w-4 mr-2 accent-indigo-600" />
              <label htmlFor="2star" className="text-gray-700 flex items-center">
                <div className="flex">
                  {[...Array(2)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                  {[...Array(3)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-gray-300" />
                  ))}
                </div>
              </label>
            </div>
          </div>
          
          <h3 className="text-lg font-medium mt-6 mb-4">Fund House</h3>
          <div className="grid grid-cols-2 gap-y-3">
            <div className="flex items-center">
              <input type="checkbox" id="hdfc" className="h-4 w-4 mr-2 accent-indigo-600" />
              <label htmlFor="hdfc" className="text-gray-700">HDFC Mutual Fund</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="sbi" className="h-4 w-4 mr-2 accent-indigo-600" />
              <label htmlFor="sbi" className="text-gray-700">SBI Mutual Fund</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="axis" className="h-4 w-4 mr-2 accent-indigo-600" />
              <label htmlFor="axis" className="text-gray-700">Axis Mutual Fund</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="kotak" className="h-4 w-4 mr-2 accent-indigo-600" />
              <label htmlFor="kotak" className="text-gray-700">Kotak Mutual Fund</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="icici" className="h-4 w-4 mr-2 accent-indigo-600" />
              <label htmlFor="icici" className="text-gray-700">ICICI Prudential</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="aditya" className="h-4 w-4 mr-2 accent-indigo-600" />
              <label htmlFor="aditya" className="text-gray-700">Aditya Birla Sun Life</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="mirae" className="h-4 w-4 mr-2 accent-indigo-600" />
              <label htmlFor="mirae" className="text-gray-700">Mirae Asset</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="ppfas" className="h-4 w-4 mr-2 accent-indigo-600" />
              <label htmlFor="ppfas" className="text-gray-700">PPFAS</label>
            </div>
          </div>
        </div>
        
        <DialogFooter className="sticky bottom-0 w-full p-4 border-t bg-white">
          <Button 
            className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 text-lg" 
            onClick={onApply}
          >
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FundFilterModal;
