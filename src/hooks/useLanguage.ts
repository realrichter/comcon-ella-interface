
import { useState } from 'react';

type Language = 'en' | 'de';

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === 'en' ? 'de' : 'en');
  };

  return {
    currentLanguage,
    toggleLanguage
  };
};
