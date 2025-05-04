
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Sparkles, Shield, Coins, TrendingUp } from 'lucide-react';

interface Slide {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  image?: string;
}

const OnboardingCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  
  const slides: Slide[] = [
    {
      title: "Welcome to PayGrow",
      description: "The simplest way to manage your finances, investments, and payments in one place.",
      icon: <Sparkles className="h-12 w-12 text-fountain-blue-500" />,
      color: "bg-fountain-blue-50"
    },
    {
      title: "Safe & Secure",
      description: "Your financial data is protected by industry-leading security standards.",
      icon: <Shield className="h-12 w-12 text-fountain-blue-600" />,
      color: "bg-fountain-blue-100"
    },
    {
      title: "Smart Investments",
      description: "Grow your wealth with professionally managed mutual funds and personalized recommendations.",
      icon: <TrendingUp className="h-12 w-12 text-fountain-blue-700" />,
      color: "bg-fountain-blue-50"
    },
    {
      title: "Start Your Journey",
      description: "Begin with just ₹500 and watch your investments grow over time with our SIPs.",
      icon: <Coins className="h-12 w-12 text-fountain-blue-500" />,
      color: "bg-fountain-blue-100"
    }
  ];
  
  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/home');
    }
  };
  
  const handleSkip = () => {
    navigate('/home');
  };
  
  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 px-6 flex flex-col justify-center items-center">
        <div className={`p-8 rounded-full ${slides[currentSlide].color} mb-6 animate-fade-in`}>
          {slides[currentSlide].icon}
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-3 animate-fade-in">
          {slides[currentSlide].title}
        </h1>
        
        <p className="text-gray-600 text-center mb-8 animate-fade-in max-w-xs">
          {slides[currentSlide].description}
        </p>
        
        <div className="flex justify-center space-x-2 mb-6">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? "w-8 bg-fountain-blue-500" 
                  : "w-2 bg-fountain-blue-200"
              }`}
            ></div>
          ))}
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <Button
          onClick={handleNext}
          className="w-full bg-gradient-to-r from-fountain-blue-500 to-fountain-blue-700 text-white hover:opacity-90 transition-all py-6 text-lg"
        >
          {currentSlide < slides.length - 1 ? (
            <>
              Next <ChevronRight className="ml-2 h-5 w-5" />
            </>
          ) : (
            "Get Started"
          )}
        </Button>
        
        {currentSlide < slides.length - 1 && (
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="w-full text-gray-500 hover:text-fountain-blue-700 hover:bg-fountain-blue-50"
          >
            Skip
          </Button>
        )}
      </div>
    </div>
  );
};

export default OnboardingCarousel;
