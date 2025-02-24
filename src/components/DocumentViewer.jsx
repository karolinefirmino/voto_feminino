"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, FileText, Clock, Calendar, Tag } from 'lucide-react';

const DocumentViewer = ({ document }) => {
  const router = useRouter();

  if (!document) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center text-red-500">
          <p>Document not found</p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 text-blue-900 hover:text-blue-700"
          >
            Return to Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => router.push('/')}
          className="mb-8 flex items-center text-blue-900 hover:text-blue-700 transition-colors"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Voltar ao Catálogo
        </button>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {document.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(document.date).toLocaleDateString('pt-BR')}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {new Date(document.createdAt).toLocaleDateString('pt-BR')}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
  {/* Image Section - Updated to remove extra space */}
  <div className="relative bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
    {document.imageUrl ? (
      <div className="w-full flex justify-center items-center p-4">
        <img
          src={document.imageUrl}
          alt={document.title}
          className="w-auto max-w-full h-auto rounded" // Adjusted classes
          style={{
            maxHeight: 'calc(100vh - 300px)', // Dynamic max height
            objectFit: 'contain',
          }}
        />
      </div>
    ) : (
      <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
        <FileText className="h-16 w-16 mb-4" />
        <span className="text-sm">Imagem não disponível</span>
      </div>
    )}
  </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Fonte</h3>
                <p className="text-gray-900">{document.source}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Categoria</h3>
                <p className="text-gray-900">{document.category}</p>
              </div>

              {document.tags && document.tags.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {document.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {document.transcription && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Transcrição</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-900 whitespace-pre-wrap">
                      {document.transcription}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;