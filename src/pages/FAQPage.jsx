import { useState, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Search, ChevronDown, MessageCircle,
  Thermometer, Zap, Euro, Volume2, Wrench, Home, Phone,
  ThumbsUp, ThumbsDown
} from 'lucide-react'
import AnimateIn from '../components/animations/AnimateIn'

/* ─── FAQ Data ──────────────────────────────────────────────── */
const faqCategories = [
  { id: 'all', label: 'Alle', icon: MessageCircle },
  { id: 'grundlagen', label: 'Grundlagen', icon: Thermometer },
  { id: 'technik', label: 'Technik', icon: Zap },
  { id: 'kosten', label: 'Kosten & Foerderung', icon: Euro },
  { id: 'betrieb', label: 'Betrieb & Wartung', icon: Wrench },
  { id: 'lautstaerke', label: 'Lautstaerke', icon: Volume2 },
  { id: 'einbau', label: 'Einbau & Planung', icon: Home },
]

const faqs = [
  // Grundlagen
  {
    category: 'grundlagen',
    question: 'Wie funktioniert eine Waermepumpe?',
    answer: 'Eine Waermepumpe entzieht der Umgebung (Luft, Erde oder Grundwasser) Waermeenergie und bringt sie auf ein hoeheres Temperaturniveau. Das Prinzip entspricht einem umgekehrten Kuehlschrank: Ein Kaeltemittel verdampft bei niedrigen Temperaturen, wird verdichtet und gibt die Waerme an das Heizsystem ab. Fuer jede Kilowattstunde Strom liefert eine moderne Waermepumpe 3 bis 5 kWh Waerme.',
  },
  {
    category: 'grundlagen',
    question: 'Luft, Erde oder Grundwasser — welche Waermequelle ist die richtige?',
    answer: 'Luft-Waermepumpen (AERO) sind die flexibelste Loesung — einfach aufzustellen, geringere Investitionskosten. Erdwaermepumpen (TERRA) bieten die hoechste Effizienz dank konstanter Bodentemperaturen. Grundwasser-Waermepumpen erreichen aehnliche Werte, erfordern aber eine Genehmigung. Ihr iDM Fachpartner beraet Sie, welche Quelle an Ihrem Standort optimal ist.',
  },
  {
    category: 'grundlagen',
    question: 'Kann eine Waermepumpe auch kuehlen?',
    answer: 'Ja! Viele iDM Waermepumpen koennen im Sommer aktiv oder passiv kuehlen. Bei passiver Kuehlung (free cooling) wird die kuehle Erdwaerme direkt genutzt — fast ohne Strom. Aktive Kuehlung funktioniert wie eine Klimaanlage und ist mit Luft- und Erdwaermepumpen moeglich.',
  },
  // Technik
  {
    category: 'technik',
    question: 'Was ist der COP und was bedeutet er fuer mich?',
    answer: 'Der COP (Coefficient of Performance) gibt an, wie viel Waerme eine Waermepumpe pro eingesetzter kWh Strom liefert. Ein COP von 4 bedeutet: Aus 1 kWh Strom werden 4 kWh Waerme. Je hoeher der COP, desto effizienter und sparsamer arbeitet die Anlage. iDM Waermepumpen erreichen saisonale COPs (SCOP) von ueber 4.',
  },
  {
    category: 'technik',
    question: 'Was ist R290 und warum verwendet iDM dieses Kaeltemittel?',
    answer: 'R290 (Propan) ist ein natuerliches Kaeltemittel mit einem GWP (Treibhauspotenzial) von nur 3 — verglichen mit ueber 1.400 bei aelteren synthetischen Kaeltemitteln. iDM setzt zunehmend auf R290, weil es umweltfreundlich, zukunftssicher und hocheffizient ist. Alle neuen Produktlinien verwenden R290.',
  },
  {
    category: 'technik',
    question: 'Welche Vorlauftemperatur erreichen iDM Waermepumpen?',
    answer: 'Je nach Modell bis zu 70°C. Fuer Neubauten mit Fussbodenheizung reichen 35°C — das ergibt die beste Effizienz. Fuer Sanierungen mit bestehenden Heizkoerpern bieten unsere Hochtemperatur-Modelle Vorlauftemperaturen bis 70°C, sodass kein Heizsystem-Umbau noetig ist.',
  },
  {
    category: 'technik',
    question: 'Was ist der NAVIGATOR 2.0?',
    answer: 'Der NAVIGATOR 2.0 ist die intelligente Systemsteuerung von iDM. Er regelt nicht nur die Waermepumpe, sondern das gesamte Energiesystem — Heizkreise, Warmwasser, Solar, Kuehlung. Per myiDM App oder Webportal haben Sie jederzeit Zugriff auf Ihr System.',
  },
  // Kosten & Foerderung
  {
    category: 'kosten',
    question: 'Was kostet eine iDM Waermepumpe?',
    answer: 'Die Investitionskosten haengen von Waermequelle, Leistung und Ausstattung ab. Eine typische Luft-Waermepumpe fuer ein Einfamilienhaus liegt bei ca. 15.000-25.000 Euro (ohne Foerderung). Erdwaermepumpen kosten inklusive Bohrung mehr, amortisieren sich aber durch niedrigere Betriebskosten schneller. Nutzen Sie den iDM Konfigurator fuer eine unverbindliche Schaetzung.',
  },
  {
    category: 'kosten',
    question: 'Welche Foerderungen gibt es?',
    answer: 'In Oesterreich gibt es die Bundesfoerderung "Raus aus Oel und Gas" mit bis zu 75% der Kosten. Zusaetzlich gibt es Landesfoerderungen, die die Gesamtfoerderung auf bis zu 100% erhoehen koennen. Auch fuer Neubauten gibt es Foerderungen. Ihr iDM Fachpartner hilft bei der Antragstellung. Aktuelle Foerderinformationen finden Sie auf umweltfoerderung.at.',
  },
  {
    category: 'kosten',
    question: 'Wie hoch sind die laufenden Kosten?',
    answer: 'Eine typische Luft-Waermepumpe fuer ein gut gedaemmtes Einfamilienhaus verbraucht ca. 3.000-5.000 kWh Strom pro Jahr. Bei einem Strompreis von 0,25 Euro/kWh sind das 750-1.250 Euro Jahreskosten fuer Heizen und Warmwasser. Mit Photovoltaik koennen Sie die Kosten nochmals deutlich senken.',
  },
  // Betrieb & Wartung
  {
    category: 'betrieb',
    question: 'Wie oft muss eine Waermepumpe gewartet werden?',
    answer: 'Eine jaehrliche Inspektion durch einen Fachpartner wird empfohlen. Die Wartung umfasst Kaehltemittelpruefung, Filter reinigen, Volumenstrom kontrollieren und Software-Update. Waermepumpen sind generell wartungsaermer als Oel- oder Gasheizungen — kein Schornsteinfeger, kein Brenner-Service.',
  },
  {
    category: 'betrieb',
    question: 'Was tun bei einer Stoerung?',
    answer: 'Pruefen Sie zunaechst den Fehlercode auf dem NAVIGATOR Display und nutzen Sie unsere Fehlercode-Diagnose online. Viele Stoerungen lassen sich durch einen Neustart (Sicherung aus/ein) beheben. Bei wiederholten Stoerungen kontaktieren Sie unseren technischen Support unter +43 4875 6172 oder Ihren Fachpartner.',
  },
  {
    category: 'betrieb',
    question: 'Wie lange haelt eine iDM Waermepumpe?',
    answer: 'Bei regelmaessiger Wartung 20 bis 25 Jahre. Der Verdichter — das Herzstück — ist fuer mindestens 60.000 Betriebsstunden ausgelegt. iDM bietet optionale Garantieverlaengerungen ueber die Service-Pakete.',
  },
  // Lautstaerke
  {
    category: 'lautstaerke',
    question: 'Wie laut ist eine Luft-Waermepumpe?',
    answer: 'Moderne iDM Luft-Waermepumpen liegen bei 35-50 dB(A) in 3 Metern Abstand — vergleichbar mit einem Fluestern bis leisem Gespraech. Die Nachtabsenkung reduziert den Schallpegel automatisch. Bei der Aufstellung beraet Sie Ihr Fachpartner bezueglich Abstaende und Schallschutz.',
  },
  {
    category: 'lautstaerke',
    question: 'Stoert die Waermepumpe die Nachbarn?',
    answer: 'Nicht bei korrekter Aufstellung. iDM Waermepumpen unterschreiten die strengen oesterreichischen Grenzwerte. Wichtig ist der richtige Aufstellort: Nicht direkt vor dem Schlafzimmerfenster der Nachbarn. Ihr Fachpartner fuehrt bei Bedarf eine Schallprognose durch.',
  },
  // Einbau & Planung
  {
    category: 'einbau',
    question: 'Kann ich eine Waermepumpe im Altbau einbauen?',
    answer: 'Ja! Unsere Hochtemperatur-Modelle erreichen Vorlauftemperaturen bis 70°C — auch bestehende Heizkoerper funktionieren damit. Eine professionelle Heizlastberechnung zeigt, welche Waermepumpe die richtige ist. Oft ist kein Heizsystem-Umbau noetig.',
  },
  {
    category: 'einbau',
    question: 'Brauche ich eine Baugenehmigung fuer eine Waermepumpe?',
    answer: 'Fuer Luft-Waermepumpen ist in den meisten Bundeslaendern keine Baugenehmigung erforderlich. Fuer Erdwaermebohrungen braucht man eine wasserrechtliche Bewilligung. Ihr iDM Fachpartner kennt die lokalen Vorschriften und hilft bei den Behoerdengaengen.',
  },
  {
    category: 'einbau',
    question: 'Wie lange dauert die Installation?',
    answer: 'Eine Luft-Waermepumpe ist in 1-2 Tagen installiert. Bei Erdwaermepumpen kommen die Bohrarbeiten hinzu (1-3 Tage je nach Anzahl der Bohrungen). Inklusive Inbetriebnahme und Einweisung rechnen Sie mit einer Woche Gesamtdauer.',
  },
]

