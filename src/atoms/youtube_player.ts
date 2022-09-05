import { atom, selector } from 'recoil'
import { YouTubePlayer } from 'youtube-player/dist/types'
import { playlistVideosLengthState } from '@/atoms/firestore/playlist'
import { PlaylistFirestoreId } from '@/types'

export const videoReadyEventState = atom<YouTubePlayer>({
  key: 'videoReadyEventState',
  default: undefined,
})

export const currentPlaylistIdState = atom<PlaylistFirestoreId | null>({
  key: 'currentPlaylistIdState',
  default: null,
})

export const isLoopState = atom<boolean>({
  key: 'isLoopState',
  default: false,
})

export const isRandomOrderState = atom<boolean>({
  key: 'isRandomOrderState',
  default: false,
})

export const playerStatusState = atom<'pause' | 'playing' | 'ended'>({
  key: 'playerStatusState',
  default: 'ended',
})

export const currentVideoIndexState = atom<number>({
  key: 'currentVideoIndexState',
  default: 0,
})

export const currentVideoIdsState = atom<string[]>({
  key: 'currentVideoIdsState',
  default: [],
})

export const isLastVideoState = selector<boolean | null>({
  key: 'isLastVideoState',
  get: ({ get }) => {
    const playingPlaylistId = get(currentPlaylistIdState)
    if (playingPlaylistId === null) return null
    const length = get(playlistVideosLengthState(playingPlaylistId))
    if (length === null) return null
    const playingVideoIndex = get(currentVideoIndexState)
    return playingVideoIndex === length
  },
})
