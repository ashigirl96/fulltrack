import { atomFamily, useRecoilCallback, useRecoilValue } from 'recoil'
import { PlaylistState, PlaylistStore } from '@/types'

export type PlaylistStoreId = string

export const playlistState = atomFamily<PlaylistState | null, PlaylistStoreId>({
  key: 'playlistState',
  default: null,
})

export function usePlaylistValue(playlistId: PlaylistStoreId) {
  return useRecoilValue(playlistState(playlistId))
}

// TODO: refactor. useRecoilSnapshotを使う
export function useSetPlaylistValues(playlists: PlaylistStore[]) {
  return useRecoilCallback(
    ({ set }) =>
      () => {
        for (const playlist of playlists) {
          set(playlistState(playlist.id), {
            ...playlist,
          })
        }
      },
    [playlists],
  )
}
