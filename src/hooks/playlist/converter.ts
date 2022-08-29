import {
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from '@firebase/firestore'

type PlaylistFirestore = {
  id: string
  title: string
  videoIds: string[]
  userId: string
}

export const playlistConverter: FirestoreDataConverter<PlaylistFirestore> = {
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options?: SnapshotOptions,
  ): PlaylistFirestore {
    const data = snapshot.data(options)
    return {
      id: snapshot.id,
      title: data.title,
      videoIds: data.videos.map((video: DocumentReference) => video.id),
      userId: data.user.id,
    }
  },
  toFirestore(playlist: WithFieldValue<PlaylistFirestore>): DocumentData {
    const { title, videoIds, userId } = playlist
    return {
      title,
      videoIds,
      userId,
    }
  },
}
