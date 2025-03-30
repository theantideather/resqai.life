'use client'

import { SplineScene } from "./spline";
import { Card } from "./card";
import { Spotlight } from "./spotlight";
 
export function SplineSceneBasic() {
  return (
    <Card className="w-full h-[500px] bg-black relative overflow-hidden border-0 rounded-none shadow-none">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="gold"
        size={400}
      />
      
      <div className="flex h-full">
        {/* Left content */}
        <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#c7af8c] to-[#8a7653]">
            ResQ.ai Assistant
          </h1>
          <p className="mt-4 text-gray-300 max-w-lg">
            Our AI-powered emergency response system features a robotic interface
            designed to provide critical assistance during medical emergencies.
          </p>
        </div>

        {/* Right content */}
        <div className="flex-1 relative">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full transform scale-110"
          />
        </div>
      </div>
    </Card>
  )
} 