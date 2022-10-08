import { useCollectionData } from '@/hooks/firestore'
import { playlistCollectionOrderByCreatedAtRef } from '@/lib/firestore/playlist'

export function usePlaylistCollection() {
  const playlistQuery = playlistCollectionOrderByCreatedAtRef()
  const [playlists, isLoading, error, playlistsSnapshot] =
    useCollectionData(playlistQuery)

  return {
    playlists,
    isLoading,
    error,
    playlistsSnapshot,
  }
}
