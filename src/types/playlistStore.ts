export interface PlaylistStore {
  id: string
  title: string
  videoIds: string[]
}
export interface PlaylistState extends PlaylistStore {
  isOfficial: boolean
}

export type PlaylistFirestoreId = string

export type UserId = string
