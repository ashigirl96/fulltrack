import { collection } from '@firebase/firestore'
import { db } from '@/config/firebase'
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from '@firebase/firestore'
import type { VideoFirestore } from '@/types'

const videoConverter: FirestoreDataConverter<VideoFirestore> = {
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options?: SnapshotOptions,
  ): VideoFirestore {
    const data = snapshot.data(options)
    const { videoId, start, end, title, originalTitle, thumbnailUrl, artists } =
      data
    return {
      id: snapshot.id,
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

export const videoCollection = collection(db, 'videos').withConverter(
  videoConverter,
)
