import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Building2,
  Factory,
  Home,
  Hotel,
  RefreshCw,
  School,
  Store,
  SunMedium,
  Workflow,
} from 'lucide-react'
import AnimateIn from '../components/animations/AnimateIn'
import RotatingWordLine from '../components/ui/RotatingWordLine'

const primarySolutions = [
  {
    key: 'neubau',
    title: 'Neubau',
    subtitle: 'Von Anfang an richtig heizen',
    summary:
      'Maximale Effizienz durch niedrige Vorlauftemperaturen, intelligente Regelung und perfekte PV-Integration.',
    stats: ['bis 80% Foerderung moegl.', 'Heizen + Kuehlen + Warmwasser', 'NAVIGATOR + iON KI'],
    image: '/images/house-cutaway-hq.jpg',
    icon: Home,
    href: '/loesungen/neubau',
  },
  {
    key: 'sanierung',
    title: 'Sanierung',
    subtitle: 'Raus aus fossiler Energie',
    summary:
      'Auch im Bestand effizient: Vorlauftemperaturen bis 70 C, radiatortauglich und fit fuer den Umstieg ohne Kompromisse.',
    stats: ['bis 70 C Vorlauf', 'Bestandsheizkoerper nutzbar', 'Foerderfaehig'],
    image: '/images/house-diagram.jpeg',
    icon: RefreshCw,
    href: '/loesungen/sanierung',
  },
  {
    key: 'gewerbe',
    title: 'Gewerbe & Industrie',
    subtitle: 'Grosse Leistung, smarte Steuerung',
    summary:
      'Kaskadierung bis 1.500 kW mit intelligenter Lastverteilung und Integration in Gebaeudeautomation.',
    stats: ['bis 1.500 kW', 'BACnet / Modbus', '24/7 Monitoring'],
    image: '/images/aero-outdoor-units.jpg',
    icon: Building2,
    href: '/loesungen/gewerbe',
  },
]

const applicationFields = [
  { icon: Home, title: 'Einfamilienhaus', text: 'Leise und effiziente Systeme fuer Neubau und Bestand.' },
  { icon: Building2, title: 'Mehrfamilienhaus', text: 'Skalierbare Konzepte mit zentraler oder dezentraler Versorgung.' },
  { icon: Hotel, title: 'Hotellerie', text: 'Hohe Warmwasserlasten sicher abdecken - effizient und hygienisch.' },
  { icon: Factory, title: 'Industrie', text: 'Zuverlaessige Prozess- und Gebaeudewaerme im Dauerbetrieb.' },
  { icon: Store, title: 'Gewerbe', text: 'Heizen und Kuehlen mit intelligentem Lastmanagement.' },
  { icon: School, title: 'Kommunen', text: 'Nachhaltige Waerme fuer Schulen, Hallen und oeffentliche Bauten.' },
]

const projectFlow = [
  { title: 'Projektanalyse', text: 'Heizlast, Lastprofile und Randbedingungen werden gemeinsam aufgenommen.' },
  { title: 'Systemdesign', text: 'Auslegung von Waermepumpe, Speicher, Hydraulik und Regelstrategie.' },
  { title: 'Foerdercheck', text: 'Einordnung passender Foerderungen und Unterstuetzung bei den Unterlagen.' },
  { title: 'Installation', text: 'Umsetzung mit zertifizierten iDM Partnern und klaren Schnittstellen.' },
  { title: 'Optimierung', text: 'Inbetriebnahme, Feintuning und Monitoring fuer dauerhaft hohe Effizienz.' },
]

