"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
    title: "Maria Thereza de Barros Camargo",
    description: "primeira prefeita mulher do estado (1932) e uma das primeiras mulheres a ser nomeada deputada estadual (1935)",
    icon: "✊",
  },
  {
    title: "Yolanda Stocco",
    description: "Primeira mulher a ser eleita vereadora em Limeira (1964).",
    icon: "⚖️",
  },
  {
    title: "Elza Tank",
    description: "Primeira mulher a ocupar a presidência do Legislativo limeirense (1983), recordista de mandatos na história da Câmara.",
    icon: "✨",
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
  const [hoveredTimelineEvent, setHoveredTimelineEvent] = useState(null);

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
      {/* Responsive Celebratory Header */}
      <div className="relative overflow-hidden">
        {/* Main gradient background with adjusted colors */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e2b6b] to-[#d4165c] opacity-90">
          {/* Pattern overlay with improved opacity */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
              backgroundRepeat: "repeat",
            }}
          />
        </div>
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-10 sm:pb-16 relative z-10">
            {/* Info Icon - Positioned better for mobile */}
            <div
              className="absolute top-4 right-4 cursor-pointer z-20"
              onClick={() => setShowFacts(!showFacts)}
            >
              <Info className="h-5 w-5 sm:h-6 sm:w-6 text-white/80 hover:text-white transition-colors" />
            </div>

            {/* Historical Tooltip - improved positioning for mobile */}
            {showFacts && (
              <div className="fixed top-14 right-4 w-[calc(100%-2rem)] sm:w-80 max-w-sm bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-4 sm:p-5 border border-white/20 transform transition-all duration-300 z-[100]">
                <h3 className="font-semibold text-[#1e2b6b] mb-3">Marcos Históricos</h3>
                {celebratoryFacts.map((fact, index) => (
                  <div key={index} className="mb-3 sm:mb-4 last:mb-0 flex items-start">
                    <span className="text-xl sm:text-2xl mr-2 sm:mr-3">{fact.icon}</span>
                    <div>
                      <h4 className="font-medium text-[#832161]">{fact.title}</h4>
                      <p className="text-xs sm:text-sm text-gray-600">{fact.description}</p>
                    </div>
                  </div>
                ))}
                <button 
                  onClick={() => setShowFacts(false)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-[#d4165c] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            )}

            {/* Main Header Content with responsive adjustments */}
            <div className="text-center mb-4 sm:mb-8">
              <div className="inline-block bg-white/10 backdrop-blur-sm px-4 sm:px-6 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 border border-white/20 transform hover:scale-105 transition-transform duration-300">
                <p className="text-sm sm:text-base text-white font-medium tracking-wide flex items-center">
                  <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 text-[#d4165c]" />
                  24 de Fevereiro de 1932
                </p>
              </div>
              <h1 className={`text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-3 sm:mb-6 tracking-tight drop-shadow-md ${playfair.className} px-2`}>
                Mulheres e Democracia
              </h1>
              <p className={`text-lg sm:text-2xl text-white/90 mb-4 sm:mb-8 max-w-3xl mx-auto font-light px-4 ${changa.className}`}>
                Celebrando 90+ Anos do Voto Feminino no Brasil
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Timeline Section with Original Desktop & New Mobile Layout */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 mb-8 border border-gray-100">
          <h3 className={`text-xl sm:text-2xl font-bold mb-6 sm:mb-10 flex items-center text-[#1e2b6b] font-arial`}>
            <Calendar className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-[#d4165c]" />
            Linha do Tempo: Conquista do Voto Feminino no Mundo
          </h3>

          {/* Timeline for Desktop - Your original implementation (visible on larger screens) */}
          <div className="hidden sm:block relative">
            <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
              {timelineData.map((event, index) => (
                <div
                  key={index}
                  className="relative group"
                  onMouseEnter={() => setHoveredTimelineEvent(index)}
                  onMouseLeave={() => setHoveredTimelineEvent(null)}
                >
                  <div className="flex flex-col items-center">
                    {/* Hover Description */}
                    <div className={`absolute bottom-full mb-4 w-72 transform -translate-x-1/2 left-1/2 
                      transition-all duration-300 ${hoveredTimelineEvent === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                      <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-gray-100">
                        <p className={`text-sm text-gray-600 leading-relaxed ${karma.className}`}>
                          {event.description}
                        </p>
                        {event.highlight && (
                          <p className={`text-sm text-[#d4165c] font-medium mt-3 ${changa.className}`}>
                            {event.impactText}
                          </p>
                        )}
                      </div>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 
                        border-8 border-transparent border-t-white/95"></div>
                    </div>

                    {/* Timeline Point - Original Design */}
                    <div className={`
                      w-3 h-3 rounded-full mb-4 
                      transition-all duration-500 relative
                      ${event.highlight
                        ? 'bg-[#d4165c]'
                        : 'bg-[#1e2b6b] group-hover:bg-[#832161]'}
                      before:absolute before:content-[""] 
                      before:w-7 before:h-7 before:rounded-full 
                      before:border
                      before:-left-2 before:-top-2
                      ${event.highlight
                        ? 'before:border-[#d4165c] before:opacity-40 before:animate-pulse'
                        : 'before:border-[#1e2b6b] group-hover:before:border-[#832161] before:opacity-20 group-hover:before:opacity-40'}
                      before:transition-all before:duration-500
                      after:absolute after:content-[""]
                      after:w-5 after:h-5 after:rounded-full
                      after:border
                      after:-left-1 after:-top-1
                      ${event.highlight
                        ? 'after:border-[#d4165c] after:opacity-60'
                        : 'after:border-[#1e2b6b] group-hover:after:border-[#832161] after:opacity-40 group-hover:after:opacity-60'}
                      after:transition-all after:duration-500
                      group-hover:scale-110 group-hover:transform
                    `}>
                      {/* Inner dot */}
                      <div className={`
                        absolute inset-0 m-auto 
                        w-1.5 h-1.5 
                        bg-white rounded-full
                        group-hover:scale-110 
                        transition-transform duration-500
                      `} />
                    </div>
                    {/* Date Info */}
                    <div className="text-center">
                      <div className={`text-base font-semibold text-[#1e2b6b] group-hover:text-[#832161] 
                        transition-colors duration-300 ${arsenal.className}`}>
                        {event.country}
                      </div>
                      <div className={`text-sm text-gray-500 mt-1 font-medium ${changa.className}`}>
                        {event.year}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* New Timeline for Mobile - Only visible on small screens */}
          <div className="sm:hidden">
            <div className="relative">
              {/* Vertical Timeline Line */}
              <div className="absolute left-4 top-1 bottom-0 w-0.5 bg-gradient-to-b from-[#1e2b6b]/40 to-[#d4165c]/40"></div>
              
              {/* Timeline Items */}
              <div className="space-y-8">
                {timelineData.map((event, index) => (
                  <div key={index} className="relative pl-12 group">
                    {/* Timeline Dot */}
                    <div className={`
                      absolute left-2.5 top-1 transform -translate-x-1/2
                      w-3 h-3 rounded-full 
                      transition-all duration-300
                      ${event.highlight
                        ? 'bg-[#d4165c]'
                        : 'bg-[#1e2b6b]'}
                      z-10
                      before:absolute before:content-[""] 
                      before:w-6 before:h-6 before:rounded-full 
                      before:border
                      before:-left-1.5 before:-top-1.5
                      ${event.highlight
                        ? 'before:border-[#d4165c] before:opacity-40 before:animate-pulse'
                        : 'before:border-[#1e2b6b] before:opacity-20'}
                      before:transition-all before:duration-500
                    `}>
                      {/* Inner dot */}
                      <div className="absolute inset-0 m-auto w-1.5 h-1.5 bg-white rounded-full" />
                    </div>
                    
                    {/* Content */}
                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-gray-100 shadow-sm">
                      <div className="flex items-baseline justify-between mb-2">
                        <div className={`text-base font-semibold text-[#1e2b6b] ${arsenal.className}`}>
                          {event.country}
                        </div>
                        <div className={`text-sm text-gray-500 font-medium ${changa.className}`}>
                          {event.year}
                        </div>
                      </div>
                      <p className={`text-sm text-gray-600 leading-relaxed ${karma.className}`}>
                        {event.description}
                      </p>
                      {event.highlight && (
                        <p className={`text-sm text-[#d4165c] font-medium mt-3 ${changa.className}`}>
                          {event.impactText}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>



        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
{/* Cards Container with Responsive Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
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
          className="w-full cursor-pointer overflow-hidden bg-white rounded-lg border border-gray-200
          transform transition-all duration-300 
          hover:scale-105 hover:shadow-xl 
          hover:border-[#1e2b6b]/20 
          relative"
          onClick={() => handleDocumentClick(doc._id)}
        >
          {/* Mobile-optimized layout */}
          <div className="flex sm:block">
            {/* Image Container - smaller width on mobile */}
            <div className="relative w-1/3 sm:w-full h-32 sm:h-48 bg-gray-100 overflow-hidden">
              {doc.imageUrl ? (
                <img
                  src={doc.imageUrl}
                  alt={doc.title}
                  className="w-full h-full object-cover transform transition-transform duration-500 
                    group-hover:scale-110 filter group-hover:brightness-105"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400
                  transition-colors duration-300 group-hover:text-[#1e2b6b]">
                  <FileImage className="h-8 w-8 sm:h-12 sm:w-12 mb-1 sm:mb-2 transition-transform duration-300 
                    group-hover:scale-110 group-hover:animate-pulse" />
                  <span className="text-xs sm:text-sm">Documento</span>
                </div>
              )}
              
              {/* Category Badge */}
              <div className="absolute top-2 left-2 z-10">
                <span className="text-xs py-1 px-2 bg-[#1e2b6b]/80 text-white rounded-full
                  backdrop-blur-sm transition-all duration-300 opacity-90 sm:opacity-0 sm:group-hover:opacity-100
                  transform sm:-translate-y-2 sm:group-hover:translate-y-0">
                  {doc.category}
                </span>
              </div>
              
              {/* Overlay with Information - Visible on hover for desktop, always visible (partially) on mobile */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent 
                sm:opacity-0 opacity-100 sm:group-hover:opacity-100 transition-all duration-300
                flex flex-col justify-end p-2 sm:p-3">
                <div className="transform sm:translate-y-4 sm:group-hover:translate-y-0 transition-transform duration-300">
                  <div className="text-xs font-medium text-white mb-1 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(doc.date).toLocaleDateString('pt-BR')}
                  </div>
                  <div className="text-xs text-white/80 hidden sm:block">{doc.source}</div>
                </div>
              </div>
              
              {/* Progress Indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 hidden sm:block">
                <div className="h-full bg-[#d4165c] w-0 group-hover:w-full transition-all duration-1000"></div>
              </div>
            </div>

            {/* Content Section - take remaining width on mobile */}
            <div className="flex-1 p-3 sm:p-4 bg-white transition-colors duration-300 group-hover:bg-gray-50">
              <h3 className="font-medium text-[#1e2b6b] text-sm truncate mb-2 
                group-hover:text-[#d4165c] transition-colors duration-300">
                {doc.title}
              </h3>
              
              <div className="sm:flex items-center justify-between">
                <div className="flex items-center text-xs text-gray-500 mb-2 sm:mb-0">
                  <Clock className="h-3 w-3 mr-1" />
                  {new Date(doc.createdAt).toLocaleDateString('pt-BR')}
                </div>
                
                {/* Source on mobile only */}
                <div className="text-xs text-gray-500 mb-2 sm:hidden truncate">
                  {doc.source}
                </div>
                
                {/* View Button - Always visible on mobile */}
                <button className="sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300
                  text-xs bg-[#1e2b6b] text-white rounded-full py-1 px-2
                  transform scale-90 sm:group-hover:scale-100 flex items-center
                  hover:bg-[#d4165c]">
                  <span className="mr-1">Ver</span>
                  <ChevronDown className="h-3 w-3 transform -rotate-90" />
                </button>
              </div>
            </div>
          </div>

          {/* Highlight Border Effect */}
          <div className="absolute inset-0 border-2 border-[#1e2b6b] rounded-lg opacity-0 
            group-hover:opacity-20 transition-opacity duration-300" />
        </div>
      </div>
    ))
  )}
</div>
</div>
</div> 
    </div>
  );
};

export default DocumentCatalog;