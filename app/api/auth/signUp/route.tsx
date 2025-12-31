import dbConnect from "@/lib/mongoose";
import bcrypt from "bcryptjs";
import { model, models } from "mongoose";
import UserSchema from "@/app/models/user";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  const { name, email, password, role } = body;
  console.log("Registering user with email:", email, "and role:", role);
  console.log(password,role,name)
  

  const User = models.User || model("User", UserSchema);

  const existingUser = await User.findOne({ email });
console.log("Existing user:", existingUser);
  // Admin already exists
  if (existingUser && role === "admin" && existingUser.role === "admin") {
    return new Response(
      JSON.stringify({ message: "Email already in use", success: false }),
      { status: 200 }
    );
  }

  // Email exists with different role
  if (existingUser && existingUser.role !== role) {
    return new Response(
      JSON.stringify({ message: "Email already in use with different role", success: false }),
      { status: 200 }
    );
  }


  if (existingUser && existingUser.role === role && (role === "employee" || role === "client")) {
    await sendEmail(
      email,
      "Project Assignment",
      `Hello ${existingUser.name},\n\nYou have been added to a new project as ${role}.`
    );

    return new Response(
      JSON.stringify({ message: "Email sent to existing user", success: true }),
      { status: 200 }
    );
  }


  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role,
  });

  await newUser.save();

  // Send email with password if employee or client
  if (role === "employee" || role === "client") {
    await sendEmail(
      email,
      "Project Assignment",
      `Hello ${name},\n\nYou have been added to a new project.\nYour login password is: ${password} as ${role}.`
    );
  }

  return new Response(
    JSON.stringify({ message: "User registered successfully", success: true }),
    { status: 201 }
  );
}


async function sendEmail(to: string, subject: string, text: string) {
    console.log("the env",process.env.SMTP_HOST,process.env.SMTP_PORT,process.env.SMTP_USER,process.env.SMTP_PASS)
  // create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true, // true for port 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // send email
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,       // recipient email
    subject,  // email subject
    text,     // email body (plain text)
  });
}
