import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react'
import { navigation, ctaButtons } from '../../data/navigation'
import Logo, { LogoFull } from '../ui/Logo'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveMenu(null)
  }, [location])

  const isHero = !scrolled

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass border-b border-n-200/50' : 'bg-transparent'
      }`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            <Link to="/" className="relative z-10">
              <LogoFull />
            </Link>

            <nav className="hidden lg:flex items-center gap-0.5">
              {navigation.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveMenu(item.label)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Link
                    to={item.href}
                    className={`relative flex items-center gap-1 px-4 py-2 text-[13px] font-medium tracking-wide uppercase transition-colors ${
                      isHero ? 'text-white/70 hover:text-white' : 'text-n-500 hover:text-n-900'
                    } ${location.pathname.startsWith(item.href) ? (isHero ? 'text-white' : 'text-n-900') : ''}`}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeMenu === item.label ? 'rotate-180' : ''}`} />
                    )}
                  </Link>

                  <AnimatePresence>
                    {item.children && activeMenu === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px] bg-white border border-n-100 shadow-2xl shadow-n-900/5 overflow-hidden"
                      >
                        <div className="h-[2px] bg-idm w-full" />
                        <div className="p-4">
                          {item.children.map((group) => (
                            <div key={group.group} className="mb-3 last:mb-0">
                              <div className="text-[10px] font-semibold text-n-400 uppercase tracking-[0.15em] mb-1.5 px-3">{group.group}</div>
                              {group.items.map((sub) => (
                                <Link
                                  key={sub.href}
                                  to={sub.href}
                                  className="group flex items-center justify-between px-3 py-2.5 hover:bg-n-50 transition-colors"
                                >
                                  <div>
                                    <div className="text-sm font-medium text-n-900 group-hover:text-n-700">{sub.label}</div>
                                    <div className="text-[11px] text-n-400 mt-0.5">{sub.desc}</div>
                                  </div>
                                  <ArrowRight className="w-3.5 h-3.5 text-n-300 group-hover:text-n-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="https://konfigurator.myidm.at/#/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex items-center gap-2 px-5 py-2 bg-idm hover:bg-idm-dark text-n-900 text-[13px] font-semibold tracking-wide transition-all hover:shadow-lg hover:shadow-idm/20"
              >
                Konfigurieren
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`lg:hidden p-2 ${isHero ? 'text-white' : 'text-n-700'}`}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-n-950 lg:hidden"
          >
            <div className="pt-20 px-6 pb-8 h-full overflow-y-auto">
              <nav className="space-y-1">
                {navigation.map((item, i) => (
                  <motion.div key={item.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                    <Link to={item.href} className="block py-4 text-2xl font-medium text-white border-b border-white/5 hover:text-idm transition-colors">
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-8">
                <a href="https://konfigurator.myidm.at/#/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3.5 bg-idm text-n-900 font-semibold text-sm">
                  {ctaButtons.primary.label} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
