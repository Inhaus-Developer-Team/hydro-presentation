import {ENTITIES, MILESTONES, PERFORMANCE_ROWS, SLIDES} from '../content';
import {EarthGlobe3D} from './EarthGlobe3D';
import {ElectroCoagulationSim} from './ElectroCoagulationSim';
import {CapabilitiesExplorer, IntroSectorExplorer} from './InteractiveIntroCapabilities';
import {ParallaxSlide, type SlideState} from './ParallaxSlide';
import {TreatmentProcessDiagram} from './TreatmentProcessDiagram';
import {WaterCausticsCanvas} from './WaterCausticsCanvas';

export function Slides({currentIdx}: {currentIdx: number}) {
  const stateOf = (idx: number): SlideState =>
    idx === currentIdx ? 'active' : idx < currentIdx ? 'before' : 'after';
  return (
    <>
      {/* 00 / CINEMATIC OPENING */}
      <ParallaxSlide
        meta={SLIDES[0]}
        state={stateOf(0)}
        hideHeaderLogo
        bg={
          <>
            <video
              autoPlay
              loop
              muted
              playsInline
              aria-hidden="true"
              className="size-full object-cover object-center scale-105"
            >
              <source src="./media/slides/intro-water.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-abyss/90 via-abyss/45 to-abyss/70" />
          </>
        }
      >
        <div className="flex flex-col items-center text-center">
          <img
            data-stagger="1"
            src="./media/logo-white.png"
            alt="Hydro Industries"
            className="h-24 w-auto object-contain drop-shadow-[0_0_40px_rgba(56,189,248,0.45)] sm:h-32 md:h-40"
          />
          <p data-stagger="2" className="mt-8 font-mono text-label tracking-[0.18em] text-pure/65 uppercase">
            Press → or scroll to begin
          </p>
        </div>
      </ParallaxSlide>

      {/* 01 / COVER */}
      <ParallaxSlide
        meta={SLIDES[1]} state={stateOf(1)}
        bg={
          <>
            <img
              src="./media/slides/hero-water.png"
              alt=""
              aria-hidden="true"
              className="size-full object-cover object-center scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-abyss/95 via-abyss/55 to-transparent" />
          </>
        }
        mid={<WaterCausticsCanvas />}
      >
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-glow/30 bg-abyss/60 px-3.5 py-1.5 backdrop-blur-md">
            <span className="size-2 animate-pulse rounded-full bg-cyan-glow shadow-[0_0_8px_#38bdf8]" />
            <span className="font-mono text-[0.6875rem] tracking-wider text-cyan-glow uppercase">
              Hydro Industries · Executive Deck
            </span>
          </div>
          <h1 data-stagger="1" className="mt-6 font-sans text-hero font-light tracking-[-0.03em] text-pure">
            Water.
            <br />
            Technology.
            <br />
            <em className="font-display font-light italic text-transparent bg-clip-text bg-gradient-to-r from-pure via-cyan-glow to-electric">
              Possibility.
            </em>
          </h1>
          <p className="mt-6 max-w-md text-lead font-light text-pure/85 sm:mt-8">
            Water purification and
            <br />
            industrial effluent processing
          </p>
        </div>
      </ParallaxSlide>

      {/* 02 / INTRODUCTION */}
      <ParallaxSlide
        meta={SLIDES[2]} state={stateOf(2)}
        bg={
          <div className="absolute inset-0 bg-[radial-gradient(55%_45%_at_85%_25%,rgba(20,70,255,0.08),transparent_70%)]" />
        }
      >
        <div className="space-y-8 sm:space-y-12 md:space-y-16">
          <h2 data-stagger="1" className="max-w-3xl font-sans text-display font-light tracking-[-0.03em] text-ink">
            Technology for
            <br />a world of <em className="font-display font-light italic text-electric">water.</em>
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-12">
            <div className="rounded-2xl border-l-4 border-electric bg-white/70 p-5 shadow-sm sm:col-span-2 md:col-span-1">
              <span className="font-mono text-label text-electric uppercase">Mission</span>
              <p className="mt-2 text-lead font-normal text-ink">
                Hydro designs, constructs, installs and operates effective water treatment solutions.
              </p>
            </div>
            <div className="border-t border-ink/15 pt-4 sm:pt-5">
              <h3 className="text-base font-medium text-ink sm:text-lg">Designed around each client</h3>
              <p className="mt-2 text-body text-ink/75 sm:mt-3">
                End-to-end treatment solutions combine modular process steps for industrial and drinking water applications.
              </p>
            </div>
            <div className="border-t border-ink/15 pt-4 sm:pt-5">
              <h3 className="text-base font-medium text-ink sm:text-lg">Proprietary technology. Global deployment.</h3>
              <p className="mt-2 text-body text-ink/75 sm:mt-3">
                Patented technologies and processes support solutions across a wide range of industries and geographies.
              </p>
            </div>
          </div>
          <IntroSectorExplorer />
        </div>
      </ParallaxSlide>

      {/* 03 / CAPABILITIES */}
      <ParallaxSlide
        meta={SLIDES[3]} state={stateOf(3)}
        bg={
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-cobalt via-abyss to-abyss" />
            <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_20%,rgba(20,70,255,0.45),transparent_70%)]" />
          </>
        }
      >
        <div className="space-y-8 sm:space-y-14 md:space-y-18">
          <h2 data-stagger="1" className="font-sans text-display font-light tracking-[-0.03em] text-pure">
            From design
            <br />
            to <em className="font-display font-light italic text-cyan-glow">operation.</em>
          </h2>
          <div data-stagger="2">
            <CapabilitiesExplorer />
          </div>
        </div>
      </ParallaxSlide>

      {/* 04 / CASE STUDIES INTRO */}
      <ParallaxSlide
        meta={SLIDES[4]} state={stateOf(4)}
        bg={
          <>
            <img
              src="./media/slides/impact-abstract.png"
              alt=""
              aria-hidden="true"
              className="size-full object-cover object-center scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-abyss/90 via-abyss/50 to-transparent" />
          </>
        }
        mid={
          <div className="absolute inset-0 bg-[radial-gradient(40%_50%_at_65%_45%,rgba(20,70,255,0.25),transparent_70%)] mix-blend-screen" />
        }
      >
        <div className="max-w-3xl">
          <h2 data-stagger="1" className="font-sans text-hero font-light tracking-[-0.03em] text-pure">
            Experience
            <br />
            with <em className="font-display font-light italic text-cyan-glow">impact.</em>
          </h2>
          <p className="mt-4 text-lead font-light text-pure/80 sm:mt-6">
            A legacy of dealing with complexity
          </p>
        </div>
      </ParallaxSlide>

      {/* 05 / QUITO, ECUADOR */}
      <ParallaxSlide meta={SLIDES[5]} state={stateOf(5)}>
        <div className="grid items-center gap-6 sm:gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <p className="font-mono text-label text-electric uppercase">Municipality of Quito</p>
            <h2 data-stagger="1" className="mt-2 font-sans text-display font-light tracking-[-0.03em] text-ink sm:mt-3">
              Protecting
              <br />
              river <em className="font-display font-light italic text-electric">basins.</em>
            </h2>
            <p className="mt-3 text-body text-ink/75 sm:mt-5">
              Hydro built a leachate treatment plant to treat a chemically toxic mixture of heavy metals and carbon-based pollutants, allowing treated water to return safely to the environment.
            </p>
            <div className="mt-6 rounded-2xl bg-white/70 p-5 shadow-sm ring-1 ring-ink/10 sm:mt-8">
              <p className="font-sans text-[clamp(2.5rem,4.5vw,3.75rem)] leading-none font-light text-electric">
                600–800
              </p>
              <p className="mt-2 text-sm text-ink/70">tonnes of leachate produced per day at the landfill</p>
              <p className="mt-4 font-mono text-label text-ink/65 uppercase">Project completed / Q3 2024</p>
            </div>
          </div>
          <div className="md:col-span-7">
            <div className="group relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-ink/10 transition-transform duration-500 hover:scale-[1.01]">
              <img
                src="./media/slides/quito-plant.png"
                alt="Quito leachate treatment plant aerial view"
                className="aspect-[16/10] w-full object-cover sm:aspect-[4/3]"
              />
              <div className="absolute bottom-4 left-4 rounded-full bg-abyss/80 px-3.5 py-1.5 font-mono text-[0.625rem] text-pure backdrop-blur-md">
                Quito, Ecuador · Heavy Metals Remediation Facility
              </div>
            </div>
          </div>
        </div>
      </ParallaxSlide>

      {/* 06 / FRONGOCH, WALES — WITH INTERACTIVE SIMULATION */}
      <ParallaxSlide meta={SLIDES[6]} state={stateOf(6)}>
        <div className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
          <div className="space-y-6 md:col-span-5">
            <div>
              <p className="font-mono text-label text-electric uppercase">Natural Resources Wales</p>
              <p className="mt-2 font-sans text-[clamp(4.5rem,9vw,7.5rem)] leading-none font-light tracking-[-0.04em] text-electric sm:mt-4">
                &gt;98%
              </p>
              <p className="mt-3 max-w-md text-xl font-light text-ink sm:mt-4 sm:text-2xl">
                Removal of metal pollutants from the water
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-ink/15 pt-4">
              <div>
                <p className="font-sans text-3xl font-light text-electric sm:text-4xl">1,300+</p>
                <p className="mt-1 text-xs text-ink/70">abandoned metal mines in Wales</p>
              </div>
              <div>
                <p className="font-sans text-3xl font-light text-electric sm:text-4xl">200+ km</p>
                <p className="mt-1 text-xs text-ink/70">of rivers impacted by these mines</p>
              </div>
            </div>
          </div>
          <div className="space-y-4 md:col-span-7">
            <div className="flex items-baseline justify-between">
              <h2 data-stagger="1" className="font-sans text-2xl font-light tracking-[-0.03em] text-ink sm:text-3xl">
                A measurable <em className="font-display font-light italic text-electric">difference.</em>
              </h2>
              <span className="font-mono text-[0.625rem] text-ink/65 uppercase">Live Electro-Physics</span>
            </div>
            <p className="text-body text-ink/75">
              Hydro applied patented electro-coagulation technology: destabilizing suspended metal ions through controlled micro-currents.
            </p>
            {/* Live Interactive Physics Simulation */}
            <div data-stagger="3"><ElectroCoagulationSim /></div>
          </div>
        </div>
      </ParallaxSlide>

      {/* 07 / ROADBRIDGE, SOUTH WALES */}
      <ParallaxSlide meta={SLIDES[7]} state={stateOf(7)}>
        <div className="space-y-6 sm:space-y-10">
          <h2 data-stagger="1" className="font-sans text-display font-light tracking-[-0.03em] text-ink">
            Clear results.
            <br />
            <em className="font-display font-light italic text-electric">Measured.</em>
          </h2>
          <div className="grid items-start gap-8 md:grid-cols-12 md:gap-12">
            <div className="space-y-6 rounded-2xl bg-white/70 p-6 shadow-xl ring-1 ring-ink/10 backdrop-blur-md md:col-span-7">
              <p className="font-mono text-label text-ink/70 uppercase">Turbidity / NTU Comparison</p>
              <div>
                <div className="flex justify-between text-sm font-medium text-ink sm:text-base">
                  <span>Raw water</span>
                  <span className="font-mono font-bold text-ink">828 NTU</span>
                </div>
                <div className="mt-2 h-10 w-full overflow-hidden rounded-lg bg-gradient-to-r from-electric/35 to-electric shadow-inner" />
              </div>
              <div>
                <div className="flex justify-between text-sm font-medium text-ink sm:text-base">
                  <span>Treated water</span>
                  <span className="font-mono font-bold text-electric">5.91 NTU</span>
                </div>
                <div className="mt-2 flex h-10 w-full items-center rounded-lg bg-ice/60 p-1">
                  <div className="h-full w-[1.5%] min-w-[8px] rounded-md bg-electric shadow-md" />
                  <span className="ml-3 font-mono text-xs text-electric">99.3% reduction achieved</span>
                </div>
              </div>
              <p className="border-t border-ink/15 pt-2 text-xs text-ink/65">
                Common linear scale, baseline 0 NTU. Source: HYDRO Roadbridge case study.
              </p>
            </div>
            <div className="md:col-span-5">
              <p className="font-sans text-[clamp(3.5rem,7vw,5.5rem)] leading-none font-light text-electric">
                &gt;99%
              </p>
              <p className="mt-2 text-lg font-light text-ink sm:text-xl">Removal rate</p>
              <p className="mt-3 text-body text-ink/75 sm:mt-5">
                Four treatment plants used Hydro Current technology to remove suspended particles from construction runoff.
              </p>
              <p className="mt-3 text-xs text-ink/65 sm:mt-4 sm:text-sm">
                Treatment met stringent water quality standards enforced by the Environment Agency.
              </p>
            </div>
          </div>
        </div>
      </ParallaxSlide>

      {/* 08 / TREATMENT PERFORMANCE */}
      <ParallaxSlide meta={SLIDES[8]} state={stateOf(8)}>
        <div className="grid items-start gap-6 sm:gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 data-stagger="1" className="font-sans text-display font-light tracking-[-0.03em] text-ink">
              Complex water.
              <br />
              <em className="font-display font-light italic text-electric">Clear evidence.</em>
            </h2>
            <p className="mt-3 max-w-sm text-body text-ink/75 sm:mt-5">
              Example of a Hydro treatment configuration, comparing input water, treated water and output requirements.
            </p>
            <div className="mt-4 rounded-xl border-l-2 border-electric bg-white/70 p-4 shadow-sm">
              <span className="font-mono text-label text-electric uppercase">Benchmark</span>
              <p className="mt-1 text-xs text-ink/70">
                100% of tested discharge parameters fall significantly below statutory thresholds.
              </p>
            </div>
          </div>
          <div className="w-full overflow-x-auto rounded-2xl bg-white/80 p-3 shadow-xl ring-1 ring-ink/10 backdrop-blur-md md:col-span-7">
            <table data-stagger="2" className="w-full min-w-[460px] border-collapse text-left">
              <thead>
                <tr className="border-b border-ink/15 font-mono text-[0.6875rem] tracking-[0.1em] text-electric uppercase">
                  <th className="py-2.5 pr-4 pl-3 sm:py-3 sm:pl-4">Parameter</th>
                  <th className="py-2.5 px-3 sm:py-3 sm:px-4">Input</th>
                  <th className="py-2.5 px-3 sm:py-3 sm:px-4">After Hydro Treatment</th>
                  <th className="py-2.5 pr-3 pl-3 sm:py-3 sm:pr-4 sm:pl-4">Output Requirement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10 text-sm sm:text-base">
                {PERFORMANCE_ROWS.map((r) => (
                  <tr key={r.param} className="transition-colors hover:bg-electric/5">
                    <td className="py-2.5 pr-4 pl-3 font-medium text-ink sm:py-3 sm:pl-4">{r.param}</td>
                    <td className="py-2.5 px-3 font-mono text-ink/75 sm:py-3 sm:px-4">{r.input}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-electric sm:py-3 sm:px-4">{r.after}</td>
                    <td className="py-2.5 pr-3 pl-3 font-mono text-ink/75 sm:py-3 sm:pr-4 sm:pl-4">{r.req}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ParallaxSlide>

      {/* 09 / CORPORATE DEVELOPMENT */}
      <ParallaxSlide meta={SLIDES[9]} state={stateOf(9)}>
        <div className="grid items-center gap-6 sm:gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 data-stagger="1" className="font-sans text-display font-light tracking-[-0.03em] text-ink">
              A history of
              <br />
              <em className="font-display font-light italic text-electric">progress.</em>
            </h2>
            <div data-stagger="2" className="mt-4 overflow-hidden rounded-2xl bg-white/75 p-5 shadow-sm ring-1 ring-ink/10 backdrop-blur-md sm:mt-8 sm:p-6">
              <p className="font-mono text-label text-electric uppercase">Selected milestones / 2010–2026</p>
              <p className="mt-2 text-body text-ink/75 sm:mt-3">
                Sixteen years of proprietary electro-coagulation engineering, global deployments, and strategic group expansion.
              </p>
            </div>
          </div>
          <div className="relative pl-6 sm:pl-8 md:col-span-7">
            <div aria-hidden="true" className="absolute top-3 bottom-3 left-2 w-[2px] bg-gradient-to-b from-electric via-cyan-glow to-electric/20 sm:left-3" />
            <div className="space-y-3 sm:space-y-4">
              {MILESTONES.map((m, i) => (
                <div
                  key={m.year}
                  data-stagger={String(Math.min(5, i + 1))}
                  className="group relative rounded-2xl bg-white/75 p-4 shadow-sm ring-1 ring-ink/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:ring-electric/30 sm:p-5"
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-1/2 -left-[1.35rem] size-3 -translate-y-1/2 rounded-full border-2 border-pure bg-electric shadow-[0_0_10px_rgba(20,70,255,0.55)] transition-transform duration-300 group-hover:scale-125 sm:-left-[1.6rem]"
                  />
                  <div className="grid grid-cols-[4.5rem_1fr] items-baseline gap-3 sm:grid-cols-[5.5rem_1fr] sm:gap-4">
                    <span className="font-sans text-xl font-light text-electric transition-transform duration-300 group-hover:translate-x-0.5 sm:text-2xl">
                      {m.year}
                    </span>
                    <div>
                      <h3 className="text-base font-medium text-ink sm:text-lg">{m.title}</h3>
                      <p className="mt-0.5 text-xs text-ink/70 sm:text-sm">{m.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ParallaxSlide>

      {/* 10 / GROUP STRUCTURE */}
      <ParallaxSlide
        meta={SLIDES[10]} state={stateOf(10)}
        bg={
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-cobalt/80 via-abyss to-abyss" />
            <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_70%_50%,rgba(20,70,255,0.35),transparent_70%)]" />
          </>
        }
      >
        <div className="grid items-center gap-8 sm:gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-mono text-label text-cyan-glow uppercase">United Kingdom</p>
            <h2 data-stagger="1" className="mt-2 font-sans text-display font-light tracking-[-0.03em] text-pure sm:mt-3">
              One group.
              <br />
              International
              <br />
              <em className="font-display font-light italic text-cyan-glow">presence.</em>
            </h2>
            <p data-stagger="2" className="mt-5 font-mono text-label text-cyan-glow uppercase">Wholly owned subsidiaries / 100%</p>
            <div data-stagger="3" className="mt-3 grid gap-2 sm:grid-cols-2 md:grid-cols-1">
              {ENTITIES.map((e) => (
                <div key={e.name} className="flex items-center justify-between rounded-xl border border-pure/10 bg-pure/5 px-3.5 py-2 backdrop-blur-sm transition-colors hover:border-cyan-glow/30 hover:bg-pure/10">
                  <span className="text-sm font-light text-pure">{e.name}</span>
                  {e.country && <span className="rounded-full bg-pure/10 px-2 py-0.5 font-mono text-[0.625rem] text-cyan-glow">{e.country}</span>}
                </div>
              ))}
            </div>
            <div data-stagger="4" className="mt-4 rounded-xl border border-cyan-glow/20 bg-electric/10 px-4 py-3">
              <p className="font-mono text-label text-cyan-glow uppercase">Joint venture office</p>
              <p className="mt-0.5 text-base font-light text-pure">Bahrain Regional Hub</p>
            </div>
          </div>
          <div data-stagger="2" className="md:col-span-7">
            <EarthGlobe3D />
          </div>
        </div>
      </ParallaxSlide>

      {/* 11 / BEE'AH, SHARJAH */}
      <ParallaxSlide meta={SLIDES[11]} state={stateOf(11)}>
        <div className="grid items-center gap-6 sm:gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <p className="font-mono text-label text-electric uppercase">Wastewater Treatment / UAE</p>
            <h2 data-stagger="1" className="mt-2 font-sans text-display font-light tracking-[-0.03em] text-ink sm:mt-3">
              Wastewater.
              <br />
              <em className="font-display font-light italic text-electric">New purpose.</em>
            </h2>
            <p className="mt-3 text-body text-ink/75 sm:mt-5">
              A treatment system for landfill liquid waste and local industrial effluent, engineered to provide irrigation-quality water for reuse.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-ink/15 pt-4 sm:mt-8 sm:gap-6 sm:pt-6">
              <div className="rounded-xl bg-white/70 p-4 shadow-sm">
                <p className="font-sans text-3xl font-light text-electric sm:text-4xl">500</p>
                <p className="mt-1 text-xs text-ink/70">m³/day treatment capacity</p>
              </div>
              <div className="rounded-xl bg-white/70 p-4 shadow-sm">
                <p className="font-sans text-3xl font-light text-electric sm:text-4xl">1.5m</p>
                <p className="mt-1 text-xs text-ink/70">tonnes treated since inception</p>
              </div>
            </div>
          </div>
          <div className="md:col-span-7">
            <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-ink/10">
              <img
                src="./media/slides/beeah-plant.png"
                alt="BEE'AH Sharjah wastewater treatment plant"
                className="aspect-[16/10] w-full object-cover"
              />
              <div className="flex items-center justify-between bg-electric px-5 py-3.5 text-pure shadow-md sm:px-6 sm:py-4">
                <span className="font-mono text-label uppercase">Commissioned</span>
                <span className="font-sans text-xl font-light sm:text-2xl">Q2 2018</span>
              </div>
            </div>
          </div>
        </div>
      </ParallaxSlide>

      {/* 12 / TECHNOLOGY DEVELOPMENT — DESALINATION */}
      <ParallaxSlide
        meta={SLIDES[12]} state={stateOf(12)}
        bg={
          <>
            <img
              src="./media/slides/desalination-light.png"
              alt=""
              aria-hidden="true"
              className="size-full object-cover object-center opacity-85"
            />
            <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />
          </>
        }
      >
        <div className="space-y-6 sm:space-y-10">
          <div className="flex flex-wrap items-end justify-between gap-2 sm:gap-4">
            <h2 data-stagger="1" className="font-sans text-display font-light tracking-[-0.03em] text-ink">
              More freshwater.
              <br />
              <em className="font-display font-light italic text-electric">Higher yield.</em>
            </h2>
            <span className="rounded-full bg-electric/10 px-3.5 py-1.5 font-mono text-label text-electric uppercase">
              Desalination / UK &amp; MENA
            </span>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-10">
            <div className="rounded-2xl bg-white/80 p-6 shadow-lg ring-1 ring-ink/10 backdrop-blur-md">
              <p className="font-mono text-label text-ink/70 uppercase">Traditional technologies</p>
              <p className="mt-2 font-sans text-[clamp(3.5rem,7vw,5.5rem)] leading-none font-light text-ink/65 sm:mt-4">
                40–50%
              </p>
              <p className="mt-2 text-body text-ink/75">Typical freshwater yield</p>
              <div className="mt-4 h-2 w-full rounded-full bg-ink/10 overflow-hidden">
                <div className="h-full w-[45%] rounded-full bg-ink/40" />
              </div>
            </div>
            <div className="rounded-2xl border-2 border-electric bg-white/95 p-6 shadow-2xl backdrop-blur-md">
              <p className="font-mono text-label text-electric uppercase">Hydro technology / In development</p>
              <p className="mt-2 font-sans text-[clamp(3.5rem,7vw,5.5rem)] leading-none font-light text-electric sm:mt-4">
                70%+
              </p>
              <p className="mt-2 text-body font-medium text-electric">Freshwater yield capability</p>
              <div className="mt-4 h-2 w-full rounded-full bg-electric/20 overflow-hidden">
                <div className="h-full w-[72%] rounded-full bg-electric" />
              </div>
            </div>
          </div>
          <p className="max-w-2xl text-xs text-ink/75 sm:text-sm">
            Hydro’s development case describes reduced brine reject and lower energy consumption alongside higher freshwater yields.
          </p>
        </div>
      </ParallaxSlide>

      {/* 13 / CAPESTONE ORGANIC POULTRY — WITH PROCESS DIAGRAM */}
      <ParallaxSlide meta={SLIDES[13]} state={stateOf(13)}>
        <div className="space-y-8 sm:space-y-10">
          <div className="grid items-center gap-6 sm:gap-10 md:grid-cols-12">
            <div className="md:col-span-6">
              <p className="font-mono text-label text-electric uppercase">Wastewater Recovery / Plant in development</p>
              <h2 data-stagger="1" className="mt-2 font-sans text-display font-light tracking-[-0.03em] text-ink sm:mt-3">
                Recover.
                <br />
                Reuse. <em className="font-display font-light italic text-electric">Repeat.</em>
              </h2>
            </div>
            <div className="md:col-span-6">
              <div className="rounded-2xl bg-electric p-6 text-pure shadow-2xl sm:p-8">
                <div className="flex items-baseline justify-between">
                  <p className="font-mono text-label text-pure/80 uppercase">Planned process water reuse</p>
                  <span className="font-mono text-xs text-pure/75">45 m³/hr output</span>
                </div>
                <p className="mt-2 font-sans text-[clamp(3.5rem,6vw,5rem)] leading-none font-light">70%</p>
                <p className="mt-1 text-base font-light sm:text-lg">Up to 70% recovery and reuse</p>
                <p className="mt-3 text-xs leading-relaxed text-pure/85 sm:text-sm">
                  Hydro is building a plant designed to reduce pressure on local groundwater. Hydro will also operate and maintain the facility.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Treatment Process Flow Diagram */}
          <div data-stagger="3"><TreatmentProcessDiagram /></div>
        </div>
      </ParallaxSlide>

      {/* 14 / CINEMATIC THANK YOU */}
      <ParallaxSlide
        meta={SLIDES[14]}
        state={stateOf(14)}
        hideHeaderLogo
        bg={
          <>
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="./media/slides/outro-cinematic.png"
              aria-hidden="true"
              className="size-full object-cover object-center scale-105"
            >
              <source src="./media/slides/outro-water.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-abyss/95 via-abyss/50 to-abyss/75" />
          </>
        }
      >
        <div className="flex flex-col items-center text-center">
          <img
            data-stagger="1"
            src="./media/logo-white.png"
            alt="Hydro Industries"
            className="h-16 w-auto object-contain drop-shadow-[0_0_36px_rgba(56,189,248,0.4)] sm:h-24 md:h-28"
          />
          <h2 data-stagger="2" className="mt-8 font-sans text-hero font-light tracking-[-0.03em] text-pure">
            Thank <em className="font-display font-light italic text-cyan-glow">you.</em>
          </h2>
          <p data-stagger="3" className="mt-6 font-mono text-label tracking-[0.16em] text-pure/70 uppercase">
            Hydro Industries Limited · United Kingdom · October 2026
          </p>
        </div>
      </ParallaxSlide>
    </>
  );
}
