import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import questions from '../data/questions'
import ProgressBar from './ProgressBar'

const QuizScreen = memo(function QuizScreen({ answers, currentIndex, onAnswer }) {
  const question = questions[currentIndex]
  const total = questions.length
  const [messageDraft, setMessageDraft] = useState('')
  const audioRef = useRef(null)

  useEffect(() => {
    if (question?.type === 'text') {
      setMessageDraft(answers[currentIndex] ?? '')
    }
  }, [question?.type, currentIndex, answers])

  const playChime = useCallback(() => {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return
    let context = audioRef.current
    if (!context) {
      context = new AudioContext()
      audioRef.current = context
    }
    if (context.state === 'suspended') {
      context.resume()
    }

    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.type = 'sine'
    oscillator.frequency.value = 660
    gain.gain.value = 0

    oscillator.connect(gain)
    gain.connect(context.destination)

    const now = context.currentTime
    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(0.06, now + 0.03)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45)

    oscillator.start(now)
    oscillator.stop(now + 0.5)
  }, [])

  const handleSelect = useCallback(
    (value) => {
      playChime()
      onAnswer(currentIndex, value)
    },
    [currentIndex, onAnswer, playChime],
  )

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()
      const trimmed = messageDraft.trim().slice(0, question?.maxLength || 60)
      if (!trimmed) return
      playChime()
      onAnswer(currentIndex, trimmed)
    },
    [currentIndex, messageDraft, onAnswer, playChime, question?.maxLength],
  )

  const selectedValue = answers[currentIndex]
  const progress = useMemo(() => currentIndex / total, [currentIndex, total])

  if (!question) {
    return null
  }

  return (
    <section className="flex min-h-0 flex-1 items-center justify-center px-6 py-12">
      <div className="w-full max-w-3xl space-y-6">
        <ProgressBar value={progress} />
        <div className="glass-card px-6 py-8 md:px-10 md:py-10">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.35em] text-cream/60">
            <span>Question {currentIndex + 1} of {total}</span>
            <span className="tag-chip">Blooming now</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={question.id}
              className="mt-6 space-y-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <h2 className="text-2xl text-cream md:text-3xl">
                {question.question}
              </h2>

              {question.type === 'text' ? (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    className="input-field"
                    placeholder={question.placeholder}
                    maxLength={question.maxLength}
                    value={messageDraft}
                    onChange={(event) => setMessageDraft(event.target.value)}
                  />
                  <div className="flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.3em] text-cream/50">
                    <span>{messageDraft.length}/{question.maxLength}</span>
                    <button type="submit" className="btn-primary">
                      Bloom it
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {question.options.map((option) => (
                    <button
                      type="button"
                      key={option.value}
                      className={`option-tile ${
                        selectedValue === option.value ? 'option-selected' : ''
                      }`}
                      onClick={() => handleSelect(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
})

export default QuizScreen
