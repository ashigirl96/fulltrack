import { DocumentReference } from '@firebase/firestore'

export interface OfficialPlaylistStore {
  id: string
  title: string
  videoIds: DocumentReference[]
}
export type OfficialPlaylistFirestoreId = string
