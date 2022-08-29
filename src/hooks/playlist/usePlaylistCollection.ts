import { useCollectionData } from '@/hooks/firestore'
import { db } from '@/config/firebase'
import { collection, doc, query, where } from '@firebase/firestore'
import { playlistConverter } from './converter'

function useCurrentUserDocument(userId: string) {
  return doc(db, 'users', userId)
}

export function usePlaylistCollection(userId: string) {
  const userDocRef = useCurrentUserDocument(userId)
  const playlistCollectionRef = collection(db, 'playlists').withConverter(
    playlistConverter,
  )
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
