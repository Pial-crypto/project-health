"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "./Navigation";

export function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Check if current page is auth page
  const isAuthPage = pathname === "/auth/login" || pathname === "/auth/signup";
  console.log("isAuthPage:", isAuthPage);

  return (
    <>
      {!isAuthPage && <Navigation />}
      <main
        className={`
          min-h-screen 
          bg-gray-50
          transition-all duration-300
          ${!isAuthPage ? "lg:ml-64" : ""}
        `}
      >
        {isAuthPage ? (
          // Auth pages - full width
          <div className="flex items-center justify-center min-h-screen">
            {children}
          </div>
        ) : (
          // Regular pages - centered wrapper
          <div className="max-w-7xl mx-auto p-6 lg:p-10 transition-all duration-300">
            {children}
          </div>
        )}
      </main>
    </>
  );
}
