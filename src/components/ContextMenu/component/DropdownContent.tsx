import React from 'react'
import { useCreatePlaylist } from '@/hooks/playlist/useCreatePlaylist'
import { UserId } from '@/types'
import { VideoDocRef } from '@/lib/firestore/video'

type Props = {
  children: React.ReactNode
  userId: UserId
  videoIds: VideoDocRef[]
  title: string
}
export function DropdownContent({ children, videoIds, title, userId }: Props) {
  const handleClick = useCreatePlaylist({
    userId,
    videoIds,
    title,
  })
  return (
    <ul
      tabIndex={0}
      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 divide-y ring-1 ring-opacity-5 min-w-fit"
    >
      <li>
        <button onClick={handleClick}>プレイリストを作成する</button>
      </li>
      <div>{children}</div>
    </ul>
  )
}
