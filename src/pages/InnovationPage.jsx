import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Cpu, Zap, Brain, Wifi, Shield,
  Thermometer, BarChart3, Smartphone, Globe, Leaf, Factory, Eye
} from 'lucide-react'
import AnimateIn from '../components/animations/AnimateIn'

/* ─── Technology Pillars ───────────────────────────────────── */
const techPillars = [
  {
    icon: Brain,
    name: 'iON KI-Technologie',
    headline: 'Die Waermepumpe, die mitdenkt.',
    desc: 'Unsere kuenstliche Intelligenz lernt Ihr Heizverhalten, prognostiziert den Energiebedarf und optimiert automatisch — bis zu 30% Einsparung.',
    features: ['Wetterprognose-Integration', 'Selbstlernende Algorithmen', 'Automatische Nachtabsenkung', 'PV-Eigenverbrauch-Optimierung'],
  },
  {
    icon: Cpu,
    name: 'NAVIGATOR 2.0',
    headline: 'Volle Kontrolle. Ein System.',
    desc: 'Die intelligente Systemsteuerung regelt Waermepumpe, Heizkreise, Warmwasser, Solar und Kuehlung — mit 7-Zoll-Touchscreen und Cloud-Anbindung.',
    features: ['7" Farb-Touchscreen', 'myiDM Cloud-Portal', 'BACnet/Modbus Integration', 'OTA Software-Updates'],
  },
  {
    icon: Leaf,
    name: 'R290 Kaeltemittel',
    headline: 'Natuerlich. Zukunftssicher.',
    desc: 'Propan (R290) hat ein Treibhauspotenzial von nur 3 — gegenueber 1.400+ bei synthetischen Kaeltemitteln. Effizienter, umweltfreundlicher, zukunftssicher.',
    features: ['GWP von nur 3', 'Hoeherer COP als R410A', 'F-Gas Verordnung konform', 'In allen neuen Produktlinien'],
  },
]

/* ─── Innovation Stats ─────────────────────────────────────── */
const innovationStats = [
  { value: '€12M', label: 'F&E Investition pro Jahr' },
  { value: '45', label: 'Ingenieur:innen in F&E' },
  { value: '15+', label: 'Patente & Gebrauchsmuster' },
  { value: '2.000', label: 'Teststunden pro Modell' },
]

/* ─── R&D Process Steps ────────────────────────────────────── */
const rdSteps = [
  { icon: BarChart3, title: 'Analyse', desc: 'Marktforschung, Kundenbeduerfnisse und Normenanalyse bilden die Basis.' },
  { icon: Cpu, title: 'Simulation', desc: 'CFD-Simulation, Kaeltekreisberechnung und digitale Prototypen.' },
  { icon: Factory, title: 'Prototypenbau', desc: 'Schnelle Iteration im eigenen Prototypenlabor in Matrei.' },
  { icon: Thermometer, title: 'Pruefstand', desc: '2.000+ Stunden Dauertest unter Extrembedingungen, -25°C bis +45°C.' },
  { icon: Shield, title: 'Zertifizierung', desc: 'EHPA Guetesiegel, ErP-Label, CE-Kennzeichnung und Schallmessung.' },
  { icon: Zap, title: 'Serienstart', desc: 'Qualitaetskontrolle, Pilotfertigung und Marktstart.' },
]

