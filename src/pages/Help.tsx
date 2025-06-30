import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Book, FileQuestion, Info, Mail, MessageSquare, Search, Youtube } from 'lucide-react';
import gsap from 'gsap';
import { useTranslation } from '../hooks/useTranslation';

export function Help() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('getting-started');
  
  // Mock data for help articles
  const helpCategories = [
    { id: 'getting-started', name: t('gettingStarted'), icon: <Book className="w-5 h-5" /> },
    { id: 'forms', name: t('formCreation'), icon: <FileQuestion className="w-5 h-5" /> },
    { id: 'analytics', name: t('dataAnalysis'), icon: <Info className="w-5 h-5" /> },
    { id: 'contact', name: t('contactSupport'), icon: <Mail className="w-5 h-5" /> },
  ];
  
  const helpArticles = {
    'getting-started': [
      { id: 1, title: t('welcomeToAgriNova'), excerpt: t('welcomeToAgriNovaDesc') },
      { id: 2, title: t('quickStartGuide'), excerpt: t('quickStartGuideDesc') },
      { id: 3, title: t('navigatingInterface'), excerpt: t('navigatingInterfaceDesc') },
      { id: 4, title: t('accountSetup'), excerpt: t('accountSetupDesc') },
      { id: 5, title: t('supportedLanguages'), excerpt: t('supportedLanguagesDesc') },
    ],
    'forms': [
      { id: 6, title: t('creatingFirstForm'), excerpt: t('creatingFirstFormDesc') },
      { id: 7, title: t('aiPromptTips'), excerpt: t('aiPromptTipsDesc') },
      { id: 8, title: t('editingFormFields'), excerpt: t('editingFormFieldsDesc') },
      { id: 9, title: t('validationRules'), excerpt: t('validationRulesDesc') },
      { id: 10, title: t('previewAndPublishing'), excerpt: t('previewAndPublishingDesc') },
      { id: 11, title: t('usingTemplates'), excerpt: t('usingTemplatesDesc') },
    ],
    'analytics': [
      { id: 12, title: t('understandingDashboard'), excerpt: t('understandingDashboardDesc') },
      { id: 13, title: t('interpretingCharts'), excerpt: t('interpretingChartsDesc') },
      { id: 14, title: t('exportingData'), excerpt: t('exportingDataDesc') },
      { id: 15, title: t('dataQualityMetrics'), excerpt: t('dataQualityMetricsDesc') },
      { id: 16, title: t('customReports'), excerpt: t('customReportsDesc') },
    ],
    'contact': [
      { id: 17, title: t('contactingSupport'), excerpt: t('contactingSupportDesc') },
      { id: 18, title: t('reportingBugs'), excerpt: t('reportingBugsDesc') },
      { id: 19, title: t('requestingFeatures'), excerpt: t('requestingFeaturesDesc') },
    ],
  };
  
  // Mock data for tutorial videos
  const tutorialVideos = [
    { 
      id: 1, 
      title: t('formBuilderTutorial'), 
      duration: '5:24', 
      thumbnail: 'https://images.unsplash.com/photo-1589365252845-092198ba5474?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    { 
      id: 2, 
      title: t('analyticsOverview'), 
      duration: '4:12', 
      thumbnail: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    { 
      id: 3, 
      title: t('mobileDataCollection'), 
      duration: '3:47', 
      thumbnail: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
  ];
  
  // Mock data for frequently asked questions
  const faqs = [
    { 
      id: 1, 
      question: t('faq1Question'), 
      answer: t('faq1Answer')
    },
    { 
      id: 2, 
      question: t('faq2Question'), 
      answer: t('faq2Answer')
    },
    { 
      id: 3, 
      question: t('faq3Question'), 
      answer: t('faq3Answer')
    },
    { 
      id: 4, 
      question: t('faq4Question'), 
      answer: t('faq4Answer')
    },
    { 
      id: 5, 
      question: t('faq5Question'), 
      answer: t('faq5Answer')
    },
  ];
  
  const helpRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const articlesRef = useRef<HTMLDivElement>(null);
  const videosRef = useRef<HTMLDivElement>(null);
  const faqsRef = useRef<HTMLDivElement>(null);
  
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);
  
  const toggleFaq = (id: number) => {
    setExpandedFaqs(prev => 
      prev.includes(id) 
        ? prev.filter(faqId => faqId !== id)
        : [...prev, id]
    );
  };
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Animations
  useEffect(() => {
    if (!isLoading && helpRef.current) {
      // Animate the help container
      gsap.fromTo(
        helpRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
      
      // Animate header
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        );
      }
      
      // Animate search
      if (searchRef.current) {
        gsap.fromTo(
          searchRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.5, delay: 0.1, ease: 'power2.out' }
        );
      }
      
      // Animate categories
      if (categoriesRef.current) {
        const categories = categoriesRef.current.querySelectorAll('.category-item');
        gsap.fromTo(
          categories,
          { opacity: 0, x: -20 },
          { 
            opacity: 1, 
            x: 0, 
            stagger: 0.05,
            duration: 0.4, 
            delay: 0.2,
            ease: 'power2.out' 
          }
        );
      }
      
      // Animate articles
      if (articlesRef.current) {
        const articles = articlesRef.current.querySelectorAll('.article-item');
        gsap.fromTo(
          articles,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            stagger: 0.05,
            duration: 0.4, 
            delay: 0.3,
            ease: 'power2.out' 
          }
        );
      }
      
      // Animate videos and FAQs
      if (videosRef.current && faqsRef.current) {
        gsap.fromTo(
          [videosRef.current, faqsRef.current],
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            stagger: 0.15,
            duration: 0.5, 
            delay: 0.5,
            ease: 'power2.out' 
          }
        );
      }
    }
  }, [isLoading]);
  
  // Animate articles when changing category
  useEffect(() => {
    if (!isLoading && articlesRef.current) {
      const articles = articlesRef.current.querySelectorAll('.article-item');
      gsap.fromTo(
        articles,
        { opacity: 0, y: 15 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.05,
          duration: 0.3, 
          ease: 'power2.out' 
        }
      );
    }
  }, [activeCategory]);
  
  // Animate FAQ expansion/collapse
  useEffect(() => {
    if (faqsRef.current) {
      const faqItems = faqsRef.current.querySelectorAll('.faq-answer');
      faqItems.forEach((item, index) => {
        const faqId = faqs[index].id;
        const isExpanded = expandedFaqs.includes(faqId);
        
        gsap.to(item, {
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    }
  }, [expandedFaqs]);
  
  // Filter articles based on search query
  const filteredArticles = searchQuery 
    ? Object.values(helpArticles).flat().filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : helpArticles[activeCategory as keyof typeof helpArticles];
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">{t('loadingHelpResources')}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="px-4 py-6 md:px-6 lg:px-8" ref={helpRef}>
      {/* Page Header */}
      <div className="mb-6" ref={headerRef}>
        <h1 className="text-2xl font-bold text-gray-800">{t('helpAndSupport')}</h1>
        <p className="text-gray-600">{t('helpAndSupportDescription')}</p>
      </div>
      
      {/* Search Box */}
      <div className="mb-8" ref={searchRef}>
        <div className="relative max-w-lg mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder={t('searchHelpArticles')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Categories */}
        <div className="lg:col-span-1" ref={categoriesRef}>
          <h2 className="text-lg font-medium mb-4">{t('helpCategories')}</h2>
          <div className="space-y-1">
            {helpCategories.map((category) => (
              <button
                key={category.id}
                className={`category-item w-full flex items-center px-3 py-2 rounded-md text-left ${
                  activeCategory === category.id && !searchQuery
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => {
                  setActiveCategory(category.id);
                  setSearchQuery('');
                }}
              >
                <span className="mr-3">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
          
          {/* Contact Box */}
          <div className="mt-8 bg-gradient-to-br from-green-50 to-blue-50 border border-green-100 rounded-lg p-4">
            <h3 className="font-medium text-green-800 mb-2">{t('needHelp')}</h3>
            <p className="text-sm text-gray-600 mb-4">{t('needHelpDescription')}</p>
            <div className="flex space-x-2">
              <button className="flex items-center text-sm bg-white text-green-700 px-3 py-2 rounded-md border border-green-200 hover:bg-green-50 transition-colors">
                <MessageSquare className="w-4 h-4 mr-1" />
                {t('liveChat')}
              </button>
              <button className="flex items-center text-sm bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 transition-colors">
                <Mail className="w-4 h-4 mr-1" />
                {t('email')}
              </button>
            </div>
          </div>
        </div>
        
        {/* Articles */}
        <div className="lg:col-span-3">
          <div className="mb-8" ref={articlesRef}>
            <h2 className="text-lg font-medium mb-4">
              {searchQuery ? t('searchResults') : helpCategories.find(c => c.id === activeCategory)?.name}
            </h2>
            
            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredArticles.map((article) => (
                  <div 
                    key={article.id} 
                    className="article-item bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-medium text-gray-900 mb-2">{article.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{article.excerpt}</p>
                    <a href="#" className="text-sm text-green-600 hover:text-green-800 font-medium inline-flex items-center">
                      {t('readMore')} <ArrowRight className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <Info className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">{t('noResultsFound')}</h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                  {t('noResultsFoundDescription')}
                </p>
              </div>
            )}
          </div>
          
          {!searchQuery && (
            <>
              {/* Video Tutorials */}
              <div className="mb-8" ref={videosRef}>
                <h2 className="text-lg font-medium mb-4">{t('videoTutorials')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {tutorialVideos.map((video) => (
                    <div 
                      key={video.id} 
                      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="relative">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title} 
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                            <div className="w-3 h-3 bg-green-600 transform translate-x-0.5 rotate-45"></div>
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-gray-900 text-sm">{video.title}</h3>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <a href="#" className="text-sm text-green-600 hover:text-green-800 font-medium inline-flex items-center">
                    <Youtube className="w-4 h-4 mr-1" />
                    {t('viewAllTutorials')}
                  </a>
                </div>
              </div>
              
              {/* FAQs */}
              <div className="mb-8" ref={faqsRef}>
                <h2 className="text-lg font-medium mb-4">{t('frequentlyAskedQuestions')}</h2>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  {faqs.map((faq, index) => (
                    <div key={faq.id} className="border-b border-gray-200 last:border-b-0">
                      <button
                        className="w-full text-left px-4 py-3 flex items-center justify-between focus:outline-none"
                        onClick={() => toggleFaq(faq.id)}
                      >
                        <span className="font-medium text-gray-900">{faq.question}</span>
                        <span className={`transform transition-transform ${expandedFaqs.includes(faq.id) ? 'rotate-180' : ''}`}>
                          <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </button>
                      <div className={`faq-answer px-4 overflow-hidden ${expandedFaqs.includes(faq.id) ? 'pb-3' : 'h-0 opacity-0'}`}>
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Help;
