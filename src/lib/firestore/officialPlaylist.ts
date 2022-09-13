import { collection } from '@firebase/firestore'
import {
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from '@firebase/firestore'
import { OfficialPlaylistStore } from '@/types/officialPlaylistStore'
import { db } from '@/config/firebase'

const playlistConverter: FirestoreDataConverter<OfficialPlaylistStore> = {
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options?: SnapshotOptions,
  ): OfficialPlaylistStore {
    const data = snapshot.data(options)
    return {
      id: snapshot.id,
      title: data.title,
      videoIds: data.videos.map((video: DocumentReference) => video.id),
    }
  },
  toFirestore(playlist: WithFieldValue<OfficialPlaylistStore>): DocumentData {
    const { title, videoIds } = playlist
    return {
      title,
      videoIds,
    }
  },
}

export const officialPlaylistCollectionRef = collection(
  db,
  'playlists',
).withConverter(playlistConverter)