/* ─── Main Page ────────────────────────────────────────────── */
export default function InnovationPage() {
  const parallaxRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <div className="bg-white">
      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative bg-n-950 overflow-hidden h-[600px] lg:h-[680px]">
        <div className="absolute inset-0 bg-gitter-dark pointer-events-none" />
        <div className="absolute inset-0 bg-grid-fine opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 h-full flex items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl pt-20">
            <Link to="/" className="inline-flex items-center gap-2 text-n-500 text-xs font-mono tracking-wider hover:text-white transition-colors mb-6">
              <ArrowLeft className="w-3 h-3" /> STARTSEITE
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <Cpu className="w-5 h-5 text-idm" />
              <span className="text-[11px] font-mono text-idm uppercase tracking-[0.2em]">Innovation</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em] leading-[1.05]">
              Technologie, die{'\n'}
              <span className="text-gradient-idm">vorausdenkt.</span>
            </h1>

            <p className="mt-5 text-n-400 text-sm md:text-base leading-relaxed max-w-lg">
              Eigene Forschung, eigene Software, eigene KI. In Matrei in Osttirol entwickeln
              45 Ingenieur:innen die naechste Generation von Waermepumpen — mit oesterreichischem
              Erfindergeist und globalem Anspruch.
            </p>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
              {innovationStats.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                  className="bg-white/[0.04] border border-n-800 p-2.5"
                >
                  <span className="text-lg font-mono font-bold text-idm block">{s.value}</span>
                  <span className="text-[10px] font-mono text-n-600 tracking-wider block mt-0.5">{s.label.toUpperCase()}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Technology Pillars ─────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <AnimateIn variant="fadeUp" className="mb-14">
            <span className="text-[11px] font-mono font-semibold text-n-400 uppercase tracking-[0.2em]">Kerntechnologien</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-n-900 tracking-[-0.02em]">
              Drei Sauelen der Innovation.
            </h2>
          </AnimateIn>

          <div className="space-y-3">
            {techPillars.map((pillar, i) => {
              const Icon = pillar.icon
              return (
                <AnimateIn key={pillar.name} variant="fadeUp" delay={i * 0.1}>
                  <div className="grid lg:grid-cols-[1fr_1fr] gap-0 border border-n-100 overflow-hidden group hover:border-idm/20 transition-colors">
                    {/* Left: info */}
                    <div className="p-8 lg:p-10 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-idm/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-idm" />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-idm-dark uppercase tracking-[0.2em]">
                          {pillar.name}
                        </span>
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-n-900 tracking-[-0.02em] mb-3">
                        {pillar.headline}
                      </h3>
                      <p className="text-sm text-n-500 leading-relaxed mb-6 max-w-md">
                        {pillar.desc}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {pillar.features.map((f) => (
                          <div key={f} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-idm shrink-0" />
                            <span className="text-[12px] text-n-700">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Right: visual accent */}
                    <div className="relative bg-n-950 p-8 lg:p-10 flex items-center justify-center min-h-[200px]">
                      <div className="absolute inset-0 bg-gitter-dark opacity-50 pointer-events-none" />
                      <div className="absolute inset-0 bg-grid-fine opacity-30 pointer-events-none" />
                      <div className="relative text-center">
                        <Icon className="w-16 h-16 text-idm/20 mx-auto mb-4" />
                        <span className="text-3xl lg:text-4xl font-bold text-white font-mono tracking-tighter">
                          {pillar.name.split(' ')[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                </AnimateIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── R&D Process ────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-n-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <AnimateIn variant="fadeUp" className="mb-12">
            <span className="text-[11px] font-mono font-semibold text-n-400 uppercase tracking-[0.2em]">Entwicklungsprozess</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-n-900 tracking-[-0.02em]">
              Von der Idee zur Serie.
            </h2>
          </AnimateIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {rdSteps.map((step, i) => {
              const Icon = step.icon
              return (
                <AnimateIn key={step.title} variant="fadeUp" delay={i * 0.08}>
                  <div className="bg-white border border-n-100 p-6 h-full relative overflow-hidden group hover:border-idm/20 transition-colors">
                    <span className="absolute top-4 right-4 text-4xl font-bold font-mono text-n-100 group-hover:text-idm/10 transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="w-10 h-10 bg-n-100 group-hover:bg-idm/10 flex items-center justify-center mb-4 transition-colors">
                      <Icon className="w-5 h-5 text-n-600 group-hover:text-idm transition-colors" />
                    </div>
                    <h3 className="text-base font-bold text-n-900 mb-1">{step.title}</h3>
                    <p className="text-sm text-n-500 leading-relaxed">{step.desc}</p>
                  </div>
                </AnimateIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Parallax Image ─────────────────────────────── */}
      <section ref={parallaxRef} className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
        <motion.div style={{ y: imgY }} className="absolute inset-[-10%] ">
          <img loading="lazy" decoding="async" src="/images/navigator-ion-tablet.jpg" alt="iON System" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gitter opacity-40 mix-blend-overlay" />
          <div className="absolute inset-0 bg-n-950/60" />
        </motion.div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 w-full">
            <AnimateIn variant="fadeUp">
              <span className="text-[10px] font-mono text-idm tracking-wider block mb-3">FORSCHUNG & ENTWICKLUNG</span>
              <h3 className="text-3xl lg:text-4xl font-bold text-white tracking-[-0.02em] max-w-lg">
                Jede iDM Waermepumpe durchlaeuft 2.000+ Stunden Dauertest.
              </h3>
              <p className="mt-3 text-sm text-n-400 max-w-md">
                Von -25°C Arktiskaelte bis +45°C Wuestenhitze — wir testen unter Extrembedingungen,
                damit Sie sich auf Ihre Waermepumpe verlassen koennen.
              </p>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── Connected Products Ecosystem ───────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <AnimateIn variant="fadeUp" className="mb-12">
            <span className="text-[11px] font-mono font-semibold text-n-400 uppercase tracking-[0.2em]">Vernetzung</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-n-900 tracking-[-0.02em]">
              Das iDM Oekosystem.
            </h2>
            <p className="mt-3 text-sm text-n-500 max-w-lg leading-relaxed">
              Waermepumpe, Steuerung, App und Cloud — alles von iDM, alles perfekt aufeinander abgestimmt.
            </p>
          </AnimateIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { icon: Cpu, name: 'NAVIGATOR 2.0', desc: 'Systemsteuerung mit 7" Touch' },
              { icon: Smartphone, name: 'myiDM App', desc: 'Steuerung per Smartphone' },
              { icon: Globe, name: 'myiDM Portal', desc: 'Cloud-Monitoring & Ferndiagnose' },
              { icon: Wifi, name: 'Smart Grid Ready', desc: 'PV-Integration & Stromtarife' },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <AnimateIn key={item.name} variant="fadeUp" delay={i * 0.08}>
                  <div className="bg-n-950 border border-n-800 p-6 relative overflow-hidden group hover:border-idm/30 transition-colors h-full">
                    <div className="absolute inset-0 bg-gitter-dark opacity-30 pointer-events-none" />
                    <div className="relative">
                      <Icon className="w-8 h-8 text-idm mb-4" />
                      <h3 className="text-base font-bold text-white mb-1">{item.name}</h3>
                      <p className="text-sm text-n-500">{item.desc}</p>
                    </div>
                  </div>
                </AnimateIn>
              )
            })}
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
                Erleben Sie unsere Technologie.
              </h3>
              <p className="text-n-500 text-sm mt-2 max-w-lg">
                Konfigurieren Sie Ihr System oder besuchen Sie unseren virtuellen Showroom.
              </p>
            </div>
            <div className="flex gap-3">
              <a href="https://konfigurator.myidm.at/#/" target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-idm hover:bg-idm-dark text-n-900 font-semibold text-sm transition-all"
              >
                Konfigurieren <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="https://vr.idm-energie.at/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 text-white hover:border-white/30 text-sm font-medium transition-all"
              >
                <Eye className="w-4 h-4" /> Showroom
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
