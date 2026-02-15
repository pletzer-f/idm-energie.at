import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Search } from 'lucide-react'
import AnimateIn from '../animations/AnimateIn'
import EuropePartnerMap, { partnerRegions } from '../partner/EuropePartnerMap'

export default function PartnerFinder() {
  const [postcode, setPostcode] = useState('')
  const [activeRegion, setActiveRegion] = useState(null)

  const activeRegionData = useMemo(
    () => partnerRegions.find((region) => region.id === activeRegion),
    [activeRegion]
  )

  return (
    <section className="bg-n-950 relative overflow-hidden">
      <div className="h-[3px] bg-idm" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <AnimateIn variant="fadeUp">
            <span className="text-[11px] font-mono font-semibold text-n-500 uppercase tracking-[0.2em]">
              Partnernetzwerk
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em]">
              Finden Sie Ihren <span className="text-gradient-idm">iDM Partner.</span>
            </h2>
          </AnimateIn>
        </div>

        <div className="grid lg:grid-cols-[0.84fr_1.16fr] gap-6 lg:gap-10 items-start">
          <EuropePartnerMap
            activeRegion={activeRegion}
            onRegionChange={setActiveRegion}
            heightClass="h-[360px] md:h-[440px]"
            className="order-1 lg:max-w-[620px]"
          />

          <div className="order-2 flex flex-col justify-center lg:pl-2">
            <p className="text-n-400 text-sm md:text-base leading-relaxed mb-6">
              Unser Partnernetzwerk in Europa begleitet Ihr Projekt von der Planung bis zur
              Inbetriebnahme. Waehlen Sie eine Region aus der Karte oder starten Sie die Suche
              per PLZ bzw. Ort.
            </p>

            <div className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-n-500" />
                <input
                  type="text"
                  value={postcode}
                  onChange={(event) => setPostcode(event.target.value)}
                  placeholder="PLZ oder Ort eingeben"
                  className="w-full pl-10 pr-4 py-3 border border-n-700 bg-n-900 text-white text-sm focus:outline-none focus:border-idm focus:ring-1 focus:ring-idm/20 transition-all placeholder:text-n-600"
                />
              </div>
              <Link
                to={`/tools/partnerfinder${postcode ? `?q=${encodeURIComponent(postcode)}` : ''}`}
                className="inline-flex items-center gap-2 px-5 py-3 bg-idm hover:bg-idm-dark text-n-900 font-semibold text-sm transition-all shrink-0"
              >
                <Search className="w-4 h-4" />
                Suchen
              </Link>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-6">
              {partnerRegions.map((region) => (
                <button
                  key={region.id}
                  onClick={() => setActiveRegion(activeRegion === region.id ? null : region.id)}
                  className={`text-[10px] font-mono tracking-wider px-2.5 py-1 border transition-all duration-300 cursor-pointer ${
                    activeRegion === region.id
                      ? 'border-idm text-idm bg-idm/5'
                      : 'border-n-800 text-n-500 hover:border-n-600 hover:text-n-300'
                  }`}
                >
                  {region.name.toUpperCase()} ({region.partners})
                </button>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-5 border-t border-n-800 pt-6 mb-6">
              {[
                { val: '500+', label: 'Fachpartner' },
                { val: `${partnerRegions.length}`, label: 'Laender' },
                { val: '24h', label: 'Antwortzeit' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-xl font-bold text-white font-mono">{stat.val}</div>
                  <div className="text-[9px] font-mono text-n-500 mt-1 tracking-wider uppercase">{stat.label}</div>
                </div>
              ))}
            </div>

            {activeRegionData && (
              <div className="mb-6 p-4 border border-n-800 bg-n-900/40">
                <div className="text-[10px] font-mono text-idm tracking-[0.16em] uppercase mb-1">
                  Ausgewaehlte Region
                </div>
                <div className="text-white font-semibold">{activeRegionData.name}</div>
                <p className="text-sm text-n-400 mt-1">
                  {activeRegionData.partners} zertifizierte Partner in
                  {' '}
                  {activeRegionData.cities.slice(0, 3).join(', ')}
                  .
                </p>
              </div>
            )}

            <Link
              to="/tools/partnerfinder"
              className="group inline-flex items-center gap-2 text-xs font-semibold text-idm hover:text-idm-light transition-colors"
            >
              Alle Partner anzeigen
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
