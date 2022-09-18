import { collection, doc } from '@firebase/firestore'
import { db } from '@/config/firebase'
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from '@firebase/firestore'
import type { VideoFirestore } from '@/types'
import { VideoFirestoreId } from '@/atoms/firestore/video'

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

export const videoCollectionRef = collection(db, 'videos').withConverter(
  videoConverter,
)

export function videoDocRef(videoId: VideoFirestoreId) {
  return doc(db, 'videos', videoId).withConverter(videoConverter)
}
