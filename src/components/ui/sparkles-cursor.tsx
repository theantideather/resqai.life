// @ts-nocheck
import { useEffect, useRef } from 'react';

export function SparklesCursor() {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    console.log('[SparklesCursor] Component mounted');
    
    // Set canvas dimensions
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    // Get canvas context
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Particles array
    const particles = [];
    const particleCount = 20;
    const colors = ['#8be9fd', '#50fa7b', '#ff79c6', '#bd93f9', '#f1fa8c'];
    
    let mouseX = 0;
    let mouseY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    
    // Mouse movement handler
    const handleMouseMove = (e) => {
      lastMouseX = mouseX;
      lastMouseY = mouseY;
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Create particles based on mouse movement
      const distance = Math.sqrt(
        Math.pow(mouseX - lastMouseX, 2) + 
        Math.pow(mouseY - lastMouseY, 2)
      );
      
      // Only create particles if mouse has moved significantly
      if (distance > 5) {
        for (let i = 0; i < Math.min(distance / 10, 5); i++) {
          createParticle();
        }
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Particle object
    class Particle {
      constructor() {
        this.x = mouseX;
        this.y = mouseY;
        this.size = Math.random() * 15 + 5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.life = 100;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size = Math.max(0, this.size - 0.2);
        this.life -= 1;
      }
      
      draw() {
        ctx.globalAlpha = this.life / 100;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
    
    function createParticle() {
      if (particles.length < 100) { // Limit maximum particles
        particles.push(new Particle());
      }
    }
    
    // Animation loop
    let animationFrameId;
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        // Remove dead particles
        if (particles[i].life <= 0 || particles[i].size <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    }
    
    animate();
    
    // Cleanup
    return () => {
      console.log('[SparklesCursor] Component unmounting');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-50 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
} 