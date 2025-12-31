import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import UserSchema from "@/app/models/user";
import dbConnect from "@/lib/mongoose";

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export async function GET(req: Request) {
  try {
    await dbConnect();

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const existingUser = await User.findOne({ email: "admin@example.com" });

    if (existingUser) {
      await existingUser.deleteOne();

      return new Response(
        JSON.stringify({
          message: "User already existed but deleted now...Try again",
          success: true,
        }),
        { status: 200 }
      );
    }

    const admin = new User({
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();

    return new Response(
      JSON.stringify({ message: "Seed user created successfully", success: true }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: "Seed user creation failed", success: false }),
      { status: 500 }
    );
  }
}
