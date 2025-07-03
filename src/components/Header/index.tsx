import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, Sun, Moon } from 'lucide-react';
import { useNavItems } from './NavItems';
import { LanguageSelector } from './LanguageSelector';
import MobileMenu from './MobileMenu';
import { DesktopNav } from './DesktopNav';
import { Logo } from '../ui/Logo';
import { useTranslation } from '../../hooks/useTranslation';

export const Header = React.memo(function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navItems = useNavItems();
  const { t } = useTranslation();
  // Don't render header on auth pages or landing page
  const isLandingPage = location.pathname === '/';
  const isAuthPage = ['/login', '/signup', '/forgot-password', '/reset-password'].includes(location.pathname);
  
  if (isLandingPage || isAuthPage) {
    return null;
  }

  const isActive = useCallback((path: string) => 
    location.pathname === path || (path !== '/' && location.pathname.startsWith(path)), 
    [location.pathname]);

  const handleNavigate = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  const isDarkMode = document.documentElement.classList.contains('dark');
  const toggleDarkMode = useCallback(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, [isDarkMode]);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Logo size="md" withText={true} />
            </div>
            
            <DesktopNav navItems={navItems} isActive={isActive} />
          </div>
          
          <div className="flex items-center">
            <LanguageSelector />
            
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 transition-colors"
              aria-label={isDarkMode ? t('switchToLightMode') : t('switchToDarkMode')}
            >
              {isDarkMode ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
            </button>
            
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 md:hidden"
              onClick={() => setIsMenuOpen(true)}
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={isMenuOpen}
        navItems={navItems}
        isActive={isActive}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleNavigate}
      />
    </header>
  );
});

export default Header;
