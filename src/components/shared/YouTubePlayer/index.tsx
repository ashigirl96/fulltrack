import YouTube from 'react-youtube'
import { SetReadyEventStateType } from '@/hooks/youtube_player'
import { useYouTubePlayer } from './useYouTubePlayer'
import { useHandlePlayerController } from './useHandlePlayerController'
import { useHandleVolume } from './useHandleVolume'

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

export function useYouTubePlayerComponent(
  setReadyEventState: SetReadyEventStateType,
) {
  const [readyEvent, handleReady] = setReadyEventState
  const handlePlayerController = useHandlePlayerController(readyEvent)
  const handleVolume = useHandleVolume(readyEvent)

  return {
    YouTubePlayer,
    handleReady,
    handlePlayerController,
    handleVolume,
  }
}

export type ReturnTypeOfUseYouTubePlayerComponent = ReturnType<
  typeof useYouTubePlayerComponent
>
