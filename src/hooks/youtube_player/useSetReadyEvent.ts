import { useCallback, useState } from 'react'
import { YouTubeEvent } from '@/types'

export function useSetReadyEvent() {
  const [readyEvent, setReadyEvent] = useState<YouTubeEvent['target']>()

  // YouTubeプレイヤーが初期化されたタイミングに呼ばれる
  const handleReadyEvent = useCallback(
    async (event: YouTubeEvent) => {
      setReadyEvent(event.target)
      await event.target.setVolume(50)
    },
    [setReadyEvent],
  )

  return {
    readyEvent,
    handleReadyEvent,
    setReadyEvent,
  }
}

export type ReturnTypeSetReadyEvent = ReturnType<typeof useSetReadyEvent>
