import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Candidate from '@/lib/models/Candidate';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-not-for-production';

export async function GET(req: Request) {
  try {
    // 1. Auth check
    const token = req.headers.get('cookie')?.split('admin_token=')[1]?.split(';')[0];
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
      jwt.verify(token, JWT_SECRET);
    } catch (e) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    await dbConnect();
    const { searchParams } = new URL(req.url);
    
    // 2. Build Query
    const query: any = {};
    
    // Tab filtering
    if (searchParams.get('gender')) {
      query['personal.gender'] = searchParams.get('gender');
    }

    // Age filtering
    const minAge = searchParams.get('minAge');
    const maxAge = searchParams.get('maxAge');
    if (minAge || maxAge) {
      const today = new Date();
      const minDate = maxAge ? new Date(today.getFullYear() - parseInt(maxAge) - 1, today.getMonth(), today.getDate()) : null;
      const maxDate = minAge ? new Date(today.getFullYear() - parseInt(minAge), today.getMonth(), today.getDate()) : null;
      
      query['personal.dob'] = {};
      if (minDate) query['personal.dob'].$gte = minDate;
      if (maxDate) query['personal.dob'].$lte = maxDate;
    }

    // Mangal filtering
    const mangal = searchParams.get('mangal');
    if (mangal && mangal !== 'all') {
      query['personal.mangal'] = mangal;
    }

    // Diet filtering
    const diet = searchParams.get('diet');
    if (diet && diet !== 'all') {
      query['personal.diet'] = diet;
    }

    // Height filtering
    const minHeight = searchParams.get('minHeight');
    const maxHeight = searchParams.get('maxHeight');
    if ((minHeight && minHeight !== 'all') || (maxHeight && maxHeight !== 'all')) {
      query['personal.height'] = {};
      if (minHeight && minHeight !== 'all') query['personal.height'].$gte = minHeight;
      if (maxHeight && maxHeight !== 'all') query['personal.height'].$lte = maxHeight;
    }

    // Income filtering
    const minIncome = searchParams.get('minIncome');
    if (minIncome && minIncome !== 'all') {
      const incomeMap: any = {
        '3': ['₹3 – 6 LPA', '₹6 – 12 LPA', '₹12 – 24 LPA', 'Above ₹24 LPA'],
        '6': ['₹6 – 12 LPA', '₹12 – 24 LPA', 'Above ₹24 LPA'],
        '12': ['₹12 – 24 LPA', 'Above ₹24 LPA'],
        '24': ['Above ₹24 LPA']
      };
      query['education.annualIncome'] = { $in: incomeMap[minIncome] };
    }

    // Gotra filtering
    const gotra = searchParams.get('gotra');
    if (gotra) {
      query['personal.gotra'] = { $regex: gotra, $options: 'i' };
    }

    // Location filtering
    const location = searchParams.get('location');
    if (location) {
      query.$or = [
        { 'personal.birthPlace': { $regex: location, $options: 'i' } },
        { 'education.jobLocation': { $regex: location, $options: 'i' } }
      ];
    }

    // Occupation filtering
    const occupation = searchParams.get('occupation');
    if (occupation) {
      query['education.occupation'] = { $regex: occupation, $options: 'i' };
    }

    // Raas filtering
    const raas = searchParams.get('raas');
    if (raas && raas !== 'all') {
      query['personal.raas'] = raas;
    }

    // Registration date filtering
    const registeredWithin = searchParams.get('registeredWithin');
    if (registeredWithin && registeredWithin !== 'all') {
      const days = parseInt(registeredWithin);
      const sinceDate = new Date();
      sinceDate.setDate(sinceDate.getDate() - days);
      query['createdAt'] = { $gte: sinceDate };
    }

    // Search filtering (Name or Phone)
    const search = searchParams.get('search');
    if (search) {
      const searchConditions = [
        { 'personal.fullName': { $regex: search, $options: 'i' } },
        { 'contact.phone1': { $regex: search, $options: 'i' } }
      ];
      
      if (query.$or) {
        query.$and = [{ $or: query.$or }, { $or: searchConditions }];
        delete query.$or;
      } else {
        query.$or = searchConditions;
      }
    }

    // 3. Fetch
    const candidates = await Candidate.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, candidates });

  } catch (err) {
    console.error('Admin Candidates API Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
