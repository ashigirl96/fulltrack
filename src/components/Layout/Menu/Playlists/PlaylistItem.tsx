import { PlaylistStore } from '@/types'
import { playlistState } from '@/atoms/firestore/playlist'
import { useSetRecoilState } from 'recoil'
import { useEffect } from 'react'

type Props = {
  playlist: PlaylistStore
}
export function PlaylistItem({ playlist }: Props) {
  const setPlaylistState = useSetRecoilState(playlistState(playlist.id))
  useEffect(() => {
    setPlaylistState(playlist)
  }, [playlist, setPlaylistState])
  return <div>{playlist.title}</div>
}
