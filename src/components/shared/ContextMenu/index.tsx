import { useInitializeContext, useSelectedContext } from '@/atoms/contextMenu'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import type { PageCoord } from '@/types'
import { PlaylistMenu } from './PlaylistMenu'

export function ContextMenu() {
  const [pageCoord, setPageCoord] = useState<PageCoord>({ x: 0, y: 0 })
  const top = useMemo(() => `${pageCoord.x}px`, [pageCoord.x])
  const left = useMemo(() => `${pageCoord.y}px`, [pageCoord.y])

  const ctx = useSelectedContext()

  const handleContextMenu = useCallback((e: MouseEvent) => {
    e.preventDefault()
    setPageCoord({ x: e.pageX, y: e.pageY })
  }, [])
  const handleClick = useInitializeContext()

  useEffect(() => {
    document.addEventListener('click', handleClick)
    document.addEventListener('contextmenu', handleContextMenu)
    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [handleClick, handleContextMenu])

  if (!ctx.type) {
    return null
  }

  return (
    <ul
      className="absolute menu bg-base-100 w-56 p-2 rounded-box divider-y divide-blue-300"
      style={{ top, left }}
    >
      {ctx.type === 'playlist' && <PlaylistMenu playlistId={ctx.playlistId} />}
      {/*{ctx.type === "video" && <VideoMenu pageCoord={} />}*/}
    </ul>
  )
}
