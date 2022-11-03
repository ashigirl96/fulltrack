import { PlaylistStore } from '@/types'
import { useSetIsEditPlaylistName } from '@/atoms/contextMenu/states'
import React, { useEffect, useRef } from 'react'
import { useUpdatePlaylistTitle } from '@/hooks/playlist/useUpdatePlaylistTitle'
import { useEnterKey, useOnFocus } from '@/lib/keyboard'

type PlaylistProps = {
  playlist: PlaylistStore
}

type Args = PlaylistProps
function useInputPlaylistTitle({ playlist }: Args) {
  const blur = useSetIsEditPlaylistName(null)
  const handleBlur = useUpdatePlaylistTitle({
    playlistId: playlist.id,
    callback: blur,
  })
  const handleKeyDown = useEnterKey(handleBlur)
  const handleFocus = useOnFocus()

  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (ref.current) ref.current.focus()
  }, [])

  return {
    ref,
    title: playlist.title,
    handleBlur,
    handleKeyDown,
    handleFocus,
  }
}

export function InputPlaylistTitle({ playlist }: PlaylistProps) {
  const { ref, title, handleBlur, handleKeyDown, handleFocus } =
    useInputPlaylistTitle({ playlist })
  return (
    <input
      defaultValue={title}
      ref={ref}
      onFocus={handleFocus}
      onBlur={(e) => handleBlur(e.currentTarget.value)}
      onKeyDown={handleKeyDown}
    />
  )
}
