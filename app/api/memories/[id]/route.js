import { NextResponse } from 'next/server';
import connectDB from '@/lib/connectDB';
import Memory from '@/app/models/Memory.model';
import { authenticateToken } from '@/lib/auth';
import { cloudinary } from '@/lib/cloudinary';
import { Readable } from 'stream';
import formidable from 'formidable';
import fs from 'fs';

export async function DELETE(req, context) {
  try {
    await connectDB();

    const { id: memoryId } = await context.params;
    const user = await authenticateToken(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const memory = await Memory.findById(memoryId);
    if (!memory) {
      return NextResponse.json({ error: 'Memory not found' }, { status: 404 });
    }

    if (memory.user.toString() !== user.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await Memory.findByIdAndDelete(memoryId);
    return NextResponse.json({ message: 'Memory deleted' }, { status: 200 });

  } catch (err) {
    console.error('[MEMORY_DELETE_ERROR]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

async function parseFormData(req) {
  const form = formidable({ multiples: false, uploadDir: '/tmp', keepExtensions: true });
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

export async function PUT(req, context) {
  try {

    await connectDB();
    const { id: memoryId } = await context.params;
    const user = await authenticateToken(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const memory = await Memory.findById(memoryId);
    if (!memory) {
      return NextResponse.json({ error: 'Memory not found' }, { status: 404 });
    }

    if (memory.user.toString() !== user?.user?.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Parse form data
    const { fields, files } = await parseFormData(req);

    const updatedFields = {
      title: fields.title,
      description: fields.description,
      type: fields.type,
      isPublic: fields.isPublic === 'true',
      tags: typeof fields.tags === 'string' ? fields.tags.split(',').map(tag => tag.trim()) : [],
    };

    if (files.file) {
      // Upload new file to Cloudinary (or your service)
      const uploaded = await cloudinary(files.file.filepath);
      updatedFields.file = uploaded.secure_url;
    }

    const updatedMemory = await Memory.findByIdAndUpdate(memoryId, updatedFields, { new: true });
    return NextResponse.json({ message: 'Memory updated successfully', memory: updatedMemory }, { status: 200 });

  } catch (err) {
    console.error('[MEMORY_UPDATE_ERROR]', err);
    return NextResponse.json({ error: 'Failed to update memory' }, { status: 500 });
  }
}
