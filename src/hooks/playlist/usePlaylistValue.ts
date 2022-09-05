import { playlistState, PlaylistStoreId } from '@/atoms/firestore/playlist'
import { useRecoilValue } from 'recoil'

export function usePlaylistValue(playlistId: PlaylistStoreId) {
  return useRecoilValue(playlistState(playlistId))
}
