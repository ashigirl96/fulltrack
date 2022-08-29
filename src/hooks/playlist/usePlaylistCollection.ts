import { useCollectionData } from '@/hooks/firestore'
import { db } from '@/config/firebase'
import { doc, query, where } from '@firebase/firestore'
import { playlistCollectionRef } from '@/lib/firestore/playlist'

function useCurrentUserDocument(userId: string) {
  return doc(db, 'users', userId)
}

export function usePlaylistCollection(userId: string) {
  const userDocRef = useCurrentUserDocument(userId)
  const playlistQuery = query(
    playlistCollectionRef,
    where('user', '==', userDocRef),
  )
  const [playlists, isLoading, error, playlistsSnapshot] =
    useCollectionData(playlistQuery)

  return {
    playlists,
    isLoading,
    error,
    playlistsSnapshot,
  }
}
