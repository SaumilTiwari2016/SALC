import React from 'react'

/**
 * Container component - use to consistently constrain page content.
 * variant: 'narrow' | 'normal' | 'wide'
 *   - narrow: max-w-3xl  (good for articles / forms)
 *   - normal: max-w-7xl  (default comfortable width)
 *   - wide:   max-w-screen-2xl (near full-width on very large screens)
 *
 * Use as:
 * <Container> ... </Container>
 * or <Container variant="wide" className="py-8"> ... </Container>
 */
const Container = ({ children, variant = 'normal', className = '' }) => {
  const map = {
    narrow: 'max-w-3xl',
    normal: 'max-w-7xl',
    wide: 'max-w-screen-2xl',
  }
  const maxClass = map[variant] || map.normal

  return (
    <div className={`w-full px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className={`mx-auto w-full ${maxClass}`}>
        {children}
      </div>
    </div>
  )
}

export default Container
