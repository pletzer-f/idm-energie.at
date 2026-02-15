import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, Clock3, Mail, MapPin, Phone, Search, ShieldCheck, Wrench } from 'lucide-react'
import AnimateIn from '../components/animations/AnimateIn'
import EuropePartnerMap, { partnerRegions } from '../components/partner/EuropePartnerMap'

function buildPartnerDirectory() {
  return partnerRegions.map((region, regionIndex) => ({
    ...region,
    entries: region.cities.map((city, cityIndex) => ({
      id: `${region.id}-${cityIndex}`,
      city,
      name: `iDM Partner ${city}`,
      address: `${city} Zentrum ${cityIndex + 3}, ${region.name}`,
      phone: `+43 4875 617${(regionIndex + cityIndex) % 10}`,
      email: `partner.${region.id}${cityIndex + 1}@idm-example.com`,
      special: cityIndex % 2 === 0 ? 'Sanierung & Bestand' : 'Neubau & PV-Integration',
    })),
  }))
}

const directory = buildPartnerDirectory()

export default function PartnerFinderPage() {
  const location = useLocation()
  const [query, setQuery] = useState('')
  const [activeRegion, setActiveRegion] = useState(null)

  useEffect(() => {
    const q = new URLSearchParams(location.search).get('q')
    if (q) setQuery(q)
  }, [location.search])

  const filteredDirectory = useMemo(() => {
    const search = query.trim().toLowerCase()
    if (!search) {
      if (!activeRegion) return directory
      return directory.filter((region) => region.id === activeRegion)
    }

    return directory
      .map((region) => ({
        ...region,
        entries: region.entries.filter((entry) =>
          `${entry.city} ${entry.name} ${entry.address}`.toLowerCase().includes(search)
        ),
      }))
      .filter((region) => region.entries.length > 0)
      .filter((region) => (activeRegion ? region.id === activeRegion : true))
  }, [query, activeRegion])

  const shownPartners = filteredDirectory.reduce((sum, region) => sum + region.entries.length, 0)

  return (
    <div className="bg-white">
      <section className="relative bg-n-950 overflow-hidden">
        <div className="absolute inset-0 bg-gitter-dark pointer-events-none" />
        <div className="absolute inset-0 bg-grid-fine opacity-20 pointer-events-none" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pt-28 pb-16 lg:pt-32 lg:pb-22">
          <span className="text-[11px] font-mono font-semibold text-idm uppercase tracking-[0.2em]">
            Partnerfinder
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-[-0.03em] leading-[0.95]">
            Ihr iDM Partnernetzwerk
            <br />
            <span className="text-gradient-idm">in Europa.</span>
          </h1>
          <p className="mt-6 text-n-400 text-base md:text-lg leading-relaxed max-w-3xl">
            Finden Sie den passenden iDM Fachpartner fuer Beratung, Planung, Installation und Service.
            Unser Netzwerk deckt Wohnbau, Sanierung und Grossprojekte in mehreren Laendern ab.
          </p>
        </div>
      </section>

      <section className="py-14 lg:py-18 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-[0.84fr_1.16fr] gap-6 lg:gap-10 items-start">
            <EuropePartnerMap
              activeRegion={activeRegion}
              onRegionChange={setActiveRegion}
              heightClass="h-[420px] lg:h-[520px]"
              className="order-1 lg:max-w-[650px]"
            />

            <div className="order-2 lg:pl-2">
              <div className="text-[11px] font-mono text-n-400 tracking-[0.2em] uppercase mb-3">
                Suche
              </div>
              <div className="flex gap-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-n-500" />
                  <input
                    type="text"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="PLZ, Ort oder Region eingeben"
                    className="w-full pl-10 pr-4 py-3 border border-n-300 bg-white text-n-900 text-sm focus:outline-none focus:border-idm-dark focus:ring-1 focus:ring-idm/20 transition-all placeholder:text-n-400"
                  />
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-n-900 hover:bg-n-800 text-white font-semibold text-sm transition-all shrink-0 cursor-pointer"
                >
                  Finden
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {partnerRegions.map((region) => (
                  <button
                    key={region.id}
                    onClick={() => setActiveRegion(activeRegion === region.id ? null : region.id)}
                    className={`text-[10px] font-mono tracking-wider px-2.5 py-1 border transition-all duration-300 cursor-pointer ${
                      activeRegion === region.id
                        ? 'border-idm-dark text-idm-dark bg-idm/10'
                        : 'border-n-200 text-n-600 hover:border-n-400 hover:text-n-900'
                    }`}
                  >
                    {region.name.toUpperCase()} ({region.partners})
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 border-t border-n-200 pt-5">
                {[
                  { val: '500+', label: 'Aktive Partner' },
                  { val: `${shownPartners}`, label: 'Treffer aktuell' },
                  { val: '24h', label: 'Rueckmeldung' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-xl font-bold text-n-900 font-mono">{stat.val}</div>
                    <div className="text-[10px] font-mono text-n-500 mt-1 tracking-wider uppercase">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-2 text-sm text-n-600">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-idm-dark mt-0.5" />
                  <span>Zertifizierte iDM Fachpartner mit Produktschulungen.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Wrench className="w-4 h-4 text-idm-dark mt-0.5" />
                  <span>Unterstuetzung von Erstberatung bis Inbetriebnahme.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock3 className="w-4 h-4 text-idm-dark mt-0.5" />
                  <span>Kurze Reaktionszeiten und regionale Betreuung.</span>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href="https://konfigurator.myidm.at/#/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-idm hover:bg-idm-dark text-n-900 text-sm font-semibold transition-all"
                >
                  Projektanfrage starten
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-18 bg-n-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <AnimateIn variant="fadeUp" className="mb-8">
            <span className="text-[11px] font-mono font-semibold text-n-400 uppercase tracking-[0.2em]">
              Partnerverzeichnis
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-n-900 tracking-[-0.02em]">
              Alle Partner im Ueberblick.
            </h2>
          </AnimateIn>

          {filteredDirectory.length === 0 ? (
            <div className="border border-n-200 bg-white p-8">
              <h3 className="text-xl font-bold text-n-900">Keine Treffer fuer "{query}"</h3>
              <p className="mt-2 text-sm text-n-600">
                Bitte pruefen Sie die Eingabe oder waehlen Sie eine andere Region.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredDirectory.map((region) => (
                <div key={region.id}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-n-900">{region.name}</h3>
                    <span className="text-xs font-mono text-n-500 tracking-wider uppercase">
                      {region.entries.length} Treffer
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
                    {region.entries.map((entry) => (
                      <div key={entry.id} className="bg-white border border-n-200 p-5">
                        <div className="text-[10px] font-mono text-idm-dark tracking-[0.16em] uppercase mb-1">
                          {entry.special}
                        </div>
                        <h4 className="text-base font-bold text-n-900">{entry.name}</h4>
                        <p className="text-sm text-n-500 mt-1">{entry.address}</p>
                        <div className="mt-4 space-y-2">
                          <a href={`tel:${entry.phone.replace(/\s+/g, '')}`} className="flex items-center gap-2 text-sm text-n-700 hover:text-n-900">
                            <Phone className="w-3.5 h-3.5 text-idm-dark" />
                            {entry.phone}
                          </a>
                          <a href={`mailto:${entry.email}`} className="flex items-center gap-2 text-sm text-n-700 hover:text-n-900">
                            <Mail className="w-3.5 h-3.5 text-idm-dark" />
                            {entry.email}
                          </a>
                          <div className="flex items-center gap-2 text-sm text-n-700">
                            <MapPin className="w-3.5 h-3.5 text-idm-dark" />
                            {entry.city}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10">
            <Link
              to="/produkte"
              className="inline-flex items-center gap-2 px-6 py-3 border border-n-200 hover:border-n-900 hover:bg-n-900 hover:text-white text-sm font-semibold text-n-700 transition-all"
            >
              Zu den Produkten
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
