
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
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      <OnboardingCarousel />
    </div>
  );
};

export default OnboardingScreen;
