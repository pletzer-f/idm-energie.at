import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Zap, Clock, CheckCircle2, Home, Building, Users2, Factory, Thermometer, Droplets, Snowflake, Sun } from 'lucide-react'
import AnimateIn from '../animations/AnimateIn'

const features = [
  { icon: Clock, text: 'In nur 3 Minuten' },
  { icon: Zap, text: 'Personalisierte Empfehlung' },
  { icon: CheckCircle2, text: 'Kostenlos & unverbindlich' },
]

/* ─── Interactive Mini Configurator ─────────────────────────── */
const buildingTypes = [
  { id: 'efh', label: 'Einfamilienhaus', icon: Home, area: '120 – 200 m²', recommendation: 'AERO ALM 4-12' },
  { id: 'zfh', label: 'Zweifamilienhaus', icon: Building, area: '180 – 300 m²', recommendation: 'AERO ALM 6-15' },
  { id: 'mfh', label: 'Mehrfamilienhaus', icon: Users2, area: '300 – 800 m²', recommendation: 'iPUMP N5' },
  { id: 'gewerbe', label: 'Gewerbe', icon: Factory, area: '500 – 5.000 m²', recommendation: 'MAX ALM 10-50' },
]

const needsOptions = [
  { id: 'heizen', label: 'Heizen', icon: Thermometer },
  { id: 'warmwasser', label: 'Warmwasser', icon: Droplets },
  { id: 'kuehlen', label: 'Kuehlen', icon: Snowflake },
  { id: 'solar', label: 'Solar', icon: Sun },
]

