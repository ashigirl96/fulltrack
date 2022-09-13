import { atomFamily, useRecoilValue } from 'recoil'
import { PlaylistStore } from '@/types'

export type PlaylistStoreId = string

export const playlistState = atomFamily<PlaylistStore | null, PlaylistStoreId>({
  key: 'playlistState',
  default: null,
})

export function usePlaylistValue(playlistId: PlaylistStoreId) {
  return useRecoilValue(playlistState(playlistId))
}
