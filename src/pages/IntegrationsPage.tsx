
import React, { useState, useEffect } from 'react';
import { Search, Filter, Loader } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';

interface Connector {
  id: number;
  name: string;
  category: string;
  description: string | null;
  created_at: string;
}

interface IntegrationsPageProps {
  currentLanguage: 'en' | 'de';
}

const IntegrationsPage: React.FC<IntegrationsPageProps> = ({ currentLanguage }) => {
  const [connectors, setConnectors] = useState<Connector[]>([]);
  const [filteredConnectors, setFilteredConnectors] = useState<Connector[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const texts = {
    en: {
      title: 'Integration Catalog',
      subtitle: 'Discover our extensive library of pre-built connectors',
      search: 'Search integrations...',
      filter: 'Filter by category',
      allCategories: 'All Categories',
      loading: 'Loading integrations...',
      error: 'Error loading integrations. Please try again.',
      noResults: 'No integrations found matching your criteria.',
      integrations: 'integrations available',
      categories: 'Categories'
    },
    de: {
      title: 'Integrations-Katalog',
      subtitle: 'Entdecken Sie unsere umfangreiche Bibliothek vorgefertigter Konnektoren',
      search: 'Integrationen suchen...',
      filter: 'Nach Kategorie filtern',
      allCategories: 'Alle Kategorien',
      loading: 'Lade Integrationen...',
      error: 'Fehler beim Laden der Integrationen. Bitte versuchen Sie es erneut.',
      noResults: 'Keine Integrationen gefunden, die Ihren Kriterien entsprechen.',
      integrations: 'Integrationen verfügbar',
      categories: 'Kategorien'
    }
  };

  const t = texts[currentLanguage];

  useEffect(() => {
    fetchConnectors();
  }, []);

  useEffect(() => {
    filterConnectors();
  }, [connectors, searchTerm, selectedCategory]);

  const fetchConnectors = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('connectors')
        .select('*')
        .order('name');

      if (error) throw error;
      
      setConnectors(data || []);
    } catch (err) {
      console.error('Error fetching connectors:', err);
      setError(t.error);
    } finally {
      setLoading(false);
    }
  };

  const filterConnectors = () => {
    let filtered = connectors;

    if (searchTerm) {
      filtered = filtered.filter(connector =>
        connector.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        connector.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (connector.description && connector.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(connector => connector.category === selectedCategory);
    }

    setFilteredConnectors(filtered);
  };

  const categories = [...new Set(connectors.map(c => c.category))].sort();

  const getCategoryColor = (category: string) => {
    const colors = {
      'ERP': 'bg-blue-100 text-blue-800',
      'CRM': 'bg-green-100 text-green-800',
      'E-Commerce': 'bg-purple-100 text-purple-800',
      'Accounting': 'bg-yellow-100 text-yellow-800',
      'Marketing': 'bg-pink-100 text-pink-800',
      'Communication': 'bg-indigo-100 text-indigo-800',
      'Document': 'bg-orange-100 text-orange-800',
      'Storage': 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">{t.loading}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchConnectors}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {currentLanguage === 'en' ? 'Try Again' : 'Erneut versuchen'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h1>
        <p className="text-xl text-gray-600 mb-2">{t.subtitle}</p>
        <p className="text-blue-600 font-medium">
          {filteredConnectors.length} {t.integrations}
        </p>
      </div>
      
      <div className="mb-8 flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={t.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="relative lg:w-64">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
          >
            <option value="">{t.allCategories}</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>
      
      {filteredConnectors.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">{t.noResults}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConnectors.map((connector) => (
            <div key={connector.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{connector.name}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(connector.category)}`}>
                  {connector.category}
                </span>
              </div>
              
              {connector.description && (
                <p className="text-gray-600 text-sm leading-relaxed">{connector.description}</p>
              )}
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                  {currentLanguage === 'en' ? 'Learn More' : 'Mehr erfahren'} →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IntegrationsPage;
