
import React from 'react';
import { ChevronDown } from 'lucide-react';

export type Industry = 'manufacturing' | 'services' | 'public-sector' | 'retail' | 'healthcare' | '';

interface IndustrySelectorProps {
  selectedIndustry: Industry;
  onIndustryChange: (industry: Industry) => void;
  currentLanguage: 'en' | 'de';
}

const IndustrySelector: React.FC<IndustrySelectorProps> = ({ 
  selectedIndustry, 
  onIndustryChange, 
  currentLanguage 
}) => {
  const texts = {
    en: {
      title: 'Select Your Industry',
      placeholder: 'Choose your industry to see tailored solutions...',
      industries: {
        manufacturing: 'Manufacturing',
        services: 'Professional Services',
        'public-sector': 'Public Sector',
        retail: 'Retail & E-commerce',
        healthcare: 'Healthcare'
      }
    },
    de: {
      title: 'Wählen Sie Ihre Branche',
      placeholder: 'Wählen Sie Ihre Branche für maßgeschneiderte Lösungen...',
      industries: {
        manufacturing: 'Fertigung',
        services: 'Professionelle Dienstleistungen',
        'public-sector': 'Öffentlicher Sektor',
        retail: 'Einzelhandel & E-Commerce',
        healthcare: 'Gesundheitswesen'
      }
    }
  };

  const t = texts[currentLanguage];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.title}</h3>
      
      <div className="relative">
        <select
          value={selectedIndustry}
          onChange={(e) => onIndustryChange(e.target.value as Industry)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
        >
          <option value="">{t.placeholder}</option>
          {Object.entries(t.industries).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
};

export default IndustrySelector;
