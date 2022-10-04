import { useCallback } from 'react'
import { PlaylistFirestoreId } from '@/types'
import { userPlaylistDocRef } from '@/lib/firestore/playlist'
import { updateDoc } from '@firebase/firestore'
import { useGetCurrentUserId } from '@/hooks/firebaseAuth'

type Args = {
  playlistId: PlaylistFirestoreId
  title: string
  callback?: () => void
}
export function useUpdatePlaylistTitle({ playlistId, callback, title }: Args) {
  const userId = useGetCurrentUserId()
  return useCallback(async () => {
    if (userId) {
      const playlistRef = userPlaylistDocRef(userId, playlistId)
      await updateDoc(playlistRef, { title })
    }
    callback && callback()
  }, [callback, playlistId, title, userId])
}
