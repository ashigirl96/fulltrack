import { useCallback, useRef, useState } from 'react'
import YouTube, { YouTubeEvent } from 'react-youtube'
import { getPlayerStateKey } from '@/lib/youtube/getPlayerStateKey'

const VIDEOS = [
  {
    videoId: '-kezdg0ggyQ',
    startSeconds: 5,
    endSeconds: 10,
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

function Ios() {
  const [readyEvent, setReadyEvent] = useState<YouTubeEvent | null>(null)
  const [index, setIndex] = useState(0)
  const played = useRef(false)

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
            const video = VIDEOS[index]
            await e.target.loadVideoById({ ...video })
            await e.target.playVideo()
            setIndex(() => (index + 1) % VIDEOS.length)
            played.current = false
          }
          break
        }
        case 'PLAYING':
          played.current = true
          break
      }
    },
    [index, played],
  )

  return (
    <div>
      <YouTube
        opts={{
          playerVars: {
            autoplay: 1,
          },
        }}
        onReady={(e) => {
          setReadyEvent(e)
        }}
        onStateChange={handleStateChange}
      />
      <button
        onClick={async () => {
          const video = VIDEOS[index]
          if (readyEvent) {
            await readyEvent.target.loadVideoById({ ...video })
            await readyEvent.target.playVideo()
            setIndex(() => (index + 1) % VIDEOS.length)
          }
        }}
      >
        Play
      </button>
    </div>
  )
}

export default Ios
