import { ChangeEvent, useCallback, useState } from 'react'
import { YouTubeEvent, YouTubePlayerType } from '@/types'
import { getPlayerStateKey, getPropsOptions } from '@/lib/youtube'
import {
  useCandidateVideoValue,
  useCurrentPlayerStatus,
  useSetCurrentPlayerStatus,
  useSetNextVideo,
  useSetPreviousVideo,
  useSetToggleLoop,
  useSetToggleRandomOrder,
} from '@/atoms/youtubePlayer'

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
  console.log(`video ${video?.title}, videoId ${videoId}`)

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
  const setPreviousVideo = useSetPreviousVideo()
  const setLoop = useSetToggleLoop()
  const setRandomOrder = useSetToggleRandomOrder()
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
  ] as const
}

export function useHandleVolume(readyEvent: YouTubePlayerType | undefined) {
  const [volume, setVolume] = useState(50)

  // TODO: リファクタリング
  return [
    // volume
    volume,
    // set volume function
    useCallback(
      async (event: ChangeEvent<HTMLInputElement>) => {
        if (readyEvent) {
          const _volume = Number(event.currentTarget.value)
          setVolume(_volume)
          await readyEvent.setVolume(_volume)
        }
      },
      [readyEvent],
    ),
    // mute function
    useCallback(async () => {
      if (readyEvent) {
        setVolume(0)
        await readyEvent.mute()
      }
    }, [readyEvent]),
    // unMute function
    useCallback(async () => {
      if (readyEvent) {
        await readyEvent.unMute()
        setVolume(await readyEvent.getVolume())
      }
    }, [readyEvent]),
  ] as const
}
