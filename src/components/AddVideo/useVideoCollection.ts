import {
  collection,
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from '@firebase/firestore'
import { db } from '@/config/firebase'

type VideoFirestore = {
  videoId: string
  start?: number
  end?: number
  title: string
  originalTitle: string
  thumbnailUrl: string
  artists: string[]
}

const videoConverter: FirestoreDataConverter<VideoFirestore> = {
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options?: SnapshotOptions,
  ): VideoFirestore {
    const data = snapshot.data(options)
    const { videoId, start, end, title, originalTitle, thumbnailUrl, artists } =
      data
    return {
      videoId,
      start,
      end,
      title,
      originalTitle,
      thumbnailUrl,
      artists,
    }
  },
  toFirestore(video: WithFieldValue<VideoFirestore>): DocumentData {
    const { videoId, start, end, artists, originalTitle, title, thumbnailUrl } =
      video
    return {
      videoId,
      start,
      end,
      artists,
      originalTitle,
      title,
      thumbnailUrl,
    }
  },
}

export function useVideoCollection() {
  return collection(db, 'videos').withConverter(videoConverter)
}
