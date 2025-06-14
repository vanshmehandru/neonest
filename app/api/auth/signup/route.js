import User from "@/app/models/User.model";
import connectDB from "@/lib/connectDB";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { authenticateToken } from "@/lib/auth";

await connectDB();
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return Response.json(
        { error: "Please provide all details" },
        { status: 422 }
      );
    }

    if (!email.includes("@")) {
      return Response.json(
        { error: "Please enter valid email id" },
        { status: 422 }
      );
    }

    if (password.length < 9) {
      return Response.json(
        { error: "Password must be at least 8 characters" },
        { status: 422 }
      );
    }

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return Response.json(
        { error: "Email already exists! Login instead" },
        { status: 422 }
      );
    }

    const hashPass = await bcryptjs.hash(password, 10);
    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password: hashPass,
    });

    await newUser.save();

    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return Response.json(
      {
        success: "User registered Successfully!",
        newUser,
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const { noOfBabies, deliveryType } = body;
    const BabyDet = JSON.parse(body.BabyDet);

    if (!noOfBabies || !deliveryType) {
      return Response.json(
        { error: "Please provide all details" },
        { status: 422 }
      );
    }
    if(BabyDet.length != noOfBabies){
        return Response.json(
          { error: "Please provide all baby details" },
          { status: 422 }
        );
    }
    for (let i = 0; i < noOfBabies; i++) {
      console.log(BabyDet[0])
      if (
        !BabyDet[i].babyName ||
        !BabyDet[i].dateOfBirth ||
        !BabyDet[i].time ||
        !BabyDet[i].gender
      ) {
        return Response.json(
          { error: "Please provide all baby details" },
          { status: 422 }
        );
      }
    }

    const { user, error } = await authenticateToken(req);
    if (error) {
      return new Response(JSON.stringify({ error }), { status: 401 });
    }

    const userExists = await User.findOne({ email: user.email });
    if (!userExists) {
      return Response.json(
        { error: "no such email exists! signup first" },
        { status: 422 }
      );
    }
    const updatedUser = await User.findByIdAndUpdate( user.id , {
      noOfBabies,
      deliveryType,
      BabyDet
    },
    {
      new: true,
      runValidators: false, // Important!
    });

    console.log(updatedUser);

    return Response.json(
      {
        success: "User updated Successfully!",
        updatedUser: updatedUser.toObject(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
