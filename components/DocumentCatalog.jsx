"use client";
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { documents } from '@/utils/data';
import {
  Search,
  Filter,
  Calendar,
  Clock,
  FileImage,
  ChevronDown,
  BookOpen,
  Check
} from 'lucide-react';

// Timeline data
const timelineData = [
  { country: "Nova Zelândia", year: 1893, highlight: false },
  { country: "Finlândia", year: 1906, highlight: false },
  { country: "Brasil", year: 1932, highlight: true },
  { country: "França", year: 1944, highlight: false }
];

// Categories
const categories = ['Todos', 'Legislação', 'Manifesto', 'Documentação Histórica', 'Fotografias', 'Jornais da Época'];

const Timeline = () => {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-[#e6e9f4] p-6 mb-8">
        <h3 className="text-xl font-bold text-[#1e2b6b] mb-6 flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-[#d4165c]" />
          Linha do Tempo: Conquista do Voto Feminino no Mundo
        </h3>
  
        <div className="relative mt-8">
          <div className="flex justify-between items-center space-x-4">
            {timelineData.map((event, index) => (
              <div
                key={index}
                className={`flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 cursor-pointer
                  ${event.highlight ? 'text-[#d4165c]' : 'text-[#1e2b6b]'}`}
              >
                <div
                  className={`w-4 h-4 rounded-full mb-2 transition-colors
                    ${event.highlight
                      ? 'bg-[#d4165c] ring-4 ring-[#d4165c]/20'
                      : 'bg-[#1e2b6b] hover:bg-[#d4165c]'}`}
                />
                <span className="text-sm font-medium whitespace-nowrap">{event.year}</span>
                <span className="text-xs mt-1 max-w-[80px]">{event.country}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  

const DocumentCard = ({ doc, isSelected, onSelect, onClick }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  if (!doc) return null;

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="w-[160px] cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden bg-white">
        <div className="relative h-[200px]">
          {isSelected && (
            <div className="absolute inset-0 bg-[#1e2b6b]/20 z-10">
              <div className="absolute top-2 right-2">
                <div className="w-5 h-5 bg-[#d4165c] rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
              </div>
            </div>
          )}

          <img
            src={doc.imageUrl}
            alt={doc.title}
            className="w-full h-full object-cover"
            onClick={onClick}
          />

          <div
            className={`absolute inset-0 bg-white/95 backdrop-blur-sm
              transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}
          >
            <div className="p-3">
              <h3 className="text-sm font-semibold text-[#1e2b6b] mb-1 line-clamp-2">{doc.title}</h3>
              <p className="text-xs text-gray-600 mb-2 line-clamp-2">{doc.description}</p>

              <div className="flex flex-col space-y-1 text-xs text-gray-600">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1 text-[#d4165c]" />
                  {doc.date}
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-3 w-3 mr-1 text-[#d4165c]" />
                  {doc.source}
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mt-2">
                {doc.tags.map(tag => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-[#f0f2ff] text-[#1e2b6b] text-[10px] px-1.5 py-0.5"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    className="flex-1 h-7 text-xs bg-[#1e2b6b] hover:bg-[#d4165c] text-white"
                    onClick={() => {
                      router.push(`/viewer/${doc.id}`);
                    }}
                  >
                    Visualizar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 px-2 text-xs border-[#1e2b6b] text-[#1e2b6b]"
                    onClick={() => {
                      router.push(`/viewer/${doc.id}`);
                      onSelect();
                    }}
                  >
                    <Check className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`p-3 bg-white transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
          <h3 className="font-medium text-[#1e2b6b] text-sm truncate mb-1">{doc.title}</h3>
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="h-3 w-3 mr-1" />
            {doc.lastAccessed}
          </div>
        </div>
      </Card>
    </div>
  );
};

const DocumentCatalog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedDocuments, setSelectedDocuments] = useState(new Set());
  const [sortBy, setSortBy] = useState('date');

  const handleDocumentSelect = (docId) => {
    setSelectedDocuments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(docId)) {
        newSet.delete(docId);
      } else {
        newSet.add(docId);
      }
      return newSet;
    });
  };

  const sortedAndFilteredDocuments = documents
    .filter(doc => {
      const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Todos' || doc.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date) - new Date(a.date);
      }
      return a.title.localeCompare(b.title);
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff5f8] via-white to-[#f5f0ff]">
      {/* Celebratory Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e2b6b] to-[#d4165c]">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-12 pb-16 relative">
          <div className="text-center mb-8">
            <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
              <p className="text-white/90 text-sm font-medium">24 de Fevereiro de 1932</p>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Mulheres e Democracia
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Celebrando 90+ Anos do Voto Feminino no Brasil
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Button variant="outline" className="text-white border-white hover:bg-white/10">
                Explorar Documentos
              </Button>
              <Button variant="outline" className="text-white border-white hover:bg-white/10">
                Saiba Mais
              </Button>
            </div>
          </div>

          {/* Decorative Elements */}
          
        </div>

        {/* Decorative Wave */}

      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-[#e6e9f4] p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Pesquisar documentos históricos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-[#e6e9f4] focus:ring-2 focus:ring-[#1e2b6b]"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative min-w-[160px]">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full appearance-none bg-white border border-[#e6e9f4] rounded-md px-4 py-2 pr-8 text-[#1e2b6b] focus:ring-2 focus:ring-[#1e2b6b] cursor-pointer"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <ChevronDown className="h-4 w-4 absolute right-2 top-3 text-gray-400 pointer-events-none" />
              </div>

              <Button
                variant="outline"
                onClick={() => setSortBy(sortBy === 'date' ? 'title' : 'date')}
                className="border-[#e6e9f4] text-[#1e2b6b]"
              >
                Ordenar por: {sortBy === 'date' ? 'Data' : 'Título'}
              </Button>
            </div>
          </div>
        </div>

        <Timeline />

        {selectedDocuments.size > 0 && (
          <div className="bg-[#1e2b6b] text-white px-4 py-3 rounded-lg mb-6 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="font-medium">{selectedDocuments.size} documentos selecionados</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" className="hover:bg-white/10 text-white">
                Download
              </Button>
              <Button variant="ghost" className="hover:bg-white/10 text-white">
                Compartilhar
              </Button>
              <Button
                variant="ghost"
                className="hover:bg-white/10 text-white"
                onClick={() => setSelectedDocuments(new Set())}
              >
                Limpar Seleção
              </Button>
            </div>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#1e2b6b] mb-6">Acervo Histórico da Conquista do Voto Feminino</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {sortedAndFilteredDocuments.map(doc => (
              <DocumentCard
                key={doc.id}
                doc={doc}
                isSelected={selectedDocuments.has(doc.id)}
                onSelect={() => handleDocumentSelect(doc.id)}
                onClick={() => console.log('View document:', doc.id)}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12 mb-8">
          <Button
            variant="outline"
            className="bg-white text-[#1e2b6b] border-[#1e2b6b] hover:bg-[#1e2b6b] hover:text-white transition-colors"
          >
            Carregar Mais Documentos
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentCatalog;
