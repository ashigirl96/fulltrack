import { ArtistFirebaseId } from '@/types/ArtistStore'
import { getDoc } from '@firebase/firestore'
import { useArtistValue, useSetArtist } from '@/atoms/firestore/artist'
import { useEffect } from 'react'
import { artistDocRef } from '@/lib/firestore/artist'

export function useArtistById(artistId: ArtistFirebaseId) {
  const artist = useArtistValue(artistId)
  const setArtist = useSetArtist(artistId)
  useEffect(() => {
    ;(async () => {
      if (!artist) {
        const result = (await getDoc(artistDocRef(artistId))).data()
        setArtist({
          id: artistId,
          name: result?.name || '',
        })
      }
    })()
  }, [artist, artistId, setArtist])
  return artist
}
