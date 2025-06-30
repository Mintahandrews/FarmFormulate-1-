import { Field, FormTemplate } from '../types';

export function generateSampleFields(prompt: string): { title: string; description: string; fields: Field[] } {
  // Parse the prompt to extract key information
  const lowercasePrompt = prompt.toLowerCase();
  
  let title = '';
  let description = '';
  let fields: Field[] = [];
  
  // Basic logic to generate form fields based on prompt keywords
  if (lowercasePrompt.includes('maize') || lowercasePrompt.includes('corn')) {
    title = 'Maize Yield and Pest Assessment';
    description = 'Survey to collect data on maize yield, pest impact, and farming practices in the selected region.';
    
    fields = [
      {
        id: 'field-1',
        type: 'text',
        label: 'Farmer Name',
        required: true,
        placeholder: 'Enter full name',
        validation: {
          errorMessage: 'Please enter your full name'
        }
      },
      {
        id: 'field-2',
        type: 'select',
        label: 'Region',
        required: true,
        options: ['Bono East', 'Ashanti', 'Northern', 'Upper East', 'Upper West', 'Volta'],
        validation: {
          errorMessage: 'Please select your region'
        }
      },
      {
        id: 'field-3',
        type: 'number',
        label: 'Farm Size (in hectares)',
        required: true,
        placeholder: 'Enter farm size',
        validation: {
          min: 0.1,
          max: 1000,
          errorMessage: 'Farm size must be between 0.1 and 1000 hectares'
        }
      },
      {
        id: 'field-4',
        type: 'select',
        label: 'Maize Variety',
        required: true,
        options: ['Obatanpa', 'Mamaba', 'Okomasa', 'Abontem', 'Other'],
        validation: {
          errorMessage: 'Please select a maize variety'
        }
      },
      {
        id: 'field-5',
        type: 'date',
        label: 'Planting Date',
        required: true,
        validation: {
          errorMessage: 'Please enter the planting date'
        }
      },
      {
        id: 'field-6',
        type: 'number',
        label: 'Expected Yield (bags per hectare)',
        required: true,
        placeholder: 'Enter expected yield',
        validation: {
          min: 1,
          max: 100,
          errorMessage: 'Expected yield must be between 1 and 100 bags per hectare'
        }
      },
      {
        id: 'field-7',
        type: 'radio',
        label: 'Have you observed pest damage?',
        required: true,
        options: ['Yes', 'No'],
        validation: {
          errorMessage: 'Please indicate if you have observed pest damage'
        }
      },
      {
        id: 'field-8',
        type: 'checkbox',
        label: 'Which pests have you observed?',
        options: ['Fall Armyworm', 'Stem Borer', 'Aphids', 'Grasshoppers', 'Other'],
        helpText: 'Select all that apply'
      },
      {
        id: 'field-9',
        type: 'radio',
        label: 'Pest Impact Severity',
        options: ['Low (less than 10% damage)', 'Medium (10-30% damage)', 'High (more than 30% damage)'],
      },
      {
        id: 'field-10',
        type: 'text',
        label: 'Additional Comments',
        placeholder: 'Enter any additional information about your maize crop and pest issues'
      }
    ];
  } else if (lowercasePrompt.includes('rice') || lowercasePrompt.includes('irrigation')) {
    title = 'Rice Farming and Irrigation Survey';
    description = 'Collection of data on rice varieties, irrigation practices, and production challenges.';
    
    fields = [
      {
        id: 'field-1',
        type: 'text',
        label: 'Farmer Name',
        required: true,
        placeholder: 'Enter full name',
        validation: {
          errorMessage: 'Please enter your full name'
        }
      },
      {
        id: 'field-2',
        type: 'select',
        label: 'Region',
        required: true,
        options: ['Northern', 'Upper East', 'Upper West', 'Volta', 'Western North', 'Ashanti'],
        validation: {
          errorMessage: 'Please select your region'
        }
      },
      {
        id: 'field-3',
        type: 'number',
        label: 'Rice Paddy Size (in hectares)',
        required: true,
        placeholder: 'Enter paddy size',
        validation: {
          min: 0.1,
          max: 500,
          errorMessage: 'Paddy size must be between 0.1 and 500 hectares'
        }
      },
      {
        id: 'field-4',
        type: 'select',
        label: 'Rice Variety',
        required: true,
        options: ['Jasmine 85', 'AGRA Rice', 'Nerica', 'Togo Marshall', 'Aromatic', 'Other'],
        validation: {
          errorMessage: 'Please select a rice variety'
        }
      },
      {
        id: 'field-5',
        type: 'radio',
        label: 'Irrigation Method',
        required: true,
        options: ['Flooding', 'Sprinkler', 'Drip', 'Rainfed (No irrigation)', 'Other'],
        validation: {
          errorMessage: 'Please select an irrigation method'
        }
      },
      {
        id: 'field-6',
        type: 'radio',
        label: 'Water Source',
        required: true,
        options: ['River/Stream', 'Dam/Reservoir', 'Groundwater/Well', 'Rainwater Harvesting', 'Other'],
        validation: {
          errorMessage: 'Please select a water source'
        }
      },
      {
        id: 'field-7',
        type: 'number',
        label: 'Irrigation Frequency (days per week)',
        placeholder: 'Enter days per week',
        validation: {
          min: 1,
          max: 7,
          errorMessage: 'Frequency must be between 1 and 7 days per week'
        }
      },
      {
        id: 'field-8',
        type: 'checkbox',
        label: 'Irrigation Challenges Faced',
        options: ['Water scarcity', 'Equipment breakdown', 'High cost of fuel', 'Limited access to equipment', 'Inadequate knowledge', 'Other'],
        helpText: 'Select all that apply'
      },
      {
        id: 'field-9',
        type: 'date',
        label: 'Last Harvest Date',
        validation: {
          errorMessage: 'Please enter the last harvest date'
        }
      },
      {
        id: 'field-10',
        type: 'number',
        label: 'Yield from Last Harvest (bags per hectare)',
        placeholder: 'Enter yield in bags',
        validation: {
          min: 1,
          max: 100,
          errorMessage: 'Yield must be between 1 and 100 bags per hectare'
        }
      }
    ];
  } else if (lowercasePrompt.includes('market') || lowercasePrompt.includes('access')) {
    title = 'Market Access Assessment for Smallholder Farmers';
    description = 'Survey to understand market access challenges and opportunities for smallholder farmers.';
    
    fields = [
      {
        id: 'field-1',
        type: 'text',
        label: 'Farmer Name',
        required: true,
        placeholder: 'Enter full name',
        validation: {
          errorMessage: 'Please enter your full name'
        }
      },
      {
        id: 'field-2',
        type: 'select',
        label: 'Region',
        required: true,
        options: ['Greater Accra', 'Eastern', 'Central', 'Western', 'Ashanti', 'Bono', 'Northern', 'Other'],
        validation: {
          errorMessage: 'Please select your region'
        }
      },
      {
        id: 'field-3',
        type: 'text',
        label: 'District',
        required: true,
        placeholder: 'Enter your district',
        validation: {
          errorMessage: 'Please enter your district'
        }
      },
      {
        id: 'field-4',
        type: 'checkbox',
        label: 'Main Crops Produced for Market',
        required: true,
        options: ['Maize', 'Rice', 'Cassava', 'Yam', 'Vegetables', 'Fruits', 'Cocoa', 'Other'],
        validation: {
          errorMessage: 'Please select at least one crop'
        },
        helpText: 'Select all that apply'
      },
      {
        id: 'field-5',
        type: 'radio',
        label: 'Primary Market Channel',
        required: true,
        options: ['Local market', 'Traders/Middlemen', 'Processors', 'Exporters', 'Direct to consumers', 'Cooperatives', 'Other'],
        validation: {
          errorMessage: 'Please select your primary market channel'
        }
      },
      {
        id: 'field-6',
        type: 'number',
        label: 'Distance to Nearest Market (km)',
        required: true,
        placeholder: 'Enter distance in kilometers',
        validation: {
          min: 0,
          max: 500,
          errorMessage: 'Distance must be between 0 and 500 kilometers'
        }
      },
      {
        id: 'field-7',
        type: 'radio',
        label: 'Transportation Method to Market',
        required: true,
        options: ['On foot', 'Bicycle', 'Motorcycle', 'Car/Taxi', 'Truck', 'Public transport', 'Other'],
        validation: {
          errorMessage: 'Please select your transportation method'
        }
      },
      {
        id: 'field-8',
        type: 'checkbox',
        label: 'Market Access Challenges',
        options: ['Poor road conditions', 'High transportation costs', 'Price fluctuations', 'Limited storage facilities', 'Lack of market information', 'Limited bargaining power', 'Other'],
        helpText: 'Select all that apply'
      },
      {
        id: 'field-9',
        type: 'radio',
        label: 'Access to Market Price Information',
        options: ['Daily', 'Weekly', 'Monthly', 'Rarely', 'Never'],
      },
      {
        id: 'field-10',
        type: 'text',
        label: 'Suggestions for Improving Market Access',
        placeholder: 'Enter your suggestions'
      }
    ];
  } else {
    // Default agricultural survey
    title = 'AgriNova AI Farm Assessment';
    description = 'Comprehensive survey to collect data on farming practices, challenges, and opportunities for data-driven agricultural insights.';
    
    fields = [
      {
        id: 'field-1',
        type: 'text',
        label: 'Farmer Name',
        required: true,
        placeholder: 'Enter full name',
        validation: {
          errorMessage: 'Please enter your full name'
        }
      },
      {
        id: 'field-2',
        type: 'text',
        label: 'Contact Number',
        placeholder: 'Enter phone number',
      },
      {
        id: 'field-3',
        type: 'select',
        label: 'Region',
        required: true,
        options: ['Greater Accra', 'Eastern', 'Central', 'Western', 'Ashanti', 'Bono', 'Northern', 'Upper East', 'Upper West', 'Volta', 'Other'],
        validation: {
          errorMessage: 'Please select your region'
        }
      },
      {
        id: 'field-4',
        type: 'number',
        label: 'Total Farm Size (hectares)',
        required: true,
        placeholder: 'Enter farm size',
        validation: {
          min: 0.1,
          max: 1000,
          errorMessage: 'Farm size must be between 0.1 and 1000 hectares'
        }
      },
      {
        id: 'field-5',
        type: 'checkbox',
        label: 'Crops Cultivated',
        required: true,
        options: ['Maize', 'Rice', 'Cassava', 'Yam', 'Vegetables', 'Fruits', 'Cocoa', 'Other'],
        validation: {
          errorMessage: 'Please select at least one crop'
        },
        helpText: 'Select all that apply'
      },
      {
        id: 'field-6',
        type: 'radio',
        label: 'Farming System',
        required: true,
        options: ['Subsistence farming', 'Semi-commercial', 'Commercial', 'Mixed farming'],
        validation: {
          errorMessage: 'Please select your farming system'
        }
      },
      {
        id: 'field-7',
        type: 'checkbox',
        label: 'Agricultural Inputs Used',
        options: ['Chemical fertilizers', 'Organic fertilizers', 'Pesticides', 'Herbicides', 'Improved seeds', 'Machinery', 'Irrigation'],
        helpText: 'Select all that apply'
      },
      {
        id: 'field-8',
        type: 'radio',
        label: 'Access to Agricultural Extension Services',
        options: ['Regularly', 'Occasionally', 'Rarely', 'Never'],
      },
      {
        id: 'field-9',
        type: 'checkbox',
        label: 'Major Challenges Faced',
        options: ['Weather uncertainty', 'Pest and diseases', 'Market access', 'Input costs', 'Labor shortage', 'Land access', 'Finance/Credit', 'Other'],
        helpText: 'Select all that apply'
      },
      {
        id: 'field-10',
        type: 'text',
        label: 'Additional Comments',
        placeholder: 'Enter any additional information about your farming operations'
      }
    ];
  }
  
  return { title, description, fields };
}

