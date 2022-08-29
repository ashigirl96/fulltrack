import { atomFamily } from 'recoil'
import { Playlist, UserId } from '@/types'

export const playlistsState = atomFamily<Playlist[] | null, UserId | undefined>(
  {
    key: 'playlistsState',
    default: null,
  },
)
