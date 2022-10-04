import React, { useCallback } from 'react'
import { useDeleteUserPlaylistCollection } from '@/hooks/playlist'
import { PlaylistStoreId } from '@/atoms/firestore/playlist'
import { useRouter } from 'next/router'
import { useSetIsEditPlaylistName } from '@/atoms/contextMenu/states'
import { useGetCurrentUserId } from '@/hooks/firebaseAuth'
import { UserId } from '@/types'
import { useCreateUserPlaylist } from '@/hooks/playlist/useCreateUserPlaylist'

type Props = {
  playlistId: PlaylistStoreId
}
export function PlaylistMenu({ playlistId }: Props) {
  const router = useRouter()
  const deleteUserPlaylist = useDeleteUserPlaylistCollection(playlistId)
  const handleClickDelete = useCallback(async () => {
    await deleteUserPlaylist()
    const currentPlaylistId = router.query['playlistId']
    // 削除したパスと同じだった場合、ルートに飛ばす
    if (currentPlaylistId && currentPlaylistId === playlistId) {
      await router.push(`/playlists/list`)
    }
  }, [deleteUserPlaylist, playlistId, router])

  const handleRename = useSetIsEditPlaylistName(playlistId)
  const currentUserId = useGetCurrentUserId()

  return (
    <>
      <li>
        <button onClick={handleClickDelete}>削除</button>
      </li>
      <li>
        <button onClick={handleRename}>名前を変更する</button>
      </li>
      {currentUserId && <CreatePlaylist currentUserId={currentUserId} />}
    </>
  )
}

type CreateProps = { currentUserId: UserId }
function CreatePlaylist({ currentUserId }: CreateProps) {
  const handleClick = useCreateUserPlaylist({ userId: currentUserId })
  return (
    <li>
      <button onClick={handleClick}>プレイリストを作成する</button>
    </li>
  )
}
