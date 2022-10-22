import { AlbumFireStoreId } from '@/atoms/firestore/album'
import { useGetCurrentUserId } from '@/hooks/firebaseAuth'
import React from 'react'
import { ListAddPlaylist } from '@/components/ContextMenu/AlbumMenu/ListAddPlaylist'

type Props = {
  albumId: AlbumFireStoreId
}
export function AlbumMenu({ albumId }: Props) {
  const currentUserId = useGetCurrentUserId()
  if (!currentUserId) {
    return (
      <li>
        <button>ログインしないと、操作できません</button>
      </li>
    )
  }
  return <ListAddPlaylist albumId={albumId} userId={currentUserId} />
}
