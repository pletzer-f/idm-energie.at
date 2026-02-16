import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Phone, Mail, Clock, Headphones,
  Download, HelpCircle, GraduationCap, Wrench, Shield,
  MapPin, FileText, Users, CheckCircle2, AlertTriangle,
  MessageSquare, CalendarDays
} from 'lucide-react'
import AnimateIn from '../components/animations/AnimateIn'

/* ─── Service Areas ────────────────────────────────────────── */
const serviceAreas = [
  {
    icon: Headphones,
    title: 'After Sales Support',
    desc: 'Technischer Support, Fehlerdiagnose, Ersatzteile und Fernwartung — direkt vom Hersteller.',
    href: '/service/after-sales',
    features: ['Telefon-Support Mo–Fr', '24/7 Stoerungsannahme', 'Fehlercode-Diagnose', 'Ersatzteil-Express'],
    highlight: true,
  },
  {
    icon: Download,
    title: 'Downloads',
    desc: 'Datenblaetter, Installationsanleitungen, Planungsunterlagen und Zertifikate fuer alle Produktlinien.',
    href: '/service/downloads',
    features: ['200+ Dokumente', 'Datenblaetter & Anleitungen', 'Planungsunterlagen', 'Zertifikate & Energielabel'],
  },
  {
    icon: HelpCircle,
    title: 'FAQ',
    desc: 'Antworten auf die haeufigsten Fragen zu Waermepumpen, Technik, Kosten und Foerderungen.',
    href: '/service/faq',
    features: ['18+ Fragen beantwortet', 'Technik-Grundlagen', 'Kosten & Foerderung', 'Betrieb & Wartung'],
  },
  {
    icon: GraduationCap,
    title: 'Schulungen & Zertifizierung',
    desc: 'Praxisnahe Schulungen fuer Fachpartner — vom Bronze-Zertifikat bis zum Gold-Status.',
    href: '/service/schulungen',
    features: ['3 Zertifizierungsstufen', 'Praesenz & Webinare', 'iDM Academy', 'Regelmaessige Termine'],
  },
]

/* ─── Contact Channels ─────────────────────────────────────── */
const contactChannels = [
  {
    icon: Phone,
    title: 'Technischer Support',
    detail: '+43 4875 6172 111',
    sub: 'Mo–Fr 07:00–12:00 & 13:00–17:00',
    action: 'tel:+4348756172111',
  },
  {
    icon: Phone,
    title: 'Stoerungsannahme 24/7',
    detail: '+43 4875 6172 111',
    sub: 'Rund um die Uhr erreichbar',
    action: 'tel:+4348756172111',
  },
  {
    icon: Phone,
    title: 'Wochenend-Service',
    detail: '+43 4875 6172 DW 500',
    sub: 'Sa 09:00–12:00 & 14:00–16:00',
    action: 'tel:+4348756172',
  },
  {
    icon: Mail,
    title: 'E-Mail Support',
    detail: 'service@idm-energie.at',
    sub: 'Antwort innerhalb 24 Stunden',
    action: 'mailto:service@idm-energie.at',
  },
  {
    icon: Wrench,
    title: 'Ersatzteilanfragen',
    detail: '+43 4875 6172 DW 444',
    sub: 'Mo–Do 7:00–16:30, Fr 7:00–12:00',
    action: 'tel:+4348756172',
  },
  {
    icon: MapPin,
    title: 'Servicepartner vor Ort',
    detail: 'Partner in Ihrer Naehe finden',
    sub: 'Oesterreich, Deutschland & Schweiz',
    action: '/tools/partnerfinder',
    isLink: true,
  },
]

/* ─── Service Advantages ───────────────────────────────────── */
const advantages = [
  { icon: Shield, title: 'Direkt vom Hersteller', desc: 'Unsere Techniker kennen jede iDM Waermepumpe — von der AERO bis zur MAX.' },
  { icon: Clock, title: 'Schnelle Reaktionszeit', desc: 'Unter 24 Stunden Reaktionszeit bei technischen Anfragen.' },
  { icon: Users, title: '50+ Servicetechniker', desc: 'Flaechendeckendes Servicenetz in Oesterreich und Deutschland.' },
  { icon: Wrench, title: '15.000+ Ersatzteile', desc: 'Original-Ersatzteile ab Lager in Matrei, Express-Versand bei Stoerungen.' },
  { icon: MessageSquare, title: 'Ferndiagnose via myiDM', desc: 'Remote-Zugriff auf Ihre Waermepumpe fuer schnelle Fehleranalyse.' },
  { icon: CalendarDays, title: 'Wartungsvertraege', desc: 'Regelmaessige Wartung fuer optimale Effizienz und lange Lebensdauer.' },
]

