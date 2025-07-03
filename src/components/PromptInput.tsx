import React, { useState, useRef, useEffect } from 'react';
import { Loader, Sparkles } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { Textarea } from './ui/Textarea';
import gsap from 'gsap';
import { fadeIn, staggeredFadeIn, pulse } from '../utils/animations';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

export function PromptInput({ onSubmit, isLoading }: PromptInputProps) {
  const [prompt, setPrompt] = useState('');
  const { t } = useTranslation();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt);
    }
  };

  const suggestions = [
    t('createSurvey'),
    t('buildForm'),
    t('generateQuestionnaire')
  ];

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
    onSubmit(suggestion);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const suggestionButtonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    // Initial animation for the prompt section
    if (containerRef.current) {
      fadeIn(containerRef.current, 0.2, 0.8);
    }
    
    if (headerRef.current) {
      const heading = headerRef.current.querySelector('h2');
      const paragraph = headerRef.current.querySelector('p');
      
      if (heading && paragraph) {
        gsap.set([heading, paragraph], { opacity: 0, y: -20 });
        staggeredFadeIn([heading, paragraph], 0.2, 0.3, 0.8);
      }
    }
    
    if (formRef.current && textareaRef.current) {
      gsap.fromTo(
        textareaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.6, ease: 'power2.out' }
      );
    }
    
    if (suggestionsRef.current && suggestionButtonsRef.current.length > 0) {
      const title = suggestionsRef.current.querySelector('p');
      if (title) {
        gsap.fromTo(
          title,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, delay: 0.8, ease: 'power2.out' }
        );
      }
      
      const buttons = suggestionButtonsRef.current.filter(Boolean);
      gsap.set(buttons, { opacity: 0, y: 10 });
      gsap.to(buttons, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        delay: 1,
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  }, []);

  useEffect(() => {
    // Animation for loading state changes
    if (isLoading && textareaRef.current) {
      // Subtle pulse effect on textarea when processing
      gsap.to(textareaRef.current, {
        boxShadow: '0 0 0 2px rgba(21, 128, 61, 0.3)',
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    } else if (textareaRef.current) {
      // Clear animation when not loading
      gsap.killTweensOf(textareaRef.current);
      gsap.to(textareaRef.current, {
        boxShadow: 'none',
        duration: 0.3
      });
    }
  }, [isLoading]);
  
  const handleAnimatedSuggestionClick = (suggestion: string) => {
    if (textareaRef.current) {
      // Animate the text insertion
      gsap.to(textareaRef.current, {
        scale: 1.02,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          handleSuggestionClick(suggestion);
        }
      });
    } else {
      handleSuggestionClick(suggestion);
    }
  };

  // Handle prompt change
  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  return (
    <div className="space-y-4" ref={containerRef}>
      <div className="text-center mb-6" ref={headerRef}>
        <h2 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
          {t('intelligentFormBuilder')}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t('formBuilderDescription')}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="flex flex-col space-y-3">
          <div className="relative">
            <Textarea
              ref={textareaRef}
              value={prompt}
              onChange={handlePromptChange}
              placeholder={t('createSurvey')}
              className="w-full h-24"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className={`absolute bottom-3 right-3 inline-flex items-center px-4 py-2 rounded-md ${
                isLoading || !prompt.trim() 
                  ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              } transition-colors`}
              onClick={() => {
                if (!isLoading && prompt.trim()) {
                  // Add sparkle effect on button click
                  const button = document.querySelector('button[type="submit"]');
                  if (button) {
                    pulse(button, 1.1, 0.3);
                  }
                }
              }}
            >
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  {t('generating')}
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  {t('generateForm')}
                </>
              )}
            </button>
          </div>
        </div>
      </form>
      
      <div className="mt-4" ref={suggestionsRef}>
        <p className="text-sm text-gray-500 mb-2">{t('tryExamples')}</p>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              ref={(el) => { suggestionButtonsRef.current[index] = el; return undefined; }}
              onClick={() => handleAnimatedSuggestionClick(suggestion)}
              className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-3 rounded-full transition-colors"
              disabled={isLoading}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
