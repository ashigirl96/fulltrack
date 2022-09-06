import { useCallback } from 'react'
import { YouTubeEvent, YouTubePlayerType } from '@/types'
import { getPlayerStateKey, getPropsOptions } from '@/lib/youtube'
import { useCurrentVideoTerm, useSetNextVideo } from '@/hooks/youtube_player'
import {
  useCurrentPlayerStatus,
  useSetCurrentPlayerStatus,
} from '@/atoms/youtubePlayer'

export function useHandleStateChange() {
  const setNextVideo = useSetNextVideo()
  const setCurrentPlayerStatus = useSetCurrentPlayerStatus()
  return useCallback(
    async (readyEvent: YouTubePlayerType | undefined) => {
      if (readyEvent) {
        const status = getPlayerStateKey(await readyEvent.getPlayerState())
        setCurrentPlayerStatus(status)
        switch (status) {
          case 'BUFFERING':
            break
          case 'PAUSED':
            break
          case 'VIDEO_CUED':
            break
          case 'UN_STARTED':
            break
          case 'ENDED':
            await setNextVideo()
            break
          case 'PLAYING':
            break
        }
      }
    },
    [setCurrentPlayerStatus, setNextVideo],
  )
}

export type YouTubePlayerArgs = {
  handleReady: (x: YouTubeEvent) => void
}
export function useYouTubePlayer({ handleReady }: YouTubePlayerArgs) {
  const handleStateChange = useHandleStateChange()
  const videoTerm = useCurrentVideoTerm()

  // TODO: リファクタリング
  let videoId = ''
  let opts = undefined
  if (videoTerm) {
    const { videoId: _videoId, start, end } = videoTerm
    opts = getPropsOptions({ start, end, controls: 0 })
    videoId = _videoId
  }

  return {
    videoId,
    opts,
    handleStateChange,
    handleReady: handleReady,
  }
}

export function useHandleTogglePlayButton(
  readyEvent: YouTubePlayerType | undefined,
) {
  const currentPlayerStatus = useCurrentPlayerStatus()
  return useCallback(async () => {
    if (readyEvent) {
      switch (currentPlayerStatus) {
        case 'PAUSED':
          await readyEvent.playVideo()
          break
        case 'PLAYING':
          await readyEvent.pauseVideo()
          break
        default:
          break
      }
    }
  }, [currentPlayerStatus, readyEvent])
}
