import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

/**
 * Single diamond marker — extracted to avoid useTransform inside .map()
 */
function DiamondMarker({ scrollYProgress, index }) {
  const opacity = useTransform(scrollYProgress, [0.15 + index * 0.1, 0.3 + index * 0.1], [0, 1])
  return <motion.div className="w-2 h-2 bg-idm/40 rotate-45" style={{ opacity }} />
}

/**
 * Scroll-driven louvre separator — lightweight version
 * Uses only 8 CSS-transformed bars (no SVG, no per-frame JS state updates).
 * Framer Motion's useTransform drives CSS transforms directly on the GPU
 * without triggering React re-renders.
 */
function LouvreTransition() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // These drive CSS transforms directly — no React re-renders
  const slatRotate = useTransform(scrollYProgress, [0.2, 0.6], [0, 45])
  const lineProgress = useTransform(scrollYProgress, [0.1, 0.7], ['0%', '100%'])
  const glowOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 0.4])

  return (
    <div ref={ref} className="relative w-full h-20 lg:h-24 overflow-hidden">
      {/* 8 louvre slats — GPU-accelerated transforms, no state updates */}
      <div className="absolute inset-0 flex items-center justify-between px-[5%]">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-[10%] h-[3px] bg-idm/10 origin-center"
            style={{ rotate: slatRotate }}
          />
        ))}
      </div>

      {/* Animated energy line — single element */}
      <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-n-800 -translate-y-1/2">
        <motion.div
          className="h-full bg-idm/60 origin-left"
          style={{ width: lineProgress }}
        />
      </div>

      {/* Subtle glow at center */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: glowOpacity,
          background: 'radial-gradient(ellipse 50% 100% at 50% 50%, rgba(242,230,77,0.08) 0%, transparent 100%)',
        }}
      />

      {/* 4 diamond markers along the line */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-[15%]">
        {['Verdampfer', 'Verdichter', 'Verfluessiger', 'Ventil'].map((label, i) => (
          <DiamondMarker key={label} scrollYProgress={scrollYProgress} index={i} />
        ))}
      </div>
    </div>
  )
}

export default function VisionBanner() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section ref={ref} className="relative bg-white overflow-hidden">
      {/* Match Hero background exactly — same gitter pattern + grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(251,240,100,0.03) 8px, rgba(251,240,100,0.03) 10px)`,
        }} />
        <div className="absolute inset-0 bg-grid-fine opacity-30" />
      </div>

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
                <span className="text-n-900 font-semibold text-sm">Thomas Pletzer & Christoph Bacher</span>
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
            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-n-900 leading-snug tracking-[-0.02em]">
              Unser Ziel ist emissionsfreie Waerme fuer alle — zuverlaessig, leistbar und{' '}
              <span className="text-gradient-idm">aus Oesterreich.</span>
            </p>
            <p className="mt-4 text-n-500 text-sm leading-relaxed max-w-2xl">
              Was 1977 in Osttirol begann, ist heute eine europaeische Erfolgsgeschichte.
              Wir glauben, dass Waermepumpen die Zukunft der Waermeversorgung sind — und wir bauen diese Zukunft. Jeden Tag.
            </p>
          </motion.div>
        </div>

        {/* Simple animated bottom line — plays once on view */}
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

      {/* Scroll-driven louvre animation — lightweight heat pump reference */}
      <LouvreTransition />
    </section>
  )
}
