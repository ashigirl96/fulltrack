import { atomFamily, useRecoilValue } from 'recoil'
import type { VideoFirestore } from '@/types'

export type VideoFirestoreId = string

export const videoState = atomFamily<VideoFirestore | null, VideoFirestoreId>({
  key: 'videoState',
  default: null,
})

export function useVideoValue(videoId: VideoFirestoreId) {
  return useRecoilValue(videoState(videoId))
}