/* ─── Main Page ────────────────────────────────────────────── */
export default function ServicePage() {
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
                <Headphones className="w-5 h-5 text-idm" />
                <span className="text-[11px] font-mono text-idm uppercase tracking-[0.2em]">Service</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em] leading-[1.05]">
                Wir sind fuer{'\n'}
                <span className="text-gradient-idm">Sie da.</span>
              </h1>

              <p className="mt-5 text-n-400 text-sm md:text-base leading-relaxed max-w-lg">
                Technische Hilfestellung, Schulungen, Downloads und Ersatzteile —
                alles aus einer Hand, direkt vom Hersteller. Unser Service-Team
                unterstuetzt Sie in jeder Phase.
              </p>

              {/* Quick stats */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: '<24h', label: 'Reaktionszeit' },
                  { value: '50+', label: 'Servicetechniker' },
                  { value: '24/7', label: 'Stoerungsannahme' },
                  { value: '98%', label: 'Zufriedenheit' },
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

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="tel:+4348756172"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-idm hover:bg-idm-dark text-n-900 font-semibold text-sm transition-all"
                >
                  <Phone className="w-4 h-4" />
                  Jetzt anrufen: +43 4875 6172
                </a>
                <a
                  href="mailto:service@idm-energie.at"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 text-white hover:border-white/30 text-sm font-medium transition-all"
                >
                  <Mail className="w-4 h-4" />
                  E-Mail senden
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img loading="lazy" decoding="async" src="/images/technician-plant-room.jpg" alt="iDM Service Techniker" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gitter opacity-40 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-n-950/40" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Service Areas — Hub Cards ─────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <AnimateIn variant="fadeUp" className="mb-12">
            <span className="text-[11px] font-mono font-semibold text-n-400 uppercase tracking-[0.2em]">Service-Bereiche</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-n-900 tracking-[-0.02em]">
              Alles, was Sie brauchen.
            </h2>
            <p className="mt-3 text-sm text-n-500 max-w-lg leading-relaxed">
              Von der technischen Soforthilfe bis zur Fachpartner-Schulung — unsere vier Service-Bereiche decken alle Beduerfnisse ab.
            </p>
          </AnimateIn>

          <div className="grid md:grid-cols-2 gap-3">
            {serviceAreas.map((area, i) => {
              const Icon = area.icon
              return (
                <AnimateIn key={area.title} variant="fadeUp" delay={i * 0.1}>
                  <Link
                    to={area.href}
                    className={`group block p-6 lg:p-8 border transition-all duration-300 h-full ${
                      area.highlight
                        ? 'border-idm/30 bg-idm/[0.03] hover:bg-idm/[0.06]'
                        : 'border-n-100 bg-white hover:border-n-200 hover:bg-n-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-5">
                      <div className={`w-12 h-12 flex items-center justify-center ${area.highlight ? 'bg-idm' : 'bg-n-100 group-hover:bg-n-200'} transition-colors`}>
                        <Icon className={`w-5 h-5 ${area.highlight ? 'text-n-900' : 'text-n-600'}`} />
                      </div>
                      <ArrowRight className="w-4 h-4 text-n-300 group-hover:text-n-600 group-hover:translate-x-1 transition-all" />
                    </div>

                    <h3 className="text-xl font-bold text-n-900 mb-2">{area.title}</h3>
                    <p className="text-sm text-n-500 leading-relaxed mb-5">{area.desc}</p>

                    <ul className="space-y-2">
                      {area.features.map((f) => (
                        <li key={f} className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-idm shrink-0" />
                          <span className="text-[13px] text-n-600">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </Link>
                </AnimateIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Contact Channels ─────────────────────────── */}
      <section className="py-20 lg:py-28 bg-n-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <AnimateIn variant="fadeUp" className="mb-12">
            <span className="text-[11px] font-mono font-semibold text-n-400 uppercase tracking-[0.2em]">Kontakt</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-n-900 tracking-[-0.02em]">
              So erreichen Sie uns.
            </h2>
            <p className="mt-3 text-sm text-n-500 max-w-lg leading-relaxed">
              Telefonisch, per E-Mail oder ueber unsere Fachpartner vor Ort — waehlen Sie den passenden Kontaktweg.
            </p>
          </AnimateIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {contactChannels.map((ch, i) => {
              const Icon = ch.icon
              const Wrapper = ch.isLink ? Link : 'a'
              const wrapperProps = ch.isLink
                ? { to: ch.action }
                : { href: ch.action }

              return (
                <AnimateIn key={ch.title} variant="fadeUp" delay={i * 0.07}>
                  <Wrapper
                    {...wrapperProps}
                    className="group block bg-white border border-n-100 p-5 lg:p-6 hover:border-n-200 hover:shadow-sm transition-all h-full"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 bg-n-100 group-hover:bg-idm/10 flex items-center justify-center transition-colors">
                        <Icon className="w-4 h-4 text-n-500 group-hover:text-idm-dark transition-colors" />
                      </div>
                      <span className="text-sm font-semibold text-n-900">{ch.title}</span>
                    </div>
                    <div className="text-sm font-mono font-semibold text-n-900">{ch.detail}</div>
                    <div className="text-[11px] font-mono text-n-400 mt-1">{ch.sub}</div>
                  </Wrapper>
                </AnimateIn>
              )
            })}
          </div>

          {/* Important note */}
          <AnimateIn variant="fadeUp" delay={0.3}>
            <div className="mt-8 flex items-start gap-3 p-5 bg-white border border-amber-200 max-w-2xl">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-sm font-semibold text-n-900 block mb-1">Stoerungsfall?</span>
                <p className="text-[12px] text-n-500 leading-relaxed">
                  Bitte halten Sie die Seriennummer Ihrer Waermepumpe und den angezeigten Fehlercode bereit.
                  So koennen unsere Techniker Ihnen schnellstmoeglich helfen.
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Why iDM Service ──────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <AnimateIn variant="fadeUp" className="mb-12">
            <span className="text-[11px] font-mono font-semibold text-n-400 uppercase tracking-[0.2em]">Vorteile</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-n-900 tracking-[-0.02em]">
              Service direkt vom{' '}
              <span className="text-gradient-idm">Hersteller.</span>
            </h2>
          </AnimateIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {advantages.map((adv, i) => {
              const Icon = adv.icon
              return (
                <AnimateIn key={adv.title} variant="fadeUp" delay={i * 0.07}>
                  <div className="p-6 border border-n-100 bg-white hover:border-n-200 transition-all h-full">
                    <div className="w-10 h-10 bg-n-50 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-n-600" />
                    </div>
                    <h3 className="text-base font-bold text-n-900 mb-1.5">{adv.title}</h3>
                    <p className="text-sm text-n-500 leading-relaxed">{adv.desc}</p>
                  </div>
                </AnimateIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Spare Parts Image Banner ─────────────────── */}
      <section className="relative">
        <div className="aspect-[21/9] lg:aspect-[3/1] relative overflow-hidden">
          <img loading="lazy" decoding="async" src="/images/factory-aerial.jpg" alt="iDM Werk Matrei — Ersatzteillager" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gitter opacity-40 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-n-950/80 via-n-950/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
            <div className="max-w-[1400px] mx-auto">
              <span className="text-[10px] font-mono text-n-400 tracking-wider block mb-2">ERSATZTEILE & LOGISTIK</span>
              <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-[-0.02em]">
                15.000+ Original-Ersatzteile ab Lager.
              </h3>
              <p className="mt-2 text-sm text-n-400 max-w-lg">
                Zentrale Ersatzteilversorgung aus Matrei in Osttirol. Express-Versand bei Stoerungen, Bestellung ueber Ihren Fachpartner.
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
                Interesse an unserer Waermepumpe?
              </h3>
              <p className="text-n-500 text-sm mt-2 max-w-lg">
                Kontaktieren Sie uns oder finden Sie einen Fachpartner in Ihrer Naehe.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/tools/partnerfinder"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-idm hover:bg-idm-dark text-n-900 font-semibold text-sm transition-all"
              >
                Partner finden
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
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
