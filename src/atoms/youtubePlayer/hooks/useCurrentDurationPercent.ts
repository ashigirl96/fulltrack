import { YouTubePlayerType } from '@/types'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { getPlayerStateKey } from '@/lib/youtube'
import { useInterval } from '@/hooks/react-use/useInterval'
import { useCurrentVideoValue } from '../states'
import { secsToMS } from '@/lib/time'

// [0, 100]%で動画の経過時間(duration)を記録する
export function useCurrentDurationPercent(
  event: YouTubePlayerType | undefined,
) {
  const {
    durationPercent,
    setDurationPercent,
    video,
    setElapsedSecs,
    elapsedSecs,
  } = useCurrentDurationState()

  // 動画の再生中に、経過時間を0.1秒ごとに記録する
  const setPlayingDuration = useSetPlayingDuration({
    setDurationPercent,
    event,
    video,
    setElapsedSecs,
  })
  useInterval(setPlayingDuration, 500)

  // 動画を停止中に、経過時間を動かしたときに呼ぶ
  const setHandleInputPercent = useSetHandleInputPercent({
    event,
    video,
    setDurationPercent,
  })

  const elapsedMS = secsToMS(Math.floor(elapsedSecs))
  const endHS = useMemo(
    () => (video ? secsToMS(Math.ceil(video.end - video.start)) : secsToMS(0)),
    [video],
  )

  return {
    durationPercent,
    setHandleInputPercent,
    elapsedMS,
    endHS,
  }
}

type UseSetDurationArgs = Pick<
  ReturnTypeOfUseCurrentDuration,
  'setDurationPercent' | 'event' | 'video' | 'setElapsedSecs'
>
function useSetPlayingDuration({
  setDurationPercent,
  event,
  video,
  setElapsedSecs,
}: UseSetDurationArgs) {
  return useCallback(async () => {
    if (event && video) {
      const status = getPlayerStateKey(await event.getPlayerState())
      switch (status) {
        case 'PLAYING': {
          const { start, end } = video
          const now = Math.floor(await event.getCurrentTime())
          const durationPercent = Math.min(
            Math.max((100 * (now - start)) / (end - start), 0),
            100,
          )
          setElapsedSecs(now - start)
          setDurationPercent(durationPercent)
          break
        }
        default:
          clearInterval()
          break
      }
    }
  }, [event, setDurationPercent, setElapsedSecs, video])
}

type UseSetHandleInputPercentArgs = Pick<
  ReturnTypeOfUseCurrentDuration,
  'setDurationPercent' | 'event' | 'video'
>
function useSetHandleInputPercent({
  event,
  video,
  setDurationPercent,
}: UseSetHandleInputPercentArgs) {
  return useCallback(
    async (inputEvent: ChangeEvent<HTMLInputElement>) => {
      if (event && video) {
        const { start, end } = video
        const percent = Number(inputEvent.currentTarget.value)
        const duration = (percent * (end - start)) / 100
        setDurationPercent(percent)
        await event.seekTo(duration + start, true)
      }
    },
    [event, setDurationPercent, video],
  )
}

// フックに必要な変数
function useCurrentDurationState() {
  const [durationPercent, setDurationPercent] = useState(0)
  const [elapsedSecs, setElapsedSecs] = useState(0)
  const video = useCurrentVideoValue()
  return {
    durationPercent,
    setDurationPercent,
    elapsedSecs,
    setElapsedSecs,
    video,
  }
}

type ReturnTypeOfUseCurrentDuration = ReturnType<
  typeof useCurrentDurationState
> & { event: YouTubePlayerType | undefined }
