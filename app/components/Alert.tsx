"use client";

import React from "react";

interface AlertProps {
  type: "success" | "error" | "warning" | "info";
  title?: string;
  message: string;
  onClose?: () => void;
}

export function Alert({ type, title, message, onClose }: AlertProps) {
  const styles = {
    success: {
      bg: "bg-green-50",
      border: "border-green-200",
      icon: "text-green-600",
      text: "text-green-800",
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-200",
      icon: "text-red-600",
      text: "text-red-800",
    },
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      icon: "text-yellow-600",
      text: "text-yellow-800",
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      icon: "text-blue-600",
      text: "text-blue-800",
    },
  };

  const style = styles[type];

  const icons = {
    success: "✓",
    error: "✕",
    warning: "!",
    info: "i",
  };

  return (
    <div
      className={`${style.bg} ${style.border} border rounded-lg p-4 flex gap-3 items-start`}
    >
      <div className={`${style.icon} text-xl font-bold flex-shrink-0`}>
        {icons[type]}
      </div>
      <div className="flex-1">
        {title && (
          <h3 className={`${style.text} font-semibold text-sm mb-1`}>
            {title}
          </h3>
        )}
        <p className={`${style.text} text-sm`}>{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={`${style.icon} flex-shrink-0 text-lg font-bold`}
        >
          ×
        </button>
      )}
    </div>
  );
}
