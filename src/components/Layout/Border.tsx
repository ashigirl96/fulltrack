import type { ReturnTypeOfUseMoveOnDrag } from './useMoveOnDrag'

type Props = ReturnTypeOfUseMoveOnDrag
export function Border({ onPointerMove, onPointerUp, onPointerDown }: Props) {
  return (
    <div
      className="cursor-ew-resize border border-2 border-gray-700"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    />
  )
}
