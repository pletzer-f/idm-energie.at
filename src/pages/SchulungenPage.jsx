import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, GraduationCap, Calendar, MapPin, Clock,
  Users, Award, CheckCircle2, ChevronRight, Star, Zap,
  BookOpen, Wrench, Shield, Monitor
} from 'lucide-react'
import AnimateIn from '../components/animations/AnimateIn'

/* ─── Certification Path ───────────────────────────────────── */
const certificationLevels = [
  {
    level: 'Bronze',
    title: 'iDM Basis-Zertifizierung',
    desc: 'Grundlagen der iDM Waermepumpen-Installation und -Inbetriebnahme',
    duration: '1 Tag',
    prerequisites: 'Kaeltetechniker-Ausbildung',
    skills: ['Installation & Inbetriebnahme', 'NAVIGATOR Grundlagen', 'Hydraulikschemas', 'Fehlerdiagnose Basis'],
    icon: Wrench,
  },
  {
    level: 'Silber',
    title: 'iDM System-Spezialist',
    desc: 'Fortgeschrittene Systemplanung und Optimierung',
    duration: '2 Tage',
    prerequisites: 'Bronze-Zertifizierung',
    skills: ['Systemoptimierung', 'myiDM Portal', 'Ferndiagnose', 'Hydraulik Fortgeschritten', 'Foerderberatung'],
    icon: Shield,
  },
  {
    level: 'Gold',
    title: 'iDM Experte',
    desc: 'Kaskadierung, Gewerbe-Projekte und komplexe Systeme',
    duration: '3 Tage',
    prerequisites: 'Silber-Zertifizierung',
    skills: ['Kaskadierung & MAX', 'BACnet/Modbus', 'Grossprojekt-Planung', 'Stoerungsbehebung Experte', 'Trainer-Qualifizierung'],
    icon: Award,
  },
]

/* ─── Training Calendar ────────────────────────────────────── */
const trainings = [
  {
    title: 'iDM Basis-Schulung AERO',
    date: '15.–16. Maerz 2026',
    location: 'Matrei in Osttirol',
    type: 'Praesenz',
    level: 'Bronze',
    spots: 8,
    maxSpots: 16,
  },
  {
    title: 'NAVIGATOR 2.0 Masterclass',
    date: '22. Maerz 2026',
    location: 'Online',
    type: 'Webinar',
    level: 'Silber',
    spots: 15,
    maxSpots: 30,
  },
  {
    title: 'Gewerbe-Kaskadierung Workshop',
    date: '5.–7. April 2026',
    location: 'Matrei in Osttirol',
    type: 'Praesenz',
    level: 'Gold',
    spots: 4,
    maxSpots: 12,
  },
  {
    title: 'iDM Basis-Schulung TERRA',
    date: '19.–20. April 2026',
    location: 'Matrei in Osttirol',
    type: 'Praesenz',
    level: 'Bronze',
    spots: 10,
    maxSpots: 16,
  },
  {
    title: 'R290 Kaeltemittel Spezial',
    date: '28. April 2026',
    location: 'Online',
    type: 'Webinar',
    level: 'Silber',
    spots: 20,
    maxSpots: 50,
  },
  {
    title: 'Sanierung Praxis-Workshop',
    date: '10.–11. Mai 2026',
    location: 'Matrei in Osttirol',
    type: 'Praesenz',
    level: 'Silber',
    spots: 6,
    maxSpots: 16,
  },
]

/* ─── Testimonials ─────────────────────────────────────────── */
const testimonials = [
  {
    name: 'Ing. Thomas Huber',
    company: 'Heizung Huber GmbH, Innsbruck',
    quote: 'Die iDM Schulungen sind die besten in der Branche. Praxisnah, kompetent und direkt am Produkt.',
    level: 'Gold-Partner',
  },
  {
    name: 'Stefan Berger',
    company: 'Berger Installationen, Salzburg',
    quote: 'Seit der Silber-Zertifizierung kann ich meinen Kunden einen viel besseren Service bieten. Die Ferndiagnose spart enorm Zeit.',
    level: 'Silber-Partner',
  },
  {
    name: 'Markus Eder',
    company: 'Eder Haustechnik, Klagenfurt',
    quote: 'Das Schulungszentrum in Matrei ist beeindruckend. Man arbeitet direkt an realen Anlagen — besser kann man nicht lernen.',
    level: 'Gold-Partner',
  },
]

