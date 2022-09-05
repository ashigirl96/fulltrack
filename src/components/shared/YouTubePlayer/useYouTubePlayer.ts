import { useCallback } from 'react'
import { YouTubeEvent } from '@/types'
import { getPlayerStateKey, getPropsOptions } from '@/lib/youtube'
import {
  useCurrentVideoTerm,
  useSetNextVideo,
  useSetReadyEventState,
} from '@/hooks/youtube_player'

export function useHandleStateChange() {
  const setNextVideo = useSetNextVideo()
  return useCallback(
    async (event: YouTubeEvent) => {
      const state = await event.target.getPlayerState()
      switch (getPlayerStateKey(state)) {
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

export function useYouTubePlayer() {
  const handleReady = useSetReadyEventState()
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
    handleReady,
  }
}
