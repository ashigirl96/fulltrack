import { Timestamp } from '@firebase/firestore'

export interface PlaylistStore {
  id: string
  title: string
  videoIds: string[]
  thumbnailUrl: string
  createdAt: Timestamp
}
export interface PlaylistState extends PlaylistStore {
  isOfficial: boolean
}

export type PlaylistFirestoreId = string

export type UserId = string
