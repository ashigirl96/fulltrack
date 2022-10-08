import {
  collection,
  doc,
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from '@firebase/firestore'
import { db } from '@/config/firebase'
import type { ArtistFirebaseId, ArtistFirestore } from '@/types'

const artistConverter: FirestoreDataConverter<ArtistFirestore> = {
  fromFirestore(
    snapshot: QueryDocumentSnapshot<ArtistFirestore>,
    options?: SnapshotOptions,
  ) {
    const data = snapshot.data(options)
    const { id, name } = data
    return {
      id,
      name,
    }
  },
  toFirestore(artist: WithFieldValue<ArtistFirestore>): DocumentData {
    const { id, name } = artist
    return {
      id,
      name,
    }
  },
}

export const artistCollectionRef = collection(db, 'artists').withConverter(
  artistConverter,
)

export function artistDocRef(artistId: ArtistFirebaseId) {
  return doc(db, 'artists', artistId).withConverter(artistConverter)
}
