import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
  shape: 'circle' | 'grain';
  rotation: number;
}

export const CoffeeGrainCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse state
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 140, // Repulsion influence radius
      isActive: false,
    };

    // Coffee palette tones for realistic freshly ground coffee particles
    const grainColors = [
      'rgba(27, 61, 60, ',   // Deep Forest Green tone
      'rgba(48, 30, 20, ',   // Dark Roasted bean brown
      'rgba(65, 42, 28, ',   // Medium Dark roast
      'rgba(217, 95, 45, ',  // Burnt orange micro chaff flecks
    ];

    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      // Density: approx 1 grain per ~1400px^2 for a tasteful, artisanal texture
      const count = Math.min(Math.floor((width * height) / 1400), 1000);

      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const colorBase = grainColors[Math.floor(Math.random() * grainColors.length)];
        const isChaff = colorBase.includes('217, 95, 45');
        const alpha = isChaff ? Math.random() * 0.2 + 0.15 : Math.random() * 0.35 + 0.18;
        const radius = isChaff ? Math.random() * 0.9 + 0.5 : Math.random() * 1.6 + 0.7;

        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: 0,
          vy: 0,
          radius,
          alpha,
          color: `${colorBase}${alpha})`,
          shape: Math.random() > 0.4 ? 'grain' : 'circle',
          rotation: Math.random() * Math.PI,
        });
      }
    };

    initParticles();

    // Resize handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    // Mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isActive = true;
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    // Touch support for mobile/tablets
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.isActive = true;
      }
    };

    const handleTouchEnd = () => {
      mouse.isActive = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // Animation loop with soft physics
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Distance to cursor
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);

        // Repulsion physics: push away from mouse
        if (mouse.isActive && dist < mouse.radius && dist > 0) {
          const force = (1 - dist / mouse.radius) * 7.5;
          const angle = Math.atan2(dy, dx);
          // Scatter sideways away from cursor
          p.vx -= Math.cos(angle) * force;
          p.vy -= Math.sin(angle) * force;
        }

        // Spring return towards origin
        const homeDx = p.originX - p.x;
        const homeDy = p.originY - p.y;
        p.vx += homeDx * 0.035;
        p.vy += homeDy * 0.035;

        // Friction / damping
        p.vx *= 0.86;
        p.vy *= 0.86;

        p.x += p.vx;
        p.y += p.vy;

        // Draw particle
        ctx.fillStyle = p.color;
        if (p.shape === 'grain') {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation + (p.vx + p.vy) * 0.05);
          ctx.beginPath();
          // Slightly oblong oval like milled coffee flake
          ctx.ellipse(0, 0, p.radius * 1.4, p.radius * 0.85, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      id="coffee-grain-canvas"
      ref={canvasRef}
      aria-hidden="true"
    />
  );
};
