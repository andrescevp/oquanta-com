import React, { useEffect, useRef, useState } from 'react'

import ProgressItem from './ProgressItem'
import { ProgressRevealProps } from './types'

const ProgressReveal: React.FC<ProgressRevealProps> = ({
  children,
  className = '',
  delay = 200,
  duration = 1000
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const items = React.Children.toArray(children)
  const [wasDisplayed, setWasDisplayed] = useState(false)

  useEffect(() => {
    if (wasDisplayed) {
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
        if (entry.isIntersecting) {
          setWasDisplayed(true)
        }
      },
      {
        threshold: 0.1
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className={`space-y-2 ${className}`}>
      {items.map((item, index) => (
        <ProgressItem
          key={index}
          isVisible={isVisible || wasDisplayed}
          index={index}
          delay={delay}
          duration={duration}
        >
          {item}
        </ProgressItem>
      ))}
    </div>
  )
}

export default React.memo(ProgressReveal)
