import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ArrowRight, Calendar, ArrowUpRight } from 'lucide-react'

const articles = [
  {
    tag: 'Produkt',
    title: 'Neue iPUMP A ONE — Kompakt, effizient, mit R290',
    excerpt: 'Unsere neueste Kompakt-Waermepumpe setzt neue Massstaebe in Sachen Effizienz und Nachhaltigkeit.',
    date: '12. Feb 2026',
    href: '/aktuelles/news/ipump-a-one',
    image: '/images/ipump-pair.jpeg',
  },
  {
    tag: 'Innovation',
    title: 'iON KI-Technologie: Vorausschauend heizen',
    excerpt: 'Wie kuenstliche Intelligenz Ihre Heizkosten senkt und den Komfort steigert — automatisch.',
    date: '5. Feb 2026',
    href: '/aktuelles/news/ion-ki-technologie',
    image: '/images/ion-touchscreen.png',
  },
  {
    tag: 'Unternehmen',
    title: 'iDM AR App — Waermepumpen in Augmented Reality',
    excerpt: 'Erleben Sie unsere Produkte in Ihrem Zuhause — mit der kostenlosen iDM AR App.',
    date: '28. Jan 2026',
    href: '/aktuelles/news/idm-ar-app',
    image: '/images/booth-modern.jpeg',
  },
]

function FeaturedCard({ article }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <Link
        to={article.href}
        className="group relative block overflow-hidden bg-n-950 h-full"
      >
        {/* Full-bleed image — fills entire card height to align with right column */}
        <div className="relative aspect-[16/9] lg:aspect-auto lg:h-full overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-1000 ease-out"
          />
          {/* Gitter overlay */}
          <div className="absolute inset-0 bg-gitter opacity-40 mix-blend-overlay" />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-n-950 via-n-950/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-n-950 via-transparent to-transparent" />

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12">
            <div className="max-w-2xl">
              {/* Tag + Date row */}
              <div className="flex items-center gap-4 mb-4">
                <span className="inline-flex items-center px-3 py-1 bg-idm text-n-900 text-[11px] font-mono font-bold uppercase tracking-[0.15em]">
                  {article.tag}
                </span>
                <span className="text-[12px] text-n-400 flex items-center gap-1.5 font-mono">
                  <Calendar className="w-3 h-3" />
                  {article.date}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight tracking-[-0.02em] group-hover:text-idm transition-colors duration-500">
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className="mt-3 text-base text-n-400 leading-relaxed max-w-lg">
                {article.excerpt}
              </p>

              {/* CTA */}
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-idm">
                <span>Artikel lesen</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </div>
          </div>

          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-20 h-20">
            <svg viewBox="0 0 80 80" className="w-full h-full">
              <path d="M80 0L80 80L0 0Z" fill="rgba(251,240,100,0.08)" />
            </svg>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="h-[3px] bg-n-800 relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-0 group-hover:w-full bg-idm transition-all duration-700" />
        </div>
      </Link>
    </motion.div>
  )
}

function SmallCard({ article, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={article.href}
        className="group relative flex gap-5 p-5 bg-n-50 hover:bg-n-100/80 transition-all duration-500 overflow-hidden"
      >
        {/* Thumbnail */}
        <div className="shrink-0 w-28 h-28 relative overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gitter opacity-20 mix-blend-overlay" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] font-mono font-bold text-idm-dark uppercase tracking-[0.15em]">
              {article.tag}
            </span>
            <span className="text-[10px] text-n-400 font-mono">
              {article.date}
            </span>
          </div>

          <h3 className="text-sm font-bold text-n-900 group-hover:text-n-700 transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h3>

          <p className="mt-1.5 text-[12px] text-n-500 line-clamp-1 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* Arrow indicator */}
        <div className="shrink-0 flex items-center">
          <div className="w-8 h-8 flex items-center justify-center bg-n-100 group-hover:bg-idm transition-colors duration-300">
            <ArrowUpRight className="w-3.5 h-3.5 text-n-400 group-hover:text-n-900 transition-colors duration-300" />
          </div>
        </div>

        {/* Left accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-transparent group-hover:bg-idm transition-colors duration-300" />
      </Link>
    </motion.div>
  )
}

export default function NewsTeaser() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const lineWidth = useTransform(scrollYProgress, [0.1, 0.5], ['0%', '100%'])

  const featured = articles[0]
  const rest = articles.slice(1)

  return (
    <section ref={sectionRef} className="py-28 lg:py-40 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-fine opacity-[0.03] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[11px] font-mono font-semibold text-n-400 uppercase tracking-[0.2em]">
              Aktuelles
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-bold text-n-900 tracking-[-0.03em]">
              Neues von iDM.
            </h2>

            {/* Animated underline */}
            <motion.div className="mt-4 h-[2px] bg-n-100 relative overflow-hidden w-32">
              <motion.div
                className="absolute inset-y-0 left-0 bg-idm"
                style={{ width: lineWidth }}
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              to="/aktuelles"
              className="group inline-flex items-center gap-2.5 px-5 py-2.5 border border-n-200 hover:border-n-900 hover:bg-n-900 text-sm font-semibold text-n-600 hover:text-white transition-all duration-300"
            >
              Alle Beitraege
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Layout: Featured + side list */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-3">
          {/* Featured article — large card */}
          <FeaturedCard article={featured} />

          {/* Side articles — stacked compact cards */}
          <div className="flex flex-col gap-3">
            {rest.map((article, i) => (
              <SmallCard key={article.title} article={article} index={i} />
            ))}

            {/* Newsletter / All articles teaser */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex-1 flex items-center justify-center p-6 bg-n-950 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gitter-dark opacity-30 pointer-events-none" />
              <div className="relative text-center">
                <div className="text-[10px] font-mono text-n-500 uppercase tracking-[0.2em] mb-2">
                  Immer informiert
                </div>
                <div className="text-sm font-semibold text-white mb-4">
                  Alle Neuigkeiten entdecken
                </div>
                <Link
                  to="/aktuelles"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-idm hover:bg-idm-dark text-n-900 text-[12px] font-semibold tracking-wide transition-all hover:shadow-lg hover:shadow-idm/20"
                >
                  Zum Newsroom
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
