
import dbConnect from "@/lib/mongoose";
import { model } from "mongoose";
import { projectSchema } from "@/app/models/project";
import { models } from "mongoose";
export async function POST(req:Request){
    await dbConnect();
    const body=await req.json();
    const {name,description,clientEmail,startDate,endDate,adminId,adminName}=body;

  const Project =
models.Project || model("Project", projectSchema);
    const newProject=new Project({
        name,
        description,
        clientEmail,
        startDate,
        endDate,
        adminId,
        adminName,
        employeeList: [],
       // employeeEmails: []
    });
  


    await newProject.save();


    return new Response(JSON.stringify({message:"Project created successfully",success:true}),{status:201});

}

export async function GET(req: Request) {
   const url = new URL(req.url);
  const adminId = url.searchParams.get("adminId");
  const clientEmail = url.searchParams.get("clientEmail");
  const employeeEmail = url.searchParams.get("employeeEmail");
  const role = url.searchParams.get("role");

  try {
    await dbConnect();

    let query = {};
    if (role === "admin" && adminId) {
      query = { adminId };
    } else if (role === "client" && clientEmail) {
      query =  {clientEmail} ;
    } else if (role === "employee" && employeeEmail) {
     query = { employeeList: employeeEmail };
    } else {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid or missing parameters" }),
        { status: 400 }
      );
    }
 const Project =
models.Project || model("Project", projectSchema);
console.log(query)
    const projects = await Project.find(query).sort({ timeStamp: -1 });
   // console.log("Projects here", projects)

    return new Response(JSON.stringify(projects), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to fetch projects" }),
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  await dbConnect();

  const body = await req.json();
  const { projectId, employeeEmail, projectVar } = body;



  console.log("Adding employee ", employeeEmail, " to project ", projectId);
  console.log("ProjectVar:", projectVar);

  // Model initialization
  const Project = models.Project || model("Project", projectSchema);

    if(projectVar){
  //const project = await Project.findById(projectId);
  //console.log("Found project for update:", project);
    // Update project details
    const updatedProject = await Project.findByIdAndUpdate(
      projectVar.id,
      { $set: projectVar },
      { new: true }
    );
console.log("Updated project details:", updatedProject);
    return new Response(
      JSON.stringify({
        success: true,
        message: "Project updated successfully",
        data: updatedProject,
      }),
      { status: 200 }
    );
    }

  // Find the project
  const project = await Project.findById(projectId);
  if (!project) {
    console.log("No project found");
    return new Response(
      JSON.stringify({ success: false, message: "Project not found" }),
      { status: 404 }
    );
  }

  // Initialize employeeList as empty array if undefined
  if (!Array.isArray(project.employeeList)) {
    project.employeeList = [];
  }

  // Check if employee already exists
  if (project.employeeList.includes(employeeEmail)) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Employee already exists",
        data: project,
      }),
      { status: 200 }
    );
  }


  project.employeeList.push(employeeEmail);

  try {
    await project.save();
    console.log("Updated employee list:", project.employeeList);
    return new Response(
      JSON.stringify({
        success: true,
        message: "Employee added successfully",
        data: project,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Failed to save project:", err);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to update project",
      }),
      { status: 500 }
    );
  }
}
