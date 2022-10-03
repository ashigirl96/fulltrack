import { useUserPlaylists } from './usePlaylists'
import { PlaylistItem } from './PlaylistItem'
import Link from 'next/link'
import { PlaylistStore, UserId } from '@/types'
import { useSetPlaylistContext } from '@/atoms/contextMenu'
import { useIsEditPlaylistNameValue } from '@/atoms/contextMenu/states'
import { InputPlaylistTitle } from './InputPlaylistTitle'

type Props = {
  userId: UserId
}
export function UserPlaylists({ userId }: Props) {
  const { playlists, isLoading, error } = useUserPlaylists(userId)

  if (error) {
    return <div>{JSON.stringify(error)}</div>
  }
  if (isLoading) {
    return <div>Loading</div>
  }
  if (!playlists) {
    return <div>Please login...</div>
  }
  return (
    <div>
      {playlists.map((playlist) => (
        <Playlist playlist={playlist} />
      ))}
    </div>
  )
}

type PlaylistProps = {
  playlist: PlaylistStore
}
function Playlist({ playlist }: PlaylistProps) {
  const setSelectedPlaylist = useSetPlaylistContext(playlist.id)
  const isCurrentEdit = useIsEditPlaylistNameValue(playlist.id)

  if (isCurrentEdit) {
    return <InputPlaylistTitle playlist={playlist} />
  }

  return (
    <div key={`playlist-${playlist.id}`} onContextMenu={setSelectedPlaylist}>
      <Link href={`/playlists/${encodeURIComponent(playlist.id)}`}>
        <a>
          <PlaylistItem playlist={playlist} isOfficial={false} />
        </a>
      </Link>
    </div>
  )
}
