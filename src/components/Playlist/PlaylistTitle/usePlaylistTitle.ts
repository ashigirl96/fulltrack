import { PlaylistStore } from '@/types'
import { useCallback, useMemo, useState } from 'react'

export type ArgsPlaylistTitle = {
  playlist: PlaylistStore
}
export function usePlaylistTitle({ playlist }: ArgsPlaylistTitle) {
  const playlistId = useMemo(() => playlist.id, [playlist.id])
  const title = useMemo(() => playlist.title, [playlist.title])
  const [isOpenEditor, setIsOpenEditor] = useState(false)
  const handleClick = useCallback(() => {
    setIsOpenEditor(true)
  }, [setIsOpenEditor])

  return {
    title,
    playlistId,
    isOpenEditor,
    setIsOpenEditor,
    handleClick,
  }
}

export type ReturnTypePlaylistTitle = ReturnType<typeof usePlaylistTitle>
