import React from 'react';
import { Zap, Shield, Cpu, Globe, X } from 'lucide-react';

interface BAFInfoSectionProps {
  isExpanded: boolean;
  onClose: () => void;
  currentLanguage: 'en' | 'de';
}

const BAFInfoSection: React.FC<BAFInfoSectionProps> = ({ isExpanded, onClose, currentLanguage }) => {
  if (!isExpanded) return null;

  const texts = {
    en: {
      title: 'Best Application Framework (BAF)',
      subtitle: 'The Complete Integration Platform for Modern Businesses',
      description: 'Our Best Application Framework (BAF) is a comprehensive integration platform that connects disparate business systems, eliminates manual processes, and creates intelligent workflows that adapt to your business needs.',
      coreFeatures: 'Core Features',
      features: [
        {
          icon: Zap,
          title: 'Lightning-Fast Integration',
          description: 'Pre-built connectors for 200+ business applications with drag-and-drop workflow builder'
        },
        {
          icon: Shield,
          title: 'Enterprise Security',
          description: 'Bank-grade encryption, SOC 2 compliance, and advanced data governance controls'
        },
        {
          icon: Cpu,
          title: 'AI-Powered Automation',
          description: 'Intelligent process automation that learns from your business patterns and optimizes workflows'
        },
        {
          icon: Globe,
          title: 'Global Scalability',
          description: 'Multi-region deployment with 99.9% uptime SLA and automatic scaling capabilities'
        }
      ],
      benefits: 'Key Benefits',
      benefitsList: [
        'Reduce manual data entry by up to 90%',
        'Improve data accuracy and consistency across systems',
        'Accelerate business processes by 3-5x',
        'Enable real-time decision making with unified data',
        'Lower operational costs through automation',
        'Enhance customer experience with seamless workflows'
      ],
      useCases: 'Common Use Cases',
      useCasesList: [
        'CRM to ERP synchronization for order management',
        'E-commerce platform integration with inventory systems',
        'Financial data consolidation across multiple systems',
        'Customer service automation and ticket routing',
        'Marketing automation and lead nurturing workflows',
        'Supply chain visibility and automated procurement'
      ],
      close: 'Close'
    },
    de: {
      title: 'Best Application Framework (BAF)',
      subtitle: 'Die komplette Integrationsplattform für moderne Unternehmen',
      description: 'Unser Best Application Framework (BAF) ist eine umfassende Integrationsplattform, die verschiedene Geschäftssysteme verbindet, manuelle Prozesse eliminiert und intelligente Workflows erstellt, die sich an Ihre Geschäftsanforderungen anpassen.',
      coreFeatures: 'Kernfunktionen',
      features: [
        {
          icon: Zap,
          title: 'Blitzschnelle Integration',
          description: 'Vorgefertigte Konnektoren für 200+ Geschäftsanwendungen mit Drag-and-Drop-Workflow-Builder'
        },
        {
          icon: Shield,
          title: 'Unternehmenssicherheit',
          description: 'Bank-sichere Verschlüsselung, SOC 2-Konformität und erweiterte Data-Governance-Kontrollen'
        },
        {
          icon: Cpu,
          title: 'KI-gesteuerte Automatisierung',
          description: 'Intelligente Prozessautomatisierung, die aus Ihren Geschäftsmustern lernt und Workflows optimiert'
        },
        {
          icon: Globe,
          title: 'Globale Skalierbarkeit',
          description: 'Multi-Region-Bereitstellung mit 99,9% Uptime-SLA und automatischen Skalierungsfunktionen'
        }
      ],
      benefits: 'Hauptvorteile',
      benefitsList: [
        'Reduzierung der manuellen Dateneingabe um bis zu 90%',
        'Verbesserung der Datengenauigkeit und -konsistenz über Systeme hinweg',
        'Beschleunigung von Geschäftsprozessen um das 3-5-fache',
        'Ermöglichung von Echtzeitentscheidungen mit einheitlichen Daten',
        'Senkung der Betriebskosten durch Automatisierung',
        'Verbesserung der Kundenerfahrung mit nahtlosen Workflows'
      ],
      useCases: 'Häufige Anwendungsfälle',
      useCasesList: [
        'CRM-zu-ERP-Synchronisation für Auftragsverwaltung',
        'E-Commerce-Plattform-Integration mit Bestandssystemen',
        'Finanzielle Datenkonsolidierung über mehrere Systeme',
        'Kundenservice-Automatisierung und Ticket-Routing',
        'Marketing-Automatisierung und Lead-Nurturing-Workflows',
        'Lieferketten-Sichtbarkeit und automatisierte Beschaffung'
      ],
      close: 'Schließen'
    }
  };

  const t = texts[currentLanguage];

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{t.title}</h2>
          <p className="text-blue-600 font-medium">{t.subtitle}</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
          <span className="sr-only">{t.close}</span>
        </button>
      </div>
      
      <p className="text-gray-600 mb-8 leading-relaxed">{t.description}</p>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{t.coreFeatures}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">{t.benefits}</h3>
          <ul className="space-y-2">
            {t.benefitsList.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-700 text-sm">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">{t.useCases}</h3>
          <ul className="space-y-2">
            {t.useCasesList.map((useCase, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-700 text-sm">{useCase}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BAFInfoSection;
