import { ArtistFirebaseId } from '@/types'
import { useArtistById } from './useArtistById'
import Link from 'next/link'

type Props = { artistIds: ArtistFirebaseId[] }
export function Artists({ artistIds }: Props) {
  const length = artistIds.length
  return (
    <span>
      {artistIds.map((artistId, index) => {
        return (
          <span key={`${artistId}-${index}`}>
            <Artist artistId={artistId} />
            <Comma index={index} length={length} />
          </span>
        )
      })}
    </span>
  )
}

type ArtistProps = { artistId: ArtistFirebaseId }
function Artist({ artistId }: ArtistProps) {
  const artist = useArtistById(artistId)
  if (artist) {
    return (
      <Link href={`/artists/${artist.id}`} shallow>
        <a>
          <span className="hover:underline">{artist.name}</span>
        </a>
      </Link>
    )
  }
  // TODO: loading
  return <span />
}

function Comma({ index, length }: { index: number; length: number }) {
  if (index + 1 < length) {
    return <>, </>
  }
  return <></>
}
