"use client";

import React from "react";

interface LoadingOverlayProps {
  isLoading: boolean; // Điều kiện để hiển thị overlay
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  if (!isLoading) return null; // Không hiển thị nếu isLoading = false

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-[9999]">
      <div className="flex flex-col items-center animate-fade-in">
        <div className="relative">
          {/* Spinner */}
          <svg
            className="h-24 w-24 animate-spin text-blue-500"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              className="opacity-25"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              className="opacity-75"
              strokeDasharray="283"
              strokeDashoffset="75"
            />
          </svg>
          {/* Inner glowing dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-6 w-6 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        {/* Loading text */}
        <span className="text-xl font-semibold text-white mt-6 tracking-wide">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default LoadingOverlay;
