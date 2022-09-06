import { useYouTubePlayer } from './useYouTubePlayer'
import YouTube from 'react-youtube'

function YouTubePlayer() {
  const { videoId, opts, handleStateChange, handleReady } = useYouTubePlayer()

  return (
    <YouTube
      videoId={videoId}
      opts={opts}
      onStateChange={handleStateChange}
      onReady={handleReady}
    />
  )
}

export default YouTubePlayer
