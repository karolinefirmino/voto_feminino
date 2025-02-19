"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Copy,
  ZoomIn,
  ZoomOut,
  Search,
  Calendar,
  BookOpen,
  FileImage,
  SplitSquareVertical,
  RotateCcw,
  Clock
} from 'lucide-react';

import { documents } from '@/utils/data';

const DocumentViewer = ({ initialDocument }) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(
    documents.findIndex(doc => doc.id === initialDocument?.id) || 0
  );
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedText, setSelectedText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('side-by-side');

  const currentDocument = documents[currentIndex];

  if (!currentDocument) {
    router.push('/');
    return null;
  }

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev < documents.length - 1 ? prev + 1 : prev
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => prev > 0 ? prev - 1 : prev);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 0.5));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  const handleCopyTranscription = () => {
    navigator.clipboard.writeText(currentDocument.transcription);
  };

  const handleExport = (format = 'json') => {
    const exportData = {
      document: currentDocument,
      selectedText: selectedText
    };

    let blob;
    let filename;

    if (format === 'json') {
      blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json'
      });
      filename = `${currentDocument.title.toLowerCase().replace(/\s+/g, '-')}.json`;
    } else {
      const textContent = `
Title: ${currentDocument.title}
Date: ${currentDocument.date}
Source: ${currentDocument.source}
Category: ${currentDocument.category}
Tags: ${currentDocument.tags.join(', ')}

Transcription:
${currentDocument.transcription}

Selected Text:
${selectedText}
      `.trim();

      blob = new Blob([textContent], { type: 'text/plain' });
      filename = `${currentDocument.title.toLowerCase().replace(/\s+/g, '-')}.txt`;
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-[#fff5f8] via-white to-[#f5f0ff] min-h-screen">
      {/* Top Navigation Bar */}
      <div className="mb-6 flex items-center justify-between bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-white/50">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={() => router.push('/')}
            className="p-2 hover:bg-gray-50 transition-colors text-[#1e2b6b] border-[#1e2b6b]"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Catalog
          </Button>
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
            <Input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64 bg-gray-50 border-gray-200 focus:ring-2 focus:ring-[#1e2b6b]"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setViewMode(viewMode === 'side-by-side' ? 'stacked' : 'side-by-side')}
            className="p-2 hover:bg-gray-50 transition-colors text-[#1e2b6b] border-[#1e2b6b]"
          >
            <SplitSquareVertical className="h-4 w-4 mr-2" />
            {viewMode === 'side-by-side' ? 'Stacked View' : 'Side by Side'}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold text-[#1e2b6b]">
                {currentDocument.title}
              </CardTitle>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1.5 text-gray-400" />
                  {currentDocument.date}
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1.5 text-gray-400" />
                  {currentDocument.source}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1.5 text-gray-400" />
                  {currentDocument.lastAccessed}
                </div>
              </div>
              <div className="mt-3 space-x-2">
                {currentDocument.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-[#f0f2ff] text-[#1e2b6b] hover:bg-[#d4165c]/10 transition-colors"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => handleExport('json')}
                className="p-2 hover:bg-gray-50 transition-colors text-[#1e2b6b] border-[#1e2b6b]"
              >
                <Download className="h-4 w-4 mr-2 text-gray-500" />
                Export JSON
              </Button>
              <Button
                variant="outline"
                onClick={() => handleExport('text')}
                className="p-2 hover:bg-gray-50 transition-colors text-[#1e2b6b] border-[#1e2b6b]"
              >
                <Download className="h-4 w-4 mr-2 text-gray-500" />
                Export Text
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 bg-gradient-to-br from-[#fff5f8] via-white to-[#f5f0ff]">
          <div className={`grid ${viewMode === 'side-by-side' ? 'grid-cols-2 gap-6' : 'grid-cols-1 gap-6'}`}>
            {/* Image Viewer */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <div className="flex items-center space-x-2">
                  <FileImage className="h-4 w-4 text-gray-400" />
                  <span className="font-medium text-gray-700">Document Image</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    onClick={handleZoomIn}
                    className="p-2 hover:bg-gray-50 transition-colors"
                  >
                    <ZoomIn className="h-4 w-4 text-gray-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleZoomOut}
                    className="p-2 hover:bg-gray-50 transition-colors"
                  >
                    <ZoomOut className="h-4 w-4 text-gray-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleResetZoom}
                    className="p-2 hover:bg-gray-50 transition-colors"
                  >
                    <RotateCcw className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              </div>
              <div className="relative overflow-hidden bg-gray-50 p-4">
                <img
                  src={currentDocument.imageUrl}
                  alt={currentDocument.title}
                  className="w-full rounded-lg shadow-sm transition-transform duration-200 ease-in-out"
                  style={{ transform: `scale(${zoomLevel})` }}
                />
              </div>
            </div>

            {/* Transcription Viewer */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-gray-400" />
                  <span className="font-medium text-gray-700">Transcription</span>
                </div>
                <Button
                  variant="ghost"
                  onClick={handleCopyTranscription}
                  className="p-2 hover:bg-gray-50 transition-colors"
                >
                  <Copy className="h-4 w-4 text-gray-500 mr-2" />
                  Copy Text
                </Button>
              </div>
              <div
                className="p-4 bg-gray-50 h-[calc(100%-4rem)] overflow-y-auto"
                onMouseUp={() => {
                  const selection = window.getSelection();
                  setSelectedText(selection.toString());
                }}
              >
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  {currentDocument.transcription}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between mt-6 pt-6 border-t border-gray-100">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="p-2 hover:bg-gray-50 transition-colors disabled:opacity-50 text-[#1e2b6b] border-[#1e2b6b]"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous Document
            </Button>
            <Button
              variant="outline"
              onClick={handleNext}
              disabled={currentIndex === documents.length - 1}
              className="p-2 hover:bg-gray-50 transition-colors disabled:opacity-50 text-[#1e2b6b] border-[#1e2b6b]"
            >
              Next Document
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentViewer;
