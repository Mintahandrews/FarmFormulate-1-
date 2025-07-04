import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart4, ChevronDown, FileText, Globe, CircleHelp, LayoutDashboard, Menu, CirclePlus, Moon, Sun, X } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { useTheme } from '../contexts/ThemeContext';
import { Logo } from './ui/Logo';
import { withLanguageUpdates } from '../hoc/withLanguageUpdates';

function HeaderComponent() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const { t, changeLanguage, currentLanguage, languageNames, availableLanguages } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  
  // Force re-render when theme changes
  const [currentTheme, setCurrentTheme] = useState(theme);
  
  useEffect(() => {
    setCurrentTheme(theme);
    
    const handleThemeChange = () => {
      setCurrentTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    };
    
    window.addEventListener('themeChanged', handleThemeChange);
    return () => window.removeEventListener('themeChanged', handleThemeChange);
  }, [theme]);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsLanguageMenuOpen(false);
  };

  const toggleLanguageMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
  };

  const handleLanguageChange = (languageCode: string) => {
    changeLanguage(languageCode);
    setIsLanguageMenuOpen(false);
    
    // Close mobile menu when language is changed
    if (window.innerWidth < 768) {
      setIsMenuOpen(false);
    }
  };

  const handlePageClick = () => {
    setIsMenuOpen(false);
  };

  // Get language options from the translations
  const languages = availableLanguages.map(code => ({
    code,
    name: languageNames[code] || code
  }));

  const navItems = [
    { id: 'app', path: '/app', icon: <LayoutDashboard className="w-5 h-5" />, label: t('dashboard') },
    { id: 'forms', path: '/forms', icon: <FileText className="w-5 h-5" />, label: t('forms') },
    { id: 'analytics', path: '/analytics', icon: <BarChart4 className="w-5 h-5" />, label: t('analytics') },
    { id: 'help', path: '/help', icon: <CircleHelp className="w-5 h-5" />, label: t('help') },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || 
           (path !== '/' && location.pathname.startsWith(path));
  };

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

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-40 flex-shrink-0">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
            
            <div className="flex-shrink-0 flex items-center ml-4">
              <Link to="/">
                <Logo size="md" withText={true} />
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:ml-6 md:flex md:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive(item.path)
                      ? 'border-indigo-500 text-gray-900 dark:text-white'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
              <Link
                to="/forms/new"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md ml-4"
              >
                <CirclePlus className="w-4 h-4 mr-1" />
                {t('createForm')}
              </Link>
            </nav>
          </div>
          
          {/* Right side - Language selector and theme toggle */}
          <div className="flex items-center space-x-4">
            {/* Language selector */}
            <div className="relative" ref={languageMenuRef}>
              <button
                onClick={toggleLanguageMenu}
                className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md px-2 py-1"
                aria-expanded={isLanguageMenuOpen}
                aria-haspopup="true"
              >
                <Globe className="h-5 w-5 mr-1" />
                <span className="text-sm font-medium">{languageNames[currentLanguage]}</span>
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isLanguageMenuOpen ? 'transform rotate-180' : ''}`} />
              </button>
              
              {isLanguageMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none py-1 z-50">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="language-menu">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        className={`block w-full text-left px-4 py-2 text-sm ${currentLanguage === language.code 
                          ? 'bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white' 
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'}`}
                        onClick={() => handleLanguageChange(language.code)}
                        role="menuitem"
                      >
                        {language.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Theme toggle */}
            <button 
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={toggleTheme}
              aria-label={currentTheme === 'dark' ? t('switchToLightMode') : t('switchToDarkMode')}
            >
              {currentTheme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg z-50 max-h-[calc(100vh-4rem)] overflow-y-auto" ref={menuRef}>
            <div className="pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive(item.path)
                    ? 'border-indigo-500 text-indigo-700 bg-indigo-50 dark:bg-gray-700 dark:text-white'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="inline-flex items-center">
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </span>
                </Link>
              ))}
              <Link
                to="/forms/new"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-indigo-600 hover:bg-gray-50 hover:border-gray-300 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="inline-flex items-center">
                  <span className="mr-2"><CirclePlus className="h-5 w-5" /></span>
                  {t('createForm')}
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

// Export the Header component wrapped with language updates
export const Header = withLanguageUpdates(HeaderComponent);
