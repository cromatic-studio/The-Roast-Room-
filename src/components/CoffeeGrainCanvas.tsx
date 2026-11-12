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
  creaseColor: string;
  shape: 'bean' | 'grain' | 'circle';
  rotation: number;
  rotationSpeed: number;
}

export const CoffeeGrainCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const updateCanvasSize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    updateCanvasSize();

    // Mouse & Touch interaction state
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 155, // Influence radius for cursor repulsion
      isActive: false,
    };

    // Palette: Artisanal coffee tones, roasted bean pigments, terracotta chaff & forest accents
    const palette = [
      { fill: '54, 32, 22', crease: '28, 15, 9', weight: 35 },     // Roasted Bean Brown
      { fill: '40, 24, 18', crease: '18, 10, 6', weight: 25 },     // Dark Espresso
      { fill: '27, 61, 60', crease: '12, 35, 34', weight: 20 },    // Deep Forest Roastery Green
      { fill: '217, 95, 45', crease: '150, 55, 22', weight: 12 },  // Warm Terracotta Chaff
      { fill: '168, 120, 78', crease: '110, 75, 42', weight: 8 },   // Golden Crema Bean
    ];

    const pickColor = () => {
      const total = palette.reduce((acc, p) => acc + p.weight, 0);
      let r = Math.random() * total;
      for (const item of palette) {
        if (r < item.weight) return item;
        r -= item.weight;
      }
      return palette[0];
    };

    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      // Elegant density: approx 1 bean/grain per 1600px^2 for a premium artisanal atmosphere
      const count = Math.min(Math.floor((width * height) / 1600), 850);

      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const { fill, crease } = pickColor();
        const randShape = Math.random();

        let shape: 'bean' | 'grain' | 'circle';
        let radius: number;
        let alpha: number;

        if (randShape < 0.38) {
          // Miniature roasted coffee bean with signature center crease
          shape = 'bean';
          radius = Math.random() * 2.2 + 2.0; // 2.0px - 4.2px
          alpha = Math.random() * 0.22 + 0.16; // 0.16 - 0.38
        } else if (randShape < 0.78) {
          // Milled coffee grain flake
          shape = 'grain';
          radius = Math.random() * 1.5 + 1.1; // 1.1px - 2.6px
          alpha = Math.random() * 0.20 + 0.14;
        } else {
          // Fine espresso micro-fleck / dusting
          shape = 'circle';
          radius = Math.random() * 0.9 + 0.6;
          alpha = Math.random() * 0.26 + 0.18;
        }

        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: 0,
          vy: 0,
          radius,
          alpha,
          color: `rgba(${fill}, ${alpha})`,
          creaseColor: `rgba(${crease}, ${Math.min(alpha * 1.5, 0.65)})`,
          shape,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
        });
      }
    };

    initParticles();

    // Event listeners
    const handleResize = () => {
      updateCanvasSize();
      initParticles();
    };

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

    // Animation loop: Soft physical cursor repulsion & gentle spring rebound
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 1. Distance to cursor
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);

        // 2. Repulsion physics: scatter away from cursor with smooth cubic easing
        if (mouse.isActive && dist < mouse.radius && dist > 0) {
          const normDist = 1 - dist / mouse.radius;
          const force = normDist * normDist * 8.2;
          const angle = Math.atan2(dy, dx);

          p.vx -= Math.cos(angle) * force;
          p.vy -= Math.sin(angle) * force;
          // Angular impulse from cursor motion
          p.rotation += (Math.cos(angle) - Math.sin(angle)) * 0.04;
        }

        // 3. Hooke's spring return towards resting origin position
        const homeDx = p.originX - p.x;
        const homeDy = p.originY - p.y;
        p.vx += homeDx * 0.038;
        p.vy += homeDy * 0.038;

        // 4. Fluid friction damping
        p.vx *= 0.86;
        p.vy *= 0.86;

        p.x += p.vx;
        p.y += p.vy;

        // Subtle ambient idle breathing rotation
        p.rotation += p.rotationSpeed;

        // 5. Draw Particle according to its shape
        if (p.shape === 'bean') {
          // Realistic small coffee bean with curved center slit
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation + (p.vx + p.vy) * 0.06);

          const rx = p.radius * 1.45;
          const ry = p.radius * 0.95;

          // Bean body
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
          ctx.fill();

          // Organic curved coffee bean split crease
          ctx.strokeStyle = p.creaseColor;
          ctx.lineWidth = Math.max(0.65, p.radius * 0.22);
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(-rx * 0.72, 0);
          ctx.bezierCurveTo(-rx * 0.22, ry * 0.24, rx * 0.22, -ry * 0.24, rx * 0.72, 0);
          ctx.stroke();

          ctx.restore();
        } else if (p.shape === 'grain') {
          // Organic milled coffee flake
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation + (p.vx + p.vy) * 0.04);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.radius * 1.35, p.radius * 0.85, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          // Fine round dusting fleck
          ctx.fillStyle = p.color;
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
