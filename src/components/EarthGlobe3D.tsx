import {useEffect, useRef} from 'react';
import {onFrame} from '../lib/scroll';

interface Pin {
  label: string;
  sub: string;
  lat: number;
  lon: number;
  accent?: boolean;
}

const PINS: Pin[] = [
  {label: 'UK (HQ)', sub: '2010 · Founded', lat: 52.0, lon: -1.5},
  {label: 'Sharjah, UAE', sub: '2018 · BEE’AH', lat: 25.3, lon: 55.4},
  {label: 'Quito, Ecuador', sub: '2024 · Leachate', lat: -0.2, lon: -78.5, accent: true},
  {label: 'Santa Cruz', sub: '2026 · Expansion', lat: -17.8, lon: -63.2},
];

const DEG2RAD = Math.PI / 180;

function project(lat: number, lon: number, rotLon: number, tiltLat: number, r: number, cx: number, cy: number) {
  const phi = lat * DEG2RAD;
  const lam = (lon - rotLon) * DEG2RAD;
  const tilt = tiltLat * DEG2RAD;

  const x0 = Math.cos(phi) * Math.sin(lam);
  const y0 = Math.sin(phi);
  const z0 = Math.cos(phi) * Math.cos(lam);

  const y1 = y0 * Math.cos(tilt) - z0 * Math.sin(tilt);
  const z1 = y0 * Math.sin(tilt) + z0 * Math.cos(tilt);

  return {x: cx + x0 * r, y: cy - y1 * r, z: z1};
}

