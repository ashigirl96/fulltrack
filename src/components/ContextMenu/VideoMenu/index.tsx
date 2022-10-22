import React from 'react'
import { VideoFirestoreId } from '@/atoms/firestore/video'
import { useGetCurrentUserId } from '@/hooks/firebaseAuth'
import { ListAddPlaylist } from './ListAddPlaylist'
import { ListDeleteVideo } from './ListDeleteVideo'

type Props = {
  videoId: VideoFirestoreId
  videoTitle: string
  videoIndex: number
}
export function VideoMenu({ videoId, videoTitle, videoIndex }: Props) {
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
        userId={currentUserId}
        videoId={videoId}
        videoTitle={videoTitle}
      />
      <ListDeleteVideo videoIndex={videoIndex} />
    </>
  )
}
