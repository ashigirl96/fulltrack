import { PlaylistStoreId, usePlaylistValue } from '@/atoms/firestore/playlist'
import { useInitializeVideos } from '@/hooks/playlist'

export function usePlaylist(playlistId: PlaylistStoreId) {
  const playlist = usePlaylistValue(playlistId)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { completed } = useInitializeVideos(playlist!)

  return {
    completed,
    videoIds: playlist?.videoIds,
  }
}
