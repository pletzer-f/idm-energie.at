import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Heart, Mountain, Users, Award, Zap,
  Globe, Factory, Cpu, Leaf, ChevronLeft, ChevronRight, Shield, Flame, Trophy, Handshake
} from 'lucide-react'
import AnimateIn from '../components/animations/AnimateIn'
import { useCountUp } from '../hooks/useScrollAnimation'

/* ─── YC-style horizontal scrolling timeline ───────────────── */
const timelineItems = [
  { year: '1977', event: 'Gruendung durch Josef Pletzer in Matrei i. O.', highlight: true },
  { year: '1980', event: 'Erste Sole/Wasser-Waermepumpe in Serie' },
  { year: '1985', event: 'Ausbau der Produktion in Matrei' },
  { year: '1990', event: 'Marktfuehrer Waermepumpen in Oesterreich' },
  { year: '1995', event: 'Einfuehrung der TERRA-Produktlinie' },
  { year: '1998', event: 'EHPA Guetesiegel fuer alle Modelle' },
  { year: '2002', event: 'Erstes eigenes Forschungslabor' },
  { year: '2005', event: 'Launch NAVIGATOR Steuerungssystem', highlight: true },
  { year: '2008', event: 'Neues Werk: 10.000 m\u00b2 Produktionsflaeche' },
  { year: '2010', event: 'AERO Luft-Waermepumpen-Offensive' },
  { year: '2012', event: 'iPUMP Kompakt-Revolution', highlight: true },
  { year: '2015', event: 'Erweiterung auf 20.000 m\u00b2 Produktion' },
  { year: '2017', event: '40 Jahre iDM — 100.000 Waermepumpen' },
  { year: '2019', event: 'R290 natuerliches Kaeltemittel in Serie' },
  { year: '2020', event: 'iON KI-Technologie vorgestellt', highlight: true },
  { year: '2022', event: 'MAX Gross-Waermepumpen bis 1.500 kW' },
  { year: '2024', event: '800 Mitarbeiter:innen. Rekordproduktion.', highlight: true },
  { year: '2026', event: 'Neue iPUMP A ONE Generation mit R290', highlight: true },
]

