import { useCallback, useMemo } from 'react'
import { addDoc, documentId, WithFieldValue } from '@firebase/firestore'
import { firestoreNow, playlistCollectionRef } from '@/lib/firestore/playlist'
import { usePlaylistCollection } from '@/hooks/playlist'
import { UserId } from '@/types'

type Args = {
  userId: UserId
  videoIds?: WithFieldValue<string[]>
  title?: string
}
export function useCreatePlaylist({ userId, videoIds = [], title = '' }: Args) {
  const { playlistsSnapshot } = usePlaylistCollection(userId)
  const _title = useMemo(
    () =>
      title
        ? title
        : `My Playlist #${playlistsSnapshot ? playlistsSnapshot.size + 1 : 0}`,
    [playlistsSnapshot, title],
  )
  return useCallback(async () => {
    const playlists = playlistCollectionRef(userId)
    await addDoc(playlists, {
      title: _title,
      id: documentId(),
      videoIds: videoIds,
      thumbnailUrl: '',
      createdAt: firestoreNow(),
    })
  }, [_title, userId, videoIds])
}
