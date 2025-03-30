import React, { useState, useEffect, Suspense } from 'react';
import { Cpu } from 'lucide-react';

// Create a better error boundary specifically for Spline
class SplineErrorBoundary extends React.Component<{
  children: React.ReactNode;
  fallback: React.ReactNode;
}, {
  hasError: boolean;
}> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    console.error("Spline component error:", error);
    console.error("Error info:", info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Simple loading component
const LoadingIndicator = ({ className = '' }: { className?: string }) => (
  <div className={`w-full h-full flex items-center justify-center ${className}`}>
    <div className="loader">Loading...</div>
  </div>
);

// Fallback component when Spline fails
const FallbackComponent = ({ className = '' }: { className?: string }) => (
  <div className={`${className} w-full h-full flex items-center justify-center bg-gradient-to-br from-[#000913] to-[#101520]`}>
    <div className="flex flex-col items-center">
      <div className="relative animate-pulse">
        <div className="w-24 h-24 rounded-full bg-[#101520] border border-[#c7af8c]/20 flex items-center justify-center">
          <Cpu className="text-[#c7af8c] w-10 h-10" />
        </div>
        <div className="absolute -inset-1 rounded-full blur-md bg-[#c7af8c]/10 -z-10"></div>
      </div>
      <div className="mt-4 text-[#c7af8c] text-sm font-semibold">ResQ AI Assistant</div>
    </div>
  </div>
);

// The simplified SplineScene component
export function SplineScene({ scene, className = '' }: { scene: string; className?: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [SplineComponent, setSplineComponent] = useState<any>(null);
  const [loadError, setLoadError] = useState(false);

  // Log the scene URL for debugging
  console.log("Attempting to load Spline scene:", scene);

  // Load the Spline component dynamically
  useEffect(() => {
    let isMounted = true;
    
    const loadSpline = async () => {
      try {
        // Add a timeout to detect if loading takes too long
        const timeoutId = setTimeout(() => {
          if (!isLoaded && isMounted) {
            console.warn("Spline loading timeout - may be an issue with the scene URL");
            setLoadError(true);
          }
        }, 15000); // 15 seconds timeout
        
        // Dynamic import of Spline
        const SplineModule = await import('@splinetool/react-spline');
        
        // Only update state if component is still mounted
        if (isMounted) {
          clearTimeout(timeoutId);
          setSplineComponent(() => SplineModule.default);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Failed to load Spline module:", error);
          setLoadError(true);
        }
      }
    };
    
    loadSpline();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Handle successful load
  const handleLoad = () => {
    console.log("Spline scene loaded successfully!");
    setIsLoaded(true);
    setLoadError(false);
  };

  // Handle load error
  const handleError = (error: any) => {
    console.error("Spline scene failed to load:", error);
    setLoadError(true);
  };

  // Return fallback if there's a load error
  if (loadError) {
    return <FallbackComponent className={className} />;
  }

  // Return loading state if the component hasn't loaded yet
  if (!SplineComponent) {
    return <LoadingIndicator className={className} />;
  }

  // Render the Spline component with error boundary
  return (
    <SplineErrorBoundary fallback={<FallbackComponent className={className} />}>
      <div className={className}>
        <Suspense fallback={<LoadingIndicator className={className} />}>
          <SplineComponent
            scene={scene}
            onLoad={handleLoad}
            onError={handleError}
          />
        </Suspense>
      </div>
    </SplineErrorBoundary>
  );
}