
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon';
}

const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md', 
  variant = 'full' 
}) => {
  const sizeClasses = {
    sm: variant === 'full' ? 'text-xl' : 'text-xl',
    md: variant === 'full' ? 'text-2xl' : 'text-2xl',
    lg: variant === 'full' ? 'text-3xl' : 'text-3xl',
  };

  return (
    <div className={`font-bold flex items-center ${sizeClasses[size]} ${className}`}>
      <div className="bg-gradient-to-br from-fountain-blue-500 to-fountain-blue-700 rounded-xl p-2 inline-flex items-center justify-center mr-2 shadow-md">
        <span className="text-white">P</span>
      </div>
      {variant === 'full' && (
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-fountain-blue-600 to-fountain-blue-800 font-extrabold">
          PayGrow
        </span>
      )}
    </div>
  );
};

export default Logo;
