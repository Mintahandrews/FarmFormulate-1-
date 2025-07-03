import { useEffect, useState } from 'react';

/**
 * A hook that forces component re-render when the language changes
 * This ensures all translated text updates properly throughout the app
 */
export function useLanguageChangeListener() {
  const [languageChangeCount, setLanguageChangeCount] = useState(0);
  
  useEffect(() => {
    // Force re-render when language changes
    const handleLanguageChange = () => {
      setLanguageChangeCount(prev => prev + 1);
    };
    
    window.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);
  
  return languageChangeCount;
}
