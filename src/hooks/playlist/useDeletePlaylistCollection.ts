import { PlaylistStoreId } from '@/atoms/firestore/playlist'
import { deleteDoc, doc } from '@firebase/firestore'
import { db } from '@/config/firebase'
import { useGetCurrentUserId } from '@/hooks/firebaseAuth'
import { useCallback } from 'react'

export function useDeletePlaylistCollection(playlistId: PlaylistStoreId) {
  const userId = useGetCurrentUserId()
  return useCallback(async () => {
    if (userId) {
      await deleteDoc(doc(db, 'users', userId, 'playlists', playlistId))
    }
    return null
  }, [playlistId, userId])
}
