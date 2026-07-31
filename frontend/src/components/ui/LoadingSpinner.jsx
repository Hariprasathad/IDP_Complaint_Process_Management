import React from 'react';

/**
 * Loading indicator with jumping dots animation.
 * Used when fetching data from API (e.g., countries loading).
 * 
 * @param {string} message - Loading text to display (default: "Loading...")
 */
export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="w-full h-[46px] bg-white border border-[#d8d8d8] rounded-[6px] flex items-center gap-[10px] px-[14px]">
      {/* Jumping dots */}
      <div className="flex items-end gap-[4px] h-[12px]">
        <span className="w-[5px] h-[5px] rounded-full bg-[#F57C00] animate-[jump_0.9s_infinite_ease-in-out]" />
        <span className="w-[5px] h-[5px] rounded-full bg-[#4CAF50] animate-[jump_0.9s_infinite_ease-in-out_0.15s]" />
        <span className="w-[5px] h-[5px] rounded-full bg-[#1E88E5] animate-[jump_0.9s_infinite_ease-in-out_0.3s]" />
      </div>
      {/* Loading text */}
      <span className="text-[14px] text-[#666]">{message}</span>
    </div>
  );
}
