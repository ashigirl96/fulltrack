import { useCallback } from 'react'
import { getPlayerStateKey } from '@/lib/youtube'
import type { YouTubeEvent } from '@/types'

export function useHandleStateChange() {
  return useCallback(async (event: YouTubeEvent) => {
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
        break
      case 'PLAYING':
        break
    }
  }, [])
}
