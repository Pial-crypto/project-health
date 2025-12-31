"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success" | "warning";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  children,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center gap-2 " +
    "font-semibold rounded-xl " +
    "transition-all duration-300 ease-out " +
    "focus:outline-none focus:ring-4 focus:ring-offset-1 " +
    "disabled:opacity-70 disabled:cursor-not-allowed " +
    "active:scale-[0.97] " +
    "shadow-sm hover:shadow-lg";

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-blue-600 to-indigo-600 text-white " +
      "hover:from-blue-700 hover:to-indigo-700 " +
      "focus:ring-blue-500/30",

    secondary:
      "bg-white text-gray-800 border border-gray-300 " +
      "hover:bg-gray-50 hover:border-gray-400 " +
      "focus:ring-gray-400/30",

    danger:
      "bg-gradient-to-r from-red-600 to-rose-600 text-white " +
      "hover:from-red-700 hover:to-rose-700 " +
      "focus:ring-red-500/30",

    success:
      "bg-gradient-to-r from-green-600 to-emerald-600 text-white " +
      "hover:from-green-700 hover:to-emerald-700 " +
      "focus:ring-green-500/30",

    warning:
      "bg-gradient-to-r from-yellow-500 to-amber-500 text-white " +
      "hover:from-yellow-600 hover:to-amber-600 " +
      "focus:ring-yellow-400/30",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3 text-lg",
  };

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {/* soft hover glow */}
      <span className="absolute inset-0 rounded-xl opacity-0 hover:opacity-20 transition bg-white" />

      {isLoading ? (
        <span className="flex items-center gap-2 relative z-10">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          {children}
        </span>
      ) : (
        <span className="relative z-10 tracking-wide">
          {children}
        </span>
      )}
    </button>
  );
}
