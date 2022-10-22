import { useRouter } from 'next/router'
import { usePlaylistValue } from '@/atoms/firestore/playlist'
import { useRemovePlaylistVideos } from '@/hooks/playlist/useRemovePlaylistVideo'
import { PlaylistState } from '@/types'

type Props = {
  videoIndex: number
}
export function ListDeleteVideo({ videoIndex }: Props) {
  const router = useRouter()
  const { isReady, query } = router
  if (!isReady) {
    return null
  }
  const playlistId = query.id as string

  return <Component playlistId={playlistId} videoIndex={videoIndex} />
}

function Component({
  playlistId,
  videoIndex,
}: {
  playlistId: string
  videoIndex: number
}) {
  const playlist = usePlaylistValue(playlistId)
  if (!playlist) {
    return null
  }
  return (
    <li>
      <DeleteButton playlist={playlist} videoIndex={videoIndex} />
    </li>
  )
}

type DeleteProps = {
  playlist: PlaylistState
  videoIndex: number
}
function DeleteButton({ playlist, videoIndex }: DeleteProps) {
  const handleClick = useRemovePlaylistVideos({ playlist, videoIndex })
  return <button onClick={handleClick}>プレイリストから削除</button>
}