export function EarthGlobe3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rotRef = useRef(-35);
  const dragRef = useRef<{active: boolean; lastX: number}>({active: false, lastX: 0});

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let texData: Uint8ClampedArray | null = null;
    let texW = 0;
    let texH = 0;

    // Load photorealistic equirectangular Earth texture at high resolution
    const img = new Image();
    img.src = './media/slides/earth-texture.png';
    img.onload = () => {
      const off = document.createElement('canvas');
      texW = 2048;
      texH = 1024;
      off.width = texW;
      off.height = texH;
      const octx = off.getContext('2d');
      if (!octx) return;
      octx.drawImage(img, 0, 0, texW, texH);
      texData = octx.getImageData(0, 0, texW, texH).data;
    };

    const resize = () => {
      w = container.clientWidth;
      h = container.clientHeight;
      canvas.width = w;
      canvas.height = h;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    let lastT = 0;
    const tiltLat = 16;
    const cosTilt = Math.cos(tiltLat * DEG2RAD);
    const sinTilt = Math.sin(tiltLat * DEG2RAD);

    return onFrame((time) => {
      const dt = lastT ? Math.min(0.05, (time - lastT) / 1000) : 1 / 60;
      lastT = time;
      if (!w || !h) return;

      if (!dragRef.current.active) {
        rotRef.current += dt * 12;
      }

      ctx.clearRect(0, 0, w, h);

      const cx = w * 0.5;
      const cy = h * 0.5;
      const r = Math.min(w, h) * 0.45;
      const rot = rotRef.current;

      // Soft ambient drop shadow on the slide beneath the floating sphere
      const shadow = ctx.createRadialGradient(cx, cy + r * 0.96, r * 0.1, cx, cy + r * 0.96, r * 0.85);
      shadow.addColorStop(0, 'rgba(10, 22, 40, 0.22)');
      shadow.addColorStop(1, 'transparent');
      ctx.fillStyle = shadow;
      ctx.beginPath();
      ctx.ellipse(cx, cy + r * 0.96, r * 0.85, r * 0.18, 0, 0, Math.PI * 2);
      ctx.fill();

      // Render textured 3D sphere if texture is loaded
      if (texData) {
        const x0 = Math.max(0, Math.floor(cx - r));
        const y0 = Math.max(0, Math.floor(cy - r));
        const x1 = Math.min(w, Math.ceil(cx + r));
        const y1 = Math.min(h, Math.ceil(cy + r));
        const bw = x1 - x0;
        const bh = y1 - y0;

        if (bw > 0 && bh > 0) {
          const out = ctx.createImageData(bw, bh);
          const od = out.data;
          const r2 = r * r;
          const rotRad = rot * DEG2RAD;

          // Light direction (top-left-front)
          const lx = -0.45;
          const ly = 0.45;
          const lz = 0.77;

          for (let py = 0; py < bh; py++) {
            const dy = -(y0 + py - cy);
            const dy2 = dy * dy;
            for (let px = 0; px < bw; px++) {
              const dx = x0 + px - cx;
              const d2 = dx * dx + dy2;
              if (d2 > r2) continue;

              const dz = Math.sqrt(r2 - d2);
              const nx = dx / r;
              const ny = dy / r;
              const nz = dz / r;

              // Inverse tilt around X
              const uy = ny * cosTilt + nz * sinTilt;
              const uz = -ny * sinTilt + nz * cosTilt;
              const ux = nx;

              const lat = Math.asin(Math.max(-1, Math.min(1, uy)));
              const lon = Math.atan2(ux, uz) + rotRad;

              // Map to equirectangular UV
              let u = (lon / (2 * Math.PI) + 0.5) % 1;
              if (u < 0) u += 1;
              const v = 0.5 - lat / Math.PI;

              const tx = Math.min(texW - 1, Math.max(0, (u * texW) | 0));
              const ty = Math.min(texH - 1, Math.max(0, (v * texH) | 0));
              const ti = (ty * texW + tx) * 4;

              // Diffuse + ambient + subtle Fresnel rim
              const diff = Math.max(0, nx * lx + ny * ly + nz * lz);
              const light = 0.35 + diff * 0.78;
              const fresnel = Math.pow(1 - nz, 3) * 0.45;

              const oi = (py * bw + px) * 4;
              od[oi] = Math.min(255, texData[ti] * light + fresnel * 56);
              od[oi + 1] = Math.min(255, texData[ti + 1] * light + fresnel * 189);
              od[oi + 2] = Math.min(255, texData[ti + 2] * light + fresnel * 248);
              // Anti-aliased edge
              const edge = Math.min(1, (r - Math.sqrt(d2)) * 1.2);
              od[oi + 3] = (edge * 255) | 0;
            }
          }
          ctx.putImageData(out, x0, y0);
        }
      }

      // 3D Location Pins & Labels
      const pulse = (Math.sin(time / 400) + 1) * 0.5;
      PINS.forEach((pin) => {
        const p = project(pin.lat, pin.lon, rot, tiltLat, r, cx, cy);
        if (p.z < -0.05) return;
        const alpha = Math.min(1, Math.max(0, (p.z + 0.05) * 3));

        ctx.save();
        ctx.globalAlpha = alpha;

        // Pulse ring
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5 + pulse * 5, 0, Math.PI * 2);
        ctx.strokeStyle = pin.accent ? 'rgba(93, 255, 176, 0.85)' : 'rgba(20, 70, 255, 0.7)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Core pin dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = pin.accent ? '#5dffb0' : '#1446ff';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Label pill
        const lx = p.x + 10;
        const ly = p.y - 10;
        ctx.font = '600 10px "DM Mono", monospace';
        const tw = Math.max(ctx.measureText(pin.label).width, ctx.measureText(pin.sub).width) + 14;

        ctx.fillStyle = 'rgba(3, 13, 29, 0.86)';
        ctx.strokeStyle = pin.accent ? 'rgba(93, 255, 176, 0.6)' : 'rgba(56, 189, 248, 0.45)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(lx, ly - 14, tw, 26, 6);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.fillText(pin.label, lx + 7, ly - 3);
        ctx.font = '400 8.5px "DM Mono", monospace';
        ctx.fillStyle = pin.accent ? '#5dffb0' : '#9fe7ff';
        ctx.fillText(pin.sub, lx + 7, ly + 7);

        ctx.restore();
      });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      onPointerDown={(e) => {
        dragRef.current = {active: true, lastX: e.clientX};
      }}
      onPointerMove={(e) => {
        if (!dragRef.current.active) return;
        const dx = e.clientX - dragRef.current.lastX;
        dragRef.current.lastX = e.clientX;
        rotRef.current -= dx * 0.45;
      }}
      onPointerUp={() => {
        dragRef.current.active = false;
      }}
      onPointerLeave={() => {
        dragRef.current.active = false;
      }}
      title="Drag to rotate globe"
      className="relative h-[28rem] w-full cursor-grab active:cursor-grabbing sm:h-[36rem] lg:h-[40rem]"
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
}
