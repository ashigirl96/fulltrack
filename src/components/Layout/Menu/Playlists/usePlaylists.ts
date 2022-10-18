import { usePlaylistCollection } from '@/hooks/playlist'

export function usePlaylists(userId: string) {
  const { playlists, isLoading, error } = usePlaylistCollection(userId)
  return { playlists, isLoading, error }
}
