import { PlaylistStore } from '@/types'
import { useSetPlaylist } from '@/atoms/firestore/playlist'
import { useEffect } from 'react'
import Link from 'next/link'
import { useVideoById } from '@/hooks/video/useVideoById'

type Props = {
  playlist: PlaylistStore
}
export function TrackItem({ playlist }: Props) {
  const setPlaylistState = useSetPlaylist(playlist.id)
  const video = useVideoById(playlist.videoIds[0])
  useEffect(() => {
    setPlaylistState({
      ...playlist,
      isOfficial: true,
    })
  }, [playlist, setPlaylistState])

  return (
    <Link href={`/playlists/${playlist.id}`} passHref>
      <a>
        <div className="flex flex-col justify-start items-start gap-y-1 bg-gray-900 p-4 pb-8 rounded-lg w-48">
          <img
            src={playlist.thumbnailUrl}
            className="object-cover aspect-square"
          />
          <span className="ellipsis-one-line font-semibold">
            {playlist.title}
          </span>
          <span className="text-xs font-light text-primary">
            {video?.artists?.join(', ')}
          </span>
        </div>
      </a>
    </Link>
  )
}