function YCTimeline() {
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true })
      checkScroll()
      return () => el.removeEventListener('scroll', checkScroll)
    }
  }, [])

  const scroll = (dir) => {
    if (scrollRef.current) {
      const w = scrollRef.current.clientWidth * 0.6
      scrollRef.current.scrollBy({ left: dir === 'left' ? -w : w, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative">
      {/* Scroll controls */}
      <div className="absolute -top-16 right-0 flex items-center gap-2 z-10">
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className={`w-10 h-10 flex items-center justify-center border transition-all cursor-pointer ${
            canScrollLeft
              ? 'border-n-300 text-n-600 hover:border-n-900 hover:text-n-900'
              : 'border-n-100 text-n-200 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className={`w-10 h-10 flex items-center justify-center border transition-all cursor-pointer ${
            canScrollRight
              ? 'border-n-300 text-n-600 hover:border-n-900 hover:text-n-900'
              : 'border-n-100 text-n-200 cursor-not-allowed'
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Fade edges */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      )}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      )}

      {/* Scrollable timeline track */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto pb-6 gap-0 relative"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Horizontal line */}
        <div className="absolute top-[28px] left-0 right-0 h-[3px] bg-n-100" />

        {timelineItems.map((item, i) => (
          <div
            key={item.year}
            className="shrink-0 relative pt-[64px] group"
            style={{ width: item.highlight ? 220 : 160 }}
          >
            {/* Node dot — angular squares, not circles */}
            <div
              className={`absolute left-1 transition-all duration-300 ${
                item.highlight
                  ? 'w-5 h-5 bg-idm top-[18px]'
                  : 'w-3 h-3 bg-n-200 group-hover:bg-idm top-[22px]'
              }`}
            />
            {/* Connector stem to content */}
            <div className={`absolute left-[10px] w-[2px] ${item.highlight ? 'top-[43px] h-5 bg-idm' : 'top-[35px] h-5 bg-n-200'}`} />

            {/* Year */}
            <span
              className={`block font-mono font-bold tracking-wider ${
                item.highlight
                  ? 'text-lg md:text-xl text-n-900'
                  : 'text-sm text-n-400 group-hover:text-n-700'
              }`}
            >
              {item.year}
            </span>
            {/* Event description */}
            <p
              className={`mt-1.5 leading-snug pr-6 ${
                item.highlight
                  ? 'text-sm text-n-700 font-medium'
                  : 'text-[13px] text-n-400 group-hover:text-n-600'
              }`}
            >
              {item.event}
            </p>
          </div>
        ))}
        <div className="shrink-0 w-16" />
      </div>
    </div>
  )
}

/* ─── Pletzer Gruppe Values — immersive horizontal scroll reveal ─── */
const pletzerValues = [
  {
    title: 'Tradition',
    icon: Flame,
    number: '01',
    statement: 'Seit 1977. Verwurzelt in Tirol.',
    desc: 'Was als Tiroler Pionierarbeit in Matrei begann, ist heute die Grundlage fuer Oesterreichs groessten Waermepumpen-Hersteller. Unsere Geschichte gibt uns Staerke.',
    detail: 'Familiegefuehrt in zweiter Generation. Entscheidungen werden langfristig getroffen — nicht quartalsweise.',
  },
  {
    title: 'Verantwortung',
    icon: Shield,
    number: '02',
    statement: 'Fuer Mensch und Umwelt.',
    desc: 'Wir tragen Verantwortung — fuer 800 Familien, fuer die Region Osttirol, und fuer die Zukunft unseres Planeten. Jede Waermepumpe ist ein Beitrag.',
    detail: 'R290 Kaeltemittel, Oekostrom in der Produktion, CO2-reduzierte Lieferketten.',
  },
  {
    title: 'Innovation',
    icon: Zap,
    number: '03',
    statement: 'Technologie, die vorausdenkt.',
    desc: 'Eigenes F&E-Zentrum, eigene Software, eigene KI. Wir entwickeln nicht nur Waermepumpen — wir definieren die Zukunft der Waermeversorgung.',
    detail: 'iON KI-Steuerung, NAVIGATOR 2.0, 15+ Patente, 2.000 Stunden Pruefstandtests pro Modell.',
  },
  {
    title: 'Leistung',
    icon: Trophy,
    number: '04',
    statement: 'Von 2 bis 1.500 kW.',
    desc: 'Kompromisslose Qualitaet in jeder Leistungsklasse. Vom Einfamilienhaus bis zum Industriekomplex — alles aus einer Hand, alles Made in Austria.',
    detail: 'EHPA-Guetesiegel, ISO 9001, ISO 14001 — jedes Geraet wird in Matrei getestet.',
  },
  {
    title: 'Vertrauen',
    icon: Handshake,
    number: '05',
    statement: 'Partner auf Augenhoehe.',
    desc: '500+ Fachpartner, 10+ Laender, 100.000+ installierte Waermepumpen. Vertrauen entsteht durch Zuverlaessigkeit — und die liefern wir. Jeden Tag.',
    detail: 'Eigener 24/7 After-Sales Service. Schulungszentrum fuer Fachpartner. Regionale Praesenz.',
  },
]

function PletzerValues() {
  const [activeValue, setActiveValue] = useState(0)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <div ref={containerRef} className="relative">
      {/* Value selector — vertical tabs on left, content on right */}
      <div className="grid lg:grid-cols-[280px,1fr] gap-0">
        {/* Left: Value navigation */}
        <div className="flex lg:flex-col border-b lg:border-b-0 lg:border-r border-n-800 overflow-x-auto lg:overflow-visible">
          {pletzerValues.map((v, i) => {
            const VIcon = v.icon
            const isActive = i === activeValue
            return (
              <button
                key={v.title}
                onClick={() => setActiveValue(i)}
                className={`group relative flex items-center gap-4 px-5 lg:px-6 py-4 lg:py-5 text-left transition-all duration-300 cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-idm/5'
                    : 'hover:bg-white/[0.02]'
                }`}
              >
                {/* Active indicator — left edge bar */}
                {isActive && (
                  <motion.div
                    layoutId="valueIndicator"
                    className="absolute left-0 top-0 bottom-0 w-[3px] bg-idm hidden lg:block"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
                {/* Mobile active indicator — bottom bar */}
                {isActive && (
                  <motion.div
                    layoutId="valueIndicatorMobile"
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-idm lg:hidden"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}

                <span className={`text-[10px] font-mono font-bold tracking-widest transition-colors ${
                  isActive ? 'text-idm' : 'text-n-700'
                }`}>
                  {v.number}
                </span>

                <VIcon className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive ? 'text-idm' : 'text-n-600'
                }`} />

                <span className={`text-sm font-semibold tracking-wide transition-colors whitespace-nowrap ${
                  isActive ? 'text-white' : 'text-n-500'
                }`}>
                  {v.title}
                </span>
              </button>
            )
          })}
        </div>

        {/* Right: Active value content */}
        <div className="relative min-h-[360px] lg:min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeValue}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="px-6 lg:px-12 py-8 lg:py-10"
            >
              {/* Large number watermark */}
              <div className="absolute top-4 right-6 lg:right-10 text-[120px] lg:text-[180px] font-bold text-white/[0.02] font-mono leading-none select-none pointer-events-none">
                {pletzerValues[activeValue].number}
              </div>

              {/* Value title */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[2px] bg-idm" />
                <span className="text-[11px] font-mono text-idm uppercase tracking-[0.25em]">
                  Pletzer Werte
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em] mb-3">
                {pletzerValues[activeValue].title}<span className="text-idm">.</span>
              </h3>

              <p className="text-lg md:text-xl text-white/80 font-semibold mb-5 tracking-[-0.01em]">
                {pletzerValues[activeValue].statement}
              </p>

              <p className="text-n-400 text-sm md:text-base leading-relaxed max-w-xl mb-6">
                {pletzerValues[activeValue].desc}
              </p>

              {/* Detail line with accent */}
              <div className="flex items-start gap-3 p-4 border border-n-800 bg-white/[0.02] max-w-xl">
                <div className="w-1.5 h-1.5 bg-idm mt-1.5 shrink-0" />
                <p className="text-xs font-mono text-n-500 leading-relaxed">
                  {pletzerValues[activeValue].detail}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom progress strip */}
      <div className="flex h-[2px]">
        {pletzerValues.map((_, i) => (
          <div key={i} className={`flex-1 transition-all duration-500 ${i <= activeValue ? 'bg-idm' : 'bg-n-800'}`} />
        ))}
      </div>
    </div>
  )
}

/* ─── Main Page ────────────────────────────────────────────── */
export default function UeberUnsPage() {
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true })

  return (
    <div className="bg-white">
      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative bg-n-950 overflow-hidden h-[600px] lg:h-[680px]">
        <div className="absolute inset-0 bg-gitter-dark pointer-events-none" />
        <div className="absolute inset-0 bg-grid-fine opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 h-full">
          <div className="grid lg:grid-cols-2 gap-10 items-center h-full pt-20 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Link to="/" className="inline-flex items-center gap-2 text-n-500 text-xs font-mono tracking-wider hover:text-white transition-colors mb-6">
                <ArrowLeft className="w-3 h-3" /> STARTSEITE
              </Link>

              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-5 h-5 text-idm" />
                <span className="text-[11px] font-mono text-idm uppercase tracking-[0.2em]">Unternehmen</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em] leading-[1.05]">
                Die Energie-Familie{'\n'}
                <span className="text-gradient-idm">aus Tirol.</span>
              </h1>

              <p className="mt-5 text-n-400 text-sm md:text-base leading-relaxed max-w-lg">
                Seit 1977 entwickeln und fertigen wir Waermepumpen in Matrei in Osttirol.
                Was als Tiroler Pionierarbeit begann, ist heute Oesterreichs groesster
                Waermepumpen-Hersteller — familiengefuehrt, mit 800 Mitarbeiter:innen.
              </p>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: '1977', label: 'Gegruendet' },
                  { value: '800', label: 'Mitarbeiter:innen' },
                  { value: '100%', label: 'Made in Austria' },
                  { value: '4', label: 'Standorte' },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="bg-white/[0.04] border border-n-800 p-2.5"
                  >
                    <span className="text-lg font-mono font-bold text-idm block">{s.value}</span>
                    <span className="text-[10px] font-mono text-n-600 tracking-wider block mt-0.5">{s.label.toUpperCase()}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img loading="lazy" decoding="async" src="/images/hq-building.jpg" alt="iDM Headquarter Matrei" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gitter opacity-40 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-n-950/40" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── YC-style Timeline ──────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <AnimateIn variant="fadeUp" className="mb-14">
            <span className="text-[11px] font-mono font-semibold text-n-400 uppercase tracking-[0.2em]">Geschichte</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-n-900 tracking-[-0.02em]">
              Seit 1977. <span className="text-gradient-idm">Immer voraus.</span>
            </h2>
            <p className="mt-3 text-sm text-n-500 max-w-lg leading-relaxed">
              Von der ersten Waermepumpe in einer Tiroler Werkstatt zum fuehrenden
              Hersteller Oesterreichs — eine Geschichte der Innovation.
            </p>
          </AnimateIn>

          <YCTimeline />
        </div>
      </section>

      {/* ── Geschaeftsfuehrung ─────────────────────────── */}
      <section className="py-20 lg:py-28 bg-n-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <AnimateIn variant="fadeUp" className="mb-12">
            <span className="text-[11px] font-mono font-semibold text-n-400 uppercase tracking-[0.2em]">Fuehrung</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-n-900 tracking-[-0.02em]">
              Geschaeftsfuehrung.
            </h2>
          </AnimateIn>

          <div className="grid md:grid-cols-2 gap-3 max-w-3xl">
            {[
              {
                name: 'Thomas Pletzer',
                role: 'Geschaeftsfuehrer',
                focus: 'Vertrieb, Marketing & Strategie',
                desc: 'Thomas Pletzer fuehrt iDM in der zweiten Generation und treibt die internationale Expansion des Unternehmens voran.',
              },
              {
                name: 'Christoph Bacher',
                role: 'Geschaeftsfuehrer',
                focus: 'Technik, Produktion & Innovation',
                desc: 'Christoph Bacher verantwortet die technische Weiterentwicklung und die Produktionskapazitaeten am Standort Matrei.',
              },
            ].map((person, i) => (
              <AnimateIn key={person.name} variant="fadeUp" delay={i * 0.1}>
                <div className="bg-white border border-n-100 p-6 lg:p-8 h-full">
                  <div className="w-16 h-16 bg-n-100 flex items-center justify-center mb-5">
                    <span className="text-xl font-bold text-n-400 font-mono">
                      {person.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-n-900 mb-0.5">{person.name}</h3>
                  <span className="text-[11px] font-mono text-idm-dark tracking-wider">{person.role.toUpperCase()}</span>
                  <p className="mt-1 text-[12px] text-n-500 font-mono">{person.focus}</p>
                  <p className="mt-4 text-sm text-n-600 leading-relaxed">{person.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pletzer Gruppe Values — immersive dark section ──── */}
      <section className="py-20 lg:py-28 bg-n-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gitter-dark pointer-events-none" />
        <div className="absolute inset-0 bg-grid-fine opacity-10 pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
          <AnimateIn variant="fadeUp" className="mb-12">
            <span className="text-[11px] font-mono font-semibold text-n-500 uppercase tracking-[0.2em]">Werte der Pletzer Gruppe</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-white tracking-[-0.02em]">
              Was uns antreibt<span className="text-idm">.</span>
            </h2>
            <p className="mt-3 text-sm text-n-500 max-w-lg leading-relaxed">
              Als Teil der Pletzer Gruppe teilen wir fuenf Grundwerte, die
              unser Handeln seit Generationen praegen.
            </p>
          </AnimateIn>

          <PletzerValues />
        </div>
      </section>

      {/* ── Production Image ───────────────────────────── */}
      <section className="relative">
        <div className="aspect-[21/9] lg:aspect-[3/1] relative overflow-hidden">
          <img loading="lazy" decoding="async" src="/images/factory-aerial.jpg" alt="iDM Produktion Matrei" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gitter opacity-40 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-n-950/80 via-n-950/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
            <div className="max-w-[1400px] mx-auto">
              <span className="text-[10px] font-mono text-n-400 tracking-wider block mb-2">HAUPTSITZ & PRODUKTION</span>
              <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-[-0.02em]">
                Matrei in Osttirol — Alles unter einem Dach.
              </h3>
              <p className="mt-2 text-sm text-n-400 max-w-lg">
                Entwicklung, Produktion, Logistik und Service — 20.000 m\u00b2 am Fusse des Grossglockners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────── */}
      <section className="bg-n-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gitter-dark pointer-events-none" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.02em]">
                Werden Sie Teil der iDM Familie.
              </h3>
              <p className="text-n-500 text-sm mt-2 max-w-lg">
                800 Kolleg:innen warten auf Sie. Entdecken Sie offene Stellen.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/unternehmen/karriere"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-idm hover:bg-idm-dark text-n-900 font-semibold text-sm transition-all"
              >
                Karriere entdecken
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/unternehmen/innovation"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 text-white hover:border-white/30 text-sm font-medium transition-all"
              >
                Innovation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
