import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Candidate from '@/lib/models/Candidate';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email, phone1 } = await req.json();

    if (!email && !phone1) {
      return NextResponse.json({ error: 'Email or Phone is required' }, { status: 400 });
    }

    const query: any = { $or: [] };
    if (email) query.$or.push({ 'contact.email': email });
    if (phone1) query.$or.push({ 'contact.phone1': phone1 });

    const existing = await Candidate.findOne(query);

    if (existing) {
      return NextResponse.json({ 
        exists: true, 
        message: 'A profile with this email or phone already exists.' 
      });
    }

    return NextResponse.json({ exists: false });

  } catch (err: any) {
    console.error('Check Duplicate API Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
