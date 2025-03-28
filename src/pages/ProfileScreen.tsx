
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Settings, 
  Bell, 
  CreditCard, 
  Clock, 
  ShieldCheck, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  BarChart3  // Added the BarChart3 icon import
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import BottomNavigation from '@/components/BottomNavigation';

const ProfileScreen: React.FC = () => {
  const { toast } = useToast();
  
  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out from your account"
    });
    
    // Navigate to login screen after logout
    setTimeout(() => {
      window.location.href = '/login';
    }, 1000);
  };
  
  return (
    <div className="pb-20"> {/* Add padding for bottom navigation */}
      {/* Header */}
      <div className="bg-paygrow-blue text-white pt-12 pb-6 px-4">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>
        
        {/* User Card */}
        <Card className="bg-white/10 backdrop-blur-sm border-none text-white p-4 rounded-xl">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mr-4">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Rahul Sharma</h2>
              <p className="opacity-80">rahul.sharma@gmail.com</p>
              <p className="opacity-80">+91 9876543210</p>
            </div>
          </div>
          <div className="mt-4">
            <Button 
              variant="outline" 
              className="border-white/20 hover:bg-white/10 text-white"
              asChild
            >
              <Link to="/edit-profile">
                Edit Profile
              </Link>
            </Button>
          </div>
        </Card>
      </div>
      
      {/* Profile Sections */}
      <div className="px-4 mt-6 space-y-6">
        {/* Account Settings */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Account Settings</h3>
          
          <Card className="divide-y">
            <Link to="/settings" className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Settings className="w-4 h-4 text-paygrow-blue" />
                </div>
                <span>Settings</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            
            <Link to="/notifications" className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                  <Bell className="w-4 h-4 text-orange-500" />
                </div>
                <span>Notifications</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center mr-2">
                  3
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </Link>
            
            <Link to="/payment-methods" className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <CreditCard className="w-4 h-4 text-green-500" />
                </div>
                <span>Payment Methods</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          </Card>
        </div>
        
        {/* Transactions & History */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Transactions & History</h3>
          
          <Card className="divide-y">
            <Link to="/transaction-history" className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <Clock className="w-4 h-4 text-purple-500" />
                </div>
                <span>Transaction History</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            
            <Link to="/portfolio" className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <BarChart3 className="w-4 h-4 text-blue-500" />
                </div>
                <span>Investment Portfolio</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          </Card>
        </div>
        
        {/* Security & Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Security & Support</h3>
          
          <Card className="divide-y">
            <Link to="/kyc" className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <span>KYC Verification</span>
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            
            <Link to="/help" className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <HelpCircle className="w-4 h-4 text-purple-500" />
                </div>
                <span>Help & Support</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            
            <button 
              onClick={handleLogout}
              className="flex items-center justify-between p-4 w-full text-left"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                  <LogOut className="w-4 h-4 text-red-500" />
                </div>
                <span className="text-red-500">Logout</span>
              </div>
            </button>
          </Card>
        </div>
        
        {/* App Info */}
        <div className="text-center text-gray-500 text-sm pb-4">
          <p>PayGrow v1.0.0</p>
          <p>© 2025 PayGrow Financial Services</p>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default ProfileScreen;
