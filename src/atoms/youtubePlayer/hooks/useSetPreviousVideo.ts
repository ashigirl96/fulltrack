import { useSetCurrentVideoIndex } from '../states'
import { useCallback } from 'react'

// 前の曲を再生
export function useSetPreviousVideo() {
  const setCurrentVideoIndex = useSetCurrentVideoIndex()
  return useCallback(() => {
    setCurrentVideoIndex((index) => (index < 1 ? 0 : index - 1))
  }, [setCurrentVideoIndex])
}
