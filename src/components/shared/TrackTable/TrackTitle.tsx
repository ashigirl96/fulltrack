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
  return <div className="font-bold text-3xl">{artist?.name}</div>
}

export const TrackTitle = {
  Playlist,
  Artist,
} as const
