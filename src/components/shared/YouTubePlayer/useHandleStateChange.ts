import { useCallback } from 'react'
import { YouTubePlayerType } from '@/types'
import { getPlayerStateKey } from '@/lib/youtube'
import { useSetNextVideo } from '@/atoms/youtubePlayer/hooks'
import { useSetCurrentPlayerStatus } from '@/atoms/youtubePlayer'

// プレイヤーの状態が変わったときに呼ばれる
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
