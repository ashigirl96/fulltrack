import React, { useCallback } from 'react'
import { useDeleteUserPlaylistCollection } from '@/hooks/playlist'
import { PlaylistStoreId } from '@/atoms/firestore/playlist'
import { useRouter } from 'next/router'

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
  return (
    <>
      <li>
        <button onClick={handleClickDelete}>削除</button>
      </li>
      <li>
        <a>名前を変更</a>
      </li>
      <li>
        <a>プレイリストを作成する</a>
      </li>
    </>
  )
}
