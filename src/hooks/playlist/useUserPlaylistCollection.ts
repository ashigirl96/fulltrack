import { useCollectionData } from '@/hooks/firestore'
import { db } from '@/config/firebase'
import { doc, query, where } from '@firebase/firestore'
import { userPlaylistCollectionRef } from '@/lib/firestore/userPlaylist'
import { playlistCollectionRef } from '@/lib/firestore/playlist'

function useCurrentUserDocument(userId: string) {
  return doc(db, 'users', userId)
}

export function useUserPlaylistCollection(userId: string) {
  const userDocRef = useCurrentUserDocument(userId)
  const playlistQuery = query(
    userPlaylistCollectionRef,
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

export function usePlaylistCollection() {
  const [playlists, isLoading, error, playlistsSnapshot] = useCollectionData(
    playlistCollectionRef,
  )

  return {
    playlists,
    isLoading,
    error,
    playlistsSnapshot,
  }
}
