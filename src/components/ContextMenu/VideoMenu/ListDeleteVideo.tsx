import { useRouter } from 'next/router'
import { usePlaylistValue } from '@/atoms/firestore/playlist'
import { useRemovePlaylistVideos } from '@/hooks/playlist/useRemovePlaylistVideo'
import { PlaylistState } from '@/types'

type Props = {
  videoIndex: number
}
export function ListDeleteVideo({ videoIndex }: Props) {
  const router = useRouter()
  const playlistId = router.query['playlistId'] as string
  const playlist = usePlaylistValue(playlistId)
  if (!playlist) {
    return null
  }
  if (playlist.isOfficial) {
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
