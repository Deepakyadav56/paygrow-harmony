
import React, { useEffect } from 'react';
import OnboardingCarousel from '@/components/OnboardingCarousel';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/Logo';

const OnboardingScreen: React.FC = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Welcome toast to enhance user experience
    toast({
      title: "Welcome to PayGrow",
      description: "Your journey to financial growth starts here",
      variant: "default"
    });
  }, [toast]);

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-fountain-blue-50 to-white flex flex-col">
      <div className="py-12 px-6 flex justify-center">
        <Logo size="lg" className="animate-fade-in" />
      </div>
      <OnboardingCarousel />
    </div>
  );
};

export default OnboardingScreen;
