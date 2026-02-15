import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Briefcase, MapPin, Clock, Heart,
  Mountain, Zap, Users, GraduationCap, Coffee, Bike, Shield,
  ChevronRight, Star
} from 'lucide-react'
import AnimateIn from '../components/animations/AnimateIn'

/* ─── Open Positions ───────────────────────────────────────── */
const departments = [
  { id: 'all', label: 'Alle' },
  { id: 'technik', label: 'Technik & Entwicklung' },
  { id: 'produktion', label: 'Produktion' },
  { id: 'vertrieb', label: 'Vertrieb & Marketing' },
  { id: 'service', label: 'Service' },
  { id: 'it', label: 'IT & Digital' },
]

const positions = [
  { title: 'Entwicklungsingenieur:in Kaeltetechnik', dept: 'technik', type: 'Vollzeit', location: 'Matrei i. O.' },
  { title: 'Software-Entwickler:in Embedded Systems', dept: 'technik', type: 'Vollzeit', location: 'Matrei i. O.' },
  { title: 'Produktmanager:in Waermepumpen', dept: 'vertrieb', type: 'Vollzeit', location: 'Matrei i. O.' },
  { title: 'CNC-Fachkraft Blechbearbeitung', dept: 'produktion', type: 'Vollzeit', location: 'Matrei i. O.' },
  { title: 'Servicetechniker:in Aussendienst', dept: 'service', type: 'Vollzeit', location: 'Westösterreich' },
  { title: 'Servicetechniker:in Aussendienst', dept: 'service', type: 'Vollzeit', location: 'Ostösterreich' },
  { title: 'Technische:r Verkaufsberater:in', dept: 'vertrieb', type: 'Vollzeit', location: 'Salzburg / Oberösterreich' },
  { title: 'Full-Stack Developer (React/Node)', dept: 'it', type: 'Vollzeit / Remote', location: 'Matrei i. O. / Remote' },
  { title: 'UX/UI Designer:in myiDM Portal', dept: 'it', type: 'Vollzeit', location: 'Matrei i. O.' },
  { title: 'Elektriker:in Waermepumpen-Montage', dept: 'produktion', type: 'Vollzeit', location: 'Matrei i. O.' },
  { title: 'Schulungstrainer:in (m/w/d)', dept: 'service', type: 'Vollzeit', location: 'Matrei i. O.' },
  { title: 'Praktikum Maschinenbau / Elektrotechnik', dept: 'technik', type: 'Praktikum', location: 'Matrei i. O.' },
]

/* ─── Benefits ─────────────────────────────────────────────── */
const benefits = [
  { icon: Mountain, title: 'Arbeiten in Tirol', desc: 'Am Fusse des Grossglockners — Berge, Natur und Lebensqualitaet.' },
  { icon: Heart, title: 'Familiaere Kultur', desc: 'Kurze Wege, offene Tueren, echtes Miteinander.' },
  { icon: GraduationCap, title: 'Weiterbildung', desc: 'Interne Schulungen, externe Kurse und Karriereplanung.' },
  { icon: Bike, title: 'Mobilitaet', desc: 'E-Bike Leasing, Parkplaetze und gute Anbindung.' },
  { icon: Coffee, title: 'Verpflegung', desc: 'Betriebsrestaurant mit regionalen Produkten.' },
  { icon: Shield, title: 'Sicherheit', desc: 'Stabiler Arbeitgeber seit 1977, Betriebsvorsorge.' },
  { icon: Zap, title: 'Innovation', desc: 'Arbeiten an der Zukunft der Energie — mit modernster Technologie.' },
  { icon: Users, title: 'Teamgeist', desc: 'Firmenevents, Sportgruppen und gemeinsame Aktivitaeten.' },
]

