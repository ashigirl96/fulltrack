import React from 'react'

type Props = {
  pageCoord: { x: number; y: number }
}
export function PlaylistMenu({ pageCoord }: Props) {
  return (
    <ul
      className="absolute menu bg-base-100 w-56 p-2 rounded-box divider-y divide-blue-300"
      style={{ top: `${pageCoord.x}px`, left: `${pageCoord.y}px` }}
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
