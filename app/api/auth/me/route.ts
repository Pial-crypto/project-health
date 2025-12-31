import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const token = req.cookies.get("session")?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_WEB_TOKEN!
    ) as any;

    return NextResponse.json({
      authenticated: true,
      user: payload.user,
    });
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
