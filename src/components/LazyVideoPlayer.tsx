import React, { Suspense } from 'react'

const VideoPlayer = React.lazy(() => import('./CustomVideoPlayer'))

interface LazyVideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  height?: number;
  width?: number;
  className?: string;
}

const LazyVideoPlayer: React.FC<LazyVideoPlayerProps> = (props) => {
  return (
    <Suspense fallback={
      <div className='aspect-video bg-gray-200 animate-pulse rounded-lg'>
        <div className='w-full h-full flex items-center justify-center'>
          <span className='text-gray-400'>Cargando video...</span>
        </div>
      </div>
    }
    >
      <VideoPlayer {...props} />
    </Suspense>
  )
}

export default LazyVideoPlayer
