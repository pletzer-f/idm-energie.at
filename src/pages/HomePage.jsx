import Hero from '../components/sections/Hero'
import VisionBanner from '../components/sections/VisionBanner'
import ProductGrid from '../components/sections/ProductGrid'
import ConfiguratorTeaser from '../components/sections/ConfiguratorTeaser'
import UseCases from '../components/sections/UseCases'
import WhyIdm from '../components/sections/WhyIdm'
import VideoSection from '../components/sections/VideoSection'
import PartnerFinder from '../components/sections/PartnerFinder'
import NewsTeaser from '../components/sections/NewsTeaser'

export default function HomePage() {
  return (
    <>
      <Hero />
      <VisionBanner />
      <ProductGrid />
      <ConfiguratorTeaser />
      <UseCases />
      <WhyIdm />
      <VideoSection />
      <PartnerFinder />
      <NewsTeaser />
    </>
  )
}
