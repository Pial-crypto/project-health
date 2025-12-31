import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";

import { checkInSchema } from "@/app/models/checkIn";
import { model, models } from "mongoose";
import { timeStamp } from "console";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  
  const employeeEmail = url.searchParams.get("employeeEmail");
  const projectIds = url.searchParams.get("projectIds"); 
  console.log("seraching for omuk")
  
  let query: any = {};

  if (employeeEmail) query.employeeEmail = employeeEmail;
  if (projectIds) query.projectId = { $in: projectIds.split(",") };

  console.log("query", query);

  const checkInModel = models.CheckIn || model("CheckIn", checkInSchema);
  const checkIns = await checkInModel.find(query).sort({ timeStamp: -1 });

  return NextResponse.json(
    { message: "Check-ins fetched successfully", checkIns, success: true },
    { status: 200 }
  );
}


export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    const body = await req.json();
    const {
      projectId,
      employeeEmail,
      
      projectName,
      clientEmail,
      week,

      progressSummary,
      blockers,
      completionPercentage,
      confidenceLevel
    } = body;
console.log(body)
    // Validation
    if (!projectId || !employeeEmail ||  !progressSummary) {
      return NextResponse.json(
        { 
          message: "Missing required fields: projectId, employeeId, week, progressSummary",
          success: false 
        }, 
        { status: 400 }
      );
    }

    if (completionPercentage && (completionPercentage < 0 || completionPercentage > 100)) {
      return NextResponse.json(
        { message: "completionPercentage must be between 0-100", success: false },
        { status: 400 }
      );
    }

    if (confidenceLevel && (confidenceLevel < 1 || confidenceLevel > 5)) {
      return NextResponse.json(
        { message: "confidenceLevel must be between 1-5", success: false },
        { status: 400 }
      );
    }

    const checkInModel = models.CheckIn || model("CheckIn", checkInSchema);
    const newCheckIn = new checkInModel({
      projectId,
      employeeEmail,
      projectName,
      clientEmail,
      progressSummary,
      blockers: blockers || "", 
      completionPercentage: completionPercentage || 0,
      confidenceLevel: confidenceLevel || 3,
      week
    });

    console.log("New check-in data:", newCheckIn);

    await newCheckIn.save();

    return NextResponse.json(
      { 
        message: "Check-in submitted successfully", 
        success: true,
        data: newCheckIn 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error creating check-in:", error);
    return NextResponse.json(
      { 
        message: "Failed to submit check-in", 
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}


