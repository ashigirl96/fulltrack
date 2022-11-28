import { useCallback, useRef } from 'react'
import { YouTubeEvent } from 'react-youtube'
import { getPlayerStateKey } from '@/lib/youtube/getPlayerStateKey'

/*
曲が終わると
- ENDED
- UN_STARTED
- ENDED
- UN_STARTED
- BUFFERING
- UN_STARTED
- PLAYING
 */

// iPhoneで止まるのは、エラー担ってるわけじゃなさそう。単純にENDEDになってる
// iPhoneだと１回しかendedが呼ばれてないケースがある

const VIDEOS = [
  {
    videoId: '-kezdg0ggyQ',
    // startSeconds: 5,
    // endSeconds: 10,
  },
  {
    videoId: '9VhrJCbr58A',
    startSeconds: 10,
    endSeconds: 13,
  },
  {
    videoId: 'kroV2qD0xNo',
    startSeconds: 20,
    endSeconds: 24,
  },
]

export function useHandleStateChange() {
  const played = useRef(false)

  const handleStateChange = useCallback(
    async (e: YouTubeEvent) => {
      const state = getPlayerStateKey(await e.target.getPlayerState())

      switch (state) {
        case 'BUFFERING':
          break
        case 'PAUSED':
          break
        case 'VIDEO_CUED':
          break
        case 'UN_STARTED':
          break
        case 'ENDED': {
          if (played.current) {
            const video = VIDEOS[0]
            await e.target.loadVideoById({ ...video })
            played.current = false
          }
          break
        }
        case 'PLAYING':
          played.current = true
          break
      }
    },
    [played],
  )
  return {
    handleStateChange,
  }
}
