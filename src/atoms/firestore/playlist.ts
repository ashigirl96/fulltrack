import { atomFamily, selectorFamily } from 'recoil'
import { Playlist, UserId } from '@/types'
import { fetchPlaylistByUserId } from '@/hooks/playlist/fetchPlaylistByUserId'

export const playlistsState = atomFamily<Playlist[] | null, UserId | undefined>(
  {
    key: 'playlistsState',
    default: null,
  },
)

export const playlistsSelector = selectorFamily<Playlist[], UserId | undefined>(
  {
    key: 'playlistsSelector',
    get:
      (userId) =>
      async ({ get }) => {
        if (!userId) {
          return []
        }
        return (
          get(playlistsState(userId)) || (await fetchPlaylistByUserId(userId))
        )
      },
  },
)
