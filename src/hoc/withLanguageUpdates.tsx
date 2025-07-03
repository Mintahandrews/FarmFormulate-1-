import React, { useState, useEffect } from 'react';

/**
 * Higher-Order Component that forces re-render when language changes
 * This ensures all translated text updates properly throughout the app
 * 
 * @param WrappedComponent The component to wrap with language change detection
 */
export function withLanguageUpdates<P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> {
  const WithLanguageUpdates: React.FC<P> = (props) => {
    const [updateCounter, setUpdateCounter] = useState(0);
    
    useEffect(() => {
      // Force re-render when language changes
      const handleLanguageChange = () => {
        setUpdateCounter(prev => prev + 1);
      };
      
      window.addEventListener('languageChanged', handleLanguageChange);
      
      return () => {
        window.removeEventListener('languageChanged', handleLanguageChange);
      };
    }, []);
    
    // The updateCounter is not used directly but forces a re-render
    // when language changes
    return <WrappedComponent key={`lang-${updateCounter}`} {...props} />;
  };
  
  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithLanguageUpdates.displayName = `withLanguageUpdates(${wrappedComponentName})`;
  
  return WithLanguageUpdates;
}
