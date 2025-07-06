
import React from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: 'en' | 'de';
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, currentLanguage }) => {
  if (!isOpen) return null;

  const texts = {
    en: {
      title: 'com:con BAF Platform Overview',
      close: 'Close'
    },
    de: {
      title: 'com:con BAF Plattform Übersicht',
      close: 'Schließen'
    }
  };

  const t = texts[currentLanguage];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{t.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
            <span className="sr-only">{t.close}</span>
          </button>
        </div>
        
        <div className="p-6">
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            {/* TODO: Replace with actual video embed */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.84A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.27l9.344-5.89a1.5 1.5 0 000-2.54L6.3 2.84z"/>
                </svg>
              </div>
              <p className="text-gray-600 mb-2">
                {currentLanguage === 'en' 
                  ? 'Video placeholder - BAF Platform Demo' 
                  : 'Video Platzhalter - BAF Plattform Demo'
                }
              </p>
              <p className="text-sm text-gray-500">
                {currentLanguage === 'en' 
                  ? 'Integration with actual video player coming soon'
                  : 'Integration mit echtem Video-Player kommt bald'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
