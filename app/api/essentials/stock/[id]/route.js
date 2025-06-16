
import Essentials from "@/app/models/Essentials.model";
import { authenticateToken } from "@/lib/auth";
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

// Update stock for an essential item
export async function PUT(request, { params }) {
  try {
    await connectDB();
    
    const user = await authenticateToken(request);
    const userId = user.user.id;
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized - Invalid token" },
        { status: 401 }
      );
    }

    const { id } = params;
    const { currentStock } = await request.json();

    const essential = await Essentials.findOneAndUpdate(
      {
        _id: id,
        userId // Ensure the item belongs to the requesting user
      },
      {
        currentStock: parseInt(currentStock),
        lastUpdated: Date.now()
      },
      { new: true }
    );

    if (!essential) {
      return NextResponse.json(
        { error: "Essential item not found or not owned by user" },
        { status: 404 }
      );
    }

    return NextResponse.json(essential);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update stock" },
      { status: 500 }
    );
  }
}