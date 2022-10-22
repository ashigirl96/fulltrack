import React, { useMemo } from 'react'
import { useCreatePlaylist } from '@/hooks/playlist/useCreatePlaylist'
import { UserId } from '@/types'
import { VideoDocRef } from '@/lib/firestore/video'

type Props = {
  position: 'left' | 'right'
  end?: boolean
  children: React.ReactNode
}
export function Dropdown({ position, end = false, children }: Props) {
  const dropEnd = useMemo(() => (end ? 'dropdown-end' : ''), [end])
  return (
    <div
      className={`dropdown dropdown-${position} ${dropEnd} hover:dropdown-open`}
    >
      <label tabIndex={0}>プレイリストに追加</label>
      {children}
    </div>
  )
}

Dropdown.Content = DropdownContent

type ContentProps = {
  children: React.ReactNode
  userId: UserId
  videoIds: VideoDocRef[]
  title: string
}
function DropdownContent({ children, videoIds, title, userId }: ContentProps) {
  const handleClick = useCreatePlaylist({
    userId,
    videoIds,
    title,
  })
  return (
    <ul
      tabIndex={0}
      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 divide-y ring-1 ring-opacity-5 w-max"
    >
      <li>
        <button onClick={handleClick}>プレイリストを作成する</button>
      </li>
      <div>{children}</div>
    </ul>
  )
}
