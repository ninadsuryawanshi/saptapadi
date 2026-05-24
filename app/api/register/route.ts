import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Candidate from '@/lib/models/Candidate';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    // 1. Basic validation (can be more extensive)
    if (!body.fullName || !body.email || !body.phone1) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 2. Duplicate check
    const existing = await Candidate.findOne({ 
      $or: [{ 'contact.email': body.email }, { 'contact.phone1': body.phone1 }] 
    });
    
    if (existing) {
      return NextResponse.json({ error: 'A profile with this email or phone already exists.' }, { status: 409 });
    }

    // 3. Create candidate document (simplified for now, using dummy URLs for photos)
    const candidate = await Candidate.create({
      personal: {
        fullName: body.fullName,
        gender: body.gender,
        dob: new Date(body.dob),
        birthPlace: body.birthPlace,
        address: body.address,
        raas: body.raas,
        gana: body.gana,
        gotra: body.gotra,
        shakha: body.shakha,
        nakshatra: body.nakshatra,
        charan: body.charan,
        naad: body.naad,
        mangal: body.mangal,
        diet: body.diet,
        height: body.height,
        weight: body.weight,
        bloodGroup: body.bloodGroup,
        profilePhotoUrl: body.profilePhoto || 'https://via.placeholder.com/150', // Replace with real URL from Blob
      },
      education: {
        qualification: body.education,
        occupation: body.occupation,
        jobLocation: body.jobLocation,
        annualIncome: body.annualIncome,
      },
      family: {
        fatherName: body.fatherName,
        fatherDetails: body.fatherDetails,
        motherName: body.motherName,
        motherDetails: body.motherDetails,
        siblingDetails: body.siblingDetails,
        disability: body.disability,
      },
      partnerExpectations: body.partnerExpectations,
      contact: {
        phone1: body.phone1,
        phone2: body.phone2,
        email: body.email,
      },
      payment: {
        transactionId: body.transactionId,
        screenshotUrl: body.paymentScreenshot || 'https://via.placeholder.com/150',
        amount: 1001,
      },
      status: 'pending_review'
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Registration submitted successfully. Awaiting admin review.' 
    });

  } catch (err: any) {
    console.error('Registration API Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
