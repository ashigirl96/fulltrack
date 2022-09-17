import { collection, doc } from '@firebase/firestore'
import {
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from '@firebase/firestore'
import { db } from '@/config/firebase'
import { UserFirestore } from '@/types'
import { UserFirestoreId } from '@/atoms/firestore/user'

const userConverter: FirestoreDataConverter<UserFirestore> = {
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options?: SnapshotOptions,
  ): UserFirestore {
    const data = snapshot.data(options)
    console.log(`data ${JSON.stringify(snapshot, null, 2)}`)
    return {
      id: snapshot.id,
      displayName: data.displayName,
      playlists: [],
      favorites: [],
    }
  },
  toFirestore(user: WithFieldValue<UserFirestore>): DocumentData {
    const { displayName, playlists, favorites } = user
    return {
      displayName,
      playlists,
      favorites,
    }
  },
}

export function userDocRef(userId: UserFirestoreId) {
  return doc(db, 'users', userId).withConverter(userConverter)
}

// export function fetch() {}
