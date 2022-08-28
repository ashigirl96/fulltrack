import type { ReturnTypeOfUseMoveOnDrag } from './useMoveOnDrag'

type Props = ReturnTypeOfUseMoveOnDrag
export function Border({ onPointerMove, onPointerUp, onPointerDown }: Props) {
  return (
    <div
      className="w-0.5 cursor-ew-resize"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    />
  )
}
