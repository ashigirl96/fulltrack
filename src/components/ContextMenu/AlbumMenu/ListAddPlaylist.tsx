import { PlaylistState, UserId } from '@/types'
import { AlbumFireStoreId, useAlbumValue } from '@/atoms/firestore/album'
import { usePlaylistCollection } from '@/hooks/playlist'
import { useUnionPlaylistVideo } from '@/hooks/playlist/useUnionPlaylistVideos'
import { Dropdown } from '@/components/ContextMenu/component/DropdownContent'
import { useMemo } from 'react'
import { VideoDocRef, videoDocRef } from '@/lib/firestore/video'
import { ReturnTypePosition } from '@/components/ContextMenu/usePosition'

function useVideoDocsRef(videoIds: string[]) {
  return useMemo(
    () => videoIds.map((videoId) => videoDocRef(videoId)),
    [videoIds],
  )
}

type Props = {
  userId: UserId
  albumId: AlbumFireStoreId
} & Pick<ReturnTypePosition, 'position'>
export function ListAddPlaylist({ userId, albumId, position }: Props) {
  const { isLoading, error, playlists } = usePlaylistCollection(userId)
  const album = useAlbumValue(albumId)
  const videoIds = useVideoDocsRef(album?.videoIds || [])
  if (isLoading || error || playlists === undefined || album === null) {
    return null
  }
  return (
    <li>
      <Dropdown left={position.left} end={position.end}>
        <Dropdown.Content
          userId={userId}
          videoIds={videoIds}
          title={album.title}
        >
          {playlists.map((playlist) => (
            <ListPlaylist
              key={`unordered-playlist-${playlist.id}`}
              videoIds={videoIds}
              playlist={playlist}
              userId={userId}
            />
          ))}
        </Dropdown.Content>
      </Dropdown>
    </li>
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
