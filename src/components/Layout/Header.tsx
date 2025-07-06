import React from 'react';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';

interface HeaderProps {
  currentLanguage: 'en' | 'de';
  onLanguageToggle: () => void;
  variant?: 'transparent' | 'solid';
}

const Header: React.FC<HeaderProps> = ({ currentLanguage, onLanguageToggle, variant = 'solid' }) => {
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

  // Dynamic styles based on variant
  const headerClass =
    variant === 'transparent'
      ? 'sticky top-0 z-50 bg-transparent backdrop-blur-none'
      : 'sticky top-0 z-50 bg-[#21496c] backdrop-blur-sm';
  const linkClass =
    'font-medium transition-colors drop-shadow ' +
    (variant === 'transparent'
      ? 'text-white hover:text-blue-200'
      : 'text-white hover:text-blue-300');
  const companyClass =
    'text-2xl font-bold drop-shadow-md ' +
    (variant === 'transparent' ? 'text-white' : 'text-white');
  const buttonClass =
    'flex items-center space-x-1 px-3 py-1 rounded-md border border-white/30 transition-colors drop-shadow ' +
    (variant === 'transparent'
      ? 'text-white hover:bg-white/10'
      : 'text-white hover:bg-white/10');

  return (
    <header className={headerClass}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex-shrink-0">
            <h1 className={companyClass}>
              {t.company}
            </h1>
          </Link>
          <div className="flex items-center space-x-6">
            <Link 
              to="/integrations" 
              className={linkClass}
            >
              {t.integrations}
            </Link>
            <Link 
              to="/contact" 
              className={linkClass}
            >
              {t.contact}
            </Link>
            <button
              onClick={onLanguageToggle}
              className={buttonClass}
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
