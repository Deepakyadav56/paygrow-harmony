
import React, { useState } from 'react';
import { ArrowLeft, Camera, Mail, Phone, User, Save, Check, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';

const EditProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: 'Rahul Sharma',
    email: 'rahul.sharma@gmail.com',
    phone: '9876543210',
    dob: '1990-05-15',
    address: 'B-203, Skyline Apartments, Andheri East, Mumbai',
    occupation: 'Software Engineer',
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
        icon: <Check className="h-4 w-4 text-green-500" />
      });
      
      navigate('/profile');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-paygrow-blue to-blue-500 text-white pt-12 pb-4 px-5 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/profile" className="mr-4">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl font-bold">Edit Profile</h1>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="bg-white/20 hover:bg-white/30 text-white rounded-full w-10 h-10 p-0"
            onClick={handleSave}
            disabled={isLoading}
          >
            <Save className="w-5 h-5" />
          </Button>
        </div>
      </div>
      
      {/* Profile Picture */}
      <div className="bg-white dark:bg-gray-800 flex flex-col items-center py-8 border-b dark:border-gray-700 shadow-sm">
        <div className="relative mb-3">
          <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-700 shadow-md">
            <AvatarImage src="https://api.dicebear.com/7.x/micah/svg?seed=Rahul" alt="Rahul Sharma" />
            <AvatarFallback className="bg-blue-600 text-lg">RS</AvatarFallback>
          </Avatar>
          <Button 
            variant="secondary" 
            size="sm" 
            className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0"
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="link" className="text-paygrow-blue dark:text-blue-400">Change Profile Picture</Button>
      </div>
      
      {/* Edit Form */}
      <div className="flex-1 p-5">
        <Card className="p-5 mb-6 border-none shadow-md dark:bg-gray-800">
          <h3 className="font-medium mb-4 text-lg">Personal Information</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm text-gray-500 dark:text-gray-400">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-lg"
                  placeholder="Enter your full name"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-gray-500 dark:text-gray-400">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-lg"
                  placeholder="Enter your email address"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm text-gray-500 dark:text-gray-400">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="pl-10 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-lg"
                  placeholder="Enter your phone number"
                  disabled
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Phone number cannot be changed</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dob" className="text-sm text-gray-500 dark:text-gray-400">Date of Birth</Label>
              <Input
                id="dob"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-lg"
              />
            </div>
          </div>
        </Card>
        
        <Card className="p-5 mb-6 border-none shadow-md dark:bg-gray-800">
          <h3 className="font-medium mb-4 text-lg">Additional Information</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm text-gray-500 dark:text-gray-400">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-lg"
                placeholder="Enter your address"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="occupation" className="text-sm text-gray-500 dark:text-gray-400">Occupation</Label>
              <Input
                id="occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-lg"
                placeholder="Enter your occupation"
              />
            </div>
          </div>
        </Card>
        
        <div className="flex flex-col space-y-3">
          <Button 
            className="w-full bg-paygrow-blue hover:bg-blue-600 py-3 rounded-xl h-auto"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full border-gray-300 dark:border-gray-600 py-3 rounded-xl h-auto"
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
