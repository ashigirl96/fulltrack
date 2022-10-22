import { useCallback, useMemo } from 'react'
import { addDoc, documentId } from '@firebase/firestore'
import { firestoreNow, playlistCollectionRef } from '@/lib/firestore/playlist'
import { usePlaylistCollection } from '@/hooks/playlist'
import { UserId } from '@/types'
import { VideoDocRef } from '@/lib/firestore/video'

type Args = {
  userId: UserId
  videoIds?: VideoDocRef[]
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      videoIds: videoIds,
      thumbnailUrl: '',
      createdAt: firestoreNow(),
    })
  }, [_title, userId, videoIds])
}
