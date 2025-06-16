import { NextResponse } from 'next/server';
import connectDB from '@/lib/connectDB';
import Vaccine from '@/app/models/Vaccine.model';
import { authenticateToken } from '@/lib/auth';

export async function POST(req, { params }) {
  await connectDB();

  const userReq = await authenticateToken(req);
  const userId = userReq?.user?.id;
  const vaccineId = params.id;

  if (!userId || !vaccineId) {
    return NextResponse.json({ error: 'Missing user ID or vaccine ID' }, { status: 400 });
  }

  try {
    const { completedDate } = await req.json();

    const updatedVaccine = await Vaccine.findOneAndUpdate(
      { _id: vaccineId, userId },
      {
        status: 'completed',
        completedDate: completedDate || new Date(),
      },
      { new: true }
    );

    if (!updatedVaccine) {
      return NextResponse.json({ error: 'Vaccine not found' }, { status: 404 });
    }

    return NextResponse.json(updatedVaccine);
  } catch (error) {
    console.error('Error marking vaccine as completed:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
