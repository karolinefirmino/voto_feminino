import { NextResponse } from 'next/server';
import dbConnect from '@/src/utils/mongodb';

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ message: 'Database connected successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to connect to database' }, { status: 500 });
  }
}