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

export function useMoveOnDrag<T extends Element>(defaultWidthPx: number) {
  const [width, setWidth] = useState({ x: defaultWidthPx })
  const [state, setState] = useState<DragState | null>(null)
  const startDrag = useCallback(
    (event: PointerEvent<T>) => {
      event.currentTarget.setPointerCapture(event.pointerId)
      setState({
        originalPosition: {
          x: width.x,
        },
        startCursor: {
          x: event.pageX,
        },
      })
    },
    [width.x],
  )

  const dragging = useCallback(
    (event: PointerEvent<T>) => {
      event.preventDefault()
      if (state === null) return
      const currentCursor = { x: event.pageX }
      setWidth({
        x: adjustWidth(
          state.originalPosition,
          currentCursor,
          state.startCursor,
        ),
      })
    },
    [state],
  )
  const endDrag = useCallback(
    (event: PointerEvent<T>) => {
      event.currentTarget.releasePointerCapture(event.pointerId)
      setState(null)
      if (state === null) return
      const currentCursor = { x: event.pageX }
      setWidth({
        x: adjustWidth(
          state.originalPosition,
          currentCursor,
          state.startCursor,
        ),
      })
    },
    [state],
  )
  return {
    width,
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
