import { NextResponse } from 'next/server';
import * as mammoth from 'mammoth';

export async function POST(request) {
  try {
    const { encodedData } = await request.json();

    // Validate the input
    if (!encodedData || typeof encodedData !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input: encodedData is required and must be a string.' },
        { status: 400 }
      );
    }

    // Decode the base64 string to a Buffer
    const decodedBuffer = Buffer.from(encodedData, 'base64');

    // Convert the Buffer to an ArrayBuffer
    const arrayBuffer = decodedBuffer.buffer.slice(
      decodedBuffer.byteOffset,
      decodedBuffer.byteOffset + decodedBuffer.byteLength
    );

    // Use mammoth to extract text from the Word document
    const result = await mammoth.extractRawText({ arrayBuffer });

    // Return the extracted text
    return NextResponse.json({ text: result.value }, { status: 200 });
  } catch (error) {
    console.error('Error processing document:', error);
    return NextResponse.json(
      { error: 'Error processing document', details: error.message },
      { status: 500 }
    );
  }
}