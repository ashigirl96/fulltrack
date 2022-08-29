import { atomFamily } from 'recoil'
import { PlaylistStore } from '@/types'

type PlaylistStoreId = string

export const playlistState = atomFamily<PlaylistStore | null, PlaylistStoreId>({
  key: 'playlistState',
  default: null,
})
