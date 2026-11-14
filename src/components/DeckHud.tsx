import {useEffect, useState} from 'react';
import {SLIDES} from '../content';

interface DeckHudProps {
  currentIdx: number;
  goTo: (idx: number) => void;
}

export function DeckHud({currentIdx, goTo}: DeckHudProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleGoTo = (idx: number) => {
    setMenuOpen(false);
    goTo(idx);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const progress = (currentIdx + 1) / SLIDES.length;

  return (
    <>
      {/* Top progress bar */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] bg-pure/10">
        <div
          className="h-full origin-left bg-electric transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{transform: `scaleX(${progress})`}}
        />
      </div>

      {/* Slide index drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-abyss/70 p-4 pb-24 backdrop-blur-md sm:p-6"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="frost-dark grid max-h-[70vh] w-full max-w-2xl gap-1.5 overflow-y-auto rounded-3xl p-4 sm:grid-cols-2"
            onClick={(e) => e.stopPropagation()}
          >
            {SLIDES.map((s, i) => {
              const active = i === currentIdx;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleGoTo(i)}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition-colors ${
                    active ? 'bg-electric text-pure' : 'text-pure/80 hover:bg-pure/10 hover:text-pure'
                  }`}
                >
                  <span className="font-mono text-label opacity-75">{s.number}</span>
                  <span className="truncate font-sans text-sm font-medium">{s.eyebrow}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Floating CEO control pill */}
      <nav
        aria-label="Slide navigation"
        className="frost-dark fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-full p-1 text-pure shadow-lg"
      >
        <button
          type="button"
          onClick={() => handleGoTo(currentIdx - 1)}
          disabled={currentIdx === 0}
          aria-label="Previous slide"
          className="rounded-full px-3.5 py-1.5 font-mono text-label uppercase transition-colors hover:bg-pure/15 disabled:opacity-30"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label={`Slide menu, currently on slide ${currentIdx + 1} of ${SLIDES.length}`}
          className="rounded-full px-3 py-1.5 font-mono text-label tracking-[0.12em] uppercase transition-colors hover:bg-pure/15"
        >
          {SLIDES[currentIdx]?.number ?? '01'} / {String(SLIDES.length).padStart(2, '0')}
        </button>
        <button
          type="button"
          onClick={() => handleGoTo(currentIdx + 1)}
          disabled={currentIdx === SLIDES.length - 1}
          aria-label="Next slide"
          className="rounded-full px-3.5 py-1.5 font-mono text-label uppercase transition-colors hover:bg-pure/15 disabled:opacity-30"
        >
          →
        </button>
      </nav>
    </>
  );
}
