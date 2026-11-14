import {useEffect, useRef} from 'react';
import {onFrame} from '../lib/scroll';

export function WaterCausticsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    // Floating caustic nodes
    const nodes = Array.from({length: 22}, () => ({
      x: 0.4 + Math.random() * 0.6,
      y: Math.random(),
      r: 60 + Math.random() * 90,
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 0.6,
    }));

    return onFrame((time) => {
      if (!width || !height) return;
      ctx.clearRect(0, 0, width, height);
      const s = time / 1000;

      nodes.forEach((n) => {
        const cx = (n.x + Math.sin(s * n.speed + n.phase) * 0.05) * width;
        const cy = (n.y + Math.cos(s * n.speed * 0.7 + n.phase) * 0.06) * height;
        const radius = n.r * (1 + Math.sin(s * 1.5 + n.phase) * 0.2);

        const rad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        rad.addColorStop(0, 'rgba(56, 189, 248, 0.14)');
        rad.addColorStop(0.5, 'rgba(20, 70, 255, 0.05)');
        rad.addColorStop(1, 'transparent');

        ctx.fillStyle = rad;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      });
    });
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 size-full mix-blend-screen" />;
}
