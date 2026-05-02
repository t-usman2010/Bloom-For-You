import { memo, useCallback, useEffect, useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import { drawBouquet } from '../utils/drawBouquet'

const paletteMap = {
  pastel: {
    petals: ['#f7cbd1', '#f4b9c6', '#f9dbe2'],
    accents: ['#e6b9a9', '#f9f4ef'],
    centers: ['#f7e1c7', '#f4cfcf'],
    stem: '#5b7a63',
  },
  deep: {
    petals: ['#7d3149', '#5a1f3a', '#9c4d6b'],
    accents: ['#3a1f2b', '#f2c0d1'],
    centers: ['#f5d3c8', '#e6b9a9'],
    stem: '#3f5f4c',
  },
  warm: {
    petals: ['#f2a45b', '#f7c07a', '#e56f4b'],
    accents: ['#f9f4ef', '#e6b9a9'],
    centers: ['#f8e2b6', '#f2c189'],
    stem: '#60754c',
  },
  cool: {
    petals: ['#eaf0f2', '#cfdde6', '#b6cfe0'],
    accents: ['#f9f4ef', '#e6b9a9'],
    centers: ['#f3f5f7', '#dfe8ef'],
    stem: '#507065',
  },
}

const sizeMap = {
  small: 5,
  medium: 8,
  grand: 12,
  garden: 18,
}

const BouquetCanvas = memo(function BouquetCanvas({ answers, message, canvasRef }) {
  const localCanvasRef = useRef(null)
  const animationRef = useRef(null)
  const bloomRef = useRef({ progress: 0 })
  const timeRef = useRef(0)
  const sizeRef = useRef({ width: 0, height: 0 })
  const activeCanvasRef = canvasRef || localCanvasRef

  const config = useMemo(() => {
    const paletteKey = answers[1] || 'pastel'
    const palette = paletteMap[paletteKey] || paletteMap.pastel

    return {
      palette,
      flowerType: answers[2] || 'rose',
      count: sizeMap[answers[3]] || 8,
      vibe: answers[4] || 'elegant',
      wrapStyle: answers[5] || 'satin',
      extra: answers[6] || 'babys-breath',
      mood: answers[0] || 'romantic',
      message: message || answers[7] || 'Always for you.',
      seed: `${answers.join('|')}`,
    }
  }, [answers, message])

  const drawFrame = useCallback(
    (time = 0) => {
      const canvas = activeCanvasRef.current
      if (!canvas) return
      const context = canvas.getContext('2d')
      if (!context) return
      const { width, height } = sizeRef.current
      if (!width || !height) return

      drawBouquet(context, {
        width,
        height,
        progress: bloomRef.current.progress,
        time,
        ...config,
      })
    },
    [activeCanvasRef, config],
  )

  const resizeCanvas = useCallback(() => {
    const canvas = activeCanvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    const context = canvas.getContext('2d')
    if (!context) return
    context.setTransform(dpr, 0, 0, dpr, 0, 0)
    sizeRef.current = { width: rect.width, height: rect.height }
    drawFrame(timeRef.current)
  }, [activeCanvasRef, drawFrame])

  useEffect(() => {
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [resizeCanvas])

  useEffect(() => {
    bloomRef.current.progress = 0
    const tween = gsap.to(bloomRef.current, {
      progress: 1,
      duration: 2.6,
      ease: 'power2.out',
      onUpdate: () => drawFrame(timeRef.current),
    })

    return () => {
      tween.kill()
    }
  }, [drawFrame, config])

  useEffect(() => {
    window.cancelAnimationFrame(animationRef.current)

    if (config.extra !== 'butterflies') {
      drawFrame(timeRef.current)
      return () => {}
    }

    const tick = (time) => {
      timeRef.current = time / 1000
      drawFrame(timeRef.current)
      animationRef.current = window.requestAnimationFrame(tick)
    }

    animationRef.current = window.requestAnimationFrame(tick)

    return () => {
      window.cancelAnimationFrame(animationRef.current)
    }
  }, [config.extra, drawFrame])

  return (
    <canvas
      ref={activeCanvasRef}
      className="h-full w-full"
      role="img"
      aria-label="Custom bouquet"
    />
  )
})

export default BouquetCanvas
