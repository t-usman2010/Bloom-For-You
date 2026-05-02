import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import IntroScreen from './components/IntroScreen'
import QuizScreen from './components/QuizScreen'
import LoadingScreen from './components/LoadingScreen'
import RevealScreen from './components/RevealScreen'
import PetalParticles from './components/PetalParticles'
import questions from './data/questions'
import Footer from './components/footer'
import './App.css'

const createEmptyAnswers = () => Array(questions.length).fill(null)

function App() {
  const [appState, setAppState] = useState({
    step: 'intro',
    answers: createEmptyAnswers(),
  })
  const cursorRef = useRef(null)

  const allAnswered = useMemo(
    () =>
      appState.answers.every(
        (answer) => answer !== null && `${answer}`.trim().length > 0,
      ),
    [appState.answers],
  )

  const currentIndex = useMemo(() => {
    const index = appState.answers.findIndex((answer) => answer === null)
    return index === -1 ? Math.max(appState.answers.length - 1, 0) : index
  }, [appState.answers])

  useEffect(() => {
    if (appState.step === 'quiz' && allAnswered) {
      setAppState((prev) => ({ ...prev, step: 'loading' }))
    }
  }, [appState.step, allAnswered])

  const handleStart = useCallback(() => {
    setAppState({ step: 'quiz', answers: createEmptyAnswers() })
  }, [])

  const handleAnswer = useCallback((index, value) => {
    setAppState((prev) => {
      const nextAnswers = [...prev.answers]
      nextAnswers[index] = value
      return { ...prev, answers: nextAnswers }
    })
  }, [])

  const handleLoadingDone = useCallback(() => {
    setAppState((prev) => ({ ...prev, step: 'reveal' }))
  }, [])

  const handleRestart = useCallback(() => {
    setAppState({ step: 'quiz', answers: createEmptyAnswers() })
  }, [])

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    if (isCoarse) return

    cursor.classList.add('visible')
    let rafId = 0
    let currentX = window.innerWidth / 2
    let currentY = window.innerHeight / 2
    let targetX = currentX
    let targetY = currentY

    const handleMove = (event) => {
      targetX = event.clientX
      targetY = event.clientY
    }

    const tick = () => {
      currentX += (targetX - currentX) * 0.18
      currentY += (targetY - currentY) * 0.18
      cursor.style.transform = `translate(${currentX - 8}px, ${currentY - 8}px)`
      rafId = window.requestAnimationFrame(tick)
    }

    tick()
    window.addEventListener('mousemove', handleMove)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className="app-shell">
      <PetalParticles />
      <div className="grain-overlay" aria-hidden="true" />
      <div className="content-layer">
        {appState.step === 'intro' && <IntroScreen onStart={handleStart} />}
        {appState.step === 'quiz' && (
          <QuizScreen
            answers={appState.answers}
            currentIndex={currentIndex}
            onAnswer={handleAnswer}
          />
        )}
        {appState.step === 'loading' && (
          <LoadingScreen onComplete={handleLoadingDone} />
        )}
        {appState.step === 'reveal' && (
          <RevealScreen answers={appState.answers} onRestart={handleRestart} />
        )}
      </div>
      <div ref={cursorRef} className="petal-cursor" aria-hidden="true" />
      <Footer />
    </div>
  )
}

export default App
