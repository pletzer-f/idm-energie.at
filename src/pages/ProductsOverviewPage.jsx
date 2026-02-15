import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Brain,
  Gauge,
  Leaf,
  Network,
  Settings2,
  ShieldCheck,
  ThermometerSun,
  Cpu,
} from 'lucide-react'
import AnimateIn from '../components/animations/AnimateIn'
import RotatingWordLine from '../components/ui/RotatingWordLine'

const productFamilies = [
  {
    name: 'AERO',
    title: 'Luft-Waermepumpen',
    href: '/produkte/luft-waermepumpen',
    range: '2 - 50 kW',
    summary: 'Die Energie der Aussenluft nutzen - modulierend, fluesterleise und bis 70 C Vorlauf.',
    image: '/images/luftwaermepumpe.jpg',
    transparent: true,
    tags: ['Neubau', 'Sanierung', 'R290', 'Kuehlen'],
  },
  {
    name: 'TERRA',
    title: 'Erdwaermepumpen',
    href: '/produkte/erdwaermepumpen',
    range: '3 - 140 kW',
    summary: 'Konstante Waerme aus dem Erdreich fuer maximale Effizienz und minimale Betriebskosten.',
    image: '/images/erdwaermepumpe.png',
    transparent: true,
    tags: ['SCOP 5+', 'Passive Kuehlung', 'Twin'],
  },
  {
    name: 'iPUMP',
    title: 'Kompaktsysteme',
    href: '/produkte/ipump',
    range: '2 - 12 kW',
    summary: 'Heizen, Kuehlen und Warmwasser in einem Geraet - mit R290 und minimaler Stellflaeche.',
    image: '/images/ipump-pair.jpeg',
    tags: ['All-in-One', 'R290', 'Sanierung'],
  },
  {
    name: 'MAX',
    title: 'Gross-Waermepumpen',
    href: '/produkte/grosswaermepumpen',
    range: 'bis 1.500 kW',
    summary: 'Kaskadierbare Grossanlagen fuer Hotels, Quartiere, Gewerbe und Industrie.',
    image: '/images/technician-plant-room.jpg',
    tags: ['Kaskade', 'BACnet', 'Industrie'],
  },
  {
    name: 'NAVIGATOR',
    title: 'Intelligente Steuerung',
    href: '/produkte/navigator',
    range: '7" Touch + iON KI',
    summary: 'Das Gehirn der Anlage: Wetter-, Strompreis- und Verbrauchsoptimierung in Echtzeit.',
    image: '/images/navigator-energy-prices.jpg',
    tags: ['iON KI', 'PV-Integration', 'App'],
  },
  {
    name: 'HYGIENIK',
    title: 'Speicherloesungen',
    href: '/produkte/speicher',
    range: 'bis 2.000 Liter',
    summary: 'Frischwasser-Technologie fuer hygienische Warmwasserbereitung ohne stehendes Wasser.',
    image: '/images/hygienik.png',
    transparent: true,
    tags: ['Frischwasser', 'Hygiene', 'Seit 1987'],
  },
]

const innovationBlocks = [
  {
    icon: Brain,
    title: 'iON KI-Technologie',
    text: 'Vorausschauend heizen mit Wetterprognose, Strompreissignalen und Nutzungsverhalten - automatisch optimiert.',
  },
  {
    icon: Cpu,
    title: 'NAVIGATOR Energy Manager',
    text: '7" Touch-Interface, myiDM App und Systemregeln fuer Waermepumpe, Speicher, PV und Kaskadenbetrieb.',
  },
  {
    icon: Leaf,
    title: 'R290 & Zukunftssicherheit',
    text: 'Natuerliches Kaeltemittel mit sehr niedrigem GWP fuer zukunftsfeste Projekte und klare Nachhaltigkeitsstrategie.',
  },
  {
    icon: Network,
    title: 'Kaskaden-Intelligenz',
    text: 'Bis zu 10 Waermepumpen intelligent vernetzt fuer Lastspitzen, Redundanz und gleichmaessige Auslastung.',
  },
]

