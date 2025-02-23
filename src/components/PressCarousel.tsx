import React, { useState, useEffect, useRef } from 'react'

interface PressPost {
  fields: {
    title: string;
    description: string;
    url: string;
  };
  image: string;
}

export interface PressCarouselProps {
  posts: PressPost[];
}

const PressCarousel: React.FC<PressCarouselProps> = ({ posts }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [height, setHeight] = useState(0)
  const postsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === posts.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(timer)
  }, [posts.length])

  useEffect(() => {
    const currentPost = postsRef.current[currentIndex]
    if (currentPost) {
      setHeight(currentPost.offsetHeight)
    }
  }, [currentIndex, posts])

  return (
    <div className='relative w-full'>
      <div className='relative' style={{ height: `${height}px` }}>
        {posts.map((post, index) => (
          <div
            key={index}
            ref={el => postsRef.current[index] = el}
            className={`absolute w-full transition-all duration-500 ease-in-out transform 
              ${index === currentIndex
? 'opacity-100 translate-x-0'
                : index < currentIndex
? 'opacity-0 -translate-x-full'
                : 'opacity-0 translate-x-full'}`}
          >
            <div className='rounded-lg shadow-lg mx-auto max-w-xl bg-pure-white overflow-hidden'>
              <a
                href={post.fields.url}
                target='_blank'
                rel='noopener noreferrer'
                className='block hover:opacity-95 transition-opacity'
              >
                <div className='relative h-48 overflow-hidden'>
                  <img
                    src={post.image}
                    alt={post.fields.title}
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='p-6'>
                  <h3 className='text-xl font-bold mb-2 text-gray-900 line-clamp-2'>
                    {post.fields.title}
                  </h3>
                  <p className='text-gray-600 line-clamp-3'>
                    {post.fields.description}
                  </p>
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className='flex justify-center mt-4 gap-2'>
        {posts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 
              ${index === currentIndex
                ? 'bg-pumpkin-orange scale-125'
                : 'bg-gray-300 hover:bg-gray-400'}`}
            aria-label={`Ir a la nota de prensa ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default PressCarousel
