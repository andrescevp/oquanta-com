import React, { useEffect, useState } from 'react'

import { ProgressItemProps } from './types'

const ProgressItem: React.FC<ProgressItemProps> = ({
  children,
  isVisible,
  index,
  delay,
  duration
}) => {
  const [showBackground, setShowBackground] = useState(true)

  useEffect(() => {
    if (isVisible) {
      // Espera a que termine la animación para quitar el fondo
      const timer = setTimeout(
        () => {
          setShowBackground(false)
        },
        duration + index * delay
      )

      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, delay, index])

  return (
    <div className="relative overflow-hidden">
      <div
        className="relative"
        style={{
          clipPath: 'inset(0)',
          transform: isVisible ? 'translateX(0)' : 'translateX(-100%)',
          transition: `all ${duration}ms ease-out`,
          transitionDelay: `${index * delay}ms`
        }}
      >
        <div
          className={`relative transition-colors duration-500`}
          style={{
            backgroundColor: showBackground ? 'rgba(253, 83, 4, 0.3)' : 'transparent'
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default ProgressItem
