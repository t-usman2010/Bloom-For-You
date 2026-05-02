const clamp = (value, min, max) => Math.min(Math.max(value, min), max)
const lerp = (start, end, t) => start + (end - start) * t
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

const hashString = (value) => {
  let hash = 2166136261
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i)
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24)
  }
  return hash >>> 0
}

const createRng = (seedValue) => {
  let seed = hashString(seedValue || 'bloom')
  return () => {
    seed += 0x6d2b79f5
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const roundedRect = (ctx, x, y, width, height, radius) => {
  const r = Math.min(radius, width / 2, height / 2)
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + width, y, x + width, y + height, r)
  ctx.arcTo(x + width, y + height, x, y + height, r)
  ctx.arcTo(x, y + height, x, y, r)
  ctx.arcTo(x, y, x + width, y, r)
  ctx.closePath()
}

const drawLeaf = (ctx, x, y, size, angle, color) => {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(angle)
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.bezierCurveTo(size * 0.6, -size * 0.5, size * 1.4, -size * 0.2, 0, size)
  ctx.bezierCurveTo(-size * 1.4, -size * 0.2, -size * 0.6, -size * 0.5, 0, 0)
  ctx.fillStyle = color
  ctx.globalAlpha = 0.7
  ctx.fill()
  ctx.restore()
}

const drawRose = (ctx, size, colors) => {
  const petalCount = 6
  for (let i = 0; i < petalCount; i += 1) {
    ctx.save()
    ctx.rotate((Math.PI * 2 * i) / petalCount)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.bezierCurveTo(size * 0.15, -size * 0.5, size * 0.75, -size * 0.3, size * 0.65, 0)
    ctx.bezierCurveTo(size * 0.7, size * 0.4, size * 0.2, size * 0.45, 0, 0)
    ctx.fillStyle = colors.petals
    ctx.globalAlpha = 0.85
    ctx.fill()
    ctx.restore()
  }

  ctx.beginPath()
  ctx.arc(0, 0, size * 0.25, 0, Math.PI * 2)
  ctx.fillStyle = colors.center
  ctx.globalAlpha = 0.9
  ctx.fill()
}

const drawSunflower = (ctx, size, colors) => {
  const petalCount = 14
  for (let i = 0; i < petalCount; i += 1) {
    ctx.save()
    ctx.rotate((Math.PI * 2 * i) / petalCount)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.bezierCurveTo(
      size * 0.1,
      -size * 0.95,
      size * 0.5,
      -size * 0.85,
      size * 0.4,
      0,
    )
    ctx.bezierCurveTo(size * 0.45, size * 0.6, size * 0.1, size * 0.5, 0, 0)
    ctx.fillStyle = colors.petals
    ctx.globalAlpha = 0.9
    ctx.fill()
    ctx.restore()
  }

  ctx.beginPath()
  ctx.arc(0, 0, size * 0.38, 0, Math.PI * 2)
  ctx.fillStyle = colors.center
  ctx.globalAlpha = 1
  ctx.fill()
}

const drawTulip = (ctx, size, colors) => {
  const petalOffset = size * 0.25
  const drawPetal = (offset) => {
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.bezierCurveTo(
      size * 0.3,
      -size * 0.9,
      size * 0.8,
      -size * 0.3,
      offset,
      size * 0.2,
    )
    ctx.bezierCurveTo(
      -size * 0.8,
      -size * 0.3,
      -size * 0.3,
      -size * 0.9,
      0,
      0,
    )
    ctx.fillStyle = colors.petals
    ctx.globalAlpha = 0.85
    ctx.fill()
  }

  ctx.save()
  ctx.translate(-petalOffset, 0)
  drawPetal(-petalOffset)
  ctx.restore()

  ctx.save()
  drawPetal(0)
  ctx.restore()

  ctx.save()
  ctx.translate(petalOffset, 0)
  drawPetal(petalOffset)
  ctx.restore()

  ctx.beginPath()
  ctx.arc(0, size * 0.2, size * 0.18, 0, Math.PI * 2)
  ctx.fillStyle = colors.center
  ctx.globalAlpha = 0.9
  ctx.fill()
}

const drawWildflower = (ctx, size, colors, rand) => {
  const petalCount = 7
  for (let i = 0; i < petalCount; i += 1) {
    ctx.save()
    ctx.rotate((Math.PI * 2 * i) / petalCount)
    const stretch = lerp(0.7, 1.1, rand())
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.bezierCurveTo(
      size * 0.1,
      -size * stretch,
      size * 0.55,
      -size * 0.5,
      size * 0.35,
      0,
    )
    ctx.bezierCurveTo(
      size * 0.4,
      size * 0.4,
      size * 0.1,
      size * 0.35,
      0,
      0,
    )
    ctx.fillStyle = colors.petals
    ctx.globalAlpha = 0.8
    ctx.fill()
    ctx.restore()
  }

  ctx.beginPath()
  ctx.arc(0, 0, size * 0.25, 0, Math.PI * 2)
  ctx.fillStyle = colors.center
  ctx.globalAlpha = 0.95
  ctx.fill()
}

const drawButterfly = (ctx, x, y, size, time, color) => {
  const flutter = Math.sin(time * 5 + x * 0.01) * 0.5 + 0.5
  const wingScale = lerp(0.5, 1, flutter)

  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(Math.sin(time + y * 0.01) * 0.3)

  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.bezierCurveTo(
    size * 0.8 * wingScale,
    -size * 0.6,
    size * 1.1 * wingScale,
    size * 0.4,
    0,
    size * 0.2,
  )
  ctx.bezierCurveTo(-size * 0.4, size * 0.2, -size * 0.2, -size * 0.4, 0, 0)
  ctx.fillStyle = color
  ctx.globalAlpha = 0.8
  ctx.fill()

  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.bezierCurveTo(
    -size * 0.8 * wingScale,
    -size * 0.6,
    -size * 1.1 * wingScale,
    size * 0.4,
    0,
    size * 0.2,
  )
  ctx.bezierCurveTo(size * 0.4, size * 0.2, size * 0.2, -size * 0.4, 0, 0)
  ctx.fillStyle = color
  ctx.globalAlpha = 0.8
  ctx.fill()

  ctx.restore()
}

const drawSparkle = (ctx, x, y, size, color) => {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(Math.PI / 4)
  ctx.beginPath()
  ctx.moveTo(0, -size)
  ctx.lineTo(size * 0.4, 0)
  ctx.lineTo(0, size)
  ctx.lineTo(-size * 0.4, 0)
  ctx.closePath()
  ctx.fillStyle = color
  ctx.globalAlpha = 0.7
  ctx.fill()
  ctx.restore()
}

const drawWrap = (ctx, x, y, width, height, style, palette) => {
  if (style === 'none') return

  ctx.save()
  if (style === 'kraft') {
    const gradient = ctx.createLinearGradient(x - width / 2, y, x + width / 2, y)
    gradient.addColorStop(0, '#cfa58b')
    gradient.addColorStop(1, '#e5c5ab')
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.moveTo(x - width * 0.55, y - height * 0.1)
    ctx.lineTo(x + width * 0.55, y - height * 0.1)
    ctx.lineTo(x + width * 0.3, y + height * 0.6)
    ctx.lineTo(x - width * 0.3, y + height * 0.6)
    ctx.closePath()
    ctx.fill()
  }

  if (style === 'satin') {
    ctx.fillStyle = palette.accents[0]
    ctx.beginPath()
    ctx.moveTo(x - width * 0.3, y + height * 0.1)
    ctx.lineTo(x, y - height * 0.25)
    ctx.lineTo(x + width * 0.3, y + height * 0.1)
    ctx.closePath()
    ctx.fill()

    ctx.fillStyle = palette.accents[1]
    ctx.beginPath()
    ctx.ellipse(x, y, width * 0.12, height * 0.16, 0, 0, Math.PI * 2)
    ctx.fill()
  }

  if (style === 'twine') {
    ctx.strokeStyle = '#b68f6b'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(x - width * 0.35, y)
    ctx.quadraticCurveTo(x, y + height * 0.25, x + width * 0.35, y)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(x - width * 0.35, y + height * 0.1)
    ctx.quadraticCurveTo(x, y + height * 0.35, x + width * 0.35, y + height * 0.1)
    ctx.stroke()
  }
  ctx.restore()
}

const drawTag = (ctx, x, y, text) => {
  const tagWidth = Math.min(220, text.length * 9 + 80)
  const tagHeight = 44
  const tagX = x
  const tagY = y

  ctx.save()
  roundedRect(ctx, tagX, tagY, tagWidth, tagHeight, 12)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.14)'
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)'
  ctx.lineWidth = 1
  ctx.fill()
  ctx.stroke()

  ctx.font = 'italic 16px "Playfair Display", serif'
  ctx.fillStyle = 'rgba(249, 244, 239, 0.9)'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, tagX + 16, tagY + tagHeight / 2)

  ctx.beginPath()
  ctx.moveTo(tagX, tagY + tagHeight / 2)
  ctx.lineTo(tagX - 26, tagY + tagHeight / 2 + 10)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)'
  ctx.stroke()
  ctx.restore()
}

