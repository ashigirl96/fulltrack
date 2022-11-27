import dynamic from 'next/dynamic'
import { useSetPlayer } from '@/hooks/YouTube/useSetPlayer'

const YouTubePlayer = dynamic(() => import('@/components/YouTubePlayer'), {
  ssr: false,
})

function Ios() {
  const { player, setPlayer } = useSetPlayer()

  return (
    <div>
      <YouTubePlayer setPlayer={setPlayer} />
      <button
        onClick={async () => {
          if (player) {
            await player.loadVideoById({
              videoId: 'kroV2qD0xNo',
              startSeconds: 20,
              endSeconds: 24,
            })
          }
        }}
      >
        PLAY
      </button>
    </div>
  )
}

export default Ios
