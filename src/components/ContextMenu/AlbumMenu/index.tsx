import { AlbumFireStoreId } from '@/atoms/firestore/album'
import { useGetCurrentUserId } from '@/hooks/firebaseAuth'
import React from 'react'
import { ListAddPlaylist } from '@/components/ContextMenu/AlbumMenu/ListAddPlaylist'
import { ReturnTypePosition } from '@/components/ContextMenu/usePosition'

type Props = {
  albumId: AlbumFireStoreId
} & Pick<ReturnTypePosition, 'position'>
export function AlbumMenu({ albumId, position }: Props) {
  const currentUserId = useGetCurrentUserId()
  if (!currentUserId) {
    return (
      <li>
        <button>ログインしないと、操作できません</button>
      </li>
    )
  }
  return (
    <ListAddPlaylist
      albumId={albumId}
      userId={currentUserId}
      position={position}
    />
  )
}
