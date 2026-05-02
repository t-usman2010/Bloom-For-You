import React from 'react'

const Footer = ({ theme = {} }) => {
  const defaultStyle = {
    container: {
      position: 'fixed',
      left: '50%',
      bottom: '16px',
      width: 'min(calc(100vw - 32px), 920px)',
      zIndex: 6,
      transform: 'translateX(-50%)',
      pointerEvents: 'none',
      color: 'var(--cream, #f9f4ef)',
    },
  }

  const style = {
    container: { ...defaultStyle.container, ...(theme.container || {}) },
    inner: { ...(theme.inner || {}) },
  }

  return (
    <footer style={style.container} role="contentinfo">
      <div className="app-footer glass-panel" style={style.inner}>
        <span className="app-footer__label">Made by</span>
        <span className="app-footer__name">TAHA USMAN</span>
      </div>
    </footer>
  )
}

export default Footer
