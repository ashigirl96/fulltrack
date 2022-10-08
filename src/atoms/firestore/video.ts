import {
  atomFamily,
  useRecoilCallback,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'
import type { VideoFirestore } from '@/types'

export type VideoFirestoreId = string

// TODO: src/hooks/playlist/useInitializeVideos.ts:23で使ってるので要リファクタ
export const videoState = atomFamily<VideoFirestore | null, VideoFirestoreId>({
  key: 'videoState',
  default: null,
})

export function useSetVideoValue(videoId: VideoFirestoreId) {
  return useSetRecoilState(videoState(videoId))
}

export function useVideoValue(videoId: VideoFirestoreId) {
  return useRecoilValue(videoState(videoId))
}

// TODO: refactor. useRecoilSnapshotを使う
export function useSetVideoValues(videos: VideoFirestore[]) {
  return useRecoilCallback(
    ({ set }) =>
      () => {
        for (const video of videos) {
          set(videoState(video.id), video)
        }
      },
    [videos],
  )
}
