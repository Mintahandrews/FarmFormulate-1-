import { FormTemplate } from '../types';
import { getTemplates } from '../utils/formGenerator';
import { ArrowRight, ClipboardList } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface FormTemplatesProps {
  onSelectTemplate: (template: FormTemplate) => void;
}

export function FormTemplates({ onSelectTemplate }: FormTemplatesProps) {
  const templates = getTemplates();
  const { t } = useTranslation();
  const templatesContainerRef = useRef<HTMLDivElement>(null);
  const templateCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (templatesContainerRef.current) {
      // Animate the section header
      const header = templatesContainerRef.current.querySelector('h2');
      const subheader = templatesContainerRef.current.querySelector('p');
      
      if (header && subheader) {
        gsap.fromTo(
          [header, subheader],
          { opacity: 0, y: -20 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.5, 
            stagger: 0.1,
            ease: 'power2.out' 
          }
        );
      }
      
      // Animate template cards
      const cards = templateCardsRef.current.filter(Boolean);
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.5, 
            stagger: 0.1,
            delay: 0.3,
            ease: 'power2.out' 
          }
        );
      }
    }
  }, []);

  const handleTemplateClick = (template: FormTemplate) => {
    // Animate the clicked card
    const cardIndex = templates.findIndex(t => t.id === template.id);
    const card = templateCardsRef.current[cardIndex];
    
    if (card) {
      gsap.to(card, {
        scale: 1.02,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          onSelectTemplate(template);
        }
      });
    } else {
      onSelectTemplate(template);
    }
  };

  return (
    <div ref={templatesContainerRef}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
          AgriNova AI Survey Templates
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose from our AI-optimized templates to quickly create surveys for common agricultural data collection needs with built-in validation and quality assurance.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template, index) => (
          <div 
            key={template.id} 
            ref={(el) => templateCardsRef.current[index] = el}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleTemplateClick(template)}
          >
            <div className="p-4">
              <div className="flex items-start space-x-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <ClipboardList className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{template.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Includes:</div>
                <ul className="text-sm text-gray-600">
                  {template.features.map((feature, index) => (
                    <li key={index} className="mb-1 flex items-start">
                      <span className="text-green-500 mr-1">•</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-200 bg-gray-50 p-3 flex justify-end">
              <button className="text-sm text-green-600 hover:text-green-800 font-medium flex items-center">
                Use Template <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
