import { NextResponse } from 'next/server';
import dbConnect from '/src/utils/mongodb';
import { Document } from '/src/models';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

export async function GET() {
  try {
    console.log('Connecting to database...');
    await dbConnect();
    console.log('Database connected');
    
    const documents = await Document.find({}).lean();
    console.log('Documents found:', documents.length);
    
    return NextResponse.json(documents);
  } catch (error) {
    console.error('Error in GET /api/documents:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
export async function POST(request) {
  try {
    await dbConnect();
    const formData = await request.formData();
    
    // Process transcription file
    let transcriptionText = '';
    const transcriptionFile = formData.get('transcription');
    
    if (transcriptionFile) {
      try {
        const arrayBuffer = await transcriptionFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const result = await mammoth.extractRawText({ buffer });
        transcriptionText = result.value;
        console.log('Transcription processed:', transcriptionText.substring(0, 100));
      } catch (error) {
        console.error('Error processing transcription:', error);
      }
    }

    // Create document
    const document = await Document.create({
      title: formData.get('title'),
      date: formData.get('date'),
      source: formData.get('source'),
      category: formData.get('category'),
      tags: formData.get('tags')?.split(',').map(tag => tag.trim()) || [],
      imageUrl: '/api/placeholder/160/200',
      transcription: transcriptionText || '',
    });

    return NextResponse.json(document);
  } catch (error) {
    console.error('Error creating document:', error);
    return NextResponse.json(
      { error: 'Error creating document' },
      { status: 500 }
    );
  }
}