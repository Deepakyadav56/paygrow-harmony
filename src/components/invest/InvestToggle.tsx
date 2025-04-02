
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface InvestToggleProps {
  value: string;
  onValueChange: (value: string) => void;
}

const InvestToggle: React.FC<InvestToggleProps> = ({ value, onValueChange }) => {
  return (
    <div className="w-full">
      <ToggleGroup 
        type="single" 
        value={value} 
        onValueChange={(value) => {
          if (value) onValueChange(value);
        }}
        className="bg-gray-100 p-1 rounded-full w-full"
      >
        <ToggleGroupItem 
          value="sip" 
          className={`w-1/2 rounded-full text-sm font-medium transition-all duration-200 ${
            value === 'sip' 
              ? 'bg-blue-600 text-white shadow-sm' 
              : 'text-gray-600 hover:bg-gray-200'
          }`}
        >
          SIP
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="onetime" 
          className={`w-1/2 rounded-full text-sm font-medium transition-all duration-200 ${
            value === 'onetime' 
              ? 'bg-blue-600 text-white shadow-sm' 
              : 'text-gray-600 hover:bg-gray-200'
          }`}
        >
          One-time
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default InvestToggle;
