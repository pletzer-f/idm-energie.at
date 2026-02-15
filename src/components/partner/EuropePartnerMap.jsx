import { useCallback, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MapPin, Minus, Plus } from 'lucide-react'

export const partnerRegions = [
  { id: 'at', name: 'Oesterreich', partners: 180, cities: ['Wien', 'Linz', 'Graz', 'Innsbruck', 'Salzburg'], center: { x: 524, y: 284 } },
  { id: 'de', name: 'Deutschland', partners: 220, cities: ['Muenchen', 'Berlin', 'Hamburg', 'Frankfurt', 'Stuttgart'], center: { x: 470, y: 208 } },
  { id: 'it', name: 'Italien', partners: 60, cities: ['Bozen', 'Mailand', 'Verona', 'Turin', 'Bologna'], center: { x: 490, y: 356 } },
  { id: 'es', name: 'Spanien', partners: 42, cities: ['Madrid', 'Barcelona', 'Valencia', 'Bilbao'], center: { x: 264, y: 356 } },
  { id: 'pl', name: 'Polen', partners: 28, cities: ['Warschau', 'Krakau', 'Poznan'], center: { x: 606, y: 214 } },
  { id: 'ie', name: 'Irland', partners: 16, cities: ['Dublin', 'Cork', 'Galway'], center: { x: 150, y: 212 } },
  { id: 'ch', name: 'Schweiz', partners: 45, cities: ['Zuerich', 'Bern', 'Basel', 'Genf'], center: { x: 424, y: 296 } },
]

const countryPaths = {
  ie: 'M124 176 L146 168 L166 174 L176 192 L172 216 L156 232 L136 236 L120 224 L112 204 L116 186 Z',
  es: 'M198 320 L234 308 L282 312 L324 326 L336 350 L322 376 L292 392 L246 394 L210 380 L194 354 Z',
  de: 'M422 154 L454 142 L490 146 L520 164 L534 194 L530 226 L538 246 L520 270 L492 276 L464 268 L442 274 L426 260 L416 238 L416 212 L420 186 Z',
  ch: 'M396 284 L420 280 L446 286 L450 300 L438 312 L412 314 L396 304 Z',
  at: 'M470 268 L498 264 L530 268 L558 278 L574 294 L568 308 L546 316 L516 316 L490 310 L472 298 L466 282 Z',
  it: 'M454 316 L480 324 L500 344 L512 372 L514 406 L506 444 L492 460 L478 446 L470 420 L458 392 L444 366 L438 338 Z',
  pl: 'M554 172 L590 164 L632 170 L656 188 L656 216 L636 236 L602 242 L572 234 L552 216 L548 190 Z',
}

const countryLabels = {
  ie: { x: 146, y: 204 },
  es: { x: 264, y: 352 },
  de: { x: 476, y: 206 },
  ch: { x: 422, y: 298 },
  at: { x: 522, y: 292 },
  it: { x: 486, y: 370 },
  pl: { x: 604, y: 206 },
}

const europeLandOutline =
  'M88 160 L134 142 L188 150 L236 166 L286 164 L336 178 L380 174 L420 162 L468 166 L524 176 L574 168 L626 176 L664 198 L684 226 L688 256 L674 284 L648 304 L626 328 L602 350 L584 382 L566 418 L546 444 L518 468 L490 478 L468 470 L448 450 L428 430 L410 402 L390 374 L358 360 L326 354 L286 364 L248 378 L214 380 L180 364 L154 342 L132 316 L118 282 L110 248 L100 206 Z'

const DEFAULT_VIEWBOX = { x: 80, y: 130, w: 620, h: 370 }
const ZOOM_STEP = 0.25
const MIN_ZOOM = 1
const MAX_ZOOM = 3

const dotClusters = [
  { id: 'at', count: 34, rx: 36, ry: 18 },
  { id: 'de', count: 36, rx: 52, ry: 34 },
  { id: 'it', count: 14, rx: 18, ry: 48 },
  { id: 'es', count: 14, rx: 46, ry: 22 },
  { id: 'pl', count: 10, rx: 30, ry: 18 },
  { id: 'ie', count: 6, rx: 14, ry: 16 },
  { id: 'ch', count: 8, rx: 14, ry: 9 },
]

function buildDots() {
  return dotClusters.flatMap((cluster, clusterIndex) => {
    const region = partnerRegions.find((entry) => entry.id === cluster.id)
    if (!region) return []
    return Array.from({ length: cluster.count }, (_, i) => {
      const angle = (((i * 137.5) + (clusterIndex * 27)) * Math.PI) / 180
      const radial = ((i % 7) + 1) / 7
      return {
        x: region.center.x + Math.cos(angle) * cluster.rx * radial,
        y: region.center.y + Math.sin(angle) * cluster.ry * radial,
      }
    })
  })
}

const partnerDots = buildDots()

