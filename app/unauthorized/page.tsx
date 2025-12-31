"use client";

import { Button } from "@/app/components";
import Link from "next/link";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-600 to-red-800 p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">403</h1>
        <h2 className="text-3xl font-semibold text-red-100 mb-2">
          Unauthorized
        </h2>
        <p className="text-red-100 text-lg mb-8 max-w-md mx-auto">
          You don't have permission to access this page. Please contact your administrator if you believe this is an error.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button variant="secondary" size="lg">
              Go Home
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button size="lg">Sign In Again</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
