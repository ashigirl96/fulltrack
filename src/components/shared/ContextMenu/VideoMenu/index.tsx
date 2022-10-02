import React from 'react'
import { useDeleteUserPlaylistCollection } from '@/hooks/playlist'
import { VideoFirestoreId } from '@/atoms/firestore/video'

type Props = {
  videoId: VideoFirestoreId
}
export function VideoMenu({ videoId }: Props) {
  const deleteUserPlaylist = useDeleteUserPlaylistCollection(videoId)
  return (
    <>
      <li>
        <button onClick={deleteUserPlaylist}>削除</button>
      </li>
      <li>
        <a>名前を変更</a>
      </li>
    </>
  )
}
