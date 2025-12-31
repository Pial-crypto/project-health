"use client";

import React from "react";
import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
  icon?: React.ReactNode;
}

export function EmptyState({ title, description, action, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {icon && (
        <div className="text-indigo-400 text-8xl mb-6 animate-bounce">
          {icon}
        </div>
      )}
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
        {description}
      </p>
      {action && (
        <Link
          href={action.href}
          className="
            relative inline-flex items-center justify-center px-6 py-3
            bg-gradient-to-r from-blue-500 to-indigo-500 text-white
            rounded-xl font-medium shadow-md
            transition-all duration-300 ease-out
            hover:-translate-y-1 hover:shadow-xl
            active:scale-[0.97]
          "
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
