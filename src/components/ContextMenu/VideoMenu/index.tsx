import React from 'react'
import { VideoFirestoreId } from '@/atoms/firestore/video'
import { useGetCurrentUserId } from '@/hooks/firebaseAuth'
import { ListAddPlaylist } from './ListAddPlaylist'
import { ListDeleteVideo } from './ListDeleteVideo'
import { ReturnTypePosition } from '@/components/ContextMenu/usePosition'

type Props = {
  videoId: VideoFirestoreId
  videoTitle: string
  videoIndex: number
} & Pick<ReturnTypePosition, 'position'>
export function VideoMenu({
  videoId,
  videoTitle,
  videoIndex,
  position,
}: Props) {
  const currentUserId = useGetCurrentUserId()
  if (!currentUserId) {
    return (
      <li>
        <button>ログインしないと、操作できません</button>
      </li>
    )
  }
  return (
    <>
      <ListAddPlaylist
        position={position}
        userId={currentUserId}
        videoId={videoId}
        videoTitle={videoTitle}
      />
      <ListDeleteVideo videoIndex={videoIndex} />
    </>
  )
}
