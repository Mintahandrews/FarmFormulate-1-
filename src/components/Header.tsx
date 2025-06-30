import { useState, useEffect, useRef } from 'react';
import { BarChart4, ChevronDown, FileText, Globe, CircleHelp, LayoutDashboard, Menu, CirclePlus, Sun, X } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import gsap from 'gsap';

interface HeaderProps {
  onPageChange: (page: string) => void;
  currentPage: string;
}

export function Header({ onPageChange, currentPage }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const { t, changeLanguage, currentLanguage } = useTranslation();
  
  const menuRef = useRef<HTMLDivElement>(null);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsLanguageMenuOpen(false);
  };

  const toggleLanguageMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
  };

  const handleLanguageChange = (language: string) => {
    changeLanguage(language);
    setIsLanguageMenuOpen(false);
  };

  const handlePageClick = (page: string) => {
    onPageChange(page);
    setIsMenuOpen(false);
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'tw', name: 'Twi' },
    { code: 'ew', name: 'Ewe' },
    { code: 'ga', name: 'Ga' },
    { code: 'da', name: 'Dagbani' },
    { code: 'ha', name: 'Hausa' }
  ];

  const navItems = [
    { id: 'dashboard', label: t('dashboard'), icon: <LayoutDashboard size={16} /> },
    { id: 'forms', label: t('forms'), icon: <FileText size={16} /> },
    { id: 'analytics', label: t('analytics'), icon: <BarChart4 size={16} /> },
    { id: 'help', label: t('help'), icon: <CircleHelp size={16} /> }
  ];

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Animation for language menu
  useEffect(() => {
    if (languageMenuRef.current) {
      const dropdown = languageMenuRef.current.querySelector('.language-dropdown');
      if (dropdown && isLanguageMenuOpen) {
        gsap.fromTo(
          dropdown,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
        );
      }
    }
  }, [isLanguageMenuOpen]);

  // Animation for mobile menu
  useEffect(() => {
    if (menuRef.current) {
      if (isMenuOpen) {
        gsap.fromTo(
          menuRef.current,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' }
        );
      }
    }
  }, [isMenuOpen]);

  // Animation for nav items on page load
  useEffect(() => {
    const navElements = navItemsRef.current.filter(Boolean);
    if (navElements.length > 0) {
      gsap.fromTo(
        navElements,
        { opacity: 0, y: -10 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.05,
          duration: 0.4, 
          ease: 'power2.out' 
        }
      );
    }
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => handlePageClick('dashboard')}
            >
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <Sun className="text-white" size={16} />
              </div>
              <span className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
                AgriNova AI
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <a
                key={item.id}
                ref={(el) => navItemsRef.current[index] = el}
                href="#"
                className={`flex items-center space-x-1 transition-colors ${
                  currentPage === item.id 
                    ? 'text-green-600 font-medium' 
                    : 'text-gray-700 hover:text-green-600'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageClick(item.id);
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            ))}
            
            <button
              className="flex items-center space-x-1 text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md transition-colors shadow-sm"
              onClick={() => handlePageClick('create-form')}
            >
              <CirclePlus size={16} />
              <span>{t('createForm')}</span>
            </button>

            {/* Language Selector */}
            <div className="relative" ref={languageMenuRef}>
              <button 
                className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors"
                onClick={toggleLanguageMenu}
              >
                <Globe size={16} />
                <span>{languages.find(lang => lang.code === currentLanguage)?.name || 'English'}</span>
                <ChevronDown size={14} />
              </button>
              
              {isLanguageMenuOpen && (
                <div className="language-dropdown absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${
                        currentLanguage === language.code ? 'bg-gray-100 font-medium' : ''
                      }`}
                      onClick={() => handleLanguageChange(language.code)}
                    >
                      {language.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div 
            className="md:hidden mt-4 pb-4"
            ref={menuRef}
          >
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href="#"
                  className={`flex items-center space-x-2 ${
                    currentPage === item.id 
                      ? 'text-green-600 font-medium' 
                      : 'text-gray-700 hover:text-green-600'
                  } transition-colors`}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageClick(item.id);
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}
              
              <button
                className="flex items-center space-x-2 text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md transition-colors w-full mt-2"
                onClick={() => handlePageClick('create-form')}
              >
                <CirclePlus size={16} />
                <span>{t('createForm')}</span>
              </button>
              
              {/* Language Selector - Mobile */}
              <div className="pt-2 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-2">{t('selectLanguage')}</p>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      className={`px-3 py-2 text-sm rounded-md ${
                        currentLanguage === language.code 
                          ? 'bg-green-100 text-green-700 border border-green-300' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => handleLanguageChange(language.code)}
                    >
                      {language.name}
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
