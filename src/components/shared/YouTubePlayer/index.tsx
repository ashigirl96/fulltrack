import {
  useHandleTogglePlayButton,
  useYouTubePlayer,
  YouTubePlayerArgs,
} from './useYouTubePlayer'
import YouTube from 'react-youtube'
import { useSetReadyEventState } from '@/hooks/youtube_player'

type Props = YouTubePlayerArgs
export function YouTubePlayer({ setReadyEvent, readyEvent }: Props) {
  const { videoId, opts, handleStateChange } = useYouTubePlayer({
    setReadyEvent,
    readyEvent,
  })

  return (
    <YouTube
      className="hidden"
      videoId={videoId}
      opts={opts}
      onStateChange={handleStateChange}
      onReady={setReadyEvent}
    />
  )
}

export function useYouTubePlayerComponent() {
  const [readyEvent, handleReady] = useSetReadyEventState()
  const handleTogglePlayButton = useHandleTogglePlayButton(readyEvent)

  return {
    YouTubePlayer,
    readyEvent,
    handleReady,
    handleTogglePlayButton,
  }
}
