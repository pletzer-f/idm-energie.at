import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Leaf, Droplets, Sun, Wind, Recycle,
  TreePine, Zap, Factory, BarChart3, CheckCircle2, Globe, Mountain
} from 'lucide-react'
import AnimateIn from '../components/animations/AnimateIn'

/* ─── Sustainability Pillars ───────────────────────────────── */
const pillars = [
  {
    icon: Leaf,
    title: 'Produkt',
    headline: 'Emissionsfreie Waerme.',
    stats: [
      { value: '0', unit: 'g CO₂', desc: 'im Betrieb mit Oekostrom' },
      { value: 'R290', unit: '', desc: 'natuerliches Kaeltemittel, GWP 3' },
      { value: 'COP 5+', unit: '', desc: 'hoechste Effizienz am Markt' },
    ],
    details: [
      'Natuerliches Kaeltemittel R290 in allen neuen Produkten',
      'CO₂-frei heizen mit Oekostrom oder eigener PV-Anlage',
      'Bis zu 80% weniger Primaerenergie als fossile Heizungen',
      'Smart Grid Ready fuer optimale PV-Eigennutzung',
    ],
  },
  {
    icon: Factory,
    title: 'Produktion',
    headline: 'Gruen gefertigt.',
    stats: [
      { value: '100%', unit: '', desc: 'Oekostrom am Standort Matrei' },
      { value: '800 kWp', unit: '', desc: 'PV-Anlage auf dem Dach' },
      { value: '-40%', unit: '', desc: 'Energieverbrauch seit 2018' },
    ],
    details: [
      '800 kWp Photovoltaik-Anlage am Werksdach',
      'Waermerueckgewinnung aus der Produktion',
      'LED-Beleuchtung und intelligente Gebaeudesteuerung',
      'Kontinuierliche Reduktion des Ressourcenverbrauchs',
    ],
  },
  {
    icon: Recycle,
    title: 'Kreislauf',
    headline: 'Designed fuer Langlebigkeit.',
    stats: [
      { value: '20+', unit: 'Jahre', desc: 'durchschnittliche Lebensdauer' },
      { value: '95%', unit: '', desc: 'recycelbare Materialien' },
      { value: '0', unit: '', desc: 'geplante Obsoleszenz' },
    ],
    details: [
      'Modularer Aufbau fuer einfache Reparatur',
      'Ersatzteilverfuegbarkeit ueber 15 Jahre garantiert',
      'Stahl und Aluminium zu 95% recycelbar',
      'Software-Updates verlaengern die Lebensdauer',
    ],
  },
]

/* ─── Environmental Commitments ────────────────────────────── */
const commitments = [
  { icon: TreePine, title: 'CO₂-neutral bis 2030', desc: 'Unser Ziel: CO₂-neutraler Betrieb aller Standorte bis 2030.' },
  { icon: Droplets, title: 'Wasserkreislauf', desc: 'Geschlossener Wasserkreislauf in der Produktion — kein Abwasser.' },
  { icon: Sun, title: 'Solarenergie', desc: '800 kWp PV am Werksdach — deckt 30% des Strombedarfs.' },
  { icon: Wind, title: 'Oekostrom', desc: '100% Strom aus erneuerbaren Quellen am Standort Matrei.' },
  { icon: Mountain, title: 'Regionale Wertschoepfung', desc: 'Zulieferer aus Oesterreich und der EU — kurze Transportwege.' },
  { icon: Globe, title: 'EU-Taxonomie konform', desc: 'Unsere Produkte erfuellen die EU-Taxonomie fuer nachhaltige Investments.' },
]

/* ─── Impact Numbers ───────────────────────────────────────── */
const impactNumbers = [
  { value: '500.000', label: 'Tonnen CO₂ eingespart', sub: 'durch installierte iDM Waermepumpen' },
  { value: '150.000', label: 'Haushalte emissionsfrei', sub: 'heizen mit iDM Waermepumpen' },
  { value: '100%', label: 'Oekostrom', sub: 'am Standort Matrei i. O.' },
  { value: '2030', label: 'CO₂-neutral', sub: 'Ziel fuer alle Standorte' },
]

