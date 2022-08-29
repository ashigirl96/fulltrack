import { playlistsState } from '@/atoms/firestore/playlist'
import { useSetRecoilState } from 'recoil'
import { usePlaylistCollection } from '@/hooks/playlist'

export function usePlaylists2(userId: string) {
  const { playlists, isLoading, error } = usePlaylistCollection(userId)
  const setPlaylistsState = useSetRecoilState(playlistsState(userId))
  if (playlists) {
    setPlaylistsState(playlists)
  }
  return { playlists, isLoading, error }
}
