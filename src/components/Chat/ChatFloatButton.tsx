import { MessageCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ChatFloatButton: React.FC = () => {
  const [hasChatHistory, setHasChatHistory] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check localStorage for existing chat messages
  const checkChatHistory = () => {
    try {
      const stored = localStorage.getItem('chat_messages');
      if (stored) {
        const parsed = JSON.parse(stored);
        setHasChatHistory(Array.isArray(parsed) && parsed.length > 0);
      } else {
        setHasChatHistory(false);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Failed to read chat history', e);
      setHasChatHistory(false);
    }
  };

  useEffect(() => {
    checkChatHistory();

    // Listen to storage events so other tabs keep in sync
    window.addEventListener('storage', checkChatHistory);
    return () => window.removeEventListener('storage', checkChatHistory);
    // Re-evaluate when route changes in this tab
  }, [location.pathname, location.search]);

  // Hide button if no chat history or already on chat view
  if (!hasChatHistory) return null;
  if (location.pathname === '/' && location.search.includes('openChat=true')) return null;

  return (
    <button
      className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      onClick={() => navigate('/?openChat=true')}
    >
      <MessageCircle className="w-6 h-6" />
      <span className="sr-only">Open chat</span>
    </button>
  );
};

export default ChatFloatButton; 