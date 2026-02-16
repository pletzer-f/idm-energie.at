import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Download, FileText, Building2,
  Home, Factory, Hotel, MapPin, ExternalLink, Filter
} from 'lucide-react'
import AnimateIn from '../components/animations/AnimateIn'

/* ─── Product Filter Categories ────────────────────────────── */
const filterCategories = [
  { id: 'all', label: 'Alle' },
  { id: 'aero-alm', label: 'AERO ALM' },
  { id: 'aero-alm-max', label: 'AERO ALM MAX' },
  { id: 'aero-slm', label: 'AERO SLM' },
  { id: 'ipump-a', label: 'iPump A' },
  { id: 'terra-sw', label: 'TERRA SW' },
  { id: 'terra-sw-max', label: 'TERRA SW MAX' },
  { id: 'max-alm', label: 'MAX ALM' },
]

/* ─── Reference Projects ──────────────────────────────────── */
const referenceProjects = [
  {
    title: 'Einfamilienhaus Wien Umgebung',
    product: 'aero-alm',
    productLabel: 'AERO ALM',
    type: 'residential',
    location: 'Wien, Oesterreich',
    desc: 'Modernes Einfamilienhaus mit Luft-Waermepumpe fuer Heizung und Kuehlung. Energieeffiziente Loesung mit Fussbodenheizung.',
    image: '/images/house-cutaway-hq.jpg',
  },
  {
    title: 'Romantik Hotel Schloss Pichlarn',
    product: 'terra-sw-max',
    productLabel: 'TERRA SW MAX',
    type: 'commercial',
    location: 'Steiermark, Oesterreich',
    desc: 'Historisches Schlosshotel mit moderner Erdwaerme-Kaskade. Nachhaltige Waermeversorgung fuer 100+ Zimmer.',
    image: '/images/booth-modern.jpeg',
  },
  {
    title: 'SPIEGLTEC — Hightech-Engineering',
    product: 'max-alm',
    productLabel: 'MAX ALM',
    type: 'industrial',
    location: 'Oberoesterreich, Oesterreich',
    desc: 'Gross-Waermepumpe fuer ein Hightech-Ingenieursunternehmen. Heizen und Kuehlen mit einer einzigen Anlage.',
    image: '/images/factory-aerial.jpg',
  },
  {
    title: 'Gruene Energie fuer weisse Berge — SkiWelt Brixen',
    product: 'max-alm',
    productLabel: 'MAX ALM',
    type: 'commercial',
    location: 'Tirol, Oesterreich',
    desc: 'Nachhaltige Beheizung der Bergstation. Waermepumpen-Kaskade fuer extremen Hoehenstandort.',
    image: '/images/hq-building.jpg',
  },
  {
    title: 'Wohnanlage Kartitsch',
    product: 'terra-sw',
    productLabel: 'TERRA SW',
    type: 'residential',
    location: 'Osttirol, Oesterreich',
    desc: 'Mehrfamilienhaus-Anlage mit zentraler Erdwaermepumpe. Effiziente Waermeversorgung fuer alle Wohneinheiten.',
    image: '/images/house-cutaway.jpg',
  },
  {
    title: 'OAMTC Dornbirn',
    product: 'aero-alm-max',
    productLabel: 'AERO ALM MAX',
    type: 'commercial',
    location: 'Vorarlberg, Oesterreich',
    desc: 'Moderne Niederlassung mit leistungsstarker Luft-Waermepumpe fuer Heizung und Warmwasser.',
    image: '/images/engineer.jpg',
  },
  {
    title: 'Whiskydestillerie Peter Affenzeller',
    product: 'aero-alm',
    productLabel: 'AERO ALM',
    type: 'industrial',
    location: 'Oberoesterreich, Oesterreich',
    desc: 'Innovative Waermerueckgewinnung im Destillationsprozess mit iDM Luft-Waermepumpe.',
    image: '/images/booth-yellow.jpeg',
  },
  {
    title: 'Ramsauer Dichtstoffe GmbH',
    product: 'max-alm',
    productLabel: 'MAX ALM',
    type: 'industrial',
    location: 'Salzburg, Oesterreich',
    desc: 'Industrielle Grossanlage fuer Produktionsgebaeude. Waerme und Kuehlung aus einer Anlage.',
    image: '/images/products-logo-concrete.jpg',
  },
  {
    title: 'Nachhaltigkeit trifft Wohnkomfort — Graz',
    product: 'ipump-a',
    productLabel: 'iPump A',
    type: 'residential',
    location: 'Graz, Oesterreich',
    desc: 'Neubau-Einfamilienhaus mit iPUMP A Kompaktsystem. Heizen, Kuehlen und Warmwasser in einem Geraet.',
    image: '/images/aero-garden.jpeg',
  },
  {
    title: 'Buerogebaeude Simma Electronic',
    product: 'aero-slm',
    productLabel: 'AERO SLM',
    type: 'commercial',
    location: 'Vorarlberg, Oesterreich',
    desc: 'Energieeffizientes Buerogebaeude mit Split-Waermepumpe. Niedrige Betriebskosten bei hohem Komfort.',
    image: '/images/engineer-cad.jpg',
  },
  {
    title: 'Hotel im Bezirk Moedling',
    product: 'terra-sw-max',
    productLabel: 'TERRA SW MAX',
    type: 'commercial',
    location: 'Niederoesterreich, Oesterreich',
    desc: 'Hotelanlage mit Erdwaerme-Kaskade. Ganzjaehrige Waerme- und Warmwasserversorgung.',
    image: '/images/navigator-touchscreen.jpeg',
  },
  {
    title: 'Wohnhausanlage Wallnerhof',
    product: 'terra-sw',
    productLabel: 'TERRA SW',
    type: 'residential',
    location: 'Tirol, Oesterreich',
    desc: 'Grosses Wohnbauprojekt mit zentraler Erdwaermepumpen-Loesung und Frischwassertechnik.',
    image: '/images/house-diagram.jpeg',
  },
]

