import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  PlaylistStoreId,
  playlistVideosLengthState,
  usePlaylistValue,
} from '@/atoms/firestore/playlist'
import { PlaylistFirestoreId, YouTubePlayerType } from '@/types'
import { useVideoValue, VideoFirestoreId } from '@/atoms/firestore/video'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { PlayerStateKey } from '@/constants/youtube'
import { shuffleWithFirst } from '@/lib/array'
import { useInterval } from '@/hooks/react-use/useInterval'
import { getPlayerStateKey } from '@/lib/youtube'

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

export const currentVolumeState = atom<number>({
  key: 'currentVolumeState',
  default: 50,
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

export function useSetCurrentVolume() {
  return useSetRecoilState(currentVolumeState)
}

export function useCurrentVolumeValue() {
  return useRecoilValue(currentVolumeState)
}

// プレイリストの中から１つの曲を選択したときに呼ばれる
export function useSetCurrentVideo(
  playlistId: PlaylistStoreId,
  videoId: VideoFirestoreId,
  readyEvent: YouTubePlayerType | undefined,
) {
  const playlist = usePlaylistValue(playlistId)
  const videoIds = useMemo(() => playlist?.videoIds || [], [playlist?.videoIds])
  const currentVideoIndex = videoIds.indexOf(videoId)
  const setCurrentVideoIds = useSetCurrentVideoIds()
  const setCurrentVideoIndex = useSetCurrentVideoIndex()
  const isRandomOrder = useIsRandomOrderValue()
  const currentVideo = useCurrentVideo()
  const isSameVideo = useMemo(
    () => currentVideo && currentVideo.id === videoId,
    [currentVideo, videoId],
  )

  return useCallback(async () => {
    if (isRandomOrder) {
      setCurrentVideoIds(shuffleWithFirst([...videoIds], videoId))
      setCurrentVideoIndex(0)
      return
    }
    if (isSameVideo && currentVideo && readyEvent) {
      await readyEvent.seekTo(currentVideo.start, true)
      return
    }
    setCurrentVideoIds(videoIds)
    setCurrentVideoIndex(currentVideoIndex)
  }, [
    currentVideo,
    currentVideoIndex,
    isRandomOrder,
    isSameVideo,
    readyEvent,
    setCurrentVideoIds,
    setCurrentVideoIndex,
    videoId,
    videoIds,
  ])
}

export function useSetPreviousVideo() {
  const setCurrentVideoIndex = useSetCurrentVideoIndex()
  return useCallback(() => {
    setCurrentVideoIndex((index) => (index < 1 ? 0 : index - 1))
  }, [setCurrentVideoIndex])
}

// 曲が終わる、次の曲ボタンが押されたときに呼ばれる
export function useSetNextVideo() {
  const isLoop = useIsLoopValue()
  const setCurrentVideoIndex = useSetCurrentVideoIndex()
  const currentPlaylistVideoLength = useCurrentVideoIdsValue().length

  return useCallback(() => {
    setCurrentVideoIndex((index) => {
      const isLast = index === currentPlaylistVideoLength - 1
      if (isLoop) {
        return isLast ? 0 : index + 1
      }
      return isLast ? index : index + 1
    })
  }, [currentPlaylistVideoLength, isLoop, setCurrentVideoIndex])
}

export function useCandidateVideoValue() {
  const currentVideoId = useCurrentVideoId()
  return useVideoValue(currentVideoId)
}

export function useCurrentVideoId() {
  const currentVideoIndex = useCurrentVideoIndexValue()
  const currentVideoIds = useCurrentVideoIdsValue()
  return currentVideoIds[currentVideoIndex]
}

export function useCurrentVideo() {
  const currentVideoId = useCurrentVideoId()
  return useVideoValue(currentVideoId)
}

export function useSetToggleLoop() {
  const setIsLoop = useSetRecoilState(isLoopState)
  return useCallback(() => setIsLoop((x) => !x), [setIsLoop])
}

export function useSetToggleRandomOrder() {
  const setIsRandomOrder = useSetRecoilState(isRandomOrderState)
  return useCallback(() => setIsRandomOrder((x) => !x), [setIsRandomOrder])
}

export function useCurrentDuration(event: YouTubePlayerType | undefined) {
  const [duration, _setDuration] = useState(0)
  const video = useCurrentVideo()

  const setDuration = useCallback(async () => {
    if (event && video) {
      const status = getPlayerStateKey(await event.getPlayerState())
      switch (status) {
        case 'PLAYING': {
          const { start, end } = video
          const now = await event.getCurrentTime()
          const durationPercent = Math.min(
            Math.max((100 * (now - start)) / (end - start), 0),
            100,
          )
          _setDuration(durationPercent)
          break
        }
        default:
          clearInterval()
          break
      }
    }
  }, [event, video])

  const setPercent = useCallback(
    async (inputEvent: ChangeEvent<HTMLInputElement>) => {
      if (event && video) {
        const { start, end } = video
        const percent = Number(inputEvent.currentTarget.value)
        const duration = (percent * (end - start)) / 100
        _setDuration(percent)
        await event.seekTo(duration + start, true)
      }
    },
    [event, video],
  )

  useInterval(setDuration, 100)

  return [duration, setPercent] as const
}
