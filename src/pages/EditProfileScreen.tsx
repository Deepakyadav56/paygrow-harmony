
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const EditProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSaveChanges = () => {
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
      variant: "success",
    });
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-background px-4 pb-20">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-background pt-4 pb-3 px-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/profile')}
              className="mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">Edit Profile</h1>
          </div>
          <Button variant="teal" size="sm" onClick={handleSaveChanges}>
            Save
          </Button>
        </div>
      </div>

      {/* Form Content */}
      <div className="mt-20 space-y-6">
        <div className="text-center mb-6">
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full bg-teal-100 border-2 border-teal-500 flex items-center justify-center overflow-hidden">
              <span className="text-3xl font-bold text-teal-600">JD</span>
            </div>
            <Button 
              className="absolute bottom-0 right-0 rounded-full bg-teal-600 p-1 h-8 w-8"
              size="icon"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path></svg>
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue="John" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="Doe" className="mt-1" />
            </div>
          </div>
          
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue="john.doe@example.com" className="mt-1" />
          </div>
          
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" defaultValue="+91 98765 43210" className="mt-1" />
          </div>
          
          <div>
            <Label htmlFor="dob">Date of Birth</Label>
            <Input id="dob" type="date" defaultValue="1990-01-15" className="mt-1" />
          </div>
          
          <div>
            <Label htmlFor="address">Address</Label>
            <Input id="address" defaultValue="123 Main Street" className="mt-1" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" defaultValue="Mumbai" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="pincode">PIN Code</Label>
              <Input id="pincode" defaultValue="400001" className="mt-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileScreen;
