import { atom, useRecoilValue, useSetRecoilState } from 'recoil'
import { PlaylistFirestoreId } from '@/types'
import { useVideoValue, VideoFirestoreId } from '@/atoms/firestore/video'
import { PlayerStateKey } from '@/constants/youtube'
import { isEqualArray, shuffleWithFirst } from '@/lib/array'
import { useMemo } from 'react'

// 現在再生してるプレイリストのID
const currentPlaylistIdState = atom<PlaylistFirestoreId | null>({
  key: 'currentPlaylistIdState',
  default: null,
})

export function useSetCurrentPlaylistId() {
  return useSetRecoilState(currentPlaylistIdState)
}

// リピート
export type RepeatStatusState = 'default' | 'repeat' | 'repeat-one'
const repeatStatusState = atom<RepeatStatusState>({
  key: 'repeatStatusState',
  default: 'default',
})

export function useRepeatStatusValue() {
  return useRecoilValue(repeatStatusState)
}

export function useSetRepeatStatus() {
  return useSetRecoilState(repeatStatusState)
}

// ランダム
const isShuffleState = atom<boolean>({
  key: 'isShuffleState',
  default: false,
})

export function useSetIsShuffle() {
  return useSetRecoilState(isShuffleState)
}

export function useIsShuffleValue() {
  return useRecoilValue(isShuffleState)
}

// プレイリスト内のVideoのインデックス
const currentVideoIndexState = atom<number>({
  key: 'currentVideoIndexState',
  default: 0,
})

export function useSetCurrentVideoIndex() {
  return useSetRecoilState(currentVideoIndexState)
}

export function useCurrentVideoIndexValue() {
  return useRecoilValue(currentVideoIndexState)
}

// 現在再生してるプレイリストのvideoのID
const currentVideoIdsState = atom<VideoFirestoreId[]>({
  key: 'currentVideoIdsState',
  default: [],
})

export function useCurrentVideoIdsValue() {
  return useRecoilValue(currentVideoIdsState)
}

export function useSetCurrentVideoIds() {
  return useSetRecoilState(currentVideoIdsState)
}

// 現在再生する元のトラックのvideoのID
const currentTrackVideoIdsState = atom<VideoFirestoreId[]>({
  key: 'currentTrackVideoIdsState',
  default: [],
})

export function useCurrentTrackVideoIdsValue() {
  return useRecoilValue(currentTrackVideoIdsState)
}

export function useSetCurrentTrackVideoIds() {
  return useSetRecoilState(currentTrackVideoIdsState)
}

// プレイヤーのステータス
const currentPlayerStatusState = atom<PlayerStateKey>({
  key: 'currentPlayerStatusState',
  default: 'ENDED',
})

export function useSetCurrentPlayerStatus() {
  return useSetRecoilState(currentPlayerStatusState)
}

export function useCurrentPlayerStatusValue() {
  return useRecoilValue(currentPlayerStatusState)
}

// ボリューム
const currentVolumeState = atom<number>({
  key: 'currentVolumeState',
  default: 50,
})

export function useSetCurrentVolume() {
  return useSetRecoilState(currentVolumeState)
}

export function useCurrentVolumeValue() {
  return useRecoilValue(currentVolumeState)
}

export function useCurrentVideoIdValue() {
  const currentVideoIndex = useCurrentVideoIndexValue()
  const currentVideoIds = useCurrentVideoIdsValue()
  return currentVideoIds[currentVideoIndex]
}

export function useCurrentVideoValue() {
  const currentVideoId = useCurrentVideoIdValue()
  return useVideoValue(currentVideoId)
}

export function useIsPlayingVideo(videoId: VideoFirestoreId) {
  const currentVideoId = useCurrentVideoIdValue()
  return useMemo(() => videoId === currentVideoId, [currentVideoId, videoId])
}

// shuffle
export function useShuffledCurrentVideoIds(first: VideoFirestoreId) {
  const currentVideoIds = useCurrentVideoIdsValue()
  return shuffleWithFirst([...currentVideoIds], first)
}

export function useIsShuffled() {
  const currentVideoIds = useCurrentVideoIdsValue()
  const videoIds = useCurrentTrackVideoIdsValue()
  return !isEqualArray(currentVideoIds, videoIds)
}
