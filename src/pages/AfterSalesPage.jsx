import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Phone, Mail, MapPin, Clock, Wrench,
  Shield, Package, AlertTriangle, Search, ChevronDown, ChevronRight,
  Headphones, FileText, Users, CheckCircle2, Zap
} from 'lucide-react'
import AnimateIn from '../components/animations/AnimateIn'

/* ─── Fault Code Lookup ────────────────────────────────────── */
const faultCodes = [
  { code: 'E01', title: 'Hochdruckstoerung', severity: 'warning', solution: 'Pruefen Sie die Waermeabnahme. Sind alle Heizkreise geoeffnet? Ist der Volumenstrom ausreichend?' },
  { code: 'E02', title: 'Niederdruckstoerung', severity: 'warning', solution: 'Pruefen Sie die Waermequelle. Ist der Sole-Volumenstrom ausreichend? Frostalarm?' },
  { code: 'E03', title: 'Fuehler Vorlauf', severity: 'error', solution: 'Vorlauf-Temperaturfuehler pruefen. Kabel und Steckverbindung kontrollieren.' },
  { code: 'E07', title: 'Kommunikationsfehler', severity: 'info', solution: 'Bus-Verbindung zum NAVIGATOR pruefen. Kabel auf Beschaedigung kontrollieren.' },
  { code: 'E10', title: 'Abtauung Timeout', severity: 'warning', solution: 'Abtauung dauert zu lange. Lufteintritt auf Verschmutzung pruefen. Verdampfer kontrollieren.' },
  { code: 'E15', title: 'Stroemungswaecher', severity: 'error', solution: 'Kein ausreichender Volumenstrom. Umwaelzpumpe und Entlueftung pruefen.' },
]

function FaultCodeLookup() {
  const [query, setQuery] = useState('')
  const [expandedCode, setExpandedCode] = useState(null)

  const filtered = query.trim()
    ? faultCodes.filter(
        (f) =>
          f.code.toLowerCase().includes(query.toLowerCase()) ||
          f.title.toLowerCase().includes(query.toLowerCase())
      )
    : faultCodes

  const severityColors = {
    error: 'bg-red-500/10 text-red-600 border-red-200',
    warning: 'bg-amber-500/10 text-amber-600 border-amber-200',
    info: 'bg-blue-500/10 text-blue-600 border-blue-200',
  }

  return (
    <div>
      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-n-400" />
        <input
          type="text"
          placeholder="Fehlercode eingeben (z.B. E01)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3.5 bg-white border border-n-200 text-sm text-n-900 placeholder:text-n-400 font-mono tracking-wide focus:outline-none focus:border-idm focus:ring-1 focus:ring-idm/20 transition-colors"
        />
      </div>

      {/* Results */}
      <div className="space-y-2">
        {filtered.map((fault) => (
          <button
            key={fault.code}
            onClick={() => setExpandedCode(expandedCode === fault.code ? null : fault.code)}
            className="w-full text-left"
          >
            <div
              className={`border p-4 transition-all duration-300 ${
                expandedCode === fault.code
                  ? 'border-idm/30 bg-idm/[0.02]'
                  : 'border-n-100 hover:border-n-200 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-mono font-bold text-n-900 w-12">{fault.code}</span>
                  <span className={`text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 border ${severityColors[fault.severity]}`}>
                    {fault.severity === 'error' ? 'Kritisch' : fault.severity === 'warning' ? 'Warnung' : 'Info'}
                  </span>
                  <span className="text-sm text-n-700">{fault.title}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-n-400 transition-transform duration-200 ${
                    expandedCode === fault.code ? 'rotate-180' : ''
                  }`}
                />
              </div>

              {expandedCode === fault.code && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 pt-4 border-t border-n-100"
                >
                  <div className="flex items-start gap-3">
                    <Wrench className="w-4 h-4 text-idm shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-mono text-n-400 uppercase tracking-wider block mb-1">Loesung</span>
                      <p className="text-sm text-n-600 leading-relaxed">{fault.solution}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-[11px] text-n-400">
                    Problem nicht geloest? Kontaktieren Sie unseren technischen Support.
                  </p>
                </motion.div>
              )}
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 text-sm text-n-400">
          Kein Fehlercode gefunden. Versuchen Sie eine andere Suche oder kontaktieren Sie den Support.
        </div>
      )}
    </div>
  )
}

