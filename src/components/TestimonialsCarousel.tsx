import Markdown from 'marked-react'
import React, { useState, useEffect, useRef } from 'react'

interface TestimonialsCarouselProps {
  testimonials: string[]
}

const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [height, setHeight] = useState(0)
  const testimonialsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
    }, 5000)

    return () => clearInterval(timer)
  }, [testimonials.length])

  useEffect(() => {
    // Actualizar altura cuando cambie el testimonio actual
    const currentTestimonial = testimonialsRef.current[currentIndex]
    if (currentTestimonial) {
      setHeight(currentTestimonial.offsetHeight)
    }
  }, [currentIndex, testimonials])

  return (
    <div className="relative w-full">
      <div className="relative" style={{ height: `${height}px` }}>
        {testimonials.map((testimony, index) => (
          <div
            key={index}
            ref={el => (testimonialsRef.current[index] = el)}
            className={`absolute w-full transition-all duration-500 ease-in-out transform 
              ${
                index === currentIndex
                  ? 'opacity-100 translate-x-0'
                  : index < currentIndex
                    ? 'opacity-0 -translate-x-full'
                    : 'opacity-0 translate-x-full'
              }`}
          >
            {/* <JsonLd<Review>
              item={{
                "@context": "https://schema.org",
                "@type": "Review",
                "reviewBody": testimony,
                "author": {
                  "@type": "Person",
                  "name": "anonymous"
                },
                "itemReviewed": {
                  "@type": "LocalBusiness",
                  "name": "oQuanta",
                  "@id": "https://oquanta.com/#organization"
                },
                // "datePublished": testimonial.datePublished,
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5",
                  "worstRating": "1"
                }
              }}
            /> */}
            <div className="rounded-lg shadow-lg p-4 mx-auto max-w-xl bg-pure-white">
              <svg
                className="w-8 h-8 text-gray-400 mb-4"
                fill="currentColor"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 8c-3.3 0-6 2.7-6 6v10h6V14h-4c0-2.2 1.8-4 4-4zm12 0c-3.3 0-6 2.7-6 6v10h6V14h-4c0-2.2 1.8-4 4-4z" />
              </svg>
              <div className="text-gray-600 mb-6">
                <Markdown>{testimony}</Markdown>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4 gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 
              ${
                index === currentIndex
                  ? 'bg-pumpkin-orange scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default TestimonialsCarousel
