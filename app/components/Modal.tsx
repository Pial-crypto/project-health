"use client";

import React, { useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  const sizeStyles = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`
          ${sizeStyles[size]} w-full bg-white rounded-2xl shadow-2xl overflow-hidden
          transform transition-transform duration-300 scale-95 animate-fadeIn
        `}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="
              text-gray-500 hover:text-gray-700 text-2xl leading-none
              transition-colors duration-200
              rounded-full hover:bg-gray-200 p-1
            "
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        <div className="px-6 py-5 text-gray-700">{children}</div>
      </div>
    </div>
  );
}
