import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  playlistState,
  PlaylistStoreId,
  playlistVideosLengthState,
} from '@/atoms/firestore/playlist'
import { PlaylistFirestoreId } from '@/types'
import { VideoFirestoreId } from '@/atoms/firestore/video'
import { useCallback } from 'react'
import { PlayerStateKey } from '@/constants/youtube'

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

export const currentPlayerStatusState = atom<PlayerStateKey>({
  key: 'currentPlayerStatusState',
  default: 'ENDED',
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

function useIsRandomOrder() {
  return useRecoilValue(isRandomOrderState)
}

export function useCurrentVideoIndexValue() {
  return useRecoilValue(currentVideoIndexState)
}

export function useCurrentVideoIdsValue() {
  return useRecoilValue(currentVideoIdsState)
}

export function useSetCurrentPlaylistId() {
  return useSetRecoilState(currentPlaylistIdState)
}

export function useSetCurrentVideoIndex() {
  return useSetRecoilState(currentVideoIndexState)
}

export function useSetCurrentVideoIds() {
  return useSetRecoilState(currentVideoIdsState)
}

export function useSetCurrentPlayerStatus() {
  return useSetRecoilState(currentPlayerStatusState)
}

export function useCurrentPlayerStatus() {
  return useRecoilValue(currentPlayerStatusState)
}

export function useSetCurrentVideo(
  playlistId: PlaylistStoreId,
  videoId: VideoFirestoreId,
) {
  const setCurrentPlaylistId = useSetCurrentPlaylistId()
  const setCurrentVideoIndex = useSetCurrentVideoIndex()
  const setCurrentVideoIds = useSetCurrentVideoIds()
  const isRandomOrder = useIsRandomOrder()
  const playlist = useRecoilValue(playlistState(playlistId))
  const videoIds = playlist?.videoIds || []
  const currentVideoIndex = videoIds.indexOf(videoId)

  return useCallback(() => {
    setCurrentPlaylistId(playlistId)
    setCurrentVideoIndex(currentVideoIndex)
    if (isRandomOrder) {
      setCurrentVideoIds(videoIds)
    } else {
      setCurrentVideoIds(videoIds)
    }
  }, [
    currentVideoIndex,
    isRandomOrder,
    playlistId,
    setCurrentPlaylistId,
    setCurrentVideoIds,
    setCurrentVideoIndex,
    videoIds,
  ])
}
