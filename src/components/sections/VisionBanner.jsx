import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

/**
 * Animated heat pump refrigerant cycle — schematic louvre/gitter flow
 * Represents the thermodynamic cycle: Source → Evaporator → Compressor → Condenser → Expansion → loop
 * The louvre slats fan open as you scroll, revealing the energy flow beneath
 */
function HeatPumpFlow() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const pathLength = useTransform(scrollYProgress, [0.05, 0.55], [0, 1])
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 0.5])
  // Louvre slat rotation — they open like heat pump ventilation slats
  const slatAngle = useTransform(scrollYProgress, [0.0, 0.4], [0, 45])
  // Flow particle offset — moves "refrigerant" along the circuit
  const flowOffset = useTransform(scrollYProgress, [0, 0.7], [0, 1])

  // Louvre slat positions — like the front gitter of an iDM heat pump
  const slats = Array.from({ length: 28 }, (_, i) => ({
    x: 50 * i,
    w: 44,
  }))

  return (
    <div ref={ref} className="relative w-full h-20 lg:h-24 overflow-hidden">
      {/* Louvre slats layer — the signature iDM gitter */}
      <div className="absolute inset-0 flex items-center">
        <svg viewBox="0 0 1400 96" fill="none" className="w-full h-full" preserveAspectRatio="none">
          {/* Louvre slats that tilt open on scroll */}
          {slats.map((slat, i) => (
            <motion.rect
              key={i}
              x={slat.x}
              y={20}
              width={slat.w}
              height={3}
              rx={0}
              fill="rgba(251,240,100,0.12)"
              style={{
                rotate: slatAngle,
                transformOrigin: `${slat.x + slat.w / 2}px 48px`,
              }}
            />
          ))}

          {/* The refrigerant cycle path — flows beneath the louvres */}
          {/* Source (left) → Evaporator coil → Compressor peak → Condenser → Expansion dip → back */}
          <path
            d="M0 48
               C80 48, 100 48, 140 32
               C160 24, 180 24, 200 32 C220 40, 240 40, 260 32 C280 24, 300 24, 320 32
               L420 32
               C440 32, 460 16, 500 16
               C540 16, 560 16, 580 32
               L700 48
               C740 48, 760 48, 800 64
               C820 72, 840 72, 860 64 C880 56, 900 56, 920 64 C940 72, 960 72, 980 64
               L1080 64
               C1100 64, 1120 80, 1160 80
               C1200 80, 1220 80, 1240 64
               L1400 48"
            stroke="rgba(251,240,100,0.06)"
            strokeWidth="2"
            fill="none"
          />

          {/* Animated energy flow — the active refrigerant */}
          <motion.path
            d="M0 48
               C80 48, 100 48, 140 32
               C160 24, 180 24, 200 32 C220 40, 240 40, 260 32 C280 24, 300 24, 320 32
               L420 32
               C440 32, 460 16, 500 16
               C540 16, 560 16, 580 32
               L700 48
               C740 48, 760 48, 800 64
               C820 72, 840 72, 860 64 C880 56, 900 56, 920 64 C940 72, 960 72, 980 64
               L1080 64
               C1100 64, 1120 80, 1160 80
               C1200 80, 1220 80, 1240 64
               L1400 48"
            stroke="#FBF064"
            strokeWidth="2"
            fill="none"
            style={{ pathLength }}
          />

          {/* Component markers along the cycle */}
          {[
            { cx: 230, cy: 28, label: 'Verdampfer', size: 6 },
            { cx: 500, cy: 16, label: 'Verdichter', size: 8 },
            { cx: 890, cy: 68, label: 'Verfl\u00fcssiger', size: 6 },
            { cx: 1160, cy: 80, label: 'Ventil', size: 8 },
          ].map((node, i) => (
            <g key={node.label}>
              {/* Diamond marker — angular, on-brand */}
              <motion.rect
                x={node.cx - node.size / 2}
                y={node.cy - node.size / 2}
                width={node.size}
                height={node.size}
                fill="#FBF064"
                style={{
                  opacity: useTransform(scrollYProgress, [0.08 + i * 0.1, 0.18 + i * 0.1], [0, 1]),
                  rotate: 45,
                  transformOrigin: `${node.cx}px ${node.cy}px`,
                }}
              />
            </g>
          ))}

          {/* Flow particles — small dots moving along the refrigerant path */}
          {[0, 0.25, 0.5, 0.75].map((offset, i) => (
            <motion.circle
              key={i}
              r={2}
              fill="#FBF064"
              style={{
                opacity: useTransform(scrollYProgress, [0.1, 0.3], [0, 0.6]),
                offsetPath: `path("M0 48 C80 48, 100 48, 140 32 C160 24, 180 24, 200 32 C220 40, 240 40, 260 32 C280 24, 300 24, 320 32 L420 32 C440 32, 460 16, 500 16 C540 16, 560 16, 580 32 L700 48 C740 48, 760 48, 800 64 C820 72, 840 72, 860 64 C880 56, 900 56, 920 64 C940 72, 960 72, 980 64 L1080 64 C1100 64, 1120 80, 1160 80 C1200 80, 1220 80, 1240 64 L1400 48")`,
                offsetDistance: useTransform(flowOffset, (v) => `${((v + offset) % 1) * 100}%`),
              }}
            />
          ))}

          {/* Radial glow centered on the compressor (energy hotspot) */}
          <motion.rect
            x="0" y="0" width="1400" height="96"
            fill="url(#heatGlow)"
            style={{ opacity: glowOpacity }}
          />

          <defs>
            <radialGradient id="heatGlow" cx="36%" cy="20%">
              <stop offset="0%" stopColor="#FBF064" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#FBF064" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  )
}

export default function VisionBanner() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const lineWidth = useTransform(scrollYProgress, [0, 0.5], ['0%', '100%'])

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

        {/* Animated bottom line */}
        <motion.div className="mt-10 h-[1px] bg-n-800 relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-idm"
            style={{ width: lineWidth }}
          />
        </motion.div>
      </div>

      {/* Animated heat pump refrigerant cycle — transition element */}
      <HeatPumpFlow />

    </section>
  )
}
