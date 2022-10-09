import {
  atomFamily,
  useRecoilCallback,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'
import { PlaylistState, PlaylistStore } from '@/types'

export type PlaylistStoreId = string

export const playlistState = atomFamily<PlaylistState | null, PlaylistStoreId>({
  key: 'playlistState',
  default: null,
})

export function useSetPlaylist(playlistId: PlaylistStoreId) {
  return useSetRecoilState(playlistState(playlistId))
}

export function usePlaylistValue(playlistId: PlaylistStoreId) {
  return useRecoilValue(playlistState(playlistId))
}

// TODO: refactor. useRecoilSnapshotを使う
export function useSetPlaylistValues(
  playlists: PlaylistStore[],
  isOfficial: boolean,
) {
  return useRecoilCallback(
    ({ set }) =>
      () => {
        for (const playlist of playlists) {
          set(playlistState(playlist.id), {
            isOfficial,
            ...playlist,
          })
        }
      },
    [playlists, isOfficial],
  )
}
