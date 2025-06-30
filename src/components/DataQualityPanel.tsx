import { useState, useEffect, useRef } from 'react';
import { AlertTriangle, Check, Info } from 'lucide-react';
import { Field } from '../types';
import { detectAnomalies } from '../utils/errorHandling';
import gsap from 'gsap';
import { useTranslation } from '../hooks/useTranslation';

interface DataQualityPanelProps {
  fields: Field[];
}

interface FormData {
  fields: (Field & { value?: any })[];
}

export function DataQualityPanel({ fields }: DataQualityPanelProps) {
  const [formData, setFormData] = useState<FormData>({ fields: [] });
  const [anomalies, setAnomalies] = useState<string[]>([]);
  const [validationScore, setValidationScore] = useState(0);
  const [completenessScore, setCompletenessScore] = useState(0);
  const { t } = useTranslation();
  
  const panelRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);
  const anomaliesRef = useRef<HTMLDivElement>(null);

  // Populate form data with mock values for demonstration
  useEffect(() => {
    if (fields.length > 0) {
      const mockData = {
        fields: fields.map(field => {
          let mockValue;
          
          switch (field.type) {
            case 'text':
              mockValue = field.label.includes('Name') ? 'John Doe' : 'Sample data';
              break;
            case 'number':
              // Intentionally add some anomalies for demonstration
              if (field.label.includes('Yield')) {
                mockValue = Math.random() > 0.7 ? 250 : 45; // Sometimes generate unrealistic yield
              } else if (field.label.includes('Size')) {
                mockValue = Math.round(Math.random() * 50) + 1;
              } else {
                mockValue = Math.round(Math.random() * 100);
              }
              break;
            case 'select':
            case 'radio':
              mockValue = field.options ? field.options[Math.floor(Math.random() * field.options.length)] : '';
              break;
            case 'checkbox':
              if (field.options) {
                const numSelected = Math.floor(Math.random() * field.options.length) + 1;
                const selectedIndices = new Set();
                while (selectedIndices.size < numSelected) {
                  selectedIndices.add(Math.floor(Math.random() * field.options.length));
                }
                mockValue = Array.from(selectedIndices).map(i => field.options![i as number]);
              } else {
                mockValue = [];
              }
              break;
            case 'date':
              // Generate a date in the last year
              const today = new Date();
              const pastDate = new Date(today);
              pastDate.setDate(today.getDate() - Math.floor(Math.random() * 365));
              mockValue = pastDate.toISOString().split('T')[0];
              break;
            default:
              mockValue = '';
          }
          
          return {
            ...field,
            value: mockValue
          };
        })
      };
      
      setFormData(mockData);
      
      // Detect anomalies
      const detected = detectAnomalies(mockData);
      setAnomalies(detected);
      
      // Calculate scores
      calculateScores(mockData);
    }
  }, [fields]);

  const calculateScores = (data: FormData) => {
    // Calculate validation score (percentage of fields that pass validation)
    let validFields = 0;
    let requiredFields = 0;
    let filledFields = 0;
    
    data.fields.forEach(field => {
      if (field.required) {
        requiredFields++;
        if (field.value !== undefined && field.value !== '') {
          filledFields++;
        }
      }
      
      let isValid = true;
      
      // Check numeric validation
      if (field.type === 'number' && field.validation) {
        if (field.validation.min !== undefined && field.value < field.validation.min) {
          isValid = false;
        }
        if (field.validation.max !== undefined && field.value > field.validation.max) {
          isValid = false;
        }
      }
      
      if (isValid) {
        validFields++;
      }
    });
    
    const validationPercentage = data.fields.length > 0 ? (validFields / data.fields.length) * 100 : 0;
    setValidationScore(Math.round(validationPercentage));
    
    const completenessPercentage = requiredFields > 0 ? (filledFields / requiredFields) * 100 : 100;
    setCompletenessScore(Math.round(completenessPercentage));
  };

  // Animate elements when they mount
  useEffect(() => {
    if (panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
    
    if (scoreRef.current) {
      gsap.fromTo(
        scoreRef.current.querySelectorAll('.score-item'),
        { opacity: 0, scale: 0.9 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.4, 
          stagger: 0.1,
          delay: 0.3,
          ease: 'back.out(1.7)'
        }
      );
    }
    
    if (anomaliesRef.current && anomalies.length > 0) {
      gsap.fromTo(
        anomaliesRef.current.querySelectorAll('.anomaly-item'),
        { opacity: 0, x: -10 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.3, 
          stagger: 0.1,
          delay: 0.6,
          ease: 'power2.out'
        }
      );
    }
  }, [anomalies]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6" ref={panelRef}>
      <h3 className="text-xl font-bold mb-4">Data Quality Analysis</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" ref={scoreRef}>
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 score-item">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-blue-700 text-sm font-medium mb-1">Overall Quality</div>
              <div className="text-2xl font-bold text-blue-800">{Math.round((validationScore + completenessScore) / 2)}%</div>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <Info className="h-6 w-6 text-blue-700" />
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4 border border-green-100 score-item">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-green-700 text-sm font-medium mb-1">Validation Score</div>
              <div className="text-2xl font-bold text-green-800">{validationScore}%</div>
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <Check className="h-6 w-6 text-green-700" />
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-100 score-item">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-purple-700 text-sm font-medium mb-1">Completeness</div>
              <div className="text-2xl font-bold text-purple-800">{completenessScore}%</div>
            </div>
            <div className="bg-purple-100 p-2 rounded-full">
              <AlertTriangle className="h-6 w-6 text-purple-700" />
            </div>
          </div>
        </div>
      </div>
      
      {anomalies.length > 0 && (
        <div className="mb-6" ref={anomaliesRef}>
          <h4 className="text-lg font-medium mb-3 text-gray-700">Detected Anomalies</h4>
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-amber-800 font-medium mb-2">
                  The following potential data quality issues were detected:
                </p>
                <ul className="space-y-2">
                  {anomalies.map((anomaly, index) => (
                    <li 
                      key={index} 
                      className="text-amber-700 text-sm flex items-start anomaly-item"
                    >
                      <span className="text-amber-500 mr-2">•</span>
                      {anomaly}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h4 className="text-lg font-medium mb-3 text-gray-700">Recommendations</h4>
        <ul className="space-y-2">
          <li className="text-gray-600 text-sm flex items-start">
            <span className="text-green-500 mr-2">•</span>
            Add range validation for numeric fields to catch unrealistic values
          </li>
          <li className="text-gray-600 text-sm flex items-start">
            <span className="text-green-500 mr-2">•</span>
            Include clear instructions for field agents collecting data
          </li>
          <li className="text-gray-600 text-sm flex items-start">
            <span className="text-green-500 mr-2">•</span>
            Consider adding geolocation validation for region-specific surveys
          </li>
          {anomalies.length > 0 && (
            <li className="text-gray-600 text-sm flex items-start">
              <span className="text-green-500 mr-2">•</span>
              Review the detected anomalies and adjust field validation rules accordingly
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
