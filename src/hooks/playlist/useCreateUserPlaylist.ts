import { useCallback, useMemo } from 'react'
import { addDoc, documentId } from '@firebase/firestore'
import {
  firestoreNow,
  userPlaylistCollectionRef,
} from '@/lib/firestore/playlist'
import { useUserPlaylistCollection } from '@/hooks/playlist/useUserPlaylistCollection'
import { UserId } from '@/types'

type Args = { userId: UserId }
export function useCreateUserPlaylist({ userId }: Args) {
  const { playlistsSnapshot } = useUserPlaylistCollection(userId)
  const title = useMemo(
    () => `My Playlist ${playlistsSnapshot?.size || 0}`,
    [playlistsSnapshot],
  )
  return useCallback(async () => {
    const playlists = userPlaylistCollectionRef(userId)
    await addDoc(playlists, {
      title,
      id: documentId(),
      videoIds: [],
      thumbnailUrl: '',
      createdAt: firestoreNow(),
    })
  }, [title, userId])
}