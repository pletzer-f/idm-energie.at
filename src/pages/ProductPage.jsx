import { useParams, Link } from 'react-router-dom'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, ArrowLeft, Download, Phone, ChevronDown, Eye } from 'lucide-react'
import AnimateIn from '../components/animations/AnimateIn'

/* ─── Product Data ─────────────────────────────────────────────── */
const productData = {
  'luft-waermepumpen': {
    name: 'AERO',
    tagline: 'Luft-Waermepumpen',
    headline: 'Energie aus der Luft.\nEffizient. Flexibel. Leise.',
    description: 'Die AERO-Serie nutzt die Aussenluft als Waermequelle — die einfachste und flexibelste Loesung fuer Neubau und Sanierung. Modulierend, fluesterleise und mit Vorlauftemperaturen bis 70°C.',
    heroImage: '/images/luftwaermepumpe.png',
    highlights: [
      { label: 'Leistungsbereich', value: '2 – 50 kW' },
      { label: 'Vorlauftemperatur', value: 'bis 70°C' },
      { label: 'Kaeltemittel', value: 'R290 / R454C' },
      { label: 'Schallleistung', value: 'ab 35 dB(A)' },
    ],
    benefits: [
      { title: 'Modulierend', desc: 'Stufenlose Leistungsanpassung fuer maximale Effizienz bei Teillast und voller Last.' },
      { title: 'Fluesterleise', desc: 'Ab 35 dB(A) — leiser als ein Kuehlschrank. Ideal fuer dichte Wohngebiete.' },
      { title: 'Natuerliches Kaeltemittel', desc: 'R290 mit GWP von nur 3 — zukunftssicher und klimafreundlich.' },
      { title: 'Heizen & Kuehlen', desc: 'Aktive Kuehlung im Sommer inklusive — fuer ganzjaehrigen Komfort.' },
    ],
    models: [
      { name: 'AERO ALM 2-8', capacity: '2-8 kW', type: 'Monoblock', refrigerant: 'R290', cop: '5.12', sound: '35 dB(A)' },
      { name: 'AERO ALM 4-12', capacity: '4-12 kW', type: 'Monoblock', refrigerant: 'R290', cop: '4.82', sound: '38 dB(A)' },
      { name: 'AERO ALM 6-15', capacity: '6-15 kW', type: 'Monoblock', refrigerant: 'R454C', cop: '4.65', sound: '40 dB(A)' },
      { name: 'AERO ALM 10-50 MAX', capacity: '10-50 kW', type: 'Monoblock', refrigerant: 'R454C', cop: '4.31', sound: '45 dB(A)' },
      { name: 'AERO SLM 3-11', capacity: '3-11 kW', type: 'Split', refrigerant: 'R290', cop: '4.95', sound: '36 dB(A)' },
      { name: 'AERO SLM 6-17', capacity: '6-17 kW', type: 'Split', refrigerant: 'R290', cop: '4.72', sound: '39 dB(A)' },
    ],
    useCases: ['Einfamilienhaus Neubau', 'Sanierung bis 70°C', 'Mehrfamilienhaus', 'Gewerbe & Hotel'],
  },
  'erdwaermepumpen': {
    name: 'TERRA',
    tagline: 'Erdwaermepumpen',
    headline: 'Konstante Kraft der Erde.\nMaximale Effizienz.',
    description: 'Die TERRA-Serie erschliesst die gleichmaessige Temperatur des Erdreichs als zuverlaessigste Waermequelle. Fuer maximale Effizienz, minimale Betriebskosten — das ganze Jahr.',
    heroImage: '/images/erdwaermepumpe.png',
    highlights: [
      { label: 'Leistungsbereich', value: '3 – 140 kW' },
      { label: 'Vorlauftemperatur', value: 'bis 70°C' },
      { label: 'Kaeltemittel', value: 'R290 / R454C' },
      { label: 'SCOP', value: 'bis 5.07' },
    ],
    benefits: [
      { title: 'Hoechste Effizienz', desc: 'SCOP bis 5.07 — die Erde liefert konstant 10°C, unabhaengig von der Aussentemperatur.' },
      { title: 'Twin-Kompressor', desc: 'Zwei unabhaengige Verdichter fuer maximale Redundanz und optimale Teillasteffizienz.' },
      { title: 'Passive Kuehlung', desc: 'Im Sommer kuehlt das Erdreich Ihr Zuhause fast ohne Energieaufwand.' },
      { title: 'Kompakte Bauweise', desc: 'Nur 1 m² Stellflaeche — auch die 140 kW Variante passt in jeden Technikraum.' },
    ],
    models: [
      { name: 'TERRA SWM 3-13', capacity: '3-13 kW', type: 'Sole/Wasser', refrigerant: 'R290', cop: '5.07', sound: '32 dB(A)' },
      { name: 'TERRA SWM 6-17', capacity: '6-17 kW', type: 'Sole/Wasser', refrigerant: 'R290', cop: '4.89', sound: '34 dB(A)' },
      { name: 'TERRA SW TWIN', capacity: 'bis 40 kW', type: 'Twin', refrigerant: 'R454C', cop: '4.72', sound: '36 dB(A)' },
      { name: 'TERRA SW TWIN H', capacity: 'bis 40 kW', type: 'Hochtemp.', refrigerant: 'R454C', cop: '4.21', sound: '37 dB(A)' },
      { name: 'TERRA SW 55 MAX', capacity: '55 kW', type: 'Sole/Wasser', refrigerant: 'R454C', cop: '5.07', sound: '40 dB(A)' },
      { name: 'TERRA SW 140 MAX', capacity: '140 kW', type: 'Sole/Wasser', refrigerant: 'R454C', cop: '4.65', sound: '44 dB(A)' },
    ],
    useCases: ['Einfamilienhaus Neubau', 'Passivhaus', 'Sanierung', 'Grosse Gebaeude'],
  },
  'ipump': {
    name: 'iPUMP',
    tagline: 'Kompaktsysteme',
    headline: 'Alles. In einem Geraet.\nKompakt und komplett.',
    description: 'Heizen, kuehlen, Warmwasser — die iPUMP vereint modernste Waermepumpen-Technologie mit integriertem Speicher. Auf minimaler Stellflaeche, mit maximalem Komfort und R290.',
    heroImage: '/images/products-lineup-transparent.png',
    highlights: [
      { label: 'Leistungsbereich', value: '2 – 12 kW' },
      { label: 'Speicher', value: 'bis 432 Liter' },
      { label: 'Kaeltemittel', value: 'R290' },
      { label: 'Stellflaeche', value: 'ab 0,45 m²' },
    ],
    benefits: [
      { title: 'All-in-One', desc: 'Waermepumpe, Speicher, Regelung und Kuehlung in einem einzigen Geraet.' },
      { title: 'Kleinste Stellflaeche', desc: 'Ab 0,45 m² — passt in jeden Hauswirtschaftsraum oder Keller.' },
      { title: 'R290', desc: 'Natuerliches Kaeltemittel mit GWP von 3 — zukunftssicher nach F-Gase-Verordnung.' },
      { title: 'Sanierungsloesung', desc: 'Die iPUMP N5 ist speziell fuer den einfachen Umstieg im Mehrfamilienhaus.' },
    ],
    models: [
      { name: 'iPUMP A ONE', capacity: '4-12 kW', type: 'All-in-One', refrigerant: 'R290', cop: '4.65', sound: '38 dB(A)' },
      { name: 'iPUMP A12 ONE', capacity: '4-12 kW', type: 'All-in-One', refrigerant: 'R290', cop: '4.55', sound: '39 dB(A)' },
      { name: 'iPUMP A 2-7', capacity: '2-7 kW', type: 'Kompakt', refrigerant: 'R290', cop: '4.82', sound: '36 dB(A)' },
      { name: 'iPUMP A 3-11', capacity: '3-11 kW', type: 'Kompakt', refrigerant: 'R290', cop: '4.72', sound: '37 dB(A)' },
      { name: 'iPUMP N5', capacity: 'variabel', type: 'Sanierung', refrigerant: 'R290', cop: '4.20', sound: '40 dB(A)' },
    ],
    useCases: ['Einfamilienhaus Neubau', 'Sanierung Einfamilien', 'Sanierung Mehrfamilien', 'Platzsparend'],
  },
  'grosswaermepumpen': {
    name: 'MAX',
    tagline: 'Gross-Waermepumpen',
    headline: 'Kraft fuer grosse Projekte.\nBis 1.500 kW.',
    description: 'Wenn es um grosse Leistung geht, ist MAX die Antwort. Durch intelligente Kaskadierung bis zu 1.500 kW — fuer Hotels, Wohnanlagen, Gewerbe- und Industriegebaeude.',
    heroImage: '/images/products-lineup-transparent.png',
    highlights: [
      { label: 'Leistungsbereich', value: 'bis 1.500 kW' },
      { label: 'Kaskadierung', value: 'bis 10 Geraete' },
      { label: 'Vorlauftemperatur', value: 'bis 65°C' },
      { label: 'Schnittstellen', value: 'BACnet / Modbus' },
    ],
    benefits: [
      { title: 'Kaskadierbar', desc: 'Bis zu 10 Geraete in Kaskade — fuer Leistungen bis 1.500 kW.' },
      { title: 'Gebaeudeautomation', desc: 'BACnet und Modbus Schnittstellen fuer nahtlose Integration.' },
      { title: 'Kompakt', desc: 'Trotz hoher Leistung kompakte Abmessungen fuer den Technikraum.' },
      { title: 'Redundanz', desc: 'Mehrere Geraete sichern den Betrieb — auch bei Wartung oder Stoerung.' },
    ],
    models: [
      { name: 'MAX ALM 10-50', capacity: '10-50 kW', type: 'Luft/Wasser', refrigerant: 'R454C', cop: '4.31', sound: '45 dB(A)' },
      { name: 'MAX SW 55', capacity: '55 kW', type: 'Sole/Wasser', refrigerant: 'R454C', cop: '5.07', sound: '40 dB(A)' },
      { name: 'MAX SW 110', capacity: '110 kW', type: 'Sole/Wasser', refrigerant: 'R454C', cop: '4.82', sound: '42 dB(A)' },
      { name: 'MAX SW 140', capacity: '140 kW', type: 'Sole/Wasser', refrigerant: 'R454C', cop: '4.65', sound: '44 dB(A)' },
    ],
    useCases: ['Hotels & Gastronomie', 'Wohnanlagen', 'Gewerbe', 'Industrie & Quartier'],
  },
  'navigator': {
    name: 'NAVIGATOR',
    tagline: 'Intelligente Steuerung',
    headline: 'Volle Kontrolle.\nIntelligent vernetzt.',
    description: 'Der NAVIGATOR macht Ihre Waermepumpe intelligent. Mit 7-Zoll-Touchscreen, KI-basierter iON-Technologie und integriertem Energiemanagement.',
    heroImage: '/images/navigator-touchscreen.jpeg',
    highlights: [
      { label: 'Display', value: '7" Touchscreen' },
      { label: 'KI', value: 'iON Technologie' },
      { label: 'Fernzugriff', value: 'myiDM App' },
      { label: 'Smart Home', value: 'KNX / Modbus' },
    ],
    benefits: [
      { title: 'iON KI', desc: 'Lernt Ihr Heizverhalten, nutzt Wetterprognosen und optimiert Ihren Verbrauch automatisch.' },
      { title: '7" Touchscreen', desc: 'Intuitive Bedienung direkt am Geraet — uebersichtlich und selbsterklaerend.' },
      { title: 'myiDM App', desc: 'Volle Kontrolle von ueberall — Monitoring, Einstellungen und Benachrichtigungen.' },
      { title: 'PV-Integration', desc: 'Intelligentes Eigenverbrauchsmanagement mit Ihrer Photovoltaikanlage.' },
    ],
    models: [
      { name: 'NAVIGATOR 2.0', capacity: '—', type: 'Steuerung', refrigerant: '—', cop: '—', sound: '—' },
      { name: 'iON Modul', capacity: '—', type: 'KI-Erweiterung', refrigerant: '—', cop: '—', sound: '—' },
    ],
    useCases: ['Alle iDM Waermepumpen', 'Smart Home Integration', 'PV-Eigenverbrauch', 'Gewerbe-Monitoring'],
  },
  'speicher': {
    name: 'HYGIENIK',
    tagline: 'Speicherloesungen',
    headline: 'Hygienisches Warmwasser.\nFrisch bei jeder Entnahme.',
    description: 'Unsere HYGIENIK Speicher erwaermen Trinkwasser im Durchlaufprinzip — ohne stehende Wassermengen. Fuer hoechste Hygienestandards und legionellenfreien Betrieb.',
    heroImage: '/images/hygienik.png',
    highlights: [
      { label: 'Prinzip', value: 'Frischwasser' },
      { label: 'Hygiene', value: 'Legionellenfrei' },
      { label: 'Volumen', value: 'bis 2.000 Liter' },
      { label: 'Effizienz', value: 'Klasse A+' },
    ],
    benefits: [
      { title: 'Frischwasser', desc: 'Trinkwasser wird erst bei Bedarf erwaermt — keine stehenden Wassermengen.' },
      { title: 'Legionellenfrei', desc: 'Durch das Durchlaufprinzip entsteht kein Risiko fuer Legionellenbildung.' },
      { title: 'Schichtenspeicher', desc: 'Optimale Temperaturschichtung fuer maximale Effizienz der Waermepumpe.' },
      { title: 'Kombi-Loesung', desc: 'Heizungspuffer und Warmwasser in einem System — platzsparend und effizient.' },
    ],
    models: [
      { name: 'HYGIENIK 500', capacity: '500 l', type: 'Frischwasser', refrigerant: '—', cop: '—', sound: '—' },
      { name: 'HYGIENIK 800', capacity: '800 l', type: 'Frischwasser', refrigerant: '—', cop: '—', sound: '—' },
      { name: 'HYGIENIK 1000', capacity: '1000 l', type: 'Frischwasser', refrigerant: '—', cop: '—', sound: '—' },
      { name: 'HYGIENIK 2000', capacity: '2000 l', type: 'Frischwasser', refrigerant: '—', cop: '—', sound: '—' },
    ],
    useCases: ['Einfamilienhaus', 'Mehrfamilienhaus', 'Hotel & Gastronomie', 'Gewerbe'],
  },
}

