import { VideoFirestoreId, videoState } from '@/atoms/firestore/video'
import { useRecoilValue } from 'recoil'

export function useVideoState(videoId: VideoFirestoreId) {
  return useRecoilValue(videoState(videoId))
}
