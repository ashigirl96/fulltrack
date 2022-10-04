import React from 'react'
import { VideoFirestoreId } from '@/atoms/firestore/video'
import { useGetCurrentUserId } from '@/hooks/firebaseAuth'
import { ListAddPlaylist } from './ListAddPlaylist'

type Props = {
  videoId: VideoFirestoreId
}
export function VideoMenu({ videoId }: Props) {
  const currentUserId = useGetCurrentUserId()
  return (
    <>
      {currentUserId && (
        <ListAddPlaylist userId={currentUserId} videoId={videoId} />
      )}
      <li>
        <button>プレイリストから削除</button>
      </li>
    </>
  )
}
