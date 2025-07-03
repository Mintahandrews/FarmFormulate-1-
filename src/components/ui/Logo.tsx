import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
  className?: string;
  linkTo?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  withText = true,
  className = '',
  linkTo = '/'
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-base',
    lg: 'w-12 h-12 text-xl'
  };

  const logoContent = (
    <>
      <div className={`${sizeClasses[size]} rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 flex items-center justify-center text-white font-bold`}>
        FF
      </div>
      {withText && (
        <span className={`ml-2 font-bold text-gray-900 dark:text-white ${size === 'sm' ? 'text-base' : size === 'md' ? 'text-xl' : 'text-2xl'}`}>
          FarmFormulate
        </span>
      )}
    </>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className={`flex items-center ${className}`}>
        {logoContent}
      </Link>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      {logoContent}
    </div>
  );
};
