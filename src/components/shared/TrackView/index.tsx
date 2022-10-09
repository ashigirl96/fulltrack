import Link from 'next/link'
import { Artists } from '@/components/shared/Artists'
import { PlaylistStore } from '@/types'
import { VideoFirestoreId } from '@/atoms/firestore/video'
import { useVideoById } from '@/hooks/video/useVideoById'

type Props = {
  playlist: PlaylistStore
}
export function TrackView({ playlist }: Props) {
  return (
    <Link href={`/playlists/${playlist.id}`} passHref>
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
          <Artist videoId={playlist.videoIds[0]} />
        </span>
      </div>
    </Link>
  )
}

type ArtistProps = {
  videoId: VideoFirestoreId
}
function Artist({ videoId }: ArtistProps) {
  const video = useVideoById(videoId)
  if (!video) {
    return <div />
  }
  return <Artists artistIds={video.artists} />
}
