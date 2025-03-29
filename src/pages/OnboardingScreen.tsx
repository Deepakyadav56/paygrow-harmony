
import React, { useEffect } from 'react';
import OnboardingCarousel from '@/components/OnboardingCarousel';
import { useToast } from '@/hooks/use-toast';

const OnboardingScreen: React.FC = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Welcome toast to enhance user experience
    toast({
      title: "Welcome to PayGrow",
      description: "Your journey to financial growth starts here",
      variant: "success"
    });
  }, [toast]);

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-paygrow-blue/10 to-blue-500/10 rounded-b-[50%]"></div>
      <div className="absolute top-20 right-5 w-20 h-20 bg-gradient-to-r from-paygrow-green/20 to-green-400/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-r from-paygrow-orange/10 to-yellow-400/10 rounded-full blur-xl"></div>
      
      <div className="relative z-10">
        <OnboardingCarousel />
      </div>
    </div>
  );
};

export default OnboardingScreen;
