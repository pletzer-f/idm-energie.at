import { useParams, Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion'
import { useRef, useState } from 'react'
import { ArrowRight, ArrowLeft, CheckCircle2, Home, RefreshCw, Building2, Phone, FileText, Wrench, Zap, CheckCircle } from 'lucide-react'
import AnimateIn from '../components/animations/AnimateIn'

const stepIcons = [Phone, FileText, Zap, Wrench, CheckCircle]

const solutionData = {
  neubau: {
    title: 'Neubau',
    headline: 'Perfekt von Anfang an.\nIhre Waermepumpe fuer den Neubau.',
    description: 'Im Neubau haben Sie die Freiheit, von Beginn an auf die effizienteste Heiztechnologie zu setzen. Niedrige Vorlauftemperaturen, Fussbodenheizung und optimale Daemmung machen die Waermepumpe zur idealen Loesung.',
    icon: Home,
    heroImage: '/images/house-cutaway-hq.jpg',
    stats: [
      { value: '35°C', label: 'Vorlauftemperatur' },
      { value: 'COP 5+', label: 'Effizienz' },
      { value: '80%', label: 'Foerderung moegl.' },
      { value: '0', label: 'CO₂-Emissionen' },
    ],
    benefits: [
      'Niedrige Vorlauftemperaturen fuer maximale Effizienz',
      'Fussbodenheizung und Kuehlung in einem System',
      'Attraktive Foerderungen fuer Neubauten',
      'Keine fossilen Brennstoffe — kein Kamin noetig',
      'Intelligente Steuerung mit NAVIGATOR und iON',
      'Wartungsarm und langlebig',
    ],
    recommendedProducts: [
      { name: 'AERO ALM 2-8', type: 'Luft/Wasser', reason: 'Kompakt, modulierend, ideal fuer Niedrigenergiehaeuser', href: '/produkte/luft-waermepumpen' },
      { name: 'iPUMP A ONE', type: 'All-in-One', reason: 'Waermepumpe + Speicher in einem, minimale Stellflaeche', href: '/produkte/ipump' },
      { name: 'TERRA SWM 3-13', type: 'Sole/Wasser', reason: 'Hoechste Effizienz mit Erdwaerme, passive Kuehlung', href: '/produkte/erdwaermepumpen' },
    ],
    steps: [
      { title: 'Beratung', desc: 'Ihr iDM Fachpartner beraet Sie vor Ort und analysiert Ihr Projekt.' },
      { title: 'Planung', desc: 'Heizlastberechnung, Systemauslegung und Angebotserstellung.' },
      { title: 'Foerderung', desc: 'Wir unterstuetzen bei Foerderantraegen — bis zu 80% Foerderung moeglich.' },
      { title: 'Installation', desc: 'Professionelle Installation durch zertifizierte Fachpartner.' },
      { title: 'Inbetriebnahme', desc: 'Hydraulischer Abgleich, Systemoptimierung und Einweisung.' },
    ],
  },
  sanierung: {
    title: 'Sanierung',
    headline: 'Raus aus Oel und Gas.\nRein in die Zukunft.',
    description: 'Auch im Altbau funktioniert eine Waermepumpe hervorragend. Unsere Hochtemperatur-Modelle erreichen Vorlauftemperaturen bis 70°C — fuer bestehende Heizkoerper ohne aufwaendigen Umbau.',
    icon: RefreshCw,
    heroImage: '/images/house-diagram.jpeg',
    stats: [
      { value: '70°C', label: 'Vorlauftemperatur' },
      { value: 'COP 3.8', label: 'Effizienz' },
      { value: '75%', label: 'Foerderung moegl.' },
      { value: '-100%', label: 'CO₂-Reduktion' },
    ],
    benefits: [
      'Vorlauftemperaturen bis 70°C fuer bestehende Heizkoerper',
      'Kein Kaminsanierung noetig — kein Rauchfang',
      'Attraktive Sanierungsfoerderungen von Bund und Land',
      'Kombinierbar mit bestehenden Solarthermie-Anlagen',
      'iPUMP N5 speziell fuer Mehrfamilien-Sanierung',
      'Leiser Betrieb auch in dichten Wohngebieten',
    ],
    recommendedProducts: [
      { name: 'AERO ALM 4-12', type: 'Luft/Wasser', reason: 'Modulierend bis 70°C, ideal fuer Sanierung', href: '/produkte/luft-waermepumpen' },
      { name: 'TERRA SW TWIN H', type: 'Hochtemperatur', reason: 'Twin-Kompressor fuer 70°C Vorlauf, hoechste Effizienz', href: '/produkte/erdwaermepumpen' },
      { name: 'iPUMP N5', type: 'Sanierung MFH', reason: 'Die Sanierungsloesung fuer Mehrfamilienhaeuser', href: '/produkte/ipump' },
    ],
    steps: [
      { title: 'Bestandsaufnahme', desc: 'Analyse des bestehenden Heizsystems, Heizkoerper und Daemmung.' },
      { title: 'Systemauswahl', desc: 'Heizlastberechnung und Auswahl der optimalen Waermepumpe.' },
      { title: 'Foerderung', desc: 'Foerderantraege fuer Sanierung — Raus aus Oel und Gas Bonus.' },
      { title: 'Umbau', desc: 'Demontage der alten Heizung und Installation der Waermepumpe.' },
      { title: 'Optimierung', desc: 'Hydraulischer Abgleich und Feinabstimmung fuer maximale Effizienz.' },
    ],
  },
  gewerbe: {
    title: 'Gewerbe & Industrie',
    headline: 'Grosse Projekte.\nGrosse Leistung.',
    description: 'Hotels, Wohnanlagen, Bueros, Produktionsstaetten — unsere MAX-Systeme liefern bis zu 1.500 kW durch intelligente Kaskadierung. Mit BACnet/Modbus Integration fuer Gebaeudeautomation.',
    icon: Building2,
    heroImage: '/images/aero-outdoor-units.jpg',
    stats: [
      { value: '1.500', label: 'kW Heizleistung' },
      { value: '10x', label: 'Kaskadierung' },
      { value: 'BACnet', label: 'Integration' },
      { value: '24/7', label: 'Monitoring' },
    ],
    benefits: [
      'Kaskadierung bis 1.500 kW fuer jede Projektgroesse',
      'BACnet und Modbus Schnittstellen fuer Gebaeudeautomation',
      'Redundanz durch mehrere Geraete — kein Totalausfall',
      'Zentrale Ueberwachung aller Anlagen via myiDM Portal',
      'Foerderungen fuer gewerbliche Waermepumpen-Projekte',
      'Kombination Heizen und Kuehlen fuer Buerogebaeude',
    ],
    recommendedProducts: [
      { name: 'MAX ALM 10-50', type: 'Luft/Wasser', reason: 'Kaskadierbar, ideal fuer mittelgrosse Gewerbegebaeude', href: '/produkte/grosswaermepumpen' },
      { name: 'MAX SW 140', type: 'Sole/Wasser', reason: '140 kW Leistung auf nur 1 m² Stellflaeche', href: '/produkte/grosswaermepumpen' },
      { name: 'NAVIGATOR 2.0', type: 'Steuerung', reason: 'Intelligentes Energiemanagement fuer alle Anlagen', href: '/produkte/navigator' },
    ],
    steps: [
      { title: 'Projektanalyse', desc: 'Bedarfsermittlung, Lastprofile und Machbarkeitsstudie.' },
      { title: 'Systemplanung', desc: 'Hydraulikschema, Kaskadierung und Schnittstellenplanung.' },
      { title: 'Ausschreibung', desc: 'Ausschreibungstexte und Leistungsverzeichnisse fuer Planer.' },
      { title: 'Installation', desc: 'Professionelle Installation durch zertifizierte Fachbetriebe.' },
      { title: 'Monitoring', desc: 'Fernueberwachung, Wartungsvertraege und 24/7 Stoerungsdienst.' },
    ],
  },
}

/* ─── Animated "Ihr Weg" Pipeline Section ─────────────────────── */
function IhrWegPipeline({ steps }) {
  const containerRef = useRef(null)
  const [activeStep, setActiveStep] = useState(-1)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const pathScale = useTransform(smoothProgress, [0.15, 0.75], [0, 1])

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const stepProgress = (latest - 0.15) / 0.6
    const index = Math.floor(stepProgress * steps.length)
    setActiveStep(Math.min(steps.length - 1, Math.max(-1, index)))
  })

  return (
    <section ref={containerRef} className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-fine opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <AnimateIn variant="fadeUp" className="mb-16">
          <span className="text-[11px] font-mono font-semibold text-n-400 uppercase tracking-[0.2em]">Ihr Weg</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-n-900 tracking-[-0.02em]">
            Von der Beratung <span className="text-gradient-idm">zur Waerme.</span>
          </h2>
        </AnimateIn>

        {/* Pipeline with steps */}
        <div className="relative">
          {/* Vertical pipeline track — desktop only */}
          <div className="hidden lg:block absolute left-[28px] top-0 bottom-0 w-[2px]">
            <div className="absolute inset-0 bg-n-200" />
            <motion.div
              className="absolute top-0 left-0 w-full bg-idm origin-top"
              style={{ scaleY: pathScale, height: '100%' }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-0">
            {steps.map((step, i) => {
              const isActive = i <= activeStep
              const isCurrent = i === activeStep
              const StepIcon = stepIcons[i] || CheckCircle

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative lg:pl-20 py-6 lg:py-10"
                >
                  {/* Pipeline node */}
                  <div
                    className={`
                      hidden lg:flex absolute left-[12px] top-1/2 -translate-y-1/2
                      w-[34px] h-[34px] items-center justify-center border-2
                      transition-all duration-500 ease-out z-10
                      ${isActive ? 'bg-idm border-idm shadow-lg shadow-idm/20' : 'bg-white border-n-300'}
                    `}
                  >
                    <StepIcon className={`w-4 h-4 transition-colors duration-500 ${isActive ? 'text-n-900' : 'text-n-400'}`} />
                  </div>

                  {/* Step card */}
                  <div
                    className={`
                      border p-6 lg:p-8 transition-all duration-500
                      ${isCurrent ? 'border-idm/30 bg-idm/[0.02] shadow-lg shadow-idm/5' : isActive ? 'border-n-200 bg-white' : 'border-n-100 bg-n-50'}
                    `}
                  >
                    <div className="flex items-start gap-5">
                      {/* Mobile icon */}
                      <div className={`
                        lg:hidden w-10 h-10 flex items-center justify-center border-2 shrink-0
                        transition-all duration-500
                        ${isActive ? 'bg-idm border-idm' : 'bg-white border-n-200'}
                      `}>
                        <StepIcon className={`w-4 h-4 ${isActive ? 'text-n-900' : 'text-n-400'}`} />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`
                            text-[10px] font-mono font-semibold uppercase tracking-[0.2em]
                            transition-colors duration-500
                            ${isActive ? 'text-idm-dark' : 'text-n-300'}
                          `}>
                            Schritt {String(i + 1).padStart(2, '0')}
                          </span>
                          {isCurrent && (
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: 32 }}
                              className="h-[2px] bg-idm"
                            />
                          )}
                        </div>
                        <h3 className={`
                          text-lg md:text-xl font-bold tracking-[-0.02em]
                          transition-colors duration-500
                          ${isActive ? 'text-n-950' : 'text-n-400'}
                        `}>
                          {step.title}
                        </h3>
                        <p className={`
                          mt-2 text-sm leading-relaxed max-w-lg
                          transition-colors duration-500
                          ${isActive ? 'text-n-600' : 'text-n-300'}
                        `}>
                          {step.desc}
                        </p>
                      </div>

                      {/* Step number — decorative */}
                      <span className={`
                        hidden md:block text-4xl font-bold font-mono shrink-0 transition-colors duration-500
                        ${isActive ? 'text-idm/20' : 'text-n-100'}
                      `}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Solution Page ───────────────────────────────────────────── */
export default function SolutionPage() {
  const { slug } = useParams()
  const solution = solutionData[slug]

  if (!solution) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-n-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-n-900 mb-4">Loesung nicht gefunden</h1>
          <Link to="/" className="text-idm-dark font-semibold text-sm">Zur Startseite</Link>
        </div>
      </div>
    )
  }

  const Icon = solution.icon

  return (
    <div className="bg-white">
      {/* ── Hero — same fixed height as product pages ─── */}
      <section className="relative bg-n-950 overflow-hidden h-[600px] lg:h-[680px]">
        <div className="absolute inset-0 bg-gitter-dark pointer-events-none" />
        <div className="absolute inset-0 bg-grid-fine opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 h-full">
          <div className="grid lg:grid-cols-2 gap-10 items-center h-full pt-20 lg:pt-16">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <Link to="/" className="inline-flex items-center gap-2 text-n-500 text-xs font-mono tracking-wider hover:text-white transition-colors mb-6">
                <ArrowLeft className="w-3 h-3" /> STARTSEITE
              </Link>

              <div className="flex items-center gap-3 mb-4">
                <Icon className="w-5 h-5 text-idm" />
                <span className="text-[11px] font-mono text-idm uppercase tracking-[0.2em]">Loesungen</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em] whitespace-pre-line leading-[1.05]">
                {solution.headline}
              </h1>

              <p className="mt-5 text-n-400 text-sm md:text-base leading-relaxed max-w-lg">
                {solution.description}
              </p>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
                {solution.stats.map((s, i) => (
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

              <div className="mt-8 flex gap-3">
                <a href="https://konfigurator.myidm.at/#/" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 px-6 py-3 bg-idm hover:bg-idm-dark text-n-900 font-semibold text-sm transition-all">
                  Jetzt konfigurieren <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <Link to="/tools/partnerfinder" className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 text-white hover:border-white/30 text-sm font-medium transition-all">
                  Beratung anfragen
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex items-center justify-center"
            >
              <div className="aspect-[4/3] relative overflow-hidden w-full">
                <img loading="lazy" decoding="async" src={solution.heroImage} alt={solution.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gitter opacity-40 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-n-950/40" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Benefits checklist ────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <AnimateIn variant="fadeUp" className="mb-12">
            <span className="text-[11px] font-mono font-semibold text-n-400 uppercase tracking-[0.2em]">Ihre Vorteile</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-n-900 tracking-[-0.02em]">
              Warum {solution.title} mit iDM?
            </h2>
          </AnimateIn>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
            {solution.benefits.map((b, i) => (
              <AnimateIn key={b} variant="fadeUp" delay={i * 0.05}>
                <div className="flex items-start gap-3 py-3 border-b border-n-100">
                  <CheckCircle2 className="w-5 h-5 text-idm shrink-0 mt-0.5" />
                  <span className="text-sm text-n-700 leading-relaxed">{b}</span>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recommended products ──────────────────────── */}
      <section className="py-20 lg:py-28 bg-n-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <AnimateIn variant="fadeUp" className="mb-12">
            <span className="text-[11px] font-mono font-semibold text-n-400 uppercase tracking-[0.2em]">Empfohlene Produkte</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-n-900 tracking-[-0.02em]">
              Die richtige Waermepumpe fuer {solution.title}.
            </h2>
          </AnimateIn>

          <div className="grid md:grid-cols-3 gap-2">
            {solution.recommendedProducts.map((p, i) => (
              <AnimateIn key={p.name} variant="fadeUp" delay={i * 0.1}>
                <Link to={p.href} className="group block bg-white p-6 lg:p-8 hover:bg-n-100/50 transition-all duration-300 relative h-full">
                  <span className="text-[10px] font-mono text-idm-dark tracking-[0.2em] block mb-3">{p.type}</span>
                  <h3 className="text-xl font-bold text-n-900 mb-2">{p.name}</h3>
                  <p className="text-sm text-n-500 leading-relaxed mb-5">{p.reason}</p>
                  <span className="flex items-center gap-2 text-xs font-semibold text-n-900 group-hover:text-idm-dark transition-colors">
                    Produkt ansehen <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-idm transition-all duration-500" />
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ihr Weg — Animated energy pipeline ────────── */}
      <IhrWegPipeline steps={solution.steps} />

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="bg-n-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gitter-dark pointer-events-none" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.02em]">
                Bereit fuer Ihr {solution.title}-Projekt?
              </h3>
              <p className="text-n-500 text-sm mt-2 max-w-lg">
                Konfigurieren Sie Ihr System in 3 Minuten oder finden Sie einen iDM Fachpartner in Ihrer Naehe.
              </p>
            </div>
            <div className="flex gap-3">
              <a href="https://konfigurator.myidm.at/#/" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 px-6 py-3 bg-idm hover:bg-idm-dark text-n-900 font-semibold text-sm transition-all">
                Konfigurieren <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link to="/tools/partnerfinder" className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 text-white hover:border-white/30 text-sm font-medium transition-all">
                Partner finden
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
