
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';

interface ContactPageProps {
  currentLanguage: 'en' | 'de';
}

const ContactPage: React.FC<ContactPageProps> = ({ currentLanguage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const texts = {
    en: {
      title: 'Book Your Free Consultation',
      subtitle: 'Let\'s discuss how com:con can transform your business operations',
      formTitle: 'Contact Information',
      name: 'Full Name',
      email: 'Email Address',
      company: 'Company Name',
      message: 'What would you like to discuss?',
      messagePlaceholder: 'Tell us about your integration challenges, current systems, or specific goals...',
      submit: 'Book Consultation',
      submitting: 'Submitting...',
      success: 'Thank you! We will reach out to you shortly to schedule your consultation.',
      error: 'There was an error submitting your request. Please try again.',
      required: 'This field is required',
      invalidEmail: 'Please enter a valid email address',
      contactInfo: 'Contact Information',
      phone: '+49 (0) 123 456 7890',
      email_contact: 'hello@comcon-solutions.com',
      address: 'Munich, Germany'
    },
    de: {
      title: 'Buchen Sie Ihre kostenlose Beratung',
      subtitle: 'Lassen Sie uns besprechen, wie com:con Ihre Geschäftsabläufe transformieren kann',
      formTitle: 'Kontaktinformationen',
      name: 'Vollständiger Name',
      email: 'E-Mail-Adresse',
      company: 'Firmenname',
      message: 'Was möchten Sie besprechen?',
      messagePlaceholder: 'Erzählen Sie uns von Ihren Integrations-Herausforderungen, aktuellen Systemen oder spezifischen Zielen...',
      submit: 'Beratung buchen',
      submitting: 'Wird gesendet...',
      success: 'Vielen Dank! Wir werden uns in Kürze bei Ihnen melden, um Ihre Beratung zu planen.',
      error: 'Beim Senden Ihrer Anfrage ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
      required: 'Dieses Feld ist erforderlich',
      invalidEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
      contactInfo: 'Kontaktinformationen',
      phone: '+49 (0) 123 456 7890',
      email_contact: 'hello@comcon-solutions.com',
      address: 'München, Deutschland'
    }
  };

  const t = texts[currentLanguage];

  const validateForm = () => {
    const errors: string[] = [];
    
    if (!formData.name.trim()) errors.push(t.required);
    if (!formData.email.trim()) errors.push(t.required);
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.push(t.invalidEmail);
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors[0]);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('consultation_requests')
        .insert([{
          name: formData.name,
          email: formData.email,
          company: formData.company || null,
          message: formData.message || null
        }]);

      if (error) throw error;

      setIsSubmitted(true);
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(t.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {currentLanguage === 'en' ? 'Thank You!' : 'Vielen Dank!'}
          </h1>
          <p className="text-xl text-gray-600 mb-8">{t.success}</p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            {currentLanguage === 'en' ? 'Submit Another Request' : 'Weitere Anfrage senden'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h1>
        <p className="text-xl text-gray-600">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t.formTitle}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.name} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.email} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.company}
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t.messagePlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
              
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>{isSubmitting ? t.submitting : t.submit}</span>
              </button>
            </form>
          </div>
        </div>
        
        <div>
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">{t.contactInfo}</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">{t.phone}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">{t.email_contact}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">{t.address}</span>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                {currentLanguage === 'en' 
                  ? 'We typically respond within 24 hours and will schedule your consultation at a time that works for you.'
                  : 'Wir antworten normalerweise innerhalb von 24 Stunden und planen Ihre Beratung zu einem für Sie passenden Zeitpunkt.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
