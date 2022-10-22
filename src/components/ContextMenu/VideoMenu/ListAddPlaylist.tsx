import { PlaylistStore, UserId } from '@/types'
import { usePlaylistCollection } from '@/hooks/playlist'
import { VideoFirestoreId } from '@/atoms/firestore/video'
import { useUnionPlaylistVideo } from '@/hooks/playlist/useUnionPlaylistVideo'
import { DropdownContent } from '@/components/ContextMenu/component/DropdownContent'
import { videoDocRef } from '@/lib/firestore/video'

type Props = {
  userId: UserId
  videoId: VideoFirestoreId
  videoTitle: string
}
export function ListAddPlaylist({ userId, videoId, videoTitle }: Props) {
  const { isLoading, error, playlists } = usePlaylistCollection(userId)
  return (
    <li className="dropdown dropdown-right dropdown-end dropdown-open">
      <label tabIndex={0}>プレイリストに追加</label>
      <UnorderedPlaylists
        userId={userId}
        videoId={videoId}
        videoTitle={videoTitle}
        playlists={playlists}
        error={error}
        isLoading={isLoading}
      />
    </li>
  )
}

type ListsProps = Pick<
  ReturnType<typeof usePlaylistCollection>,
  'isLoading' | 'playlists' | 'error'
> & {
  videoId: VideoFirestoreId
  userId: UserId
  videoTitle: string
}
function UnorderedPlaylists({
  isLoading,
  playlists,
  error,
  videoId,
  videoTitle,
  userId,
}: ListsProps) {
  if (isLoading || error || playlists === undefined) {
    return null
  }
  return (
    <DropdownContent
      userId={userId}
      videoIds={[videoDocRef(videoId)]}
      title={videoTitle}
    >
      <div>
        {playlists.map((playlist) => (
          <ListPlaylist
            key={`unordered-playlist-${playlist.id}`}
            playlist={playlist}
            videoId={videoId}
          />
        ))}
      </div>
    </DropdownContent>
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