function InteractiveConfigurator() {
  const [selectedBuilding, setSelectedBuilding] = useState(0)
  const [step, setStep] = useState(1)
  const [activeNeeds, setActiveNeeds] = useState(['heizen', 'warmwasser'])

  const toggleNeed = (id) => {
    setActiveNeeds((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    )
  }

  const selected = buildingTypes[selectedBuilding]

  return (
    <div className="bg-white/[0.03] border border-white/[0.08] overflow-hidden">
      {/* Progress header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <button
              key={s}
              onClick={() => setStep(s)}
              className={`w-8 h-8 flex items-center justify-center text-xs font-mono font-bold transition-all duration-300 cursor-pointer ${
                s === step
                  ? 'bg-idm text-n-900'
                  : s < step
                  ? 'bg-idm/20 text-idm'
                  : 'bg-white/[0.05] text-n-600 border border-white/[0.1]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <span className="text-[10px] font-mono text-n-500 tracking-wider">
          SCHRITT {step} / 3
        </span>
      </div>

      {/* Step content */}
      <div className="p-6 min-h-[280px]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-white font-semibold text-base mb-5">
                Gebaeudetyp waehlen
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {buildingTypes.map((type, i) => {
                  const Icon = type.icon
                  const isSelected = selectedBuilding === i
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelectedBuilding(i)}
                      className={`relative px-4 py-5 border text-left transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? 'border-idm bg-idm/10'
                          : 'border-white/[0.08] hover:border-white/[0.15]'
                      }`}
                    >
                      <div className={`w-8 h-8 flex items-center justify-center mb-2 ${
                        isSelected ? 'bg-idm/20' : 'bg-white/[0.03]'
                      }`}>
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-idm' : 'text-n-500'}`} />
                      </div>
                      <span className={`block text-xs font-semibold ${isSelected ? 'text-idm' : 'text-n-400'}`}>
                        {type.label}
                      </span>
                      <span className="block text-[10px] font-mono text-n-600 mt-0.5">
                        {type.area}
                      </span>
                      {isSelected && (
                        <motion.div
                          layoutId="selector"
                          className="absolute top-2 right-2 w-2 h-2 bg-idm"
                        />
                      )}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-white font-semibold text-base mb-5">
                Was soll Ihre Anlage koennen?
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {needsOptions.map((need) => {
                  const Icon = need.icon
                  const isActive = activeNeeds.includes(need.id)
                  return (
                    <button
                      key={need.id}
                      onClick={() => toggleNeed(need.id)}
                      className={`flex items-center gap-3 px-4 py-4 border transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'border-idm bg-idm/10'
                          : 'border-white/[0.08] hover:border-white/[0.15]'
                      }`}
                    >
                      <div className={`w-8 h-8 flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-idm/20' : 'bg-white/[0.03]'
                      }`}>
                        <Icon className={`w-4 h-4 ${isActive ? 'text-idm' : 'text-n-500'}`} />
                      </div>
                      <span className={`text-xs font-semibold ${isActive ? 'text-idm' : 'text-n-400'}`}>
                        {need.label}
                      </span>
                      <div className={`ml-auto w-4 h-4 border-2 flex items-center justify-center transition-all ${
                        isActive ? 'border-idm bg-idm' : 'border-n-600'
                      }`}>
                        {isActive && <CheckCircle2 className="w-3 h-3 text-n-900" />}
                      </div>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-white font-semibold text-base mb-5">
                Unsere Empfehlung
              </h4>
              <div className="border border-idm/30 bg-idm/[0.04] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-idm" />
                  <span className="text-[10px] font-mono text-idm tracking-[0.2em]">
                    {selected.label.toUpperCase()}
                  </span>
                </div>
                <h5 className="text-2xl font-bold text-white mb-2">
                  {selected.recommendation}
                </h5>
                <p className="text-sm text-n-400 mb-4 leading-relaxed">
                  Basierend auf Ihrem {selected.label} ({selected.area}) mit{' '}
                  {activeNeeds.length} Funktionen empfehlen wir die {selected.recommendation}.
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {activeNeeds.map((id) => {
                    const need = needsOptions.find((n) => n.id === id)
                    return (
                      <span key={id} className="text-[10px] font-mono text-idm/80 px-2 py-1 border border-idm/20 tracking-wider">
                        {need?.label}
                      </span>
                    )
                  })}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: 'COP 4.5', label: 'Effizienz' },
                    { val: 'R290', label: 'Kaeltemittel' },
                    { val: '35 dB', label: 'Schall' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white/[0.04] border border-white/[0.06] p-2 text-center">
                      <span className="text-xs font-mono font-bold text-idm block">{stat.val}</span>
                      <span className="text-[9px] font-mono text-n-600 tracking-wider">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-white/[0.06] flex justify-between items-center">
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="text-[11px] font-mono text-n-500 hover:text-white transition-colors cursor-pointer tracking-wider"
          >
            Zurueck
          </button>
        ) : (
          <span className="text-[11px] font-mono text-n-600 tracking-wider">
            Kostenlos & unverbindlich
          </span>
        )}

        {step < 3 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="px-5 py-2.5 bg-idm text-n-900 text-sm font-semibold flex items-center gap-1.5 hover:bg-idm-dark transition-colors cursor-pointer"
          >
            Weiter <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <a
            href="https://konfigurator.myidm.at/#/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-idm text-n-900 text-sm font-semibold flex items-center gap-1.5 hover:bg-idm-dark transition-colors"
          >
            Vollstaendig konfigurieren <ArrowRight className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  )
}

/* ─── Main Section ──────────────────────────────────────────── */
export default function ConfiguratorTeaser() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-n-950" />
      <div className="absolute inset-0 bg-gitter pointer-events-none" />
      <div className="absolute inset-0 bg-grid-fine opacity-30 pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(242,230,77,0.04) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 py-28 lg:py-40">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left: Content */}
          <div className="flex-1">
            <AnimateIn variant="fadeUp">
              <span className="text-[11px] font-mono font-semibold text-idm uppercase tracking-[0.2em]">
                Konfigurator
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-[-0.03em]">
                Ihre ideale
                <br />
                Waermepumpe — in
                <br />
                <span className="text-gradient-idm">nur 3 Minuten.</span>
              </h2>
              <p className="mt-6 text-n-400 text-base md:text-lg leading-relaxed max-w-lg">
                Unser Konfigurator findet die passende Loesung fuer Ihr Zuhause. Einfach
                Gebaeudetyp waehlen, Anforderungen angeben und Empfehlung erhalten.
              </p>

              <div className="mt-8 flex flex-wrap gap-6">
                {features.map((feat) => (
                  <div key={feat.text} className="flex items-center gap-2 text-sm text-n-400">
                    <feat.icon className="w-4 h-4 text-idm" />
                    <span className="font-mono text-xs tracking-wide">{feat.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <a
                  href="https://konfigurator.myidm.at/#/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-idm hover:bg-idm-dark text-n-900 font-semibold text-sm tracking-wide transition-all hover:shadow-xl hover:shadow-idm/15"
                >
                  Jetzt konfigurieren
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </AnimateIn>
          </div>

          {/* Right: Interactive Mini Configurator */}
          <AnimateIn variant="fadeRight" delay={0.2} className="flex-1 w-full max-w-lg">
            <InteractiveConfigurator />
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}
