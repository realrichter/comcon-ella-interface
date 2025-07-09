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

  const cardClasses =
    "bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center transition-all duration-300 transform hover:scale-105 hover:bg-white/20 hover:shadow-xl group";

  return (
    <section className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 shadow-xl">
      {/* Radial accent overlays */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.35),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.35),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.25),transparent_70%)]"></div>
      </div>

      <div className="relative z-10 p-10 text-white">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 drop-shadow-md">{t.title}</h2>
          <p className="text-white/80 max-w-3xl mx-auto leading-relaxed">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/contact" className={cardClasses}>
            <Calendar className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold mb-2">{t.consultation}</h3>
            <p className="text-sm text-white/70">{t.consultationDesc}</p>
          </Link>

          <button onClick={onWatchVideo} className={cardClasses}>
            <Play className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold mb-2">{t.video}</h3>
            <p className="text-sm text-white/70">{t.videoDesc}</p>
          </button>

          <button onClick={onLearnMore} className={cardClasses}>
            <BookOpen className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold mb-2">{t.learnMore}</h3>
            <p className="text-sm text-white/70">{t.learnMoreDesc}</p>
          </button>

          <button
            onClick={() => document.querySelector('input')?.focus()}
            className={cardClasses}
          >
            <MessageCircle className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold mb-2">{t.askQuestion}</h3>
            <p className="text-sm text-white/70">{t.askQuestionDesc}</p>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToActionPanel;
