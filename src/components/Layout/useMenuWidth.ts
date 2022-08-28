import { useMoveOnDrag } from './useMoveOnDrag'

export function useMenuWidth() {
  const { width, dragging, onPointerMove, onPointerUp, onPointerDown } =
    useMoveOnDrag(250)

  return {
    width,
    dragging,
    onPointerMove,
    onPointerUp,
    onPointerDown,
  }
}