/* ─── Training Benefits ────────────────────────────────────── */
const trainingBenefits = [
  { icon: BookOpen, title: 'Praxisnah', desc: 'Schulungen direkt am Produkt im modernen Schulungszentrum' },
  { icon: Monitor, title: 'Hybrid-Formate', desc: 'Praesenz in Matrei oder Online-Webinare — Sie waehlen' },
  { icon: Award, title: 'Zertifiziert', desc: 'Offizielles iDM Zertifikat mit Partner-Status' },
  { icon: Users, title: 'Netzwerk', desc: 'Austausch mit Fachkollegen und iDM Experten' },
  { icon: Zap, title: 'Priorisiert', desc: 'Zertifizierte Partner erhalten priorisierten Support' },
  { icon: Star, title: 'Sichtbarkeit', desc: 'Listung im iDM Partnerfinder fuer Endkunden' },
]

/* ─── Level Filter ─────────────────────────────────────────── */
const levelColors = {
  Bronze: 'bg-amber-700/10 text-amber-700 border-amber-300',
  Silber: 'bg-gray-200/50 text-gray-600 border-gray-300',
  Gold: 'bg-yellow-400/15 text-yellow-700 border-yellow-400',
}

/* ─── Main Page ────────────────────────────────────────────── */
export default function SchulungenPage() {
  const [activeLevel, setActiveLevel] = useState('all')

  const filteredTrainings = activeLevel === 'all'
    ? trainings
    : trainings.filter((t) => t.level === activeLevel)

  return (
    <div className="bg-white">
      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative bg-n-950 overflow-hidden min-h-[600px] lg:min-h-[680px]">
        <div className="absolute inset-0 bg-gitter-dark pointer-events-none" />
        <div className="absolute inset-0 bg-grid-fine opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 min-h-[600px] lg:min-h-[680px] flex items-center">
          <div className="grid lg:grid-cols-2 gap-10 items-center w-full pt-24 pb-12 lg:pt-20 lg:pb-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Link to="/" className="inline-flex items-center gap-2 text-n-500 text-xs font-mono tracking-wider hover:text-white transition-colors mb-6">
                <ArrowLeft className="w-3 h-3" /> STARTSEITE
              </Link>

              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="w-5 h-5 text-idm" />
                <span className="text-[11px] font-mono text-idm uppercase tracking-[0.2em]">Fuer Fachpartner</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em] leading-[1.05]">
                Schulungen &{'\n'}
                <span className="text-gradient-idm">Zertifizierungen.</span>
              </h1>

              <p className="mt-5 text-n-400 text-sm md:text-base leading-relaxed max-w-lg">
                Werden Sie zum iDM Experten. Unsere praxisnahen Schulungen — in Matrei oder online —
                machen Sie fit fuer Installation, Inbetriebnahme und Optimierung aller iDM Systeme.
              </p>

              {/* Quick stats */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: '500+', label: 'Partner geschult' },
                  { value: '3', label: 'Zertifizierungsstufen' },
                  { value: '48', label: 'Termine pro Jahr' },
                  { value: '4.9', label: 'Bewertung (5.0)' },
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

            {/* Hero image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img loading="lazy" decoding="async" src="/images/engineer-cad.jpg" alt="iDM Schulungszentrum" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gitter opacity-40 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-n-950/40" />
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-n-950/80 backdrop-blur-sm border border-n-800 p-4">
                <span className="text-[10px] font-mono text-n-500 tracking-wider block">SCHULUNGSZENTRUM</span>
                <span className="text-sm text-white font-semibold">Matrei in Osttirol — iDM Headquarter</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Certification Path ─────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <AnimateIn variant="fadeUp" className="mb-12">
            <span className="text-[11px] font-mono font-semibold text-n-400 uppercase tracking-[0.2em]">Zertifizierung</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-n-900 tracking-[-0.02em]">
              Ihr Weg zum <span className="text-gradient-idm">iDM Experten.</span>
            </h2>
            <p className="mt-3 text-sm text-n-500 max-w-lg leading-relaxed">
              Drei Stufen — von der Basis bis zum Experten. Jede Stufe baut auf der vorherigen auf
              und erweitert Ihre Kompetenzen.
            </p>
          </AnimateIn>

          {/* Certification levels as connected cards */}
          <div className="grid md:grid-cols-3 gap-0">
            {certificationLevels.map((cert, i) => {
              const Icon = cert.icon
              return (
                <AnimateIn key={cert.level} variant="fadeUp" delay={i * 0.15}>
                  <div className="relative border border-n-100 p-6 lg:p-8 h-full bg-white hover:bg-n-50/50 transition-colors">
                    {/* Top accent */}
                    <div className={`absolute top-0 left-0 right-0 h-[3px] ${
                      cert.level === 'Gold' ? 'bg-yellow-400' :
                      cert.level === 'Silber' ? 'bg-gray-400' :
                      'bg-amber-600'
                    }`} />

                    {/* Connector arrow — between cards */}
                    {i < certificationLevels.length - 1 && (
                      <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-white border border-n-200 items-center justify-center">
                        <ChevronRight className="w-3 h-3 text-n-400" />
                      </div>
                    )}

                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 flex items-center justify-center ${
                        cert.level === 'Gold' ? 'bg-yellow-400/20' :
                        cert.level === 'Silber' ? 'bg-gray-200' :
                        'bg-amber-600/15'
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          cert.level === 'Gold' ? 'text-yellow-600' :
                          cert.level === 'Silber' ? 'text-gray-500' :
                          'text-amber-700'
                        }`} />
                      </div>
                      <div>
                        <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 border ${levelColors[cert.level]}`}>
                          {cert.level}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-n-900 mb-1">{cert.title}</h3>
                    <p className="text-sm text-n-500 mb-4 leading-relaxed">{cert.desc}</p>

                    <div className="flex items-center gap-4 mb-5 text-[11px] font-mono text-n-400">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{cert.duration}</span>
                      <span className="flex items-center gap-1"><GraduationCap className="w-3 h-3" />{cert.prerequisites}</span>
                    </div>

                    <div className="space-y-2 border-t border-n-100 pt-4">
                      <span className="text-[10px] font-mono text-n-400 uppercase tracking-wider">Inhalte</span>
                      {cert.skills.map((skill) => (
                        <div key={skill} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-idm shrink-0" />
                          <span className="text-[12px] text-n-700">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimateIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Training Calendar ──────────────────────────── */}
      <section className="py-20 lg:py-28 bg-n-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <AnimateIn variant="fadeUp" className="mb-8">
            <span className="text-[11px] font-mono font-semibold text-n-400 uppercase tracking-[0.2em]">Termine</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-n-900 tracking-[-0.02em]">
              Schulungskalender.
            </h2>
          </AnimateIn>

          {/* Level filter */}
          <div className="flex gap-1 mb-8">
            {['all', 'Bronze', 'Silber', 'Gold'].map((level) => (
              <button
                key={level}
                onClick={() => setActiveLevel(level)}
                className={`px-4 py-2.5 text-[11px] font-mono font-semibold uppercase tracking-wider transition-all ${
                  activeLevel === level
                    ? 'bg-n-900 text-white'
                    : 'bg-white text-n-500 hover:bg-n-100 hover:text-n-700 border border-n-100'
                }`}
              >
                {level === 'all' ? 'Alle Stufen' : level}
              </button>
            ))}
          </div>

          {/* Training cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredTrainings.map((training, i) => {
              const spotsLeft = training.maxSpots - training.spots
              const almostFull = spotsLeft <= 4

              return (
                <AnimateIn key={training.title + training.date} variant="fadeUp" delay={i * 0.05}>
                  <div className="bg-white border border-n-100 p-6 h-full flex flex-col hover:border-n-200 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 border ${levelColors[training.level]}`}>
                        {training.level}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 ${
                        training.type === 'Webinar'
                          ? 'bg-blue-50 text-blue-600 border border-blue-200'
                          : 'bg-green-50 text-green-600 border border-green-200'
                      }`}>
                        {training.type}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-n-900 mb-3">{training.title}</h3>

                    <div className="space-y-2 text-sm text-n-600 mb-4 flex-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-n-400" />
                        <span>{training.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-n-400" />
                        <span>{training.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-n-400" />
                        <span className={almostFull ? 'text-amber-600 font-medium' : ''}>
                          {spotsLeft} von {training.maxSpots} Plaetzen frei
                          {almostFull && ' — Fast ausgebucht!'}
                        </span>
                      </div>
                    </div>

                    {/* Progress bar for spots */}
                    <div className="h-1 bg-n-100 mb-4 overflow-hidden">
                      <div
                        className={`h-full transition-all ${almostFull ? 'bg-amber-500' : 'bg-idm'}`}
                        style={{ width: `${(training.spots / training.maxSpots) * 100}%` }}
                      />
                    </div>

                    <button className="group w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-n-900 hover:bg-n-800 text-white text-sm font-semibold transition-all">
                      Anmelden
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </AnimateIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Why Training with iDM ──────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <AnimateIn variant="fadeUp" className="mb-12">
            <span className="text-[11px] font-mono font-semibold text-n-400 uppercase tracking-[0.2em]">Vorteile</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-n-900 tracking-[-0.02em]">
              Warum Schulung bei iDM?
            </h2>
          </AnimateIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {trainingBenefits.map((benefit, i) => {
              const Icon = benefit.icon
              return (
                <AnimateIn key={benefit.title} variant="fadeUp" delay={i * 0.08}>
                  <div className="p-6 border border-n-100 hover:border-idm/20 hover:bg-idm/[0.01] transition-all duration-300 h-full">
                    <div className="w-10 h-10 bg-n-100 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-n-600" />
                    </div>
                    <h3 className="text-base font-bold text-n-900 mb-1">{benefit.title}</h3>
                    <p className="text-sm text-n-500 leading-relaxed">{benefit.desc}</p>
                  </div>
                </AnimateIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-n-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gitter-dark pointer-events-none" />
        <div className="absolute inset-0 bg-grid-fine opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
          <AnimateIn variant="fadeUp" className="mb-12">
            <span className="text-[11px] font-mono font-semibold text-n-500 uppercase tracking-[0.2em]">Stimmen</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-white tracking-[-0.02em]">
              Das sagen unsere Partner.
            </h2>
          </AnimateIn>

          <div className="grid md:grid-cols-3 gap-3">
            {testimonials.map((t, i) => (
              <AnimateIn key={t.name} variant="fadeUp" delay={i * 0.1}>
                <div className="bg-white/[0.04] border border-n-800 p-6 lg:p-8 h-full flex flex-col">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 text-idm fill-idm" />
                    ))}
                  </div>
                  <p className="text-sm text-n-300 leading-relaxed flex-1 mb-5">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="border-t border-n-800 pt-4">
                    <span className="text-white font-semibold text-sm block">{t.name}</span>
                    <span className="text-n-500 text-[12px] block">{t.company}</span>
                    <span className="text-[10px] font-mono text-idm tracking-wider mt-1 block">{t.level.toUpperCase()}</span>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[900px] mx-auto px-6 lg:px-10 text-center">
          <AnimateIn variant="fadeUp">
            <div className="w-14 h-14 bg-idm flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="w-6 h-6 text-n-900" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-n-900 tracking-[-0.02em] mb-3">
              Bereit fuer Ihre iDM Zertifizierung?
            </h2>
            <p className="text-sm text-n-500 max-w-md mx-auto leading-relaxed mb-8">
              Melden Sie sich zu einer Schulung an oder kontaktieren Sie uns fuer eine
              individuelle Partnerschafts-Beratung.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:+4348756172"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-idm hover:bg-idm-dark text-n-900 font-semibold text-sm transition-all"
              >
                Jetzt kontaktieren
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                to="/service/downloads"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-n-200 hover:border-n-900 text-n-900 font-semibold text-sm transition-all"
              >
                Schulungsunterlagen
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </div>
  )
}
