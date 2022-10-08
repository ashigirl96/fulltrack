import { useUserPlaylistCollection } from '@/hooks/playlist'

export function useUserPlaylists(userId: string) {
  const { playlists, isLoading, error } = useUserPlaylistCollection(userId)
  return { playlists, isLoading, error }
}
