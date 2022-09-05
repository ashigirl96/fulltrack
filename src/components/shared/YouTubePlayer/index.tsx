import YouTube from 'react-youtube'
import { useYouTubePlayer } from './useYouTubePlayer'

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
