import { useRecoilValue } from 'recoil'
import {
  currentVideoIdsState,
  currentVideoIndexState,
} from '@/atoms/youtube_player'
import { useVideoTerm } from '@/hooks/video/useVideoTerm'

export function useCurrentVideoTerm() {
  const currentVideoIndex = useRecoilValue(currentVideoIndexState)
  const currentVideoIds = useRecoilValue(currentVideoIdsState)
  const videoId = currentVideoIds[currentVideoIndex]
  return useVideoTerm(videoId)
}
