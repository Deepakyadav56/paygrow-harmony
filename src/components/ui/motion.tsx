
// This is a simple wrapper component to provide motion/animation capabilities
// without adding an external dependency

import React from 'react';
import { cn } from '@/lib/utils';

interface MotionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  initial?: string;
  animate?: string;
  transition?: {
    duration?: number;
    delay?: number;
    ease?: string;
  };
}

export const motion = {
  div: ({
    children,
    className,
    initial,
    animate,
    transition,
    ...props
  }: MotionProps) => {
    return (
      <div
        className={cn(
          className,
          initial && `opacity-0`,
          animate && `animate-fade-in`
        )}
        style={{
          animationDuration: transition?.duration ? `${transition.duration}s` : '0.3s',
          animationDelay: transition?.delay ? `${transition.delay}s` : '0s',
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
};

export default motion;
