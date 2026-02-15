import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Phone, Mail, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react'
import Logo from '../ui/Logo'

const footerLinks = {
  produkte: {
    title: 'Produkte',
    links: [
      { label: 'AERO Luft-Waermepumpen', href: '/produkte/luft-waermepumpen' },
      { label: 'TERRA Erdwaermepumpen', href: '/produkte/erdwaermepumpen' },
      { label: 'iPUMP Kompaktsysteme', href: '/produkte/ipump' },
      { label: 'MAX Gross-Waermepumpen', href: '/produkte/grosswaermepumpen' },
      { label: 'NAVIGATOR Steuerung', href: '/produkte/navigator' },
      { label: 'HYGIENIK Speicher', href: '/produkte/speicher' },
    ],
  },
  service: {
    title: 'Service',
    links: [
      { label: 'After Sales', href: '/service/after-sales' },
      { label: 'Downloads', href: '/service/downloads' },
      { label: 'FAQ', href: '/service/faq' },
      { label: 'Schulungen', href: '/service/schulungen' },
      { label: 'Garantie', href: '/service/garantie' },
    ],
  },
  unternehmen: {
    title: 'Unternehmen',
    links: [
      { label: 'Ueber iDM', href: '/unternehmen/ueber-uns' },
      { label: 'Karriere', href: '/unternehmen/karriere' },
      { label: 'Innovation', href: '/unternehmen/innovation' },
      { label: 'Nachhaltigkeit', href: '/unternehmen/nachhaltigkeit' },
      { label: 'Presse', href: '/unternehmen/presse' },
      { label: 'Standorte', href: '/unternehmen/standorte' },
    ],
  },
}

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/idmenergie', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com/idm_waermepumpen', label: 'Instagram' },
  { icon: Youtube, href: 'https://youtube.com/user/waermepumpenidm', label: 'YouTube' },
  { icon: Linkedin, href: 'https://linkedin.com/company/idm-energiesysteme-gmbh', label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer className="bg-n-950 text-white relative">
      {/* Top gitter accent */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-idm" />

      {/* Newsletter Bar */}
      <div className="border-b border-n-800">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-14">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold tracking-[-0.02em]">Bleiben Sie auf dem Laufenden.</h3>
              <p className="text-n-500 text-sm mt-2 font-mono tracking-wide">
                Neuigkeiten, Produkte und Veranstaltungen — direkt in Ihr Postfach.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Ihre E-Mail-Adresse"
                className="flex-1 md:w-72 px-5 py-3.5 bg-white/[0.04] border border-n-800 text-sm text-white placeholder:text-n-600 focus:outline-none focus:border-idm/50 transition-colors"
              />
              <button className="px-6 py-3.5 bg-idm hover:bg-idm-dark text-n-900 text-sm font-semibold transition-all shrink-0">
                Anmelden
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Contact Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-8">
              <Logo className="h-10 w-auto" />
            </div>

            <div className="space-y-3 text-sm text-n-500">
              <a href="https://maps.google.com" target="_blank" rel="noopener" className="flex items-start gap-2.5 hover:text-white transition-colors">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Seblas 16-18<br />A-9971 Matrei in Osttirol</span>
              </a>
              <a href="tel:+4348756172" className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Phone className="w-4 h-4 shrink-0" />
                <span className="font-mono text-xs tracking-wider">+43 (0) 4875 6172</span>
              </a>
              <a href="mailto:info@idm-energie.com" className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Mail className="w-4 h-4 shrink-0" />
                <span className="font-mono text-xs tracking-wider">info@idm-energie.com</span>
              </a>
            </div>

            {/* Social — angular */}
            <div className="flex gap-2 mt-8">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 flex items-center justify-center bg-white/[0.04] text-n-500 hover:bg-idm hover:text-n-900 transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="text-[11px] font-mono font-semibold text-n-400 uppercase tracking-[0.2em] mb-5">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-n-500 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-n-800">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-n-600 font-mono tracking-wider">
              &copy; {new Date().getFullYear()} iDM ENERGIESYSTEME GMBH — INTELLIGENTE WAERMEPUMPEN AUS OESTERREICH
            </p>
            <div className="flex items-center gap-6 text-[11px] font-mono text-n-600 tracking-wider">
              <Link to="/impressum" className="hover:text-white transition-colors">IMPRESSUM</Link>
              <Link to="/datenschutz" className="hover:text-white transition-colors">DATENSCHUTZ</Link>
              <button className="hover:text-white transition-colors cursor-pointer">COOKIES</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
