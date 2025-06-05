import React from 'react'

import { SlideProps } from './types'

const directionClasses = {
  left: 'animate-slide-left',
  right: 'animate-slide-right',
  up: 'animate-slide-up',
  down: 'animate-slide-down'
}

const Slide: React.FC<SlideProps> = ({ children, direction = 'right', duration = 500 }) => {
  return (
    <div
      className={`absolute inset-0 ${directionClasses[direction]}`}
      style={{ animationDuration: `${duration}ms` }}
    >
      {children}
    </div>
  )
}

export default Slide
