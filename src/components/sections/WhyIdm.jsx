import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { useCountUp } from '../../hooks/useScrollAnimation'

const milestones = [
  {
    year: '1977',
    title: 'In Tirol gegruendet.',
    description: 'Josef Pletzer startet mit einer Vision: emissionsfreie Waerme fuer alle. In Matrei in Osttirol beginnt die Geschichte von iDM.',
    image: '/images/hq-building.jpg',
    stat: { value: 45, suffix: '+', label: 'Jahre Erfahrung' },
  },
  {
    year: '2024',
    title: '800 Koepfe. Ein Ziel.',
    description: 'Ein Team aus Ingenieuren, Technikern und Visionaeren entwickelt und fertigt alles unter einem Dach — vom Konzept bis zur fertigen Waermepumpe.',
    image: '/images/engineer-cad.jpg',
    stat: { value: 800, suffix: '', label: 'Mitarbeiter:innen' },
  },
  {
    year: 'iON',
    title: 'Technologie, die vorausdenkt.',
    description: 'Unsere iON KI-Technologie lernt Ihr Heizverhalten, optimiert automatisch und senkt Ihre Kosten — vorausschauend und intelligent.',
    image: '/images/navigator-ion-tablet.jpg',
    stat: { value: 30, suffix: '%', label: 'Energieeinsparung' },
  },
  {
    year: 'R290',
    title: 'Fuer eine saubere Zukunft.',
    description: 'Natuerliches Kaeltemittel R290, emissionsfreie Waerme aus Erde, Luft und Wasser. Von 2 bis 1.500 kW — fuer jedes Projekt.',
    image: '/images/pcb-closeup.jpg',
    stat: { value: 1500, suffix: ' kW', label: 'Maximale Leistung' },
  },
]

function StatCounter({ stat, isActive }) {
  const count = useCountUp(stat.value, 2000, isActive)
  return (
    <div className="flex items-baseline gap-1">
      <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-idm font-mono">
        {count.toLocaleString('de-DE')}{stat.suffix}
      </span>
      <span className="text-xs md:text-sm text-n-400 font-mono ml-2">{stat.label}</span>
    </div>
  )
}

