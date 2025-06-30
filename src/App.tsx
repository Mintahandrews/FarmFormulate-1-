import { useState, useEffect, useRef } from 'react';
import './index.css';
import { FormBuilder } from './components/FormBuilder';
import { Header } from './components/Header';
import gsap from 'gsap';
import { fadeIn, staggeredFadeIn } from './utils/animations';
import { useTranslation } from './hooks/useTranslation';
import Dashboard from './pages/Dashboard';
import Forms from './pages/Forms';
import Analytics from './pages/Analytics';
import Help from './pages/Help';

// Mock data for tips
const tips = [
  'Use natural language to describe your agricultural survey needs',
  'Try being specific about crops, regions, and the purpose of your survey',
  'Customize generated forms by dragging fields to reorder them',
  'Add validation rules to ensure data quality from field agents',
  'Save your forms as templates for quick access in the future',
  'Export your form schema to integrate with other systems',
  'Preview your form to test the user experience before deployment',
  'Use pre-built templates for common agricultural survey types',
  'Add branching logic to show/hide questions based on previous answers',
  'Collect geolocation data to map your agricultural insights',
  'Set minimum and maximum values for numerical fields to prevent data errors',
  'Add multilingual support for surveys in different regions',
  'Use conditional logic to simplify complex agricultural surveys',
  'Analyze survey data to identify crop yield improvement opportunities',
];

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState('dashboard'); // Default to dashboard
  const { t } = useTranslation();

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const tipInterval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % tips.length);
    }, 5000);

    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearInterval(tipInterval);
      clearTimeout(timer);
    };
  }, []);

  const appRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const tipContainerRef = useRef<HTMLDivElement>(null);
  const tipItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading && appRef.current) {
      // Animate the main content when it loads
      gsap.set(appRef.current, { opacity: 0 });
      fadeIn(appRef.current, 0.2, 0.8);
      
      // Animate header and main content with staggered effect
      const headerElement = appRef.current.querySelector('header');
      const mainElement = appRef.current.querySelector('main');
      
      if (headerElement && mainElement) {
        gsap.set([headerElement, mainElement], { opacity: 0, y: -20 });
        staggeredFadeIn([headerElement, mainElement], 0.2, 0.3, 0.8);
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (isLoading && loaderRef.current) {
      // Animate the loader
      gsap.fromTo(
        loaderRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
      );
      
      // Pulse animation for logo
      const logoElement = loaderRef.current.querySelector('.logo-container');
      if (logoElement) {
        gsap.to(logoElement, {
          scale: 1.05,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (tipContainerRef.current && tipItemsRef.current.length > 0) {
      // Animate tip transitions
      gsap.to(tipItemsRef.current[currentTipIndex], {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
      });
      
      // Custom transition for tips
      gsap.to(tipContainerRef.current, {
        y: -currentTipIndex * 48 - 4,
        duration: 0.5,
        ease: 'power2.inOut'
      });
    }
  }, [currentTipIndex]);

  // Handle page change animation
  useEffect(() => {
    if (contentRef.current) {
      // Animate out
      gsap.to(contentRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          // Animate in
          gsap.to(contentRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out'
          });
        }
      });
    }
  }, [currentPage]);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0" style={{ fontFamily: 'Inter, sans-serif' }} ref={loaderRef}>
        <div className="relative size-full">
          <div className="absolute inset-0 bg-[#f9f9f9] flex size-full flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="relative flex items-center justify-center w-10 h-10 bg-white border rounded-full logo-container">
              <div className="absolute h-10 w-10 rounded-full animate-spin bg-gradient-to-b from-green-500 to-transparent"></div>
              <div className="absolute flex items-center justify-center bg-white rounded-full h-[38px] w-[38px]">
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 10C5 10 7.5 14 12 14C16.5 14 19 10 19 10M12 15V17M18 17L16 15.5M6 17L8 15.5"
                    stroke="#15803d"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 3H21V21H3V3Z"
                    stroke="#15803d"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div className="text-green-700 font-medium">{t('loading')}</div>

            <div className="relative h-[115px] pt-4 pb-8 -mt-4 w-[280px] overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-4 z-10 bg-gradient-to-t from-transparent to-[#f9f9f9]" />
              <div
                ref={tipContainerRef}
                className="transition-transform duration-500 ease-in-out"
              >
                {tips.map((tip, index) => (
                  <div
                    key={index}
                    ref={(el) => tipItemsRef.current[index] = el}
                    className={`h-8 mb-4 flex items-center justify-center text-[#666666] text-sm leading-[1.2] transition-opacity duration-500 ${index === currentTipIndex ? 'opacity-100' : 'opacity-50'}`}
                  >
                    {tip}
                  </div>
                ))}
              </div>
              <div className="absolute inset-x-0 bottom-0 h-16 z-10 bg-gradient-to-b from-transparent to-[#f9f9f9]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Inter, sans-serif' }} ref={appRef}>
      <Header onPageChange={handlePageChange} currentPage={currentPage} />
      <main className="container mx-auto py-4" ref={contentRef}>
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'forms' && <Forms />}
        {currentPage === 'analytics' && <Analytics />}
        {currentPage === 'help' && <Help />}
        {currentPage === 'create-form' && <FormBuilder />}
      </main>
    </div>
  );
}

export default App;
