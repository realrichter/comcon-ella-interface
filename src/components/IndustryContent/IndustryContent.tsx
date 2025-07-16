
import React from 'react';
import { Industry } from '../IndustrySelector/IndustrySelector';
import { Factory, Users, Building, ShoppingCart, Heart } from 'lucide-react';

interface IndustryContentProps {
  selectedIndustry: Industry;
  currentLanguage: 'en' | 'de';
}

const IndustryContent: React.FC<IndustryContentProps> = ({ selectedIndustry, currentLanguage }) => {
  if (!selectedIndustry) {
    const texts = {
      en: {
        welcome: 'Welcome to com:con Solutions',
        subtitle: 'Your Partner for Business Automation',
        description: 'Our Best Application Framework (BAF) connects your existing systems to create seamless, efficient workflows. Chat with Ella to see how we can help transform your business operations.'
      },
      de: {
        welcome: 'Willkommen bei com:con Solutions',
        subtitle: 'Ihr Partner für Geschäftsautomatisierung',
        description: 'Unser Best Application Framework (BAF) verbindet Ihre bestehenden Systeme, um nahtlose, effiziente Arbeitsabläufe zu schaffen. Starten Sie eine Konversation mit Ella, um zu sehen, wie wir Ihre Geschäftsprozesse transformieren können.'
      }
    };

    const t = texts[currentLanguage];

    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.welcome}</h2>
        <p className="text-lg text-blue-600 font-medium mb-4">{t.subtitle}</p>
        <p className="text-gray-600 max-w-2xl mx-auto">{t.description}</p>
      </div>
    );
  }

  const content = {
    en: {
      manufacturing: {
        icon: Factory,
        title: 'Solutions for Manufacturing',
        subtitle: 'Streamline Production & Supply Chain',
        description: 'Our BAF platform transforms manufacturing operations by integrating ERP systems with production management tools, IoT sensors, and quality control systems. Achieve real-time inventory tracking, automated order processing, and predictive maintenance scheduling.',
        benefits: [
          'Real-time production monitoring and reporting',
          'Automated inventory management and reordering',
          'Seamless ERP-to-shop-floor integration',
          'Quality control data synchronization',
          'Predictive maintenance alerts'
        ]
      },
      services: {
        icon: Users,
        title: 'Professional Services Automation',
        subtitle: 'Optimize Client Management & Billing',
        description: 'Transform your professional services firm with integrated project management, time tracking, and billing systems. Our BAF connects your CRM with project tools and accounting software for seamless client lifecycle management.',
        benefits: [
          'Automated time tracking and billing',
          'Project milestone and budget monitoring',
          'Client communication synchronization',
          'Resource allocation optimization',
          'Financial reporting automation'
        ]
      },
      'public-sector': {
        icon: Building,
        title: 'Public Sector Solutions',
        subtitle: 'Enhance Citizen Services & Compliance',
        description: 'Modernize government operations with secure, compliant integrations between legacy systems and modern digital services. Our BAF ensures data consistency while maintaining the highest security standards.',
        benefits: [
          'Secure legacy system integration',
          'Automated compliance reporting',
          'Citizen service portal connectivity',
          'Document management synchronization',
          'Audit trail maintenance'
        ]
      },
      retail: {
        icon: ShoppingCart,
        title: 'Retail & E-commerce Integration',
        subtitle: 'Unify Online & Offline Operations',
        description: 'Create a seamless omnichannel experience by connecting your e-commerce platforms with inventory management, POS systems, and customer service tools. Our BAF ensures consistent data across all touchpoints.',
        benefits: [
          'Omnichannel inventory synchronization',
          'Automated order fulfillment',
          'Customer data unification',
          'Real-time pricing updates',
          'Marketing automation integration'
        ]
      },
      healthcare: {
        icon: Heart,
        title: 'Healthcare System Integration',
        subtitle: 'Secure Patient Data & Workflow Management',
        description: 'Ensure HIPAA-compliant integration between electronic health records, billing systems, and patient management platforms. Our BAF maintains security while improving care coordination.',
        benefits: [
          'HIPAA-compliant data integration',
          'Patient record synchronization',
          'Billing and insurance automation',
          'Appointment scheduling coordination',
          'Care team communication tools'
        ]
      }
    },
    de: {
      manufacturing: {
        icon: Factory,
        title: 'Lösungen für die Fertigung',
        subtitle: 'Optimierung von Produktion & Lieferkette',
        description: 'Unsere BAF-Plattform transformiert Fertigungsabläufe durch die Integration von ERP-Systemen mit Produktionsmanagement-Tools, IoT-Sensoren und Qualitätskontrollsystemen. Erreichen Sie Echtzeit-Bestandsverfolgung, automatisierte Auftragsabwicklung und vorausschauende Wartungsplanung.',
        benefits: [
          'Echtzeit-Produktionsüberwachung und Berichterstattung',
          'Automatisiertes Bestandsmanagement und Nachbestellung',
          'Nahtlose ERP-zu-Werkstatt-Integration',
          'Qualitätskontrolldaten-Synchronisation',
          'Vorausschauende Wartungsbenachrichtigungen'
        ]
      },
      services: {
        icon: Users,
        title: 'Automatisierung professioneller Dienstleistungen',
        subtitle: 'Optimierung von Kundenmanagement & Abrechnung',
        description: 'Transformieren Sie Ihr Dienstleistungsunternehmen mit integrierten Projektmanagement-, Zeiterfassungs- und Abrechnungssystemen. Unser BAF verbindet Ihr CRM mit Projekt-Tools und Buchhaltungssoftware für nahtloses Kundenlebenszyklusmanagement.',
        benefits: [
          'Automatisierte Zeiterfassung und Abrechnung',
          'Projektmeilenstein und Budgetüberwachung',
          'Kundenkommunikations-Synchronisation',
          'Ressourcenallokations-Optimierung',
          'Finanzberichterstattungs-Automatisierung'
        ]
      },
      'public-sector': {
        icon: Building,
        title: 'Lösungen für den öffentlichen Sektor',
        subtitle: 'Verbesserung von Bürgerdiensten & Compliance',
        description: 'Modernisieren Sie Regierungsabläufe mit sicheren, konformen Integrationen zwischen Legacy-Systemen und modernen digitalen Diensten. Unser BAF gewährleistet Datenkonsistenz bei höchsten Sicherheitsstandards.',
        benefits: [
          'Sichere Legacy-System-Integration',
          'Automatisierte Compliance-Berichterstattung',
          'Bürgerservice-Portal-Konnektivität',
          'Dokumentenmanagement-Synchronisation',
          'Audit-Trail-Wartung'
        ]
      },
      retail: {
        icon: ShoppingCart,
        title: 'Einzelhandel & E-Commerce-Integration',
        subtitle: 'Vereinigung von Online- & Offline-Betrieb',
        description: 'Schaffen Sie eine nahtlose Omnichannel-Erfahrung durch die Verbindung Ihrer E-Commerce-Plattformen mit Bestandsmanagement, POS-Systemen und Kundenservice-Tools. Unser BAF gewährleistet konsistente Daten über alle Berührungspunkte.',
        benefits: [
          'Omnichannel-Bestandssynchronisation',
          'Automatisierte Auftragserfüllung',
          'Kundendaten-Vereinheitlichung',
          'Echtzeit-Preisaktualisierungen',
          'Marketing-Automatisierungs-Integration'
        ]
      },
      healthcare: {
        icon: Heart,
        title: 'Gesundheitssystem-Integration',
        subtitle: 'Sichere Patientendaten & Workflow-Management',
        description: 'Gewährleisten Sie HIPAA-konforme Integration zwischen elektronischen Gesundheitsakten, Abrechnungssystemen und Patientenmanagement-Plattformen. Unser BAF erhält die Sicherheit und verbessert die Pflegekoordination.',
        benefits: [
          'HIPAA-konforme Datenintegration',
          'Patientenakten-Synchronisation',
          'Abrechnung und Versicherungsautomatisierung',
          'Terminplanungs-Koordination',
          'Pflegeteam-Kommunikationstools'
        ]
      }
    }
  };

  const industryContent = content[currentLanguage][selectedIndustry];
  const IconComponent = industryContent.icon;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
          <IconComponent className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{industryContent.title}</h2>
          <p className="text-blue-600 font-medium">{industryContent.subtitle}</p>
        </div>
      </div>
      
      <p className="text-gray-600 mb-6 leading-relaxed">{industryContent.description}</p>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {currentLanguage === 'en' ? 'Key Benefits:' : 'Hauptvorteile:'}
        </h3>
        <ul className="space-y-2">
          {industryContent.benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-gray-700">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IndustryContent;
