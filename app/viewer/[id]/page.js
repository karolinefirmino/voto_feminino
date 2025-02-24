"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DocumentViewer from 'src/components/DocumentViewer';

export default function ViewerPage({ params }) {
  const [isLoading, setIsLoading] = useState(true);
  const [document, setDocument] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        console.log('Fetching document data for ID:', params.id);
        const response = await fetch(`/api/documents/${params.id}`);
        const data = await response.json();
        console.log('Document data received:', data);
        setDocument(data);
      } catch (error) {
        console.error('Error fetching document:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchDocument();
    }
  }, [params.id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!document) {
    return <div>Document not found</div>;
  }

  return <DocumentViewer document={document} />;
}