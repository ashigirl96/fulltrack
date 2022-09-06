import { atom, selector } from 'recoil'
import { playlistVideosLengthState } from '@/atoms/firestore/playlist'
import { PlaylistFirestoreId } from '@/types'
import { VideoFirestoreId } from '@/atoms/firestore/video'

// TODO: YoutubeEvent['target']が入らない
// export const videoReadyEventState = atom<YouTubePlayer>({
//   key: 'videoReadyEventState',
//   default: undefined,
// })

export const currentPlaylistIdState = atom<PlaylistFirestoreId | null>({
  key: 'currentPlaylistIdState',
  default: null,
})

export const isLoopState = atom<boolean>({
  key: 'isLoopState',
  default: true,
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

export const currentVideoIdsState = atom<VideoFirestoreId[]>({
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
    const currentVideoIndex = get(currentVideoIndexState)
    return currentVideoIndex === length - 1
  },
})
