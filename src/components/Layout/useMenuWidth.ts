import { useState } from 'react'
import { useMoveOnDrag } from './useMoveOnDrag'

export function useMenuWidth() {
  const [menuWidth, setMenuWidth] = useState({ x: 250 })
  const { dragging, onPointerMove, onPointerUp, onPointerDown } = useMoveOnDrag(
    menuWidth,
    setMenuWidth,
  )

  return {
    menuWidth,
    dragging,
    onPointerMove,
    onPointerUp,
    onPointerDown,
  }
}
