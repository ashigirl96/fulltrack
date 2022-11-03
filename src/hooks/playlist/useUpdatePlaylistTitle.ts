import { useCallback } from 'react'
import { PlaylistFirestoreId } from '@/types'
import { playlistDocRef } from '@/lib/firestore/playlist'
import { updateDoc } from '@firebase/firestore'
import { useGetCurrentUserId } from '@/hooks/firebaseAuth'

type Args = {
  playlistId: PlaylistFirestoreId
  callback?: () => void
}
export function useUpdatePlaylistTitle({ playlistId, callback }: Args) {
  const userId = useGetCurrentUserId()
  return useCallback(
    async (title: string) => {
      if (userId) {
        const playlistRef = playlistDocRef(userId, playlistId)
        await updateDoc(playlistRef, { title })
      }
      callback && callback()
    },
    [callback, playlistId, userId],
  )
}
