import { usePlaylistCollection } from '@/hooks/playlist'
import { TrackItem } from './TrackItem'

import type { PlaylistStore } from '@/types'

export function OfficialTracks() {
  const { isLoading, playlists, error } = usePlaylistCollection()
  if (isLoading || !playlists) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>{JSON.stringify(error)}</div>
  }

  return <Component playlists={playlists} />
}

type Props = {
  playlists: PlaylistStore[]
}
function Component({ playlists }: Props) {
  return (
    <div className="flex flex-wrap m-4">
      {playlists.map((playlist) => (
        <TrackItem key={playlist.id} playlist={playlist} />
      ))}
    </div>
  )
}
