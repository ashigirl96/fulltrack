import { useHandleTogglePlayButton, useYouTubePlayer } from './useYouTubePlayer'
import YouTube, { YouTubePlayer as YouTubePlayerType } from 'react-youtube'
import { useSetReadyEventState } from '@/hooks/youtube_player'
import { YouTubeEvent } from '@/types'

type Props = {
  handleReady: (x: YouTubeEvent) => void
  readyEvent: YouTubePlayerType | undefined
}
export function YouTubePlayer({ handleReady, readyEvent }: Props) {
  const { videoId, opts, handleStateChange } = useYouTubePlayer({
    handleReady,
  })

  return (
    <YouTube
      className=""
      videoId={videoId}
      opts={opts}
      onStateChange={() => handleStateChange(readyEvent)}
      onReady={handleReady}
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

export type ReturnTypeOfUseYouTubePlayerComponent = ReturnType<
  typeof useYouTubePlayerComponent
>
