"use client";

import React from "react";

interface HealthScoreBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function HealthScoreBadge({
  score,
  size = "md",
  showLabel = true,
}: HealthScoreBadgeProps) {
  const getColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800 border-green-300";
    if (score >= 60) return "bg-yellow-100 text-yellow-800 border-yellow-300";
    return "bg-red-100 text-red-800 border-red-300";
  };

  const getStatus = (score: number) => {
    if (score >= 80) return "On Track";
    if (score >= 60) return "At Risk";
    return "Critical";
  };

  const sizeStyles = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2",
  };

  return (
    <div
      className={`border rounded-full font-semibold inline-flex items-center gap-2 ${getColor(
        score
      )} ${sizeStyles[size]}`}
    >
      <span className="font-bold">{score}</span>
      {showLabel && <span>{getStatus(score)}</span>}
    </div>
  );
}
