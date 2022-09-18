import { useState } from 'react'
import { YouTubeEvent } from '@/types'

export function useSetReadyEvent() {
  const [readyEvent, setReadyEvent] = useState<YouTubeEvent['target']>()
  return {
    readyEvent,
    setReadyEvent,
  }
}

export type ReturnTypeSetReadyEvent = ReturnType<typeof useSetReadyEvent>
