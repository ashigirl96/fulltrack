import { collection } from '@firebase/firestore'
import {
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from '@firebase/firestore'
import { UserId, UserPlaylistStore } from '@/types/playlistStore'
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
      videoIds: data.videoIds.map((video: DocumentReference) => video.id),
    }
  },
  toFirestore(playlist: WithFieldValue<UserPlaylistStore>): DocumentData {
    const { title, videoIds } = playlist
    return {
      title,
      videoIds,
    }
  },
}

export const userPlaylistCollectionRef = function userPlaylistCollectionRef(
  userId: UserId,
) {
  return collection(db, 'users', userId, 'playlists').withConverter(
    playlistConverter,
  )
}
