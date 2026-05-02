import { memo, useEffect, useRef } from 'react'

const PETAL_COUNT = 36

const PetalParticles = memo(function PetalParticles() {
  const canvasRef = useRef(null)
  const petalsRef = useRef([])
  const rafRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return
    let dimensions = { width: 0, height: 0 }

    const createPetals = (width, height) => {
      const petals = []
      for (let i = 0; i < PETAL_COUNT; i += 1) {
        petals.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: 6 + Math.random() * 10,
          speed: 0.2 + Math.random() * 0.6,
          drift: (Math.random() - 0.5) * 0.4,
          rotation: Math.random() * Math.PI * 2,
          sway: 0.4 + Math.random() * 0.6,
        })
      }
      petalsRef.current = petals
    }

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      dimensions = { width: rect.width, height: rect.height }
      createPetals(rect.width, rect.height)
    }

    const drawPetal = (petal) => {
      context.save()
      context.translate(petal.x, petal.y)
      context.rotate(petal.rotation)
      context.beginPath()
      context.moveTo(0, 0)
      context.bezierCurveTo(
        petal.size * 0.2,
        -petal.size * 0.8,
        petal.size * 0.9,
        -petal.size * 0.2,
        0,
        petal.size,
      )
      context.bezierCurveTo(
        -petal.size * 0.9,
        -petal.size * 0.2,
        -petal.size * 0.2,
        -petal.size * 0.8,
        0,
        0,
      )
      context.fillStyle = 'rgba(247, 203, 209, 0.22)'
      context.shadowColor = 'rgba(247, 203, 209, 0.35)'
      context.shadowBlur = 12
      context.fill()
      context.restore()
    }

    const animate = () => {
      const { width, height } = dimensions
      context.clearRect(0, 0, width, height)

      petalsRef.current.forEach((petal) => {
        petal.y += petal.speed
        petal.x += petal.drift
        petal.rotation += 0.003 * petal.sway

        if (petal.y - petal.size > height) {
          petal.y = -petal.size
          petal.x = Math.random() * width
        }
        if (petal.x > width + petal.size) {
          petal.x = -petal.size
        }
        if (petal.x < -petal.size) {
          petal.x = width + petal.size
        }

        drawPetal(petal)
      })

      rafRef.current = window.requestAnimationFrame(animate)
    }

    resizeCanvas()
    animate()
    window.addEventListener('resize', resizeCanvas)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="petal-canvas" aria-hidden="true" />
})

export default PetalParticles
