import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Heart, Mountain, Users, Award,
  Globe, Factory, Leaf, Shield, Zap, Lightbulb,
  MapPin, Briefcase, GraduationCap, Building2
} from 'lucide-react'
import AnimateIn from '../components/animations/AnimateIn'

/* ─── Company Sections ─────────────────────────────────────── */
const companySections = [
  {
    icon: Heart,
    title: 'Ueber uns',
    desc: 'Seit 1977 entwickeln und fertigen wir Waermepumpen in Matrei in Osttirol. Familiengefuehrt in zweiter Generation.',
    href: '/unternehmen/ueber-uns',
    image: '/images/hq-building.jpg',
    stats: [
      { value: '1977', label: 'Gegruendet' },
      { value: '800', label: 'Mitarbeiter:innen' },
    ],
  },
  {
    icon: Briefcase,
    title: 'Karriere',
    desc: 'Werden Sie Teil der iDM Familie. Entdecken Sie offene Stellen und gestalten Sie die Zukunft der Waermeversorgung mit.',
    href: '/unternehmen/karriere',
    image: '/images/engineer-cad.jpg',
    stats: [
      { value: '40+', label: 'Offene Stellen' },
      { value: '4.8', label: 'kununu Score' },
    ],
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    desc: 'Eigenes Forschungszentrum, eigene KI, eigene Software. 2.000+ Stunden Pruefstandtests pro Modell.',
    href: '/unternehmen/innovation',
    image: '/images/pcb-closeup.jpg',
    stats: [
      { value: '15+', label: 'Patente' },
      { value: '45', label: 'Ingenieur:innen' },
    ],
  },
  {
    icon: Leaf,
    title: 'Nachhaltigkeit',
    desc: 'Jede Waermepumpe ist ein Beitrag zum Klimaschutz. R290 Kaeltemittel, Oekostrom, CO2-reduzierte Produktion.',
    href: '/unternehmen/nachhaltigkeit',
    image: '/images/aero-garden.jpeg',
    stats: [
      { value: '500k', label: 'Tonnen CO2 gespart' },
      { value: '150k', label: 'Haushalte versorgt' },
    ],
  },
]

/* ─── Key Facts ────────────────────────────────────────────── */
const keyFacts = [
  { icon: Award, title: 'Oesterreichs groesster Waermepumpen-Hersteller', desc: 'Marktfuehrer mit ueber 45 Jahren Erfahrung.' },
  { icon: Factory, title: 'Made in Austria', desc: 'Entwicklung, Produktion und Logistik in Matrei in Osttirol.' },
  { icon: Zap, title: '2 bis 1.500 kW Leistung', desc: 'Vom Einfamilienhaus bis zum Industriekomplex.' },
  { icon: Shield, title: 'EHPA Guetesiegel, ISO 9001 & 14001', desc: 'Hoechste Qualitaets- und Umweltstandards.' },
  { icon: Globe, title: '10+ Laender', desc: 'Internationales Vertriebsnetz in ganz Europa.' },
  { icon: Users, title: '500+ Fachpartner', desc: 'Starkes Netzwerk fuer Beratung, Installation und Service.' },
]

/* ─── Leadership ───────────────────────────────────────────── */
const leadership = [
  {
    name: 'Thomas Pletzer',
    role: 'Geschaeftsfuehrer',
    focus: 'Vertrieb, Marketing & Strategie',
    desc: 'Thomas Pletzer fuehrt iDM in der zweiten Generation und treibt die internationale Expansion des Unternehmens voran.',
  },
  {
    name: 'Christoph Bacher',
    role: 'Geschaeftsfuehrer',
    focus: 'Technik, Produktion & Innovation',
    desc: 'Christoph Bacher verantwortet die technische Weiterentwicklung und die Produktionskapazitaeten am Standort Matrei.',
  },
]

/* ─── Locations ────────────────────────────────────────────── */
const locations = [
  { name: 'Matrei in Osttirol', type: 'Hauptsitz, Produktion & F&E', country: 'Oesterreich' },
  { name: 'Vomp', type: 'Vertrieb & Administration', country: 'Oesterreich' },
  { name: 'Muenchen (Raum)', type: 'Vertrieb Deutschland', country: 'Deutschland' },
  { name: 'Suedtirol', type: 'Vertrieb Italien', country: 'Italien' },
]

