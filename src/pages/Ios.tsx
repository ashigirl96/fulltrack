import { useCallback, useState } from 'react'
import { useToggle } from 'react-use'
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
  const [status, setStatus] = useState('')
  const [readyEvent, setReadyEvent] = useState<YouTubeEvent | null>(null)
  const [index, setIndex] = useState(0)
  const [toggle, setToggle] = useToggle(false)

  const handleStateChange = useCallback(
    async (e: YouTubeEvent) => {
      if (e) {
        const state = getPlayerStateKey(await e.target.getPlayerState())
        setStatus(state)
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
            console.log(toggle)
            if (!toggle) {
              console.log(`END`)
              const video = VIDEOS[index]
              await e.target.loadVideoById({ ...video })
              await e.target.playVideo()
              setIndex(() => (index + 1) % VIDEOS.length)
              setToggle()
            } else {
              console.log(`END 2nd`)
              setToggle()
            }
            break
          }
          case 'PLAYING':
            break
        }
      }
    },
    [index, setToggle, toggle],
  )

  return (
    <div>
      <p>{status}</p>
      <YouTube
        opts={{
          playerVars: {
            autoplay: 1,
          },
        }}
        onReady={(e) => {
          console.log(`ready!`)
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
