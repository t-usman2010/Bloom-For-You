import { memo, useEffect } from 'react'
import { motion } from 'framer-motion'

const LoadingScreen = memo(function LoadingScreen({ onComplete }) {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      onComplete?.()
    }, 2200)

    return () => window.clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.section
      className="flex min-h-0 flex-1 items-center justify-center px-6 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="glass-card w-full max-w-lg px-8 py-10 text-center">
        <div className="loading-bloom" />
        <h2 className="text-2xl text-cream">Growing your bouquet...</h2>
        <p className="mt-3 text-sm leading-relaxed text-cream/70">
          We are layering petals, tying ribbons, and dusting the bloom with light.
        </p>
      </div>
    </motion.section>
  )
})

export default LoadingScreen
