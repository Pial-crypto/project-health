import bcrypt from "bcryptjs";
import mongoose, { model } from "mongoose";
import jwt from "jsonwebtoken";
import {  } from "@/app/models/project";
import { models } from "mongoose";
import dbConnect from "@/lib/mongoose";
import { feedbackSchema } from "@/app/models/feedback";
export async function POST(req:Request){
    await dbConnect();
    const body=await req.json();
    const {projectId,comment,flaggedIssue,issueDescription,satisfactionRating,communicationClarity,clientId}=body;

  const feedback=models.Feedback || model("Feedback", feedbackSchema);
const newFeedback=new feedback({
        projectId,
        comment,
        flaggedIssue,
        issueDescription,
        satisfactionRating,
        communicationClarity,
        clientId
    });
console.log("New feedback data:", newFeedback);
    await newFeedback.save();


    return new Response(JSON.stringify({message:"Feedback submitted successfully",success:true}),{status:201});

}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const rawProjectId = url.searchParams.get("projectId");
  const rawClientId = url.searchParams.get("clientId");

  try {
    await dbConnect();
    console.log("Fetching feedback for:", {
      projectId: rawProjectId,
      clientId: rawClientId,
    });

    const query: any = {};

 
    if (
      rawProjectId &&
      rawProjectId !== "undefined" &&
      rawProjectId !== "null" &&
      rawProjectId.trim() !== ""
    ) {

      query.projectId = new mongoose.Types.ObjectId(rawProjectId);
    }

    else if (
      rawClientId &&
      rawClientId !== "undefined" &&
      rawClientId !== "null" &&
      rawClientId.trim() !== ""
    ) {
      query.clientId = rawClientId;
    } else {
         const Feedback =
      models.Feedback || model("Feedback", feedbackSchema);

    console.log("Final feedback query:", query);

    const feedbacks = await Feedback.find().sort({ timeStamp: -1 });
console.log("Fetched feedbacks:", feedbacks);
    return new Response(
      JSON.stringify({ success: true, data: feedbacks }),
      { status: 200 }
    );
    }

    const Feedback =
      models.Feedback || model("Feedback", feedbackSchema);

    console.log("Final feedback query:", query);

    const feedbacks = await Feedback.find(query).sort({ timeStamp: -1 });
console.log("Fetched feedbacks:", feedbacks);
    return new Response(
      JSON.stringify({ success: true, data: feedbacks }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to fetch feedback",
      }),
      { status: 500 }
    );
  }
}
