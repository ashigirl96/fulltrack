import { YouTubeEvent } from '@/types'
import { useCallback, useState } from 'react'
import { useCurrentVolumeValue } from '@/atoms/youtubePlayer'

export function useHandlerReadyEventState() {
  const [readyEvent, setReadyEvent] = useState<YouTubeEvent['target']>()
  const volume = useCurrentVolumeValue()

  const handleReadyEvent = useCallback(
    async (event: YouTubeEvent) => {
      setReadyEvent(event.target)
      await event.target.setVolume(volume)
    },
    [volume],
  )

  return {
    readyEvent,
    handleReadyEvent,
  }
}

export type ReturnTypeReadyEventStateType = ReturnType<
  typeof useHandlerReadyEventState
>
