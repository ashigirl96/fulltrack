import { useCollectionData } from '@/hooks/firestore'
import { userPlaylistCollectionRef } from '@/lib/firestore/userPlaylist'
import { playlistCollectionRef } from '@/lib/firestore/playlist'

export function useUserPlaylistCollection(userId: string) {
  const playlistQuery = userPlaylistCollectionRef(userId)
  const [playlists, isLoading, error, playlistsSnapshot] =
    useCollectionData(playlistQuery)

  return {
    playlists,
    isLoading,
    error,
    playlistsSnapshot,
  }
}

export function usePlaylistCollection() {
  const [playlists, isLoading, error, playlistsSnapshot] = useCollectionData(
    playlistCollectionRef,
  )

  return {
    playlists,
    isLoading,
    error,
    playlistsSnapshot,
  }
}
