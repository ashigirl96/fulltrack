import { VideoFirestoreId } from '@/atoms/firestore/video'
import { useRouter } from 'next/router'
import { PlaylistStoreId, usePlaylistValue } from '@/atoms/firestore/playlist'
import { useRemovePlaylistVideos } from '@/hooks/playlist/useRemovePlaylistVideo'

type Props = {
  videoId: VideoFirestoreId
}
export function ListDeleteVideo({ videoId }: Props) {
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
      <DeleteButton playlistId={playlist.id} videoId={videoId} />
    </li>
  )
}

type DeleteProps = {
  playlistId: PlaylistStoreId
  videoId: VideoFirestoreId
}
function DeleteButton({ playlistId, videoId }: DeleteProps) {
  const handleClick = useRemovePlaylistVideos({ playlistId, videoId })
  return <button onClick={handleClick}>プレイリストから削除</button>
}
