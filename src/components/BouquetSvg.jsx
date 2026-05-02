import { memo, useEffect, useMemo, useRef } from 'react'
import { gsap } from 'gsap'

// ─── Palettes ────────────────────────────────────────────────────────────────
const paletteMap = {
  pastel: {
    petalBase:   ['#f7b8c8','#f4a0bb','#f9d0dc'],
    petalMid:    ['#f08898','#ec7085','#f5a0b0'],
    petalDark:   ['#d45870','#cc4868','#e06880'],
    petalLight:  ['#fce8ee','#fdd8e4','#fff0f5'],
    center:      ['#f9eed0','#f5d898','#fce8b0'],
    centerDark:  ['#d4a020','#c89018','#e0b028'],
    stamen:      '#c89018',
    leaves:      ['#2e6644','#246038','#38704e'],
    leafVein:    '#1a4a2e',
    stem:        '#2a5c3c',
    stemDark:    '#1e4a30',
    wrap:        ['#faf4ec','#f5e8d8'],
    wrapShadow:  '#e0cdb8',
    wrapDark:    '#c4a882',
    wrapMid:     '#ddc8a8',
    ribbon:      ['#f08898','#e87088'],
    ribbonDark:  '#d05878',
    glow:        '#f7b8c8',
    bg1:         '#f5d6e8',
    bg2:         '#f0c8de',
    bgSpot1:     '#d8eef5',
    bgSpot2:     '#f7f2ef',
    table:       '#b87098',
    tableSurf:   '#cc88b0',
    tableEdge:   '#a06088',
    petal:       '#f5c0d0',
  },
  deep: {
    petalBase:   ['#8c1840','#701030','#a02050'],
    petalMid:    ['#c02858','#a81e48','#d43060'],
    petalDark:   ['#600c28','#500820','#700e30'],
    petalLight:  ['#e87090','#d85878','#f080a0'],
    center:      ['#f5d898','#f0c880','#f8e4a8'],
    centerDark:  ['#c89018','#b07810','#d8a820'],
    stamen:      '#b07810',
    leaves:      ['#1a4a2c','#143e24','#205434'],
    leafVein:    '#0e2e18',
    stem:        '#1c4828',
    stemDark:    '#122038',
    wrap:        ['#f0e0d0','#e8d0c0'],
    wrapShadow:  '#d0b8a0',
    wrapDark:    '#b89870',
    wrapMid:     '#d4b890',
    ribbon:      ['#8c1840','#701030'],
    ribbonDark:  '#500828',
    glow:        '#c02858',
    bg1:         '#f5d6e6',
    bg2:         '#f0cee2',
    bgSpot1:     '#d8eef5',
    bgSpot2:     '#f7f2ef',
    table:       '#b87098',
    tableSurf:   '#cc88b0',
    tableEdge:   '#a06088',
    petal:       '#c02858',
  },
  warm: {
    petalBase:   ['#e86030','#d84820','#f07840'],
    petalMid:    ['#f08840','#e87030','#f89850'],
    petalDark:   ['#c04018','#a83010','#d05020'],
    petalLight:  ['#fcc080','#f8a860','#ffd098'],
    center:      ['#f8e098','#f4d070','#fce8b0'],
    centerDark:  ['#c89018','#b07010','#d8a020'],
    stamen:      '#b07010',
    leaves:      ['#3a5c28','#2e5020','#446634'],
    leafVein:    '#20380e',
    stem:        '#3a5424',
    stemDark:    '#2a3c18',
    wrap:        ['#faf0e4','#f5e4d0'],
    wrapShadow:  '#e0ccb0',
    wrapDark:    '#c8a878',
    wrapMid:     '#dcc098',
    ribbon:      ['#e86030','#c04018'],
    ribbonDark:  '#a83010',
    glow:        '#f08840',
    bg1:         '#f5d8d0',
    bg2:         '#f0c8bc',
    bgSpot1:     '#d8eef5',
    bgSpot2:     '#f7f2ef',
    table:       '#b87060',
    tableSurf:   '#cc8870',
    tableEdge:   '#a06050',
    petal:       '#f08040',
  },
  cool: {
    petalBase:   ['#b8d0e8','#a0bcd8','#cce0f4'],
    petalMid:    ['#88a8cc','#7090b8','#98b8d8'],
    petalDark:   ['#5878a0','#406090','#6888b0'],
    petalLight:  ['#dceef8','#e8f4fc','#f0f8ff'],
    center:      ['#f0f0e8','#e8e8d8','#f8f8f0'],
    centerDark:  ['#a0a070','#888860','#b0b080'],
    stamen:      '#888860',
    leaves:      ['#286040','#1e5034','#30684a'],
    leafVein:    '#144028',
    stem:        '#2a5c3a',
    stemDark:    '#1c3e28',
    wrap:        ['#f4f0ec','#ece8e0'],
    wrapShadow:  '#d8d0c8',
    wrapDark:    '#b8b0a0',
    wrapMid:     '#d0c8b8',
    ribbon:      ['#88a8cc','#5878a0'],
    ribbonDark:  '#406090',
    glow:        '#a0c4e0',
    bg1:         '#d8e8f5',
    bg2:         '#ccdee8',
    bgSpot1:     '#eef5d8',
    bgSpot2:     '#f7f2ef',
    table:       '#7098b8',
    tableSurf:   '#88a8cc',
    tableEdge:   '#6088a8',
    petal:       '#9ab8d4',
  },
}

const sizeMap = { small: 5, medium: 9, grand: 12, garden: 18 }

