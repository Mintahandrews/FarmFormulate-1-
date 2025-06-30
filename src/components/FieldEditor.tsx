import { useState, useEffect } from 'react';
import { Field } from '../types';
import { CircleAlert, Plus, Save, X } from 'lucide-react';
import { validateField } from '../utils/errorHandling';
import { useTranslation } from '../hooks/useTranslation';

interface FieldEditorProps {
  field: Field;
  onSave: (field: Field) => void;
  onCancel: () => void;
}

export function FieldEditor({ field, onSave, onCancel }: FieldEditorProps) {
  const [editedField, setEditedField] = useState<Field>({ ...field });
  const [newOption, setNewOption] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setEditedField({
      ...editedField,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleValidationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const checked = e.target.checked;
    
    setEditedField({
      ...editedField,
      validation: {
        ...editedField.validation,
        [name]: type === 'checkbox' ? checked : value,
      },
    });
  };

  const handleAddOption = () => {
    if (newOption.trim() && editedField.options) {
      setEditedField({
        ...editedField,
        options: [...editedField.options, newOption.trim()],
      });
      setNewOption('');
    }
  };

  const handleRemoveOption = (index: number) => {
    if (editedField.options) {
      const newOptions = [...editedField.options];
      newOptions.splice(index, 1);
      setEditedField({
        ...editedField,
        options: newOptions,
      });
    }
  };

  const handleSave = () => {
    // Validate before saving
    const errors = validateField(editedField);
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    onSave(editedField);
  };
  
  // Validate field when it changes
  useEffect(() => {
    const errors = validateField(editedField);
    setValidationErrors(errors);
  }, [editedField]);

  // Handle pressing Enter in the option input to add the option
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newOption.trim()) {
      e.preventDefault();
      handleAddOption();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('fieldType')}</label>
        <select
          name="type"
          value={editedField.type}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="text">{t('text')}</option>
          <option value="number">{t('number')}</option>
          <option value="select">{t('select')}</option>
          <option value="radio">{t('radio')}</option>
          <option value="checkbox">{t('checkbox')}</option>
          <option value="date">{t('date')}</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('label')}</label>
        <input
          type="text"
          name="label"
          value={editedField.label}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('helpText')}</label>
        <input
          type="text"
          name="helpText"
          value={editedField.helpText || ''}
          onChange={handleChange}
          placeholder="Additional information about this field"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {(editedField.type === 'text' || editedField.type === 'number') && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('placeholder')}</label>
          <input
            type="text"
            name="placeholder"
            value={editedField.placeholder || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter placeholder text"
          />
        </div>
      )}

      {(editedField.type === 'select' || editedField.type === 'radio' || editedField.type === 'checkbox') && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('options')}</label>
          <div className="space-y-2 mb-2">
            {editedField.options?.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...(editedField.options || [])];
                    newOptions[index] = e.target.value;
                    setEditedField({
                      ...editedField,
                      options: newOptions,
                    });
                  }}
                  className="flex-1 p-2 border border-gray-300 rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveOption(index)}
                  className="ml-2 p-1 text-red-500 hover:bg-red-100 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center">
            <input
              type="text"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              placeholder={t('addOption')}
              className="flex-1 p-2 border border-gray-300 rounded-md"
              onKeyPress={handleKeyPress}
            />
            <button
              type="button"
              onClick={handleAddOption}
              className="ml-2 p-1 text-green-600 hover:bg-green-100 rounded flex items-center"
              disabled={!newOption.trim()}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {editedField.type === 'number' && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('minValue')}</label>
            <input
              type="number"
              name="min"
              value={editedField.validation?.min || ''}
              onChange={handleValidationChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('maxValue')}</label>
            <input
              type="number"
              name="max"
              value={editedField.validation?.max || ''}
              onChange={handleValidationChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="required"
            name="required"
            checked={editedField.required || false}
            onChange={handleChange}
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
          />
          <label htmlFor="required" className="ml-2 block text-sm text-gray-700">
            {t('requiredField')}
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('errorMessage')}</label>
        <input
          type="text"
          name="errorMessage"
          value={editedField.validation?.errorMessage || ''}
          onChange={handleValidationChange}
          placeholder="Error message to display when validation fails"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {validationErrors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mt-4">
          <div className="flex">
            <CircleAlert className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-red-800">{t('fixIssues')}</h3>
              <ul className="mt-1 text-sm text-red-700 list-disc list-inside">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          {t('cancel')}
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={validationErrors.length > 0}
          className={`px-4 py-2 border border-transparent rounded-md text-white flex items-center transition-colors ${
            validationErrors.length > 0 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          <Save className="w-4 h-4 mr-1" />
          {t('saveField')}
        </button>
      </div>
    </div>
  );
}
