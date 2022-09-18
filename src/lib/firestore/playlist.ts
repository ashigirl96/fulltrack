import { collection } from '@firebase/firestore'
import {
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from '@firebase/firestore'
import { db } from '@/config/firebase'
import { PlaylistStore } from '@/types'

const playlistConverter: FirestoreDataConverter<PlaylistStore> = {
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options?: SnapshotOptions,
  ): PlaylistStore {
    const data = snapshot.data(options)
    return {
      id: snapshot.id,
      title: data.title,
      videoIds: data.videoIds.map((video: DocumentReference) => video.id),
      thumbnailUrl: data.thumbnailUrl,
    }
  },
  toFirestore(playlist: WithFieldValue<PlaylistStore>): DocumentData {
    const { title, videoIds, thumbnailUrl } = playlist
    return {
      title,
      videoIds,
      thumbnailUrl,
    }
  },
}

export const playlistCollectionRef = collection(db, 'playlists').withConverter(
  playlistConverter,
)