/* ─── Service Contact Cards ────────────────────────────────── */
const contactMethods = [
  {
    icon: Phone,
    title: 'Telefon-Support',
    desc: 'Direkte Hilfe von unseren Technikern',
    detail: '+43 4875 6172',
    sub: 'Mo–Fr 07:00–17:00',
    primary: true,
  },
  {
    icon: Mail,
    title: 'E-Mail Support',
    desc: 'Schriftliche Anfragen',
    detail: 'service@idm-energie.at',
    sub: 'Antwort innerhalb 24h',
  },
  {
    icon: MapPin,
    title: 'Vor-Ort Service',
    desc: 'Techniker in Ihrer Naehe',
    detail: 'Servicepartner finden',
    sub: 'Oesterreich & Deutschland',
    href: '/tools/partnerfinder',
  },
]

/* ─── Service Packages ─────────────────────────────────────── */
const servicePackages = [
  {
    name: 'Basis',
    desc: 'Fuer Endkunden mit Garantieanspruch',
    features: ['Telefon-Support', 'Fehlercode-Diagnose', 'Ersatzteil-Bestellung', 'Online-Dokumentation'],
    highlight: false,
  },
  {
    name: 'Komfort',
    desc: 'Erweiterte Betreuung fuer Ihr System',
    features: ['Alles aus Basis', 'Jaehrliche Wartung', 'Priorisierter Support', 'Ferndiagnose via myiDM', 'Garantieverlaengerung'],
    highlight: true,
  },
  {
    name: 'Profi',
    desc: 'Fuer Fachpartner und Gewerbebetriebe',
    features: ['Alles aus Komfort', '24/7 Notfall-Hotline', 'Vor-Ort Einsatz', 'Ersatzteil-Express', 'Schulungsrabatte'],
    highlight: false,
  },
]

