import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  PlaylistStoreId,
  playlistVideosLengthState,
  usePlaylistValue,
} from '@/atoms/firestore/playlist'
import { PlaylistFirestoreId } from '@/types'
import { VideoFirestoreId, useVideoValue } from '@/atoms/firestore/video'
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

export function useIsLoopValue() {
  return useRecoilValue(isLoopState)
}

export function useIsRandomOrderValue() {
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

// プレイリストの中から１つの曲を選択したときに呼ばれる
export function useSetCurrentVideo(
  playlistId: PlaylistStoreId,
  videoId: VideoFirestoreId,
) {
  const playlist = usePlaylistValue(playlistId)
  const videoIds = playlist?.videoIds || []
  const currentVideoIndex = videoIds.indexOf(videoId)
  const setCurrentVideoIds = useSetCurrentVideoIds()
  const setCurrentVideoIndex = useSetCurrentVideoIndex()

  return useCallback(() => {
    // TODO: isRandomOrderのとき、videoIdsをランダムにする
    setCurrentVideoIds(videoIds)
    setCurrentVideoIndex(currentVideoIndex)
  }, [currentVideoIndex, setCurrentVideoIds, setCurrentVideoIndex, videoIds])
}

export function useSetPreviousVideo() {
  const isRandomOrder = useIsRandomOrderValue()
  const setCurrentVideoIndex = useSetCurrentVideoIndex()
  return useCallback(() => {
    if (isRandomOrder) {
      return
    } else {
      setCurrentVideoIndex((index) => (index < 1 ? 0 : index - 1))
    }
  }, [isRandomOrder, setCurrentVideoIndex])
}

// 曲が終わる、次の曲ボタンが押されたときに呼ばれる
export function useSetNextVideo() {
  const currentVideoId = useCurrentVideoId()
  const setCurrentVideoIndex = useSetCurrentVideoIndex()
  const currentPlaylistVideoLength = useCurrentVideoIdsValue().length

  return useCallback(() => {
    setCurrentVideoIndex((index) =>
      index === currentPlaylistVideoLength - 1 ? 0 : index + 1,
    )
  }, [currentPlaylistVideoLength, currentVideoId, setCurrentVideoIndex])
}

export function useCandidateVideoValue() {
  const currentVideoId = useCurrentVideoId()
  return useVideoValue(currentVideoId)
}

function useCurrentVideoId() {
  const currentVideoIndex = useCurrentVideoIndexValue()
  const currentVideoIds = useCurrentVideoIdsValue()
  return currentVideoIds[currentVideoIndex]
}

export function useSetToggleLoop() {
  const setIsLoop = useSetRecoilState(isLoopState)
  return useCallback(() => setIsLoop((x) => !x), [setIsLoop])
}

export function useSetToggleRandomOrder() {
  const setIsRandomOrder = useSetRecoilState(isRandomOrderState)
  return useCallback(() => setIsRandomOrder((x) => !x), [setIsRandomOrder])
}