// ─── Flower positions (cone arrangement) ─────────────────────────────────────
const flowerPositions = [
  { x: 300, y: 195, scale: 1.28, rotate: -4, z: 10 },
  { x: 245, y: 228, scale: 1.12, rotate:  9, z: 8  },
  { x: 355, y: 228, scale: 1.12, rotate: -9, z: 8  },
  { x: 200, y: 268, scale: 1.02, rotate:-12, z: 6  },
  { x: 400, y: 268, scale: 1.02, rotate: 12, z: 6  },
  { x: 162, y: 310, scale: 0.94, rotate:  7, z: 5  },
  { x: 438, y: 310, scale: 0.94, rotate: -7, z: 5  },
  { x: 248, y: 300, scale: 0.92, rotate:  2, z: 4  },
  { x: 352, y: 300, scale: 0.92, rotate: -2, z: 4  },
  { x: 300, y: 338, scale: 0.90, rotate:  5, z: 3  },
  { x: 214, y: 360, scale: 0.82, rotate: -9, z: 3  },
  { x: 386, y: 360, scale: 0.82, rotate:  9, z: 3  },
  { x: 142, y: 354, scale: 0.80, rotate:-12, z: 2  },
  { x: 458, y: 354, scale: 0.80, rotate: 12, z: 2  },
  { x: 264, y: 395, scale: 0.74, rotate:  4, z: 2  },
  { x: 336, y: 395, scale: 0.74, rotate: -4, z: 2  },
  { x: 192, y: 414, scale: 0.70, rotate: -6, z: 1  },
  { x: 408, y: 414, scale: 0.70, rotate:  6, z: 1  },
  { x: 300, y: 428, scale: 0.66, rotate:  0, z: 1  },
  { x: 300, y: 462, scale: 0.60, rotate:  0, z: 1  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
const lerp = (a, b, t) => a + (b - a) * t

const wrapText = (text, maxLen, maxLines = 2) => {
  if (!text) return ['']
  const words = text.split(' ').filter(Boolean)
  const lines = []
  let line = ''
  for (const word of words) {
    const next = line ? `${line} ${word}` : word
    if (next.length > maxLen && line) {
      lines.push(line)
      line = word
      if (lines.length === maxLines - 1) break
    } else {
      line = next
    }
  }
  if (line && lines.length < maxLines) lines.push(line)
  if (lines.length === 0) return [text.slice(0, maxLen)]
  return lines.map((entry) => entry.slice(0, maxLen))
}

// ─── Realistic Rose ───────────────────────────────────────────────────────────
const RoseFlower = ({ colors, scale = 1 }) => (
  <g>
    <ellipse rx={28*scale} ry={14*scale} cy={20*scale} fill="#000" opacity="0.12"/>
    <path d={`M0 ${-30*scale} C${18*scale} ${-32*scale} ${32*scale} ${-14*scale} ${30*scale} ${4*scale} C${28*scale} ${20*scale} ${12*scale} ${28*scale} ${0} ${26*scale} C${-12*scale} ${28*scale} ${-28*scale} ${20*scale} ${-30*scale} ${4*scale} C${-32*scale} ${-14*scale} ${-18*scale} ${-32*scale} 0 ${-30*scale}Z`} fill={colors.petalDark}/>
    <path d={`M${-22*scale} ${-26*scale} C${-36*scale} ${-18*scale} ${-36*scale} ${4*scale} ${-24*scale} ${16*scale} C${-16*scale} ${24*scale} ${-4*scale} ${26*scale} ${0} ${24*scale} C${-10*scale} ${18*scale} ${-22*scale} ${8*scale} ${-24*scale} ${-4*scale} C${-26*scale} ${-14*scale} ${-20*scale} ${-22*scale} ${-16*scale} ${-24*scale}Z`} fill={colors.petalBase} opacity="0.9"/>
    <path d={`M${22*scale} ${-26*scale} C${36*scale} ${-18*scale} ${36*scale} ${4*scale} ${24*scale} ${16*scale} C${16*scale} ${24*scale} ${4*scale} ${26*scale} ${0} ${24*scale} C${10*scale} ${18*scale} ${22*scale} ${8*scale} ${24*scale} ${-4*scale} C${26*scale} ${-14*scale} ${20*scale} ${-22*scale} ${16*scale} ${-24*scale}Z`} fill={colors.petalBase} opacity="0.9"/>
    <path d={`M0 ${-24*scale} C${14*scale} ${-24*scale} ${24*scale} ${-10*scale} ${22*scale} ${6*scale} C${20*scale} ${18*scale} ${8*scale} ${24*scale} ${0} ${22*scale} C${-8*scale} ${24*scale} ${-20*scale} ${18*scale} ${-22*scale} ${6*scale} C${-24*scale} ${-10*scale} ${-14*scale} ${-24*scale} 0 ${-24*scale}Z`} fill={colors.petalMid}/>
    <path d={`M${-16*scale} ${-20*scale} C${-26*scale} ${-10*scale} ${-24*scale} ${6*scale} ${-14*scale} ${14*scale} C${-6*scale} ${20*scale} ${4*scale} ${20*scale} ${0} ${18*scale} C${-8*scale} ${14*scale} ${-16*scale} ${4*scale} ${-16*scale} ${-6*scale} C${-16*scale} ${-14*scale} ${-12*scale} ${-18*scale} ${-10*scale} ${-18*scale}Z`} fill={colors.petalBase} opacity="0.85"/>
    <path d={`M${16*scale} ${-20*scale} C${26*scale} ${-10*scale} ${24*scale} ${6*scale} ${14*scale} ${14*scale} C${6*scale} ${20*scale} ${-4*scale} ${20*scale} ${0} ${18*scale} C${8*scale} ${14*scale} ${16*scale} ${4*scale} ${16*scale} ${-6*scale} C${16*scale} ${-14*scale} ${12*scale} ${-18*scale} ${10*scale} ${-18*scale}Z`} fill={colors.petalBase} opacity="0.85"/>
    <path d={`M0 ${-18*scale} C${10*scale} ${-18*scale} ${18*scale} ${-8*scale} ${16*scale} ${4*scale} C${14*scale} ${14*scale} ${4*scale} ${18*scale} ${0} ${17*scale} C${-4*scale} ${18*scale} ${-14*scale} ${14*scale} ${-16*scale} ${4*scale} C${-18*scale} ${-8*scale} ${-10*scale} ${-18*scale} 0 ${-18*scale}Z`} fill={colors.petalMid}/>
    <path d={`M${-10*scale} ${-14*scale} C${-18*scale} ${-6*scale} ${-16*scale} ${6*scale} ${-8*scale} ${12*scale} C${-2*scale} ${15*scale} ${4*scale} ${14*scale} ${0} ${12*scale} C${-4*scale} ${8*scale} ${-8*scale} ${2*scale} ${-8*scale} ${-4*scale} C${-8*scale} ${-10*scale} ${-5*scale} ${-13*scale} ${-4*scale} ${-13*scale}Z`} fill={colors.petalLight} opacity="0.7"/>
    <path d={`M0 ${-12*scale} C${8*scale} ${-12*scale} ${13*scale} ${-4*scale} ${11*scale} ${5*scale} C${9*scale} ${12*scale} ${2*scale} ${14*scale} ${0} ${13*scale} C${-2*scale} ${14*scale} ${-9*scale} ${12*scale} ${-11*scale} ${5*scale} C${-13*scale} ${-4*scale} ${-8*scale} ${-12*scale} 0 ${-12*scale}Z`} fill={colors.petalDark}/>
    <path d={`M0 ${-7*scale} C${5*scale} ${-5*scale} ${7*scale} ${0} ${5*scale} ${5*scale} C${3*scale} ${9*scale} ${-3*scale} ${9*scale} ${-5*scale} ${5*scale} C${-7*scale} ${0} ${-5*scale} ${-5*scale} 0 ${-7*scale}Z`} fill={colors.petalMid}/>
    <circle r={4*scale} fill={colors.center}/>
    <circle r={2*scale} fill={colors.centerDark} opacity="0.7"/>
    <ellipse cx={-4*scale} cy={-16*scale} rx={3*scale} ry={5*scale} fill="#fff" opacity="0.18" transform={`rotate(-20 ${-4*scale} ${-16*scale})`}/>
  </g>
)

const LilyFlower = ({ colors }) => (
  <g>
    <ellipse rx="26" ry="12" cy="18" fill="#000" opacity="0.10"/>
    {[0,60,120,180,240,300].map((angle, i) => (
      <g key={i} transform={`rotate(${angle})`}>
        <path d={`M0 -28 C10 -26 20 -12 18 2 C16 14 6 20 0 18 C-6 20 -16 14 -18 2 C-20 -12 -10 -26 0 -28Z`} fill={i % 2 === 0 ? colors.petalLight : colors.petalBase} opacity="0.92"/>
        <path d={`M0 -26 C1 -14 1 0 0 16`} stroke={colors.petalMid} strokeWidth="0.8" fill="none" opacity="0.6"/>
        {i % 2 === 0 && <>
          <circle cx="-4" cy="-8" r="1.5" fill={colors.petalDark} opacity="0.5"/>
          <circle cx="3" cy="-4" r="1.2" fill={colors.petalDark} opacity="0.4"/>
          <circle cx="-2" cy="2" r="1" fill={colors.petalDark} opacity="0.35"/>
        </>}
      </g>
    ))}
    {[-20,-10,0,10,20].map((a, i) => (
      <g key={i} transform={`rotate(${a})`}>
        <path d={`M0 -2 L${i%2===0?-3:3} -18`} stroke={colors.stamen} strokeWidth="1.2" fill="none"/>
        <ellipse cx={i%2===0?-3:3} cy="-19" rx="2.5" ry="1.5" fill={colors.centerDark} transform={`rotate(${a})`}/>
      </g>
    ))}
    <circle r="5" fill={colors.center}/>
  </g>
)

const SunflowerFlower = ({ colors }) => (
  <g>
    <ellipse rx="28" ry="12" cy="20" fill="#000" opacity="0.12"/>
    {Array.from({length: 16}).map((_, i) => (
      <path key={i} d={`M0 -32 C6 -28 10 -16 0 -6 C-10 -16 -6 -28 0 -32Z`} fill={i % 2 === 0 ? colors.petalBase : colors.petalMid} transform={`rotate(${i * 22.5})`} opacity="0.9"/>
    ))}
    {Array.from({length: 8}).map((_, i) => (
      <path key={i} d={`M0 -22 C4 -18 7 -10 0 -4 C-7 -10 -4 -18 0 -22Z`} fill={colors.petalDark} transform={`rotate(${i * 45 + 11.25})`} opacity="0.7"/>
    ))}
    <circle r="14" fill="#3a1a08"/>
    <circle r="11" fill="#4a2210"/>
    {Array.from({length: 24}).map((_, i) => {
      const a = (i / 24) * Math.PI * 2
      const r = 7 + (i % 3) * 1.5
      return <circle key={i} cx={Math.cos(a)*r} cy={Math.sin(a)*r} r="1.2" fill="#6a3818" opacity="0.8"/>
    })}
    <circle r="4" fill={colors.center} opacity="0.5"/>
  </g>
)

const TulipFlower = ({ colors }) => (
  <g>
    <ellipse rx="22" ry="10" cy="24" fill="#000" opacity="0.12"/>
    <path d="M0 -30 C16 -28 28 -8 20 12 C14 26 4 30 0 28 C-4 30 -14 26 -20 12 C-28 -8 -16 -28 0 -30Z" fill={colors.petalBase}/>
    <path d="M-14 -26 C-28 -16 -30 4 -20 18 C-13 28 -3 30 0 28 C-8 24 -18 12 -18 0 C-18 -12 -10 -22 -8 -24Z" fill={colors.petalMid} opacity="0.85"/>
    <path d="M14 -26 C28 -16 30 4 20 18 C13 28 3 30 0 28 C8 24 18 12 18 0 C18 -12 10 -22 8 -24Z" fill={colors.petalMid} opacity="0.85"/>
    <path d="M0 -24 C12 -22 20 -8 16 8 C12 20 2 26 0 24 C-2 26 -12 20 -16 8 C-20 -8 -12 -22 0 -24Z" fill={colors.petalDark}/>
    <path d="M-8 -20 C-18 -10 -16 6 -8 14 C-2 20 4 20 0 18 C-4 14 -10 4 -10 -4 C-10 -12 -5 -18 -4 -18Z" fill={colors.petalLight} opacity="0.5"/>
    <circle r="5" fill={colors.center}/>
    <circle r="2.5" fill={colors.centerDark}/>
    <ellipse cx="-3" cy="-12" rx="3" ry="6" fill="#fff" opacity="0.2" transform="rotate(-10 -3 -12)"/>
  </g>
)

const WildflowerFlower = ({ colors }) => (
  <g>
    {Array.from({length: 8}).map((_, i) => (
      <path key={i} d={`M0 -22 C7 -20 12 -10 0 -2 C-12 -10 -7 -20 0 -22Z`} fill={i % 2 === 0 ? colors.petalBase : colors.petalLight} transform={`rotate(${i * 45})`} opacity="0.88"/>
    ))}
    {Array.from({length: 8}).map((_, i) => (
      <path key={i} d={`M0 -14 C4 -12 7 -6 0 -1 C-7 -6 -4 -12 0 -14Z`} fill={colors.petalMid} transform={`rotate(${i * 45 + 22.5})`} opacity="0.7"/>
    ))}
    <circle r="7" fill={colors.center}/>
    <circle r="4" fill={colors.centerDark}/>
    {Array.from({length: 6}).map((_, i) => {
      const a = (i/6)*Math.PI*2
      return <circle key={i} cx={Math.cos(a)*2.5} cy={Math.sin(a)*2.5} r="1" fill={colors.stamen} opacity="0.8"/>
    })}
  </g>
)

const FlowerShape = ({ type, colors }) => {
  switch (type) {
    case 'sunflower':  return <SunflowerFlower colors={colors}/>
    case 'tulip':      return <TulipFlower colors={colors}/>
    case 'wildflower': return <WildflowerFlower colors={colors}/>
    case 'lily':       return <LilyFlower colors={colors}/>
    default:           return <RoseFlower colors={colors}/>
  }
}

const LeafShape = ({ x, y, scale, rotate, color, veinColor }) => (
  <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
    <path d="M0 0 C22 -16 44 -8 18 28 C8 40 -18 24 0 0Z" fill={color} opacity="0.85"/>
    <path d="M1 2 C8 12 12 22 4 34" stroke={veinColor} strokeWidth="1.0" fill="none" opacity="0.7"/>
    <path d="M4 10 C10 8 14 10 16 14" stroke={veinColor} strokeWidth="0.6" fill="none" opacity="0.5"/>
    <path d="M6 18 C12 16 16 18 18 22" stroke={veinColor} strokeWidth="0.6" fill="none" opacity="0.5"/>
    <path d="M3 8 C-3 6 -8 8 -10 12" stroke={veinColor} strokeWidth="0.6" fill="none" opacity="0.5"/>
  </g>
)

const SprigShape = ({ x, y, scale, rotate, color }) => (
  <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
    <path d="M0 0 Q-4 22 0 48" stroke={color} strokeWidth="1.5" fill="none" opacity="0.9"/>
    {[6, 16, 26, 36].map((cy, i) => (
      <g key={i} transform={`translate(0 ${cy})`}>
        <path d={i%2===0 ? `M0 0 C-12 -2 -14 8 -5 12 C0 12 2 8 0 0Z` : `M0 0 C12 -2 14 8 5 12 C0 12 -2 8 0 0Z`} fill={color} opacity="0.8"/>
      </g>
    ))}
  </g>
)

const BabyBreath = ({ x, y }) => (
  <g>
    {[-8,-4,0,4,8].map((dx, i) =>
      [-6,-2,2,6].map((dy, j) => (
        <circle key={`${i}-${j}`} cx={x+dx+(j*2)} cy={y+dy} r={1.2+(i%2)*0.6} fill="#faf6f0" opacity={0.6+i*0.08}/>
      ))
    )}
  </g>
)

const Sparkle = ({ x, y, size }) => (
  <g transform={`translate(${x} ${y}) scale(${size/8})`}>
    <path d="M0 -8 L1.8 -1.8 L8 0 L1.8 1.8 L0 8 L-1.8 1.8 L-8 0 L-1.8 -1.8Z" fill="#fffcf0" opacity="0.9"/>
    <circle r="2" fill="#fff8e8" opacity="0.7"/>
  </g>
)

const Butterfly = ({ x, y, scale, color }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M0 0 C16 -16 34 -12 26 8 C18 22 6 18 0 8Z" fill={color} opacity="0.88"/>
    <path d="M0 0 C-16 -16 -34 -12 -26 8 C-18 22 -6 18 0 8Z" fill={color} opacity="0.88"/>
    <path d="M0 8 C12 4 24 8 22 20 C18 28 6 26 0 18Z" fill={color} opacity="0.7"/>
    <path d="M0 8 C-12 4 -24 8 -22 20 C-18 28 -6 26 0 18Z" fill={color} opacity="0.7"/>
    <circle cx="10" cy="0" r="4" fill="#fff" opacity="0.2"/>
    <circle cx="-10" cy="0" r="4" fill="#fff" opacity="0.2"/>
    <path d="M-1 -4 L1 -4 L1 22 L-1 22Z" rx="1" fill="#2a1a08" opacity="0.7"/>
    <path d="M0 -4 C-4 -12 -6 -18 -8 -22" stroke="#2a1a08" strokeWidth="0.8" fill="none"/>
    <path d="M0 -4 C4 -12 6 -18 8 -22" stroke="#2a1a08" strokeWidth="0.8" fill="none"/>
    <circle cx="-8" cy="-22" r="1.5" fill="#2a1a08"/>
    <circle cx="8" cy="-22" r="1.5" fill="#2a1a08"/>
  </g>
)

// ─── 3D Cone Wrap ─────────────────────────────────────────────────────────────
// The key insight: the wrap is a CONE that the flowers emerge FROM
// Top opening = ellipse around where stems enter
// Bottom = pointed base or flat bottom held in hand
const Wrap = ({ style, palette }) => {
  if (style === 'none') return null
  const isKraft = style === 'kraft'

  // Cone colors with strong depth gradients
  const cLight  = isKraft ? '#e8cba8' : palette.wrap[0]
  const cBase   = isKraft ? '#d4b488' : palette.wrapMid
  const cDark   = isKraft ? '#b89060' : palette.wrapDark
  const cShadow = isKraft ? '#9a7848' : palette.wrapShadow

  // The cone: wide at top (~x:80..520 at y:462), narrow at bottom (~x:240..360 at y:690)
  // Left face, right face, front face approach
  return (
    <g>
      {/* ─ BACK of cone (slightly behind) */}
      <path
        d="M300 462 L80 462 L200 700 L300 710 Z"
        fill={cDark} opacity="0.55"
      />
      <path
        d="M300 462 L520 462 L400 700 L300 710 Z"
        fill={cDark} opacity="0.45"
      />

      {/* ─ LEFT face of cone (angled, darker) */}
      <path
        d="M80 462 L300 462 L300 710 L208 698 Z"
        fill={cDark}
      />
      {/* Left face inner crease shading */}
      <path
        d="M130 462 L300 462 L300 710 L210 698 Z"
        fill={cShadow} opacity="0.35"
      />

      {/* ─ RIGHT face of cone (angled, slightly lighter) */}
      <path
        d="M520 462 L300 462 L300 710 L392 698 Z"
        fill={cBase}
      />
      {/* Right face inner crease shading */}
      <path
        d="M470 462 L300 462 L300 710 L390 698 Z"
        fill={cDark} opacity="0.25"
      />

      {/* ─ CENTER/FRONT panel — the face that catches light */}
      <path
        d="M135 462 L465 462 L370 698 L230 698 Z"
        fill={cLight}
      />

      {/* Center crease line — gives it the folded paper look */}
      <path
        d="M300 462 L300 700"
        stroke={cShadow} strokeWidth="1.8" fill="none" opacity="0.5"
      />

      {/* Paper texture fold lines on left panel */}
      {[0,1,2,3].map(i => (
        <path key={i}
          d={`M${178+i*9} 468 L${224+i*7} 694`}
          stroke={cShadow} strokeWidth="0.8" fill="none" opacity={0.18 + i*0.04}/>
      ))}
      {/* Paper texture fold lines on right panel */}
      {[0,1,2,3].map(i => (
        <path key={i}
          d={`M${422-i*9} 468 L${376-i*7} 694`}
          stroke={cShadow} strokeWidth="0.8" fill="none" opacity={0.18 + i*0.04}/>
      ))}

      {/* ─ Top opening ellipse — where flowers emerge from */}
      <ellipse cx="300" cy="462" rx="220" ry="24"
        fill={cDark} opacity="0.7"
      />
      {/* Top opening rim highlight */}
      <ellipse cx="300" cy="458" rx="218" ry="18"
        fill="none" stroke={cLight} strokeWidth="2" opacity="0.6"
      />
      {/* Inside of the opening (dark) */}
      <ellipse cx="300" cy="464" rx="195" ry="14"
        fill={cShadow} opacity="0.55"
      />

      {/* ─ Bottom point / base */}
      <path
        d="M230 698 L300 714 L370 698 Z"
        fill={cDark} opacity="0.9"
      />
      <ellipse cx="300" cy="712" rx="36" ry="7"
        fill={cShadow} opacity="0.7"
      />

      {/* ─ Left folded-over edge triangle (gives 3D depth) */}
      <path
        d="M80 462 L140 462 L225 692 L200 700 Z"
        fill={cShadow} opacity="0.55"
      />
      {/* ─ Right folded-over edge triangle */}
      <path
        d="M520 462 L460 462 L375 692 L400 700 Z"
        fill={cShadow} opacity="0.45"
      />

      {/* Specular/sheen highlight on center front panel */}
      <path
        d="M215 468 Q258 520 248 695"
        stroke="#ffffff" strokeWidth="14" fill="none" opacity="0.06" strokeLinecap="round"
      />
      <path
        d="M225 468 Q265 520 256 695"
        stroke="#ffffff" strokeWidth="6" fill="none" opacity="0.09" strokeLinecap="round"
      />

      {/* ─ Ribbon / tie at the throat */}
      {style === 'satin' && (
        <g>
          {/* Ribbon band wrapping the cone */}
          <path d="M162 542 Q300 570 438 542 Q300 518 162 542Z"
            fill={palette.ribbon[0]} opacity="0.92"/>
          <path d="M166 550 Q300 577 434 550 Q300 526 166 550Z"
            fill={palette.ribbon[1]} opacity="0.72"/>
          {/* Bow left loop */}
          <path d="M300 546 C264 522 232 514 240 534 C246 548 278 548 300 546Z"
            fill={palette.ribbon[0]}/>
          {/* Bow right loop */}
          <path d="M300 546 C336 522 368 514 360 534 C354 548 322 548 300 546Z"
            fill={palette.ribbon[0]}/>
          {/* Bow knot */}
          <ellipse cx="300" cy="546" rx="14" ry="10" fill={palette.ribbon[1]}/>
          <ellipse cx="300" cy="546" rx="8" ry="6" fill={palette.ribbon[0]}/>
          <ellipse cx="300" cy="546" rx="4" ry="3" fill={palette.ribbon[1]}/>
          {/* Trailing ribbon ends */}
          <path d="M293 555 C285 570 275 580 272 596"
            stroke={palette.ribbon[1]} strokeWidth="5.5" fill="none" strokeLinecap="round"/>
          <path d="M307 555 C315 570 325 580 328 596"
            stroke={palette.ribbon[1]} strokeWidth="5.5" fill="none" strokeLinecap="round"/>
          {/* Ribbon end notch */}
          <path d="M268 596 L272 604 L276 596Z" fill={palette.ribbon[1]}/>
          <path d="M324 596 L328 604 L332 596Z" fill={palette.ribbon[1]}/>
          {/* Ribbon shadow on cone */}
          <path d="M162 548 Q300 575 438 548"
            stroke={palette.ribbonDark || palette.ribbon[1]} strokeWidth="3" fill="none" opacity="0.3"/>
        </g>
      )}
      {style === 'twine' && (
        <g>
          <path d="M170 545 Q300 572 430 545" stroke="#b08050" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <path d="M170 551 Q300 578 430 551" stroke="#c89060" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <path d="M170 539 Q300 564 430 539" stroke="#a07040" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6"/>
          <ellipse cx="300" cy="558" rx="14" ry="10" fill="#b08050" opacity="0.95"/>
          <ellipse cx="300" cy="558" rx="8" ry="6" fill="#c89060"/>
          <ellipse cx="300" cy="558" rx="4" ry="3" fill="#d8a870"/>
        </g>
      )}
      {style === 'kraft' && (
        <g>
          <path d="M175 548 Q300 575 425 548" stroke="#c8a060" strokeWidth="3" fill="none"/>
          <path d="M180 554 Q300 580 420 554" stroke="#b89050" strokeWidth="2.5" fill="none" opacity="0.7"/>
          {/* Raffia knot */}
          <ellipse cx="300" cy="558" rx="12" ry="8" fill="#c8a060" opacity="0.85"/>
          <path d="M294 558 C290 548 284 538 280 530" stroke="#b89050" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <path d="M306 558 C310 548 316 538 320 530" stroke="#b89050" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        </g>
      )}
    </g>
  )
}

// ─── Stem bundle inside cone ──────────────────────────────────────────────────
const StemBundle = ({ palette }) => (
  <g>
    {/* Stems visible just below opening */}
    <path d="M258 468 L272 700 L276 700 L262 468 Z" fill={palette.stemDark} opacity="0.6"/>
    <path d="M282 466 L292 700 L296 700 L286 466 Z" fill={palette.stem} opacity="0.7"/>
    <path d="M300 465 L300 700 L304 700 L304 465 Z" fill={palette.stemDark} opacity="0.65"/>
    <path d="M318 466 L308 700 L312 700 L322 466 Z" fill={palette.stem} opacity="0.7"/>
    <path d="M342 468 L328 700 L332 700 L346 468 Z" fill={palette.stemDark} opacity="0.6"/>
    {/* Bottom binding */}
    <rect x="252" y="680" width="96" height="14" rx="7" fill={palette.wrap[0]} opacity="0.9"/>
    <path d="M260 693 Q300 702 340 693" stroke={palette.wrapMid || palette.wrap[1]} strokeWidth="1.8" fill="none" opacity="0.6"/>
  </g>
)

const HeartShape = ({ x, y, size, color, rotate = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${size})`}>
    <path d="M0 -7 C0 -13 11 -13 11 -4 C11 2 0 9 0 13 C0 9 -11 2 -11 -4 C-11 -13 0 -13 0 -7Z" fill={color}/>
  </g>
)

// ─── Main BouquetSvg ──────────────────────────────────────────────────────────
const BouquetSvg = memo(function BouquetSvg({ answers, message, svgRef, className }) {
  const groupRef = useRef(null)

  const paletteKey  = answers[1] || 'pastel'
  const palette     = paletteMap[paletteKey] || paletteMap.pastel
  const flowerType  = answers[2] || 'rose'
  const count       = sizeMap[answers[3]] || 9
  const wrapStyle   = answers[5] || 'satin'
  const extra       = answers[6] || 'babys-breath'
  const mood        = answers[0] || 'romantic'
  const tagText     = (message || answers[7] || 'Always for you.').slice(0, 60)

  const tagLayout = useMemo(() => {
    const length = tagText.length
    const fontSize = length > 36 ? 16 : length > 28 ? 18 : 20
    const maxLen = fontSize >= 20 ? 18 : fontSize >= 18 ? 20 : 22
    const lines = wrapText(tagText, maxLen, 3)
    const lineHeight = fontSize + 6
    const startY = 672 - ((lines.length - 1) * lineHeight) / 2
    return { lines, fontSize, lineHeight, startY, x: 75 }
  }, [tagText])

  const flowers = useMemo(() => {
    const pL = palette.petalLight
    const pB = palette.petalBase
    const pM = palette.petalMid
    const pD = palette.petalDark
    const c  = palette.center
    const cD = palette.centerDark
    return flowerPositions.slice(0, count).map((pos, i) => ({
      ...pos,
      colors: {
        petalLight:  pL[i % pL.length],
        petalBase:   pB[i % pB.length],
        petalMid:    pM[i % pM.length],
        petalDark:   pD[i % pD.length],
        center:      c[i % c.length],
        centerDark:  cD[i % cD.length],
        stamen:      palette.stamen,
      }
    }))
  }, [count, palette])

  const leaves = useMemo(() => {
    return flowers.slice(0, Math.min(flowers.length, 16)).map((f, i) => ({
      x: lerp(300, f.x, 0.55) + (i%3-1)*10,
      y: lerp(655, f.y, 0.52) - 10,
      scale: 0.75 + (i % 3) * 0.1,
      rotate: (i%2===0 ? -35 : 32) + (f.x-300)*0.06,
      color: palette.leaves[i % palette.leaves.length],
      veinColor: palette.leafVein,
    }))
  }, [flowers, palette])

  const canopyLeaves = useMemo(() => [
    { x:145, y:182, scale:1.22, rotate:-28 },
    { x:215, y:164, scale:1.38, rotate:-12 },
    { x:300, y:155, scale:1.48, rotate:  4 },
    { x:385, y:164, scale:1.32, rotate: 18 },
    { x:455, y:182, scale:1.18, rotate: 30 },
    { x:112, y:230, scale:1.12, rotate:-36 },
    { x:488, y:230, scale:1.12, rotate: 36 },
  ].map((l, i) => ({ ...l, color: palette.leaves[i % palette.leaves.length], veinColor: palette.leafVein })),
  [palette])

  const sprigs = useMemo(() => [
    { x:105, y:278, scale:1.08, rotate:-22 },
    { x:495, y:278, scale:1.08, rotate: 22 },
    { x:128, y:332, scale:0.94, rotate:-30 },
    { x:472, y:332, scale:0.94, rotate: 30 },
    { x:162, y:235, scale:0.90, rotate:-14 },
    { x:438, y:235, scale:0.90, rotate: 14 },
  ].map((s, i) => ({ ...s, color: palette.leaves[i % palette.leaves.length] })),
  [palette])

  const babyBreath = useMemo(() => {
    if (extra !== 'babys-breath') return []
    return flowers.slice(0, 14).map((f, i) => ({
      x: f.x + (i%2===0 ? -18 : 16),
      y: f.y - 22,
    }))
  }, [extra, flowers])

  const sparkles = useMemo(() => {
    if (extra !== 'glitter') return []
    return flowers.filter((_,i)=>i%2===0).map((f, i) => ({
      x: f.x + (i%3)*14 - 12,
      y: f.y - 36,
      size: 6 + (i%4)*1.5,
    }))
  }, [extra, flowers])

  const butterflies = useMemo(() => {
    if (extra !== 'butterflies') return []
    return [
      { x:178, y:178, scale:0.97 },
      { x:420, y:186, scale:0.84 },
      { x:316, y:145, scale:0.74 },
    ]
  }, [extra])

  useEffect(() => {
    if (!groupRef.current) return
    gsap.fromTo(
      groupRef.current,
      { scale:0.72, opacity:0.5, transformOrigin:'50% 65%' },
      { scale:1, opacity:1, duration:2, ease:'power3.out' }
    )
  }, [paletteKey, flowerType, count, wrapStyle, extra, mood, tagText])

  const glowOp = mood==='dreamy' ? 0.55 : mood==='romantic' ? 0.45 : 0.30
  const gradId = paletteKey

  return (
    <svg
      ref={svgRef}
      className={`bouquet-svg ${className||''}`}
      viewBox="0 0 600 780"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Custom bouquet"
    >
      <defs>
        <radialGradient id={`bloomGlow_${gradId}`} cx="50%" cy="40%" r="58%">
          <stop offset="0%"   stopColor={palette.glow} stopOpacity={glowOp}/>
          <stop offset="100%" stopColor={palette.glow} stopOpacity="0"/>
        </radialGradient>

        {/* Cone face gradients for depth */}
        <linearGradient id={`coneLeft_${gradId}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%"   stopColor={palette.wrapDark || palette.wrapShadow}/>
          <stop offset="100%" stopColor={palette.wrap[0]}/>
        </linearGradient>
        <linearGradient id={`coneRight_${gradId}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%"   stopColor={palette.wrap[0]}/>
          <stop offset="100%" stopColor={palette.wrapDark || palette.wrapShadow}/>
        </linearGradient>
        <linearGradient id={`coneCenter_${gradId}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%"   stopColor={palette.wrap[0]}/>
          <stop offset="60%"  stopColor={palette.wrapMid || palette.wrap[1]}/>
          <stop offset="100%" stopColor={palette.wrapDark || palette.wrapShadow}/>
        </linearGradient>

        <radialGradient id={`vignette_${gradId}`} cx="50%" cy="50%" r="70%">
          <stop offset="60%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#000" stopOpacity="0.18"/>
        </radialGradient>

        <filter id="softDrop" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="16" stdDeviation="18" floodColor="#0a0510" floodOpacity="0.38"/>
        </filter>
        <filter id="leafShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="4" stdDeviation="5" floodColor="#0a0510" floodOpacity="0.2"/>
        </filter>

        {/* Clip path to hide stems inside cone */}
        <clipPath id={`aboveWrap_${gradId}`}>
          {/* Everything above the wrap opening + inside the cone is visible */}
          <rect x="0" y="0" width="600" height="470"/>
        </clipPath>
      </defs>

      {/* ── Background ── */}
      <rect width="600" height="780" fill={palette.bg1}/>
      <ellipse cx="470" cy="230" rx="170" ry="130" fill={palette.bgSpot1} opacity="0.65"/>
      <ellipse cx="130" cy="200" rx="130" ry="100" fill={palette.bgSpot2} opacity="0.55"/>
      <ellipse cx="320" cy="110" rx="95" ry="65" fill={palette.bgSpot2} opacity="0.30"/>
      <ellipse cx="420" cy="100" rx="72" ry="46" fill="#ffffff" opacity="0.40"/>

      {/* ── Table ── */}
      <rect x="0" y="645" width="600" height="135" fill={palette.table}/>
      <rect x="0" y="645" width="600" height="18" fill={palette.tableSurf} opacity="0.9"/>
      {/* Table edge lip */}
      <rect x="0" y="655" width="600" height="4" fill={palette.tableEdge || palette.table} opacity="0.6"/>

      {/* Fallen petals */}
      {[
        {cx:148,cy:665,rx:14,ry:7,rot:-22,op:0.65},
        {cx:420,cy:670,rx:11,ry:6,rot:16, op:0.55},
        {cx:232,cy:672,rx:9, ry:5,rot:-8, op:0.5 },
        {cx:382,cy:663,rx:10,ry:6,rot:28, op:0.6 },
        {cx:482,cy:658,rx:8, ry:5,rot:-32,op:0.45},
        {cx:128,cy:675,rx:7, ry:4,rot:10, op:0.4 },
        {cx:512,cy:672,rx:9, ry:5,rot:20, op:0.5 },
        {cx:340,cy:668,rx:8, ry:4,rot:-5, op:0.38},
      ].map((p,i)=>(
        <ellipse key={i} cx={p.cx} cy={p.cy} rx={p.rx} ry={p.ry}
          fill={palette.petal} opacity={p.op}
          transform={`rotate(${p.rot} ${p.cx} ${p.cy})`}/>
      ))}

      {/* Glow overlay */}
      <rect width="600" height="780" fill={`url(#bloomGlow_${gradId})`}/>

      {/* ── Main bouquet group ── */}
      <g ref={groupRef} filter="url(#softDrop)">

        {/* ── STEMS (clipped above wrap opening) ── */}
        <g opacity="0.88" clipPath={`url(#aboveWrap_${gradId})`}>
          {flowers.map((f, i) => {
            const cx = lerp(300, f.x, 0.44) + (f.x-300)*0.12
            const cy = lerp(462, f.y, 0.44)
            return (
              <g key={i}>
                <path
                  d={`M300 462 Q${cx} ${cy} ${f.x} ${f.y+22}`}
                  stroke={palette.stemDark} strokeWidth="5.5"
                  strokeLinecap="round" fill="none" opacity="0.4"
                />
                <path
                  d={`M300 460 Q${cx} ${cy} ${f.x} ${f.y+20}`}
                  stroke={palette.stem} strokeWidth="4"
                  strokeLinecap="round" fill="none"
                />
              </g>
            )
          })}
        </g>

        {/* ── Canopy leaves ── */}
        <g filter="url(#leafShadow)" clipPath={`url(#aboveWrap_${gradId})`}>
          {canopyLeaves.map((l, i) => <LeafShape key={i} {...l}/>)}
          {sprigs.map((s, i) => <SprigShape key={i} {...s}/>)}
          {leaves.map((l, i) => <LeafShape key={i} {...l}/>)}
        </g>

        {/* ── Flowers sorted back to front ── */}
        <g clipPath={`url(#aboveWrap_${gradId})`}>
          {[...flowers]
            .sort((a,b) => a.z - b.z)
            .map((f, i) => (
              <g key={i} transform={`translate(${f.x} ${f.y}) rotate(${f.rotate}) scale(${f.scale})`}>
                <FlowerShape type={flowerType} colors={f.colors}/>
              </g>
            ))
          }
        </g>

        {/* Baby's breath */}
        <g clipPath={`url(#aboveWrap_${gradId})`}>
          {babyBreath.map((b, i) => <BabyBreath key={i} {...b}/>)}
        </g>

        {/* Sparkles */}
        {sparkles.map((s, i) => <Sparkle key={i} {...s}/>)}

        {/* Butterflies */}
        {butterflies.map((b, i) => (
          <Butterfly key={i} {...b} color={palette.petal}/>
        ))}

        {/* ── 3D Cone wrap — drawn OVER stems/flowers at cone region ── */}
        <Wrap style={wrapStyle} palette={palette}/>

        {/* Stem bundle inside cone at bottom */}
        <StemBundle palette={palette}/>

      </g>

      {/* ── Decorative ribbon curl ── */}
      <path
        d="M248 530 Q214 568 184 600"
        stroke={palette.ribbon[0]} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7"
      />
      <HeartShape x={174} y={618} size={3.0} color={palette.ribbon[0]} rotate={-14}/>

      {/* ── Gift tag ── */}
      <g transform="rotate(-9 165 684)">
        <rect x="52" y="632" width="220" height="100" rx="10"
          fill="#faf6f0" stroke={palette.ribbon[0]} strokeWidth="2.2"/>
        <circle cx="72" cy="642" r="5" fill="none" stroke={palette.ribbon[0]} strokeWidth="1.5"/>
        <path d={`M72 637 Q75 627 80 622 Q88 615 95 619`}
          stroke={palette.ribbon[1]} strokeWidth="1.2" fill="none"/>
        <HeartShape x={66}  y={632} size={0.68} color={palette.ribbon[0]} rotate={8} />
        <HeartShape x={250} y={698} size={0.65} color={palette.ribbon[0]} rotate={-6} />
        <HeartShape x={112} y={714} size={0.52} color={palette.ribbon[1]} rotate={5} />
        <text fontFamily="'Playfair Display', Georgia, serif" fontSize={tagLayout.fontSize}
          fontStyle="italic" fill={palette.petalDark[0]}>
          {tagLayout.lines.map((line, i) => (
            <tspan key={i} x={tagLayout.x} y={tagLayout.startY + i * tagLayout.lineHeight}>
              {line}
            </tspan>
          ))}
        </text>
      </g>

      {/* ── Corner hearts ── */}
      <HeartShape x={468} y={686} size={6.5} color={palette.ribbon[0]} rotate={12}/>
      <HeartShape x={490} y={666} size={3.8} color={palette.ribbon[1]} rotate={20}/>
      <HeartShape x={452} y={706} size={2.2} color={palette.petal} rotate={-8}/>

      {/* Vignette */}
      <rect width="600" height="780" fill={`url(#vignette_${gradId})`}/>
    </svg>
  )
})

export default BouquetSvg