
import React, { useState } from 'react';
import { ArrowLeft, Camera, Mail, Phone, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

const EditProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: 'Rahul Sharma',
    email: 'rahul.sharma@gmail.com',
    phone: '9876543210',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSave = () => {
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill all the required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully",
      });
      
      navigate('/profile');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-paygrow-blue text-white pt-12 pb-6 px-4 flex items-center">
        <Link to="/profile" className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold">Edit Profile</h1>
      </div>
      
      {/* Profile Picture */}
      <div className="bg-white flex flex-col items-center py-6 border-b">
        <div className="relative mb-3">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <User className="w-12 h-12 text-gray-400" />
          </div>
          <Button 
            variant="secondary" 
            size="sm" 
            className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0"
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="link" className="text-paygrow-blue">Change Profile Picture</Button>
      </div>
      
      {/* Edit Form */}
      <div className="flex-1 p-4">
        <Card className="p-4 mb-6">
          <h3 className="font-medium mb-4">Personal Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="Enter your full name"
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="Enter your email address"
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="Enter your phone number"
                  disabled
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Phone number cannot be changed</p>
            </div>
          </div>
        </Card>
        
        <div className="flex flex-col space-y-3">
          <Button 
            className="w-full bg-paygrow-blue"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/profile')}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileScreen;
