
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Onboarding data
const onboardingData = [
  {
    title: "Easy Payments",
    description: "Send money to friends and family with just a few taps",
    image: "👛",
  },
  {
    title: "Smart Investments",
    description: "Grow your wealth with intelligent investment options",
    image: "📈",
  },
  {
    title: "Financial Freedom",
    description: "Take control of your finances in one unified platform",
    image: "🚀",
  }
];

const OnboardingCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === onboardingData.length - 1 ? prevIndex : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? prevIndex : prevIndex - 1));
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-12 bg-paygrow-gray">
      {/* Slide Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-6xl mb-8 animate-bounce-slow">
          {onboardingData[currentIndex].image}
        </div>
        
        <h1 className="text-3xl font-bold mb-4 text-center">
          {onboardingData[currentIndex].title}
        </h1>
        
        <p className="text-lg text-gray-600 mb-12 text-center">
          {onboardingData[currentIndex].description}
        </p>
        
        {/* Indicator dots */}
        <div className="flex space-x-2 mb-12">
          {onboardingData.map((_, index) => (
            <div 
              key={index} 
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-8 bg-paygrow-blue' 
                  : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        {currentIndex > 0 ? (
          <Button 
            variant="outline" 
            className="rounded-full" 
            onClick={handlePrev}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        ) : (
          <div /> // Empty div for layout balance
        )}
        
        {currentIndex < onboardingData.length - 1 ? (
          <Button 
            className="rounded-full paygrow-gradient-blue" 
            onClick={handleNext}
          >
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button 
            className="rounded-full paygrow-gradient-blue" 
            asChild
          >
            <Link to="/login">Get Started</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default OnboardingCarousel;
