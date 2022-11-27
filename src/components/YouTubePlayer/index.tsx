import YouTube from 'react-youtube'
import { useHandleStateChange } from '@/components/YouTubePlayer/useHandleStateChange'
import { ReturnTypeSetPlayer } from '@/hooks/YouTube/useSetPlayer'
import { getPropsOptions } from '@/lib/youtube/getPropsOptions'

type Props = {
  setPlayer: ReturnTypeSetPlayer['setPlayer']
}
function YouTubePlayer({ setPlayer }: Props) {
  const { handleStateChange } = useHandleStateChange()
  const opts = getPropsOptions({ controls: 0 })
  return (
    <YouTube
      opts={opts}
      onReady={setPlayer}
      onStateChange={handleStateChange}
    />
  )
}

export default YouTubePlayer
