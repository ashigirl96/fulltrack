import { useInitializeContext, useSelectedContext } from '@/atoms/contextMenu'
import React, { useCallback, useEffect } from 'react'
import { PlaylistMenu } from './PlaylistMenu'
import { VideoMenu } from './VideoMenu'
import { AlbumMenu } from '@/components/ContextMenu/AlbumMenu'
import { PlaylistMarginMenu } from '@/components/ContextMenu/PlaylistMarginMenu'
import { usePosition } from '@/components/ContextMenu/usePosition'

export function ContextMenu() {
  const { setPageCoord, top, left, position } = usePosition()
  const ctx = useSelectedContext()

  const handleContextMenu = useCallback(
    (e: MouseEvent) => {
      e.preventDefault()
      setPageCoord({ x: e.pageX, y: e.pageY })
    },
    [setPageCoord],
  )
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
      {ctx.type === 'video' && (
        <VideoMenu
          videoId={ctx.videoId}
          videoIndex={ctx.videoIndex}
          videoTitle={ctx.videoTitle}
          position={position}
        />
      )}
      {ctx.type === 'album' && (
        <AlbumMenu albumId={ctx.albumId} position={position} />
      )}
      {ctx.type === 'playlist-margin' && (
        <PlaylistMarginMenu userId={ctx.userId} />
      )}
    </ul>
  )
}
