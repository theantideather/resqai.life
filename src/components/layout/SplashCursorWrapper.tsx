import React, { useEffect } from 'react';
import { SplashCursor } from '../ui/splash-cursor';

interface SplashCursorWrapperProps {
  children: React.ReactNode;
}

export const SplashCursorWrapper: React.FC<SplashCursorWrapperProps> = ({ children }) => {
  useEffect(() => {
    console.log('[SplashCursorWrapper] Component mounted');
    return () => {
      console.log('[SplashCursorWrapper] Component unmounting');
    };
  }, []);

  useEffect(() => {
    console.log('[SplashCursorWrapper] Children updated:', !!children);
  }, [children]);

  console.log('[SplashCursorWrapper] Rendering with children:', !!children);

  return (
    <div className="relative">
      <SplashCursor 
        BACK_COLOR={{ r: 0, g: 0.91, b: 0.91 }} // Cyan color matching accent
        SIM_RESOLUTION={128}
        DYE_RESOLUTION={1024}
        SPLAT_RADIUS={0.15}
        CURL={30}
        SPLAT_FORCE={6000}
        SHADING={true}
        COLOR_UPDATE_SPEED={10}
        DENSITY_DISSIPATION={2.5}
      />
      {children}
    </div>
  );
}; 