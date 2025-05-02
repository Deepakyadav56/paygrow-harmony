
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Wallet, TrendingUp, Calendar, Shield, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();

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
          <h1 className="text-xl font-bold">User Dashboard</h1>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="mt-20 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-teal-50 border-teal-100">
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center">
                <Wallet className="h-8 w-8 text-teal-600 mb-2" />
                <p className="font-semibold text-teal-900">₹24,500</p>
                <p className="text-xs text-teal-700">Total Balance</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-blue-50 border-blue-100">
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center">
                <TrendingUp className="h-8 w-8 text-blue-600 mb-2" />
                <p className="font-semibold text-blue-900">₹3,250</p>
                <p className="text-xs text-blue-700">Total Returns</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">Recent Activities</h2>
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">SIP Investment</p>
                    <p className="text-xs text-gray-500">May 1, 2025</p>
                  </div>
                </div>
                <p className="font-medium text-green-600">+₹5,000</p>
              </div>
              
              <div className="flex justify-between items-center border-b pb-3">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <Calendar className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">KYC Updated</p>
                    <p className="text-xs text-gray-500">Apr 28, 2025</p>
                  </div>
                </div>
                <div className="bg-green-100 rounded-full px-2 py-0.5">
                  <span className="text-xs font-medium text-green-700">Completed</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-amber-100 p-2 rounded-full mr-3">
                    <Wallet className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium">Money Added</p>
                    <p className="text-xs text-gray-500">Apr 25, 2025</p>
                  </div>
                </div>
                <p className="font-medium text-green-600">+₹10,000</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Security */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">Account Security</h2>
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-teal-600 mr-3" />
                  <div>
                    <p className="font-medium">Account Security</p>
                    <p className="text-xs text-gray-500">Enhanced protection enabled</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Manage</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statement Download */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">Statements</h2>
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Download className="h-5 w-5 text-teal-600 mr-3" />
                  <div>
                    <p className="font-medium">Download Statement</p>
                    <p className="text-xs text-gray-500">PDF format</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Download</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
