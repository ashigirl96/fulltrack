import { ArtistFirebaseId } from '@/types'
import { useArtistValue } from '@/atoms/firestore/artist'
import { PlaylistStoreId, usePlaylistValue } from '@/atoms/firestore/playlist'
import { AlbumFireStoreId, useAlbumValue } from '@/atoms/firestore/album'

type PlaylistProps = {
  playlistId: PlaylistStoreId
}
function Playlist({ playlistId }: PlaylistProps) {
  const playlist = usePlaylistValue(playlistId)
  return <Title text={playlist?.title || ''} />
}

type AlbumProps = {
  albumId: AlbumFireStoreId
}
function Album({ albumId }: AlbumProps) {
  const album = useAlbumValue(albumId)
  return <Title text={album?.title || ''} />
}

type ArtistProps = {
  artistId: ArtistFirebaseId
}
function Artist({ artistId }: ArtistProps) {
  const artist = useArtistValue(artistId)
  return <Title text={artist?.name || ''} />
}

export function Title({ text }: { text: string }) {
  return (
    <h1 className="my-4 cursor-default">
      <span className="p-2 font-bold text-3xl">{text}</span>
    </h1>
  )
}

export const TrackTitle = {
  Playlist,
  Album,
  Artist,
} as const