/* ─── Type icons ───────────────────────────────────────────── */
const typeIcons = {
  residential: Home,
  commercial: Hotel,
  industrial: Factory,
}
const typeLabels = {
  residential: 'Wohnbau',
  commercial: 'Gewerbe',
  industrial: 'Industrie',
}

/* ─── Main Page ────────────────────────────────────────────── */
export default function ReferenzenPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return referenceProjects
    return referenceProjects.filter((p) => p.product === activeFilter)
  }, [activeFilter])

  return (
    <div className="bg-white">
      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative bg-n-950 overflow-hidden min-h-[600px] lg:min-h-[680px]">
        <div className="absolute inset-0 bg-gitter-dark pointer-events-none" />
        <div className="absolute inset-0 bg-grid-fine opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 min-h-[600px] lg:min-h-[680px] flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl pt-24 pb-12 lg:pt-20 lg:pb-0"
          >
            <Link to="/" className="inline-flex items-center gap-2 text-n-500 text-xs font-mono tracking-wider hover:text-white transition-colors mb-6">
              <ArrowLeft className="w-3 h-3" /> STARTSEITE
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-5 h-5 text-idm" />
              <span className="text-[11px] font-mono text-idm uppercase tracking-[0.2em]">Referenzen</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em] leading-[1.05]">
              Referenzanlagen.{'\n'}
              <span className="text-gradient-idm">Unsere Projekte sprechen fuer sich.</span>
            </h1>

            <p className="mt-5 text-n-400 text-sm md:text-base leading-relaxed max-w-lg">
              Von Einfamilienhaeusern bis zu industriellen Grossanlagen — ueber 100.000 installierte
              Waermepumpen in ganz Europa. Entdecken Sie unsere Referenzprojekte.
            </p>

            {/* Quick stats */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { value: '100k+', label: 'Installationen' },
                { value: '10+', label: 'Laender' },
                { value: '37+', label: 'Referenzprojekte' },
                { value: '1.500kW', label: 'Max. Leistung' },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="bg-white/[0.04] border border-n-800 p-2.5"
                >
                  <span className="text-lg font-mono font-bold text-idm block">{s.value}</span>
                  <span className="text-[10px] font-mono text-n-600 tracking-wider block mt-0.5">{s.label.toUpperCase()}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Referenzhandbuch PDF Download ─────────────── */}
      <section className="py-16 lg:py-20 bg-idm/[0.04] border-b border-idm/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <AnimateIn variant="fadeUp">
            <div className="grid lg:grid-cols-[auto_1fr] gap-8 items-center">
              {/* PDF Preview */}
              <div className="relative w-48 lg:w-56 mx-auto lg:mx-0">
                <div className="aspect-[210/297] bg-white border border-n-200 shadow-lg p-4 flex flex-col items-center justify-center">
                  <FileText className="w-12 h-12 text-idm mb-3" />
                  <span className="text-[10px] font-mono font-bold text-n-900 uppercase tracking-wider text-center">Referenzhandbuch</span>
                  <span className="text-[24px] font-bold text-n-900 font-mono mt-1">2025</span>
                  <div className="mt-3 w-full h-[2px] bg-idm" />
                  <span className="text-[9px] font-mono text-n-400 mt-2 tracking-wider">iDM ENERGIESYSTEME</span>
                </div>
                <div className="absolute -bottom-2 -right-2 w-full h-full border border-n-200 -z-10" />
              </div>

              {/* Content */}
              <div>
                <span className="text-[11px] font-mono font-semibold text-idm-dark uppercase tracking-[0.2em]">PDF Download</span>
                <h2 className="mt-2 text-2xl md:text-3xl font-bold text-n-900 tracking-[-0.02em]">
                  Referenzhandbuch 2025
                </h2>
                <p className="mt-3 text-sm text-n-500 leading-relaxed max-w-xl">
                  Alle Referenzprojekte in einem umfassenden Handbuch. Detaillierte Beschreibungen,
                  technische Daten und Erfahrungsberichte — ideal fuer Planer, Fachpartner und Bauherren.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-4 text-[12px] font-mono text-n-400">
                    <span>PDF</span>
                    <span className="w-1 h-1 bg-n-300 rounded-full" />
                    <span>~15 MB</span>
                    <span className="w-1 h-1 bg-n-300 rounded-full" />
                    <span>Deutsch</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="https://www.idm-energie.at/wp-content/uploads/2025/04/Referenzhandbuch_2025_ANSICHT.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-6 py-3 bg-idm hover:bg-idm-dark text-n-900 font-semibold text-sm transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Referenzhandbuch herunterladen
                    <ExternalLink className="w-3 h-3 opacity-50" />
                  </a>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Filter Bar ───────────────────────────────── */}
      <section className="sticky top-16 lg:top-[72px] z-30 bg-white border-b border-n-100 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-4">
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-mono font-semibold text-n-400 uppercase tracking-wider shrink-0 hidden lg:block">Filtern:</span>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-n-200 text-sm font-medium text-n-700"
            >
              <Filter className="w-4 h-4" />
              Filter nach Produkt
            </button>

            {/* Filter pills — desktop always visible */}
            <div className={`${showFilters ? 'flex' : 'hidden'} lg:flex flex-wrap gap-1`}>
              {filterCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`px-3 py-2 text-[11px] font-mono font-semibold uppercase tracking-wider transition-all ${
                    activeFilter === cat.id
                      ? 'bg-n-900 text-white'
                      : 'bg-n-50 text-n-500 hover:bg-n-100 hover:text-n-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Count */}
            <span className="text-[11px] font-mono text-n-400 ml-auto shrink-0">
              {filtered.length} {filtered.length === 1 ? 'Projekt' : 'Projekte'}
            </span>
          </div>
        </div>
      </section>

      {/* ── Reference Projects Grid ──────────────────── */}
      <section className="py-12 lg:py-16 bg-white min-h-[60vh]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((project, i) => {
              const TypeIcon = typeIcons[project.type] || Building2
              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group border border-n-100 hover:border-n-200 transition-all duration-300 overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      loading="lazy"
                      decoding="async"
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-n-950/50 to-transparent" />

                    {/* Product badge */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex px-2 py-1 bg-idm text-n-900 text-[10px] font-mono font-bold tracking-wider">
                        {project.productLabel}
                      </span>
                    </div>

                    {/* Type badge */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-n-950/70 backdrop-blur-sm px-2 py-1">
                      <TypeIcon className="w-3 h-3 text-n-400" />
                      <span className="text-[10px] font-mono text-n-300 tracking-wider">{typeLabels[project.type]}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-base font-bold text-n-900 mb-1.5 leading-snug">{project.title}</h3>
                    <div className="flex items-center gap-1.5 mb-3">
                      <MapPin className="w-3 h-3 text-n-400" />
                      <span className="text-[11px] font-mono text-n-400">{project.location}</span>
                    </div>
                    <p className="text-sm text-n-500 leading-relaxed">{project.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <Building2 className="w-8 h-8 text-n-300 mx-auto mb-3" />
              <p className="text-sm text-n-500">Keine Referenzprojekte fuer diesen Filter gefunden.</p>
              <button
                onClick={() => setActiveFilter('all')}
                className="mt-3 text-sm text-idm-dark hover:text-n-900 font-medium transition-colors"
              >
                Alle Projekte anzeigen
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Partner CTA ──────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-n-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <AnimateIn variant="fadeUp">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-[11px] font-mono font-semibold text-n-400 uppercase tracking-[0.2em]">Ihr Projekt</span>
                <h2 className="mt-2 text-3xl md:text-4xl font-bold text-n-900 tracking-[-0.02em]">
                  Werden Sie unsere{' '}
                  <span className="text-gradient-idm">naechste Referenz.</span>
                </h2>
                <p className="mt-4 text-sm text-n-500 leading-relaxed max-w-lg">
                  Ob Neubau, Sanierung oder Gewerbeprojekt — unsere Fachpartner finden die
                  perfekte Waermepumpen-Loesung fuer Ihre Anforderungen. Lassen Sie sich beraten.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/tools/partnerfinder"
                    className="group inline-flex items-center gap-2 px-6 py-3 bg-idm hover:bg-idm-dark text-n-900 font-semibold text-sm transition-all"
                  >
                    Partner finden
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/produkte"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-n-200 hover:border-n-900 text-n-900 text-sm font-medium transition-all"
                  >
                    Produkte entdecken
                  </Link>
                </div>
              </div>

              <div className="relative">
                <img
                  loading="lazy"
                  decoding="async"
                  src="/images/house-cutaway-hq.jpg"
                  alt="Waermepumpe im Einfamilienhaus"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gitter opacity-30 mix-blend-overlay" />
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="bg-n-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gitter-dark pointer-events-none" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.02em]">
                Interesse an unserer Waermepumpe?
              </h3>
              <p className="text-n-500 text-sm mt-2 max-w-lg">
                Kontaktieren Sie uns oder konfigurieren Sie Ihr System online.
              </p>
            </div>
            <div className="flex gap-3">
              <a
                href="https://konfigurator.myidm.at"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-idm hover:bg-idm-dark text-n-900 font-semibold text-sm transition-all"
              >
                Jetzt konfigurieren
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                to="/service"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 text-white hover:border-white/30 text-sm font-medium transition-all"
              >
                Service
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
