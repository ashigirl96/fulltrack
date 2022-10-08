import { atomFamily, useRecoilValue, useSetRecoilState } from 'recoil'
import type { ArtistFirebaseId, ArtistFirestore } from '@/types'

export const artistState = atomFamily<ArtistFirestore | null, ArtistFirebaseId>(
  {
    key: 'artistState',
    default: null,
  },
)

export function useSetArtist(artistId: ArtistFirebaseId) {
  return useSetRecoilState(artistState(artistId))
}

export function useArtistValue(artistId: ArtistFirebaseId) {
  return useRecoilValue(artistState(artistId))
}
