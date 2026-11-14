import {useEffect, useRef} from 'react';
import {onFrame} from '../lib/scroll';

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  alpha: number;
  state: 'pollutant' | 'floc' | 'pure';
  charge: number;
}

export function ElectroCoagulationSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      if (!containerRef.current) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(containerRef.current!);

    // Spawn 70 particles representing dirty feed water passing between anodes/cathodes
    const particles: Particle[] = Array.from({length: 65}, () => ({
      x: Math.random() * 0.25, // start in dirty feed zone (left 25%)
      y: 0.15 + Math.random() * 0.7,
      r: 2 + Math.random() * 2.5,
      vx: 0.04 + Math.random() * 0.03,
      vy: (Math.random() - 0.5) * 0.02,
      alpha: 0.6 + Math.random() * 0.4,
      state: 'pollutant',
      charge: Math.random() > 0.5 ? 1 : -1,
    }));

    let lastT = 0;

    return onFrame((time) => {
      const dt = lastT ? Math.min(0.05, (time - lastT) / 1000) : 1 / 60;
      lastT = time;
      if (!width || !height) return;

      ctx.clearRect(0, 0, width, height);

      const sec = time / 1000;
      const electrodeX1 = width * 0.38;
      const electrodeX2 = width * 0.58;

      // 1. Draw Electric Field & Reaction Zone
      const grad = ctx.createLinearGradient(electrodeX1, 0, electrodeX2, 0);
      grad.addColorStop(0, 'rgba(20, 70, 255, 0.04)');
      grad.addColorStop(0.5, 'rgba(56, 189, 248, 0.15)');
      grad.addColorStop(1, 'rgba(20, 70, 255, 0.04)');
      ctx.fillStyle = grad;
      ctx.fillRect(electrodeX1, height * 0.1, electrodeX2 - electrodeX1, height * 0.8);

      // 2. Draw Electrodes (Anode (+) and Cathode (-))
      const pulse = Math.sin(sec * 4) * 0.25 + 0.75;

      // Left Electrode (+)
      ctx.fillStyle = '#0e2f6b';
      ctx.fillRect(electrodeX1 - 5, height * 0.12, 10, height * 0.76);
      ctx.fillStyle = 'rgba(56, 189, 248, ' + (0.5 * pulse) + ')';
      ctx.fillRect(electrodeX1 - 2, height * 0.12, 4, height * 0.76);

      // Right Electrode (-)
      ctx.fillStyle = '#0e2f6b';
      ctx.fillRect(electrodeX2 - 5, height * 0.12, 10, height * 0.76);
      ctx.fillStyle = 'rgba(20, 70, 255, ' + (0.6 * pulse) + ')';
      ctx.fillRect(electrodeX2 - 2, height * 0.12, 4, height * 0.76);

      // Sparkle / Ion emission lines between plates
      ctx.strokeStyle = `rgba(56, 189, 248, ${0.15 + Math.sin(sec * 12) * 0.1})`;
      ctx.lineWidth = 1;
      for (let i = 0; i < 6; i++) {
        const yLine = height * (0.2 + i * 0.11 + Math.sin(sec * 3 + i) * 0.02);
        ctx.beginPath();
        ctx.moveTo(electrodeX1, yLine);
        ctx.lineTo(electrodeX2, yLine + Math.cos(sec * 5 + i) * 8);
        ctx.stroke();
      }

      // 3. Update & Render Particles
      particles.forEach((p) => {
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // In reaction zone (0.35 to 0.6)
        if (p.x > 0.35 && p.x < 0.62) {
          p.vy += (p.charge * 0.03 - 0.015) * dt;
          if (p.state === 'pollutant') {
            p.state = 'floc';
            p.r = Math.min(5.5, p.r * 1.5); // coalesce / coagulate
          }
        } else if (p.x >= 0.62) {
          // Treated & separated zone
          if (p.state === 'floc') {
            p.state = 'pure';
          }
        }

        // Keep inside vertical bounds
        if (p.y < 0.12) {
          p.y = 0.12;
          p.vy = Math.abs(p.vy);
        }
        if (p.y > 0.86) {
          p.y = 0.86;
          p.vy = -Math.abs(p.vy);
        }

        // Reset particle once it flows off right edge
        if (p.x > 1.02) {
          p.x = -0.02;
          p.y = 0.15 + Math.random() * 0.7;
          p.r = 2 + Math.random() * 2.5;
          p.state = 'pollutant';
        }

        // Draw particle
        ctx.beginPath();
        const px = p.x * width;
        const py = p.y * height;
        ctx.arc(px, py, p.r, 0, Math.PI * 2);

        if (p.state === 'pollutant') {
          // Raw suspended turbidity / heavy metal
          ctx.fillStyle = `rgba(148, 163, 184, ${p.alpha * 0.85})`;
        } else if (p.state === 'floc') {
          // Coagulated floc under electric pulse
          ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`;
          ctx.shadowColor = 'rgba(56, 189, 248, 0.6)';
          ctx.shadowBlur = 6;
        } else {
          // Purified water flow
          ctx.fillStyle = `rgba(20, 70, 255, ${p.alpha * 0.6})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Labels on simulation
      ctx.font = '10px "DM Mono", monospace';
      ctx.fillStyle = 'rgba(10, 22, 40, 0.6)';
      ctx.fillText('RAW INFLUENT', width * 0.05, height * 0.08);
      ctx.fillStyle = '#1446ff';
      ctx.fillText('ELECTRO-COAGULATION ZONE', electrodeX1, height * 0.08);
      ctx.fillStyle = '#0ea5e9';
      ctx.fillText('PURIFIED OUTPUT', width * 0.76, height * 0.08);
    });
  }, []);

  return (
    <div ref={containerRef} className="relative h-64 w-full overflow-hidden rounded-2xl bg-white/70 p-4 shadow-xl ring-1 ring-ink/10 backdrop-blur-md sm:h-72">
      <div className="absolute top-3 left-4 flex items-center gap-2 font-mono text-[0.625rem] tracking-wider text-ink/70 uppercase">
        <span className="size-2 animate-ping rounded-full bg-electric" />
        Interactive Reaction Sim · Electro-Coagulation Chamber
      </div>
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
}
