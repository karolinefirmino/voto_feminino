"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import HistoricalTooltip from './HistoricalTooltip';
import {
  Search,
  Filter,
  Calendar,
  Clock,
  FileImage,
  ChevronDown,
  BookOpen,
  Info,
  Star,
} from 'lucide-react';
import { Playfair_Display, Changa, Arsenal, Karma } from 'next/font/google';


const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const changa = Changa({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
});

const arsenal = Arsenal({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const karma = Karma({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

const timelineData = [
  {
    country: "Nova Zelândia",
    year: 1893,
    highlight: false,
    description: "Primeiro país a garantir o direito ao voto feminino, após uma longa campanha liderada por Kate Sheppard.",
    impactText: "Marco pioneiro para o sufrágio feminino mundial."
  },
  {
    country: "Finlândia",
    year: 1906,
    highlight: false,
    description: "Primeiro país europeu a conceder o voto às mulheres, incluindo o direito de se candidatar.",
    impactText: "Revolucionou a participação política feminina na Europa."
  },
  {
    country: "Brasil",
    year: 1932,
    highlight: true,
    description: "Código Eleitoral Provisório estabelece o direito ao voto feminino no Brasil, resultado da luta de Bertha Lutz e outras sufragistas.",
    impactText: "Momento histórico que transformou a democracia brasileira, garantindo às mulheres o direito de votar e serem votadas."
  },
  {
    country: "França",
    year: 1944,
    highlight: false,
    description: "Após décadas de luta, as mulheres francesas conquistam o direito ao voto.",
    impactText: "Consolidação do sufrágio feminino na Europa pós-guerra."
  }
];

const celebratoryFacts = [
  {
    title: "Bertha Lutz",
    description: "Líder do movimento sufragista brasileiro e bióloga pioneira.",
    icon: "👩‍🔬",
  },
  {
    title: "Celina Guimarães",
    description: "Primeira eleitora do Brasil (RN, 1927).",
    icon: "✨",
  },
  {
    title: "Alzira Soriano",
    description: "Primeira prefeita da América do Sul (1928).",
    icon: "👩‍💼",
  },
];

const DocumentCatalog = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [showFacts, setShowFacts] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      console.log('Fetching documents...');
      const response = await fetch('/api/documents');
      if (!response.ok) {
        throw new Error('Failed to fetch documents');
      }
      const data = await response.json();
      console.log('Fetched documents:', data);
      setDocuments(data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentClick = (docId) => {
    console.log('Clicking document:', docId);
    // Try direct window navigation as a test
    window.location.href = `/viewer/${docId}`;
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.source?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.category?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date);
    }
    return a.title.localeCompare(b.title);
  });

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-[#1e2b6b] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#1e2b6b] to-[#d4165c]">
          <div className="absolute inset-0 opacity-20">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat',
                
              }}
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-12 pb-16 relative">
          <button
            type="button"
            className="absolute top-4 right-4 cursor-pointer"
            onClick={() => setShowFacts(!showFacts)}
          >
            <Info className="h-6 w-6 text-white opacity-80 hover:opacity-100 transition-colors" />
          </button>

          <div className="text-center">
            <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-6 border border-white/20 transform hover:scale-105 transition-transform duration-300">
              <p className="text-white font-medium tracking-wide flex items-center">
                <Star className="h-4 w-4 mr-2 text-[#d4165c]" />
                24 de Fevereiro de 1932
              </p>
            </div>
            
            <h1 className="text-5xl font-bold text-white mb-6 font-playfair">
              Mulheres e Democracia
            </h1>
            
            <p className="text-2xl text-white opacity-90 mb-8 max-w-3xl mx-auto font-light">
              Celebrando 90+ Anos do Voto Feminino no Brasil
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-xl font-bold text-blue-900 mb-8 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-pink-600" />
            Linha do Tempo: Conquista do Voto Feminino no Mundo
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {timelineData.map((event, index) => (
              <div key={index} className="relative group">
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-5 h-5 rounded-full mb-3 transition-colors flex items-center justify-center
                      ${event.highlight ? 'bg-pink-600' : 'bg-blue-900 group-hover:bg-purple-800'}`}
                  >
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  </div>

                  <div className="text-center">
                    <div className="text-sm font-medium text-blue-900 group-hover:text-purple-800">
                      {event.country}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {event.year}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full max-w-xl">
              <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Pesquisar documentos históricos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full rounded-md border border-gray-200 py-2"
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative min-w-[160px]">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full appearance-none bg-white border border-gray-200 rounded-md px-4 py-2 pr-8"
                >
                  <option value="All">Todos</option>
                  <option value="Legislation">Legislação</option>
                  <option value="Manifesto">Manifesto</option>
                  <option value="Historical">Documentação Histórica</option>
                  <option value="Photographs">Fotografias</option>
                  <option value="Newspapers">Jornais da Época</option>
                </select>
                <ChevronDown className="h-4 w-4 absolute right-2 top-3 text-gray-400 pointer-events-none" />
              </div>

              <button
                onClick={() => setSortBy(sortBy === 'date' ? 'title' : 'date')}
                className="px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors text-blue-900"
              >
                Ordenar por: {sortBy === 'date' ? 'Data' : 'Título'}
              </button>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-blue-900 mb-6">Acervo Histórico</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {loading ? (
            <div className="text-center text-gray-500 py-8 col-span-full">
              Carregando documentos...
            </div>
          ) : sortedDocuments.length === 0 ? (
            <div className="text-center text-gray-500 py-8 col-span-full">
              Nenhum documento encontrado. Tente ajustar sua pesquisa ou filtros.
            </div>
          ) : (
            sortedDocuments.map((doc) => (
              <div key={doc._id} className="relative group">
                <div 
                  className="w-[160px] cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden bg-white rounded-lg border border-gray-200"
                  onClick={() => handleDocumentClick(doc._id)} // Make sure doc._id exists
                >
                  <div className="relative h-[200px] bg-gray-100">
                    {doc.imageUrl ? (
                      <img
                        src={doc.imageUrl}
                        alt={doc.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                        <FileText className="h-8 w-8 mb-2" />
                        <span className="text-sm">Documento</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                        <div className="text-xs font-medium">
                          {new Date(doc.date).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="text-xs opacity-75">{doc.source}</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-[#1e2b6b] text-sm truncate mb-1">
                      {doc.title}
                    </h3>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {new Date(doc.createdAt).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentCatalog;