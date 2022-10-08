import { useCollectionData } from '@/hooks/firestore'
import { userPlaylistCollectionOrderByCreatedAtRef } from '@/lib/firestore/playlist'

export function useUserPlaylistCollection(userId: string) {
  const playlistQuery = userPlaylistCollectionOrderByCreatedAtRef(userId)
  const [playlists, isLoading, error, playlistsSnapshot] =
    useCollectionData(playlistQuery)

  return {
    playlists,
    isLoading,
    error,
    playlistsSnapshot,
  }
}
