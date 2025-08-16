// src/components/Layout.jsx
import React from 'react'

/**
 * Layout component with:
 * - subtle animated background + decorative side prints
 * - `header` prop renders full-bleed (outside centered container)
 * - children rendered inside the centered content area
 *
 * Usage:
 * <Layout header={<Navbar/>}>
 *   <Outlet />
 * </Layout>
 */
const Layout = ({ header, children }) => {
  return (
    <div className="__site-layout">
      {/* inline styles to ensure they load */}
      <style>{`
        .__site-layout {
          position: relative;
          min-height: 100vh;
          background: linear-gradient(180deg, rgba(255,243,224,1) 0%, rgba(255,248,240,1) 12%, #ffffff 100%);
          overflow-x: hidden;
          -webkit-font-smoothing:antialiased;
          -moz-osx-font-smoothing:grayscale;
        }

        /* full-bleed header wrapper (will be above prints) */
        .__site-header {
          position: relative;
          z-index: 60; /* above prints and overlay */
          width: 100%;
        }

        /* center container for page body */
        .__site-container {
          position: relative;
          z-index: 40; /* above overlay/prints but below header */
          max-width: 1280px;
          margin: 0 auto;
          padding: 40px 18px;
        }

        /* subtle animated gradient overlay */
        .__gradient-overlay {
          position: absolute;
          inset: 0;
          z-index: 5;
          pointer-events: none;
          background: linear-gradient(120deg, rgba(255,235,205,0.06) 0%, rgba(236,239,255,0.04) 40%, rgba(255,245,230,0.03) 100%);
          mix-blend-mode: overlay;
          animation: __gradShift 14s linear infinite;
          opacity: 0.9;
        }
        @keyframes __gradShift {
          0% { transform: translateX(-2%) translateY(0) scale(1); }
          50% { transform: translateX(2%) translateY(-1%) scale(1.02); }
          100% { transform: translateX(-2%) translateY(0) scale(1); }
        }

        /* decorative SVG wrappers (low-contrast prints) */
        .__print {
          position: absolute;
          top: 6%;
          bottom: 6%;
          width: 32vw;
          max-width: 480px;
          z-index: 2;
          filter: blur(20px) saturate(110%);
          opacity: 0.08;
          pointer-events: none;
        }
        .__left { left: -6%; transform: rotate(-6deg); }
        .__right { right: -6%; transform: rotate(6deg); }

        /* responsive: hide prints on small screens */
        @media (max-width: 900px) {
          .__print { display: none; }
          .__site-container { padding-left: 16px; padding-right: 16px; }
        }
      `}</style>

      {/* gradient overlay */}
      <div className="__gradient-overlay" aria-hidden />

      {/* left decorative blob (SVG) */}
      <div className="__print __left" aria-hidden>
        <svg viewBox="0 0 600 800" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g1" x1="0" x2="1">
              <stop offset="0%" stopColor="rgba(245,199,79,1)"/>
              <stop offset="100%" stopColor="rgba(99,102,241,0.9)"/>
            </linearGradient>
            <filter id="blur1" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="40" />
            </filter>
          </defs>

          <g filter="url(#blur1)">
            <ellipse cx="160" cy="160" rx="160" ry="200" fill="url(#g1)" opacity="0.9" />
            <ellipse cx="360" cy="420" rx="260" ry="260" fill="rgba(255,215,140,0.32)" />
          </g>
        </svg>
      </div>

      {/* right decorative blob (SVG) */}
      <div className="__print __right" aria-hidden>
        <svg viewBox="0 0 600 800" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g2" x1="0" x2="1">
              <stop offset="0%" stopColor="rgba(96,165,250,0.95)"/>
              <stop offset="100%" stopColor="rgba(250,204,21,0.85)"/>
            </linearGradient>
            <filter id="blur2" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="40" />
            </filter>
          </defs>

          <g filter="url(#blur2)">
            <ellipse cx="420" cy="160" rx="160" ry="200" fill="url(#g2)" opacity="0.92" />
            <ellipse cx="120" cy="480" rx="200" ry="200" fill="rgba(255,245,230,0.28)" />
          </g>
        </svg>
      </div>

      {/* full-bleed header area (put navbar here) */}
      {header && <div className="__site-header">{header}</div>}

      {/* centered content container */}
      <div className="__site-container">
        {children}
      </div>
    </div>
  )
}

export default Layout
