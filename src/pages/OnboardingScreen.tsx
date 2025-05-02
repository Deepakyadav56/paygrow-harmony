
import React, { useEffect } from 'react';
import OnboardingCarousel from '@/components/OnboardingCarousel';
import { useToast } from '@/hooks/use-toast';
import { ThemeControls } from '@/components/ThemeControls';

const OnboardingScreen: React.FC = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Welcome toast to enhance user experience
    toast({
      title: "Welcome to TimePay",
      description: "Your journey to financial growth starts here",
      variant: "default"
    });
  }, [toast]);

  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <div className="absolute top-4 right-4 z-50">
        <ThemeControls />
      </div>
      <OnboardingCarousel />
    </div>
  );
};

export default OnboardingScreen;
