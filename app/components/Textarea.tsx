"use client";

import React, { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({
  label,
  error,
  className = "",
  ...props
}: TextareaProps) {
  return (
    <div className="w-full space-y-1">
      {label && (
        <label className="block text-sm font-semibold text-gray-800">
          {label}
        </label>
      )}

      <div className="relative">
        <textarea
          {...props}
          className={`
            w-full rounded-xl px-4 py-3
            bg-white
            text-gray-900 placeholder-gray-400
            border
            shadow-sm
            transition-all duration-200 ease-out
            resize-vertical

            focus:outline-none
            focus:ring-4
            focus:ring-blue-500/20
            focus:border-blue-500

            disabled:bg-gray-100
            disabled:cursor-not-allowed

            ${
              error
                ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                : "border-gray-300 hover:border-gray-400"
            }

            ${className}
          `}
        />

        {/* subtle inner highlight */}
        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/60" />
      </div>

      {error && (
        <p className="text-sm text-red-600 font-medium">
          {error}
        </p>
      )}
    </div>
  );
}
