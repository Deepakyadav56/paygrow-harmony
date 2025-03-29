
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Improved onboarding data with better visuals
const onboardingData = [
  {
    title: "Invest Smartly",
    description: "Start your investment journey with expert guidance and zero commission",
    image: "📈",
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Grow Your Wealth",
    description: "Access a wide range of mutual funds, stocks, and digital gold",
    image: "💰",
    color: "from-green-500 to-green-600"
  },
  {
    title: "Track Performance",
    description: "Monitor your investments with detailed analytics and insights",
    image: "📊",
    color: "from-purple-500 to-purple-600"
  }
];

const OnboardingCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState<'right' | 'left' | null>(null);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setAnimationDirection('right');
      setTimeout(() => {
        setCurrentIndex(prevIndex => prevIndex + 1);
        setAnimationDirection(null);
      }, 200);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setAnimationDirection('left');
      setTimeout(() => {
        setCurrentIndex(prevIndex => prevIndex - 1);
        setAnimationDirection(null);
      }, 200);
    }
  };

  const goToSlide = (index: number) => {
    setAnimationDirection(index > currentIndex ? 'right' : 'left');
    setTimeout(() => {
      setCurrentIndex(index);
      setAnimationDirection(null);
    }, 200);
  };

  useEffect(() => {
    // Auto-advance slides every 5 seconds
    const interval = setInterval(() => {
      if (currentIndex < onboardingData.length - 1) {
        handleNext();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-blue-300 filter blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-60 h-60 rounded-full bg-green-300 filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-purple-300 filter blur-3xl"></div>
      </div>
      
      {/* Slide indicator */}
      <div className="absolute top-12 left-0 right-0 z-10 flex justify-center">
        <div className="flex space-x-2">
          {onboardingData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-8 bg-paygrow-blue' 
                  : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-16 z-10">
        {/* Slide Content with animation */}
        <div className={`w-full max-w-md transition-all duration-300 ${
          animationDirection === 'right' ? 'translate-x-10 opacity-0' : 
          animationDirection === 'left' ? '-translate-x-10 opacity-0' : 
          'translate-x-0 opacity-100'
        }`}>
          <div className="flex flex-col items-center">
            {/* Stylish emoji container */}
            <div className={`text-6xl mb-10 p-6 rounded-full bg-gradient-to-br ${onboardingData[currentIndex].color} text-white shadow-lg animate-bounce-slow`}>
              {onboardingData[currentIndex].image}
            </div>
            
            <h1 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-paygrow-blue to-blue-700 bg-clip-text text-transparent">
              {onboardingData[currentIndex].title}
            </h1>
            
            <p className="text-lg text-gray-600 mb-12 text-center max-w-xs">
              {onboardingData[currentIndex].description}
            </p>
          </div>
        </div>
      </div>
      
      {/* Navigation Buttons - Fixed at bottom */}
      <div className="px-8 py-10 z-10">
        <div className="flex justify-between items-center">
          {currentIndex > 0 ? (
            <Button 
              variant="outline" 
              className="rounded-full border-gray-300" 
              onClick={handlePrev}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          ) : (
            <div /> // Empty div for layout balance
          )}
          
          {currentIndex < onboardingData.length - 1 ? (
            <Button 
              className="rounded-full bg-gradient-to-r from-paygrow-blue to-blue-700 hover:shadow-lg transition-all"
              onClick={handleNext}
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button 
              className="rounded-full bg-gradient-to-r from-paygrow-green to-green-600 hover:shadow-lg transition-all w-full"
              asChild
            >
              <Link to="/login" className="flex items-center justify-center">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
        
        {/* Skip option */}
        {currentIndex < onboardingData.length - 1 && (
          <div className="mt-4 text-center">
            <Button variant="link" asChild className="text-gray-500">
              <Link to="/login">Skip</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingCarousel;
