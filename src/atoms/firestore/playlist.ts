import { atomFamily, selectorFamily } from 'recoil'
import { PlaylistStore } from '@/types'

export type PlaylistStoreId = string

export const playlistState = atomFamily<PlaylistStore | null, PlaylistStoreId>({
  key: 'playlistState',
  default: null,
})

export const playlistVideosLengthState = selectorFamily<
  number | null,
  PlaylistStoreId
>({
  key: 'playlistVideosLengthState',
  get:
    (playlistId) =>
    ({ get }) => {
      const playlist = get(playlistState(playlistId))
      if (playlist === null) return null
      return playlist.videoIds.length
    },
})
