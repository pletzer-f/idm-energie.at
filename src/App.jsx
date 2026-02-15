import { Routes, Route, useLocation } from 'react-router-dom'
import { Suspense, lazy, useEffect, useState } from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import RouteLoader from './components/ui/RouteLoader'

const HomePage = lazy(() => import('./pages/HomePage'))
const ProductPage = lazy(() => import('./pages/ProductPage'))
const SolutionPage = lazy(() => import('./pages/SolutionPage'))
const ProductsOverviewPage = lazy(() => import('./pages/ProductsOverviewPage'))
const SolutionsOverviewPage = lazy(() => import('./pages/SolutionsOverviewPage'))
const PartnerFinderPage = lazy(() => import('./pages/PartnerFinderPage'))
const AfterSalesPage = lazy(() => import('./pages/AfterSalesPage'))
const DownloadsPage = lazy(() => import('./pages/DownloadsPage'))
const FAQPage = lazy(() => import('./pages/FAQPage'))
const SchulungenPage = lazy(() => import('./pages/SchulungenPage'))
const UeberUnsPage = lazy(() => import('./pages/UeberUnsPage'))
const KarrierePage = lazy(() => import('./pages/KarrierePage'))
const InnovationPage = lazy(() => import('./pages/InnovationPage'))
const NachhaltigkeitPage = lazy(() => import('./pages/NachhaltigkeitPage'))
const PlaceholderPage = lazy(() => import('./pages/PlaceholderPage'))

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function isReloadNavigation() {
  if (typeof performance === 'undefined') return false

  const navEntries = performance.getEntriesByType?.('navigation')
  if (navEntries && navEntries.length > 0 && navEntries[0]?.type) {
    return navEntries[0].type === 'reload'
  }

  if (performance.navigation) {
    return performance.navigation.type === 1
  }

  return false
}

function App() {
  const [showReloadLoader, setShowReloadLoader] = useState(false)

  useEffect(() => {
    if (!isReloadNavigation()) return

    setShowReloadLoader(true)
    const timer = setTimeout(() => setShowReloadLoader(false), 2800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <RouteLoader active={showReloadLoader} />
      <Header />
      <main className="flex-1">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/produkte" element={<ProductsOverviewPage />} />
            <Route path="/produkte/:slug" element={<ProductPage />} />
            <Route path="/loesungen" element={<SolutionsOverviewPage />} />
            <Route path="/loesungen/:slug" element={<SolutionPage />} />
            <Route path="/tools/partnerfinder" element={<PartnerFinderPage />} />
            {/* Service pages */}
            <Route path="/service/after-sales" element={<AfterSalesPage />} />
            <Route path="/service/downloads" element={<DownloadsPage />} />
            <Route path="/service/faq" element={<FAQPage />} />
            <Route path="/service/schulungen" element={<SchulungenPage />} />
            {/* Unternehmen pages */}
            <Route path="/unternehmen/ueber-uns" element={<UeberUnsPage />} />
            <Route path="/unternehmen/karriere" element={<KarrierePage />} />
            <Route path="/unternehmen/innovation" element={<InnovationPage />} />
            <Route path="/unternehmen/nachhaltigkeit" element={<NachhaltigkeitPage />} />
            {/* All other routes show placeholder */}
            <Route path="*" element={<PlaceholderPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App
