"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { UserRole } from "@/lib/types";

export function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  // Fetch user on mount
  useEffect(() => {
    async function checkUser() {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (!res.ok) return router.push("/auth/login");

        const resData = await res.json();
        if (!resData.authenticated) return router.push("/auth/login");

        setUser(resData.user);
      } catch (err) {
        console.error("Error fetching user:", err);
        router.push("/auth/login");
      } finally {
        setIsLoadingUser(false);
      }
    }
    checkUser();
  }, [router]);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    router.push("/auth/login");
  };

  if (isLoadingUser) return null; // wait until user check completes
  if (!user) return null;
//console.log("user ",user)

  const role = (user.role || "")

  const getMenuItems = () => {
    switch (role) {
      case UserRole.ADMIN:
        return [
          { label: "Projects", href: "/admin/projects" },
          { label: "Users", href: "/admin/users" },
          { label: "Risks", href: "/admin/risks" },
          { label: "Activity", href: "/admin/activity" },
        ];
      case UserRole.EMPLOYEE:
        return [
          { label: "Dashboard", href: "/employee" },
          { label: "Projects", href: "/employee/projects" },
          { label: "Check-Ins", href: "/employee/check-ins" },
          { label: "Risks", href: "/employee/risks" },
        ];
      case UserRole.CLIENT:
        return [
          { label: "Dashboard", href: "/client" },
          { label: "Projects", href: "/client/projects" },
          { label: "Feedback", href: "/client/feedback" },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

const isActive = (href: string) => {
  if (role === UserRole.CLIENT && href === "/client") {
    return pathname === "/client"; 
  }
  if (role === UserRole.EMPLOYEE && href === "/employee") {
    return pathname === "/employee"; // exact match for employee dashboard
  }
  return pathname.startsWith(href); 
};




  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center px-4 z-40 shadow-md">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="flex-1 text-center font-bold text-lg text-blue-600">Health Tracker</h1>
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg animate-fadeIn">
              <div className="px-4 py-3 border-b border-gray-200">
                <p className="font-semibold text-gray-900">{user.name} </p>
                {role.toLowerCase() === "employee" && (
                  <p className="font-semibold text-gray-900">The username is based on your 1st project</p>
                )}
                {role.toLowerCase() === "client" && (
                  <p className="font-semibold text-gray-900">The username was generated randomly</p>
                )}
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-xs text-gray-500 uppercase mt-1">{role}</p>
              </div>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <aside className="hidden lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-64 lg:bg-gray-900 lg:text-white lg:overflow-y-auto lg:flex lg:flex-col shadow-lg">
        <div className="px-6 py-8 border-b border-gray-800">
          <h1 className="text-2xl font-bold text-blue-400">Health Tracker</h1>
          <p className="text-sm text-gray-400 mt-1">Project Management System</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2.5 rounded-lg transition-colors ${
                isActive(item.href)
                  ? "bg-blue-600 text-white font-semibold shadow-md"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="px-4 py-6 border-t border-gray-800">
          <div className="bg-gray-800 rounded-lg p-4 mb-4">
            <p className="text-sm font-semibold text-white">{user.name}</p>
                 {role.toLowerCase() === "employee" && (
                  <p className="font-semibold text-White-900">The username is based on your 1st project</p>
                )}
                {role.toLowerCase() === "client" && (
                  <p className="font-semibold text-White-900">The username was generated randomly</p>
                )}
            <p className="text-xs text-gray-400 mt-1">{user.email}</p>
            <p className="text-xs text-blue-400 uppercase font-semibold mt-2">{role}</p>
          </div>
          <button
            onClick={logout}
            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-16 left-0 right-0 bg-white border-b border-gray-200 z-30 lg:hidden shadow-md animate-fadeIn">
          <nav className="px-4 py-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-2.5 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? "bg-blue-600 text-white font-semibold shadow"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
