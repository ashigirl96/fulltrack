import { atomFamily, useRecoilValue } from 'recoil'
import { PlaylistState } from '@/types'

export type PlaylistStoreId = string

export const playlistState = atomFamily<PlaylistState | null, PlaylistStoreId>({
  key: 'playlistState',
  default: null,
})

export function usePlaylistValue(playlistId: PlaylistStoreId) {
  return useRecoilValue(playlistState(playlistId))
}
