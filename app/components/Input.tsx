"use client";

import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
}

export function Input({
  label,
  error,
  helperText,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`
          w-full px-4 py-3 rounded-lg 
          text-gray-800 placeholder-gray-400 
          bg-gradient-to-br from-white to-gray-50
          border border-gray-300
          shadow-sm
          focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400
          disabled:bg-gray-100 disabled:cursor-not-allowed
          transition-all duration-200 ease-in-out
          ${error ? "border-red-500 focus:ring-red-400" : ""}
          ${className}
        `}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1 font-medium">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-gray-500 text-sm mt-1">{helperText}</p>
      )}
    </div>
  );
}
