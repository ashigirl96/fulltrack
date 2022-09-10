import { atom, useRecoilValue, useSetRecoilState } from 'recoil'
import { PlaylistFirestoreId } from '@/types'
import { useVideoValue, VideoFirestoreId } from '@/atoms/firestore/video'
import { PlayerStateKey } from '@/constants/youtube'
import { playlistState } from '@/atoms/firestore/playlist'
import { isEqualArray, shuffleWithFirst } from '@/lib/array'

// 現在再生してるプレイリストのID
const currentPlaylistIdState = atom<PlaylistFirestoreId | null>({
  key: 'currentPlaylistIdState',
  default: null,
})

export function useSetCurrentPlaylistId() {
  return useSetRecoilState(currentPlaylistIdState)
}

export function useCurrentPlaylistIdValue() {
  return useRecoilValue(currentPlaylistIdState)
}

// ループ
const isLoopState = atom<boolean>({
  key: 'isLoopState',
  default: false,
})

export function useIsLoopValue() {
  return useRecoilValue(isLoopState)
}

export function useSetIsLoop() {
  return useSetRecoilState(isLoopState)
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

// Playlist
export function useCurrentPlaylistValue() {
  const currentPlaylistId = useCurrentPlaylistIdValue()
  return useRecoilValue(playlistState(currentPlaylistId || ''))
}

// video
export function useCurrentPlaylistVideoIdsValue() {
  const currentPlaylist = useCurrentPlaylistValue()
  return currentPlaylist ? currentPlaylist.videoIds : []
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

// shuffle
export function useShuffledCurrentVideoIds(first: VideoFirestoreId) {
  const currentVideoIds = useCurrentVideoIdsValue()
  return shuffleWithFirst([...currentVideoIds], first)
}

export function useIsShuffled() {
  const currentVideoIds = useCurrentVideoIdsValue()
  const videoIds = useCurrentPlaylistVideoIdsValue()
  return !isEqualArray(currentVideoIds, videoIds)
}