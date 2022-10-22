import { PlaylistStore, UserId } from '@/types'
import { usePlaylistCollection } from '@/hooks/playlist'
import { VideoFirestoreId } from '@/atoms/firestore/video'
import { useUnionPlaylistVideo } from '@/hooks/playlist/useUnionPlaylistVideo'

type Props = {
  userId: UserId
  videoId: VideoFirestoreId
}
export function ListAddPlaylist({ userId, videoId }: Props) {
  const { isLoading, error, playlists } = usePlaylistCollection(userId)
  return (
    <li className="dropdown dropdown-right dropdown-end dropdown-open">
      <label tabIndex={0}>プレイリストに追加</label>
      <UnorderedPlaylists
        videoId={videoId}
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
}
function UnorderedPlaylists({
  isLoading,
  playlists,
  error,
  videoId,
}: ListsProps) {
  if (isLoading || error || playlists === undefined) {
    return null
  }
  return (
    <ul
      tabIndex={0}
      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 min-w-fit"
    >
      {playlists.map((playlist) => (
        <ListPlaylist
          key={`unordered-playlist-${playlist.id}`}
          playlist={playlist}
          videoId={videoId}
        />
      ))}
    </ul>
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
