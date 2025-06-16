import { NextResponse } from 'next/server';
import connectDB from '@/lib/connectDB';
import Memory from '@/app/models/Memory.model';
import { authenticateToken } from '@/lib/auth';

export async function DELETE(req, { params }) {
  await connectDB();
  const user = await authenticateToken(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const memory = await Memory.findById(params.id);
  if (!memory) return NextResponse.json({ error: 'Memory not found' }, { status: 404 });

  if (memory.userId.toString() !== user.user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  await Memory.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Memory deleted' });
}
