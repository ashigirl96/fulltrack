import {
  atomFamily,
  selectorFamily,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'
import { PlaylistState } from '@/types'

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
