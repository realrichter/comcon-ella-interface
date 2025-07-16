import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send } from 'lucide-react';
import ChatMessage, { Message } from './ChatMessage';
import { runEllaAgent } from '../../lib/ellaAgent';

interface ChatInterfaceProps {
  currentLanguage: 'en' | 'de';
  onIndustryDetected?: (industry: string) => void;
  initialMessage?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  currentLanguage, 
  onIndustryDetected, 
  initialMessage 
}) => {
  // Lazily load any persisted chat history on first render
  const [messages, setMessages] = useState<Message[]>(() => {
    const stored = localStorage.getItem('chat_messages');
    if (stored) {
      try {
        const parsed: Array<Omit<Message, 'timestamp'> & { timestamp: string }> = JSON.parse(stored);
        return parsed.map((m) => ({ ...m, timestamp: new Date(m.timestamp) })) as Message[];
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Failed to parse stored chat messages', e);
      }
    }
    return [];
  });
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const texts = {
    en: {
      title: 'Chat with Ella',
      subtitle: 'Your Personal Integration Assistant',
      placeholder: 'Ask me about integrations, automation, or BAF...',
      send: 'Send',
      typing: 'Ella is typing...'
    },
    de: {
      title: 'Chat mit Ella',
      subtitle: 'Ihr persönlicher Integrations-Assistent',
      placeholder: 'Fragen Sie mich über Integrationen, Automatisierung oder BAF...',
      send: 'Senden',
      typing: 'Ella tippt...'
    }
  };

  const t = texts[currentLanguage];

  // Helper to persist messages to localStorage
  const persistMessages = useCallback((msgs: Message[]) => {
    localStorage.setItem(
      'chat_messages',
      JSON.stringify(msgs.map((m) => ({ ...m, timestamp: m.timestamp.toISOString() }))),
    );
  }, []);

  // Persist messages whenever they change inside this component
  useEffect(() => {
    if (messages.length) {
      persistMessages(messages);
    }
  }, [messages, persistMessages]);

  useEffect(() => {
    if (messages.length === 0) {
      // Initial greeting
      const welcomeMessage: Message = {
        id: '1',
        text: currentLanguage === 'en' 
          ? "Hello! I'm Ella, your personal integration assistant. I'm here to help you discover how com:con's Best Application Framework (BAF) can streamline your business operations. What would you like to know?"
          : "Hallo! Ich bin Ella, Ihr persönlicher Integrations-Assistent. Ich helfe Ihnen dabei zu entdecken, wie com:cons Best Application Framework (BAF) Ihre Geschäftsprozesse optimieren kann. Was möchten Sie wissen?",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
      persistMessages([welcomeMessage]);

      // If there's an initial message from the hero, process it
      if (initialMessage) {
        setTimeout(() => {
          const userMessage: Message = {
            id: Date.now().toString(),
            text: initialMessage,
            sender: 'user',
            timestamp: new Date()
          };
          setMessages(prev => {
            const next = [...prev, userMessage];
            persistMessages(next);
            return next;
          });
          
          // Process the initial message
          setIsTyping(true);
          (async () => {
            try {
              const botResponse = await runEllaAgent(initialMessage);
              const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: botResponse,
                sender: 'bot',
                timestamp: new Date(),
              };
              // Persist regardless of component mount state
              persistMessages([...messages, userMessage, botMessage]);
              setMessages((prev) => {
                const next = [...prev, botMessage];
                return next;
              });
            } catch (error) {
              // eslint-disable-next-line no-console
              console.error('Ella error:', error);
              const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: currentLanguage === 'en' ? 'Sorry, something went wrong. Please try again.' : 'Entschuldigung, etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.',
                sender: 'bot',
                timestamp: new Date(),
              };
              persistMessages([...messages, userMessage, botMessage]);
              setMessages((prev) => [...prev, botMessage]);
            } finally {
              setIsTyping(false);
            }
          })();
        }, 500);
      }
    }
  }, [currentLanguage, initialMessage, messages, persistMessages]);

  // If the chat already has messages, treat any new initialMessage prop as a fresh
  // question from the user and append it to the conversation.
  useEffect(() => {
    // Only run when there is chat history and a non-empty initialMessage was provided.
    if (!initialMessage || messages.length === 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: initialMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => {
      const next = [...prev, userMessage];
      persistMessages(next);
      return next;
    });

    setIsTyping(true);

    (async () => {
      try {
        const botResponse = await runEllaAgent(initialMessage);
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          sender: 'bot',
          timestamp: new Date(),
        };

        setMessages((prev) => {
          const next = [...prev, botMessage];
          persistMessages(next);
          return next;
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Ella error:', error);
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text:
            currentLanguage === 'en'
              ? 'Sorry, something went wrong. Please try again.'
              : 'Entschuldigung, etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.',
          sender: 'bot',
          timestamp: new Date(),
        };

        setMessages((prev) => {
          const next = [...prev, botMessage];
          persistMessages(next);
          return next;
        });
      } finally {
        setIsTyping(false);
      }
    })();
    // We intentionally omit messages from deps to avoid infinite loops caused by the
    // state updates inside this effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialMessage, persistMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    // Scroll only the chat container, leaving the rest of the page static.
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' });
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => {
      const next = [...prev, userMessage];
      persistMessages(next);
      return next;
    });
    setInputValue('');
    setIsTyping(true);

    try {
      const botResponse = await runEllaAgent(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      persistMessages([...messages, userMessage, botMessage]);
      setMessages((prev) => {
        const next = [...prev, botMessage];
        return next;
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Ella error:', error);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: currentLanguage === 'en' ? 'Sorry, something went wrong. Please try again.' : 'Entschuldigung, etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.',
        sender: 'bot',
        timestamp: new Date(),
      };
      persistMessages([...messages, userMessage, botMessage]);
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();  
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">{t.title}</h3>
        <p className="text-sm text-gray-600">{t.subtitle}</p>
      </div>
      
      <div ref={containerRef} className="h-96 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg border border-gray-200">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-xs text-gray-500">{t.typing}</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="px-4 py-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t.placeholder}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
            <span className="sr-only">{t.send}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
