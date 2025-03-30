import React from 'react';
import { StaticRobotScene } from './simple-robot';
import { Spotlight } from '../spotlight';
import { Card } from '../card';

export function RobotCard() {
  return (
    <Card className="w-full h-[260px] bg-[#000913] relative overflow-hidden border-[#c7af8c]/20">
      {/* Add decorative elements */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="gold"
        size={300}
      />
      
      <div className="flex h-full">
        {/* Left content */}
        <div className="flex-1 p-4 relative z-10 flex flex-col justify-center">
          <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#c7af8c] to-[#8a7653]">
            ResQ.ai Assistant
          </h1>
          <p className="mt-2 text-gray-400 text-sm max-w-[200px]">
            AI-powered emergency response system for critical medical situations.
          </p>
        </div>

        {/* Right content - Static robot scene */}
        <div className="flex-1 relative">
          <StaticRobotScene className="w-full h-full transform scale-110" />
        </div>
      </div>
    </Card>
  );
} 