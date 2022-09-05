import { useRecoilCallback } from 'recoil'
import { videoReadyEventState } from '@/atoms/youtube_player'
import { YouTubeEvent } from '@/types'

export function useSetReadyEventState() {
  return useRecoilCallback(
    ({ set }) =>
      (event: YouTubeEvent) => {
        set(videoReadyEventState, event.target)
      },
    [],
  )
}
