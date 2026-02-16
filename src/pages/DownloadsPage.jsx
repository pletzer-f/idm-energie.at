import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Search, FileText, Download, Filter,
  BookOpen, FileSpreadsheet, Image, ChevronDown
} from 'lucide-react'
import AnimateIn from '../components/animations/AnimateIn'

/* ─── Download Data ─────────────────────────────────────────── */
const categories = [
  { id: 'all', label: 'Alle' },
  { id: 'datenblatt', label: 'Datenblaetter' },
  { id: 'anleitung', label: 'Anleitungen' },
  { id: 'planung', label: 'Planungsunterlagen' },
  { id: 'zertifikat', label: 'Zertifikate' },
  { id: 'software', label: 'Software' },
]

const audiences = [
  { id: 'all', label: 'Alle' },
  { id: 'endkunde', label: 'Endkunde' },
  { id: 'fachpartner', label: 'Fachpartner' },
  { id: 'planer', label: 'Planer' },
]

const downloads = [
  // Datenblaetter
  {
    title: 'AERO ALM 2-17 Datenblatt',
    category: 'datenblatt',
    audience: 'fachpartner',
    product: 'AERO ALM',
    format: 'PDF',
    size: '2.4 MB',
    date: '2026-01',
    icon: FileText,
  },
  {
    title: 'TERRA SWM Datenblatt',
    category: 'datenblatt',
    audience: 'fachpartner',
    product: 'TERRA SWM',
    format: 'PDF',
    size: '1.8 MB',
    date: '2025-11',
    icon: FileText,
  },
  {
    title: 'iPUMP A ONE Produktbeschreibung',
    category: 'datenblatt',
    audience: 'endkunde',
    product: 'iPUMP',
    format: 'PDF',
    size: '3.1 MB',
    date: '2026-02',
    icon: FileText,
  },
  {
    title: 'MAX ALM Gross-Waermepumpen Uebersicht',
    category: 'datenblatt',
    audience: 'planer',
    product: 'MAX',
    format: 'PDF',
    size: '4.2 MB',
    date: '2025-12',
    icon: FileText,
  },
  // Anleitungen
  {
    title: 'NAVIGATOR 2.0 Bedienungsanleitung',
    category: 'anleitung',
    audience: 'endkunde',
    product: 'NAVIGATOR',
    format: 'PDF',
    size: '5.6 MB',
    date: '2026-01',
    icon: BookOpen,
  },
  {
    title: 'AERO ALM Installationsanleitung',
    category: 'anleitung',
    audience: 'fachpartner',
    product: 'AERO ALM',
    format: 'PDF',
    size: '8.3 MB',
    date: '2025-10',
    icon: BookOpen,
  },
  {
    title: 'myiDM Portal Benutzerhandbuch',
    category: 'anleitung',
    audience: 'endkunde',
    product: 'myiDM',
    format: 'PDF',
    size: '2.1 MB',
    date: '2026-02',
    icon: BookOpen,
  },
  // Planungsunterlagen
  {
    title: 'Hydraulik-Schemata Sammlung 2026',
    category: 'planung',
    audience: 'planer',
    product: 'Alle',
    format: 'PDF',
    size: '12.4 MB',
    date: '2026-01',
    icon: FileSpreadsheet,
  },
  {
    title: 'Ausschreibungstexte AERO ALM',
    category: 'planung',
    audience: 'planer',
    product: 'AERO ALM',
    format: 'DOCX',
    size: '0.8 MB',
    date: '2025-12',
    icon: FileSpreadsheet,
  },
  {
    title: 'Planungshandbuch Gewerbe-Kaskade',
    category: 'planung',
    audience: 'planer',
    product: 'MAX',
    format: 'PDF',
    size: '15.2 MB',
    date: '2025-09',
    icon: FileSpreadsheet,
  },
  // Zertifikate
  {
    title: 'EHPA Guetesiegel — alle Modelle',
    category: 'zertifikat',
    audience: 'fachpartner',
    product: 'Alle',
    format: 'PDF',
    size: '1.2 MB',
    date: '2026-01',
    icon: Image,
  },
  {
    title: 'ErP Energielabel Sammlung',
    category: 'zertifikat',
    audience: 'endkunde',
    product: 'Alle',
    format: 'PDF',
    size: '3.5 MB',
    date: '2025-11',
    icon: Image,
  },
  // Software
  {
    title: 'iDM Konfigurator (Desktop App)',
    category: 'software',
    audience: 'fachpartner',
    product: 'Alle',
    format: 'EXE',
    size: '45 MB',
    date: '2026-02',
    icon: Download,
  },
  {
    title: 'BACnet/Modbus Parameter-Liste',
    category: 'software',
    audience: 'planer',
    product: 'NAVIGATOR',
    format: 'XLSX',
    size: '0.4 MB',
    date: '2025-12',
    icon: FileSpreadsheet,
  },
]