export default function ProductsOverviewPage() {
  return (
    <div className="bg-white">
      <section className="relative bg-n-950 overflow-hidden">
        <div className="absolute inset-0 bg-gitter-dark pointer-events-none" />
        <div className="absolute inset-0 bg-grid-fine opacity-20 pointer-events-none" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pt-28 pb-18 lg:pt-32 lg:pb-24">
          <div className="grid lg:grid-cols-[1.15fr,0.85fr] gap-10 items-end">
            <div>
              <span className="text-[11px] font-mono font-semibold text-idm uppercase tracking-[0.2em]">
                Produkte
              </span>
              <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-[-0.03em] leading-[0.95]">
                Intelligente Waermepumpen.
                <br />
                <span className="text-gradient-idm">Technologiefuehrung aus Tirol.</span>
              </h1>
              <div className="mt-6">
                <RotatingWordLine
                  words={['AERO.', 'TERRA.', 'iPUMP.', 'MAX.', 'NAVIGATOR.', 'HYGIENIK.']}
                  widthClass="w-[12ch]"
                  wordClass="text-lg md:text-xl font-semibold text-idm font-mono"
                  suffix="im iDM Portfolio."
                  suffixClass="text-base md:text-lg text-n-500 whitespace-nowrap"
                />
              </div>
              <p className="mt-6 text-n-400 text-base md:text-lg leading-relaxed max-w-2xl">
                iDM entwickelt seit 1977 Waermepumpentechnologie fuer Neubau, Sanierung und Grossprojekte.
                Mit iON KI-Technologie, NAVIGATOR Energiemanagement und natuerlichem Kaeltemittel R290
                setzen wir den technologischen Standard im Markt.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://konfigurator.myidm.at/#/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-idm hover:bg-idm-dark text-n-900 text-sm font-semibold transition-all"
                >
                  System konfigurieren
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  to="/tools/partnerfinder"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white text-sm font-medium hover:border-white/40 hover:bg-white/5 transition-all"
                >
                  Fachpartner sprechen
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { val: '2 - 1.500 kW', label: 'Leistungsbereich', icon: Gauge },
                { val: 'iON KI', label: 'Intelligente Optimierung', icon: Brain },
                { val: 'R290', label: 'Natuerliches Kaeltemittel', icon: Leaf },
                { val: '7" NAVIGATOR', label: 'Systemsteuerung', icon: Settings2 },
              ].map((item) => (
                <div key={item.label} className="border border-n-800 bg-white/[0.03] p-4">
                  <item.icon className="w-4 h-4 text-idm mb-3" />
                  <div className="text-lg font-mono font-bold text-idm">{item.val}</div>
                  <div className="text-[11px] font-mono text-n-500 mt-1 tracking-wider uppercase">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <AnimateIn variant="fadeUp" className="mb-10">
            <span className="text-[11px] font-mono font-semibold text-n-400 uppercase tracking-[0.2em]">
              Produktportfolio
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-n-900 tracking-[-0.02em]">
              Die passende iDM Technologie fuer jedes Projekt.
            </h2>
          </AnimateIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {productFamilies.map((family, index) => (
              <motion.div
                key={family.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link to={family.href} className="group block border border-n-100 hover:border-idm/30 transition-all h-full bg-white overflow-hidden">
                  <div className="relative h-44 bg-n-950">
                    <img
                loading="lazy"
                decoding="async"
                src={family.image}
                      alt={family.name}
                      className={`w-full h-full ${family.transparent ? 'object-contain p-6' : 'object-cover'} group-hover:scale-105 transition-transform duration-700`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-n-950/80 via-n-950/20 to-transparent" />
                    <div className="absolute left-4 bottom-4">
                      <div className="text-[10px] font-mono text-idm tracking-[0.16em] uppercase">{family.title}</div>
                      <div className="text-2xl font-bold text-white tracking-[-0.02em]">{family.name}</div>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="text-sm font-mono text-idm mb-2">{family.range}</div>
                    <p className="text-sm text-n-600 leading-relaxed">{family.summary}</p>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {family.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-mono text-n-500 px-2 py-1 border border-n-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-n-900 group-hover:text-idm-dark transition-colors">
                      Details ansehen
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-n-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <AnimateIn variant="fadeUp" className="mb-10">
            <span className="text-[11px] font-mono font-semibold text-n-400 uppercase tracking-[0.2em]">
              Technologie-Fokus
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-n-900 tracking-[-0.02em]">
              Warum iDM als Technologie-Marktleader.
            </h2>
          </AnimateIn>

          <div className="grid md:grid-cols-2 gap-3">
            {innovationBlocks.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="bg-white border border-n-100 p-6"
              >
                <item.icon className="w-5 h-5 text-idm-dark mb-4" />
                <h3 className="text-xl font-bold text-n-900 tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 text-sm text-n-600 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-n-950 text-white border border-n-800">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-idm shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold tracking-[-0.02em]">Intelligenz, die messbar arbeitet</h3>
                <p className="mt-2 text-n-400 leading-relaxed">
                  iON KI optimiert Lastverschiebung, Vorlauftemperatur und Eigenverbrauch automatisch.
                  Der NAVIGATOR vernetzt bis zu 10 Waermepumpen in Kaskade und integriert PV, Speicher sowie
                  Gebaeudeautomation - fuer stabile Effizienz im Alltag und im Grossprojekt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <AnimateIn variant="fadeUp" className="mb-10">
            <span className="text-[11px] font-mono font-semibold text-n-400 uppercase tracking-[0.2em]">
              Schnellvergleich
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-n-900 tracking-[-0.02em]">
              Welche Produktfamilie passt zu Ihrem Einsatz?
            </h2>
          </AnimateIn>

          <div className="overflow-x-auto border border-n-100">
            <table className="w-full min-w-[860px]">
              <thead className="bg-n-50">
                <tr>
                  <th className="text-left p-3 text-[10px] font-mono text-n-500 tracking-[0.18em]">FAMILIE</th>
                  <th className="text-left p-3 text-[10px] font-mono text-n-500 tracking-[0.18em]">WAERMEQUELLE</th>
                  <th className="text-left p-3 text-[10px] font-mono text-n-500 tracking-[0.18em]">LEISTUNG</th>
                  <th className="text-left p-3 text-[10px] font-mono text-n-500 tracking-[0.18em]">TECHNOLOGIE</th>
                  <th className="text-left p-3 text-[10px] font-mono text-n-500 tracking-[0.18em]">TYPISCHE PROJEKTE</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['AERO', 'Aussenluft', '2 - 50 kW', 'Modulierend, fluesterleise, R290', 'Neubau, Sanierung, MFH'],
                  ['TERRA', 'Erdreich / Sole', '3 - 140 kW', 'SCOP 5+, Twin, passive Kuehlung', 'Effizienzhaus, Sanierung, Gewerbe'],
                  ['iPUMP', 'Luft / Kompakt', '2 - 12 kW', 'All-in-One, integrierter Speicher', 'EFH, platzkritische Sanierung'],
                  ['MAX', 'Luft / Erde', 'bis 1.500 kW', 'Kaskadenbetrieb, BACnet, Redundanz', 'Hotels, Quartiere, Industrie'],
                  ['NAVIGATOR', 'Steuerung', 'Systemuebergreifend', 'iON KI, PV-Optimierung, App', 'Alle iDM Systeme'],
                  ['HYGIENIK', 'Speicher', 'bis 2.000 l', 'Frischwasser-Technologie', 'Hygiene, Warmwasser, Gewerbe'],
                ].map((row) => (
                  <tr key={row[0]} className="border-t border-n-100">
                    <td className="p-3 text-sm font-semibold text-n-900">{row[0]}</td>
                    <td className="p-3 text-sm text-n-600">{row[1]}</td>
                    <td className="p-3 text-sm text-n-600">{row[2]}</td>
                    <td className="p-3 text-sm text-n-600">{row[3]}</td>
                    <td className="p-3 text-sm text-n-600">{row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/loesungen"
              className="inline-flex items-center gap-2 px-6 py-3 border border-n-200 hover:border-n-900 hover:bg-n-900 hover:text-white text-sm font-semibold text-n-700 transition-all"
            >
              Zur Loesungsberatung
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/tools/partnerfinder"
              className="inline-flex items-center gap-2 px-6 py-3 border border-n-200 hover:border-n-900 hover:bg-n-900 hover:text-white text-sm font-semibold text-n-700 transition-all"
            >
              Partner in Ihrer Naehe
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
