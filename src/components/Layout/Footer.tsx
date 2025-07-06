
import React from 'react';

interface FooterProps {
  currentLanguage: 'en' | 'de';
}

const Footer: React.FC<FooterProps> = ({ currentLanguage }) => {
  const texts = {
    en: {
      copyright: '© 2025 com:con solutions GmbH. All rights reserved.',
      privacy: 'Privacy Policy',
      imprint: 'Imprint'
    },
    de: {
      copyright: '© 2025 com:con solutions GmbH. Alle Rechte vorbehalten.',
      privacy: 'Datenschutz',
      imprint: 'Impressum'
    }
  };

  const t = texts[currentLanguage];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">{t.copyright}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
              {t.privacy}
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
              {t.imprint}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
