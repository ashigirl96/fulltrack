import { useRecoilValue } from 'recoil'
import {
  currentVideoIdsState,
  currentVideoIndexState,
} from '@/atoms/youtubePlayer'
import { useVideoState } from '@/hooks/video/useVideoState'

export function useCurrentVideoTerm() {
  const currentVideoIndex = useRecoilValue(currentVideoIndexState)
  const currentVideoIds = useRecoilValue(currentVideoIdsState)
  const videoId = currentVideoIds[currentVideoIndex]
  return useVideoState(videoId)
}