export default function EuropePartnerMap({
  activeRegion,
  onRegionChange,
  className = '',
  heightClass = 'h-[360px]',
  showLegend = true,
}) {
  const [zoom, setZoom] = useState(1)
  const activeRegionData = partnerRegions.find((region) => region.id === activeRegion)

  const getViewBox = useCallback(() => {
    const cx = DEFAULT_VIEWBOX.x + (DEFAULT_VIEWBOX.w / 2)
    const cy = DEFAULT_VIEWBOX.y + (DEFAULT_VIEWBOX.h / 2)
    const w = DEFAULT_VIEWBOX.w / zoom
    const h = DEFAULT_VIEWBOX.h / zoom
    return { x: cx - (w / 2), y: cy - (h / 2), w, h }
  }, [zoom])

  const viewBox = useMemo(getViewBox, [getViewBox])

  const handleRegionToggle = (id) => {
    if (!onRegionChange) return
    onRegionChange(activeRegion === id ? null : id)
  }

  const zoomIn = () => setZoom((current) => Math.min(MAX_ZOOM, current + ZOOM_STEP))
  const zoomOut = () => setZoom((current) => Math.max(MIN_ZOOM, current - ZOOM_STEP))
  const resetZoom = () => setZoom(1)

  return (
    <div className={`relative bg-n-900/55 border border-n-800 overflow-hidden ${heightClass} ${className}`}>
      <div className="absolute inset-0 bg-gitter-dark pointer-events-none" />
      <div className="absolute inset-0 bg-grid-fine opacity-10 pointer-events-none" />

      <svg viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`} className="relative w-full h-full" preserveAspectRatio="xMidYMid meet">
        <path d={europeLandOutline} fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />

        {partnerRegions.map((region) => {
          const isActive = activeRegion === region.id
          const isAustria = region.id === 'at'
          return (
            <motion.path
              key={region.id}
              d={countryPaths[region.id]}
              fill={isActive ? 'rgba(251,240,100,0.22)' : (isAustria ? 'rgba(251,240,100,0.1)' : 'rgba(255,255,255,0.05)')}
              stroke={isActive ? '#FBF064' : (isAustria ? 'rgba(251,240,100,0.8)' : 'rgba(255,255,255,0.22)')}
              strokeWidth={isActive ? 2 : (isAustria ? 1.5 : 1)}
              className="cursor-pointer"
              onClick={() => handleRegionToggle(region.id)}
              whileHover={{ fill: 'rgba(251,240,100,0.16)', stroke: '#FBF064', strokeWidth: 1.6 }}
              transition={{ duration: 0.18 }}
            />
          )
        })}

        {partnerDots.map((dot, index) => (
          <circle key={`${dot.x}-${dot.y}-${index}`} cx={dot.x} cy={dot.y} r="2.1" fill="#FBF064" opacity="0.5">
            <animate
              attributeName="opacity"
              values="0.16;0.72;0.16"
              dur={`${2.1 + (index % 4) * 0.5}s`}
              begin={`${(index % 10) * 0.14}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        <circle cx="524" cy="284" r="7" fill="#FBF064" />
        <circle cx="524" cy="284" r="16" fill="none" stroke="#FBF064" strokeWidth="1.4" opacity="0.35">
          <animate attributeName="r" values="12;20;12" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.35;0.08;0.35" dur="2.4s" repeatCount="indefinite" />
        </circle>

        {partnerRegions.map((region) => {
          const label = countryLabels[region.id]
          const isActive = activeRegion === region.id
          return (
            <text
              key={`label-${region.id}`}
              x={label.x}
              y={label.y}
              textAnchor="middle"
              fontSize={region.id === 'at' ? 8.5 : 7}
              fill={isActive ? '#FBF064' : (region.id === 'at' ? 'rgba(251,240,100,0.78)' : 'rgba(255,255,255,0.35)')}
              fontWeight={700}
              fontFamily="'JetBrains Mono', monospace"
              letterSpacing="1.3"
              className="pointer-events-none"
            >
              {region.name.toUpperCase()}
            </text>
          )
        })}

        <text x="524" y="307" textAnchor="middle" fontSize="6.4" fill="#FBF064" fontWeight={700} fontFamily="'JetBrains Mono', monospace" letterSpacing="2">
          HQ MATREI
        </text>
      </svg>

      <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-20">
        <button
          onClick={zoomIn}
          disabled={zoom >= MAX_ZOOM}
          className="w-8 h-8 flex items-center justify-center bg-n-950/85 border border-n-700 text-n-300 hover:text-idm hover:border-idm/60 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={zoomOut}
          disabled={zoom <= MIN_ZOOM}
          className="w-8 h-8 flex items-center justify-center bg-n-950/85 border border-n-700 text-n-300 hover:text-idm hover:border-idm/60 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        {zoom > 1 && (
          <button
            onClick={resetZoom}
            className="w-8 h-8 flex items-center justify-center bg-n-950/85 border border-idm/30 text-idm text-[9px] font-mono font-bold hover:bg-idm/10 transition-all cursor-pointer"
          >
            1:1
          </button>
        )}
      </div>

      {zoom > 1 && (
        <div className="absolute bottom-3 right-3 text-[9px] font-mono text-idm/70 z-20">
          {Math.round(zoom * 100)}%
        </div>
      )}

      {showLegend && (
        <div className="absolute bottom-3 left-3 flex items-center gap-4 z-20">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-idm opacity-60" />
            <span className="text-[9px] font-mono text-n-500 tracking-wider">FACHPARTNER</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-idm" />
            <span className="text-[9px] font-mono text-n-500 tracking-wider">HAUPTSITZ</span>
          </div>
        </div>
      )}

      <AnimatePresence>
        {activeRegionData && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute top-3 left-3 bg-n-950/94 border border-idm/30 backdrop-blur-sm p-3 min-w-[210px] z-20"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <MapPin className="w-3 h-3 text-idm" />
              <span className="text-xs font-bold text-white">{activeRegionData.name}</span>
            </div>
            <span className="text-[10px] font-mono text-idm block mb-2">{activeRegionData.partners} ZERTIFIZIERTE PARTNER</span>
            <div className="flex flex-wrap gap-1">
              {activeRegionData.cities.map((city) => (
                <span key={city} className="text-[9px] text-n-400 font-mono px-1.5 py-0.5 border border-n-800">
                  {city}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
