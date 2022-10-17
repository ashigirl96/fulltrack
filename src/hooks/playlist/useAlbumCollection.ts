import { useCollectionData } from '@/hooks/firestore'
import { albumCollectionOrderByCreatedAtRef } from '@/lib/firestore/album'

export function useAlbumCollection() {
  const albumQuery = albumCollectionOrderByCreatedAtRef()
  const [albums, isLoading, error, playlistsSnapshot] =
    useCollectionData(albumQuery)

  return {
    albums,
    isLoading,
    error,
    playlistsSnapshot,
  }
}
