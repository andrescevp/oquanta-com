import React, { useEffect, useRef, useState } from 'react'

import { SlideShowProps } from './types'

const SlideShow: React.FC<SlideShowProps> = ({
  children,
  width = '100%',
  height = '100%',
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const slides = React.Children.toArray(children)
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
        threshold: 0 // Activa cuando al menos 10% del elemento es visible
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  if (slides.length === 0) return null

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Contenedor de todas las diapositivas */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div key={index} className={`absolute inset-0 ${isVisible ? '' : 'opacity-0'}`}>
            {React.cloneElement(slide as React.ReactElement, {
              isVisible
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export default React.memo(SlideShow)
