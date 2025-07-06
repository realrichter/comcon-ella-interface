
import React from 'react';
import AnimatedTextInput from './AnimatedTextInput';
import { Zap, Shield, Globe, Cpu } from 'lucide-react';

interface HeroSectionProps {
  onStartConversation: (message: string) => void;
  currentLanguage: 'en' | 'de';
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStartConversation, currentLanguage }) => {
  const texts = {
    en: {
      title: 'Build something',
      highlight: 'Integrated',
      subtitle: 'Transform your business with intelligent automation and seamless integrations',
      description: 'Meet Ella, your AI-powered integration assistant. Ask about connecting your systems, automating workflows, or discovering how our Business Automation Framework can revolutionize your operations.',
      features: [
        { icon: Zap, text: '200+ Pre-built Connectors' },
        { icon: Shield, text: 'Enterprise-Grade Security' },
        { icon: Cpu, text: 'AI-Powered Automation' },
        { icon: Globe, text: 'Global Scale & Reliability' }
      ]
    },
    de: {
      title: 'Erstellen Sie etwas',
      highlight: 'Integriertes',
      subtitle: 'Transformieren Sie Ihr Unternehmen mit intelligenter Automatisierung und nahtlosen Integrationen',
      description: 'Lernen Sie Ella kennen, Ihren KI-gesteuerten Integrations-Assistenten. Fragen Sie nach der Verbindung Ihrer Systeme, der Automatisierung von Workflows oder entdecken Sie, wie unser Business Automation Framework Ihre Abläufe revolutionieren kann.',
      features: [
        { icon: Zap, text: '200+ Vorgefertigte Konnektoren' },
        { icon: Shield, text: 'Unternehmenssicherheit' },
        { icon: Cpu, text: 'KI-gesteuerte Automatisierung' },
        { icon: Globe, text: 'Globale Skalierung & Zuverlässigkeit' }
      ]
    }
  };

  const t = texts[currentLanguage];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.2),transparent_70%)]"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl animate-bounce delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        {/* Main Heading */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4">
            <span className="text-white">{t.title} </span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-300 bg-clip-text text-transparent">
              {t.highlight}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Animated Text Input */}
        <div className="mb-12">
          <AnimatedTextInput 
            onSubmit={onStartConversation}
            currentLanguage={currentLanguage}
          />
        </div>

        {/* Description */}
        <p className="text-lg text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed">
          {t.description}
        </p>

        {/* Feature Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {t.features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-3 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <IconComponent className="w-4 h-4 text-white/80" />
                <span className="text-sm text-white/80 font-medium">{feature.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
