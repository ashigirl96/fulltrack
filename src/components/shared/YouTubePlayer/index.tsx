import {
  useHandleTogglePlayButton,
  useHandleVolume,
  useYouTubePlayer,
} from './useYouTubePlayer'
import YouTube from 'react-youtube'
import { useSetReadyEventState } from '@/hooks/youtube_player'

type Props = {
  handleReady: ReturnTypeOfUseYouTubePlayerComponent['handleReady']
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
  const handleVolumeWithValue = useHandleVolume(readyEvent)

  return {
    YouTubePlayer,
    handleReady,
    handleTogglePlayButton,
    handleVolumeWithValue,
  }
}

export type ReturnTypeOfUseYouTubePlayerComponent = ReturnType<
  typeof useYouTubePlayerComponent
>
