import { Field } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface FieldRendererProps {
  field: Field;
  disabled?: boolean;
}

export function FieldRenderer({ field, disabled = false }: FieldRendererProps) {
  const { t } = useTranslation();
  
  const renderField = () => {
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            id={field.id}
            placeholder={field.placeholder}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required={field.required}
            disabled={disabled}
          />
        );
      
      case 'number':
        return (
          <input
            type="number"
            id={field.id}
            placeholder={field.placeholder}
            min={field.validation?.min}
            max={field.validation?.max}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required={field.required}
            disabled={disabled}
          />
        );
      
      case 'select':
        return (
          <select
            id={field.id}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required={field.required}
            disabled={disabled}
          >
            <option value="">Select an option</option>
            {field.options?.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option, i) => (
              <div key={i} className="flex items-center">
                <input
                  type="radio"
                  id={`${field.id}-${i}`}
                  name={field.id}
                  value={option}
                  className="mr-2 focus:ring-green-500 text-green-600"
                  required={field.required}
                  disabled={disabled}
                />
                <label htmlFor={`${field.id}-${i}`} className="text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
        );
      
      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options?.map((option, i) => (
              <div key={i} className="flex items-center">
                <input
                  type="checkbox"
                  id={`${field.id}-${i}`}
                  name={field.id}
                  value={option}
                  className="mr-2 focus:ring-green-500 text-green-600 rounded"
                  disabled={disabled}
                />
                <label htmlFor={`${field.id}-${i}`} className="text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
        );
      
      case 'date':
        return (
          <input
            type="date"
            id={field.id}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required={field.required}
            disabled={disabled}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div>
      <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {field.helpText && (
        <p className="text-xs text-gray-500 mb-1">{field.helpText}</p>
      )}
      {renderField()}
      {field.validation?.errorMessage && (
        <p className="mt-1 text-xs text-red-500">{field.validation.errorMessage}</p>
      )}
    </div>
  );
}
