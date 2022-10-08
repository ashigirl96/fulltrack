import Link from 'next/link'
import { Artists } from '@/components/shared/Artists'
import { PlaylistStore } from '@/types'

type Props = {
  playlist: PlaylistStore
}
export function TrackView({ playlist }: Props) {
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
            {/*<Artists artistIds={video.artists} />*/}
          </span>
        </div>
      </a>
    </Link>
  )
}
