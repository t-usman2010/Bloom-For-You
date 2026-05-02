import { memo, useEffect, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import BouquetSvg from './BouquetSvg'
import ProgressBar from './ProgressBar'
import questions from '../data/questions'

const RevealScreen = memo(function RevealScreen({ answers, onRestart }) {
  const svgRef = useRef(null)

  useEffect(() => {
    confetti({
      particleCount: 140,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#f7cbd1', '#e6b9a9', '#f9f4ef', '#7d3149'],
      scalar: 0.9,
    })
  }, [])

  const message = answers[7] || 'Always for you.'

  const answerChips = useMemo(() => {
    const indices = [0, 1, 2, 4, 6]
    return indices
      .map((index) => {
        const question = questions[index]
        if (!question?.options) return null
        const match = question.options.find(
          (option) => option.value === answers[index],
        )
        return match?.label
      })
      .filter(Boolean)
  }, [answers])

  const handleDownload = () => {
    const svg = svgRef.current
    if (!svg) return
    const serializer = new XMLSerializer()
    const source = serializer.serializeToString(svg)
    const blob = new Blob([source], {
      type: 'image/svg+xml;charset=utf-8',
    })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'bloom-for-you.svg'
    link.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <motion.section
      className="flex min-h-0 flex-1 items-center justify-center px-6 py-12"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex flex-col justify-between gap-6">
          <div className="glass-card px-7 py-8 md:px-10 md:py-10">
            <span className="tag-chip">Your bouquet is ready</span>
            <h2 className="mt-5 text-3xl text-cream md:text-4xl">
              Bloom for You
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cream/70">
              A bouquet sculpted from your answers, wrapped in soft light and
              finished with a personal tag.
            </p>
            <div className="mt-6 space-y-4">
              <div className="glass-panel px-5 py-4 text-sm text-cream/80">
                <p className="font-semibold text-cream/90">Bouquet tag</p>
                <p className="mt-2 text-base italic text-cream">
                  &quot;{message}&quot;
                </p>
              </div>
              <div className="space-y-3">
                <ProgressBar value={1} />
                <div className="flex flex-wrap gap-2">
                  {answerChips.map((chip) => (
                    <span key={chip} className="tag-chip">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <button type="button" className="btn-primary" onClick={handleDownload}>
              Download bouquet
            </button>
            <button type="button" className="btn-secondary" onClick={onRestart}>
              Make another
            </button>
          </div>
        </div>
        <div className="glass-panel canvas-frame p-3 md:p-5">
          <BouquetSvg answers={answers} message={message} svgRef={svgRef} />
        </div>
      </div>
    </motion.section>
  )
})

export default RevealScreen
