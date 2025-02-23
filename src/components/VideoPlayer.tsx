import React from 'react';
import { Player, BigPlayButton, ControlBar } from 'video-react';
import 'video-react/dist/video-react.css';
import clsx from 'clsx';
interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  height?: number;
  width?: number;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster, title, height = 250, width, className }) => {
  return (
    <div className={clsx("aspect-video", height && `h-[${height}px]`, width && `w-[${width}]`, className)}>
      <Player 
        playsInline
        poster={poster}
        src={src}
        fluid={true}
        height={height}
        width={width}
        preload="auto"
        autoPlay={false}
        muted={false}
      >
        <BigPlayButton position="center" className='!bg-pumpkin-orange !hover:bg-pumpkin-orange-30' />
        <ControlBar autoHide={true} className="!bg-pumpkin-orange-60/80 !text-iris-purple" autoHideTime={300}/>
      </Player>
    </div>
  );
};

export default VideoPlayer;