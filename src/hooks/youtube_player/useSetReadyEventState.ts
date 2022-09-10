import { YouTubeEvent } from '@/types'
import { useCallback, useState } from 'react'
import { useCurrentVolumeValue } from '@/atoms/youtubePlayer'

export function useSetReadyEventState() {
  const [readyEvent, setReadyEvent] = useState<YouTubeEvent['target']>()
  const volume = useCurrentVolumeValue()

  return [
    readyEvent,
    useCallback(
      async (event: YouTubeEvent) => {
        setReadyEvent(event.target)
        console.log(`duration ${await event.target.getDuration()}`)
        await event.target.setVolume(volume)
      },
      [volume],
    ),
  ] as const
}
