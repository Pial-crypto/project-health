import { model, models } from "mongoose";
import dbConnect from "@/lib/mongoose";
import { riskSchema } from "@/app/models/risk";

export async function POST(req: Request) {
  await dbConnect();

  const body = await req.json();
  console.log(body)
  const {
    title,
    projectId,
    projectName,
    description,
    employeeEmail,
    severity,
    mitigationPlan,
  } = body;


  if (
    !title ||
    !projectId ||
    !projectName ||
    !description ||
    !employeeEmail ||
    !severity ||
    !mitigationPlan
  ) {
    return new Response(
      JSON.stringify({ message: "Missing required fields", success: false }),
      { status: 400 }
    );
  }

  const Risk = models.Risk || model("Risk", riskSchema);

  const newRisk = new Risk({
    title,
    projectId,
    projectName,
    description,
    employeeEmail,
    severity,
    mitigationPlan,
    solved:false,
    timeStamp: new Date(),
  });

  await newRisk.save();

  return new Response(
    JSON.stringify({
      message: "Risk created successfully",
      success: true,
    }),
    { status: 201 }
  );
}

export async function GET(req: Request) {
  await dbConnect();

  const url = new URL(req.url);
  const searchParams = url.searchParams;

  const employeeEmail = searchParams.get("employeeEmail");
  const projectId = searchParams.get("projectId");

  const Risk = models.Risk || model("Risk", riskSchema);
  console.log("getting risks ")

  const query: any = {};
  if (employeeEmail) query.employeeEmail = employeeEmail;
  if (projectId) query.projectId = projectId;

  const risks = await Risk.find(query).sort({ timeStamp: -1 });

  return new Response(
    JSON.stringify({
      message: "Risk fetched successfully",
      risks,
      success: true,
    }),
    { status: 200 }
  );
}

export async function PUT(request: Request) {
  try {
    await dbConnect();
    
  
   const url = new URL(request.url);
  const searchParams = url.searchParams;
  const riskId=searchParams.get("riskId");
    
    const Risk = models.Risk || model("Risk", riskSchema);
    

    const risk = await Risk.findByIdAndUpdate(
      riskId, 
      { solved: true }, 
      { new: true }
    );
    
    if (!risk) {
       return new Response(
    JSON.stringify({
      message: "Risk not found",
     risk,
      success: true,
    }),
    { status: 404 }
  );
    }
    
   return new Response(
    JSON.stringify({
      message: "Risk updated successfully",
    
      success: true,
    }),
 
  );
  } catch (error) {
    console.error("Error updating risk:", error);
    return new Response(
    JSON.stringify({
      message: "Risk updation failed",
   
      success: true,
    }),
   
  );
  }
}
