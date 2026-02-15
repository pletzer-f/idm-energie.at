import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight } from 'lucide-react'
import RotatingWordLine from '../ui/RotatingWordLine'

const rotatingWords = ['Heizen.', 'Kuehlen.', 'Warmwasser.', 'Zukunft.']

function GitterOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(251,240,100,0.03) 8px, rgba(251,240,100,0.03) 10px)`,
      }} />
      <div className="absolute inset-0 bg-grid-fine opacity-30" />
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-n-950 overflow-hidden">
      <GitterOverlay />

      {/* Subtle radial glow behind the product */}
      <div className="absolute top-1/2 right-[20%] -translate-y-1/2 w-[700px] h-[700px] bg-idm/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 w-full">
        <div className="grid lg:grid-cols-2 items-center gap-10 lg:gap-6 min-h-screen py-32 lg:py-20">
          {/* Left Column — Text */}
          <div className="max-w-xl">
            {/* Mono badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2.5 px-4 py-1.5 border border-idm/20 text-idm text-xs font-mono tracking-wide">
                <span className="w-1.5 h-1.5 bg-idm animate-pulse" />
                SEIT 1977 — MADE IN AUSTRIA
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8"
            >
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-white leading-[0.95] tracking-[-0.03em]">
                Intelligente
              </span>
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-white leading-[0.95] tracking-[-0.03em] mt-2">
                Waermepumpen
              </span>
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold leading-[0.95] tracking-[-0.03em] mt-2 text-gradient-idm">
                aus Oesterreich.
              </span>
            </motion.h1>

            {/* Rotating subline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <RotatingWordLine
                words={rotatingWords}
                widthClass="w-[13ch]"
                wordClass="text-xl font-semibold text-idm font-mono"
                suffix="Alles aus einer Hand."
                suffixClass="text-lg text-n-500 whitespace-nowrap"
              />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-6 text-n-400 text-base md:text-lg leading-relaxed max-w-lg"
            >
              Seit 1977 entwickeln und fertigen wir Waermepumpen in Tirol — fuer Ihr Zuhause,
              Ihr Gebaeude und Ihre Zukunft. Von 2 bis 1.500 kW.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <a
                href="https://konfigurator.myidm.at/#/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-idm hover:bg-idm-dark text-n-900 font-semibold text-sm tracking-wide transition-all hover:shadow-xl hover:shadow-idm/15"
              >
                Jetzt konfigurieren
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                to="/tools/partnerfinder"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 border border-white/15 text-white hover:border-white/30 hover:bg-white/5 font-medium text-sm tracking-wide transition-all"
              >
                Partner in Ihrer Naehe
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-16 flex flex-wrap items-center gap-4"
            >
              {['EHPA', 'ISO 9001', 'ISO 14001', 'Made in Austria'].map((cert) => (
                <span key={cert} className="text-[11px] font-mono text-n-600 px-3 py-1 border border-n-800 tracking-wider">
                  {cert}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right Column — Product Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            {/* Accent line — vertical */}
            <div className="absolute right-0 top-[10%] bottom-[10%] w-[3px] bg-idm/30" />

            {/* Product image — prominent */}
            <div className="relative z-10">
              <img
                src="/images/products-lineup-transparent.png"
                alt="iDM Waermepumpen Produktfamilie"
                className="w-full max-w-[630px] h-auto object-contain drop-shadow-2xl"
              />

              {/* Floating spec badges on the product */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute top-[15%] left-0 bg-n-950/90 border border-n-800 px-3 py-2 backdrop-blur-sm"
              >
                <span className="text-[10px] font-mono text-n-500 tracking-wider block">LEISTUNG</span>
                <span className="text-sm font-mono font-bold text-idm">2 – 1.500 kW</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                className="absolute top-[40%] right-0 bg-n-950/90 border border-n-800 px-3 py-2 backdrop-blur-sm"
              >
                <span className="text-[10px] font-mono text-n-500 tracking-wider block">KAELTEMITTEL</span>
                <span className="text-sm font-mono font-bold text-idm">R290</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.5 }}
                className="absolute bottom-[10%] left-[10%] bg-n-950/90 border border-n-800 px-3 py-2 backdrop-blur-sm"
              >
                <span className="text-[10px] font-mono text-n-500 tracking-wider block">VORLAUF</span>
                <span className="text-sm font-mono font-bold text-idm">bis 70°C</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  )
}
