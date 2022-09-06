import { useCallback, useEffect, useState } from 'react'
import { YouTubeEvent } from '@/types'
import { getPlayerStateKey, getPropsOptions } from '@/lib/youtube'
import { useCurrentVideoTerm, useSetNextVideo } from '@/hooks/youtube_player'
import { useSetCurrentPlayerStatus } from '@/atoms/youtubePlayer'
import { YouTubePlayer as YouTubePlayerType } from 'react-youtube'
import { PlayerStateKey } from '@/constants/youtube'

export function useHandleStateChange(playerStatus: PlayerStateKey | undefined) {
  const setNextVideo = useSetNextVideo()
  return useCallback(async () => {
    if (playerStatus) {
      switch (playerStatus) {
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
  }, [playerStatus, setNextVideo])
}

export type YouTubePlayerArgs = {
  setReadyEvent: (x: YouTubeEvent) => void
  playerStatus: PlayerStateKey | undefined
}
export function useYouTubePlayer({
  setReadyEvent,
  playerStatus,
}: YouTubePlayerArgs) {
  const handleStateChange = useHandleStateChange(playerStatus)
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

export function usePlayerStatus(readyEvent: YouTubePlayerType | undefined) {
  const [state, setState] = useState<PlayerStateKey>('ENDED')
  const setCurrentPlayerStatus = useSetCurrentPlayerStatus()
  useEffect(() => {
    ;(async () => {
      if (readyEvent) {
        const status = getPlayerStateKey(await readyEvent.getPlayerState())
        setState(status)
        // グローバルで扱えるようにするためのPlayerStatus
        setCurrentPlayerStatus(status)
      }
    })()
  }, [readyEvent, setCurrentPlayerStatus, setState])
  return state
}
