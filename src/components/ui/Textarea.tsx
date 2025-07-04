import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', label, error, helpText, id, ...props }, ref) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substring(2, 9)}`;
    
    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={textareaId} 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {label}
          </label>
        )}
        
        <textarea
          id={textareaId}
          ref={ref}
          className={cn(
            'w-full p-3 border rounded-md shadow-sm',
            'focus:ring-2 focus:ring-green-500 focus:border-green-500',
            'bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700',
            'resize-none min-h-[80px] placeholder:text-gray-500 dark:placeholder:text-gray-400',
            'font-medium text-base leading-relaxed tracking-normal',
            'hover:border-green-400 dark:hover:border-green-500',
            error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600',
            props.disabled ? 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300 cursor-not-allowed' : '',
            className
          )}
          {...props}
        />
        
        {helpText && !error && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helpText}</p>
        )}
        
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
