import { collection, doc, getDocs, query, where } from '@firebase/firestore'
import { db } from '@/config/firebase'
import { playlistConverter } from './converter'
import { Playlist } from '@/types'

function userDocument(userId: string) {
  return doc(db, 'users', userId)
}

export async function fetchPlaylistByUserId(
  userId: string,
): Promise<Playlist[]> {
  const userDocRef = userDocument(userId)
  const playlistCollectionRef = collection(db, 'playlists').withConverter(
    playlistConverter,
  )
  const playlistQuery = query(
    playlistCollectionRef,
    where('user', '==', userDocRef),
  )
  console.log(`getDocs(playlistQuery)`)
  const _playlists = await getDocs(playlistQuery)

  return _playlists.docs.map((playlist) => {
    const { id, title, videos, user } = playlist.data()
    const userId = user.id
    const videoIds = videos.map((video) => video.id)
    return {
      id,
      title,
      userId,
      videoIds,
    }
  })
}
