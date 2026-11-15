import {useCallback, useEffect, useRef, useState} from 'react';
import {CustomCursor} from './components/CustomCursor';
import {DeckHud} from './components/DeckHud';
import {Slides} from './components/Slides';
import {SLIDES} from './content';
import {startLoop} from './lib/scroll';

export default function App() {
  const [currentIdx, setCurrentIdx] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    const found = SLIDES.findIndex((s) => s.id === hash);
    return found >= 0 ? found : 0;
  });

  const lockUntilRef = useRef(0);

  const goTo = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(SLIDES.length - 1, idx));
    setCurrentIdx(clamped);
    const id = SLIDES[clamped].id;
    history.replaceState(null, '', clamped === 0 ? ' ' : `#${id}`);
  }, []);

  // Start ambient rAF loop for simulations & caustics
  useEffect(() => startLoop(), []);

  // Discrete keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        goTo(currentIdx + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        goTo(currentIdx - 1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [currentIdx, goTo]);

  // Discrete wheel navigation: one wheel gesture = one slide
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = performance.now();
      if (now < lockUntilRef.current) return;
      if (Math.abs(e.deltaY) < 20) return;

      lockUntilRef.current = now + 650;
      if (e.deltaY > 0) {
        goTo(currentIdx + 1);
      } else {
        goTo(currentIdx - 1);
      }
    };
    window.addEventListener('wheel', onWheel, {passive: false});
    return () => window.removeEventListener('wheel', onWheel);
  }, [currentIdx, goTo]);

  // Discrete touch swipe navigation for mobile/tablet
  useEffect(() => {
    let startY = 0;
    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const endY = e.changedTouches[0]?.clientY ?? startY;
      const dy = startY - endY;
      if (Math.abs(dy) < 45) return;
      if (dy > 0) goTo(currentIdx + 1);
      else goTo(currentIdx - 1);
    };
    window.addEventListener('touchstart', onTouchStart, {passive: true});
    window.addEventListener('touchend', onTouchEnd, {passive: true});
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [currentIdx, goTo]);

  return (
    <>
      <CustomCursor />
      <DeckHud currentIdx={currentIdx} goTo={goTo} />
      <main className="relative h-screen-s w-full overflow-hidden bg-abyss">
        <Slides currentIdx={currentIdx} />
      </main>
    </>
  );
}