export function getTemplates(): FormTemplate[] {
  return [
    {
      id: 'template-1',
      title: 'Crop Yield Assessment',
      description: 'Collect data on crop yields, farming practices, and challenges faced by farmers.',
      features: [
        'Crop type and variety selection',
        'Yield data collection',
        'Farming practice assessment',
        'Weather impact evaluation'
      ],
      fields: generateSampleFields('crop yield assessment').fields
    },
    {
      id: 'template-2',
      title: 'Pest and Disease Survey',
      description: 'Monitor pest and disease prevalence in agricultural crops across different regions.',
      features: [
        'Pest identification and severity',
        'Disease prevalence tracking',
        'Control methods used',
        'Impact on crop yield'
      ],
      fields: generateSampleFields('pest and disease survey').fields
    },
    {
      id: 'template-3',
      title: 'Irrigation and Water Management',
      description: 'Assess irrigation practices, water sources, and management techniques used by farmers.',
      features: [
        'Water source identification',
        'Irrigation methods used',
        'Water conservation practices',
        'Challenges in water access'
      ],
      fields: generateSampleFields('irrigation and water management').fields
    },
    {
      id: 'template-4',
      title: 'Market Access Assessment',
      description: 'Evaluate farmers\' access to markets, price information, and market-related challenges.',
      features: [
        'Market channel analysis',
        'Transportation and logistics',
        'Price information access',
        'Market barriers identification'
      ],
      fields: generateSampleFields('market access assessment').fields
    },
    {
      id: 'template-5',
      title: 'Soil Health and Fertility',
      description: 'Collect data on soil quality, fertility management, and soil conservation practices.',
      features: [
        'Soil type classification',
        'Fertilizer usage tracking',
        'Soil conservation methods',
        'Soil testing practices'
      ],
      fields: generateSampleFields('soil health and fertility').fields
    },
    {
      id: 'template-6',
      title: 'Farm Input Usage',
      description: 'Monitor the use of agricultural inputs including seeds, fertilizers, and pesticides.',
      features: [
        'Input type and quantity tracking',
        'Source of inputs information',
        'Input cost assessment',
        'Challenges in input access'
      ],
      fields: generateSampleFields('farm input usage').fields
    },
    {
      id: 'template-7',
      title: 'Climate Change Impact Survey',
      description: 'Gather data on how climate change is affecting agricultural activities and crop production.',
      features: [
        'Weather pattern changes',
        'Adaptation strategies',
        'Crop resilience assessment',
        'Climate-related challenges'
      ],
      fields: generateSampleFields('climate change impact').fields
    },
    {
      id: 'template-8',
      title: 'Agricultural Technology Adoption',
      description: 'Evaluate the adoption of modern agricultural technologies among farmers.',
      features: [
        'Technology awareness and usage',
        'Barriers to adoption',
        'Training needs assessment',
        'Productivity impact evaluation'
      ],
      fields: generateSampleFields('agricultural technology adoption').fields
    }
  ];
}
