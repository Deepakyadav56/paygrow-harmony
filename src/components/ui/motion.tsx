
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface MotionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  initial?: "hidden" | "visible" | string;
  animate?: "hidden" | "visible" | string;
  transition?: {
    duration?: number;
    delay?: number;
    ease?: string;
    type?: "tween" | "spring";
    stiffness?: number;
    damping?: number;
  };
  variants?: {
    hidden?: object;
    visible?: object;
    [key: string]: object | undefined;
  };
}

export const motion = {
  div: ({
    children,
    className,
    initial,
    animate,
    transition,
    variants,
    ...props
  }: MotionProps) => {
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
      setMounted(true);
    }, []);
    
    // Default animations if no variants provided
    const defaultVariants = {
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0 },
    };
    
    // Merge provided variants with defaults
    const mergedVariants = { ...defaultVariants, ...variants };
    
    // Animation classes based on states
    const getAnimationClasses = () => {
      if (!mounted) return initial === 'hidden' ? 'opacity-0' : '';
      
      if (animate === 'visible') {
        return `animate-fade-in`;
      }
      
      return animate === 'hidden' ? 'opacity-0' : '';
    };
    
    return (
      <div
        className={cn(
          className,
          getAnimationClasses()
        )}
        style={{
          animationDuration: transition?.duration ? `${transition.duration}s` : '0.3s',
          animationDelay: transition?.delay ? `${transition.delay}s` : '0s',
          transitionTimingFunction: transition?.ease || 'cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
  
  // Adding more elements for flexibility
  section: ({
    children,
    className,
    initial,
    animate,
    transition,
    variants,
    ...props
  }: MotionProps) => {
    return motion.div({
      children,
      className,
      initial,
      animate,
      transition,
      variants,
      ...props,
    });
  },
  
  // For list items
  li: ({
    children,
    className,
    initial,
    animate,
    transition,
    variants,
    ...props
  }: MotionProps) => {
    return motion.div({
      children,
      className,
      initial,
      animate,
      transition,
      variants,
      ...props,
    });
  }
};

export default motion;
