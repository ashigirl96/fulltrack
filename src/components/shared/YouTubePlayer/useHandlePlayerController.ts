import { YouTubePlayerType } from '@/types'
import {
  useCurrentPlayerStatusValue,
  useCurrentPlaylistVideoIdsValue,
  useCurrentVideoIdValue,
  useCurrentVideoValue,
  useIsLoopValue,
  useIsShuffled,
  useIsShuffleValue,
  useSetCurrentVideoIds,
  useSetCurrentVideoIndex,
  useSetIsLoop,
  useSetIsShuffle,
  useShuffledCurrentVideoIds,
} from '@/atoms/youtubePlayer'
import { useCallback, useMemo } from 'react'
import {
  useSetNextVideo,
  useSetPreviousVideo,
} from '@/atoms/youtubePlayer/hooks'

export function useHandlePlayerController(
  readyEvent: YouTubePlayerType | undefined,
) {
  const {
    currentPlayerStatus,
    setNextVideo,
    setPreviousVideo,
    setLoop,
    currentVideo,
    currentVideoId,
    isShuffled,
    setCurrentVideoIds,
    setCurrentVideoIndex,
    setIsShuffle,
    shuffledVideoIds,
    videoIds,
    isLoop,
    isShuffle,
    isPause,
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
  const handleNextVideo = setNextVideo
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
  const handleLoop = useHandleLoop({ setLoop })

  return {
    readyEvent,
    isLoop,
    isShuffle,
    isPause,
    handleLoop,
    handlePlayController,
    handleShuffle,
    handlePreviousVideo,
    handleNextVideo,
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

type LoopArgs = Pick<ReturnTypeUseHandlePlayerController, 'setLoop'>
function useHandleLoop({ setLoop }: LoopArgs) {
  return useCallback(() => setLoop((prev) => !prev), [setLoop])
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
  const setLoop = useSetIsLoop()
  const currentVideoId = useCurrentVideoIdValue()
  const currentVideo = useCurrentVideoValue()
  const isShuffled = useIsShuffled()
  const setIsShuffle = useSetIsShuffle()
  const shuffledVideoIds = useShuffledCurrentVideoIds(currentVideoId)
  const setCurrentVideoIds = useSetCurrentVideoIds()
  const setCurrentVideoIndex = useSetCurrentVideoIndex()
  const videoIds = useCurrentPlaylistVideoIdsValue()

  const isLoop = useIsLoopValue()
  const isShuffle = useIsShuffleValue()
  const isPause = useMemo(
    () => currentPlayerStatus === 'PAUSED',
    [currentPlayerStatus],
  )

  return {
    currentPlayerStatus,
    setNextVideo,
    setPreviousVideo,
    setLoop,
    currentVideo,
    currentVideoId,
    isShuffled,
    setCurrentVideoIds,
    setCurrentVideoIndex,
    setIsShuffle,
    shuffledVideoIds,
    videoIds,
    isLoop,
    isShuffle,
    isPause,
  }
}

type ReturnTypeUseHandlePlayerController = ReturnType<
  typeof useHandlePlayerControllerState
> & { readyEvent: YouTubePlayerType | undefined }
