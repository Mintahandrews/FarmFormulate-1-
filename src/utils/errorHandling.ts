/**
 * Error handling and validation utilities for AgriNova AI
 */

/**
 * Validates a form field for common errors
 * @param field The field to validate
 * @returns An array of error messages, empty if no errors
 */
export function validateField(field: any): string[] {
  const errors: string[] = [];
  
  if (!field.label || field.label.trim() === '') {
    errors.push('Field label is required');
  }
  
  if (field.type === 'number') {
    if (field.validation && field.validation.min !== undefined && field.validation.max !== undefined) {
      if (Number(field.validation.min) > Number(field.validation.max)) {
        errors.push('Minimum value cannot be greater than maximum value');
      }
    }
  }
  
  if ((field.type === 'select' || field.type === 'radio' || field.type === 'checkbox') && 
      (!field.options || field.options.length === 0)) {
    errors.push('At least one option is required for this field type');
  }
  
  if (field.required && field.type === 'checkbox' && !field.validation?.errorMessage) {
    errors.push('Required checkbox fields should have an error message');
  }
  
  return errors;
}

/**
 * Validates form data for submission
 * @param formData The form data to validate
 * @returns True if valid, false if invalid
 */
export function validateFormData(formData: any): boolean {
  // Check for required fields
  for (const field of formData.fields) {
    if (field.required && !field.value) {
      return false;
    }
    
    if (field.type === 'number' && field.value !== undefined) {
      if (field.validation?.min !== undefined && Number(field.value) < Number(field.validation.min)) {
        return false;
      }
      if (field.validation?.max !== undefined && Number(field.value) > Number(field.validation.max)) {
        return false;
      }
    }
  }
  
  return true;
}

/**
 * Detects anomalies in form data (unusually high/low values, inconsistencies)
 * @param formData The form data to check
 * @returns An array of anomaly descriptions
 */
export function detectAnomalies(formData: any): string[] {
  const anomalies: string[] = [];
  
  // Example anomaly checks for agricultural data
  for (const field of formData.fields) {
    // Check for unrealistic yield values
    if (field.label.toLowerCase().includes('yield') && field.type === 'number' && field.value) {
      if (Number(field.value) > 200) {
        anomalies.push(`Unusually high yield value (${field.value}) detected for "${field.label}"`);
      }
    }
    
    // Check for unrealistic farm sizes
    if ((field.label.toLowerCase().includes('farm size') || 
         field.label.toLowerCase().includes('paddy size')) && 
        field.type === 'number' && field.value) {
      if (Number(field.value) > 10000) {
        anomalies.push(`Unusually large farm size (${field.value} hectares) detected`);
      }
    }
    
    // Check for unrealistic dates (future planting dates)
    if (field.label.toLowerCase().includes('planting date') && field.type === 'date' && field.value) {
      const plantingDate = new Date(field.value);
      const currentDate = new Date();
      if (plantingDate > currentDate) {
        anomalies.push(`Future planting date detected (${field.value})`);
      }
    }
    
    // Check for unrealistic rainfall data
    if (field.label.toLowerCase().includes('rainfall') && field.type === 'number' && field.value) {
      if (Number(field.value) > 5000) {
        anomalies.push(`Unusually high rainfall value (${field.value} mm) detected`);
      }
    }
    
    // Check for missing required data in select fields
    if (field.required && field.type === 'select' && (!field.value || field.value === '')) {
      anomalies.push(`Required field "${field.label}" is missing a selection`);
    }
    
    // Check for extreme temperature values
    if (field.label.toLowerCase().includes('temperature') && field.type === 'number' && field.value) {
      if (Number(field.value) > 60 || Number(field.value) < -20) {
        anomalies.push(`Extreme temperature value (${field.value}°C) detected for "${field.label}"`);
      }
    }
  }
  
  return anomalies;
}

/**
 * Handle error display and logging
 * @param error The error to handle
 * @param context Additional context for the error
 */
export function handleError(error: any, context: string = 'general'): void {
  // Log error to console in development
  console.error(`[AgriNova AI Error] [${context}]:`, error);
  
  // In a real app, we might send this to a monitoring service
}
