import {
  useHandleTogglePlayButton,
  usePlayerStatus,
  useYouTubePlayer,
  YouTubePlayerArgs,
} from './useYouTubePlayer'
import YouTube from 'react-youtube'
import { useSetReadyEventState } from '@/hooks/youtube_player'

type Props = YouTubePlayerArgs
export function YouTubePlayer({ setReadyEvent, playerStatus }: Props) {
  const { videoId, opts, handleStateChange } = useYouTubePlayer({
    setReadyEvent,
    playerStatus,
  })

  return (
    <YouTube
      className=""
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
  const playerStatus = usePlayerStatus(readyEvent)

  return {
    YouTubePlayer,
    readyEvent,
    handleReady,
    handleTogglePlayButton,
    playerStatus,
  }
}
