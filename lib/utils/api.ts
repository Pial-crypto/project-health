// API client for backend communication



const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const createProject=async (formData:any,user:any)=>{
const response=await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({...formData,adminId:user.id,adminName:user.name}),
      });

      return response

}



export async function createUser(params: {
  name: string;
  email: string;
  password: string;
  role: string;
}) {
  const response = await fetch('/api/auth/signUp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: params.name,
      email: params.email,
      password: params.password,
      role: params.role,
    })
  });
  return response;
}


export const updateProject=async(data:any)=>{
  const projectId=data.projectId;
  const employeeEmail=data.employeeEmail;
  const projectVar=data.projectVar;

  console.log("Updating project with data:", data);
  
   const res = await fetch("/api/projects", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                projectId,
                employeeEmail: employeeEmail,
                projectVar:projectVar
              }),
            });
            return res;
}



export async function fetchProjects(user: any, setProjects: any, setIsLoading: any) {
  try {
    console.log("Fetching projects for user:", user);
    const params = new URLSearchParams();
    params.append("role", user.role);

    if (user.role === "admin") {
      params.append("adminId", user.id);
    } else if (user.role === "client") {
      params.append("clientEmail", user.email);
    } else if (user.role === "employee") {
      params.append("employeeEmail", user.email);
    }
    console.log("Fetching projects with params:", params.toString());

    const response = await fetch(`/api/projects?${params.toString()}`);
    if (!response.ok) throw new Error("Failed to fetch projects");

    const data = await response.json();
    if (data && Array.isArray(data)) {
      setProjects(data);
    } else {
      setProjects([]);
    }
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    setProjects([]);
  } finally {
   setIsLoading && setIsLoading(false);
  }
}

export  const fetchEmployee=async (user:any,setProjects:any,setEmployeeList:any)=>{
 
    //const user = JSON.parse(localStorage.getItem("user")!);
    const res = await fetch(
      `/api/projects?adminId=${user.id}&role=${user.role}`
    );
    const data = await res.json();

    setProjects(Array.isArray(data) ? data : []);

    const emailSet = new Set<string>();
    data.forEach((p: any) => {
      p.employeeList?.forEach((email: string) => emailSet.add(email));
    });

    setEmployeeList(Array.from(emailSet).map(email => ({ email })));
  
}
export const createFeedback=async(data:any)=>{
   const res = await fetch("/api/feedback", {
              method: "POST", 
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            });
            return res;
}


export const fetchFeedback=async(projectId:any,clientId:any,setFeedbacks:any)=>{
   const res = await fetch(`/api/feedback?projectId=${projectId}&clientId=${clientId}`, {
              method: "GET",
            });
          const data= await res.json();
            //console.log("Fetched feedback response:", await res.json());
            setFeedbacks(data.data);
            return res;
          };


export const createCheckIn=async (data:any)=>{
  
const res=await fetch("/api/checkIn",{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify(data)
})
return res
}

export const fetchCheckIns = async (
  data: { employeeEmail?: string; projectIds?: string[] },
  setCheckIns: any,
  setIsLoading?: any
) => {
  try {
    setIsLoading && setIsLoading(true);

    // Build query string dynamically
    const queryParams = new URLSearchParams();
    if (data.employeeEmail) queryParams.append("employeeEmail", data.employeeEmail);
    if (data.projectIds && data.projectIds.length > 0)
      queryParams.append("projectIds", data.projectIds.join(","));

    const response = await fetch(`/api/checkIn?${queryParams.toString()}`, {
      method: "GET",
    });

    if (!response.ok) throw new Error("Failed to fetch check-ins");

    const result = await response.json();
    setCheckIns(result.checkIns || []);
  } catch (error) {
    console.error("Error fetching check-ins:", error);
    setCheckIns([]);
  } finally {
    setIsLoading && setIsLoading(false);
  }
};



export async function createRisk(data:any) {
  console.log(data)
  const response=await fetch(`/api/risk`,{
    method:"POST",
     headers:{"Content-Type":"application/json"},
  body:JSON.stringify(data)

  })

  return response
}

export const fetchRisk = async (
  data: any,
  setRisks:any
) => {
  const searchParams = new URLSearchParams();

  if (data?.employeeEmail) {
    searchParams.append("employeeEmail", data.employeeEmail);
  }

  if (data?.projectId) {
    searchParams.append("projectId", data.projectId);
  }

  const url = searchParams.toString()
    ? `/api/risk?${searchParams.toString()}`
    : `/api/risk`;

  const response = await fetch(url, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch risks");
  }

  const result = await response.json();
  setRisks(result.risks);
};

export const solveRisk= async (riskId:any)=>{
  const response=await fetch(`/api/risk?riskId=${riskId}`,{
    method:"PUT",
     headers:{"Content-Type":"application/json"},
//  body:JSON.stringify(projectId)

  })

  return response
}


