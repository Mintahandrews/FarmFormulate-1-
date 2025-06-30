import { useState, useEffect, useRef } from 'react';
import { FormTemplates } from '../components/FormTemplates';
import { FormTemplate } from '../types';
import { Calendar, FileText, Filter, Plus, Search, Squircle } from 'lucide-react';
import gsap from 'gsap';
import { useTranslation } from '../hooks/useTranslation';

export function Forms() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  
  // Mock data for form templates and user forms
  const [userForms, setUserForms] = useState<{
    id: string;
    title: string;
    description: string;
    date: string;
    responses: number;
    status: 'draft' | 'active' | 'archived';
    type: string;
  }[]>([
    {
      id: 'form-1',
      title: 'Maize Yield Assessment',
      description: 'Survey to assess maize yield and pest impact in Bono East region',
      date: '2025-06-15',
      responses: 124,
      status: 'active',
      type: 'crop-assessment'
    },
    {
      id: 'form-2',
      title: 'Irrigation System Evaluation',
      description: 'Assessment of irrigation practices and water management among rice farmers',
      date: '2025-06-10',
      responses: 87,
      status: 'active',
      type: 'irrigation'
    },
    {
      id: 'form-3',
      title: 'Soil Health Survey',
      description: 'Collection of data on soil quality and fertility management techniques',
      date: '2025-06-05',
      responses: 43,
      status: 'active',
      type: 'soil'
    },
    {
      id: 'form-4',
      title: 'Market Access Analysis',
      description: 'Survey to understand market access challenges for smallholder farmers',
      date: '2025-05-28',
      responses: 216,
      status: 'archived',
      type: 'market'
    },
    {
      id: 'form-5',
      title: 'Climate Impact Assessment',
      description: 'Study on climate change effects on agricultural production',
      date: '2025-05-20',
      responses: 0,
      status: 'draft',
      type: 'climate'
    },
    {
      id: 'form-6',
      title: 'Pest Management Survey',
      description: 'Evaluation of pest control methods used by farmers',
      date: '2025-05-15',
      responses: 129,
      status: 'archived',
      type: 'pest'
    }
  ]);
  
  const formsPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const formsGridRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Animations
  useEffect(() => {
    if (!isLoading && formsPageRef.current) {
      // Animate the page container
      gsap.fromTo(
        formsPageRef.current,
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
      
      // Animate controls
      if (controlsRef.current) {
        gsap.fromTo(
          controlsRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.5, delay: 0.1, ease: 'power2.out' }
        );
      }
      
      // Animate forms grid
      if (formsGridRef.current) {
        const formCards = formsGridRef.current.querySelectorAll('.form-card');
        gsap.fromTo(
          formCards,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            stagger: 0.05,
            duration: 0.4, 
            delay: 0.2,
            ease: 'power2.out' 
          }
        );
      }
    }
  }, [isLoading]);
  
  const handleSelectTemplate = (template: FormTemplate) => {
    // Redirect to form builder or create new form
    console.log('Selected template:', template);
    // In a real app, we would redirect to form builder with this template
  };
  
  const handleCreateForm = () => {
    // Create a new form and add it to the list
    const newForm = {
      id: `form-${userForms.length + 1}`,
      title: 'New Form',
      description: 'Click to edit this form',
      date: new Date().toISOString().split('T')[0],
      responses: 0,
      status: 'draft' as const,
      type: 'general'
    };
    
    setUserForms([newForm, ...userForms]);
    
    // Animate the new form card
    setTimeout(() => {
      const newFormCard = document.querySelector('.form-card:first-child');
      if (newFormCard) {
        gsap.fromTo(
          newFormCard,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.7)' }
        );
      }
    }, 10);
  };
  
  // Filter and sort forms
  const filteredForms = userForms
    .filter(form => {
      // Apply status filter
      if (filter !== 'all' && form.status !== filter) {
        return false;
      }
      
      // Apply search filter
      if (searchTerm && !form.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !form.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === 'responses') {
        return b.responses - a.responses;
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">{t('loadingForms')}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="px-4 py-6 md:px-6 lg:px-8" ref={formsPageRef}>
      {/* Page Header */}
      <div className="mb-6" ref={headerRef}>
        <h1 className="text-2xl font-bold text-gray-800">{t('forms')}</h1>
        <p className="text-gray-600">{t('formsDescription')}</p>
      </div>
      
      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6" ref={controlsRef}>
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder={t('searchForms')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="block appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
            >
              <option value="all">{t('allForms')}</option>
              <option value="active">{t('active')}</option>
              <option value="draft">{t('drafts')}</option>
              <option value="archived">{t('archived')}</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <Filter className="h-4 w-4" />
            </div>
          </div>
          
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="block appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
            >
              <option value="date">{t('dateCreated')}</option>
              <option value="responses">{t('responses')}</option>
              <option value="title">{t('alphabetically')}</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <Squircle className="h-4 w-4" />
            </div>
          </div>
          
          <button
            onClick={handleCreateForm}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Plus className="h-4 w-4 mr-1" />
            {t('createForm')}
          </button>
        </div>
      </div>
      
      {/* User Forms */}
      {filteredForms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8" ref={formsGridRef}>
          {filteredForms.map((form) => (
            <div key={form.id} className="form-card bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-medium text-gray-900 truncate" title={form.title}>
                    {form.title}
                  </h3>
                  <span 
                    className={`text-xs px-2 py-1 rounded-full ${
                      form.status === 'active' ? 'bg-green-100 text-green-800' : 
                      form.status === 'draft' ? 'bg-blue-100 text-blue-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {form.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2" title={form.description}>
                  {form.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(form.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <FileText className="h-4 w-4 mr-1" />
                    <span>{form.responses} {t('responses')}</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                <div className="flex justify-between">
                  <button className="text-sm font-medium text-green-600 hover:text-green-800">
                    {t('edit')}
                  </button>
                  <button className="text-sm font-medium text-gray-600 hover:text-gray-800">
                    {t('view')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
            <FileText className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">{t('noFormsFound')}</h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto mb-4">
            {searchTerm 
              ? t('noFormsMatchingSearch') 
              : filter !== 'all' 
                ? t('noFormsMatchingFilter') 
                : t('noFormsCreatedYet')
            }
          </p>
          <button
            onClick={handleCreateForm}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Plus className="h-4 w-4 mr-1" />
            {t('createYourFirstForm')}
          </button>
        </div>
      )}
      
      {/* Form Templates */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">{t('formTemplates')}</h2>
        <FormTemplates onSelectTemplate={handleSelectTemplate} />
      </div>
    </div>
  );
}

export default Forms;
