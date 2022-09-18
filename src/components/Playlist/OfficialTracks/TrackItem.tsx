import { PlaylistStore } from '@/types'
import { useSetPlaylist } from '@/atoms/firestore/playlist'
import { useEffect } from 'react'
import Link from 'next/link'

type Props = {
  playlist: PlaylistStore
}
export function TrackItem({ playlist }: Props) {
  const setPlaylistState = useSetPlaylist(playlist.id)
  useEffect(() => {
    setPlaylistState({
      ...playlist,
      isOfficial: true,
    })
  }, [playlist, setPlaylistState])

  return (
    <Link href={`/playlists/${playlist.id}`} passHref>
      <a>
        <div className="flex flex-col justify-center items-center gap-y-4 bg-green-400 p-4 pb-8 rounded-lg">
          <img src={playlist.thumbnailUrl} className="object-cover h-40 w-40" />
          <span className="">{playlist.title}</span>
        </div>
      </a>
    </Link>
  )
}
