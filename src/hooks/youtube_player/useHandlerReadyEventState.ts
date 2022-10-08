import { YouTubeEvent } from '@/types'
import { useCallback } from 'react'
import { useCurrentVolumeValue } from '@/atoms/youtubePlayer'
import { ReturnTypeSetReadyEvent } from '@/hooks/youtube_player/useSetReadyEvent'
import { useCurrentMuteValue } from '@/atoms/youtubePlayer/states'

type Args = ReturnTypeSetReadyEvent
export function useHandlerReadyEventState({ setReadyEvent }: Args) {
  const volume = useCurrentVolumeValue()
  const isMute = useCurrentMuteValue()

  const handleReadyEvent = useCallback(
    async (event: YouTubeEvent) => {
      setReadyEvent(event.target)
      await event.target.setVolume(isMute ? 0 : volume)
    },
    [isMute, setReadyEvent, volume],
  )

  return {
    handleReadyEvent,
  }
}

export type ReturnTypeReadyEventStateType = ReturnType<
  typeof useHandlerReadyEventState
>
