import { useCallback } from 'react'
import { YouTubeEvent } from '@/types'
import { getPlayerStateKey, getPropsOptions } from '@/lib/youtube'
import { useCurrentVideoTerm, useSetNextVideo } from '@/hooks/youtube_player'
import { useSetCurrentPlayerStatus } from '@/atoms/youtubePlayer'
import { YouTubePlayer as YouTubePlayerType } from 'react-youtube'

export function useHandleStateChange() {
  const setNextVideo = useSetNextVideo()
  const setCurrentPlayerStatus = useSetCurrentPlayerStatus()
  return useCallback(
    async (event: YouTubeEvent) => {
      const state = await event.target.getPlayerState()
      const status = getPlayerStateKey(state)
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
    },
    [setNextVideo],
  )
}

export type YouTubePlayerArgs = {
  readyEvent: YouTubePlayerType | undefined
  setReadyEvent: (x: YouTubeEvent) => void
}
export function useYouTubePlayer({
  readyEvent,
  setReadyEvent,
}: YouTubePlayerArgs) {
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
    setReadyEvent,
  }
}

export function useHandleTogglePlayButton(
  readyEvent: YouTubePlayerType | undefined,
) {
  return useCallback(async () => {
    if (readyEvent) {
      const status = getPlayerStateKey(await readyEvent.getPlayerState())
      if (status === 'PAUSED') {
        await readyEvent.playVideo()
      } else if (status === 'PLAYING') {
        await readyEvent.pauseVideo()
      }
    }
  }, [readyEvent])
}
