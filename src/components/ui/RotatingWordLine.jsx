import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function RotatingWordLine({
  words,
  interval = 2200,
  widthClass = 'w-[12ch]',
  className = '',
  wordClass = '',
  suffix = '',
  suffixClass = '',
  showLeadLine = true,
}) {
  const [index, setIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef(null)

  // Only run the interval when the component is visible on screen
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible || !words?.length) return undefined
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, interval)
    return () => clearInterval(timer)
  }, [interval, words, isVisible])

  if (!words?.length) return null

  return (
    <div ref={containerRef} className={`flex items-center gap-3 min-h-8 ${className}`}>
      {showLeadLine && <div className="w-8 h-[2px] bg-idm" />}
      <span className={`relative inline-flex items-center overflow-hidden ${widthClass} h-8`}>
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.22 }}
            className={`absolute left-0 inset-y-0 flex items-center whitespace-nowrap ${wordClass}`}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
      {suffix && <span className={suffixClass}>{suffix}</span>}
    </div>
  )
}
