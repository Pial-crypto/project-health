"use client";

import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <div
      className={`
        group relative overflow-hidden rounded-2xl
        bg-gradient-to-br from-white via-white to-indigo-50/60
        border border-indigo-100/60
        shadow-md
        transition-all duration-300 ease-out
        ${hover ? "hover:-translate-y-1 hover:shadow-2xl" : ""}
        ${className}
      `}
    >
      {/* TOP GLOW LINE */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-400/70 to-transparent" />

      {/* CORNER GLOW */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-indigo-400/10 blur-3xl opacity-0 group-hover:opacity-100 transition" />

      {/* LEFT ACCENT */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-indigo-400/60 via-blue-400/40 to-transparent opacity-0 group-hover:opacity-100 transition" />

      {children}
    </div>
  );
}


interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return (
    <div
      className={`
        px-6 py-4
        border-b border-indigo-100/60
        bg-gradient-to-r from-indigo-50/60 via-white to-white
        font-semibold text-gray-900
        ${className}
      `}
    >
      {children}
    </div>
  );
}

/* ---------------- BODY ---------------- */

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function CardBody({ children, className = "" }: CardBodyProps) {
  return (
    <div
      className={`
        relative px-6 py-5
        text-gray-700
        leading-relaxed
        ${className}
      `}
    >
      {/* soft inner wash */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-indigo-50/30 to-transparent opacity-60" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}



interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className = "" }: CardFooterProps) {
  return (
    <div
      className={`
        px-6 py-4
        border-t border-indigo-100/60
        bg-gradient-to-r from-white to-indigo-50/40
        ${className}
      `}
    >
      {children}
    </div>
  );
}
