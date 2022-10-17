import { Timestamp } from '@firebase/firestore'

export interface PlaylistStore {
  id: string
  title: string
  videoIds: string[]
  thumbnailUrl: string
  createdAt: Timestamp
}
export type PlaylistState = PlaylistStore

export interface AlbumStore extends PlaylistStore {
  type: 'single' | 'live'
}
export type AlbumState = AlbumStore

export type PlaylistFirestoreId = string

export type UserId = string
