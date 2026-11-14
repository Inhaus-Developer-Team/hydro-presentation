import {useEffect, useRef} from 'react';
import {onFrame} from '../lib/scroll';

const STEPS = [
  {id: '1', title: 'Screening', desc: 'Coarse solids removal', icon: 'M4 6h16M4 12h16M4 18h16'},
  {id: '2', title: 'DAF', desc: 'Dissolved air flotation', icon: 'M12 3v18m0-18l4 4m-4-4l-4 4'},
  {id: '3', title: 'MBBR', desc: 'Biofilm degradation', icon: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 14a4 4 0 1 1 4-4 4 4 0 0 1-4 4z'},
  {id: '4', title: 'Reverse Osmosis', desc: 'Molecular filtration (70% yield)', icon: 'M9 3v18m6-18v18M3 9h18M3 15h18'},
  {id: '5', title: 'UV Disinfection', desc: 'Pathogen elimination', icon: 'M12 3v2m0 14v2m9-9h-2M5 12H3m15.36-6.36l-1.42 1.42M7.05 16.95l-1.42 1.42m12.73 0l-1.42-1.42M7.05 7.05L5.63 5.63'},
];

export function TreatmentProcessDiagram() {
  const lineRef = useRef<SVGLineElement[]>([]);

  useEffect(() => {
    return onFrame((time) => {
      const offset = (time / 20) % 20;
      lineRef.current.forEach((el) => {
        if (el) el.style.strokeDashoffset = String(-offset);
      });
    });
  }, []);

  return (
    <div className="w-full rounded-2xl bg-white/60 p-4 shadow-xl ring-1 ring-ink/10 backdrop-blur-md sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-label text-electric uppercase">Modular Process Architecture</p>
        <span className="font-mono text-[0.625rem] text-ink/70">Continuous Flow · 45 m³/hr</span>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-5 sm:gap-2">
        {STEPS.map((s, i) => (
          <div key={s.id} className="relative flex flex-col justify-between rounded-xl bg-ice/70 p-3 ring-1 ring-ink/10 transition-transform duration-300 hover:-translate-y-1">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.6875rem] font-bold text-electric">0{s.id}</span>
                <svg className="size-4 text-electric" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                </svg>
              </div>
              <h4 className="mt-2 text-sm font-medium text-ink">{s.title}</h4>
              <p className="mt-1 text-xs text-ink/70">{s.desc}</p>
            </div>
            {i < STEPS.length - 1 && (
              <div className="hidden sm:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-20">
                <svg width="12" height="12" viewBox="0 0 12 12" className="text-electric">
                  <path d="M2 6h8m-3-3l3 3-3 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
