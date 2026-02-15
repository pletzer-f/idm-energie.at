import { useLocation, Link } from 'react-router-dom'
import { ArrowLeft, Construction } from 'lucide-react'
import AnimateIn from '../components/animations/AnimateIn'

export default function PlaceholderPage() {
  const location = useLocation()
  const path = location.pathname

  // Generate a readable title from the path
  const segments = path.split('/').filter(Boolean)
  const title = segments
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, ' '))
    .join(' — ')

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-n-50">
      <AnimateIn variant="fadeUp" className="text-center px-4 max-w-lg">
        <div className="w-16 h-16 bg-idm/10 flex items-center justify-center mx-auto mb-6">
          <Construction className="w-8 h-8 text-idm" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-n-900 mb-3 tracking-[-0.02em]">
          {title || 'Seite'}
        </h1>
        <p className="text-n-500 mb-8">
          Diese Seite wird gerade gestaltet. Bitte besuchen Sie uns bald wieder.
        </p>
        <div className="text-sm text-n-400 mb-8 font-mono bg-white px-4 py-2 border border-n-200 inline-block tracking-wider">
          {path}
        </div>
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-idm hover:bg-idm-dark text-n-900 font-semibold transition-all text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Zur Startseite
          </Link>
        </div>
      </AnimateIn>
    </div>
  )
}
