import { clsx } from 'clsx'
import React, { useEffect, useState } from 'react'

import { WaveBackgroundProps } from './types'

const WavePoint: React.FC<{
  className?: string
  index?: number
}> = ({ className = '', index = 0 }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(
      () => {
        setIsVisible(true)
      },
      200 * (index + 1)
    ) // Retraso escalonado basado en el índice

    return () => clearTimeout(timer)
  }, [index])

  return (
    <div className={`absolute ${className}`}>
      <div
        className="w-40 h-40 rounded-full animate-wave-ripple-1 transition-all duration-500"
        style={{
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: isVisible ? 'rgba(253, 83, 4, 0.5)' : 'transparent'
        }}
      />
      <div
        className="w-40 h-40 rounded-full animate-wave-ripple-2 transition-all duration-500"
        style={{
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: isVisible ? 'rgba(90, 51, 238, 0.5)' : 'transparent'
        }}
      />
      <div
        className="w-40 h-40 rounded-full animate-wave-ripple-3 transition-all duration-500"
        style={{
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: isVisible ? 'rgba(192, 240, 62, 0.8)' : 'transparent'
        }}
      />
    </div>
  )
}

const WaveBackground: React.FC<WaveBackgroundProps> = ({
  children,
  width = '100%',
  height = '100%',
  className = ''
}) => {
  return (
    <div className={clsx(`relative overflow-hidden`, className)} style={{ width, height }}>
      {/* Ondas circulares */}
      <div className="absolute inset-0 z-0">
        {/* Puntos de origen de ondas */}
        <WavePoint className="top-0 right-0 -translate-x-1/2 -translate-y-1/2" index={0} />
        <WavePoint className="bottom-1/2 right-1/2 -translate-x-1/2 translate-y-1/2" index={1} />
        <WavePoint className="bottom-0 left-0 -translate-x-1/2 -translate-y-1/2" index={2} />
      </div>

      {/* Contenido */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default React.memo(WaveBackground)
