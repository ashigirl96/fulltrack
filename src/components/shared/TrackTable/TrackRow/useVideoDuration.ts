import { VideoFirestore } from '@/types'
import { secsToMS } from '@/lib/time'

export function useVideoDuration(video: VideoFirestore | null) {
  if (!video) {
    return '00:00'
  }
  return secsToMS(video.end - video.start)
}
