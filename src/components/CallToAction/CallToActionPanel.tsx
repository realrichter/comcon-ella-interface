
import React from 'react';
import { Calendar, Play, BookOpen, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CallToActionPanelProps {
  currentLanguage: 'en' | 'de';
  onWatchVideo: () => void;
  onLearnMore: () => void;
}

const CallToActionPanel: React.FC<CallToActionPanelProps> = ({ 
  currentLanguage, 
  onWatchVideo, 
  onLearnMore 
}) => {
  const texts = {
    en: {
      title: 'Ready to Transform Your Business?',
      subtitle: 'Choose your next step to get started with com:con solutions',
      consultation: 'Book Free Consultation',
      consultationDesc: 'Schedule a personalized demo with our experts',
      video: 'Watch Intro Video',
      videoDesc: 'See our BAF platform in action',
      learnMore: 'Learn More about BAF',
      learnMoreDesc: 'Detailed information about our platform',
      askQuestion: 'Continue Chatting',
      askQuestionDesc: 'Ask Ella more questions about our solutions'
    },
    de: {
      title: 'Bereit, Ihr Unternehmen zu transformieren?',
      subtitle: 'Wählen Sie Ihren nächsten Schritt, um mit com:con Lösungen zu beginnen',
      consultation: 'Kostenlose Beratung buchen',
      consultationDesc: 'Planen Sie eine personalisierte Demo mit unseren Experten',
      video: 'Intro-Video ansehen',
      videoDesc: 'Sehen Sie unsere BAF-Plattform in Aktion',
      learnMore: 'Mehr über BAF erfahren',
      learnMoreDesc: 'Detaillierte Informationen über unsere Plattform',
      askQuestion: 'Weiter chatten',
      askQuestionDesc: 'Stellen Sie Ella weitere Fragen zu unseren Lösungen'
    }
  };

  const t = texts[currentLanguage];

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-white">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">{t.title}</h2>
        <p className="text-blue-100">{t.subtitle}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          to="/contact"
          className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-200 transform hover:scale-105 text-center group"
        >
          <Calendar className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-semibold mb-2">{t.consultation}</h3>
          <p className="text-sm text-blue-100">{t.consultationDesc}</p>
        </Link>
        
        <button
          onClick={onWatchVideo}
          className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-200 transform hover:scale-105 text-center group"
        >
          <Play className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-semibold mb-2">{t.video}</h3>
          <p className="text-sm text-blue-100">{t.videoDesc}</p>
        </button>
        
        <button
          onClick={onLearnMore}
          className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-200 transform hover:scale-105 text-center group"
        >
          <BookOpen className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-semibold mb-2">{t.learnMore}</h3>
          <p className="text-sm text-blue-100">{t.learnMoreDesc}</p>
        </button>
        
        <button
          onClick={() => document.querySelector('input')?.focus()}
          className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-200 transform hover:scale-105 text-center group"
        >
          <MessageCircle className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-semibold mb-2">{t.askQuestion}</h3>
          <p className="text-sm text-blue-100">{t.askQuestionDesc}</p>
        </button>
      </div>
    </div>
  );
};

export default CallToActionPanel;
