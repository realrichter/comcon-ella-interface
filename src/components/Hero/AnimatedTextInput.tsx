import React, { useState, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';

interface AnimatedTextInputProps {
  onSubmit: (message: string) => void;
  currentLanguage: 'en' | 'de';
  size?: 'sm' | 'md';
}

const AnimatedTextInput: React.FC<AnimatedTextInputProps> = ({ onSubmit, currentLanguage, size = 'md' }) => {
  const [inputValue, setInputValue] = useState('');
  const [currentPlaceholder, setCurrentPlaceholder] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const placeholders = {
    en: [
      "How can BAF streamline our CRM integration?",
      "What's the best way to automate our workflows?",
      "Can you integrate our SAP with Salesforce?",
      "How do we eliminate manual data entry?",
      "What integration solutions do you offer?",
      "How can we connect our e-commerce platform?",
      "What's your experience with manufacturing integrations?",
      "Can you help with our digital transformation?"
    ],
    de: [
      "Wie kann BAF unsere CRM-Integration optimieren?",
      "Was ist der beste Weg, unsere Workflows zu automatisieren?",
      "Können Sie unser SAP mit Salesforce integrieren?",
      "Wie eliminieren wir manuelle Dateneingabe?",
      "Welche Integrationslösungen bieten Sie an?",
      "Wie können wir unsere E-Commerce-Plattform verbinden?",
      "Welche Erfahrung haben Sie mit Fertigungsintegrationen?",
      "Können Sie bei unserer digitalen Transformation helfen?"
    ]
  };

  const currentPlaceholders = placeholders[currentLanguage];

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentText = currentPlaceholders[placeholderIndex];
      
      if (!isDeleting && charIndex < currentText.length) {
        setCurrentPlaceholder(currentText.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setCurrentPlaceholder(currentText.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setPlaceholderIndex((placeholderIndex + 1) % currentPlaceholders.length);
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, placeholderIndex, currentPlaceholders]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSubmit(inputValue.trim());
      setInputValue('');
    }
  };

  const texts = {
    en: {
      send: 'Send',
      askElla: 'Ask Ella anything...'
    },
    de: {
      send: 'Senden',
      askElla: 'Fragen Sie Ella etwas...'
    }
  };

  const t = texts[currentLanguage];

  // Size classes
  const sizeClasses = size === 'sm'
    ? {
        outer: 'max-w-2xl',
        padding: 'p-4',
        iconBox: 'w-10 h-10',
        icon: 'w-5 h-5',
        input: 'text-base',
        button: 'w-10 h-10',
        placeholder: 'text-base',
      }
    : {
        outer: 'max-w-4xl',
        padding: 'p-6',
        iconBox: 'w-12 h-12',
        icon: 'w-6 h-6',
        input: 'text-lg',
        button: 'w-12 h-12',
        placeholder: 'text-lg',
      };

  return (
    <div className={`relative w-full ${sizeClasses.outer} mx-auto`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          <div className={`absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300`}></div>
          <div className={`relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl ${sizeClasses.padding} shadow-2xl`}>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className={`${sizeClasses.iconBox} bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg`}>
                  <Sparkles className={`${sizeClasses.icon} text-white`} />
                </div>
              </div>
              
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder=""
                  className={`w-full bg-transparent text-white ${sizeClasses.input} placeholder-white/60 focus:outline-none resize-none border-none`}
                  autoComplete="off"
                />
                {!inputValue && (
                  <div className="absolute inset-0 flex items-center pointer-events-none">
                    <span className={`text-white/60 ${sizeClasses.placeholder}`}>
                      {currentPlaceholder}
                      <span className="animate-pulse">|</span>
                    </span>
                  </div>
                )}
              </div>
              
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className={`flex-shrink-0 ${sizeClasses.button} bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-lg`}
              >
                <Send className="w-5 h-5 text-white" />
                <span className="sr-only">{t.send}</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AnimatedTextInput;
