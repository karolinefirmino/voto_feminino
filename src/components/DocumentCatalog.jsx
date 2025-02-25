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
    title: "Bertha Lutz",
    description: "Líder do movimento sufragista brasileiro e bióloga pioneira.",
    icon: "👩‍🔬",
  },
  {
    title: "Carlota Pereira de Queirós",
    description: "Primeira mulher eleita deputada federal no Brasil (1934).",
    icon: "🏆",
  },
  {
    title: "Alzira Soriano",
    description: "Primeira prefeita da América do Sul (1928).",
    icon: "👩‍💼",
  },
  {
    title: "Maria Thereza de Barros Camargo",
    description: "Primeira prefeita mulher do estado (1932) e uma das primeiras mulheres a ser nomeada deputada estadual (1935)",
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
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e2b6b] to-[#d4165c] opacity-100">
          {/* Pattern overlay with improved opacity */}
          <div
            className="absolute inset-0 opacity-20"
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
              {/* Improved Historical Tooltip with Properly Fixed Header */}
              {showFacts && (
                <div className="fixed top-16 inset-x-4 sm:inset-x-auto sm:right-4 sm:top-16 sm:w-80 max-w-[calc(100%-2rem)] bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 transform transition-all duration-300 z-[100] flex flex-col max-h-[80vh]">
                  {/* Header with title and close button - properly fixed */}
                  <div className="flex justify-between items-center p-4 border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-10 rounded-t-xl">
                    <h3 className={`font-semibold text-[#1e2b6b] ${arsenal.className}`}>Marcos Históricos</h3>
                    <button 
                      onClick={() => setShowFacts(false)}
                      className="text-gray-400 hover:text-[#d4165c] transition-colors p-1 rounded-full hover:bg-gray-100/50"
                      aria-label="Fechar"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                  
                  {/* Scrollable content area */}
                  <div className="p-4 overflow-y-auto flex-1">
                    {/* Facts list with enhanced styling */}
                    <div className="space-y-4">
                      {celebratoryFacts.map((fact, index) => (
                        <div key={index} className="flex items-start group">
                          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-[#1e2b6b]/10 to-[#d4165c]/10 mr-3 group-hover:from-[#1e2b6b]/20 group-hover:to-[#d4165c]/20 transition-colors">
                            <span className="text-2xl">{fact.icon}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className={`font-medium text-[#832161] mb-1 ${playfair.className}`}>
                              {fact.title}
                            </h4>
                            <p className={`text-sm text-gray-600 ${karma.className}`}>
                              {fact.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Footer note - fixed at bottom */}
                  <div className="p-3 border-t border-gray-100 bg-white/95 backdrop-blur-sm rounded-b-xl">
                    <p className={`text-xs text-gray-500 italic ${changa.className}`}>
                      Fonte: Arquivo Nacional, Arquivo CML e TSE
                    </p>
                  </div>
                </div>
              )}

            {/* Main Header Content with responsive adjustments */}
            <div className="text-center mb-4 sm:mb-8">
              <div className="inline-block bg-white/10 backdrop-blur-sm px-4 sm:px-6 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 border border-white/20 transform hover:scale-105 transition-transform duration-300">
                <p className="text-sm sm:text-base text-white font-medium tracking-wide flex items-center">
              
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
        {/* Timeline Section with Improved Mobile Design */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 mb-8 border border-gray-100">
          <h3 className={`text-xl sm:text-2xl font-bold mb-6 sm:mb-10 flex items-center text-[#1e2b6b] ${arsenal.className}`}>
            
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

          {/* New Timeline for Mobile - Only visible on small screens, dot-centric design */}
          <div className="sm:hidden">
            <div className="space-y-6">
              {timelineData.map((event, index) => (
                <div key={index} className="flex flex-col items-center">
                  {/* Timeline Point - Matching desktop dot styling */}
                  <div className={`
                    w-4 h-4 rounded-full mb-3
                    transition-all duration-300 relative
                    ${event.highlight ? 'bg-[#d4165c]' : 'bg-[#1e2b6b]'}
                    before:absolute before:content-[""] 
                    before:w-8 before:h-8 before:rounded-full 
                    before:border
                    before:-left-2 before:-top-2
                    ${event.highlight
                      ? 'before:border-[#d4165c] before:opacity-40 before:animate-pulse'
                      : 'before:border-[#1e2b6b] before:opacity-20'}
                    before:transition-all before:duration-300
                    after:absolute after:content-[""]
                    after:w-6 after:h-6 after:rounded-full
                    after:border
                    after:-left-1 after:-top-1
                    ${event.highlight
                      ? 'after:border-[#d4165c] after:opacity-60'
                      : 'after:border-[#1e2b6b] after:opacity-40'}
                    after:transition-all after:duration-300
                  `}>
                    {/* Inner dot */}
                    <div className="absolute inset-0 m-auto w-2 h-2 bg-white rounded-full" />
                  </div>
                  
                  {/* Country and Year - Centered like desktop */}
                  <div className="text-center mb-2">
                    <div className={`text-base font-semibold text-[#1e2b6b] ${arsenal.className}`}>
                      {event.country}
                    </div>
                    <div className={`text-sm text-gray-500 mt-0.5 font-medium ${changa.className}`}>
                      {event.year}
                    </div>
                  </div>
                  
                  {/* Event Content - Styled card */}
                  <div className="w-full bg-white/90 backdrop-blur-sm p-4 rounded-lg border border-gray-100 shadow-sm">
                    <p className={`text-sm text-gray-600 leading-relaxed ${karma.className}`}>
                      {event.description}
                    </p>
                    {event.highlight && (
                      <p className={`text-sm text-[#d4165c] font-medium mt-3 ${changa.className}`}>
                        {event.impactText}
                      </p>
                    )}
                  </div>
                  
                  {/* Visual dots connector (only between items, not for the last one) */}
                  {index < timelineData.length - 1 && (
                    <div className="h-6 flex justify-center items-center mt-1">
                      <div className="flex flex-col items-center">
                        <div className="w-1 h-1 rounded-full bg-gray-300 mb-1.5"></div>
                        <div className="w-1 h-1 rounded-full bg-gray-300 mb-1.5"></div>
                        <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>


        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
            {/* Enhanced Document Cards Container with Improved Mobile Experience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
              {loading ? (
                <div className="text-center text-gray-500 py-8 col-span-full">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#d4165c]"></div>
                  <p className="mt-2">Carregando documentos...</p>
                </div>
              ) : sortedDocuments.length === 0 ? (
                <div className="text-center text-gray-500 py-8 col-span-full">
                  <div className="p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200">
                    <FileImage className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p>Nenhum documento encontrado. Tente ajustar sua pesquisa ou filtros.</p>
                  </div>
                </div>
              ) : (
                sortedDocuments.map((doc) => (
                  <div key={doc._id} className="relative group animate-fadeIn">
                    <div
                      onClick={() => handleDocumentClick(doc._id)}
                      className="w-full cursor-pointer bg-white rounded-lg border border-gray-200
                      hover:border-[#1e2b6b]/20 relative overflow-hidden
                      transition-all duration-300 ease-in-out
                      hover:shadow-lg sm:hover:shadow-xl sm:hover:scale-103"
                    >
                      {/* Mobile Layout Structure */}
                      <div className="flex sm:flex-col">
                        {/* Image Container - optimized for mobile */}
                        <div className="relative w-1/3 sm:w-full h-32 sm:h-48 flex-shrink-0 overflow-hidden">
                          {doc.imageUrl ? (
                            <img
                              src={doc.imageUrl}
                              alt={doc.title}
                              className="w-full h-full object-cover transition-transform duration-500 
                                ease-out group-hover:scale-105 group-hover:brightness-105"
                              loading="lazy"
                            />
                          ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400
                              transition-colors duration-300 bg-gray-50 group-hover:bg-gray-100">
                              <FileImage className="h-8 w-8 sm:h-12 sm:w-12 mb-1 sm:mb-2 transition-transform duration-300 
                                group-hover:text-[#1e2b6b] group-hover:scale-110" />
                              <span className="text-xs sm:text-sm">Documento</span>
                            </div>
                          )}
                          
                          {/* Category Badge - Always visible on mobile, appears on hover for desktop */}
                          <div className="absolute top-2 left-2 z-10">
                            <span className="text-xs py-1 px-2 bg-[#1e2b6b]/90 text-white rounded-full
                              backdrop-blur-sm shadow-sm opacity-100 sm:opacity-0 sm:group-hover:opacity-100
                              transition-all duration-300 ease-in-out
                              transform sm:-translate-y-1 sm:group-hover:translate-y-0">
                              {doc.category}
                            </span>
                          </div>
                          
                          {/* Image Overlay Gradient - Subtle on mobile */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent 
                            opacity-40 sm:opacity-0 sm:group-hover:opacity-70 transition-opacity duration-300"></div>
                          
                          {/* Date Ribbon - Mobile Only */}
                          <div className="absolute top-2 right-2 sm:hidden">
                            <div className="bg-white/90 backdrop-blur-sm text-xs py-0.5 px-1.5 rounded-sm shadow-sm 
                              text-[#1e2b6b] font-medium">
                              {new Date(doc.date).toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit'})}
                            </div>
                          </div>
                        </div>

                        {/* Content Section - Optimized for readability on mobile */}
                        <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between overflow-hidden">
                          {/* Top Document Info */}
                          <div>
                            <h3 className={`font-medium text-[#1e2b6b] text-sm leading-tight mb-1.5 line-clamp-2
                              group-hover:text-[#d4165c] transition-colors duration-300 ${arsenal.className}`}>
                              {doc.title}
                            </h3>
                            
                            {/* Source with icon - visible on mobile */}
                            <div className="flex items-center text-xs text-gray-500 mb-2">
                              <BookOpen className="h-3 w-3 mr-1 flex-shrink-0" />
                              <span className="truncate">{doc.source}</span>
                            </div>
                          </div>
                          
                          {/* Bottom Action Area */}
                          <div className="flex items-center justify-between mt-auto pt-1 sm:pt-2">
                            {/* Date on desktop, hidden on mobile */}
                            <div className="hidden sm:flex items-center text-xs text-gray-500">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(doc.date).toLocaleDateString('pt-BR')}
                            </div>
                            
                            {/* View Button - Always visible with subtle hover effect */}
                            <button className="text-xs bg-[#1e2b6b]/90 hover:bg-[#d4165c] text-white rounded-full 
                              py-1 px-2.5 ml-auto transition-all duration-300 ease-in-out
                              flex items-center shadow-sm group-hover:shadow">
                              <span className="mr-1">Ver</span>
                              <ChevronDown className="h-3 w-3 transform -rotate-90 transition-transform 
                                group-hover:translate-x-0.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Document Progress Bar - Desktop Only */}
                      <div className="hidden sm:block absolute bottom-0 left-0 right-0 h-0.5 bg-gray-100">
                        <div className="h-full bg-[#d4165c] w-0 group-hover:w-full transition-all duration-1000 ease-out"></div>
                      </div>
                    </div>
                    
                    {/* Touch Ripple Effect for Mobile */}
                    <div className="absolute inset-0 pointer-events-none sm:hidden">
                      <div className="absolute inset-0 rounded-lg ripple-effect"></div>
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