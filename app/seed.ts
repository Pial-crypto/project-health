import mongoose from "mongoose";

import bcrypt from "bcryptjs";
import UserSchema from "./models/user";
import dbConnect from "@/lib/mongoose";

dbConnect()

const User = mongoose.model("User", UserSchema);

async function seedAdmin() {
  try {
    

    // Hash password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new User({
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();

    console.log("Admin user created successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error creating admin:", err);
    process.exit(1);
  }
}

seedAdmin();
