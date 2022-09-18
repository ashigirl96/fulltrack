import { useCallback } from 'react'
import { YouTubePlayerType } from '@/types'
import { getPlayerStateKey } from '@/lib/youtube'
import { useSetNextVideo } from '@/atoms/youtubePlayer/hooks'
import {
  useCurrentVideoValue,
  useRepeatStatusValue,
  useSetCurrentPlayerStatus,
} from '@/atoms/youtubePlayer'

// プレイヤーの状態が変わったときに呼ばれる
export function useHandleStateChange() {
  const setNextVideo = useSetNextVideo()
  const setCurrentPlayerStatus = useSetCurrentPlayerStatus()
  const repeatStatus = useRepeatStatusValue()
  const currentVideo = useCurrentVideoValue()
  return useCallback(
    async (readyEvent: YouTubePlayerType | undefined) => {
      if (readyEvent && currentVideo) {
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
          case 'ENDED': {
            switch (repeatStatus) {
              case 'repeat-one': {
                const { start } = currentVideo
                await readyEvent.seekTo(start, true)
                break
              }
              default:
                await setNextVideo()
                break
            }
            break
          }
          case 'PLAYING':
            break
        }
      }
    },
    [currentVideo, repeatStatus, setCurrentPlayerStatus, setNextVideo],
  )
}
