import { useCallback, useState, PointerEvent } from 'react'

const MIN_WIDTH = 100 // px
const MAX_WIDTH = 500 // px

interface Position {
  x: number
}

interface DragState {
  originalPosition: Position
  startCursor: Position
}

export function useMoveOnDrag<T extends Element>(
  argPosition: Position,
  onMove: (pos: Position) => void,
) {
  const [state, setState] = useState<DragState | null>(null)
  const startDrag = useCallback(
    (event: PointerEvent<T>) => {
      event.currentTarget.setPointerCapture(event.pointerId)
      setState({
        originalPosition: {
          x: argPosition.x,
        },
        startCursor: {
          x: event.pageX,
        },
      })
    },
    [argPosition.x],
  )

  const dragging = useCallback(
    (event: PointerEvent<T>) => {
      event.preventDefault()
      if (state === null) return
      const currentCursor = { x: event.pageX }
      onMove({
        x: adjustWidth(
          state.originalPosition,
          currentCursor,
          state.startCursor,
        ),
      })
    },
    [onMove, state],
  )
  const endDrag = useCallback(
    (event: PointerEvent<T>) => {
      event.currentTarget.releasePointerCapture(event.pointerId)
      setState(null)
      if (state === null) return
      const currentCursor = { x: event.pageX }
      onMove({
        x: adjustWidth(
          state.originalPosition,
          currentCursor,
          state.startCursor,
        ),
      })
    },
    [onMove, state],
  )
  return {
    onPointerDown: startDrag,
    onPointerMove: dragging,
    onPointerUp: endDrag,
    dragging: state !== null,
  }
}

function adjustWidth(
  originalPosition: Position,
  currentCursor: Position,
  startCursor: Position,
) {
  const width = originalPosition.x + currentCursor.x - startCursor.x
  return Math.max(MIN_WIDTH, Math.min(width, MAX_WIDTH))
}

export type ReturnTypeOfUseMoveOnDrag = ReturnType<typeof useMoveOnDrag>
