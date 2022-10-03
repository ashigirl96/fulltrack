import { PlaylistStore } from '@/types'
import { useSetIsEditPlaylistName } from '@/atoms/contextMenu/states'
import React, { useEffect, useRef, useState } from 'react'
import { useUpdatePlaylistTitle } from '@/hooks/playlist/useUpdatePlaylistTitle'
import { useEnterKey, useOnChange, useOnFocus } from '@/lib/keyboard'

type PlaylistProps = {
  playlist: PlaylistStore
}

type Args = PlaylistProps
function useInputPlaylistTitle({ playlist }: Args) {
  const [title, setTitle] = useState(playlist.title)
  const blur = useSetIsEditPlaylistName(null)
  const handleBlur = useUpdatePlaylistTitle({
    playlistId: playlist.id,
    callback: blur,
    title,
  })
  const handleKeyDown = useEnterKey(handleBlur)
  const handleChange = useOnChange(setTitle)
  const handleFocus = useOnFocus()

  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (ref.current) ref.current.focus()
  }, [])

  return {
    ref,
    title,
    handleChange,
    handleBlur,
    handleKeyDown,
    handleFocus,
  }
}

export function InputPlaylistTitle({ playlist }: PlaylistProps) {
  const { ref, title, handleChange, handleBlur, handleKeyDown, handleFocus } =
    useInputPlaylistTitle({ playlist })
  return (
    <input
      ref={ref}
      defaultValue={title}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
    />
  )
}
