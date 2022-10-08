import { ArtistFirebaseId } from '@/types'
import { artistDocRef } from '@/lib/firestore/artist'
import { getDocs, query, where } from '@firebase/firestore'
import { videoCollectionRef } from '@/lib/firestore/video'
import { useAsync } from '@/hooks/react-use/useAsync'

export function useVideosByArtistId(artistId: ArtistFirebaseId) {
  const result = useAsync(async () => {
    const artistRef = artistDocRef(artistId)
    const q = query(
      videoCollectionRef,
      where('artists', 'array-contains', artistRef),
    )
    return (await getDocs(q)).docs.map((doc) => doc.data())
  }, [artistId])
  return {
    isLoading: result.loading,
    error: result.error,
    videos: result.value,
  }
}