/* ─── Main Page ────────────────────────────────────────────── */
export default function KarrierePage() {
  return (
    <div className="bg-white">
      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative bg-n-950 overflow-hidden h-[600px] lg:h-[680px]">
        <div className="absolute inset-0 bg-gitter-dark pointer-events-none" />
        <div className="absolute inset-0 bg-grid-fine opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 h-full">
          <div className="grid lg:grid-cols-2 gap-10 items-center h-full pt-20 lg:pt-0">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <Link to="/" className="inline-flex items-center gap-2 text-n-500 text-xs font-mono tracking-wider hover:text-white transition-colors mb-6">
                <ArrowLeft className="w-3 h-3" /> STARTSEITE
              </Link>

              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="w-5 h-5 text-idm" />
                <span className="text-[11px] font-mono text-idm uppercase tracking-[0.2em]">Karriere</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em] leading-[1.05]">
                Gestalten Sie die{'\n'}
                <span className="text-gradient-idm">Zukunft der Energie.</span>
              </h1>

              <p className="mt-5 text-n-400 text-sm md:text-base leading-relaxed max-w-lg">
                800 Kolleg:innen. Eine Mission: Emissionsfreie Waerme fuer alle.
                Werden Sie Teil der iDM Familie in Matrei in Osttirol.
              </p>

              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: '12', label: 'Offene Stellen' },
                  { value: '800', label: 'Mitarbeiter:innen' },
                  { value: '4.8', label: 'kununu Score' },
                  { value: '93%', label: 'Empfehlungsrate' },
                ].map((s, i) => (
                  <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                    className="bg-white/[0.04] border border-n-800 p-2.5"
                  >
                    <span className="text-lg font-mono font-bold text-idm block">{s.value}</span>
                    <span className="text-[10px] font-mono text-n-600 tracking-wider block mt-0.5">{s.label.toUpperCase()}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative hidden lg:block">
              <div className="aspect-[4/3] relative overflow-hidden">
                <img src="/images/engineer-cad.png" alt="Team iDM" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gitter opacity-40 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-n-950/40" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Benefits Grid ──────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <AnimateIn variant="fadeUp" className="mb-12">
            <span className="text-[11px] font-mono font-semibold text-n-400 uppercase tracking-[0.2em]">Vorteile</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-n-900 tracking-[-0.02em]">
              Warum iDM?
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {benefits.map((b, i) => {
              const Icon = b.icon
              return (
                <AnimateIn key={b.title} variant="fadeUp" delay={i * 0.05}>
                  <div className="p-5 border border-n-100 hover:border-idm/20 hover:bg-idm/[0.01] transition-all duration-300 h-full">
                    <div className="w-9 h-9 bg-n-100 flex items-center justify-center mb-3">
                      <Icon className="w-4 h-4 text-n-600" />
                    </div>
                    <h3 className="text-sm font-bold text-n-900 mb-1">{b.title}</h3>
                    <p className="text-[12px] text-n-500 leading-relaxed">{b.desc}</p>
                  </div>
                </AnimateIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Open Positions ─────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-n-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <AnimateIn variant="fadeUp" className="mb-8">
            <span className="text-[11px] font-mono font-semibold text-n-400 uppercase tracking-[0.2em]">Offene Stellen</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-n-900 tracking-[-0.02em]">
              Finden Sie Ihren Platz.
            </h2>
          </AnimateIn>

          {/* Job listings */}
          <div className="border border-n-100 bg-white">
            {positions.map((pos, i) => (
              <AnimateIn key={pos.title + pos.location} variant="fadeUp" delay={i * 0.02}>
                <div className="group flex items-center justify-between px-6 py-4 border-b border-n-50 hover:bg-n-50/50 transition-colors cursor-pointer">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-n-900 group-hover:text-idm-dark transition-colors">
                      {pos.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-[11px] font-mono text-n-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {pos.location}
                      </span>
                      <span className="text-[11px] font-mono text-n-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {pos.type}
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0 ml-4">
                    <div className="w-8 h-8 flex items-center justify-center bg-n-100 group-hover:bg-idm transition-colors">
                      <ChevronRight className="w-4 h-4 text-n-400 group-hover:text-n-900 transition-colors" />
                    </div>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-n-500">
              Keine passende Stelle? Senden Sie uns Ihre <span className="font-semibold text-n-700">Initiativbewerbung</span> an{' '}
              <span className="font-mono text-idm-dark">karriere@idm-energie.at</span>
            </p>
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
                Fragen zur Bewerbung?
              </h3>
              <p className="text-n-500 text-sm mt-2 max-w-lg">
                Unser HR-Team freut sich auf Ihre Nachricht.
              </p>
            </div>
            <a href="mailto:karriere@idm-energie.at"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-idm hover:bg-idm-dark text-n-900 font-semibold text-sm transition-all"
            >
              karriere@idm-energie.at
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
