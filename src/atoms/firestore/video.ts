import { atomFamily } from 'recoil'
import type { VideoFirestore } from '@/types'

export type VideoFirestoreId = string

export const videoState = atomFamily<VideoFirestore | null, VideoFirestoreId>({
  key: 'videoState',
  default: null,
})
