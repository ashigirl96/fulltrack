import { useCallback } from 'react'
import { addDoc, collection } from '@firebase/firestore'
import { db } from '@/config/firebase'
import { useGetCurrentUserId } from '@/hooks/firebaseAuth'

export function useCreateUserPlaylist() {
  const userId = useGetCurrentUserId()
  return useCallback(async () => {
    if (!userId) {
      return
    }
    const playlists = collection(db, 'users', userId, 'playlists')
    await addDoc(playlists, {
      title: 'My Playlist',
      videoIds: [],
    })
  }, [userId])
}
