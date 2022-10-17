import Link from 'next/link'
import { Artists } from '@/components/shared/Artists'
import { AlbumStore } from '@/types'
import { VideoFirestoreId } from '@/atoms/firestore/video'
import { useVideoById } from '@/hooks/video/useVideoById'

type Props = {
  track: AlbumStore
}
export function TrackView({ track }: Props) {
  return (
    <Link href={`/albums/${track.id}`} passHref>
      <div className="flex flex-col justify-start items-start gap-y-1 bg-gray-900 p-4 pb-8 rounded-lg w-48">
        <img
          src={track.thumbnailUrl}
          className="object-cover aspect-square"
          alt={`thumbnailUrl-${track.thumbnailUrl}`}
        />
        <span className="ellipsis-one-line font-semibold">{track.title}</span>
        <span className="text-xs font-light text-primary">
          <Artist videoId={track.videoIds[0]} />
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
