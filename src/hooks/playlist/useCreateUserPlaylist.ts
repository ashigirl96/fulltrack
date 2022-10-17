import { useCallback, useMemo } from 'react'
import { addDoc, documentId } from '@firebase/firestore'
import {
  firestoreNow,
  userPlaylistCollectionRef,
} from '@/lib/firestore/playlist'
import { usePlaylistCollection } from '@/hooks/playlist'
import { UserId } from '@/types'

type Args = { userId: UserId }
export function useCreateUserPlaylist({ userId }: Args) {
  const { playlistsSnapshot } = usePlaylistCollection(userId)
  const title = useMemo(
    () => `My Playlist #${playlistsSnapshot ? playlistsSnapshot.size + 1 : 0}`,
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
