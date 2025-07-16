import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HeroSection from '../components/Hero/HeroSection';
import ChatInterface from '../components/Chat/ChatInterface';
import type { Industry } from '../components/IndustrySelector/IndustrySelector';
import IndustryContent from '../components/IndustryContent/IndustryContent';
import CallToActionPanel from '../components/CallToAction/CallToActionPanel';
import VideoModal from '../components/VideoModal/VideoModal';
import BAFInfoSection from '../components/BAFInfo/BAFInfoSection';

interface HomePageProps {
  currentLanguage: 'en' | 'de';
}

const HomePage: React.FC<HomePageProps> = ({ currentLanguage }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>('');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showBAFInfo, setShowBAFInfo] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  // Detect query param to auto open chat (used by floating button)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('openChat') === 'true') {
      setShowChat(true);
    }
  }, [location.search]);

  // Keep URL in sync with chat visibility so other components (like floating button)
  // can determine whether chat is currently open.
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (showChat) {
      if (params.get('openChat') !== 'true') {
        params.set('openChat', 'true');
        navigate({ search: params.toString() }, { replace: true });
      }
    } else {
      if (params.has('openChat')) {
        params.delete('openChat');
        navigate({ search: params.toString() }, { replace: true });
      }
    }
  }, [showChat, location.search, navigate]);

  const handleWatchVideo = () => {
    setShowVideoModal(true);
  };

  const handleLearnMore = () => {
    setShowBAFInfo(true);
  };

  const handleIndustryDetected = (industry: string) => {
    setSelectedIndustry(industry as Industry);
  };

  const handleStartConversation = (message: string) => {
    setInitialMessage(message);
    setShowChat(true);
  };

  // Clear any stored initialMessage once the user exits the chat view. This prevents
  // the previous prompt from being re-sent when reopening the chat via the floating
  // button or other means.
  useEffect(() => {
    if (!showChat) {
      setInitialMessage('');
    }
  }, [showChat]);

  if (!showChat) {
    return (
      <div className="min-h-screen">
        <HeroSection 
          onStartConversation={handleStartConversation}
          currentLanguage={currentLanguage}
        />
        {/* Video Modal */}
        <VideoModal
          isOpen={showVideoModal}
          onClose={() => setShowVideoModal(false)}
          currentLanguage={currentLanguage}
        />
      </div>
    );
  }

  // Gradient backdrop for the header when in chat view
  // Ensures the transparent navbar text remains readable and adds visual interest.
  const ChatHeaderBackdrop = () => (
    <div className="fixed top-0 left-0 right-0 h-16 bg-[#21496c] -z-10 pointer-events-none" />
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <ChatHeaderBackdrop />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Back to Hero Button */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                setShowChat(false);
                setInitialMessage(''); // explicit reset for immediate consistency
              }}
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              ← {currentLanguage === 'en' ? 'Back to Home' : 'Zurück zur Startseite'}
            </button>
          </div>

          {/* BAF Info Section (when expanded) */}
          <BAFInfoSection 
            isExpanded={showBAFInfo}
            onClose={() => setShowBAFInfo(false)}
            currentLanguage={currentLanguage}
          />
          
          {/* Industry selector removed – industry will be detected dynamically in chat */}
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Chat Interface */}
            <div>
              <ChatInterface 
                currentLanguage={currentLanguage}
                onIndustryDetected={handleIndustryDetected}
                initialMessage={initialMessage}
              />
            </div>
            
            {/* Industry Content */}
            <div>
              <IndustryContent
                selectedIndustry={selectedIndustry}
                currentLanguage={currentLanguage}
              />
            </div>
          </div>
          
          {/* Call to Action Panel */}
          <CallToActionPanel
            currentLanguage={currentLanguage}
            onWatchVideo={handleWatchVideo}
            onLearnMore={handleLearnMore}
          />
        </div>
      </div>
      
      {/* Video Modal */}
      <VideoModal
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
        currentLanguage={currentLanguage}
      />
    </div>
  );
};

export default HomePage;
