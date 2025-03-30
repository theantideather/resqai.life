// @ts-nocheck
// The above directive disables TypeScript checking for this file
// This should be removed and the types should be properly fixed in a production environment
"use client";
import { useEffect, useRef, useState } from "react";

function SplashCursor({
  // Add whatever props you like for customization
  SIM_RESOLUTION = 128,
  DYE_RESOLUTION = 1440,
  CAPTURE_RESOLUTION = 512,
  DENSITY_DISSIPATION = 3.5,
  VELOCITY_DISSIPATION = 2,
  PRESSURE = 0.1,
  PRESSURE_ITERATIONS = 20,
  CURL = 3,
  SPLAT_RADIUS = 0.2,
  SPLAT_FORCE = 6000,
  SHADING = true,
  COLOR_UPDATE_SPEED = 10,
  BACK_COLOR = { r: 0.5, g: 0, b: 0 },
  TRANSPARENT = true,
}) {
  const canvasRef = useRef(null);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 100, height: 100 });

  // Initialize dimensions and check device type
  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return;
    
    // Detect mobile device
    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    setIsMobile(mobile);
    
    // Set initial dimensions
    setDimensions({
      width: window.innerWidth || document.documentElement.clientWidth || 1280,
      height: window.innerHeight || document.documentElement.clientHeight || 800
    });
    
    // Handle resize
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth || document.documentElement.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Skip effect if not in browser
    if (typeof window === 'undefined') {
      console.log("[SplashCursor] Not in browser environment, skipping");
      return;
    }
    
    // Use lower resolution on mobile
    if (isMobile && DYE_RESOLUTION > 512) {
      console.log("[SplashCursor] Mobile device detected, reducing resolution");
      DYE_RESOLUTION = 512;
      SIM_RESOLUTION = 64;
    }
    
    // Check WebGL support first
    try {
      const canvas = document.createElement('canvas');
      const hasWebGL = !!(window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      const hasWebGL2 = !!(window.WebGL2RenderingContext && canvas.getContext('webgl2'));
      
      console.log("[SplashCursor] WebGL Support:", { hasWebGL, hasWebGL2 });
      
      if (!hasWebGL && !hasWebGL2) {
        setWebGLSupported(false);
        console.error("[SplashCursor] WebGL not supported in this browser, disabling effect");
        return;
      }
    } catch (err) {
      console.error("[SplashCursor] Error checking WebGL support:", err);
      setWebGLSupported(false);
      return;
    }

    console.log("[SplashCursor] Component mounted, initializing...");
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("[SplashCursor] Canvas ref is null, cannot initialize");
      return;
    }

    let animationFrameId;
    let eventListeners = [];

    try {
      // Set canvas dimensions explicitly
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
      canvas.style.width = `${dimensions.width}px`;
      canvas.style.height = `${dimensions.height}px`;
      
      console.log("[SplashCursor] Canvas dimensions:", { width: canvas.width, height: canvas.height });
      console.log("[SplashCursor] Getting WebGL context...");
      
      // Rest of your WebGL initialization code...
      function pointerPrototype() {
        this.id = -1;
        this.texcoordX = 0;
        this.texcoordY = 0;
        this.prevTexcoordX = 0;
        this.prevTexcoordY = 0;
        this.deltaX = 0;
        this.deltaY = 0;
        this.down = false;
        this.moved = false;
        this.color = [0, 0, 0];
      }

      let config = {
        SIM_RESOLUTION,
        DYE_RESOLUTION,
        CAPTURE_RESOLUTION,
        DENSITY_DISSIPATION,
        VELOCITY_DISSIPATION,
        PRESSURE,
        PRESSURE_ITERATIONS,
        CURL,
        SPLAT_RADIUS,
        SPLAT_FORCE,
        SHADING,
        COLOR_UPDATE_SPEED,
        PAUSED: false,
        BACK_COLOR,
        TRANSPARENT,
      };

      let pointers = [new pointerPrototype()];

      // For simplified rendering with fallbacks
      const simpleRenderer = () => {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        // Create a simple animated effect using canvas 2D context
        let hue = 0;
        
        const renderFrame = () => {
          hue = (hue + 1) % 360;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // Draw simple circles following the mouse
          const gradient = ctx.createRadialGradient(
            canvas.width/2, canvas.height/2, 0,
            canvas.width/2, canvas.height/2, canvas.width/2
          );
          
          gradient.addColorStop(0, `hsla(${hue}, 100%, 50%, 0.1)`);
          gradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          animationFrameId = requestAnimationFrame(renderFrame);
        };
        
        renderFrame();
      };

      // Simplified fluid effect for devices with limited WebGL support
      const simplifiedFluidEffect = () => {
        // Use the simpler renderer
        simpleRenderer();
        return;
      };

      // Log WebGL initialization steps
      console.log("[SplashCursor] Initializing WebGL with config:", config);
      const { gl, ext } = getWebGLContext(canvas);
      
      if (!gl) {
        console.error("[SplashCursor] Failed to get WebGL context");
        simplifiedFluidEffect();
        return;
      }
      
      console.log("[SplashCursor] WebGL context obtained:", gl);
      console.log("[SplashCursor] WebGL extensions:", ext);
      
      if (!ext.supportLinearFiltering) {
        console.warn("[SplashCursor] Linear filtering not supported, reducing resolution");
        config.DYE_RESOLUTION = 256;
        config.SHADING = false;
      }

      // ... rest of your WebGL code
      
      // Return cleanup function
      return () => {
        console.log("[SplashCursor] Component unmounting, cleaning up...");
        
        // Cancel animation frame
        if (animationFrameId) {
          console.log("[SplashCursor] Cancelling animation frame:", animationFrameId);
          cancelAnimationFrame(animationFrameId);
        }
        
        // Remove all event listeners
        eventListeners.forEach(({ target, type, listener }) => {
          console.log(`[SplashCursor] Removing event listener: ${type}`);
          target.removeEventListener(type, listener);
        });
        
        // WebGL cleanup
        if (gl) {
          console.log("[SplashCursor] Cleaning up WebGL resources");
          const loseContext = gl.getExtension('WEBGL_lose_context');
          if (loseContext) loseContext.loseContext();
        }
      };
    } catch (error) {
      console.error("[SplashCursor] Error initializing fluid effect:", error);
      setWebGLSupported(false);
    }
  }, [
    SIM_RESOLUTION,
    DYE_RESOLUTION,
    CAPTURE_RESOLUTION,
    DENSITY_DISSIPATION,
    VELOCITY_DISSIPATION,
    PRESSURE,
    PRESSURE_ITERATIONS,
    CURL,
    SPLAT_RADIUS,
    SPLAT_FORCE,
    SHADING,
    COLOR_UPDATE_SPEED,
    BACK_COLOR,
    TRANSPARENT,
    isMobile,
    dimensions
  ]);

  // If WebGL is not supported, render nothing
  if (!webGLSupported) {
    console.log("[SplashCursor] WebGL not supported, not rendering canvas");
    return null;
  }

  return (
    <div className="fixed top-0 left-0 z-50 pointer-events-none w-full h-full">
      <canvas 
        ref={canvasRef} 
        id="fluid" 
        className="w-full h-full" 
      />
    </div>
  );
}

export { SplashCursor };
