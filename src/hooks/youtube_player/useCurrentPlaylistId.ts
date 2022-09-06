import { useRecoilValue } from 'recoil'
import { currentPlaylistIdState } from '@/atoms/youtubePlayer'

export function useCurrentPlaylistId() {
  return useRecoilValue(currentPlaylistIdState)
}
