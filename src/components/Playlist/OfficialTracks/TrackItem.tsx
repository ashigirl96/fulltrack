import { PlaylistStore, VideoFirestore } from '@/types'
import { useSetPlaylist } from '@/atoms/firestore/playlist'
import { useEffect } from 'react'
import Link from 'next/link'
import { useVideoById } from '@/hooks/video/useVideoById'
import { Artists } from '@/components/shared/Artists'

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

  if (!video) {
    return <div>loading...</div>
  }

  return <Component playlist={playlist} video={video} />
}

function Component({
  playlist,
  video,
}: {
  playlist: PlaylistStore
  video: VideoFirestore
}) {
  return (
    <Link href={`/playlists/${playlist.id}`} passHref>
      <a>
        <div className="flex flex-col justify-start items-start gap-y-1 bg-gray-900 p-4 pb-8 rounded-lg w-48">
          <img
            src={playlist.thumbnailUrl}
            className="object-cover aspect-square"
            alt={`thumbnailUrl-${playlist.thumbnailUrl}`}
          />
          <span className="ellipsis-one-line font-semibold">
            {playlist.title}
          </span>
          <span className="text-xs font-light text-primary">
            <Artists artistIds={video.artists} />
          </span>
        </div>
      </a>
    </Link>
  )
}
