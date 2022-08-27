import React from 'react'
import { useAddVideo } from './useAddVideo'
import { getPropsOptions } from '@/lib/youtube'
import YouTube from 'react-youtube'

export default function AddVideo() {
  const {
    videoId,
    setVideoId,
    start,
    setStart,
    end,
    setEnd,
    readyEvent,
    setReadyEvent,
    handleStateChange,
  } = useAddVideo()

  const opts = getPropsOptions({ start, end })

  return (
    <div className="h-screen bg-red-100 flex justify-center items-center">
      <YouTube
        videoId={videoId}
        opts={opts}
        onStateChange={handleStateChange}
        onReady={(e) => setReadyEvent(e.target)}
      />
    </div>
  )
}
