export interface ValidationRules {
  min?: number;
  max?: number;
  pattern?: string;
  errorMessage?: string;
}

export interface Field {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  options?: string[];
  validation?: ValidationRules;
}

export interface FormTemplate {
  id: string;
  title: string;
  description: string;
  fields: Field[];
  features: string[];
}
