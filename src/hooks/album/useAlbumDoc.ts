import { useDocumentData } from '@/hooks/firestore'
import { albumDocRef } from '@/lib/firestore/album'
import { AlbumFireStoreId } from '@/atoms/firestore/album'

export function useAlbumDoc(albumId: AlbumFireStoreId) {
  const albumQuery = albumDocRef(albumId)
  const [album, isLoading, error, playlistsSnapshot] =
    useDocumentData(albumQuery)

  return {
    album,
    isLoading,
    error,
    playlistsSnapshot,
  }
}
