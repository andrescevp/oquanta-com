import React, { useEffect, useState } from 'react'

import { ColorGridProps } from './types'

const colors = [
  'bg-transparent',
  'bg-iris-purple/30',
  'bg-pumpkin-orange/30',
  'bg-lime-green/30',
  'bg-iris-purple/20',
  'bg-pumpkin-orange/20',
  'bg-lime-green/20'
]

const GridCell: React.FC = () => {
  const [currentColor, setCurrentColor] = useState(colors[0])

  useEffect(() => {
    const changeColor = () => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      setCurrentColor(randomColor)
    }

    const interval = setInterval(changeColor, Math.random() * 2000 + 1000) // Entre 1-3 segundos
    return () => clearInterval(interval)
  }, [])

  return <div className={`w-full h-full ${currentColor} transition-colors duration-500`} />
}

const ColorGrid: React.FC<ColorGridProps> = ({
  children,
  width = '100%',
  height = '100%',
  className = '',
  gridSize = 4
}) => {
  const cells = Array(gridSize * gridSize).fill(null)

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {/* Grid Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full grid gap-1"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize}, 1fr)`
          }}
        >
          {cells.map((_, index) => (
            <GridCell key={index} />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}

export default React.memo(ColorGrid)
