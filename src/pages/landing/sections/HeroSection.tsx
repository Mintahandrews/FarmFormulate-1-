import { useTranslation } from '../../../hooks/useTranslation';
import { Button } from '../../../components/ui/Button';
import { Link } from 'react-router-dom';
import { Logo } from '../../../components/ui/Logo';
import { ChevronRight, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export function HeroSection() {
  const { t } = useTranslation();
  const [typedText, setTypedText] = useState('');
  const fullText = t('landingHeroTitle');
  
  // Typing animation effect
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.substring(0, typedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [typedText, fullText]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-100 dark:bg-green-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 -left-20 w-72 h-72 bg-blue-100 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-40 right-20 w-64 h-64 bg-purple-100 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up space-y-8">
            <div className="flex items-center">
              <Logo size="lg" withText={true} className="mb-6" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-500">
                {typedText}
              </span>
              <span className="animate-blink">|</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
              {t('landingHeroSubtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/app" className="w-full sm:w-auto">
                <Button size="lg" className="w-full group">
                  {t('getStarted')}
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/login" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full">
                  {t('login')}
                </Button>
              </Link>
            </div>
            
            <div className="pt-4">
              <ul className="space-y-2">
                {['feature1', 'feature2', 'feature3'].map((key) => (
                  <li key={key} className="flex items-center text-gray-600 dark:text-gray-300">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>{t(key)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="hidden md:block animate-fade-in">
            <div className="relative">
              {/* Decorative blobs */}
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-green-100 dark:bg-green-900/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-8 -right-4 w-64 h-64 bg-emerald-100 dark:bg-emerald-900/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-100 dark:bg-teal-900/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
              
              {/* App mockup */}
              <div className="relative rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-2xl ring-1 ring-black/5 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                {/* Browser chrome */}
                <div className="h-6 flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="ml-4 h-4 bg-gray-100 dark:bg-gray-700 rounded-full w-40"></div>
                </div>
                
                {/* App content mockup */}
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-green-100 dark:bg-green-800/50 rounded-md w-24"></div>
                    <div className="h-6 bg-gray-100 dark:bg-gray-700 rounded-md w-20"></div>
                  </div>
                  
                  {/* Form fields */}
                  <div className="space-y-3 py-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-20 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    <div className="h-10 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                    <div className="h-10 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg w-full"></div>
                  </div>
                  
                  {/* Button */}
                  <div className="h-10 bg-green-500 dark:bg-green-600 rounded-lg w-1/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-gray-900"></div>
    </section>
  );
}
