import { playlistsSelector, playlistsState } from '@/atoms/firestore/playlist'
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil'
import { useEffect } from 'react'
import { useGetCurrentUser } from '@/hooks/firebaseAuth'

export function usePlaylists() {
  const user = useGetCurrentUser()
  const playlists = useRecoilValueLoadable(playlistsSelector(user?.uid))
  const setPlaylistsState = useSetRecoilState(playlistsState(user?.uid))
  useEffect(() => {
    if (playlists.state === 'hasValue') {
      setPlaylistsState(playlists.contents)
    }
  }, [playlists.contents, playlists.state, setPlaylistsState])
  return playlists
}
