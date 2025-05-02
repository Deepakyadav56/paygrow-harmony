
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload, Check, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';

const KYCVerificationScreen: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmitKYC = () => {
    toast({
      title: "KYC submitted",
      description: "Your KYC documents have been submitted for verification",
      variant: "success",
    });
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-background px-4 pb-20">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-background pt-4 pb-3 px-4 border-b">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/profile')}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">KYC Verification</h1>
        </div>
      </div>

      {/* Status Banner */}
      <div className="mt-20 mb-6">
        <Card className="bg-amber-50 border border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
              <div>
                <p className="font-medium text-amber-800">Verification Pending</p>
                <p className="text-sm text-amber-700 mt-1">Complete your KYC to unlock all features</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Form Content */}
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="panCard">PAN Card Number</Label>
                <Input id="panCard" placeholder="ABCDE1234F" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="aadhar">Aadhar Number</Label>
                <Input id="aadhar" placeholder="XXXX XXXX XXXX" className="mt-1" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Document Upload</h2>
          
          <div className="space-y-4">
            <div>
              <Label className="block mb-2">PAN Card (Front)</Label>
              <div className="border-2 border-dashed rounded-lg p-6 border-gray-300 bg-gray-50 text-center">
                <div className="flex flex-col items-center">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm font-medium text-gray-700">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG or PDF (Max 5MB)</p>
                  <Button variant="outline" className="mt-4">Browse Files</Button>
                </div>
              </div>
            </div>

            <div>
              <Label className="block mb-2">Aadhar Card (Front)</Label>
              <div className="border-2 border-dashed rounded-lg p-6 border-gray-300 bg-gray-50 text-center">
                <div className="flex flex-col items-center">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm font-medium text-gray-700">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG or PDF (Max 5MB)</p>
                  <Button variant="outline" className="mt-4">Browse Files</Button>
                </div>
              </div>
            </div>

            <div>
              <Label className="block mb-2">Aadhar Card (Back)</Label>
              <div className="border-2 border-dashed rounded-lg p-6 border-gray-300 bg-gray-50 text-center">
                <div className="flex flex-col items-center">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm font-medium text-gray-700">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG or PDF (Max 5MB)</p>
                  <Button variant="outline" className="mt-4">Browse Files</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Button 
            className="w-full bg-teal-600 hover:bg-teal-700"
            size="lg"
            onClick={handleSubmitKYC}
          >
            <Check className="mr-2 h-5 w-5" /> Submit KYC Documents
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KYCVerificationScreen;
