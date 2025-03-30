import React, { useEffect, useState } from 'react';
import { SplashCursor } from '../ui/splash-cursor';
import { SparklesCursor } from '../ui/sparkles-cursor';

interface SplashCursorWrapperProps {
  children: React.ReactNode;
}

export const SplashCursorWrapper: React.FC<SplashCursorWrapperProps> = ({ children }) => {
  const [hasWebGLError, setHasWebGLError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  // Check for WebGL support on mount
  useEffect(() => {
    console.log('[SplashCursorWrapper] Component mounted');
    
    // Check WebGL support
    const checkWebGLSupport = () => {
      if (typeof window === 'undefined') return false;
      
      try {
        const canvas = document.createElement('canvas');
        const hasWebGL = !!(window.WebGLRenderingContext && 
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        const hasWebGL2 = !!(window.WebGL2RenderingContext && canvas.getContext('webgl2'));
        
        console.log('[SplashCursorWrapper] WebGL Support:', { hasWebGL, hasWebGL2 });
        
        // Use fallback for mobile devices or when WebGL is not supported
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
        
        if (isMobile || (!hasWebGL && !hasWebGL2)) {
          setUseFallback(true);
        }
        
        return hasWebGL || hasWebGL2;
      } catch (err) {
        console.error('[SplashCursorWrapper] Error checking WebGL support:', err);
        setUseFallback(true);
        return false;
      }
    };
    
    checkWebGLSupport();
    
    // Add window error listener to catch WebGL errors
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes('WebGL') || 
          event.message.includes('INVALID_OPERATION') ||
          event.message.includes('GL_')) {
        console.error('[SplashCursorWrapper] WebGL error detected:', event.message);
        setHasWebGLError(true);
        setUseFallback(true);
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

  console.log('[SplashCursorWrapper] Rendering with children:', !!children, 'useFallback:', useFallback);

  // If there's a WebGL error or we should use fallback, use SparklesCursor
  if (hasWebGLError || useFallback) {
    console.log('[SplashCursorWrapper] Using SparklesCursor fallback');
    return (
      <>
        <SparklesCursor />
        {children}
      </>
    );
  }

  // Otherwise use the normal SplashCursor
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