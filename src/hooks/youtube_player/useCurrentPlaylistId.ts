import { useRecoilValue } from 'recoil'
import { currentPlaylistIdState } from '@/atoms/youtube_player'

export function useCurrentPlaylistId() {
  return useRecoilValue(currentPlaylistIdState)
}