export const drawBouquet = (ctx, config) => {
  const {
    width,
    height,
    progress = 1,
    palette,
    flowerType,
    count,
    extra,
    wrapStyle,
    message,
    mood,
    vibe,
    seed,
    time = 0,
  } = config

  ctx.clearRect(0, 0, width, height)
  const bloom = easeOutCubic(clamp(progress, 0, 1))
  const rand = createRng(seed)

  const centerX = width * 0.5
  const centerY = height * 0.56
  const baseRadius = Math.min(width, height) * 0.33

  const glowStrength = mood === 'dreamy' ? 0.45 : mood === 'romantic' ? 0.4 : 0.3
  const glow = ctx.createRadialGradient(
    centerX,
    centerY,
    20,
    centerX,
    centerY,
    baseRadius * 1.4,
  )
  glow.addColorStop(0, `rgba(247, 203, 209, ${glowStrength})`)
  glow.addColorStop(1, 'rgba(18, 11, 19, 0)')
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, width, height)

  const stemBaseX = centerX
  const stemBaseY = height * 0.86
  const scatter = vibe === 'wild' ? 1.2 : vibe === 'elegant' ? 0.85 : 1

  const flowers = Array.from({ length: count }).map(() => {
    const angle = rand() * Math.PI * 2
    const radius = Math.sqrt(rand()) * baseRadius * scatter
    const x = centerX + Math.cos(angle) * radius
    const y = centerY + Math.sin(angle) * radius * 0.65
    const size = lerp(baseRadius * 0.12, baseRadius * 0.22, rand())
    const rotation = rand() * Math.PI * 2
    return { x, y, size, rotation }
  })

  ctx.strokeStyle = palette.stem
  ctx.lineWidth = Math.max(1.4, width * 0.006)
  ctx.lineCap = 'round'

  flowers.forEach((flower) => {
    const sway = (rand() - 0.5) * baseRadius * 0.2
    const stemTipX = lerp(stemBaseX, flower.x, bloom)
    const stemTipY = lerp(stemBaseY, flower.y, bloom)
    ctx.beginPath()
    ctx.moveTo(stemBaseX, stemBaseY)
    ctx.bezierCurveTo(
      stemBaseX + sway,
      stemBaseY - baseRadius * 0.2,
      stemTipX + sway * 0.5,
      stemTipY + baseRadius * 0.1,
      stemTipX,
      stemTipY,
    )
    ctx.stroke()

    if (extra === 'eucalyptus') {
      drawLeaf(
        ctx,
        lerp(stemBaseX, flower.x, 0.55),
        lerp(stemBaseY, flower.y, 0.55),
        flower.size * 0.35,
        flower.rotation + Math.PI / 3,
        palette.stem,
      )
    }
  })

  if (extra === 'babys-breath') {
    for (let i = 0; i < count * 2; i += 1) {
      const x = centerX + (rand() - 0.5) * baseRadius * 1.1
      const y = centerY + (rand() - 0.5) * baseRadius * 0.6
      const dotSize = lerp(1.5, 2.8, rand())
      ctx.beginPath()
      ctx.arc(x, y, dotSize * bloom, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(249, 244, 239, 0.9)'
      ctx.fill()
    }
  }

  flowers.forEach((flower, index) => {
    const petalColor = palette.petals[index % palette.petals.length]
    const centerColor = palette.centers[index % palette.centers.length]
    const accentColor = palette.accents[index % palette.accents.length]

    ctx.save()
    ctx.translate(lerp(stemBaseX, flower.x, bloom), lerp(stemBaseY, flower.y, bloom))
    ctx.rotate(flower.rotation)
    ctx.scale(bloom, bloom)
    ctx.shadowColor = 'rgba(247, 203, 209, 0.25)'
    ctx.shadowBlur = flower.size * 0.3

    const colors = {
      petals: petalColor,
      center: centerColor,
      accent: accentColor,
    }

    if (flowerType === 'sunflower') {
      drawSunflower(ctx, flower.size, colors)
    } else if (flowerType === 'tulip') {
      drawTulip(ctx, flower.size, colors)
    } else if (flowerType === 'wildflower') {
      drawWildflower(ctx, flower.size, colors, rand)
    } else {
      drawRose(ctx, flower.size, colors)
    }

    ctx.restore()
  })

  if (extra === 'glitter') {
    for (let i = 0; i < count + 6; i += 1) {
      const x = centerX + (rand() - 0.5) * baseRadius * 1.1
      const y = centerY + (rand() - 0.5) * baseRadius * 0.65
      drawSparkle(ctx, x, y, 6 + rand() * 6, 'rgba(249, 244, 239, 0.85)')
    }
  }

  if (extra === 'butterflies') {
    for (let i = 0; i < 4; i += 1) {
      const x = centerX + (rand() - 0.5) * baseRadius * 1.2
      const y = centerY - baseRadius * 0.4 + (rand() - 0.5) * baseRadius * 0.6
      drawButterfly(ctx, x, y, 12 + rand() * 8, time, 'rgba(247, 203, 209, 0.9)')
    }
  }

  drawWrap(
    ctx,
    stemBaseX,
    stemBaseY + baseRadius * 0.08,
    baseRadius * 1.2,
    baseRadius * 0.7,
    wrapStyle,
    palette,
  )

  const tagText = (message || 'For you').slice(0, 60)
  drawTag(ctx, centerX + baseRadius * 0.35, centerY - baseRadius * 0.2, tagText)
}