export default function WhyIdm() {
  const containerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const idx = Math.min(
      milestones.length - 1,
      Math.floor(latest * milestones.length)
    )
    setActiveIndex((prev) => (prev === idx ? prev : idx))
  })

  return (
    <section className="relative bg-n-950">
      {/* Gitter overlay */}
      <div className="absolute inset-0 bg-gitter-dark pointer-events-none" />
      <div className="absolute inset-0 bg-grid-fine opacity-20 pointer-events-none" />

      {/* Sticky intro */}
      <div className="relative z-10 pt-28 lg:pt-40 pb-16 max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <span className="text-[11px] font-mono font-semibold text-n-500 uppercase tracking-[0.2em]">
              Warum iDM
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-[-0.03em]">
              Die Energie-Familie
              <br />
              <span className="text-gradient-idm">aus Tirol.</span>
            </h2>
          </div>
          <p className="text-n-400 text-base md:text-lg leading-relaxed max-w-md">
            Seit 1977 entwickeln wir Waermepumpen mit einer Mission: emissionsfreie Waerme,
            die zuverlaessig funktioniert — ein Leben lang.
          </p>
        </div>
      </div>

      {/* Scroll-triggered milestones — YC style */}
      <div ref={containerRef} className="relative" style={{ height: `${milestones.length * 100}vh` }}>
        {/* Sticky viewport */}
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Progress bar on left */}
          <div className="absolute left-6 lg:left-10 top-1/2 -translate-y-1/2 h-[60%] w-[2px] bg-n-800 z-20">
            <motion.div
              className="w-full bg-idm origin-top"
              style={{
                scaleY: scrollYProgress,
                height: '100%',
              }}
            />
            {/* Milestone dots */}
            {milestones.map((_, i) => (
              <div
                key={i}
                className="absolute left-1/2 -translate-x-1/2 transition-all duration-500"
                style={{ top: `${(i / (milestones.length - 1)) * 100}%` }}
              >
                <div className={`w-3 h-3 border-2 transition-all duration-500 ${
                  i <= activeIndex
                    ? 'bg-idm border-idm scale-125'
                    : 'bg-n-950 border-n-600'
                }`} />
              </div>
            ))}
          </div>

          {/* Content area */}
          <div className="h-full flex items-center">
            <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-10">
              <div className="ml-8 lg:ml-16">
                {/* Mobile: stacked layout — text ALWAYS above image */}
                <div className="block lg:hidden relative">
                  {/* Text content — always on top, guaranteed visible */}
                  <div className="relative z-20 mb-4">
                    {milestones.map((milestone, i) => (
                      <motion.div
                        key={i}
                        initial={false}
                        animate={{
                          opacity: activeIndex === i ? 1 : 0,
                          y: activeIndex === i ? 0 : activeIndex > i ? -30 : 30,
                        }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className={activeIndex === i ? 'relative' : 'absolute inset-x-0 top-0'}
                        style={{ pointerEvents: activeIndex === i ? 'auto' : 'none' }}
                      >
                        <div className="bg-n-950/90 backdrop-blur-sm p-1">
                          <div className="flex items-center gap-3 mb-4">
                            <span className="text-idm font-mono font-bold text-xl">
                              {milestone.year}
                            </span>
                            <div className="w-8 h-[2px] bg-idm" />
                          </div>

                          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-[-0.02em] mb-3">
                            {milestone.title}
                          </h3>

                          <p className="text-n-400 text-sm leading-relaxed mb-6">
                            {milestone.description}
                          </p>

                          <StatCounter stat={milestone.stat} isActive={activeIndex === i} />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Image — below text on mobile, contained height */}
                  <div className="relative z-10 h-[35vh] overflow-hidden">
                    {milestones.map((milestone, i) => (
                      <motion.div
                        key={i}
                        initial={false}
                        animate={{
                          opacity: activeIndex === i ? 1 : 0,
                          scale: activeIndex === i ? 1 : 1.05,
                        }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0"
                      >
                        <img
                          loading="lazy"
                          decoding="async"
                          src={milestone.image}
                          alt={milestone.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gitter opacity-60 mix-blend-overlay" />
                        <div className="absolute inset-0 bg-gradient-to-t from-n-950/80 via-transparent to-n-950/60" />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Desktop: side-by-side layout */}
                <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center">
                  {/* Left: Text */}
                  <div className="relative">
                    {milestones.map((milestone, i) => (
                      <motion.div
                        key={i}
                        initial={false}
                        animate={{
                          opacity: activeIndex === i ? 1 : 0,
                          y: activeIndex === i ? 0 : activeIndex > i ? -40 : 40,
                        }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0"
                        style={{ pointerEvents: activeIndex === i ? 'auto' : 'none' }}
                      >
                        <div className="flex items-center gap-3 mb-6">
                          <span className="text-idm font-mono font-bold text-2xl md:text-3xl">
                            {milestone.year}
                          </span>
                          <div className="w-12 h-[2px] bg-idm" />
                        </div>

                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-[-0.02em] mb-6">
                          {milestone.title}
                        </h3>

                        <p className="text-n-400 text-base md:text-lg leading-relaxed max-w-lg mb-10">
                          {milestone.description}
                        </p>

                        <StatCounter stat={milestone.stat} isActive={activeIndex === i} />
                      </motion.div>
                    ))}
                    {/* Invisible spacer to reserve height */}
                    <div className="invisible">
                      <div className="mb-6"><span className="text-3xl">Spacer</span></div>
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Spacer text here.</h3>
                      <p className="text-lg mb-10">Spacer description that takes up space for layout consistency.</p>
                      <div className="text-5xl font-bold">000+</div>
                    </div>
                  </div>

                  {/* Right: Image */}
                  <div className="relative h-[50vh] lg:h-[65vh]">
                    {milestones.map((milestone, i) => (
                      <motion.div
                        key={i}
                        initial={false}
                        animate={{
                          opacity: activeIndex === i ? 1 : 0,
                          scale: activeIndex === i ? 1 : 1.05,
                        }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0"
                      >
                        <img
                          loading="lazy"
                          decoding="async"
                          src={milestone.image}
                          alt={milestone.title}
                          className="w-full h-full object-cover"
                        />
                        {/* Gitter overlay on image */}
                        <div className="absolute inset-0 bg-gitter opacity-60 mix-blend-overlay" />
                        <div className="absolute inset-0 bg-gradient-to-r from-n-950/60 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-n-950/40 to-transparent" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Milestone navigation dots at bottom */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {milestones.map((m, i) => (
              <div
                key={i}
                className={`h-[3px] transition-all duration-500 ${
                  i === activeIndex ? 'w-10 bg-idm' : 'w-4 bg-n-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Stats bar at bottom */}
      <div className="relative z-10 border-t border-n-800">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { val: '45+', label: 'Jahre Erfahrung' },
              { val: '800+', label: 'Mitarbeiter:innen' },
              { val: '1.500', label: 'kW max. Leistung' },
              { val: '4', label: 'Standorte in Europa' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-idm font-mono">{s.val}</div>
                <div className="text-xs font-mono text-n-500 mt-1 tracking-wider uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
