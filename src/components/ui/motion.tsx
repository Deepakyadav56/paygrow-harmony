
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface MotionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  initial?: "hidden" | "visible" | string | object;
  animate?: "hidden" | "visible" | string | object;
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
      if (!mounted) return typeof initial === 'string' && initial === 'hidden' ? 'opacity-0' : '';
      
      if (typeof animate === 'string') {
        if (animate === 'visible') {
          return `animate-fade-in`;
        }
        return animate === 'hidden' ? 'opacity-0' : '';
      }
      
      return '';
    };
    
    // Handle dynamic styles based on animate prop when it's an object
    const getDynamicStyles = () => {
      const baseStyles = {
        animationDuration: transition?.duration ? `${transition.duration}s` : '0.3s',
        animationDelay: transition?.delay ? `${transition.delay}s` : '0s',
        transitionTimingFunction: transition?.ease || 'cubic-bezier(0.4, 0, 0.2, 1)',
      };
      
      // If animate is an object, apply those styles
      if (typeof animate === 'object' && animate !== null) {
        return {
          ...baseStyles,
          ...animate,
          opacity: animate.opacity !== undefined ? animate.opacity : 1,
          height: animate.height !== undefined ? 
            (typeof animate.height === 'number' ? `${animate.height}px` : animate.height) : 
            'auto',
          transform: animate.y !== undefined ? `translateY(${animate.y}px)` : undefined
        };
      }
      
      // If initial is an object and not mounted yet, apply those styles
      if (!mounted && typeof initial === 'object' && initial !== null) {
        return {
          ...baseStyles,
          ...initial,
          opacity: initial.opacity !== undefined ? initial.opacity : 0,
          height: initial.height !== undefined ? 
            (typeof initial.height === 'number' ? `${initial.height}px` : initial.height) : 
            '0px',
          transform: initial.y !== undefined ? `translateY(${initial.y}px)` : undefined
        };
      }
      
      return baseStyles;
    };
    
    return (
      <div
        className={cn(
          className,
          getAnimationClasses()
        )}
        style={getDynamicStyles()}
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
