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

// ======================= PUT =======================
export async function PUT(req) {
  const { vaccineId, ...updateData } = await req.json();
  const userReq = await authenticateToken(req);
  const userId = userReq?.user?.id;

  if (!userId || !vaccineId) {
    return NextResponse.json({ error: 'Missing user ID or vaccine ID' }, { status: 400 });
  }

  try {
    const updatedVaccine = await Vaccine.findOneAndUpdate(
      { _id: vaccineId, userId },
      updateData,
      { new: true }
    );

    if (!updatedVaccine) {
      return NextResponse.json({ error: 'Vaccine not found' }, { status: 404 });
    }

    return NextResponse.json(updatedVaccine);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ======================= DELETE =======================
export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const vaccineId = searchParams.get('id');
  const userReq = await authenticateToken(req);
  const userId = userReq?.user?.id;

  if (!userId || !vaccineId) {
    return NextResponse.json({ error: 'Missing user ID or vaccine ID' }, { status: 400 });
  }

  try {
    const deletedVaccine = await Vaccine.findOneAndDelete({
      _id: vaccineId,
      userId,
    });

    if (!deletedVaccine) {
      return NextResponse.json({ error: 'Vaccine not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Vaccine deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ======================= PATCH (Add Standard Vaccines) =======================
export async function PATCH(req) {
  const { birthDate } = await req.json();
  const userReq = await authenticateToken(req);
  const userId = userReq?.user?.id;

  console.log(userId)
  if (!userId || !birthDate) {
    return NextResponse.json({ error: 'Missing user ID or birthDate' }, { status: 400 });
  }

  try {
    // Delete existing standard vaccines
    await Vaccine.deleteMany({ userId, isStandard: true });

    // Create new standard vaccines
    const birth = new Date(birthDate);
    const vaccinesToAdd = standardVaccines.map(vaccine => {
      const scheduledDate = new Date(birth);
      scheduledDate.setMonth(scheduledDate.getMonth() + vaccine.ageMonths);

      return {
        userId,
        name: vaccine.name,
        description: vaccine.description,
        scheduledDate,
        status: 'scheduled',
        ageMonths: vaccine.ageMonths,
        isStandard: true,
      };
    });

    const createdVaccines = await Vaccine.insertMany(vaccinesToAdd);
    return NextResponse.json(createdVaccines, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
