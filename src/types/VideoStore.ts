export type VideoFirestore = {
  id: string
  videoId: string
  start?: number
  end?: number
  title: string
  originalTitle: string
  thumbnailUrl: string
  artists: string[]
}
