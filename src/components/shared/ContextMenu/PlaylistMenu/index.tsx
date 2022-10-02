import React from 'react'
import { useDeleteUserPlaylistCollection } from '@/hooks/playlist'
import { PlaylistStoreId } from '@/atoms/firestore/playlist'

type Props = {
  playlistId: PlaylistStoreId
}
export function PlaylistMenu({ playlistId }: Props) {
  const deleteUserPlaylist = useDeleteUserPlaylistCollection(playlistId)
  // TODO: 削除されるプレイリストにいるとき、/listに遷移する
  return (
    <>
      <li>
        <button onClick={deleteUserPlaylist}>削除</button>
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
