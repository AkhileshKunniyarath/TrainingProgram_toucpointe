import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Add timestamp
    const registration = {
      ...data,
      createdAt: new Date(),
    };

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'training');
    
    const result = await db.collection('registrations').insertOne(registration);

    return NextResponse.json({ 
      success: true, 
      id: result.insertedId 
    }, { status: 201 });
    
  } catch (error) {
    console.error('Registration Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to save registration' 
    }, { status: 500 });
  }
}
