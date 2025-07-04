/**
 * @fileoverview Form preview component with drag and drop functionality and animations
 * @typedef {import('gsap').gsap} gsap
 * @typedef {Object} Tween - GSAP animation tween
 * @property {boolean} yoyo - Whether the animation plays back and forth
 */

import { useState, useRef, useEffect } from 'react';
import { Field } from '../types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { AlignJustify, CirclePlus, Eye, FileJson, Pencil, Save, Trash2 } from 'lucide-react';
import { FieldRenderer } from './FieldRenderer';
import { FieldEditor } from './FieldEditor';
import { Tabs } from './Tabs';
import gsap from 'gsap';
import { fadeIn, scaleIn, slideIn, pulse, shake } from '../utils/animations';
import { useTranslation } from '../hooks/useTranslation';

interface FormPreviewProps {
  title: string;
  description: string;
  fields: Field[];
  onUpdateField: (field: Field, index: number) => void;
  onReorderField: (startIndex: number, endIndex: number) => void;
  onAddField: (type: string) => void;
  onDeleteField: (index: number) => void;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
}

export function FormPreview({
  title,
  description,
  fields,
  onUpdateField,
  onReorderField,
  onAddField,
  onDeleteField,
  onTitleChange,
  onDescriptionChange
}: FormPreviewProps) {
  const [editingField, setEditingField] = useState<{ field: Field; index: number } | null>(null);
  const [mode, setMode] = useState<'edit' | 'preview' | 'json'>('edit');
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const { t } = useTranslation();

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    // Get the dragged DOM element
    const draggedItem = document.getElementById(result.draggableId);
    
    if (draggedItem) {
      // Add a highlight effect when the item is dropped
      gsap.fromTo(
        draggedItem,
        { backgroundColor: 'rgba(134, 239, 172, 0.3)' },  // light green highlight
        { 
          backgroundColor: 'rgba(255, 255, 255, 1)', 
          duration: 1,
          ease: 'power2.out',
          clearProps: 'backgroundColor'
        }
      );
    }
    
    onReorderField(result.source.index, result.destination.index);
  };

  const handleEditField = (field: Field, index: number) => {
    setEditingField({ field, index });
  };

  const handleFieldUpdate = (updatedField: Field) => {
    if (editingField) {
      onUpdateField(updatedField, editingField.index);
      setEditingField(null);
    }
  };

  const tabs = [
    { id: 'edit', label: t('editForm'), icon: 'Pencil' },
    { id: 'preview', label: t('previewForm'), icon: 'Eye' },
    { id: 'json', label: t('exportJSON'), icon: 'FileJson' }
  ];

  const previewRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const jsonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animation when switching modes
    if (mode === 'preview' && previewRef.current) {
      gsap.fromTo(
        previewRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
    
    if (mode === 'json' && jsonRef.current) {
      gsap.fromTo(
        jsonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [mode]);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
      <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4">
        <Tabs 
          tabs={tabs} 
          activeTab={mode} 
          onChange={(tab) => setMode(tab as 'edit' | 'preview' | 'json')} 
        />
      </div>

      {mode === 'edit' && (
        <div className="p-6" ref={formRef}>
          <div className="mb-6">
            {editingTitle ? (
              <div className="mb-4">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => onTitleChange(e.target.value)}
                  className="w-full text-xl font-bold p-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100"
                  onBlur={() => setEditingTitle(false)}
                  autoFocus
                />
              </div>
            ) : (
              <div className="flex justify-between items-center mb-2" onClick={() => setEditingTitle(true)}>
                <h3 className="text-xl font-bold cursor-pointer hover:text-green-600 dark:hover:text-green-500 transition-colors dark:text-gray-100">
                  {title || t('untitledForm')}
                </h3>
                <Pencil className="w-4 h-4 text-gray-400" />
              </div>
            )}

            {editingDescription ? (
              <div>
                <textarea
                  value={description}
                  onChange={(e) => onDescriptionChange(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100 font-medium"
                  onBlur={() => setEditingDescription(false)}
                  rows={3}
                  autoFocus
                />
              </div>
            ) : (
              <div 
                className="text-gray-600 dark:text-gray-300 cursor-pointer hover:text-gray-800 dark:hover:text-gray-100 transition-colors flex items-center"
                onClick={() => setEditingDescription(true)}
              >
                <p className="flex-1">{description || t('addDescription')}</p>
                <Pencil className="w-4 h-4 text-gray-400 ml-2" />
              </div>
            )}
          </div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="form-fields">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  {fields.map((field, index) => (
                    <Draggable key={field.id} draggableId={field.id} index={index}>
                      {(provided) => (
                        <div
                          id={field.id}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                              <div
                                {...provided.dragHandleProps}
                                className="cursor-grab mr-2 text-gray-400 hover:text-gray-600"
                              >
                                <AlignJustify className="w-5 h-5" />
                              </div>
                              <h4 className="font-medium">{field.label}</h4>
                              {field.required && (
                                <span className="ml-2 text-xs text-red-500">*{t('required')}</span>
                              )}
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditField(field, index)}
                                className="p-1 text-gray-400 hover:text-green-600 dark:hover:text-green-500"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => onDeleteField(index)}
                                className="p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div>
                            <FieldRenderer field={field} disabled />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">{t('addField')}</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2">
              {[
                { type: 'text', label: t('text') },
                { type: 'number', label: t('number') },
                { type: 'select', label: t('select') },
                { type: 'radio', label: t('radio') },
                { type: 'checkbox', label: t('checkbox') },
                { type: 'date', label: t('date') }
              ].map(({ type, label }) => (
                <button
                  key={type}
                  onClick={() => onAddField(type)}
                  className="flex items-center justify-center p-2 bg-green-50 hover:bg-green-100 border border-green-200 text-green-700 dark:bg-green-900/20 dark:hover:bg-green-900/30 dark:border-green-800 dark:text-green-400 rounded-md transition-colors text-sm font-medium"
                >
                  <CirclePlus className="w-4 h-4 mr-1" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {editingField && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div 
                className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
                ref={(el) => {
                  if (el) {
                    gsap.fromTo(
                      el,
                      { opacity: 0, y: 20, scale: 0.95 },
                      { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power2.out' }
                    );
                  }
                }}
              >
                <h3 className="text-lg font-semibold mb-4">{t('editForm')}</h3>
                <FieldEditor 
                  field={editingField.field} 
                  onSave={handleFieldUpdate} 
                  onCancel={() => {
                    // Animate modal closing
                    const modal = document.querySelector('.fixed.inset-0 .bg-white');
                    if (modal) {
                      gsap.to(modal, {
                        opacity: 0,
                        y: 20,
                        scale: 0.95,
                        duration: 0.3,
                        ease: 'power2.in',
                        onComplete: () => setEditingField(null)
                      });
                    } else {
                      setEditingField(null);
                    }
                  }} 
                />
              </div>
            </div>
          )}
        </div>
      )}

      {mode === 'preview' && (
        <div className="p-6" ref={previewRef}>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold mb-2">{title || t('untitledForm')}</h2>
            {description && <p className="text-gray-600 mb-6">{description}</p>}
            
            <div className="space-y-6">
              {fields.map((field) => (
                <div key={field.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                  <FieldRenderer field={field} />
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-end">
              <button 
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center shadow-sm"
                onClick={() => {
                  // Add animation for successful submission
                  const button = document.querySelector('.px-4.py-2.bg-green-600');
                  if (button) {
                    gsap.to(button, {
                      scale: 1.05,
                      duration: 0.2,
                      yoyo: true,
                      repeat: 1,
                      onComplete: () => {
                        // Show success message
                        alert('Form submitted successfully!');
                      }
                    });
                  }
                }}
              >
                <Save className="w-4 h-4 mr-2" />
                {t('submitForm')}
              </button>
            </div>
          </div>
        </div>
      )}

      {mode === 'json' && (
        <div className="p-6" ref={jsonRef}>
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
              <h3 className="font-medium text-gray-700">{t('formSchemaJSON')}</h3>
              <button 
                className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center shadow-sm justify-center"
                onClick={() => {
                  // Create downloadable JSON
                  const formData = {
                    title,
                    description,
                    fields: fields.map(({ id, ...rest }) => rest),
                  };
                  
                  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formData, null, 2));
                  const downloadAnchorNode = document.createElement('a');
                  downloadAnchorNode.setAttribute("href", dataStr);
                  downloadAnchorNode.setAttribute("download", `${title.replace(/\s+/g, '_')}_form.json`);
                  document.body.appendChild(downloadAnchorNode);
                  downloadAnchorNode.click();
                  downloadAnchorNode.remove();
                  
                  // Animation for button
                  const button = document.querySelector('.bg-blue-600');
                  if (button) {
                    gsap.to(button, {
                      scale: 1.05,
                      duration: 0.2,
                      yoyo: true,
                      repeat: 1
                    });
                  }
                }}
              >
                <FileJson className="w-4 h-4 mr-1" />
                {t('downloadJSON')}
              </button>
            </div>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
              {JSON.stringify(
                {
                  title,
                  description,
                  fields: fields.map(({ id, ...rest }) => rest),
                },
                null,
                2
              )}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
