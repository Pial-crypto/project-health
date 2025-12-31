"use client";

import { UserRole } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchCheckIns, fetchEmployee, fetchFeedback, fetchProjects, fetchRisk } from "../utils/api";

// export async function useProtectedRoute(setUser:any,data:any,role:string,setIsLoading:any) {
//   const router=useRouter()
//    useEffect(() => {
//     // const userData = localStorage.getItem("user");
//      //if (!userData) return router.push("/auth/login");

//      try {

//     fetch("/api/auth/me", { credentials: "include" })
//       .then(res => {
//         if (!res.ok) {
//           router.push("/auth/login")
//         //  throw new Error("Not authenticated");
//         }
//         return res.json();
//       })
//       .then(resData => {
//         if (!resData.authenticated) {
//           router.push("/auth/login");
//           return;
//         }

//         const parsedUser = resData.user; 
//         setUser(parsedUser);
//        if (parsedUser.role !== role) return router.push("/unauthorized");
//          const promises: Promise<any>[] = [];

// if(data.createRisk){
//   promises.push(fetchProjects(parsedUser, data.setProjects, setIsLoading))
// }
//        if(data.employeeRisks){
//           promises.push(fetchRisk({employeeEmail:parsedUser.email},data.setRisks))
//        }
//        if( data.employeeHome){

//               promises.push(fetchProjects(parsedUser, data.setProjects, undefined));
//       promises.push( fetchRisk({employeeEmail:parsedUser.email},data.setRisks))
//  promises.push(  fetchCheckIns(
//   { employeeEmail: parsedUser.email }, 
//   data.setCheckIns,                

// ))
//        }
//        if(data.clientHome){
//              promises.push(fetchFeedback(undefined, parsedUser.id, data.setFeedbacks))
//  promises.push(fetchProjects(parsedUser, data.setProjects, setIsLoading))
//        }
//        if(data.employeeCheckInGet){
        
//      //  Promise.all([
//        promises.push( fetchProjects(parsedUser, data.setProjects,undefined))
      
// promises.push(fetchCheckIns(
//   { employeeEmail: parsedUser.email }, 
//   data.setCheckIns,                  
//   setIsLoading                 
// ))

//  //     ]);
//        }
//        if(data.clientProject){
//        promises.push( fetchProjects(parsedUser,data.setProjects,setIsLoading))
//        }
//        if(data.employeeProjects){
//        promises.push(  fetchProjects(parsedUser, data.setProjects, setIsLoading))
//        }
//        if(data.clientProjectDetails){
//         setIsLoading(false)
//        }
//        if(data.employeeCheckIn){
        
//        }
//        if(data.userAdmin)
//           promises.push(  fetchEmployee(parsedUser,data.setProjects,data.setEmployeeList).finally(() => setIsLoading(false)))
//        if(data.projectDetails || data.projectDetails){
//         setIsLoading(false);
//        }
//        if(data.homeAdmin){
//         promises.push(fetchProjects(parsedUser,data.setProjects,setIsLoading))
//        }
//        if(data.adminRisk){
//              promises.push( fetchProjects(parsedUser,data.setProjects,undefined))
//        promises.push( fetchRisk(undefined,data.setRisks))
//        }
//        if(data.clientFeedback){
        
//       promises.push( fetchProjects(parsedUser, data.setProjects, setIsLoading))
//        promises.push(fetchFeedback(undefined,parsedUser.id,data.setFeedbacks))
//        }
//  if(data.setProjects && data.setRisks && data.setRisks && data.setCheckIns && data.setFeedbacks){
//       // Promise.all([
//         promises.push( fetchProjects(parsedUser, data.setProjects, undefined))
//           promises.push(fetchRisk(undefined, data.setRisks))
//           promises.push(fetchFeedback(undefined, undefined, data.setFeedbacks))
//          promises.push( fetchCheckIns({}, data.setCheckIns, undefined))
//       // ]).finally(() => setIsLoading(false));

//       }


//       if (promises.length > 0) {
//           await Promise.all(promises);
//         }
//     }
    

      
//    )} catch (error) {
//        console.error("Failed to parse user data:", error);
//        router.push("/auth/login");
//      } finally {
//    setIsLoading &&    setIsLoading(false);
//     }
//    }, [router]);
// }




