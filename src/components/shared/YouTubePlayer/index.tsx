import { useHandleTogglePlayButton, useYouTubePlayer } from './useYouTubePlayer'
import YouTube from 'react-youtube'
import { useSetReadyEventState } from '@/hooks/youtube_player'
import { YouTubeEvent } from '@/types'

type Props = {
  handleReady: (x: YouTubeEvent) => void
}
export function YouTubePlayer({ handleReady }: Props) {
  const { videoId, opts, handleStateChange } = useYouTubePlayer({
    handleReady,
  })

  return (
    <YouTube
      className={`h-48 flex items-center justify-center overflow-y-clip pointer-events-none ${
        !videoId && 'hidden'
      }`}
      videoId={videoId}
      opts={opts}
      onStateChange={(event) => handleStateChange(event.target)}
      onReady={handleReady}
    />
  )
}

export function useYouTubePlayerComponent() {
  const [readyEvent, handleReady] = useSetReadyEventState()
  const handleTogglePlayButton = useHandleTogglePlayButton(readyEvent)

  return {
    YouTubePlayer,
    handleReady,
    handleTogglePlayButton,
  }
}

export type ReturnTypeOfUseYouTubePlayerComponent = ReturnType<
  typeof useYouTubePlayerComponent
>
