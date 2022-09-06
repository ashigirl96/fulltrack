import { PlaylistStoreId } from '@/atoms/firestore/playlist'
import { useInitializeVideos, usePlaylistValue } from '@/hooks/playlist'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import {
  currentPlaylistIdState,
  currentVideoIdsState,
} from '@/atoms/youtube_player'

export function usePlaylist(playlistId: PlaylistStoreId) {
  const playlist = usePlaylistValue(playlistId)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { completed } = useInitializeVideos(playlist!)

  const setCurrentPlaylistId = useSetRecoilState(currentPlaylistIdState)
  const setCurrentVideoIds = useSetRecoilState(currentVideoIdsState)
  useEffect(() => {
    if (playlist) {
      setCurrentPlaylistId(playlistId)
      setCurrentVideoIds(playlist.videoIds)
    }
  }, [playlist, playlistId, setCurrentPlaylistId, setCurrentVideoIds])

  return {
    completed,
    videoIds: playlist?.videoIds,
  }
}
