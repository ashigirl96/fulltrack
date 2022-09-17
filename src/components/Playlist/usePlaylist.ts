import { PlaylistStoreId, usePlaylistValue } from '@/atoms/firestore/playlist'
import { useInitializeVideos } from '@/hooks/playlist'
import { useState } from 'react'

export function usePlaylist(playlistId: PlaylistStoreId) {
  const playlist = usePlaylistValue(playlistId)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { completed } = useInitializeVideos(playlist!)

  const [indexSelected, setIndexSelected] = useState<number | null>(null)

  return {
    completed,
    videoIds: playlist?.videoIds,
    indexSelected,
    setIndexSelected,
  }
}

export type ReturnTypeUsePlaylist = ReturnType<typeof usePlaylist>
