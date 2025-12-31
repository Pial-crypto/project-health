"use client";

import { Button } from "@/app/components";
import { useProtectedRoute } from "@/lib/hooks/useProtectedRoute";
import { Skeleton } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

export default function NotFound() {
  const [user,setUser]=useState(null)
  const[isLoading,setIsLoading]=useState(true)
 // useProtectedRoute(setUser,{},"a")
  isLoading && <Skeleton></Skeleton>
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-600 to-gray-800 p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-100 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-300 text-lg mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button size="lg">Go Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
