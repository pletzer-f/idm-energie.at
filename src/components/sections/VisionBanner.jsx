import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function VisionBanner() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section ref={ref} className="relative bg-n-950 overflow-hidden">
      {/* Gitter overlay */}
      <div className="absolute inset-0 bg-gitter-dark pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-14 lg:py-20">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16">
          {/* Left — quote mark + attribution */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-idm flex items-center justify-center">
                <span className="text-n-900 text-3xl font-bold leading-none">&ldquo;</span>
              </div>
              <div>
                <span className="text-white font-semibold text-sm">Thomas Pletzer & Christoph Bacher</span>
                <span className="block text-n-500 text-[11px] font-mono tracking-wider">GESCHAEFTSFUEHRUNG</span>
              </div>
            </div>
          </motion.div>

          {/* Right — vision statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1"
          >
            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-snug tracking-[-0.02em]">
              Unser Ziel ist emissionsfreie Waerme fuer alle — zuverlaessig, leistbar und{' '}
              <span className="text-gradient-idm">aus Oesterreich.</span>
            </p>
            <p className="mt-4 text-n-500 text-sm leading-relaxed max-w-2xl">
              Was 1977 in Osttirol begann, ist heute eine europaeische Erfolgsgeschichte.
              Wir glauben, dass Waermepumpen die Zukunft der Waermeversorgung sind — und wir bauen diese Zukunft. Jeden Tag.
            </p>
          </motion.div>
        </div>

        {/* Simple animated bottom line — CSS only, no scroll listener */}
        <motion.div
          className="mt-10 h-[1px] bg-n-800 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="absolute top-0 left-0 h-full bg-idm"
            initial={{ width: '0%' }}
            animate={isInView ? { width: '100%' } : {}}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          />
        </motion.div>
      </div>

      {/* Simple decorative separator — CSS only, replaces the 39-element animated SVG */}
      <div className="relative w-full h-16 lg:h-20 overflow-hidden">
        <div className="absolute inset-0 bg-gitter-strong opacity-30" />
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-idm/30 to-transparent" />
      </div>
    </section>
  )
}
