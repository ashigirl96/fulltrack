import { useMemo, useState } from 'react'
import type { PageCoord } from '@/types'

export function usePosition() {
  const [pageCoord, setPageCoord] = useState<PageCoord>({ x: 0, y: 0 })
  const top = useMemo(() => `${pageCoord.y}px`, [pageCoord.y])
  const left = useMemo(() => `${pageCoord.x}px`, [pageCoord.x])
  const position = useMemo(
    () => ({
      left: pageCoord.x < window.innerWidth / 2,
      end: pageCoord.y > window.innerHeight / 2,
    }),
    [pageCoord.x, pageCoord.y],
  )
  return {
    setPageCoord,
    top,
    left,
    position,
  }
}

export type ReturnTypePosition = ReturnType<typeof usePosition>
