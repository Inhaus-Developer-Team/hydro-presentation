import {useState} from 'react';

const SECTORS = [
  {
    id: 'industrial',
    label: 'Industrial Effluent',
    metric: 'Up to 99% COD / TSS reduction',
    process: 'Electro-coagulation → DAF → Membrane Filtration',
    detail: 'Tailored modular skids engineered for complex high-strength leachate, food processing, and manufacturing discharge.',
  },
  {
    id: 'drinking',
    label: 'Drinking Water',
    metric: 'WHO & EU Potable Standards',
    process: 'Screening → Ultrafiltration → Reverse Osmosis → UV',
    detail: 'High-yield desalination and surface-water purification systems delivering safe, reliable potable supply.',
  },
  {
    id: 'mining',
    label: 'Mine Remediation',
    metric: '>98% Heavy Metal Removal',
    process: 'Hydro Current EC → Lamella Clarifier → Polishing',
    detail: 'Rapidly deployable treatment plants neutralizing acid mine drainage and protecting downstream river basins.',
  },
];

export function IntroSectorExplorer() {
  const [active, setActive] = useState(0);
  const s = SECTORS[active];

  return (
    <div data-stagger="3" className="rounded-2xl border border-ink/10 bg-white/80 p-5 shadow-lg backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-label text-electric uppercase">Interactive Application Explorer</span>
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Water treatment sectors">
          {SECTORS.map((sec, i) => (
            <button
              key={sec.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`rounded-full px-3.5 py-1.5 font-mono text-[0.6875rem] uppercase transition-all ${
                i === active
                  ? 'bg-electric text-pure shadow-md'
                  : 'bg-ice text-ink/75 hover:bg-electric/10 hover:text-electric'
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-4 border-t border-ink/10 pt-4 sm:grid-cols-3 sm:items-center">
        <div>
          <p className="font-mono text-[0.625rem] text-ink/60 uppercase">Key Outcome</p>
          <p className="mt-1 text-base font-medium text-electric">{s.metric}</p>
        </div>
        <div>
          <p className="font-mono text-[0.625rem] text-ink/60 uppercase">Modular Chain</p>
          <p className="mt-1 font-mono text-xs text-ink">{s.process}</p>
        </div>
        <p className="text-xs leading-relaxed text-ink/75">{s.detail}</p>
      </div>
    </div>
  );
}

const PHASES = [
  {
    n: '01',
    title: 'Design',
    body: 'Custom solutions for industrial and drinking water applications.',
    deliverable: 'Process modeling, lab treatability trials & 3D modular skid engineering.',
    kpi: '2–4 weeks',
  },
  {
    n: '02',
    title: 'Construct',
    body: 'Treatment systems built around modular process steps.',
    deliverable: 'Off-site containerized fabrication & factory acceptance testing (FAT).',
    kpi: 'Plug & play',
  },
  {
    n: '03',
    title: 'Install',
    body: 'Deployment across different industries and geographies.',
    deliverable: 'Rapid site integration, hydraulic tie-in & regulatory commissioning.',
    kpi: 'Global',
  },
  {
    n: '04',
    title: 'Operate',
    body: 'Operation of effective water treatment solutions.',
    deliverable: '24/7 remote telemetry, predictive maintenance & guaranteed compliance.',
    kpi: 'Full O&M',
  },
];

export function CapabilitiesExplorer() {
  const [selected, setSelected] = useState(0);
  const current = PHASES[selected];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {PHASES.map((step, i) => {
          const on = i === selected;
          return (
            <button
              key={step.n}
              type="button"
              onClick={() => setSelected(i)}
              aria-pressed={on}
              className={`rounded-2xl border p-5 text-left backdrop-blur-sm transition-all duration-300 ${
                on
                  ? 'border-cyan-glow bg-pure/15 shadow-[0_0_30px_rgba(56,189,248,0.2)]'
                  : 'border-pure/15 bg-pure/5 hover:border-cyan-glow/40 hover:bg-pure/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-label text-cyan-glow">{step.n}</span>
                <span className="font-mono text-[0.625rem] text-pure/60 uppercase">{step.kpi}</span>
              </div>
              <h3 className="mt-3 text-xl font-light text-pure sm:mt-4 sm:text-2xl">{step.title}</h3>
              <p className="mt-2 text-body text-pure/80 sm:mt-3">{step.body}</p>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-cyan-glow/25 bg-abyss/40 px-5 py-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-cyan-glow/20 px-3 py-1 font-mono text-label text-cyan-glow uppercase">
            Phase {current.n} · {current.title}
          </span>
          <p className="text-sm text-pure/90">{current.deliverable}</p>
        </div>
        <span className="font-mono text-[0.625rem] text-pure/55 uppercase">Click any phase to inspect</span>
      </div>
    </div>
  );
}
