"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Upload, Image, FileText, Loader2 } from 'lucide-react';

function DocumentUpload() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    source: '',
    category: '',
    tags: '',
  });
  const [image, setImage] = useState(null);
  const [transcription, setTranscription] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTranscriptionUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setTranscription(file);

      if (isClient) {
        try {
          const mammoth = await import('mammoth');
          const reader = new FileReader();
          reader.onloadend = async () => {
            try {
              const arrayBuffer = reader.result;
              const result = await mammoth.default.extractRawText({ arrayBuffer });
              console.log('Extracted text:', result.value);
            } catch (error) {
              console.error('Error processing Word document:', error);
              setError('Error processing Word document');
            }
          };
          reader.readAsArrayBuffer(file);
        } catch (error) {
          console.error('Error importing mammoth:', error);
          setError('Error importing document processor');
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('date', formData.date);
    formDataToSend.append('source', formData.source);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('tags', formData.tags);
    if (image) formDataToSend.append('image', image);
    if (transcription) formDataToSend.append('transcription', transcription);

    try {
      console.log('Sending request to /api/documents');
      const response = await fetch('/api/documents', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const data = await response.json();
      console.log('Upload successful:', data);
      router.push('/');
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Error uploading document');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Upload New Document
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter document title"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <Input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Source
                  </label>
                  <Input
                    name="source"
                    value={formData.source}
                    onChange={handleInputChange}
                    placeholder="Document source"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <Input
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="Document category"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (comma-separated)
                </label>
                <Input
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="Enter tags separated by commas"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Document Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {imagePreview ? (
                      <div className="relative w-full h-48">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="mx-auto max-h-48 object-contain"
                        />
                        <Button
                          type="button"
                          onClick={() => {
                            setImage(null);
                            setImagePreview(null);
                          }}
                          className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                          disabled={isSubmitting}
                        >
                          ×
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Image className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label className={`relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <span>Upload a file</span>
                            <input
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleImageUpload}
                              disabled={isSubmitting}
                            />
                          </label>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transcription Document
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {transcription ? (
                      <div className="flex items-center justify-center space-x-2">
                        <FileText className="h-8 w-8 text-gray-400" />
                        <span className="text-sm text-gray-500">{transcription.name}</span>
                        <Button
                          type="button"
                          onClick={() => setTranscription(null)}
                          className="text-red-500"
                          disabled={isSubmitting}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <>
                        <FileText className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label className={`relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <span>Upload a file</span>
                            <input
                              type="file"
                              className="sr-only"
                              accept=".doc,.docx,.txt"
                              onChange={handleTranscriptionUpload}
                              disabled={isSubmitting}
                            />
                          </label>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-indigo-600 text-white hover:bg-indigo-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  'Upload Document'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default DocumentUpload;