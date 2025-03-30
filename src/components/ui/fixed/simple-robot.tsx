import React from 'react';
import { Cpu } from 'lucide-react';

// A completely static robot display that doesn't use Spline
export function StaticRobotScene({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-[#000913] to-[#101520] ${className}`}>
      <div className="flex flex-col items-center">
        <div className="relative" style={{ animation: 'float 6s ease-in-out infinite' }}>
          <div className="w-32 h-32 rounded-full bg-[#101520] border border-[#c7af8c]/20 flex items-center justify-center">
            <Cpu className="text-[#c7af8c] w-14 h-14" />
          </div>
          <div className="absolute -inset-1 rounded-full blur-md bg-[#c7af8c]/10 -z-10"></div>
        </div>
        <div className="mt-6 text-center">
          <div className="text-[#c7af8c] text-lg font-semibold mb-2">ResQ AI Assistant</div>
          <div className="text-gray-400 text-sm max-w-[240px]">Emergency response system ready to assist</div>
        </div>
      </div>
    </div>
  );
} 