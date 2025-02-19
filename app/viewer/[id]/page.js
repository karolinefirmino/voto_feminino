"use client";
import React from 'react';
import DocumentViewer from '@/components/DocumentViewer';
import { documents } from '@/utils/data';

export default async function ViewerPage({ params }) {
  const documentParams = await params;
  const documentId = parseInt(documentParams.id);
  const document = documents.find(doc => doc.id === documentId);

  if (!document) {
    return <div>Document not found</div>;
  }

  return <DocumentViewer initialDocument={document} />;
}