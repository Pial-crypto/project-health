"use client";

import React from "react";

interface TabsProps {
  tabs: Array<{
    label: string;
    value: string;
    content: React.ReactNode;
  }>;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export function Tabs({ tabs, defaultValue, onChange }: TabsProps) {
  const [activeTab, setActiveTab] = React.useState(
    defaultValue || tabs[0]?.value
  );

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    onChange?.(value);
  };

  return (
    <div>
      <div className="flex border-b border-gray-200 relative">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleTabChange(tab.value)}
            className={`
              px-4 py-2 font-medium text-sm transition-colors relative
              ${
                activeTab === tab.value
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }
            `}
          >
            {tab.label}
            <span
              className={`
                absolute bottom-0 left-0 w-full h-0.5 rounded-full
                transition-all duration-300
                ${
                  activeTab === tab.value
                    ? "bg-blue-600"
                    : "bg-transparent"
                }
              `}
            />
          </button>
        ))}
      </div>

      <div className="mt-4 text-gray-700 transition-opacity duration-300">
        {tabs.find((tab) => tab.value === activeTab)?.content}
      </div>
    </div>
  );
}
