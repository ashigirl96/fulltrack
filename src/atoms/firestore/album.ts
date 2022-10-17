import { atomFamily, useRecoilCallback, useRecoilValue } from 'recoil'
import { AlbumState, AlbumStore } from '@/types'

export type AlbumId = string

export const albumState = atomFamily<AlbumState | null, AlbumId>({
  key: 'albumState',
  default: null,
})

export function useAlbumValue(playlistId: AlbumId) {
  return useRecoilValue(albumState(playlistId))
}

export function useSetAlbumValues(albums: AlbumStore[]) {
  return useRecoilCallback(
    ({ set }) =>
      () => {
        for (const album of albums) {
          set(albumState(album.id), {
            ...album,
          })
        }
      },
    [albums],
  )
}
