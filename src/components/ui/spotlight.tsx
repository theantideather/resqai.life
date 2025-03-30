// @ts-nocheck
// The above directive disables TypeScript checking for this file
import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useSpring, useTransform, SpringOptions } from 'framer-motion';
import { cn } from '../../lib/utils';

type SpotlightProps = {
  className?: string;
  size?: number;
  springOptions?: SpringOptions;
  fill?: string;
};

export function Spotlight({
  className,
  size = 200,
  springOptions = { bounce: 0 },
  fill = 'white'
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [parentElement, setParentElement] = useState<HTMLElement | null>(null);

  const mouseX = useSpring(0, springOptions);
  const mouseY = useSpring(0, springOptions);

  const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`);
  const spotlightTop = useTransform(mouseY, (y) => `${y - size / 2}px`);

  useEffect(() => {
    console.log("[Spotlight] Component mounted");
    if (containerRef.current) {
      const parent = containerRef.current.parentElement;
      if (parent) {
        console.log("[Spotlight] Parent element found:", parent);
        const computedStyle = window.getComputedStyle(parent);
        if (computedStyle.position === 'static') {
          console.log("[Spotlight] Setting parent position to relative from static");
          parent.style.position = 'relative';
        }
        console.log("[Spotlight] Setting parent overflow to hidden");
        parent.style.overflow = 'hidden';
        setParentElement(parent);
      } else {
        console.warn("[Spotlight] No parent element found");
      }
    } else {
      console.warn("[Spotlight] Container ref is null");
    }
    
    return () => {
      console.log("[Spotlight] Component unmounting");
    };
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!parentElement) {
        console.warn("[Spotlight] Mouse move called but no parent element set");
        return;
      }
      const { left, top } = parentElement.getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);
    },
    [mouseX, mouseY, parentElement]
  );

  useEffect(() => {
    if (!parentElement) {
      console.log("[Spotlight] Skipping event listener setup - no parent element");
      return;
    }

    console.log("[Spotlight] Setting up event listeners on parent:", parentElement);
    const handleEnter = () => {
      console.log("[Spotlight] Mouse entered");
      setIsHovered(true);
    };
    
    const handleLeave = () => {
      console.log("[Spotlight] Mouse left");
      setIsHovered(false);
    };

    parentElement.addEventListener('mousemove', handleMouseMove);
    parentElement.addEventListener('mouseenter', handleEnter);
    parentElement.addEventListener('mouseleave', handleLeave);

    return () => {
      console.log("[Spotlight] Removing event listeners from parent");
      parentElement.removeEventListener('mousemove', handleMouseMove);
      parentElement.removeEventListener('mouseenter', handleEnter);
      parentElement.removeEventListener('mouseleave', handleLeave);
    };
  }, [parentElement, handleMouseMove]);

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        'pointer-events-none absolute rounded-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops),transparent_80%)] blur-xl transition-opacity duration-200',
        fill === 'white' ? 'from-zinc-50 via-zinc-100 to-zinc-200' : 'from-[#c7af8c]/50 via-[#c7af8c]/30 to-[#c7af8c]/10',
        isHovered ? 'opacity-100' : 'opacity-0',
        className
      )}
      style={{
        width: size,
        height: size,
        left: spotlightLeft,
        top: spotlightTop,
      }}
    />
  );
} 