/* ─── Main Page ────────────────────────────────────────────── */
export default function UnternehmenPage() {
  return (
    <div className="bg-white">
      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative bg-n-950 overflow-hidden h-[600px] lg:h-[680px]">
        <div className="absolute inset-0 bg-gitter-dark pointer-events-none" />
        <div className="absolute inset-0 bg-grid-fine opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 h-full">
          <div className="grid lg:grid-cols-2 gap-10 items-center h-full pt-20 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Link to="/" className="inline-flex items-center gap-2 text-n-500 text-xs font-mono tracking-wider hover:text-white transition-colors mb-6">
                <ArrowLeft className="w-3 h-3" /> STARTSEITE
              </Link>

              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-5 h-5 text-idm" />
                <span className="text-[11px] font-mono text-idm uppercase tracking-[0.2em]">Unternehmen</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em] leading-[1.05]">
                Wir sorgen fuer Ihr{'\n'}
                <span className="text-gradient-idm">Wohlbefinden.</span>
              </h1>

              <p className="mt-5 text-n-400 text-sm md:text-base leading-relaxed max-w-lg">
                iDM Energiesysteme — die Waermepumpen-Pioniere aus Matrei in Osttirol.
                Im Herzen der Hohen Tauern auf 1.000 m Seehoehe entwickeln wir
                seit ueber 45 Jahren effiziente, regenerative Heizsysteme.
              </p>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: '45+', label: 'Jahre Erfahrung' },
                  { value: '800', label: 'Mitarbeiter:innen' },
                  { value: '100%', label: 'Made in Austria' },
                  { value: '4', label: 'Standorte' },
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

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img loading="lazy" decoding="async" src="/images/hq-building.jpg" alt="iDM Headquarter Matrei in Osttirol" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gitter opacity-40 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-n-950/40" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Company Sections Hub ─────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <AnimateIn variant="fadeUp" className="mb-12">
            <span className="text-[11px] font-mono font-semibold text-n-400 uppercase tracking-[0.2em]">Entdecken</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-n-900 tracking-[-0.02em]">
              Die iDM Welt.
            </h2>
            <p className="mt-3 text-sm text-n-500 max-w-lg leading-relaxed">
              Geschichte, Innovation, Nachhaltigkeit und Karriere — erfahren Sie mehr ueber das Unternehmen hinter den Waermepumpen.
            </p>
          </AnimateIn>

          <div className="grid md:grid-cols-2 gap-3">
            {companySections.map((section, i) => {
              const Icon = section.icon
              return (
                <AnimateIn key={section.title} variant="fadeUp" delay={i * 0.1}>
                  <Link
                    to={section.href}
                    className="group block border border-n-100 hover:border-n-200 transition-all duration-300 h-full overflow-hidden"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        loading="lazy"
                        decoding="async"
                        src={section.image}
                        alt={section.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-n-950/60 to-transparent" />
                      <div className="absolute bottom-4 left-5 flex gap-3">
                        {section.stats.map((stat) => (
                          <div key={stat.label} className="bg-n-950/70 backdrop-blur-sm px-3 py-1.5">
                            <span className="text-sm font-mono font-bold text-idm block leading-none">{stat.value}</span>
                            <span className="text-[9px] font-mono text-n-400 tracking-wider">{stat.label.toUpperCase()}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 lg:p-7">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-n-50 group-hover:bg-idm/10 flex items-center justify-center transition-colors">
                            <Icon className="w-4 h-4 text-n-600 group-hover:text-idm-dark transition-colors" />
                          </div>
                          <h3 className="text-lg font-bold text-n-900">{section.title}</h3>
                        </div>
                        <ArrowRight className="w-4 h-4 text-n-300 group-hover:text-n-600 group-hover:translate-x-1 transition-all mt-1.5" />
                      </div>
                      <p className="text-sm text-n-500 leading-relaxed">{section.desc}</p>
                    </div>
                  </Link>
                </AnimateIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Key Facts ────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-n-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <AnimateIn variant="fadeUp" className="mb-12">
            <span className="text-[11px] font-mono font-semibold text-n-400 uppercase tracking-[0.2em]">Fakten</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-n-900 tracking-[-0.02em]">
              iDM auf einen Blick.
            </h2>
          </AnimateIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {keyFacts.map((fact, i) => {
              const Icon = fact.icon
              return (
                <AnimateIn key={fact.title} variant="fadeUp" delay={i * 0.07}>
                  <div className="bg-white border border-n-100 p-6 hover:border-n-200 transition-all h-full">
                    <div className="w-10 h-10 bg-n-50 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-n-600" />
                    </div>
                    <h3 className="text-base font-bold text-n-900 mb-1.5">{fact.title}</h3>
                    <p className="text-sm text-n-500 leading-relaxed">{fact.desc}</p>
                  </div>
                </AnimateIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Leadership ───────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <AnimateIn variant="fadeUp" className="mb-12">
            <span className="text-[11px] font-mono font-semibold text-n-400 uppercase tracking-[0.2em]">Fuehrung</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-n-900 tracking-[-0.02em]">
              Geschaeftsfuehrung.
            </h2>
          </AnimateIn>

          <div className="grid md:grid-cols-2 gap-3 max-w-3xl">
            {leadership.map((person, i) => (
              <AnimateIn key={person.name} variant="fadeUp" delay={i * 0.1}>
                <div className="bg-white border border-n-100 p-6 lg:p-8 h-full">
                  <div className="w-16 h-16 bg-n-100 flex items-center justify-center mb-5">
                    <span className="text-xl font-bold text-n-400 font-mono">
                      {person.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-n-900 mb-0.5">{person.name}</h3>
                  <span className="text-[11px] font-mono text-idm-dark tracking-wider">{person.role.toUpperCase()}</span>
                  <p className="mt-1 text-[12px] text-n-500 font-mono">{person.focus}</p>
                  <p className="mt-4 text-sm text-n-600 leading-relaxed">{person.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Locations ────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-n-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gitter-dark pointer-events-none" />
        <div className="absolute inset-0 bg-grid-fine opacity-10 pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
          <AnimateIn variant="fadeUp" className="mb-12">
            <span className="text-[11px] font-mono font-semibold text-n-500 uppercase tracking-[0.2em]">Standorte</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-white tracking-[-0.02em]">
              Europaweit praesent<span className="text-idm">.</span>
            </h2>
            <p className="mt-3 text-sm text-n-500 max-w-lg leading-relaxed">
              Von der Zentrale in Osttirol betreuen wir Kunden in ueber 10 Laendern.
            </p>
          </AnimateIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {locations.map((loc, i) => (
              <AnimateIn key={loc.name} variant="fadeUp" delay={i * 0.1}>
                <div className="border border-n-800 p-5 bg-white/[0.02] hover:bg-white/[0.04] transition-all h-full">
                  <MapPin className="w-4 h-4 text-idm mb-3" />
                  <h3 className="text-base font-bold text-white mb-1">{loc.name}</h3>
                  <p className="text-[12px] text-n-500 font-mono">{loc.type}</p>
                  <span className="inline-flex mt-3 text-[10px] font-mono font-semibold text-idm/80 uppercase tracking-wider px-2 py-0.5 bg-idm/5 border border-idm/10">
                    {loc.country}
                  </span>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Production Image Banner ──────────────────── */}
      <section className="relative">
        <div className="aspect-[21/9] lg:aspect-[3/1] relative overflow-hidden">
          <img loading="lazy" decoding="async" src="/images/factory-aerial.jpg" alt="iDM Produktion Matrei" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gitter opacity-40 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-n-950/80 via-n-950/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
            <div className="max-w-[1400px] mx-auto">
              <span className="text-[10px] font-mono text-n-400 tracking-wider block mb-2">HAUPTSITZ & PRODUKTION</span>
              <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-[-0.02em]">
                Matrei in Osttirol — Alles unter einem Dach.
              </h3>
              <p className="mt-2 text-sm text-n-400 max-w-lg">
                Entwicklung, Produktion, Logistik und Service — 20.000 m² am Fusse des Grossglockners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="bg-n-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gitter-dark pointer-events-none" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.02em]">
                Werden Sie Teil der iDM Familie.
              </h3>
              <p className="text-n-500 text-sm mt-2 max-w-lg">
                800 Kolleg:innen warten auf Sie. Entdecken Sie offene Stellen.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/unternehmen/karriere"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-idm hover:bg-idm-dark text-n-900 font-semibold text-sm transition-all"
              >
                Karriere entdecken
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/unternehmen/innovation"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 text-white hover:border-white/30 text-sm font-medium transition-all"
              >
                Innovation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
