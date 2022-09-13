import { collection } from '@firebase/firestore'
import {
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from '@firebase/firestore'
import { UserPlaylistStore } from '@/types/playlistStore'
import { db } from '@/config/firebase'

const playlistConverter: FirestoreDataConverter<UserPlaylistStore> = {
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options?: SnapshotOptions,
  ): UserPlaylistStore {
    const data = snapshot.data(options)
    return {
      id: snapshot.id,
      title: data.title,
      videoIds: data.videos.map((video: DocumentReference) => video.id),
      userId: data.user.id,
    }
  },
  toFirestore(playlist: WithFieldValue<UserPlaylistStore>): DocumentData {
    const { title, videoIds, userId } = playlist
    return {
      title,
      videoIds,
      userId,
    }
  },
}

export const userPlaylistCollectionRef = collection(
  db,
  'playlists',
).withConverter(playlistConverter)
