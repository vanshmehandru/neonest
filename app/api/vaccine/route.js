import { NextResponse } from 'next/server';
import Vaccine from '@/app/models/Vaccine.model';
import connectDB from '@/lib/connectDB';
import User from '@/app/models/User.model';
import standardVaccines from '@/lib/standardVaccines';
import { authenticateToken } from '@/lib/auth';

await connectDB();

// ======================= GET =======================
export async function GET(req) {
  const userReq = await authenticateToken(req);
  const userId = userReq?.user?.id;

  if (!userId) {
    return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });
  }

  try {
    const vaccines = await Vaccine.find({ userId }).sort({ scheduledDate: 1 });
    return NextResponse.json(vaccines);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ======================= POST =======================
export async function POST(req) {
  const vaccineData = await req.json();
  const userReq = await authenticateToken(req);
  const userId = userReq?.user?.id;

  if (!userId) {
    return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });
  }

  try {
    const vaccine = new Vaccine({
      userId,
      ...vaccineData,
      status: 'scheduled',
      isStandard: false,
    });

    const savedVaccine = await vaccine.save();
    return NextResponse.json(savedVaccine, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

