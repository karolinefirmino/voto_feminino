import { NextResponse } from 'next/server';
import dbConnect from '@/src/utils/mongodb';
import Document from '@/src/models/Document';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    console.log('API: Fetching document with id:', params.id);

    const document = await Document.findById(params.id);
    console.log('API: Found document:', document ? 'yes' : 'no');

    if (!document) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(document);
  } catch (error) {
    console.error('API: Error fetching document:', error);
    return NextResponse.json(
      { error: 'Error fetching document' },
      { status: 500 }
    );
  }
}