import {
  useUserPlaylistCollection,
  usePlaylistCollection,
} from '@/hooks/playlist'

export function usePlaylists() {
  const { playlists, isLoading, error } = usePlaylistCollection()
  return { playlists, isLoading, error }
}

export function useUserPlaylists(userId: string) {
  const { playlists, isLoading, error } = useUserPlaylistCollection(userId)
  return { playlists, isLoading, error }
}