export function useProtectedRoute(
  setUser: any,
  data: any,
  role: string,
  setIsLoading: any
) {
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      try {
        // Start loading
        setIsLoading && setIsLoading(true);

        // 1️ Auth
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (!res.ok) {
          router.push("/auth/login");
          return;
        }
        const resData = await res.json();
        if (!resData.authenticated) {
          router.push("/auth/login");
          return;
        }

        const parsedUser = resData.user;
        setUser(parsedUser);
           if (parsedUser.role !== role) return router.push("/unauthorized");

                const promises: Promise<any>[] = [];

                if(data.clientProjectDetails){
                 promises.push( fetchProjects(parsedUser, data.setProjects, undefined))
          promises.push(fetchRisk(undefined, data.setRisks))
          promises.push(fetchFeedback(undefined, undefined, data.setFeedbacks))
         promises.push( fetchCheckIns({}, data.setCheckIns, undefined))
                }
if(data.createRisk){
  promises.push(fetchProjects(parsedUser, data.setProjects, setIsLoading))
}
       if(data.employeeRisks){
          promises.push(fetchRisk({employeeEmail:parsedUser.email},data.setRisks))
       }
       if( data.employeeHome){

              promises.push(fetchProjects(parsedUser, data.setProjects, undefined));
      promises.push( fetchRisk({employeeEmail:parsedUser.email},data.setRisks))
 promises.push(  fetchCheckIns(
  { employeeEmail: parsedUser.email }, 
  data.setCheckIns,                

))
       }
       if(data.clientHome){
             promises.push(fetchFeedback(undefined, parsedUser.id, data.setFeedbacks))
 promises.push(fetchProjects(parsedUser, data.setProjects, setIsLoading))
       }
       if(data.employeeCheckInGet){
        
     //  Promise.all([
       promises.push( fetchProjects(parsedUser, data.setProjects,undefined))
      
promises.push(fetchCheckIns(
  { employeeEmail: parsedUser.email }, 
  data.setCheckIns,                  
  setIsLoading                 
))

 //     ]);
       }
       if(data.clientProject){
       promises.push( fetchProjects(parsedUser,data.setProjects,setIsLoading))
       }
       if(data.employeeProjects){
            promises.push( fetchProjects(parsedUser, data.setProjects, undefined))
          promises.push(fetchRisk(undefined, data.setRisks))
          promises.push(fetchFeedback(undefined, undefined, data.setFeedbacks))
         promises.push( fetchCheckIns({}, data.setCheckIns, undefined))

      // promises.push(  fetchProjects(parsedUser, data.setProjects, setIsLoading))
       }
       if(data.clientProjectDetails){
        setIsLoading(false)
       }
       if(data.employeeCheckIn){
        
       }
       if(data.userAdmin)
          promises.push(  fetchEmployee(parsedUser,data.setProjects,data.setEmployeeList).finally(() => setIsLoading(false)))
       if(data.projectDetails || data.projectDetails){
        setIsLoading(false);
       }
       if(data.homeAdmin){
        promises.push(fetchProjects(parsedUser,data.setProjects,setIsLoading))
       }
       if(data.adminRisk){
             promises.push( fetchProjects(parsedUser,data.setProjects,undefined))
       promises.push( fetchRisk(undefined,data.setRisks))
       }
       if(data.clientFeedback){
        
      promises.push( fetchProjects(parsedUser, data.setProjects, setIsLoading))
       promises.push(fetchFeedback(undefined,parsedUser.id,data.setFeedbacks))
       }

 if(data.setProjects && data.setRisks && data.setRisks && data.setCheckIns && data.setFeedbacks){
      // Promise.all([
        promises.push( fetchProjects(parsedUser, data.setProjects, undefined))
          promises.push(fetchRisk(undefined, data.setRisks))
          promises.push(fetchFeedback(undefined, undefined, data.setFeedbacks))
         promises.push( fetchCheckIns({}, data.setCheckIns, undefined))
      // ]).finally(() => setIsLoading(false));

      }

      if(data.projectDetails){
       // fetchProjects()
      }

        
        if (promises.length > 0) {
          await Promise.all(promises);
        }

      } catch (error) {
        console.error("useProtectedRoute error:", error);
        router.push("/auth/login");
      } finally {
        // Only now mark loading as false
        setIsLoading && setIsLoading(false);
      }
    };

    init();
  }, [router]);
}