export interface PlaylistStore {
  id: string
  title: string
  userId: UserId
  videoIds: string[]
}
export type PlaylistFirestoreId = string

export type UserId = string
