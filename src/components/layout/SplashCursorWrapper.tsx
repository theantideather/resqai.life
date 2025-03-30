import React, { useEffect, useState } from 'react';
import { SplashCursor } from '../ui/splash-cursor';

interface SplashCursorWrapperProps {
  children: React.ReactNode;
}

export const SplashCursorWrapper: React.FC<SplashCursorWrapperProps> = ({ children }) => {
  const [hasErrored, setHasErrored] = useState(false);

  useEffect(() => {
    console.log('[SplashCursorWrapper] Component mounted');
    
    // Add window error listener to catch WebGL errors
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes('WebGL') || event.message.includes('INVALID_OPERATION')) {
        console.error('[SplashCursorWrapper] WebGL error detected:', event.message);
        setHasErrored(true);
      }
    };

    window.addEventListener('error', handleError);

    return () => {
      console.log('[SplashCursorWrapper] Component unmounting');
      window.removeEventListener('error', handleError);
    };
  }, []);

  useEffect(() => {
    console.log('[SplashCursorWrapper] Children updated:', !!children);
  }, [children]);

  console.log('[SplashCursorWrapper] Rendering with children:', !!children);

  // If there's an error, just render the children without the SplashCursor
  if (hasErrored) {
    console.log('[SplashCursorWrapper] Rendering without SplashCursor due to error');
    return <>{children}</>;
  }

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