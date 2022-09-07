import {
  atom,
  selector,
  useRecoilCallback,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'
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

export const historyVideoIdsState = atom<VideoFirestoreId[]>({
  key: 'historyVideoIdsState',
  default: [],
})

// 次再生する候補
export const candidateVideoIdsState = atom<VideoFirestoreId[]>({
  key: 'candidateVideoIdsState',
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

function useSetCandidateVideoIds() {
  return useSetRecoilState(candidateVideoIdsState)
}

export function useCandidateVideoIdsValue() {
  return useRecoilValue(candidateVideoIdsState)
}

// プレイリストの中から１つの曲を選択したときに呼ばれる
export function useSetCurrentVideo(
  playlistId: PlaylistStoreId,
  videoId: VideoFirestoreId,
) {
  const setCurrentPlaylistId = useSetCurrentPlaylistId()
  const setCurrentVideoIndex = useSetCurrentVideoIndex()
  const setCurrentVideoIds = useSetCurrentVideoIds()
  const isRandomOrder = useIsRandomOrder()
  const playlist = usePlaylistValue(playlistId)
  const videoIds = playlist?.videoIds || []
  const currentVideoIndex = videoIds.indexOf(videoId)
  const setCandidateVideoIds = useSetCandidateVideoIds()

  return useCallback(() => {
    setCurrentPlaylistId(playlistId)
    setCurrentVideoIndex(currentVideoIndex)
    setCandidateVideoIds([videoIds[currentVideoIndex]])
    // ランダムの場合
    if (isRandomOrder) {
      setCurrentVideoIds(videoIds)
    } else {
      setCurrentVideoIds(videoIds)
    }
  }, [
    currentVideoIndex,
    isRandomOrder,
    playlistId,
    setCandidateVideoIds,
    setCurrentPlaylistId,
    setCurrentVideoIds,
    setCurrentVideoIndex,
    videoIds,
  ])
}

// 曲が終わる、次の曲ボタンが押されたときに呼ばれる
export function useSetNextVideo() {
  return useRecoilCallback(
    ({ set, reset, snapshot }) =>
      async () => {
        const isLastVideo = await snapshot.getPromise(isLastVideoState)
        const isLoop = await snapshot.getPromise(isLoopState)
        // 最後の曲
        if (isLastVideo) {
          // 初期化する
          reset(currentVideoIndexState)
          // ループしてないならば、完了状態にする
          if (!isLoop) {
            set(playerStatusState, 'ended')
          }
        } else {
          // 最後の曲じゃないなら、インクリメントする
          set(currentVideoIndexState, (x) => x + 1)
        }
      },
    [],
  )
}

export function useCurrentVideoTerm() {
  const currentVideoIndex = useCurrentVideoIndexValue()
  const currentVideoIds = useCurrentVideoIdsValue()
  const videoId = currentVideoIds[currentVideoIndex]
  return useVideoValue(videoId)
}

export function useCandidateVideoValue() {
  const candidateVideoId = useCandidateVideoIdsValue()[0]
  return useVideoValue(candidateVideoId)
}
