// 曲が終わる、次の曲ボタンが押されたときに呼ばれる
import {
  useCurrentVideoIdsValue,
  useIsLoopValue,
  useSetCurrentVideoIndex,
} from '../states'
import { useCallback } from 'react'

export function useSetNextVideo() {
  const isLoop = useIsLoopValue()
  const setCurrentVideoIndex = useSetCurrentVideoIndex()
  const currentPlaylistVideoLength = useCurrentVideoIdsValue().length

  return useCallback(() => {
    setCurrentVideoIndex((index) => {
      const isLast = index === currentPlaylistVideoLength - 1
      if (isLast) {
        // when loop and last video, reset index
        // when not loop and last video, finish
        return isLoop ? 0 : index
      }
      // if no last video, increment index
      return index + 1
    })
  }, [currentPlaylistVideoLength, isLoop, setCurrentVideoIndex])
}
