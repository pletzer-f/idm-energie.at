import { motion, AnimatePresence } from 'framer-motion'

/*
 * iDM Reload Loader
 *
 * A technically-inspired loading animation built around the concept
 * of a heat pump's thermodynamic cycle. Features:
 * - Hexagonal grid evoking molecular/engineering precision
 * - Animated energy flow paths representing the refrigerant circuit
 * - Staggered data readouts like a system boot sequence
 * - Smooth exit with curtain reveal
 */

// Hexagonal grid nodes — positioned to suggest a circuit board / molecular grid
const hexNodes = [
  { x: 50, y: 50 },
  { x: 35, y: 30 }, { x: 65, y: 30 },
  { x: 20, y: 50 }, { x: 80, y: 50 },
  { x: 35, y: 70 }, { x: 65, y: 70 },
  { x: 50, y: 20 }, { x: 50, y: 80 },
  { x: 20, y: 30 }, { x: 80, y: 30 },
  { x: 20, y: 70 }, { x: 80, y: 70 },
]

// Connection lines between hex nodes
const connections = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
  [1, 7], [2, 7], [1, 9], [2, 10],
  [5, 8], [6, 8], [5, 11], [6, 12],
  [3, 9], [3, 11], [4, 10], [4, 12],
]

// System boot readouts
const bootLines = [
  { text: 'THERMODYNAMIC CORE', delay: 0.1 },
  { text: 'R290 CIRCUIT INITIALIZED', delay: 0.35 },
  { text: 'iON NEURAL NETWORK', delay: 0.55 },
  { text: 'ENERGY GRID SYNC', delay: 0.75 },
]

