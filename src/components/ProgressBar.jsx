import { memo } from 'react'

const ProgressBar = memo(function ProgressBar({ value }) {
  const clamped = Math.min(Math.max(value, 0), 1)

  return (
    <div className="progress-track" role="presentation">
      <div className="progress-fill" style={{ width: `${clamped * 100}%` }} />
    </div>
  )
})

export default ProgressBar
