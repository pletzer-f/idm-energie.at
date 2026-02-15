import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Wind, Mountain, Box, Building2 } from 'lucide-react'
import AnimateIn from '../animations/AnimateIn'

const products = [
  {
    id: 'aero',
    name: 'AERO',
    tagline: 'Luft-Waermepumpen',
    spec: '2 – 50 kW',
    icon: Wind,
    image: '/images/luftwaermepumpe.jpg',
    transparent: true,
    href: '/produkte/luft-waermepumpen',
    features: ['R290', 'Modulierend', 'bis 70 \u00b0C'],
  },
  {
    id: 'terra',
    name: 'TERRA',
    tagline: 'Erdwaermepumpen',
    spec: '3 – 140 kW',
    icon: Mountain,
    image: '/images/erdwaermepumpe.png',
    transparent: true,
    href: '/produkte/erdwaermepumpen',
    features: ['SCOP 5+', 'Passive Kuehlung', 'Twin'],
  },
  {
    id: 'ipump',
    name: 'iPUMP',
    tagline: 'Kompakt & komplett',
    spec: '2 – 12 kW',
    icon: Box,
    image: '/images/ipump-pair.jpeg',
    href: '/produkte/ipump',
    features: ['All-in-One', '0.45 m\u00b2', 'Warmwasser'],
  },
  {
    id: 'max',
    name: 'MAX',
    tagline: 'Gross-Waermepumpen',
    spec: 'bis 1.500 kW',
    icon: Building2,
    image: '/images/aero-outdoor-units.jpg',
    href: '/produkte/grosswaermepumpen',
    features: ['Kaskade', 'BACnet', '24/7'],
  },
]

function ProductCard({ product, index }) {
  const Icon = product.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={product.href}
        className="group relative block overflow-hidden h-full"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-n-100">
          <img
                loading="lazy"
                decoding="async"
                src={product.image}
            alt={product.name}
            className={`w-full h-full ${product.transparent ? 'object-contain p-5' : 'object-cover'} group-hover:scale-105 transition-transform duration-700 ease-out`}
          />
          {/* Gitter overlay */}
          {!product.transparent && <div className="absolute inset-0 bg-gitter opacity-30 mix-blend-overlay" />}
          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-n-950/80 via-n-950/30 to-transparent" />

          {/* Top: spec badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <div className="w-6 h-6 bg-n-950/80 flex items-center justify-center">
              <Icon className="w-3 h-3 text-idm" />
            </div>
            <span className="text-[9px] font-mono text-white/80 tracking-[0.12em] px-2 py-0.5 bg-n-950/70 uppercase">
              {product.spec}
            </span>
          </div>

          {/* Bottom: product name + tagline */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-1 h-1 bg-idm" />
              <span className="text-[9px] font-mono text-n-400 uppercase tracking-[0.15em]">
                {product.tagline}
              </span>
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-white tracking-[-0.02em] group-hover:text-idm transition-colors duration-300">
              {product.name}
            </h3>
          </div>

          {/* Corner accent on hover */}
          <div className="absolute top-0 right-0 w-0 h-0 group-hover:w-12 group-hover:h-12 transition-all duration-500 pointer-events-none overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-[2px] bg-idm" />
            <div className="absolute top-0 right-0 h-12 w-[2px] bg-idm" />
          </div>
        </div>

        {/* Bottom: features + CTA */}
        <div className="p-4 bg-white border border-t-0 border-n-100 group-hover:border-idm/20 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              {product.features.map((feat) => (
                <span
                  key={feat}
                  className="text-[9px] font-mono text-n-400 px-2 py-0.5 border border-n-100 tracking-wider"
                >
                  {feat}
                </span>
              ))}
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-n-300 group-hover:text-idm group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function ProductGrid() {
  const sectionRef = useRef(null)

  return (
    <section ref={sectionRef} className="pt-12 pb-16 lg:pt-20 lg:pb-24 bg-white relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid-fine opacity-[0.02] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
          <AnimateIn variant="fadeUp">
            <span className="text-[11px] font-mono font-semibold text-n-400 uppercase tracking-[0.2em]">
              Produkte
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-n-900 tracking-[-0.03em]">
              Unsere Waermepumpen.
            </h2>
          </AnimateIn>

          <AnimateIn variant="fadeUp" delay={0.1}>
            <Link
              to="/produkte"
              className="group inline-flex items-center gap-2.5 px-5 py-2.5 border border-n-200 hover:border-n-900 hover:bg-n-900 text-sm font-semibold text-n-600 hover:text-white transition-all duration-300"
            >
              Alle Produkte
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimateIn>
        </div>

        {/* 4-column product grid — all visible at once */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* Bottom links */}
        <div className="mt-8 pt-6 border-t border-n-100 flex flex-wrap gap-6 justify-center">
          {[
            { name: 'NAVIGATOR Steuerung', href: '/produkte/navigator' },
            { name: 'HYGIENIK Speicher', href: '/produkte/speicher' },
            { name: 'myiDM App', href: '/produkte/navigator' },
          ].map((extra) => (
            <Link
              key={extra.name}
              to={extra.href}
              className="group inline-flex items-center gap-2 text-[11px] font-mono font-semibold text-n-400 hover:text-n-900 tracking-wider transition-colors"
            >
              {extra.name}
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
