import {useEffect, useRef} from 'react';
import {onFrame} from '../lib/scroll';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let hover = false;
    let down = false;
    let visible = false;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        rx = mx;
        ry = my;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }
      const target = e.target as HTMLElement | null;
      hover = Boolean(
        target?.closest('a, button, [role="tab"], [role="button"], .cursor-grab, input, select'),
      );
    };

    const onDown = () => {
      down = true;
    };
    const onUp = () => {
      down = false;
    };
    const onLeave = () => {
      visible = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    window.addEventListener('pointermove', onMove, {passive: true});
    window.addEventListener('pointerdown', onDown, {passive: true});
    window.addEventListener('pointerup', onUp, {passive: true});
    document.addEventListener('mouseleave', onLeave);

    const stopLoop = onFrame(() => {
      if (!visible) return;
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;

      if (dotRef.current) {
        const dotScale = down ? 0.7 : hover ? 0.6 : 1;
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%) scale(${dotScale})`;
      }

      if (ringRef.current) {
        const ringScale = down ? 0.8 : hover ? 1.65 : 1;
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${ringScale})`;
        ringRef.current.style.borderColor = hover
          ? 'rgba(56, 189, 248, 0.9)'
          : 'rgba(56, 189, 248, 0.45)';
        ringRef.current.style.backgroundColor = hover
          ? 'rgba(56, 189, 248, 0.12)'
          : 'transparent';
      }
    });

    return () => {
      stopLoop();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] size-8 rounded-full border border-cyan-glow/45 opacity-0 transition-[border-color,background-color,opacity] duration-200 will-change-transform"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] size-2 rounded-full bg-cyan-glow opacity-0 shadow-[0_0_10px_#38bdf8] transition-opacity duration-200 will-change-transform"
      />
    </>
  );
}
