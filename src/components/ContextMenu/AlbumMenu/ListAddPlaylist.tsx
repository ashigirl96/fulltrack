import { AlbumState, PlaylistState, UserId } from '@/types'
import { AlbumFireStoreId, useAlbumValue } from '@/atoms/firestore/album'
import { usePlaylistCollection } from '@/hooks/playlist'
import { useUnionPlaylistVideo } from '@/hooks/playlist/useUnionPlaylistVideos'
import { DropdownContent } from '@/components/ContextMenu/component/DropdownContent'
import { useMemo } from 'react'
import { VideoDocRef, videoDocRef } from '@/lib/firestore/video'

function useVideoDocsRef(videoIds: string[]) {
  return useMemo(
    () => videoIds.map((videoId) => videoDocRef(videoId)),
    [videoIds],
  )
}

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
  const videoIds = useVideoDocsRef(album?.videoIds || [])
  if (isLoading || error || playlists === undefined || album === null) {
    return null
  }
  return (
    <DropdownContent userId={userId} videoIds={videoIds} title={album.title}>
      {playlists.map((playlist) => (
        <ListPlaylist
          key={`unordered-playlist-${playlist.id}`}
          videoIds={videoIds}
          playlist={playlist}
          userId={userId}
        />
      ))}
    </DropdownContent>
  )
}

type ListProps = {
  videoIds: VideoDocRef[]
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
