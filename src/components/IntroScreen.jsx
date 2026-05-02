import { memo } from 'react'
import { motion } from 'framer-motion'

const IntroScreen = memo(function IntroScreen({ onStart }) {
  return (
    <motion.section
      className="relative flex min-h-0 flex-1 items-center justify-center px-6 py-12"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-28 right-[-10%] h-72 w-72 rounded-full bg-rose/15 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-8%] h-80 w-80 rounded-full bg-blush/10 blur-3xl" />
      </div>
        <div className="glass-card relative overflow-hidden px-7 py-10 md:px-12 md:py-12">
          <div className="absolute -right-10 top-8 h-28 w-28 rounded-full border border-white/20 bg-white/5 blur-2xl" />
          <span className="tag-chip">Bloom for you</span>
          <h1 className="mt-6 text-4xl font-semibold text-cream md:text-5xl">
            Craft a bouquet that feels like a whispered love letter.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/80">
            Answer eight dreamy prompts and watch your bouquet bloom in real time,
            layered with florals, glow, and a personal tag message.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button type="button" className="btn-primary" onClick={onStart}>
              Start the bouquet
            </button>
          </div>
        </div>
    </motion.section>
  )
})

export default IntroScreen
