import YouTube from 'react-youtube'
import { useHandlerReadyEventState } from '@/hooks/youtube_player'
import { useYouTubePlayer } from './useYouTubePlayer'
import { useHandlePlayerController } from './useHandlePlayerController'
import { useHandleVolume } from './useHandleVolume'
import { ReturnTypeSetReadyEvent } from '@/hooks/youtube_player/useSetReadyEvent'
import { useEffect } from 'react'

type Props = Pick<ReturnTypeOfUseYouTubePlayerComponent, 'handleReadyEvent'>
export function YouTubePlayer({ handleReadyEvent }: Props) {
  const { videoId, opts, handleStateChange } = useYouTubePlayer()

  return (
    <>
      {/* 動画が終わった && 動画が再生されてない ときに写真を出す */}
      {!videoId && <div />}
      <YouTube
        className={`h-48 flex items-center justify-center overflow-y-clip pointer-events-none ${
          !videoId && 'hidden'
        }`}
        videoId={videoId}
        opts={opts}
        onStateChange={(event) => handleStateChange(event.target)}
        onReady={handleReadyEvent}
      />
    </>
  )
}

export function useYouTubePlayerComponent({
  setReadyEvent,
  readyEvent,
}: ReturnTypeSetReadyEvent) {
  const { handleReadyEvent } = useHandlerReadyEventState({
    readyEvent,
    setReadyEvent,
  })
  const handlePlayerController = useHandlePlayerController(readyEvent)
  const handleVolume = useHandleVolume(readyEvent)

  return {
    YouTubePlayer,
    handleReadyEvent,
    handlePlayerController,
    handleVolume,
  }
}

export type ReturnTypeOfUseYouTubePlayerComponent = ReturnType<
  typeof useYouTubePlayerComponent
>
