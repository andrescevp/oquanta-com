import clsx from 'clsx'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import React, { useRef, useState } from 'react'
import LazyLoad from 'react-lazy-load'

import headerImage from './../../images/oquanta-logo-transparent.png?h=80&format=png'
interface CustomVideoPlayerProps {
  src: string
  poster?: string
  title?: string
  height?: number
  width?: number
  className?: string
  isVertical?: boolean
}

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({
  src,
  poster,
  title,
  height,
  width,
  className,
  isVertical = false
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(progress)
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const bounds = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - bounds.left
      const width = bounds.width
      const percentage = x / width
      videoRef.current.currentTime = percentage * videoRef.current.duration
    }
  }

  const handlePlayerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Evitar que se active cuando se hace clic en los controles
    if (
      e.target instanceof Element &&
      (e.target.closest('.controls-bar') || e.target.closest('.progress-bar'))
    ) {
      return
    }
    togglePlay()
  }

  return (
    <div
      className={clsx(
        'relative group overflow-hidden rounded-lg bg-gradient-to-t from-pumpkin-orange to-iris-purple border-2 border-iris-purple cursor-pointer',
        isVertical ? 'aspect-[9/16]' : 'aspect-video',
        height && `h-[${height}px]`,
        width && `w-[${width}px]`,
        className
      )}
      onClick={handlePlayerClick}
    >
      {/* Logo en esquina superior derecha */}
      <div className="absolute top-4 right-4 z-10 opacity-75">
        <LazyLoad>
          <img src={headerImage} alt="oQuanta" className="w-auto h-8" />
        </LazyLoad>
      </div>

      <video
        ref={videoRef}
        className={clsx(
          'w-full h-full object-contain pointer-events-none', // Añadido pointer-events-none
          isVertical ? 'aspect-[9/16]' : 'aspect-video'
        )}
        poster={poster}
        onTimeUpdate={handleTimeUpdate}
      >
        <source src={src} type="video/mp4" />
        Tu navegador no soporta el elemento video.
      </video>

      {/* Botón central de reproducción */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 w-full h-full flex items-center justify-center z-20 group/play"
        >
          <div
            className="w-20 h-20 rounded-full bg-pumpkin-orange/80 flex items-center justify-center
                        transform transition-all duration-300 group-hover/play:scale-110
                        group-hover/play:bg-pumpkin-orange"
          >
            <Play className="w-10 h-10 text-white transform translate-x-1" />
          </div>
        </button>
      )}

      {/* Controles personalizados */}
      <div
        className="absolute inset-0 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/60 to-transparent controls-bar"
        onClick={handlePlayerClick}
      >
        {/* Barra de progreso */}
        <div
          className="w-full h-1 bg-gray-600 cursor-pointer progress-bar"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-pumpkin-orange transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Controles */}
        <div className="flex items-center gap-4 p-4">
          <button
            onClick={togglePlay}
            className="text-white hover:text-pumpkin-orange transition-colors"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>

          <button
            onClick={toggleMute}
            className="text-white hover:text-pumpkin-orange transition-colors"
          >
            {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
          </button>

          {title && <span className="text-white text-sm ml-auto">{title}</span>}
        </div>
      </div>
    </div>
  )
}

export default CustomVideoPlayer
