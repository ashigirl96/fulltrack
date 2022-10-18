import { usePlaylists } from './usePlaylists'
import Link from 'next/link'
import { PlaylistStore, UserId } from '@/types'
import { useSetPlaylistContext } from '@/atoms/contextMenu'
import { useIsEditPlaylistNameValue } from '@/atoms/contextMenu/states'
import { InputPlaylistTitle } from './InputPlaylistTitle'
import { useSetPlaylistValues } from '@/atoms/firestore/playlist'
import { useEffect } from 'react'

type Props = {
  userId: UserId
}
// TODO: refactor isLoadingあたり
export function Playlists({ userId }: Props) {
  const { playlists, isLoading, error } = usePlaylists(userId)

  if (error) {
    return <div>{JSON.stringify(error)}</div>
  }
  if (isLoading) {
    return <div>Loading</div>
  }
  if (!playlists) {
    return <div>Please login...</div>
  }
  return <Component playlists={playlists} />
}

function Component({ playlists }: { playlists: PlaylistStore[] }) {
  const setPlaylistValues = useSetPlaylistValues(playlists)
  // 動画一覧を開いた時に、フェッチした公式のプレイリスト一覧をatomにつっこむ
  useEffect(() => {
    setPlaylistValues()
  }, [setPlaylistValues])

  return (
    <>
      {playlists.map((playlist) => (
        <Playlist key={`user-playlist-${playlist.id}`} playlist={playlist} />
      ))}
    </>
  )
}

// TODO: src/pages/playlists/index.tsx:36 を見習ってリファクタ
type PlaylistProps = {
  playlist: PlaylistStore
}
function Playlist({ playlist }: PlaylistProps) {
  const setSelectedPlaylist = useSetPlaylistContext(playlist.id)
  const isCurrentEdit = useIsEditPlaylistNameValue(playlist.id)

  if (isCurrentEdit) {
    return (
      <li>
        <InputPlaylistTitle playlist={playlist} />
      </li>
    )
  }

  return (
    <li key={`playlist-${playlist.id}`} onContextMenu={setSelectedPlaylist}>
      <Link href={`/playlists/${encodeURIComponent(playlist.id)}`}>
        <a>
          <div className="ellipsis-one-line">{playlist.title}</div>
        </a>
      </Link>
    </li>
  )
}
