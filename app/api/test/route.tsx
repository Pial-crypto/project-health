import { NextResponse } from 'next/server';

import dbConnect from '@/lib/mongoose';
export async function GET() {
  dbConnect();
  return NextResponse.json({
    message: process.env.DATABASE_URL || 'No DATABASE_URL set',
  });
}