function HexGrid() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid meet"
      style={{ opacity: 0.6 }}
    >
      {/* Connection lines — animate in sequentially */}
      {connections.map(([from, to], i) => {
        const a = hexNodes[from]
        const b = hexNodes[to]
        return (
          <motion.line
            key={`conn-${i}`}
            x1={a.x} y1={a.y}
            x2={b.x} y2={b.y}
            stroke="#F2E64D"
            strokeWidth="0.15"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{
              pathLength: { duration: 0.6, delay: 0.05 * i, ease: 'easeOut' },
              opacity: { duration: 0.3, delay: 0.05 * i },
            }}
          />
        )
      })}

      {/* Hex nodes — diamond shapes */}
      {hexNodes.map((node, i) => (
        <motion.rect
          key={`node-${i}`}
          x={node.x - 0.8}
          y={node.y - 0.8}
          width={1.6}
          height={1.6}
          fill="#F2E64D"
          style={{ transformOrigin: `${node.x}px ${node.y}px`, rotate: 45 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: i === 0 ? 1 : 0.5 }}
          transition={{
            duration: 0.4,
            delay: 0.08 * i,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}

      {/* Central pulsing ring */}
      <motion.circle
        cx={50} cy={50} r={6}
        fill="none"
        stroke="#F2E64D"
        strokeWidth="0.3"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        style={{ transformOrigin: '50px 50px' }}
      />

      {/* Outer orbit ring */}
      <motion.circle
        cx={50} cy={50} r={38}
        fill="none"
        stroke="#F2E64D"
        strokeWidth="0.12"
        strokeDasharray="2 4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2, rotate: 360 }}
        transition={{
          opacity: { duration: 0.8, delay: 0.3 },
          rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
        }}
        style={{ transformOrigin: '50px 50px' }}
      />

      {/* Energy flow particles moving along connections */}
      {[0, 1, 2, 3].map((i) => {
        const conn = connections[i * 4]
        const a = hexNodes[conn[0]]
        const b = hexNodes[conn[1]]
        return (
          <motion.circle
            key={`particle-${i}`}
            r={0.5}
            fill="#F2E64D"
            initial={{ cx: a.x, cy: a.y, opacity: 0 }}
            animate={{
              cx: [a.x, b.x, a.x],
              cy: [a.y, b.y, a.y],
              opacity: [0, 0.9, 0],
            }}
            transition={{
              duration: 1.8,
              delay: 0.4 + i * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )
      })}
    </svg>
  )
}

export default function RouteLoader({ active = false }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[120] bg-n-950 overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Background textures */}
          <div className="absolute inset-0 bg-gitter-dark opacity-50" />
          <div className="absolute inset-0 bg-grid-fine opacity-15" />

          {/* Radial glow */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(242,230,77,0.06) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Hex grid — centered, constrained */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(80vw,500px)] h-[min(80vw,500px)]">
            <HexGrid />
          </div>

          {/* Main progress bar */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 mt-[120px] md:mt-[140px] w-[280px] md:w-[360px]">
            <div className="h-[1px] bg-n-800 relative overflow-hidden">
              <motion.div
                className="h-full bg-idm"
                initial={{ width: '0%' }}
                animate={{ width: ['0%', '25%', '60%', '85%', '100%'] }}
                transition={{ duration: 2.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            {/* Percentage */}
            <div className="flex justify-between mt-2">
              <span className="text-[9px] font-mono text-n-600 tracking-[0.2em]">LOADING</span>
              <motion.span
                className="text-[9px] font-mono text-idm tracking-[0.2em]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <PercentageCounter />
              </motion.span>
            </div>
          </div>

          {/* Center content */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              {/* iDM wordmark */}
              <motion.div
                className="text-[11px] font-mono text-idm/60 tracking-[0.3em] uppercase mb-6"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                iDM Energiesysteme
              </motion.div>

              {/* Main text — large and bold */}
              <motion.div
                className="text-white text-3xl md:text-5xl font-bold tracking-[-0.04em]"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-gradient-idm">Intelligente</span> Waerme.
              </motion.div>

              {/* Boot sequence readouts */}
              <div className="mt-8 flex flex-col items-center gap-1.5">
                {bootLines.map((line) => (
                  <motion.div
                    key={line.text}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: line.delay + 0.3 }}
                  >
                    <motion.div
                      className="w-1.5 h-1.5 bg-idm"
                      style={{ rotate: 45 }}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: line.delay }}
                    />
                    <span className="text-[9px] font-mono text-n-500 tracking-[0.18em]">
                      {line.text}
                    </span>
                    <motion.span
                      className="text-[9px] font-mono text-idm tracking-[0.18em]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: line.delay + 0.8 }}
                    >
                      OK
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Corner accents */}
          <motion.div
            className="absolute top-6 left-6 w-8 h-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.1 }}
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-idm" />
            <div className="absolute top-0 left-0 h-full w-[1px] bg-idm" />
          </motion.div>
          <motion.div
            className="absolute top-6 right-6 w-8 h-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.15 }}
          >
            <div className="absolute top-0 right-0 w-full h-[1px] bg-idm" />
            <div className="absolute top-0 right-0 h-full w-[1px] bg-idm" />
          </motion.div>
          <motion.div
            className="absolute bottom-6 left-6 w-8 h-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.2 }}
          >
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-idm" />
            <div className="absolute bottom-0 left-0 h-full w-[1px] bg-idm" />
          </motion.div>
          <motion.div
            className="absolute bottom-6 right-6 w-8 h-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.25 }}
          >
            <div className="absolute bottom-0 right-0 w-full h-[1px] bg-idm" />
            <div className="absolute bottom-0 right-0 h-full w-[1px] bg-idm" />
          </motion.div>

          {/* Bottom tagline */}
          <motion.div
            className="absolute bottom-6 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.8 }}
          >
            <span className="text-[9px] font-mono text-n-600 tracking-[0.3em] uppercase">
              Made in Austria — Seit 1977
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* Animated percentage counter */
function PercentageCounter() {
  return (
    <motion.span
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
    >
      {[0, 12, 28, 45, 63, 78, 91, 100].map((val, i, arr) => (
        <motion.span
          key={val}
          className="absolute right-0"
          initial={{ opacity: i === 0 ? 1 : 0 }}
          animate={{ opacity: i === arr.length - 1 ? 1 : [0, 1, 1, 0] }}
          transition={{
            duration: i === arr.length - 1 ? 0.2 : 0.35,
            delay: i * 0.32,
            times: i === arr.length - 1 ? undefined : [0, 0.1, 0.8, 1],
          }}
        >
          {val}%
        </motion.span>
      ))}
    </motion.span>
  )
}
