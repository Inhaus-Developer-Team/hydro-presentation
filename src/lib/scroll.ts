/**
 * Single rAF loop for continuous ambient animations and simulations
 * (water caustics, electro-coagulation physics, process flow).
 */

type Tick = (time: number) => void;

const subscribers = new Set<Tick>();

export function startLoop(): () => void {
  let raf = 0;
  const loop = (time: number) => {
    subscribers.forEach((fn) => fn(time));
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(raf);
  };
}

export function onFrame(fn: Tick): () => void {
  subscribers.add(fn);
  return () => {
    subscribers.delete(fn);
  };
}
