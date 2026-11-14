import {type ReactNode} from 'react';
import {DECK_FOOTER, type SlideMeta} from '../content';

export type SlideState = 'active' | 'before' | 'after';

interface ParallaxSlideProps {
  meta: SlideMeta;
  state: SlideState;
  /** Background layer (slowest parallax). */
  bg?: ReactNode;
  /** Midground layer (medium parallax). */
  mid?: ReactNode;
  /** Foreground content layer (fastest parallax). */
  children: ReactNode;
}

const THEME_BG: Record<SlideMeta['theme'], string> = {
  dark: 'bg-abyss text-pure',
  cobalt: 'bg-cobalt text-pure',
  light: 'bg-pure text-ink',
  ice: 'bg-ice text-ink',
};

export function ParallaxSlide({meta, state, bg, mid, children}: ParallaxSlideProps) {
  const isDark = meta.theme === 'dark' || meta.theme === 'cobalt';
  const isActive = state === 'active';

  // Directional parallax offsets:
  // 'before' = slide we already passed (exited upward)
  // 'after'  = upcoming slide (waiting below)
  const bgTransform =
    state === 'active'
      ? 'translate3d(0, 0, 0) scale(1)'
      : state === 'before'
        ? 'translate3d(0, -10%, 0) scale(1.06)'
        : 'translate3d(0, 10%, 0) scale(1.08)';

  const midTransform =
    state === 'active'
      ? 'translate3d(0, 0, 0) scale(1)'
      : state === 'before'
        ? 'translate3d(0, -18%, 0) scale(0.98)'
        : 'translate3d(0, 18%, 0) scale(0.96)';

  const fgTransform =
    state === 'active'
      ? 'translate3d(0, 0, 0)'
      : state === 'before'
        ? 'translate3d(0, -48px, 0)'
        : 'translate3d(0, 48px, 0)';

  return (
    <section
      id={meta.id}
      data-slide={meta.number}
      aria-label={`Slide ${meta.number}: ${meta.eyebrow}`}
      aria-hidden={!isActive}
      inert={!isActive}
      className={`fixed inset-0 flex h-screen-s w-full flex-col justify-between overflow-x-hidden overflow-y-auto px-4 py-5 transition-[opacity,visibility] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-8 sm:py-7 md:px-[5vw] md:py-[4vh] lg:overflow-hidden ${THEME_BG[meta.theme]} ${
        isActive ? 'slide-active pointer-events-auto visible z-20 opacity-100' : 'pointer-events-none invisible z-10 opacity-0'
      }`}
    >
      {/* Background parallax layer (slowest, 1800ms) */}
      <div
        className="pointer-events-none absolute inset-0 will-change-transform transition-[transform,opacity] duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: bgTransform,
          opacity: isActive ? 1 : 0.35,
        }}
      >
        {bg}
      </div>

      {/* Midground parallax layer (medium, 1600ms) */}
      <div
        className="pointer-events-none absolute inset-0 will-change-transform transition-[transform,opacity] duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: midTransform,
          opacity: isActive ? 1 : 0,
        }}
      >
        {mid}
      </div>

      {/* Slide Header */}
      <header
        className={`relative z-10 flex shrink-0 items-center justify-between gap-4 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isActive ? 'translate-y-0 opacity-100 delay-75' : ' -translate-y-3 opacity-0'
        }`}
      >
        <span className={`font-mono text-[0.625rem] tracking-[0.14em] uppercase sm:text-label ${isDark ? 'text-pure/75' : 'text-ink/75'}`}>
          {meta.eyebrow}
        </span>
        <img
          src={isDark ? './media/logo-white.png' : './media/logo-dark.png'}
          alt="Hydro Industries"
          className="h-6 w-auto max-w-[120px] object-contain sm:h-8 sm:max-w-[160px] md:h-9"
        />
      </header>

      {/* Foreground Content (fastest, 1450ms + stagger on intro) */}
      <div
        className={`relative z-10 my-auto w-full py-4 pb-16 will-change-transform transition-[transform,opacity] duration-[1450ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:pb-4 ${
          isActive ? 'delay-100' : 'delay-0'
        }`}
        style={{
          transform: fgTransform,
          opacity: isActive ? 1 : 0,
        }}
      >
        {children}
      </div>

      {/* Slide Footer */}
      <footer
        className={`relative z-10 flex shrink-0 items-center justify-between border-t pt-3 font-mono text-[0.625rem] tracking-[0.12em] uppercase transition-opacity duration-700 sm:text-[0.6875rem] ${
          isDark ? 'border-pure/15 text-pure/70' : 'border-ink/15 text-ink/70'
        } ${isActive ? 'opacity-100 delay-150' : 'opacity-0'}`}
      >
        <span className="truncate pr-2">{DECK_FOOTER}</span>
        <span>{meta.number}</span>
      </footer>
    </section>
  );
}