/* ─── Page Component ───────────────────────────────────────────── */
export default function ProductPage() {
  const { slug } = useParams()
  const product = productData[slug]
  const [showAllModels, setShowAllModels] = useState(false)
  const specsRef = useRef(null)
  const specsInView = useInView(specsRef, { once: true, margin: '-50px' })

  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-n-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-n-900 mb-4">Produkt nicht gefunden</h1>
          <Link to="/produkte" className="text-idm-dark font-semibold text-sm">Alle Produkte ansehen</Link>
        </div>
      </div>
    )
  }

  const visibleModels = showAllModels ? product.models : product.models.slice(0, 4)

  return (
    <div className="bg-white">
      {/* ── Hero — fixed height across all product pages ──────── */}
      <section className="relative bg-n-950 overflow-hidden lg:h-[680px]">
        <div className="absolute inset-0 bg-gitter-dark pointer-events-none" />
        <div className="absolute inset-0 bg-grid-fine opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 h-full">
          <div className="grid lg:grid-cols-2 gap-10 items-center pt-20 lg:pt-16 pb-12 lg:pb-0 lg:h-full">
            {/* Text */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <Link to="/produkte" className="inline-flex items-center gap-2 text-n-500 text-xs font-mono tracking-wider hover:text-white transition-colors mb-6">
                <ArrowLeft className="w-3 h-3" /> ALLE PRODUKTE
              </Link>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-idm" />
                <span className="text-[11px] font-mono text-idm uppercase tracking-[0.2em]">{product.tagline}</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em] whitespace-pre-line leading-[1.05]">
                {product.headline}
              </h1>

              <p className="mt-5 text-n-400 text-sm md:text-base leading-relaxed max-w-lg">
                {product.description}
              </p>

              {/* Highlight specs */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
                {product.highlights.map((h, i) => (
                  <motion.div
                    key={h.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="bg-white/[0.04] border border-n-800 p-2.5"
                  >
                    <span className="text-[10px] font-mono text-n-600 tracking-wider block">{h.label.toUpperCase()}</span>
                    <span className="text-sm font-mono font-bold text-idm mt-0.5 block">{h.value}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-3">
                <a href="https://konfigurator.myidm.at/#/" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 sm:px-6 py-3 bg-idm hover:bg-idm-dark text-n-900 font-semibold text-sm transition-all">
                  Jetzt konfigurieren <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="https://vr.idm-energie.at/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 sm:px-6 py-3 border border-white/15 text-white hover:border-white/30 text-sm font-medium transition-all">
                  <Eye className="w-4 h-4" /> Showroom
                </a>
                <a href="#modelle" className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 sm:px-6 py-3 border border-white/15 text-white hover:border-white/30 text-sm font-medium transition-all">
                  <Download className="w-4 h-4" /> Datenblatt
                </a>
              </div>
            </motion.div>

            {/* Product image — transparent PNG, no background */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex items-center justify-center"
            >
              <img
                src={product.heroImage}
                alt={product.name}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="relative z-10 w-full max-w-[460px] mx-auto h-auto object-contain drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Benefits — Consumer focused ──────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <AnimateIn variant="fadeUp" className="mb-14">
            <span className="text-[11px] font-mono font-semibold text-n-400 uppercase tracking-[0.2em]">Vorteile</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-n-900 tracking-[-0.02em]">
              Warum {product.name}?
            </h2>
          </AnimateIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
            {product.benefits.map((b, i) => (
              <AnimateIn key={b.title} variant="fadeUp" delay={i * 0.08}>
                <div className="bg-n-50 p-6 lg:p-8 h-full relative group hover:bg-n-100/80 transition-all duration-300">
                  <span className="text-[10px] font-mono text-idm-dark tracking-[0.2em] block mb-3">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg font-bold text-n-900 mb-2">{b.title}</h3>
                  <p className="text-sm text-n-500 leading-relaxed">{b.desc}</p>
                  <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-idm transition-all duration-500" />
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use Cases — Quick tags ───────────────────────────── */}
      <section className="py-10 bg-n-50 border-y border-n-100">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-mono text-n-400 tracking-[0.2em] mr-2">IDEAL FUER:</span>
            {product.useCases.map((uc) => (
              <span key={uc} className="text-xs font-mono text-n-600 px-3 py-1.5 border border-n-200 bg-white tracking-wider">
                {uc}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Model Comparison — Heizungsbauer focused ─────────── */}
      <section ref={specsRef} id="modelle" className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <AnimateIn variant="fadeUp" className="mb-10">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-[11px] font-mono font-semibold text-n-400 uppercase tracking-[0.2em]">Technische Daten</span>
                <h2 className="mt-2 text-3xl md:text-4xl font-bold text-n-900 tracking-[-0.02em]">
                  {product.name} Modelle
                </h2>
              </div>
              <span className="text-xs font-mono text-n-400 tracking-wider hidden md:block">
                {product.models.length} MODELLE VERFUEGBAR
              </span>
            </div>
          </AnimateIn>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b-2 border-n-900">
                  <th className="text-left py-3 text-[10px] font-mono font-semibold text-n-400 tracking-[0.2em]">MODELL</th>
                  <th className="text-left py-3 text-[10px] font-mono font-semibold text-n-400 tracking-[0.2em]">LEISTUNG</th>
                  <th className="text-left py-3 text-[10px] font-mono font-semibold text-n-400 tracking-[0.2em]">TYP</th>
                  <th className="text-left py-3 text-[10px] font-mono font-semibold text-n-400 tracking-[0.2em]">KAELTEMITTEL</th>
                  <th className="text-left py-3 text-[10px] font-mono font-semibold text-n-400 tracking-[0.2em]">SCOP</th>
                  <th className="text-left py-3 text-[10px] font-mono font-semibold text-n-400 tracking-[0.2em]">SCHALL</th>
                </tr>
              </thead>
              <tbody>
                {visibleModels.map((m, i) => (
                  <motion.tr
                    key={m.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={specsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-n-100 hover:bg-n-50 transition-colors group cursor-pointer"
                  >
                    <td className="py-4 pr-4">
                      <span className="font-semibold text-sm text-n-900">{m.name}</span>
                    </td>
                    <td className="py-4 pr-4 text-sm font-mono text-n-600">{m.capacity}</td>
                    <td className="py-4 pr-4">
                      <span className="text-[10px] font-mono text-n-500 px-2 py-0.5 border border-n-200 tracking-wider">{m.type}</span>
                    </td>
                    <td className="py-4 pr-4 text-sm font-mono text-idm-dark">{m.refrigerant}</td>
                    <td className="py-4 pr-4 text-sm font-mono font-semibold text-n-900">{m.cop}</td>
                    <td className="py-4 text-sm font-mono text-n-500">{m.sound}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {product.models.length > 4 && !showAllModels && (
            <button
              onClick={() => setShowAllModels(true)}
              className="mt-4 flex items-center gap-2 text-sm font-semibold text-n-600 hover:text-n-900 transition-colors cursor-pointer mx-auto"
            >
              Alle {product.models.length} Modelle anzeigen
              <ChevronDown className="w-4 h-4" />
            </button>
          )}

          {/* Download row */}
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 border border-n-200 text-n-700 text-xs font-mono tracking-wider hover:border-n-400 transition-colors">
              <Download className="w-3.5 h-3.5" /> DATENBLAETTER
            </a>
            <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 border border-n-200 text-n-700 text-xs font-mono tracking-wider hover:border-n-400 transition-colors">
              <Download className="w-3.5 h-3.5" /> PLANUNGSUNTERLAGEN
            </a>
            <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 border border-n-200 text-n-700 text-xs font-mono tracking-wider hover:border-n-400 transition-colors">
              <Download className="w-3.5 h-3.5" /> AUSSCHREIBUNGSTEXTE
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────────── */}
      <section className="bg-n-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gitter-dark pointer-events-none" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.02em]">
                Bereit fuer Ihre {product.name}?
              </h3>
              <p className="text-n-500 text-sm mt-2 max-w-lg">
                Konfigurieren Sie Ihr System oder finden Sie einen zertifizierten iDM Fachpartner in Ihrer Naehe.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="https://konfigurator.myidm.at/#/" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 px-6 py-3 bg-idm hover:bg-idm-dark text-n-900 font-semibold text-sm transition-all">
                Konfigurieren <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="https://vr.idm-energie.at/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 text-white hover:border-white/30 text-sm font-medium transition-all">
                <Eye className="w-4 h-4" /> Showroom
              </a>
              <Link to="/tools/partnerfinder" className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 text-white hover:border-white/30 text-sm font-medium transition-all">
                Partner finden
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
