import { usePlaylistCollection } from '@/hooks/playlist'

export function useUserPlaylists(userId: string) {
  const { playlists, isLoading, error } = usePlaylistCollection(userId)
  return { playlists, isLoading, error }
}
