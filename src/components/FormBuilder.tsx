import { useState, useRef, useEffect } from 'react';
import { PromptInput } from './PromptInput';
import { FormPreview } from './FormPreview';
import { FormTemplates } from './FormTemplates';
import { DataQualityPanel } from './DataQualityPanel';
import { Field, FormTemplate } from '../types';
import { generateSampleFields } from '../utils/formGenerator';
import { Tabs } from './Tabs';
import gsap from 'gsap';
import { fadeIn, scaleIn, slideIn } from '../utils/animations';
import { useTranslation } from '../hooks/useTranslation';

export function FormBuilder() {
  const [fields, setFields] = useState<Field[]>([]);
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('create');
  const { t } = useTranslation();

  const handleGenerateForm = (prompt: string) => {
    setIsGenerating(true);
    
    // Simulate AI generation with a timeout
    setTimeout(() => {
      const result = generateSampleFields(prompt);
      setFields(result.fields);
      setFormTitle(result.title);
      setFormDescription(result.description);
      setIsGenerating(false);
    }, 1500);
  };

  const handleSelectTemplate = (template: FormTemplate) => {
    setFields(template.fields);
    setFormTitle(template.title);
    setFormDescription(template.description);
    setActiveTab('create');
  };

  const handleFieldUpdate = (updatedField: Field, index: number) => {
    const newFields = [...fields];
    newFields[index] = updatedField;
    setFields(newFields);
  };

  const handleFieldReorder = (startIndex: number, endIndex: number) => {
    const newFields = [...fields];
    const [removed] = newFields.splice(startIndex, 1);
    newFields.splice(endIndex, 0, removed);
    setFields(newFields);
  };

  const handleAddField = (type: string) => {
    const newField: Field = {
      id: `field-${Date.now()}`,
      type,
      label: `New ${type} field`,
      required: false,
      options: type === 'select' || type === 'radio' || type === 'checkbox' ? ['Option 1', 'Option 2'] : undefined,
      validation: {}
    };
    
    setFields([...fields, newField]);
  };

  const handleDeleteField = (index: number) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const tabs = [
    { id: 'create', label: t('editForm'), icon: 'Pencil' },
    { id: 'templates', label: t('forms'), icon: 'Template' },
    { id: 'quality', label: t('dataQuality'), icon: 'BarChart' }
  ];

  const formBuilderRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Initial animation for the form builder
    if (formBuilderRef.current) {
      gsap.fromTo(
        formBuilderRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
      );
    }
  }, []);
  
  useEffect(() => {
    // Animate tab content changes
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: activeTab === 'create' ? -20 : 20 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [activeTab]);
  
  useEffect(() => {
    // Animate form preview when it appears
    if (fields.length > 0 && previewRef.current) {
      scaleIn(previewRef.current, 0.2, 0.6);
    }
  }, [fields.length]);

  return (
    <div 
      ref={formBuilderRef} 
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
    >
      <div ref={tabsRef}>
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>
      
      <div className="p-6">
        <div ref={contentRef}>
          {activeTab === 'create' && (
            <>
              <PromptInput onSubmit={handleGenerateForm} isLoading={isGenerating} />
              
              {fields.length > 0 && (
                <div className="mt-8" ref={previewRef}>
                  <FormPreview 
                    title={formTitle}
                    description={formDescription}
                    fields={fields}
                    onUpdateField={handleFieldUpdate}
                    onReorderField={handleFieldReorder}
                    onAddField={handleAddField}
                    onDeleteField={handleDeleteField}
                    onTitleChange={setFormTitle}
                    onDescriptionChange={setFormDescription}
                  />
                </div>
              )}
            </>
          )}
          
          {activeTab === 'templates' && (
            <FormTemplates onSelectTemplate={handleSelectTemplate} />
          )}

          {activeTab === 'quality' && fields.length > 0 && (
            <DataQualityPanel fields={fields} />
          )}
        </div>
      </div>
    </div>
  );
}
