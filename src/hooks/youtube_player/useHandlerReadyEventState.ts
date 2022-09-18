import { YouTubeEvent } from '@/types'
import { useCallback } from 'react'
import { useCurrentVolumeValue } from '@/atoms/youtubePlayer'
import { ReturnTypeSetReadyEvent } from '@/hooks/youtube_player/useSetReadyEvent'

type Args = ReturnTypeSetReadyEvent
export function useHandlerReadyEventState({ readyEvent, setReadyEvent }: Args) {
  const volume = useCurrentVolumeValue()

  const handleReadyEvent = useCallback(
    async (event: YouTubeEvent) => {
      setReadyEvent(event.target)
      await event.target.setVolume(volume)
    },
    [setReadyEvent, volume],
  )

  return {
    readyEvent,
    handleReadyEvent,
  }
}

export type ReturnTypeReadyEventStateType = ReturnType<
  typeof useHandlerReadyEventState
>
