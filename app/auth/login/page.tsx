"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button, Input, Alert, Card, CardBody } from "@/app/components";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // if(localStorage.getItem("user")){
  //   router.push("/");
  // }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/signIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setIsLoading(false);
        return;
      }


      // localStorage.setItem("token", data.token);
      // localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 overflow-hidden">
      <div className="w-full max-w-md mx-4 sm:mx-6">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-lg">
            <span className="text-2xl font-bold text-blue-600">HT</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Health Tracker
          </h1>
          <p className="text-blue-100 text-lg">
            Project Management System
          </p>
        </div>

        <Card className="shadow-2xl border-0 rounded-2xl">
          <CardBody className="px-8 py-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
              Welcome Back
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Sign in to your account to continue
            </p>

            {error && (
              <div className="mb-6">
                <Alert type="error" message={error} />
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full mt-2"
                size="lg"
              >
                Sign In
              </Button>
            </form>

            {/* <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-600 mb-3 text-center font-medium">
                Demo Credentials for Testing
              </p>

              <div className="space-y-2 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl">
                <p className="text-xs text-gray-700">
                  <span className="font-semibold text-gray-900">Admin:</span>{" "}
                  admin@example.com
                </p>
                <p className="text-xs text-gray-700">
                  <span className="font-semibold text-gray-900">Employee:</span>{" "}
                  emp@example.com
                </p>
                <p className="text-xs text-gray-700">
                  <span className="font-semibold text-gray-900">Client:</span>{" "}
                  client@example.com
                </p>
                <p className="text-xs text-gray-600 text-center mt-2 italic">
                  Password: password (all roles)
                </p>
              </div>
            </div> */}

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-700">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="text-blue-600 hover:text-blue-700 font-semibold underline"
                >
                  Create one now
                </Link>
              </p>
            </div>
          </CardBody>
        </Card>

        <p className="text-center text-blue-100 text-xs mt-8 opacity-75">
          © 2025 Health Tracker. All rights reserved.
        </p>
      </div>
    </div>
  );
}
