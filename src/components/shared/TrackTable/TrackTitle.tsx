import { ArtistFirebaseId } from '@/types'
import { useArtistValue } from '@/atoms/firestore/artist'

function Playlist() {
  return <div>Official</div>
}

type ArtistProps = {
  artistId: ArtistFirebaseId
}
function Artist({ artistId }: ArtistProps) {
  const artist = useArtistValue(artistId)
  return (
    <div className="my-4 cursor-default">
      <span className="bg-primary-content text-primary rounded p-2 font-bold text-3xl">
        {artist?.name}
      </span>
    </div>
  )
}

export const TrackTitle = {
  Playlist,
  Artist,
} as const
