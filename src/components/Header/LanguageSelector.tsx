import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

const LanguageSelectorComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, changeLanguage, currentLanguage, languageNames, availableLanguages } = useTranslation();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);
  
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClickOutside, handleKeyDown]);
  
  // Handle language change
  const handleLanguageChange = useCallback((code: string) => {
    changeLanguage(code);
    setIsOpen(false);
    // Force reload components to ensure all text is updated
    window.dispatchEvent(new Event('languageChanged'));
  }, [changeLanguage]);

  return (
    <div className="relative ml-3" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="sr-only">{t('changeLanguage')}</span>
        <div className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
          <Globe className="h-4 w-4 mr-2" aria-hidden="true" />
          {languageNames[currentLanguage] || currentLanguage.toUpperCase()}
          <ChevronDown className="ml-2 h-4 w-4" aria-hidden="true" />
        </div>
      </button>

      {isOpen && (
        <div 
          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-menu-button"
        >
          <div className="py-1">
            {availableLanguages.map((code) => (
              <button
                key={code}
                onClick={() => handleLanguageChange(code)}
                className={`w-full text-left px-4 py-2 text-sm ${
                  currentLanguage === code
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                } transition-colors`}
                aria-current={currentLanguage === code ? 'true' : undefined}
                role="menuitem"
              >
                {languageNames[code] || code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const LanguageSelector = React.memo(LanguageSelectorComponent);
LanguageSelector.displayName = 'LanguageSelector';

export { LanguageSelector };
