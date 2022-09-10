import { ChangeEvent, useCallback } from 'react'
import { YouTubeEvent, YouTubePlayerType } from '@/types'
import { getPlayerStateKey, getPropsOptions } from '@/lib/youtube'
import {
  useCandidateVideoValue,
  useCurrentPlayerStatus,
  useCurrentPlaylistVideoIdsValue,
  useCurrentVideoId,
  useCurrentVideoIdsValue,
  useCurrentVolumeValue,
  useSetCurrentPlayerStatus,
  useSetCurrentVideoIds,
  useSetCurrentVideoIndex,
  useSetCurrentVolume,
  useSetNextVideo,
  useSetPreviousVideo,
  useSetRandomOrder,
  useSetToggleLoop,
  useShuffledVideoIds,
} from '@/atoms/youtubePlayer'
import { useVideoValue } from '@/atoms/firestore/video'
import { isEqualArray } from '@/lib/array'

export function useHandleStateChange() {
  const setNextVideo = useSetNextVideo()
  const setCurrentPlayerStatus = useSetCurrentPlayerStatus()
  return useCallback(
    async (readyEvent: YouTubePlayerType | undefined) => {
      if (readyEvent) {
        const status = getPlayerStateKey(await readyEvent.getPlayerState())
        setCurrentPlayerStatus(status)
        switch (status) {
          case 'BUFFERING':
            break
          case 'PAUSED':
            break
          case 'VIDEO_CUED':
            break
          case 'UN_STARTED':
            break
          case 'ENDED':
            await setNextVideo()
            break
          case 'PLAYING':
            break
        }
      }
    },
    [setCurrentPlayerStatus, setNextVideo],
  )
}

export type YouTubePlayerArgs = {
  handleReady: (x: YouTubeEvent) => void
}
// TODO: レンダリング多すぎるような気もするから問題の箇所を見つける
export function useYouTubePlayer({ handleReady }: YouTubePlayerArgs) {
  const handleStateChange = useHandleStateChange()
  const video = useCandidateVideoValue()

  // TODO: リファクタリング
  let videoId = ''
  let opts = undefined
  if (video) {
    const { videoId: _videoId, start, end } = video
    opts = getPropsOptions({ start, end, controls: 0 })
    videoId = _videoId
  }

  return {
    videoId,
    opts,
    handleStateChange,
    handleReady,
  }
}

export function useHandleTogglePlay(readyEvent: YouTubePlayerType | undefined) {
  const currentPlayerStatus = useCurrentPlayerStatus()
  const setNextVideo = useSetNextVideo()
  const _setPreviousVideo = useSetPreviousVideo()
  const setLoop = useSetToggleLoop()
  const currentVideoId = useCurrentVideoId()
  const video = useVideoValue(currentVideoId)
  const isShuffled = useIsShuffled()
  const setIsRandomOrder = useSetRandomOrder()
  const shuffledVideoIds = useShuffledVideoIds(currentVideoId)
  const setCurrentVideoIds = useSetCurrentVideoIds()
  const setCurrentVideoIndex = useSetCurrentVideoIndex()
  const videoIds = useCurrentPlaylistVideoIdsValue()

  const setPreviousVideo = useCallback(async () => {
    if (video && readyEvent) {
      const now = await readyEvent.getCurrentTime()
      const { start } = video
      const startedDuration = now - start
      if (startedDuration <= 2) {
        _setPreviousVideo()
        return
      }
      await readyEvent.seekTo(start, true)
    }
  }, [_setPreviousVideo, readyEvent, video])

  const setRandomOrder = useCallback(() => {
    if (isShuffled) {
      // もとに戻す
      setCurrentVideoIds(videoIds)
      setCurrentVideoIndex(videoIds.indexOf(currentVideoId))
    } else {
      // シャッフルする
      setCurrentVideoIds(shuffledVideoIds)
      setCurrentVideoIndex(0)
    }
    setIsRandomOrder((prev) => !prev)
  }, [
    currentVideoId,
    isShuffled,
    setCurrentVideoIds,
    setCurrentVideoIndex,
    setIsRandomOrder,
    shuffledVideoIds,
    videoIds,
  ])

  return [
    currentPlayerStatus,
    useCallback(async () => {
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
    }, [currentPlayerStatus, readyEvent]),
    setNextVideo,
    setPreviousVideo,
    setLoop,
    setRandomOrder,
    readyEvent,
  ] as const
}

export function useHandleVolume(readyEvent: YouTubePlayerType | undefined) {
  const setCurrentVolume = useSetCurrentVolume()
  const currentVolume = useCurrentVolumeValue()

  // TODO: リファクタリング
  return [
    // volume
    currentVolume,
    // set volume function
    useCallback(
      async (event: ChangeEvent<HTMLInputElement>) => {
        if (readyEvent) {
          const _volume = Number(event.currentTarget.value)
          setCurrentVolume(_volume)
          if (_volume !== 0 && (await readyEvent.isMuted())) {
            await readyEvent.unMute()
          }
          await readyEvent.setVolume(_volume)
        }
      },
      [readyEvent, setCurrentVolume],
    ),
    // mute function
    useCallback(async () => {
      if (readyEvent) {
        setCurrentVolume(0)
        await readyEvent.mute()
      }
    }, [readyEvent, setCurrentVolume]),
    // unMute function
    useCallback(async () => {
      if (readyEvent) {
        await readyEvent.unMute()
        setCurrentVolume(await readyEvent.getVolume())
      }
    }, [readyEvent, setCurrentVolume]),
  ] as const
}

function useIsShuffled() {
  const currentVideoIds = useCurrentVideoIdsValue()
  const videoIds = useCurrentPlaylistVideoIdsValue()
  return !isEqualArray(currentVideoIds, videoIds)
}
