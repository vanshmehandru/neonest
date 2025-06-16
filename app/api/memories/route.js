import { NextResponse } from "next/server";

import cloudinary from "@/lib/cloudinary";
import Memory from "@/app/models/Memory.model";
import { authenticateToken } from "@/lib/auth";
import connectDB from "@/lib/connectDB";
import User from "@/app/models/User.model";

await connectDB();

// GET - Get public memories
export async function GET(request) {
  try {
    console.log(request.headers)
    const user = await authenticateToken(request);
    console.log(user)
    const userId = user.user.id;
    const privateMemories = await Memory.find({user : userId , isPublic: false});
    console.log(privateMemories);
    const publicMemories = await Memory.find({ isPublic: true })
      .sort({ createdAt: -1 })
      .populate("user", "name");

    return NextResponse.json({privateMemories ,publicMemories});
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Error fetching memories" },
      { status: 500 }
    );
  }
}

// POST - Create new memory
export async function POST(request) {
  const formData = await request.formData();
  const user = await authenticateToken(request);
  const userId = user.user.id;

  const file = formData.get("file");
  const description = formData.get("description");
  const isPublic = formData.get("isPublic") === "true";

  if (!file) {
    return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
  }

  try {
    // Convert file to buffer
    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer);

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "auto" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(bytes);
    });

    // Create memory in database
    const newMemory = new Memory({
      user: userId,
      description,
      isPublic,
      type: result.resource_type,
      file: result.secure_url,
      likes: [],
      comments: [],
    });

    await newMemory.save();

    return NextResponse.json(newMemory);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error uploading memory" },
      { status: 500 }
    );
  }
}
