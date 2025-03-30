import React, { Suspense, useState, useEffect } from "react";
import { SplineScene } from "./spline";
import { Card } from "./card";
import { Spotlight } from "./spotlight";
import { Cpu } from "lucide-react";

// Simple loading component
const LoadingComponent = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="loader">Loading 3D Scene...</div>
  </div>
);

// The main RobotScene component
export function RobotScene() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Log when component mounts for debugging
  useEffect(() => {
    console.log("RobotScene component mounted");
    return () => {
      console.log("RobotScene component unmounted");
    };
  }, []);
  
  // Define the scene URL - use a static URL to avoid potential problems
  const sceneUrl = "https://prod.spline.design/oo6IxFu8UHZnTVDv/scene.splinecode";
  
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

        {/* Right content - 3D scene */}
        <div className="flex-1 relative">
          <Suspense fallback={<LoadingComponent />}>
            <SplineScene 
              scene={sceneUrl}
              className="w-full h-full transform scale-110"
            />
          </Suspense>
        </div>
      </div>
    </Card>
  );
} 