
import React, { useState } from 'react';
import HeroSection from '../components/Hero/HeroSection';
import ChatInterface from '../components/Chat/ChatInterface';
import IndustrySelector, { Industry } from '../components/IndustrySelector/IndustrySelector';
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Back to Hero Button */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setShowChat(false)}
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
          
          {/* Industry Selector */}
          <IndustrySelector
            selectedIndustry={selectedIndustry}
            onIndustryChange={setSelectedIndustry}
            currentLanguage={currentLanguage}
          />
          
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
