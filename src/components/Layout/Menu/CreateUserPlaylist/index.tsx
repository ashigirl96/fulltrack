import { useCallback } from 'react'
import { addDoc, collection } from '@firebase/firestore'
import { db } from '@/config/firebase'
import { UserId } from '@/types'

type Props = {
  currentUserId: UserId | null
}
export function CreateUserPlaylist({ currentUserId }: Props) {
  const addPlaylist = useCallback(async () => {
    if (!currentUserId) {
      return
    }
    const playlists = collection(db, 'users', currentUserId, 'playlists')
    await addDoc(playlists, {
      title: 'My Playlist',
      videoIds: [],
    })
  }, [currentUserId])

  return (
    <div className="">
      <button onClick={addPlaylist}>プレイリストを作成する</button>
    </div>
  )
}
