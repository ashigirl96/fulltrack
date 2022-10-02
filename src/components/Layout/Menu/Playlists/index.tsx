import { useUserPlaylists } from './usePlaylists'
import { PlaylistItem } from './PlaylistItem'
import Link from 'next/link'
import { PlaylistStore, UserId } from '@/types'
import { useSetPlaylistContext } from '@/atoms/contextMenu'
import {
  useIsEditPlaylistNameValue,
  useSetIsEditPlaylistName,
} from '@/atoms/contextMenu/states'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { userPlaylistDocRef } from '@/lib/firestore/userPlaylist'
import { updateDoc } from '@firebase/firestore'
import { useGetCurrentUserId } from '@/hooks/firebaseAuth'

type Props = {
  userId: UserId
}
export function UserPlaylists({ userId }: Props) {
  const { playlists, isLoading, error } = useUserPlaylists(userId)

  if (error) {
    return <div>{JSON.stringify(error)}</div>
  }
  if (isLoading) {
    return <div>Loading</div>
  }
  if (!playlists) {
    return <div>Please login...</div>
  }
  return (
    <div>
      {playlists.map((playlist) => (
        <Playlist playlist={playlist} />
      ))}
    </div>
  )
}

type PlaylistProps = {
  playlist: PlaylistStore
}
function Playlist({ playlist }: PlaylistProps) {
  const setSelectedPlaylist = useSetPlaylistContext(playlist.id)
  const isCurrentEdit = useIsEditPlaylistNameValue(playlist.id)

  if (isCurrentEdit) {
    return <InputPlaylistName playlist={playlist} />
  }

  return (
    <div key={`playlist-${playlist.id}`} onContextMenu={setSelectedPlaylist}>
      <Link href={`/playlists/${encodeURIComponent(playlist.id)}`}>
        <a>
          <PlaylistItem playlist={playlist} isOfficial={false} />
        </a>
      </Link>
    </div>
  )
}

function InputPlaylistName({ playlist }: PlaylistProps) {
  const [title, setTitle] = useState(playlist.title)
  const blur = useSetIsEditPlaylistName(null)
  const currentUserId = useGetCurrentUserId()
  const handleBlur = useCallback(async () => {
    if (currentUserId) {
      const playlistRef = userPlaylistDocRef(currentUserId, playlist.id)
      await updateDoc(playlistRef, { title })
    }
    blur()
  }, [blur, currentUserId, playlist.id, title])
  const handleKeyDown = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        await handleBlur()
      }
    },
    [handleBlur],
  )
  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (ref.current) ref.current.focus()
  }, [])
  return (
    <input
      ref={ref}
      defaultValue={title}
      onFocus={(e) => e.currentTarget.select()}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onChange={(e) => setTitle(e.currentTarget.value)}
    />
  )
}
