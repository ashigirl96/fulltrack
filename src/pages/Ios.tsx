import { useCallback, useState } from 'react'
import YouTube, { YouTubeEvent, YouTubeProps } from 'react-youtube'
import PlayerStates from 'youtube-player/dist/constants/PlayerStates'

function Ios() {
  const videoIds = ['-kezdg0ggyQ', '9VhrJCbr58A']
  const [index, setIndex] = useState(0)
  const onPlayerReady = useCallback(async (event: YouTubeEvent) => {
    const states = await event.target.getPlayerState()
    switch (states) {
      case PlayerStates.BUFFERING:
        break
      case PlayerStates.ENDED:
        setIndex((i) => i + 1)
        break
      case PlayerStates.PAUSED:
        break
      case PlayerStates.PLAYING:
        break
      case PlayerStates.UNSTARTED:
        break
      case PlayerStates.VIDEO_CUED:
        break
    }
  }, [])
  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      start: 1,
      end: 5,
      autoplay: 1,
    },
  }
  console.log(`index ${JSON.stringify(index)}`)
  console.log(`videoIds[index] ${JSON.stringify(videoIds[index])}`)

  return (
    <YouTube
      videoId={videoIds[index]}
      opts={opts}
      onReady={onPlayerReady}
      onEnd={() => setIndex((i) => i + 1)}
    />
  )
}

export default Ios
