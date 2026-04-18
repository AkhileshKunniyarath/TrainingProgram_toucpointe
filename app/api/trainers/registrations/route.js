import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'training');
    
    const registrations = await db
      .collection('registrations')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ 
      success: true, 
      data: registrations 
    });
    
  } catch (error) {
    console.error('Fetch Registrations Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch data' 
    }, { status: 500 });
  }
}