/* ─── Single FAQ Accordion Item ────────────────────────────── */
function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className={`border transition-all duration-300 ${isOpen ? 'border-idm/30 bg-idm/[0.01]' : 'border-n-100 bg-white hover:border-n-200'}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 p-5 lg:p-6 text-left"
      >
        <h3 className={`text-sm lg:text-base font-semibold leading-snug transition-colors ${isOpen ? 'text-n-950' : 'text-n-800'}`}>
          {faq.question}
        </h3>
        <ChevronDown
          className={`w-4 h-4 shrink-0 mt-0.5 text-n-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-idm' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 lg:px-6 pb-5 lg:pb-6 border-t border-n-100 pt-4">
              <p className="text-sm text-n-600 leading-relaxed">{faq.answer}</p>

              {/* Feedback */}
              <div className="mt-5 pt-4 border-t border-n-50 flex items-center gap-4">
                <span className="text-[11px] text-n-400 font-mono">War das hilfreich?</span>
                <button className="flex items-center gap-1.5 text-[11px] text-n-500 hover:text-green-600 transition-colors font-mono">
                  <ThumbsUp className="w-3 h-3" /> Ja
                </button>
                <button className="flex items-center gap-1.5 text-[11px] text-n-500 hover:text-red-500 transition-colors font-mono">
                  <ThumbsDown className="w-3 h-3" /> Nein
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Main Page ────────────────────────────────────────────── */
export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [openIndex, setOpenIndex] = useState(null)

  const filtered = useMemo(() => {
    return faqs.filter((f) => {
      const matchCategory = activeCategory === 'all' || f.category === activeCategory
      const matchSearch =
        !searchQuery.trim() ||
        f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.answer.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCategory && matchSearch
    })
  }, [searchQuery, activeCategory])

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
              <MessageCircle className="w-5 h-5 text-idm" />
              <span className="text-[11px] font-mono text-idm uppercase tracking-[0.2em]">Service</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em] leading-[1.05]">
              Haeufige Fragen.{'\n'}
              <span className="text-gradient-idm">Schnelle Antworten.</span>
            </h1>

            <p className="mt-5 text-n-400 text-sm md:text-base leading-relaxed max-w-lg">
              Alles, was Sie ueber Waermepumpen wissen muessen — von der Funktionsweise ueber
              Foerderungen bis zur Wartung. Klar und verstaendlich erklaert.
            </p>

            {/* Search in hero */}
            <div className="mt-8 relative max-w-lg">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-n-500" />
              <input
                type="text"
                placeholder="Frage eingeben..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white/[0.06] border border-white/10 text-sm text-white placeholder:text-n-500 font-mono tracking-wide focus:outline-none focus:border-idm focus:ring-1 focus:ring-idm/20 transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Category Navigation ────────────────────────── */}
      <section className="sticky top-16 lg:top-[72px] z-30 bg-white border-b border-n-100 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex gap-1 py-3 overflow-x-auto scrollbar-hide">
            {faqCategories.map((cat) => {
              const Icon = cat.icon
              return (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.id); setOpenIndex(null) }}
                  className={`shrink-0 flex items-center gap-2 px-4 py-2.5 text-[11px] font-mono font-semibold uppercase tracking-wider transition-all ${
                    activeCategory === cat.id
                      ? 'bg-n-900 text-white'
                      : 'bg-n-50 text-n-500 hover:bg-n-100 hover:text-n-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cat.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ List ───────────────────────────────────── */}
      <section className="py-12 lg:py-20 bg-white min-h-[60vh]">
        <div className="max-w-[900px] mx-auto px-6 lg:px-10">
          {/* Results count */}
          <div className="mb-6">
            <span className="text-[11px] font-mono text-n-400 uppercase tracking-wider">
              {filtered.length} {filtered.length === 1 ? 'Frage' : 'Fragen'}
              {activeCategory !== 'all' && ` in ${faqCategories.find(c => c.id === activeCategory)?.label}`}
            </span>
          </div>

          {/* Accordion */}
          <div className="space-y-2">
            {filtered.map((faq, i) => (
              <FAQItem
                key={faq.question}
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <Search className="w-8 h-8 text-n-300 mx-auto mb-3" />
              <p className="text-sm text-n-500">Keine passende Frage gefunden.</p>
              <p className="text-[12px] text-n-400 mt-1">Versuchen Sie andere Suchbegriffe oder kontaktieren Sie unseren Support.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Still have questions CTA ───────────────────── */}
      <section className="py-20 lg:py-28 bg-n-50">
        <div className="max-w-[900px] mx-auto px-6 lg:px-10 text-center">
          <AnimateIn variant="fadeUp">
            <div className="w-14 h-14 bg-idm flex items-center justify-center mx-auto mb-6">
              <Phone className="w-6 h-6 text-n-900" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-n-900 tracking-[-0.02em] mb-3">
              Frage nicht gefunden?
            </h2>
            <p className="text-sm text-n-500 max-w-md mx-auto leading-relaxed mb-8">
              Unser Experten-Team beantwortet Ihre Fragen gerne persoenlich — per Telefon, E-Mail oder ueber Ihren Fachpartner.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/service/after-sales"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-idm hover:bg-idm-dark text-n-900 font-semibold text-sm transition-all"
              >
                Zum Support
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://konfigurator.myidm.at/#/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-n-200 hover:border-n-900 text-n-900 font-semibold text-sm transition-all"
              >
                Waermepumpe konfigurieren
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>
    </div>
  )
}
