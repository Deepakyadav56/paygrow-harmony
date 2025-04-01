import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

// Define interfaces for animation objects to replace generic 'object' type
interface AnimationStyles {
  opacity?: number;
  height?: number | string;
  y?: number;
  x?: number;
  scale?: number;
  rotate?: number;
  [key: string]: any; // Allow for other animation properties
}

interface MotionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  initial?: "hidden" | "visible" | string | AnimationStyles;
  animate?: "hidden" | "visible" | string | AnimationStyles | {
    scale?: number | number[];
    opacity?: number | number[];
    top?: string | string[];
  };
  whileHover?: AnimationStyles; 
  whileTap?: AnimationStyles; // Add whileTap support
  transition?: {
    duration?: number;
    delay?: number;
    ease?: string;
    type?: "tween" | "spring";
    stiffness?: number;
    damping?: number;
    repeat?: number | boolean | "infinity"; // Add repeat property
  };
  variants?: {
    hidden?: AnimationStyles;
    visible?: AnimationStyles;
    hover?: AnimationStyles;
    tap?: AnimationStyles; // Add tap variant
    [key: string]: AnimationStyles | undefined;
  };
}

export const motion = {
  div: ({
    children,
    className,
    initial,
    animate,
    whileHover,
    whileTap,
    transition,
    variants,
    ...props
  }: MotionProps) => {
    const [mounted, setMounted] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isTapping, setIsTapping] = useState(false);
    
    useEffect(() => {
      setMounted(true);
    }, []);
    
    // Default animations if no variants provided
    const defaultVariants = {
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0 },
      hover: { y: -3 }, // Default hover effect
      tap: { scale: 0.97 } // Default tap effect
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
        transition: 'all 0.3s ease',
      };
      
      // If tapping and whileTap is defined, apply those styles
      if (isTapping && whileTap) {
        return {
          ...baseStyles,
          ...whileTap,
          transform: getTransformString(whileTap)
        };
      }
      
      // If hovering and whileHover is defined, apply those styles
      if (isHovering && whileHover) {
        return {
          ...baseStyles,
          ...whileHover,
          transform: getTransformString(whileHover)
        };
      }
      
      // If animate is an object, apply those styles
      if (typeof animate === 'object' && animate !== null) {
        const animateObj = animate as AnimationStyles;
        return {
          ...baseStyles,
          ...animateObj,
          opacity: animateObj.opacity !== undefined ? animateObj.opacity : 1,
          height: animateObj.height !== undefined ? 
            (typeof animateObj.height === 'number' ? `${animateObj.height}px` : animateObj.height) : 
            'auto',
          transform: getTransformString(animateObj),
        };
      }
      
      // If initial is an object and not mounted yet, apply those styles
      if (!mounted && typeof initial === 'object' && initial !== null) {
        const initialObj = initial as AnimationStyles;
        return {
          ...baseStyles,
          ...initialObj,
          opacity: initialObj.opacity !== undefined ? initialObj.opacity : 0,
          height: initialObj.height !== undefined ? 
            (typeof initialObj.height === 'number' ? `${initialObj.height}px` : initialObj.height) : 
            'auto',
          transform: getTransformString(initialObj),
        };
      }
      
      return baseStyles;
    };
    
    // Helper to generate transform string from multiple properties
    const getTransformString = (styles: AnimationStyles): string | undefined => {
      const transforms = [];
      
      if (styles.y !== undefined) transforms.push(`translateY(${styles.y}px)`);
      if (styles.x !== undefined) transforms.push(`translateX(${styles.x}px)`);
      if (styles.scale !== undefined) transforms.push(`scale(${styles.scale})`);
      if (styles.rotate !== undefined) transforms.push(`rotate(${styles.rotate}deg)`);
      
      return transforms.length > 0 ? transforms.join(' ') : undefined;
    };
    
    return (
      <div
        className={cn(
          'transition-all',
          className,
          getAnimationClasses()
        )}
        style={getDynamicStyles()}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseDown={() => setIsTapping(true)}
        onMouseUp={() => setIsTapping(false)}
        onTouchStart={() => setIsTapping(true)}
        onTouchEnd={() => setIsTapping(false)}
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
    whileHover,
    whileTap,
    transition,
    variants,
    ...props
  }: MotionProps) => {
    return motion.div({
      children,
      className,
      initial,
      animate,
      whileHover,
      whileTap,
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
    whileHover,
    whileTap,
    transition,
    variants,
    ...props
  }: MotionProps) => {
    return motion.div({
      children,
      className,
      initial,
      animate,
      whileHover,
      whileTap,
      transition,
      variants,
      ...props,
    });
  }
};

export default motion;