/* ─── Main Page ────────────────────────────────────────────── */
export default function DownloadsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeAudience, setActiveAudience] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    return downloads.filter((d) => {
      const matchCategory = activeCategory === 'all' || d.category === activeCategory
      const matchAudience = activeAudience === 'all' || d.audience === activeAudience
      const matchSearch =
        !searchQuery.trim() ||
        d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.product.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCategory && matchAudience && matchSearch
    })
  }, [searchQuery, activeCategory, activeAudience])

  const formatIcons = {
    PDF: FileText,
    DOCX: FileText,
    XLSX: FileSpreadsheet,
    EXE: Download,
  }

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
              <Download className="w-5 h-5 text-idm" />
              <span className="text-[11px] font-mono text-idm uppercase tracking-[0.2em]">Service</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em] leading-[1.05]">
              Downloads.{'\n'}
              <span className="text-gradient-idm">Alle Dokumente an einem Ort.</span>
            </h1>

            <p className="mt-5 text-n-400 text-sm md:text-base leading-relaxed max-w-lg">
              Datenblaetter, Anleitungen, Planungsunterlagen und Zertifikate — fuer Endkunden,
              Fachpartner und Planer. Schnell finden, direkt herunterladen.
            </p>

            {/* Quick stats */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { value: '200+', label: 'Dokumente' },
                { value: '14', label: 'Produktlinien' },
                { value: '3', label: 'Zielgruppen' },
                { value: '2026', label: 'Aktualisiert' },
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

      {/* ── Search & Filter Bar ────────────────────────── */}
      <section className="sticky top-16 lg:top-[72px] z-30 bg-white border-b border-n-100 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-n-400" />
              <input
                type="text"
                placeholder="Dokument suchen (z.B. AERO ALM Datenblatt)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-n-50 border border-n-100 text-sm text-n-900 placeholder:text-n-400 font-mono tracking-wide focus:outline-none focus:border-idm focus:ring-1 focus:ring-idm/20 transition-colors"
              />
            </div>

            {/* Filter toggle — mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 border border-n-200 text-sm font-medium text-n-700"
            >
              <Filter className="w-4 h-4" />
              Filter
              <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {/* Category and Audience filters — desktop always visible */}
            <div className={`${showFilters ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row gap-3`}>
              {/* Category filter */}
              <div className="flex flex-wrap gap-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-2 text-[11px] font-mono font-semibold uppercase tracking-wider transition-all ${
                      activeCategory === cat.id
                        ? 'bg-n-900 text-white'
                        : 'bg-n-50 text-n-500 hover:bg-n-100 hover:text-n-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Audience toggle */}
              <div className="flex gap-1 border-l border-n-200 pl-3">
                {audiences.map((aud) => (
                  <button
                    key={aud.id}
                    onClick={() => setActiveAudience(aud.id)}
                    className={`px-3 py-2 text-[11px] font-mono font-semibold uppercase tracking-wider transition-all ${
                      activeAudience === aud.id
                        ? 'bg-idm text-n-900'
                        : 'bg-n-50 text-n-500 hover:bg-n-100 hover:text-n-700'
                    }`}
                  >
                    {aud.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Downloads List ─────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white min-h-[60vh]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          {/* Results count */}
          <div className="mb-6 flex items-center justify-between">
            <span className="text-[11px] font-mono text-n-400 uppercase tracking-wider">
              {filtered.length} {filtered.length === 1 ? 'Dokument' : 'Dokumente'} gefunden
            </span>
          </div>

          {/* Table-like list */}
          <div className="border border-n-100">
            {/* Table header — desktop */}
            <div className="hidden lg:grid grid-cols-[1fr_120px_100px_80px_80px_60px] gap-4 px-6 py-3 bg-n-50 border-b border-n-100">
              <span className="text-[10px] font-mono font-semibold text-n-400 uppercase tracking-wider">Dokument</span>
              <span className="text-[10px] font-mono font-semibold text-n-400 uppercase tracking-wider">Produkt</span>
              <span className="text-[10px] font-mono font-semibold text-n-400 uppercase tracking-wider">Kategorie</span>
              <span className="text-[10px] font-mono font-semibold text-n-400 uppercase tracking-wider">Format</span>
              <span className="text-[10px] font-mono font-semibold text-n-400 uppercase tracking-wider">Groesse</span>
              <span />
            </div>

            {filtered.map((doc, i) => {
              const Icon = doc.icon || FileText
              const audienceLabel =
                doc.audience === 'endkunde' ? 'Endkunde' :
                doc.audience === 'fachpartner' ? 'Fachpartner' : 'Planer'

              return (
                <motion.div
                  key={doc.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className="group grid grid-cols-1 lg:grid-cols-[1fr_120px_100px_80px_80px_60px] gap-2 lg:gap-4 px-6 py-4 border-b border-n-50 hover:bg-n-50/50 transition-colors items-center"
                >
                  {/* Title + audience badge */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-n-100 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-n-500" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-n-900 truncate">{doc.title}</div>
                      <span className="lg:hidden text-[10px] font-mono text-n-400">{doc.product} · {doc.format} · {doc.size}</span>
                    </div>
                    <span className={`hidden lg:inline-flex shrink-0 text-[9px] font-mono font-semibold uppercase tracking-wider px-1.5 py-0.5 ${
                      doc.audience === 'endkunde' ? 'bg-blue-50 text-blue-600' :
                      doc.audience === 'fachpartner' ? 'bg-amber-50 text-amber-600' :
                      'bg-green-50 text-green-600'
                    }`}>
                      {audienceLabel}
                    </span>
                  </div>

                  <span className="hidden lg:block text-[12px] font-mono text-n-500">{doc.product}</span>
                  <span className="hidden lg:block text-[12px] font-mono text-n-400 capitalize">
                    {categories.find((c) => c.id === doc.category)?.label || doc.category}
                  </span>
                  <span className="hidden lg:block text-[12px] font-mono text-n-500">{doc.format}</span>
                  <span className="hidden lg:block text-[12px] font-mono text-n-400">{doc.size}</span>

                  {/* Download button */}
                  <button className="w-9 h-9 flex items-center justify-center bg-n-100 group-hover:bg-idm transition-colors shrink-0 justify-self-end lg:justify-self-center">
                    <Download className="w-4 h-4 text-n-500 group-hover:text-n-900 transition-colors" />
                  </button>
                </motion.div>
              )
            })}

            {filtered.length === 0 && (
              <div className="py-16 text-center">
                <Search className="w-8 h-8 text-n-300 mx-auto mb-3" />
                <p className="text-sm text-n-500">Keine Dokumente gefunden.</p>
                <p className="text-[12px] text-n-400 mt-1">Versuchen Sie andere Suchbegriffe oder Filter.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Need Help CTA ──────────────────────────────── */}
      <section className="bg-n-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gitter-dark pointer-events-none" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.02em]">
                Dokument nicht gefunden?
              </h3>
              <p className="text-n-500 text-sm mt-2 max-w-lg">
                Kontaktieren Sie unseren Support — wir senden Ihnen die gewuenschten Unterlagen.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/service/after-sales"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-idm hover:bg-idm-dark text-n-900 font-semibold text-sm transition-all"
              >
                Zum Support
                <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
