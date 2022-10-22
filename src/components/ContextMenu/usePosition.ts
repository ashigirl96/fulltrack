import { useCallback, useMemo, useState } from 'react'
import type { PageCoord } from '@/types'

const WIDTH_SIZE = 16 * 14
const HEIGHT_SIZE = 16 * 3
export function usePosition() {
  const [pageCoord, setPageCoord] = useState<PageCoord>({ x: 0, y: 0 })

  const isLeft = useMemo(() => {
    if (typeof window !== 'undefined')
      return pageCoord.x < window.innerWidth / 2
    return false
  }, [pageCoord.x])
  const left = useMemo(() => {
    let x = pageCoord.x
    if (!isLeft) x -= WIDTH_SIZE
    return `${x}px`
  }, [isLeft, pageCoord.x])

  const isEnd = useMemo(() => {
    if (typeof window !== 'undefined')
      return pageCoord.y > window.innerHeight / 2
    return false
  }, [pageCoord.y])
  const top = useMemo(() => {
    let y = pageCoord.y
    if (isEnd) y -= HEIGHT_SIZE
    return `${y}px`
  }, [isEnd, pageCoord.y])

  const position = useMemo(
    () => ({
      left: isLeft,
      end: isEnd,
    }),
    [isEnd, isLeft],
  )
  const handleContextMenu = useCallback(
    (e: MouseEvent) => {
      e.preventDefault()
      setPageCoord({ x: e.pageX, y: e.pageY })
    },
    [setPageCoord],
  )

  return {
    top,
    left,
    position,
    handleContextMenu,
  }
}

export type ReturnTypePosition = ReturnType<typeof usePosition>