/* ─── Main Page ────────────────────────────────────────────── */
export default function AfterSalesPage() {
  return (
    <div className="bg-white">
      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative bg-n-950 overflow-hidden h-[600px] lg:h-[680px]">
        <div className="absolute inset-0 bg-gitter-dark pointer-events-none" />
        <div className="absolute inset-0 bg-grid-fine opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl pt-20"
          >
            <Link to="/" className="inline-flex items-center gap-2 text-n-500 text-xs font-mono tracking-wider hover:text-white transition-colors mb-6">
              <ArrowLeft className="w-3 h-3" /> STARTSEITE
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <Headphones className="w-5 h-5 text-idm" />
              <span className="text-[11px] font-mono text-idm uppercase tracking-[0.2em]">Service</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em] leading-[1.05]">
              After Sales Support.{'\n'}
              <span className="text-gradient-idm">Wir sind fuer Sie da.</span>
            </h1>

            <p className="mt-5 text-n-400 text-sm md:text-base leading-relaxed max-w-lg">
              Technischer Support, Ersatzteile, Wartung und Ferndiagnose — direkt vom Hersteller.
              Unsere Experten kennen jede iDM Waermepumpe.
            </p>

            {/* Quick stats */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { value: '<24h', label: 'Reaktionszeit' },
                { value: '50+', label: 'Servicetechniker' },
                { value: '98%', label: 'Kundenzufriedenheit' },
                { value: '24/7', label: 'Notfall-Hotline' },
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

            <div className="mt-8">
              <a
                href="tel:+4348756172"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-idm hover:bg-idm-dark text-n-900 font-semibold text-sm transition-all"
              >
                <Phone className="w-4 h-4" />
                Jetzt anrufen: +43 4875 6172
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Contact Methods ────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <AnimateIn variant="fadeUp" className="mb-12">
            <span className="text-[11px] font-mono font-semibold text-n-400 uppercase tracking-[0.2em]">Kontakt</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-n-900 tracking-[-0.02em]">
              So erreichen Sie uns.
            </h2>
          </AnimateIn>

          <div className="grid md:grid-cols-3 gap-3">
            {contactMethods.map((method, i) => {
              const Icon = method.icon
              const Wrapper = method.href ? Link : 'div'
              const wrapperProps = method.href ? { to: method.href } : {}

              return (
                <AnimateIn key={method.title} variant="fadeUp" delay={i * 0.1}>
                  <Wrapper
                    {...wrapperProps}
                    className={`group block p-6 lg:p-8 border transition-all duration-300 h-full ${
                      method.primary
                        ? 'border-idm/30 bg-idm/[0.03] hover:bg-idm/[0.06]'
                        : 'border-n-100 bg-white hover:border-n-200 hover:bg-n-50'
                    }`}
                  >
                    <div className={`w-12 h-12 flex items-center justify-center mb-5 ${method.primary ? 'bg-idm' : 'bg-n-100'}`}>
                      <Icon className={`w-5 h-5 ${method.primary ? 'text-n-900' : 'text-n-600'}`} />
                    </div>
                    <h3 className="text-lg font-bold text-n-900 mb-1">{method.title}</h3>
                    <p className="text-sm text-n-500 mb-4">{method.desc}</p>
                    <div className="text-sm font-semibold text-n-900 font-mono">{method.detail}</div>
                    <div className="text-[11px] text-n-400 font-mono mt-1">{method.sub}</div>
                  </Wrapper>
                </AnimateIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Fault Code Lookup ──────────────────────────── */}
      <section className="py-20 lg:py-28 bg-n-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-[1fr_520px] gap-12 lg:gap-20">
            <AnimateIn variant="fadeUp">
              <div className="lg:sticky lg:top-28">
                <span className="text-[11px] font-mono font-semibold text-n-400 uppercase tracking-[0.2em]">Selbsthilfe</span>
                <h2 className="mt-2 text-3xl md:text-4xl font-bold text-n-900 tracking-[-0.02em]">
                  Fehlercode{' '}
                  <span className="text-gradient-idm">Diagnose.</span>
                </h2>
                <p className="mt-4 text-sm text-n-500 leading-relaxed max-w-md">
                  Geben Sie den Fehlercode Ihrer Waermepumpe ein und erhalten Sie sofort eine Loesung.
                  Die meisten Stoerungen lassen sich einfach beheben.
                </p>

                <div className="mt-8 flex items-start gap-3 p-4 bg-white border border-n-200">
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-semibold text-n-900 block mb-1">Wichtiger Hinweis</span>
                    <p className="text-[12px] text-n-500 leading-relaxed">
                      Arbeiten am Kaeltemittelkreislauf duerfen nur von zertifizierten Kaeltetechnikern
                      durchgefuehrt werden.
                    </p>
                  </div>
                </div>
              </div>
            </AnimateIn>

            <AnimateIn variant="fadeUp" delay={0.1}>
              <FaultCodeLookup />
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── Service Packages ───────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <AnimateIn variant="fadeUp" className="mb-12">
            <span className="text-[11px] font-mono font-semibold text-n-400 uppercase tracking-[0.2em]">Service-Pakete</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-n-900 tracking-[-0.02em]">
              Rundum versorgt.
            </h2>
            <p className="mt-3 text-sm text-n-500 max-w-lg leading-relaxed">
              Waehlen Sie das passende Service-Paket fuer Ihre Beduerfnisse.
            </p>
          </AnimateIn>

          <div className="grid md:grid-cols-3 gap-3">
            {servicePackages.map((pkg, i) => (
              <AnimateIn key={pkg.name} variant="fadeUp" delay={i * 0.1}>
                <div
                  className={`relative p-6 lg:p-8 border h-full flex flex-col ${
                    pkg.highlight
                      ? 'border-idm bg-idm/[0.02]'
                      : 'border-n-100 bg-white'
                  }`}
                >
                  {pkg.highlight && (
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-idm" />
                  )}
                  {pkg.highlight && (
                    <span className="inline-flex self-start px-2 py-0.5 bg-idm text-n-900 text-[10px] font-mono font-bold tracking-wider mb-4">
                      EMPFOHLEN
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-n-900 mb-1">{pkg.name}</h3>
                  <p className="text-sm text-n-500 mb-6">{pkg.desc}</p>
                  <ul className="space-y-2.5 flex-1">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-idm shrink-0 mt-0.5" />
                        <span className="text-sm text-n-700">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-6 border-t border-n-100">
                    <a
                      href="tel:+4348756172"
                      className={`group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-all w-full justify-center ${
                        pkg.highlight
                          ? 'bg-idm hover:bg-idm-dark text-n-900'
                          : 'border border-n-200 hover:border-n-900 text-n-900'
                      }`}
                    >
                      Anfragen
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Spare Parts Section ────────────────────────── */}
      <section className="py-20 lg:py-28 bg-n-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimateIn variant="fadeUp">
              <span className="text-[11px] font-mono font-semibold text-n-400 uppercase tracking-[0.2em]">Ersatzteile</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-n-900 tracking-[-0.02em]">
                Original-Ersatzteile.{' '}
                <span className="text-gradient-idm">Schnell geliefert.</span>
              </h2>
              <p className="mt-4 text-sm text-n-500 leading-relaxed max-w-lg">
                Ueber 15.000 Ersatzteile auf Lager in Matrei in Osttirol. Bestellung direkt ueber
                Ihren Fachpartner oder unsere Service-Hotline.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  { icon: Package, text: '15.000+ Teile ab Lager lieferbar' },
                  { icon: Zap, text: 'Express-Versand bei Stoerungen' },
                  { icon: Shield, text: 'Original-Qualitaet mit Garantie' },
                  { icon: Users, text: 'Bestellung ueber Fachpartner' },
                ].map((item, i) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white border border-n-200 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-n-600" />
                    </div>
                    <span className="text-sm text-n-700">{item.text}</span>
                  </div>
                ))}
              </div>

              <a
                href="tel:+4348756172"
                className="mt-8 group inline-flex items-center gap-2 px-6 py-3 bg-idm hover:bg-idm-dark text-n-900 font-semibold text-sm transition-all"
              >
                Ersatzteil bestellen
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </AnimateIn>

            <AnimateIn variant="fadeUp" delay={0.15}>
              <div className="relative">
                <img
                  src="/images/factory-aerial.jpg"
                  alt="iDM Werk Matrei"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gitter opacity-30 mix-blend-overlay" />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-n-950/90 to-transparent">
                  <span className="text-[10px] font-mono text-n-400 tracking-wider">STANDORT</span>
                  <div className="text-white font-semibold text-sm">Werk Matrei in Osttirol — Produktion & Logistik</div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────── */}
      <section className="bg-n-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gitter-dark pointer-events-none" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.02em]">
                Brauchen Sie Hilfe?
              </h3>
              <p className="text-n-500 text-sm mt-2 max-w-lg">
                Unser Service-Team ist fuer Sie da — telefonisch, per E-Mail oder vor Ort.
              </p>
            </div>
            <div className="flex gap-3">
              <a
                href="tel:+4348756172"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-idm hover:bg-idm-dark text-n-900 font-semibold text-sm transition-all"
              >
                <Phone className="w-4 h-4" />
                Jetzt anrufen
              </a>
              <Link
                to="/service/faq"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 text-white hover:border-white/30 text-sm font-medium transition-all"
              >
                Haeufige Fragen
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
