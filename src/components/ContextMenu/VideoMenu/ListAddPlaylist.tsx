import { PlaylistStore, UserId } from '@/types'
import { usePlaylistCollection } from '@/hooks/playlist'
import { VideoFirestoreId } from '@/atoms/firestore/video'
import { useUnionPlaylistVideo } from '@/hooks/playlist/useUnionPlaylistVideo'
import { Dropdown } from '@/components/ContextMenu/component/DropdownContent'
import { videoDocRef } from '@/lib/firestore/video'

type Props = {
  userId: UserId
  videoId: VideoFirestoreId
  videoTitle: string
}
export function ListAddPlaylist({ userId, videoId, videoTitle }: Props) {
  const { isLoading, error, playlists } = usePlaylistCollection(userId)
  if (isLoading || error || playlists === undefined) {
    return null
  }
  return (
    <Dropdown position={'end-right'}>
      <Dropdown.Content
        userId={userId}
        videoIds={[videoDocRef(videoId)]}
        title={videoTitle}
      >
        {playlists.map((playlist) => (
          <ListPlaylist
            key={`unordered-playlist-${playlist.id}`}
            playlist={playlist}
            videoId={videoId}
          />
        ))}
      </Dropdown.Content>
    </Dropdown>
  )
}

type ListProps = { playlist: PlaylistStore; videoId: VideoFirestoreId }
function ListPlaylist({ playlist, videoId }: ListProps) {
  const handleClick = useUnionPlaylistVideo({
    videoId,
    playlist,
  })
  return (
    <li>
      <button onClick={handleClick}>{playlist.title}</button>
    </li>
  )
}