export default function SolutionsOverviewPage() {
  return (
    <div className="bg-white">
      <section className="relative bg-n-950 overflow-hidden">
        <div className="absolute inset-0 bg-gitter-dark pointer-events-none" />
        <div className="absolute inset-0 bg-grid-fine opacity-20 pointer-events-none" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pt-28 pb-16 lg:pt-32 lg:pb-22">
          <div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-10 items-end">
            <div>
              <span className="text-[11px] font-mono font-semibold text-idm uppercase tracking-[0.2em]">
                Loesungen
              </span>
              <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-[-0.03em] leading-[0.95]">
                Die richtige Loesung
                <br />
                <span className="text-gradient-idm">fuer jedes Projekt.</span>
              </h1>
              <div className="mt-6">
                <RotatingWordLine
                  words={['Neubau.', 'Sanierung.', 'Gewerbe.', 'Industrie.']}
                  widthClass="w-[11ch]"
                  wordClass="text-lg md:text-xl font-semibold text-idm font-mono"
                  suffix="alles im iDM System."
                  suffixClass="text-base md:text-lg text-n-500 whitespace-nowrap"
                />
              </div>
              <p className="mt-6 text-n-400 text-base md:text-lg leading-relaxed max-w-2xl">
                Ob Neubau, Sanierung oder anspruchsvolle Grossanlage: iDM liefert das passende
                Waermepumpensystem inklusive intelligenter Steuerung, Speichertechnik und starkem
                Partnernetzwerk in Europa.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/tools/partnerfinder"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-idm hover:bg-idm-dark text-n-900 text-sm font-semibold transition-all"
                >
                  Projekt starten
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/produkte"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white text-sm font-medium hover:border-white/40 hover:bg-white/5 transition-all"
                >
                  Produkte entdecken
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { val: '3', label: 'Kern-Loesungen', icon: Workflow },
                { val: '2 - 1.500 kW', label: 'Leistungsspektrum', icon: Building2 },
                { val: '70 C', label: 'Vorlauf fuer Sanierung', icon: SunMedium },
                { val: 'Europaweit', label: 'Partnernetzwerk', icon: Home },
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
              Kern-Loesungen
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-n-900 tracking-[-0.02em]">
              Neubau, Sanierung und Gewerbe in einem Systemdenken.
            </h2>
          </AnimateIn>

          <div className="grid lg:grid-cols-3 gap-4">
            {primarySolutions.map((solution, index) => (
              <motion.div
                key={solution.key}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
              >
                <Link to={solution.href} className="group block border border-n-100 hover:border-idm/30 transition-all h-full overflow-hidden">
                  <div className="relative h-48 bg-n-950">
                    <img loading="lazy" decoding="async" src={solution.image} alt={solution.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-n-950/80 via-n-950/20 to-transparent" />
                    <div className="absolute top-4 left-4 w-9 h-9 bg-idm text-n-900 flex items-center justify-center">
                      <solution.icon className="w-4 h-4" />
                    </div>
                    <div className="absolute left-4 right-4 bottom-4">
                      <div className="text-[10px] font-mono text-idm tracking-[0.16em] uppercase">{solution.subtitle}</div>
                      <div className="text-2xl font-bold text-white tracking-[-0.02em] mt-0.5">{solution.title}</div>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-n-600 leading-relaxed">{solution.summary}</p>
                    <ul className="mt-4 space-y-1.5">
                      {solution.stats.map((item) => (
                        <li key={item} className="text-xs font-mono text-n-500">
                          {item}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-n-900 group-hover:text-idm-dark transition-colors">
                      Loesung ansehen
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
              Einsatzfelder
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-n-900 tracking-[-0.02em]">
              Von Wohnbau bis Industrie - alles abgedeckt.
            </h2>
          </AnimateIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {applicationFields.map((field) => (
              <div key={field.title} className="bg-white border border-n-100 p-6">
                <field.icon className="w-5 h-5 text-idm-dark mb-3" />
                <h3 className="text-lg font-bold text-n-900">{field.title}</h3>
                <p className="mt-2 text-sm text-n-600 leading-relaxed">{field.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <AnimateIn variant="fadeUp" className="mb-10">
            <span className="text-[11px] font-mono font-semibold text-n-400 uppercase tracking-[0.2em]">
              Projektablauf
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-n-900 tracking-[-0.02em]">
              So wird aus Bedarf eine stabile Waermeloesung.
            </h2>
          </AnimateIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3">
            {projectFlow.map((step, index) => (
              <div key={step.title} className="border border-n-100 p-5">
                <div className="text-[10px] font-mono text-idm-dark tracking-[0.16em] uppercase mb-2">
                  Schritt {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="text-base font-bold text-n-900">{step.title}</h3>
                <p className="mt-2 text-sm text-n-600 leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/tools/partnerfinder"
              className="inline-flex items-center gap-2 px-6 py-3 bg-idm hover:bg-idm-dark text-n-900 text-sm font-semibold transition-all"
            >
              Partnernetzwerk nutzen
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://konfigurator.myidm.at/#/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-n-200 hover:border-n-900 hover:bg-n-900 hover:text-white text-sm font-semibold text-n-700 transition-all"
            >
              Konfigurator starten
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
