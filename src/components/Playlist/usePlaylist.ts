import { PlaylistStoreId } from '@/atoms/firestore/playlist'
import { useInitializeVideos, usePlaylistValue } from '@/hooks/playlist'

export function usePlaylist(playlistId: PlaylistStoreId) {
  const playlist = usePlaylistValue(playlistId)
  const { completed } = useInitializeVideos(playlist!)

  return {
    completed,
    videoIds: playlist?.videoIds,
  }
}
