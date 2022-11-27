import { useCallback, useState } from 'react'
import { YouTubeEvent, YouTubePlayer } from 'react-youtube'

export function useSetPlayer() {
  const [player, setPlayer_] = useState<YouTubePlayer | null>(null)
  const setPlayer = useCallback((e: YouTubeEvent) => {
    setPlayer_(e.target)
  }, [])

  return {
    player,
    setPlayer,
  }
}

export type ReturnTypeSetPlayer = ReturnType<typeof useSetPlayer>
