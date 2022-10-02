import { useInitializeContext, useSelectedContext } from '@/atoms/contextMenu'
import React, { useCallback, useEffect, useState } from 'react'
import type { PageCoord } from '@/types'
import { PlaylistMenu } from './PlaylistMenu'
import { VideoMenu } from './VideoMenu'

export function ContextMenu() {
  const [pageCoord, setPageCoord] = useState<PageCoord>({ x: 0, y: 0 })

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

  switch (ctx.type) {
    case 'playlist':
      return <PlaylistMenu pageCoord={pageCoord} />
    case 'video':
      return <VideoMenu pageCoord={pageCoord} />
    default:
      return null
  }
}
