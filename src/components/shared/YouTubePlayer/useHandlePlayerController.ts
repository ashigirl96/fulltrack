import { YouTubePlayerType } from '@/types'
import {
  useCurrentPlayerStatusValue,
  useCurrentPlaylistVideoIdsValue,
  useCurrentVideoIdValue,
  useCurrentVideoValue,
  useIsShuffled,
  useIsShuffleValue,
  useSetCurrentVideoIds,
  useSetCurrentVideoIndex,
  useSetIsShuffle,
  useSetRepeatStatus,
  useShuffledCurrentVideoIds,
} from '@/atoms/youtubePlayer'
import { useCallback, useMemo } from 'react'
import {
  useSetNextVideo,
  useSetPreviousVideo,
} from '@/atoms/youtubePlayer/hooks'
import { useRepeatStatusValue } from '@/atoms/youtubePlayer/states'

export function useHandlePlayerController(
  readyEvent: YouTubePlayerType | undefined,
) {
  const {
    currentPlayerStatus,
    setNextVideo,
    setPreviousVideo,
    currentVideo,
    currentVideoId,
    isShuffled,
    setCurrentVideoIds,
    setCurrentVideoIndex,
    setIsShuffle,
    shuffledVideoIds,
    videoIds,
    isShuffle,
    isPause,
    setRepeatStatus,
    repeatStatus,
  } = useHandlePlayerControllerState()

  // 再生・停止ボタンを押したときに呼ばれる
  const handlePlayController = useHandlePlayControl({
    currentPlayerStatus,
    readyEvent,
  })
  // 前の動画再生ボタンを押したときに呼ばれる
  const handlePreviousVideo = useHandlePreviousVideo({
    currentVideo,
    readyEvent,
    setPreviousVideo,
  })
  // 次の動画再生ボタンを押したときに呼ばれる
  const handleNextVideo = useHandleNextVideo({
    setNextVideo,
    repeatStatus,
    setRepeatStatus,
  })
  // シャッフルボタンを押したときに呼ばれる
  const handleShuffle = useHandleShuffle({
    currentVideoId,
    isShuffled,
    setCurrentVideoIds,
    setCurrentVideoIndex,
    shuffledVideoIds,
    videoIds,
    setIsShuffle,
  })
  // ループボタンを押したときに呼ばれる
  const handleRepeat = useHandleRepeat({ setRepeatStatus })

  return {
    readyEvent,
    isShuffle,
    isPause,
    handleRepeat,
    handlePlayController,
    handleShuffle,
    handlePreviousVideo,
    handleNextVideo,
    repeatStatus,
  }
}

// 曲を再生・停止をする
type PlayControlArgs = Pick<
  ReturnTypeUseHandlePlayerController,
  'currentPlayerStatus' | 'readyEvent'
>
function useHandlePlayControl({
  currentPlayerStatus,
  readyEvent,
}: PlayControlArgs) {
  return useCallback(async () => {
    if (readyEvent) {
      switch (currentPlayerStatus) {
        case 'PAUSED':
          await readyEvent.playVideo()
          break
        case 'PLAYING':
          await readyEvent.pauseVideo()
          break
        default:
          break
      }
    }
  }, [currentPlayerStatus, readyEvent])
}

// 前の曲を選択したときに発火する
type PreviousArgs = Pick<
  ReturnTypeUseHandlePlayerController,
  'currentVideo' | 'readyEvent' | 'setPreviousVideo'
>
function useHandlePreviousVideo({
  currentVideo,
  readyEvent,
  setPreviousVideo,
}: PreviousArgs) {
  return useCallback(async () => {
    if (currentVideo && readyEvent) {
      const now = await readyEvent.getCurrentTime()
      const { start } = currentVideo
      const startedDuration = now - start
      if (startedDuration <= 2) {
        setPreviousVideo()
        return
      }
      await readyEvent.seekTo(start, true)
    }
  }, [setPreviousVideo, readyEvent, currentVideo])
}

