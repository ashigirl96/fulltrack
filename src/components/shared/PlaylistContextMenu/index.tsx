import { useInitialContext, useSelectedContext } from '@/atoms/contextMenu'
import React, { useCallback, useEffect, useState } from 'react'

export function ContextMenu() {
  const [xPos, setXPos] = useState('0px')
  const [yPos, setYPos] = useState('0px')

  const initializeContext = useInitialContext()
  const ctx = useSelectedContext()

  const handleContextMenu = useCallback((e: MouseEvent) => {
    e.preventDefault()
    setXPos(`${e.pageX}px`)
    setYPos(`${e.pageY}px`)
  }, [])
  const handleClick = useCallback(() => {
    initializeContext()
  }, [initializeContext])

  useEffect(() => {
    document.addEventListener('click', handleClick)
    document.addEventListener('contextmenu', handleContextMenu)
    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [handleClick, handleContextMenu])

  switch (ctx.type) {
    case 'playlist': {
      return (
        <ul
          className="absolute menu bg-base-100 w-56 p-2 rounded-box divider-y divide-blue-300"
          style={{ top: yPos, left: xPos }}
        >
          <li>
            <a>削除</a>
          </li>
          <li>
            <a>名前を変更</a>
          </li>
          <li>
            <a>プレイリストを作成する</a>
          </li>
        </ul>
      )
    }
    case 'video': {
      return (
        <ul
          className="absolute menu bg-base-100 w-56 p-2 rounded-box divider-y divide-blue-300"
          style={{ top: yPos, left: xPos }}
        >
          <li>
            <a>削除</a>
          </li>
          <li>
            <a>名前を変更</a>
          </li>
        </ul>
      )
    }
    default:
      return null
  }
}
