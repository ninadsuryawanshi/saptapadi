import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ContactMessage from '@/lib/models/ContactMessage';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Save to DB — admin can view messages via the admin portal
    await ContactMessage.create({ name, email, phone, subject, message });

    return NextResponse.json({ success: true, message: 'Message sent successfully' });

  } catch (err: any) {
    console.error('Contact API Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
