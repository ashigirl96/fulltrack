import { PlaylistStore } from '@/types'
import { playlistState } from '@/atoms/firestore/playlist'
import { useSetRecoilState } from 'recoil'
import { useEffect } from 'react'

type Props = {
  playlist: PlaylistStore
  isOfficial: boolean
}
export function PlaylistItem({ playlist, isOfficial }: Props) {
  const setPlaylistState = useSetRecoilState(playlistState(playlist.id))
  useEffect(() => {
    setPlaylistState({
      ...playlist,
      isOfficial,
    })
  }, [isOfficial, playlist, setPlaylistState])

  return <div className="ellipsis-one-line">{playlist.title}</div>
}