// 次の曲を選択したときに発火する
type NextArgs = Pick<
  ReturnTypeUseHandlePlayerController,
  'setNextVideo' | 'repeatStatus' | 'setRepeatStatus'
>
function useHandleNextVideo({
  setNextVideo,
  repeatStatus,
  setRepeatStatus,
}: NextArgs) {
  // TODO: リファクタリング. もっと良い書き方ないか模索
  return useCallback(async () => {
    switch (repeatStatus) {
      case 'repeat-one':
        setRepeatStatus('repeat')
        break
      default:
        break
    }
    setNextVideo(true)
  }, [repeatStatus, setNextVideo, setRepeatStatus])
}

type RepeatArgs = Pick<ReturnTypeUseHandlePlayerController, 'setRepeatStatus'>
function useHandleRepeat({ setRepeatStatus }: RepeatArgs) {
  return useCallback(
    () =>
      setRepeatStatus((prev) => {
        switch (prev) {
          case 'default':
            return 'repeat'
          case 'repeat':
            return 'repeat-one'
          case 'repeat-one':
            return 'default'
        }
      }),
    [setRepeatStatus],
  )
}

type ShuffleArgs = Pick<
  ReturnTypeUseHandlePlayerController,
  | 'currentVideoId'
  | 'isShuffled'
  | 'setCurrentVideoIds'
  | 'setCurrentVideoIndex'
  | 'setIsShuffle'
  | 'shuffledVideoIds'
  | 'videoIds'
>
function useHandleShuffle({
  currentVideoId,
  isShuffled,
  setCurrentVideoIds,
  setCurrentVideoIndex,
  shuffledVideoIds,
  videoIds,
  setIsShuffle,
}: ShuffleArgs) {
  return useCallback(() => {
    if (isShuffled) {
      // もとに戻す
      setCurrentVideoIds(videoIds)
      setCurrentVideoIndex(videoIds.indexOf(currentVideoId))
    } else {
      // シャッフルする
      setCurrentVideoIds(shuffledVideoIds)
      setCurrentVideoIndex(0)
    }
    setIsShuffle((prev) => !prev)
  }, [
    currentVideoId,
    isShuffled,
    setCurrentVideoIds,
    setCurrentVideoIndex,
    setIsShuffle,
    shuffledVideoIds,
    videoIds,
  ])
}

// 状態
function useHandlePlayerControllerState() {
  const currentPlayerStatus = useCurrentPlayerStatusValue()
  const setNextVideo = useSetNextVideo()
  const setPreviousVideo = useSetPreviousVideo()
  const setRepeatStatus = useSetRepeatStatus()
  const currentVideoId = useCurrentVideoIdValue()
  const currentVideo = useCurrentVideoValue()
  const isShuffled = useIsShuffled()
  const setIsShuffle = useSetIsShuffle()
  const shuffledVideoIds = useShuffledCurrentVideoIds(currentVideoId)
  const setCurrentVideoIds = useSetCurrentVideoIds()
  const setCurrentVideoIndex = useSetCurrentVideoIndex()
  const videoIds = useCurrentPlaylistVideoIdsValue()

  const repeatStatus = useRepeatStatusValue()
  const isShuffle = useIsShuffleValue()
  const isPause = useMemo(
    () => currentPlayerStatus === 'PAUSED',
    [currentPlayerStatus],
  )

  return {
    currentPlayerStatus,
    setNextVideo,
    setPreviousVideo,
    setRepeatStatus,
    currentVideo,
    currentVideoId,
    isShuffled,
    setCurrentVideoIds,
    setCurrentVideoIndex,
    setIsShuffle,
    shuffledVideoIds,
    videoIds,
    repeatStatus,
    isShuffle,
    isPause,
  }
}

type ReturnTypeUseHandlePlayerController = ReturnType<
  typeof useHandlePlayerControllerState
> & { readyEvent: YouTubePlayerType | undefined }
