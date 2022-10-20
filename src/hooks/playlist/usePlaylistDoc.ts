import { useDocumentData } from '@/hooks/firestore'
import { playlistDocRef } from '@/lib/firestore/playlist'
import { PlaylistStoreId } from '@/atoms/firestore/playlist'
import { UserId } from '@/types'

export function usePlaylistDoc(
  playlistId: PlaylistStoreId,
  currentUserId: UserId,
) {
  const playlistQuery = playlistDocRef(currentUserId, playlistId)
  const [playlist, isLoading, error, playlistsSnapshot] =
    useDocumentData(playlistQuery)

  return {
    playlist,
    isLoading,
    error,
    playlistsSnapshot,
  }
}
