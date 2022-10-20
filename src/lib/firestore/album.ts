import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  orderBy,
  query,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from '@firebase/firestore'
import { AlbumStore } from '@/types/playlistStore'
import { db } from '@/config/firebase'
import { PlaylistStoreId } from '@/atoms/firestore/playlist'
import { AlbumFireStoreId } from '@/atoms/firestore/album'

const albumConverter: FirestoreDataConverter<AlbumStore> = {
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options?: SnapshotOptions,
  ): AlbumStore {
    const data = snapshot.data(options)
    return {
      id: snapshot.id,
      title: data.title,
      videoIds: data.videoIds.map((video: DocumentReference) => video.id),
      thumbnailUrl: data.thumbnailUrl,
      createdAt: data.createdAt,
      type: data.type,
    }
  },
  toFirestore(album: WithFieldValue<AlbumStore>): DocumentData {
    const { title, videoIds, thumbnailUrl, createdAt, type } = album
    return {
      title,
      videoIds,
      thumbnailUrl,
      createdAt,
      type,
    }
  },
}

export const albumCollectionRef = collection(db, 'playlists').withConverter(
  albumConverter,
)

export function albumCollectionOrderByCreatedAtRef() {
  return query(albumCollectionRef, orderBy('createdAt', 'desc'))
}

export const albumDocRef = function (albumId: AlbumFireStoreId) {
  return doc(db, 'playlists', albumId).withConverter(albumConverter)
}
