import {
  useCurrentVideoIdsValue,
  useCurrentVideoIndexValue,
} from '@/atoms/youtubePlayer'
import { useVideoValue } from '@/atoms/firestore/video'

export function useCurrentVideoTerm() {
  const currentVideoIndex = useCurrentVideoIndexValue()
  const currentVideoIds = useCurrentVideoIdsValue()
  const videoId = currentVideoIds[currentVideoIndex]
  return useVideoValue(videoId)
}
