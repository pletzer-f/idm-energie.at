import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, X } from 'lucide-react'
import AnimateIn from '../animations/AnimateIn'

const videos = [
  {
    id: 'main',
    title: 'iDM Imagefilm — Intelligente Waermepumpen aus Tirol',
    subtitle: 'Produziert von ATTIC Film / studio 20four',
    tag: 'Imagefilm',
    youtubeId: 'dQw4w9WgXcQ', // Replace with actual iDM imagefilm ID
    thumbnail: '/images/hq-building.jpg',
  },
  {
    id: 'tech',
    title: '3D-Animation: So funktioniert eine Waermepumpe',
    tag: 'Technologie',
    youtubeId: null,
    thumbnail: '/images/technician-plant-room.jpg',
  },
  {
    id: 'ion',
    title: 'iON KI-Technologie — Intelligentes Energiemanagement',
    tag: 'Innovation',
    youtubeId: null,
    thumbnail: '/images/navigator-ion-tablet.jpg',
  },
  {
    id: 'media',
    title: 'iDM im ORF — Waermepumpen aus Osttirol',
    tag: 'Medien',
    youtubeId: null,
    thumbnail: '/images/factory-aerial.jpg',
  },
]

export default function VideoSection() {
  const [playingId, setPlayingId] = useState(null)

  return (
    <section className="py-28 lg:py-40 bg-white relative">
      {/* Gitter accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gitter-strong" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <AnimateIn variant="fadeUp" className="mb-16">
          <span className="text-[11px] font-mono font-semibold text-n-400 uppercase tracking-[0.2em]">
            Einblicke
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-bold text-n-900 tracking-[-0.03em]">
            Erleben Sie iDM.
          </h2>
          <p className="mt-4 text-n-500 text-base md:text-lg leading-relaxed max-w-lg">
            Ein Blick hinter die Kulissen — wo Pioniergeist und Praezision Hand in Hand gehen.
          </p>
        </AnimateIn>

        {/* Main video — large */}
        <AnimateIn variant="fadeUp" delay={0.1}>
          <div className="relative aspect-video overflow-hidden bg-n-950 mb-2">
            {playingId !== 'main' ? (
              <>
                {/* Thumbnail */}
                <img
                loading="lazy"
                decoding="async"
                src={videos[0].thumbnail}
                  alt={videos[0].title}
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gitter opacity-40 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-n-950 via-n-950/30 to-transparent" />

                {/* Play button */}
                <button
                  onClick={() => setPlayingId('main')}
                  className="absolute inset-0 flex items-center justify-center group cursor-pointer z-10"
                >
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-20 h-20 lg:w-24 lg:h-24 bg-idm flex items-center justify-center"
                  >
                    <Play className="w-8 h-8 lg:w-10 lg:h-10 text-n-900 ml-1" fill="currentColor" />
                  </motion.div>
                </button>

                {/* Info bar */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10 z-10">
                  <span className="text-[11px] font-mono text-idm uppercase tracking-[0.2em]">
                    {videos[0].tag}
                  </span>
                  <p className="text-white font-bold text-lg lg:text-xl mt-2">{videos[0].title}</p>
                  <p className="text-n-500 text-sm mt-1 font-mono">{videos[0].subtitle}</p>
                </div>
              </>
            ) : (
              <div className="relative w-full h-full">
                <iframe
                  src={`https://www.youtube.com/embed/${videos[0].youtubeId}?autoplay=1&rel=0`}
                  title={videos[0].title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <button
                  onClick={() => setPlayingId(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-n-900/80 flex items-center justify-center text-white hover:bg-n-900 transition-colors z-20 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </AnimateIn>

        {/* Secondary videos grid */}
        <div className="grid sm:grid-cols-3 gap-2">
          {videos.slice(1).map((video, i) => (
            <AnimateIn key={video.id} variant="fadeUp" delay={0.15 + i * 0.08}>
              <div className="group cursor-pointer relative overflow-hidden bg-n-50 hover:bg-n-100/80 transition-all duration-500">
                <div className="aspect-video relative overflow-hidden">
                  <img
                loading="lazy"
                decoding="async"
                src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gitter opacity-30 mix-blend-overlay" />
                  <div className="absolute inset-0 bg-gradient-to-t from-n-950/60 to-transparent" />

                  {/* Play icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-idm/90 flex items-center justify-center group-hover:bg-idm group-hover:scale-110 transition-all duration-300">
                      <Play className="w-5 h-5 text-n-900 ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <span className="text-[11px] font-mono text-n-400 uppercase tracking-[0.2em]">
                    {video.tag}
                  </span>
                  <h4 className="text-sm font-semibold text-n-900 mt-2 group-hover:text-idm-dark transition-colors line-clamp-2">
                    {video.title}
                  </h4>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[3px] bg-idm transition-all duration-700" />
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