/* ─── Main Page ────────────────────────────────────────────── */
export default function NachhaltigkeitPage() {
  return (
    <div className="bg-white">
      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative bg-n-950 overflow-hidden min-h-[600px] lg:min-h-[680px]">
        <div className="absolute inset-0 bg-gitter-dark pointer-events-none" />
        <div className="absolute inset-0 bg-grid-fine opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center min-h-[600px] lg:min-h-[680px] pt-24 pb-12 lg:pt-0 lg:pb-0">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <Link to="/" className="inline-flex items-center gap-2 text-n-500 text-xs font-mono tracking-wider hover:text-white transition-colors mb-6">
                <ArrowLeft className="w-3 h-3" /> STARTSEITE
              </Link>

              <div className="flex items-center gap-3 mb-4">
                <Leaf className="w-5 h-5 text-idm" />
                <span className="text-[11px] font-mono text-idm uppercase tracking-[0.2em]">Nachhaltigkeit</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em] leading-[1.05]">
                Fuer eine saubere{'\n'}
                <span className="text-gradient-idm">Zukunft.</span>
              </h1>

              <p className="mt-5 text-n-400 text-sm md:text-base leading-relaxed max-w-lg">
                Nachhaltigkeit ist kein Trend — es ist unser Antrieb. Jede iDM Waermepumpe
                spart CO₂, jeder Produktionsprozess wird gruener, jedes Produkt ist auf
                Langlebigkeit ausgelegt.
              </p>

              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
                {impactNumbers.map((s, i) => (
                  <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                    className="bg-white/[0.04] border border-n-800 p-2.5"
                  >
                    <span className="text-lg font-mono font-bold text-idm block">{s.value}</span>
                    <span className="text-[10px] font-mono text-n-600 tracking-wider block mt-0.5">{s.label.toUpperCase()}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative hidden lg:block">
              <div className="aspect-[4/3] relative overflow-hidden">
                <img loading="lazy" decoding="async" src="/images/aero-garden.jpeg" alt="Waermepumpe im Gruenen" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gitter opacity-40 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-n-950/40" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Sustainability Pillars ─────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <AnimateIn variant="fadeUp" className="mb-14">
            <span className="text-[11px] font-mono font-semibold text-n-400 uppercase tracking-[0.2em]">Strategie</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-n-900 tracking-[-0.02em]">
              Drei Sauelen der Nachhaltigkeit.
            </h2>
          </AnimateIn>

          <div className="space-y-3">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon
              return (
                <AnimateIn key={pillar.title} variant="fadeUp" delay={i * 0.1}>
                  <div className="border border-n-100 p-6 lg:p-10 hover:border-idm/20 transition-colors">
                    <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-16">
                      {/* Left */}
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-idm/10 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-idm" />
                          </div>
                          <span className="text-[10px] font-mono font-bold text-n-400 uppercase tracking-[0.2em]">
                            {pillar.title}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-n-900 tracking-[-0.02em] mb-4">
                          {pillar.headline}
                        </h3>

                        {/* Stats row */}
                        <div className="grid grid-cols-3 gap-3">
                          {pillar.stats.map((stat) => (
                            <div key={stat.desc} className="bg-n-50 p-3">
                              <span className="text-lg font-mono font-bold text-n-900 block">
                                {stat.value}<span className="text-sm text-n-500 ml-0.5">{stat.unit}</span>
                              </span>
                              <span className="text-[10px] text-n-500 leading-tight block mt-0.5">{stat.desc}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right — details */}
                      <div className="flex flex-col justify-center">
                        <div className="space-y-3">
                          {pillar.details.map((detail) => (
                            <div key={detail} className="flex items-start gap-3">
                              <CheckCircle2 className="w-4 h-4 text-idm shrink-0 mt-0.5" />
                              <span className="text-sm text-n-700 leading-relaxed">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimateIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Environmental Commitments ──────────────────── */}
      <section className="py-20 lg:py-28 bg-n-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <AnimateIn variant="fadeUp" className="mb-12">
            <span className="text-[11px] font-mono font-semibold text-n-400 uppercase tracking-[0.2em]">Engagement</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-n-900 tracking-[-0.02em]">
              Unsere Verpflichtungen.
            </h2>
          </AnimateIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {commitments.map((c, i) => {
              const Icon = c.icon
              return (
                <AnimateIn key={c.title} variant="fadeUp" delay={i * 0.08}>
                  <div className="bg-white border border-n-100 p-6 h-full hover:border-idm/20 transition-colors">
                    <div className="w-10 h-10 bg-n-100 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-n-600" />
                    </div>
                    <h3 className="text-base font-bold text-n-900 mb-1">{c.title}</h3>
                    <p className="text-sm text-n-500 leading-relaxed">{c.desc}</p>
                  </div>
                </AnimateIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Impact Image Strip ─────────────────────────── */}
      <section className="relative">
        <div className="aspect-[21/9] lg:aspect-[3/1] relative overflow-hidden">
          <img loading="lazy" decoding="async" src="/images/factory-aerial.jpg" alt="iDM Werk mit PV" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gitter opacity-40 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-n-950/80 via-n-950/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
            <div className="max-w-[1400px] mx-auto">
              <span className="text-[10px] font-mono text-idm tracking-wider block mb-2">800 kWp PV-ANLAGE</span>
              <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-[-0.02em]">
                Sonne statt Fossil. Auf dem Dach unseres Werks.
              </h3>
              <p className="mt-2 text-sm text-n-400 max-w-lg">
                Unsere PV-Anlage deckt 30% des jaehrlichen Strombedarfs und spart ueber 200 Tonnen CO₂ pro Jahr.
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
                Heizen Sie emissionsfrei.
              </h3>
              <p className="text-n-500 text-sm mt-2 max-w-lg">
                Konfigurieren Sie Ihre iDM Waermepumpe und erfahren Sie, wie viel CO₂ Sie einsparen.
              </p>
            </div>
            <div className="flex gap-3">
              <a href="https://konfigurator.myidm.at/#/" target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-idm hover:bg-idm-dark text-n-900 font-semibold text-sm transition-all"
              >
                Konfigurieren <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link to="/unternehmen/innovation"
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
