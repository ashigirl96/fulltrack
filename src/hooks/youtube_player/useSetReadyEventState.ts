import { YouTubeEvent } from '@/types'
import { useCallback, useState } from 'react'

export function useSetReadyEventState() {
  const [readyEvent, setReadyEvent] = useState<YouTubeEvent['target']>()

  return [
    readyEvent,
    useCallback((event: YouTubeEvent) => {
      setReadyEvent(event.target)
    }, []),
  ] as const
}
