// 曲が終わる、次の曲ボタンが押されたときに呼ばれる
import {
  RepeatStatusState,
  useCurrentVideoIdsValue,
  useRepeatStatusValue,
  useSetCurrentVideoIndex,
} from '../states'
import { useCallback } from 'react'

export function useSetNextVideo() {
  const repeatStatus = useRepeatStatusValue()
  const setCurrentVideoIndex = useSetCurrentVideoIndex()
  const currentPlaylistVideoLength = useCurrentVideoIdsValue().length

  // TODO: repeatStatus-oneも実装する
  return useCallback(
    (forceNext?: boolean) => {
      const status = nextStatus(repeatStatus, !!forceNext)
      setCurrentVideoIndex((index) => {
        if (status === 'repeat-one') {
          return index
        }
        const isLast = index === currentPlaylistVideoLength - 1
        if (isLast) {
          // when loop and last video, reset index
          // when not loop and last video, finish
          return status === 'repeat' ? 0 : index
        }
        // if no last video, increment index
        return index + 1
      })
    },
    [currentPlaylistVideoLength, repeatStatus, setCurrentVideoIndex],
  )
}

function nextStatus(
  repeatStatus: RepeatStatusState,
  forceNext: boolean,
): RepeatStatusState {
  if (forceNext) {
    return 'repeat'
  }
  return repeatStatus
}
