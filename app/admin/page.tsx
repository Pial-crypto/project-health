"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProtectedRoute } from "@/lib/hooks/useProtectedRoute";
import { Skeleton } from "@mui/material";

export default function AdminDashboard() {
  const router = useRouter();
  const [user,setUser]=useState(null)
  const [isLoading,setIsLoading]=useState(true);
    
  isLoading && <Skeleton></Skeleton>
  useProtectedRoute(setUser,{},"admin",setIsLoading)

  useEffect(() => {
    // Redirect to /admin/projects after component mounts
    router.push("/admin/projects");
  }, [router]);


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-2">Redirecting...</h1>
        <p className="text-gray-600">You are being redirected to the projects page.</p>
      </div>
    </div>
  );
}
