import { AlbumState, PlaylistState, UserId } from '@/types'
import { AlbumFireStoreId, useAlbumValue } from '@/atoms/firestore/album'
import { usePlaylistCollection } from '@/hooks/playlist'
import { useUnionPlaylistVideo } from '@/hooks/playlist/useUnionPlaylistVideos'
import { useCreatePlaylist } from '@/hooks/playlist/useCreatePlaylist'
import { videoDocRef } from '@/lib/firestore/video'
import { useMemo } from 'react'
import { WithFieldValue } from '@firebase/firestore'

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
  // TODO: refactor
  const videoIds = useMemo(
    () =>
      album?.videoIds
        ? album?.videoIds.map((videoId) => videoDocRef(videoId))
        : [],
    [album?.videoIds],
  ) as unknown as WithFieldValue<string[]>
  const handleClick = useCreatePlaylist({
    userId,
    videoIds,
    title: album?.title,
  })
  if (isLoading || error || playlists === undefined || album === null) {
    return null
  }
  return (
    <ul
      tabIndex={0}
      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 divide-y ring-1 ring-opacity-5 min-w-fit"
    >
      <li>
        <button onClick={handleClick}>プレイリストを作成する</button>
      </li>
      <div>
        {playlists.map((playlist) => (
          <ListPlaylist
            key={`unordered-playlist-${playlist.id}`}
            videoIds={videoIds}
            playlist={playlist}
            userId={userId}
          />
        ))}
      </div>
    </ul>
  )
}

type ListProps = {
  videoIds: WithFieldValue<string[]>
  playlist: PlaylistState
  userId: UserId
}
function ListPlaylist({ videoIds, playlist, userId }: ListProps) {
  // albumの中身をplaylistに追加する
  const handleClick = useUnionPlaylistVideo({
    userId,
    playlist,
    videoIds,
  })
  return (
    <li>
      <button onClick={handleClick}>{playlist.title}</button>
    </li>
  )
}
