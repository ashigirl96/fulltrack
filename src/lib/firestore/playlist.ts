import { collection } from '@firebase/firestore'
import {
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from '@firebase/firestore'
import { PlaylistStore } from '@/types/playlistStore'
import { db } from '@/config/firebase'

const playlistConverter: FirestoreDataConverter<PlaylistStore> = {
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options?: SnapshotOptions,
  ): PlaylistStore {
    const data = snapshot.data(options)
    return {
      id: snapshot.id,
      title: data.title,
      videoIds: data.videos.map((video: DocumentReference) => video.id),
      userId: data.user.id,
    }
  },
  toFirestore(playlist: WithFieldValue<PlaylistStore>): DocumentData {
    const { title, videoIds, userId } = playlist
    return {
      title,
      videoIds,
      userId,
    }
  },
}

export const playlistCollectionRef = collection(db, 'playlists').withConverter(
  playlistConverter,
)
