
import React, { useState } from 'react';
import { ArrowLeft, Bell, Wallet, BarChart, Gift, Trash2, Check, CheckCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

// Sample notification data
const allNotifications = [
  {
    id: 1,
    type: 'transaction',
    title: 'Payment Successful',
    description: 'Your payment of ₹1,200 to Priya Verma was successful.',
    timestamp: '2 hours ago',
    isRead: false,
  },
  {
    id: 2,
    type: 'investment',
    title: 'SIP Invested Successfully',
    description: 'Your SIP investment of ₹5,000 in Axis Bluechip Fund was processed.',
    timestamp: 'Yesterday',
    isRead: false,
  },
  {
    id: 3,
    type: 'promotion',
    title: 'Exclusive Offer!',
    description: 'Get 2% cashback on your next mutual fund investment.',
    timestamp: '2 days ago',
    isRead: true,
  },
  {
    id: 4,
    type: 'transaction',
    title: 'Payment Received',
    description: 'You received ₹800 from Arun Kumar.',
    timestamp: '3 days ago',
    isRead: true,
  },
  {
    id: 5,
    type: 'investment',
    title: 'Market Update',
    description: 'NIFTY 50 is up 1.2% today. Check your portfolio.',
    timestamp: '4 days ago',
    isRead: true,
  },
  {
    id: 6,
    type: 'promotion',
    title: 'New Feature Available',
    description: 'You can now set up automatic SIPs for your investments.',
    timestamp: '5 days ago',
    isRead: true,
  },
  {
    id: 7,
    type: 'transaction',
    title: 'Bill Payment Due',
    description: 'Your electricity bill payment is due in 2 days.',
    timestamp: '5 days ago',
    isRead: false,
  },
];

const NotificationsScreen: React.FC = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(allNotifications);
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.isRead;
    return notification.type === activeTab;
  });
  
  const unreadCount = notifications.filter(n => !n.isRead).length;
  
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    toast({
      title: "All notifications marked as read",
      description: `${unreadCount} notifications marked as read`
    });
  };
  
  const clearAll = () => {
    setNotifications([]);
    toast({
      title: "All notifications cleared",
      description: "Your notification center has been cleared"
    });
  };
  
  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };
  
  const getIconForType = (type: string) => {
    switch(type) {
      case 'transaction':
        return <Wallet className="w-5 h-5 text-blue-500" />;
      case 'investment':
        return <BarChart className="w-5 h-5 text-green-500" />;
      case 'promotion':
        return <Gift className="w-5 h-5 text-purple-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };
  
  const getBackgroundForType = (type: string) => {
    switch(type) {
      case 'transaction':
        return 'bg-blue-100 dark:bg-blue-900/30';
      case 'investment':
        return 'bg-green-100 dark:bg-green-900/30';
      case 'promotion':
        return 'bg-purple-100 dark:bg-purple-900/30';
      default:
        return 'bg-gray-100 dark:bg-gray-800';
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-6">
      {/* Header */}
      <div className="bg-paygrow-blue text-white sticky top-0 z-10">
        <div className="flex items-center justify-between pt-12 pb-4 px-5">
          <div className="flex items-center">
            <Link to="/profile" className="mr-4">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-sm text-white/80">{unreadCount} unread notifications</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={markAllAsRead}
                className="text-white hover:bg-white/10"
              >
                <CheckCheck className="w-4 h-4 mr-1" />
                Mark all read
              </Button>
            )}
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearAll}
              className="text-white hover:bg-white/10"
              disabled={notifications.length === 0}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Clear all
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="px-5 pb-2">
          <TabsList className="grid grid-cols-4 bg-white/10 p-0.5">
            <TabsTrigger 
              value="all" 
              className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
            >
              All
            </TabsTrigger>
            <TabsTrigger 
              value="transaction" 
              className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
            >
              Payments
            </TabsTrigger>
            <TabsTrigger 
              value="investment" 
              className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
            >
              Invest
            </TabsTrigger>
            <TabsTrigger 
              value="unread" 
              className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
            >
              Unread
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Notifications List */}
      <div className="p-5">
        {filteredNotifications.length > 0 ? (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`p-4 border-none shadow-sm ${!notification.isRead ? 'bg-blue-50 dark:bg-blue-900/10' : 'bg-white dark:bg-gray-800'}`}
              >
                <div className="flex items-start">
                  <div className={`w-10 h-10 rounded-full ${getBackgroundForType(notification.type)} flex items-center justify-center mr-3 flex-shrink-0`}>
                    {getIconForType(notification.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className={`font-medium ${!notification.isRead ? 'text-black dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                          {notification.title}
                          {!notification.isRead && (
                            <Badge className="ml-2 bg-blue-500 text-white py-0 px-1.5 h-auto text-[10px]">New</Badge>
                          )}
                        </p>
                        <p className={`text-sm ${!notification.isRead ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400'}`}>
                          {notification.description}
                        </p>
                      </div>
                      
                      <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                        {notification.timestamp}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                        {notification.type}
                      </span>
                      
                      {!notification.isRead && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => markAsRead(notification.id)}
                          className="h-8 text-xs text-paygrow-blue hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        >
                          <Check className="w-3 h-3 mr-1" />
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
              <Bell className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No notifications</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-xs">
              {activeTab !== 'all' 
                ? `You don't have any ${activeTab === 'unread' ? 'unread' : activeTab} notifications right now.`
                : "You're all caught up! No notifications to display."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsScreen;
