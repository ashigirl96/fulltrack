import { AlbumState, AlbumStore, PlaylistState, UserId } from '@/types'
import { AlbumFireStoreId, useAlbumValue } from '@/atoms/firestore/album'
import { usePlaylistCollection } from '@/hooks/playlist'
import { useUnionPlaylistVideo } from '@/hooks/playlist/useUnionPlaylistVideos'

type Props = {
  userId: UserId
  albumId: AlbumFireStoreId
}

export function ListAddPlaylist({ userId, albumId }: Props) {
  const { isLoading, error, playlists } = usePlaylistCollection(userId)
  const album = useAlbumValue(albumId)
  return (
    <li className="dropdown dropdown-right dropdown-end dropdown-open">
      <label tabIndex={0}>プレイリストに追加</label>
      <UnorderedPlaylists
        album={album}
        playlists={playlists}
        error={error}
        isLoading={isLoading}
        userId={userId}
      />
    </li>
  )
}

type ListsProps = Pick<
  ReturnType<typeof usePlaylistCollection>,
  'isLoading' | 'playlists' | 'error'
> & {
  album: AlbumState | null
  userId: UserId
}
function UnorderedPlaylists({
  isLoading,
  playlists,
  error,
  album,
  userId,
}: ListsProps) {
  if (isLoading || error || playlists === undefined || album === null) {
    return null
  }
  return (
    <ul
      tabIndex={0}
      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
    >
      {playlists.map((playlist) => (
        <ListPlaylist
          key={`unordered-playlist-${playlist.id}`}
          album={album}
          playlist={playlist}
          userId={userId}
        />
      ))}
    </ul>
  )
}

type ListProps = { album: AlbumStore; playlist: PlaylistState; userId: UserId }
function ListPlaylist({ album, playlist, userId }: ListProps) {
  // albumの中身をplaylistに追加する
  const handleClick = useUnionPlaylistVideo({
    userId,
    playlist,
    videoIds: album.videoIds,
  })
  return (
    <li>
      <button onClick={handleClick}>{playlist.title}</button>
    </li>
  )
}
