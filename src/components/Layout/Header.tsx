
import React from 'react';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';

interface HeaderProps {
  currentLanguage: 'en' | 'de';
  onLanguageToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentLanguage, onLanguageToggle }) => {
  const texts = {
    en: {
      company: 'com:con solutions',
      integrations: 'Integrations',
      contact: 'Contact'
    },
    de: {
      company: 'com:con solutions',
      integrations: 'Integrationen', 
      contact: 'Kontakt'
    }
  };

  const t = texts[currentLanguage];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {t.company}
            </h1>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link 
              to="/integrations" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              {t.integrations}
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              {t.contact}
            </Link>
            
            <button
              onClick={onLanguageToggle}
              className="flex items-center space-x-1 px-3 py-1 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{currentLanguage.toUpperCase()}</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
