import { useDocumentData } from '@/hooks/firestore'
import { playlistDocRef } from '@/lib/firestore/playlist'
import { PlaylistStoreId } from '@/atoms/firestore/playlist'

export function usePlaylistDoc(playlistId: PlaylistStoreId) {
  const playlistQuery = playlistDocRef(playlistId)
  const [playlist, isLoading, error, playlistsSnapshot] =
    useDocumentData(playlistQuery)

  return {
    playlist,
    isLoading,
    error,
    playlistsSnapshot,
  }
}
