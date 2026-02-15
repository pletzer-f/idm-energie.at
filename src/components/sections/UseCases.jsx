import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import RotatingWordLine from '../ui/RotatingWordLine'

const cases = [
  {
    id: 'neubau',
    title: 'Neubau',
    spec: 'ab 2 kW',
    temp: '35°C',
    cop: '5.2',
    description: 'Effizient, leise und zukunftssicher ab dem ersten Tag.',
    href: '/loesungen/neubau',
    image: '/images/house-cutaway-hq.png',
  },
  {
    id: 'sanierung',
    title: 'Sanierung',
    spec: 'bis 70°C',
    temp: '70°C',
    cop: '3.8',
    description: 'Raus aus Oel und Gas — Vorlauftemperaturen die im Altbau ueberzeugen.',
    href: '/loesungen/sanierung',
    image: '/images/house-diagram.jpeg',
  },
  {
    id: 'gewerbe',
    title: 'Gewerbe & Industrie',
    spec: 'bis 1.500 kW',
    temp: '65°C',
    cop: '4.1',
    description: 'Kaskadenlösungen mit bis zu 1.500 kW fuer Hotels und Wohnanlagen.',
    href: '/loesungen/gewerbe',
    image: '/images/aero-outdoor-units.jpg',
  },
]

export default function UseCases() {
  const [activeCase, setActiveCase] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-12 lg:py-16 bg-n-50 relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Compact header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-[11px] font-mono font-semibold text-n-400 uppercase tracking-[0.2em]">
              Loesungen
            </span>
            <h2 className="mt-2 text-2xl md:text-3xl font-bold text-n-900 tracking-[-0.02em]">
              Fuer jedes Projekt.
            </h2>
            <div className="mt-3">
              <RotatingWordLine
                words={['Neubau.', 'Sanierung.', 'Gewerbe.']}
                widthClass="w-[10ch]"
                wordClass="text-sm md:text-base font-semibold text-idm font-mono"
                suffix="passend ausgelegt."
                suffixClass="text-sm md:text-base text-n-500 whitespace-nowrap"
              />
            </div>
          </div>
          <Link to="/loesungen" className="group flex items-center gap-2 text-xs font-semibold text-n-500 hover:text-n-900 transition-colors font-mono tracking-wider">
            ALLE LOESUNGEN
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Tab selector + content */}
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-2">
          {/* Left: Tab list */}
          <div className="flex flex-col gap-1">
            {cases.map((item, i) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveCase(i)}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`group text-left p-4 lg:p-5 transition-all duration-300 cursor-pointer relative overflow-hidden ${
                  activeCase === i
                    ? 'bg-n-950 text-white'
                    : 'bg-white text-n-900 hover:bg-n-100'
                }`}
              >
                {/* Active indicator */}
                <div className={`absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-300 ${
                  activeCase === i ? 'bg-idm' : 'bg-transparent'
                }`} />

                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono tracking-[0.2em] ${
                    activeCase === i ? 'text-idm' : 'text-n-400'
                  }`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={`text-[10px] font-mono tracking-wider px-2 py-0.5 border ${
                    activeCase === i ? 'border-idm/30 text-idm' : 'border-n-200 text-n-400'
                  }`}>
                    {item.spec}
                  </span>
                </div>

                <h3 className="text-lg font-bold tracking-[-0.01em] mb-1.5">
                  {item.title}
                </h3>
                <p className={`text-xs leading-relaxed ${
                  activeCase === i ? 'text-n-400' : 'text-n-500'
                }`}>
                  {item.description}
                </p>

                {/* Technical specs row */}
                <div className={`mt-3 flex gap-4 text-[10px] font-mono tracking-wider ${
                  activeCase === i ? 'text-n-500' : 'text-n-300'
                }`}>
                  <span>VORLAUF: <span className={activeCase === i ? 'text-idm' : 'text-n-600'}>{item.temp}</span></span>
                  <span>COP: <span className={activeCase === i ? 'text-idm' : 'text-n-600'}>{item.cop}</span></span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right: Active case visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative bg-white overflow-hidden"
          >
            {/* Image */}
            <div className="aspect-[16/8] relative overflow-hidden">
              {cases.map((item, i) => (
                <motion.img
                  key={item.id}
                  src={item.image}
                  alt={item.title}
                  initial={false}
                  animate={{
                    opacity: activeCase === i ? 1 : 0,
                    scale: activeCase === i ? 1 : 1.05,
                  }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ))}
              <div className="absolute inset-0 bg-gitter opacity-30 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
            </div>

            {/* Bottom bar with CTA only */}
            <div className="p-4 lg:p-5 flex items-center justify-end">
              <Link
                to={cases[activeCase].href}
                className="group flex items-center gap-2 text-sm font-semibold text-n-900 hover:text-idm-dark transition-colors"
              >
                Mehr erfahren
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
