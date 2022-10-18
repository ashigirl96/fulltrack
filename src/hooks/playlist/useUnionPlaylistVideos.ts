import { useCallback } from 'react'
import { PlaylistStore } from '@/types'
import { playlistDocRef } from '@/lib/firestore/playlist'
import { FieldValue, updateDoc } from '@firebase/firestore'
import { useGetCurrentUserId } from '@/hooks/firebaseAuth'
import { videoDocRef } from '@/lib/firestore/video'

type Args = {
  videoId: string
  playlist: PlaylistStore
}
export function useUnionPlaylistVideos({ videoId, playlist }: Args) {
  const userId = useGetCurrentUserId()
  return useCallback(async () => {
    if (userId) {
      const playlistRef = playlistDocRef(userId, playlist.id)
      // TODO: refactor
      const videoIds = [
        ...playlist.videoIds.map((v) => videoDocRef(v)),
        videoDocRef(videoId),
      ] as unknown as FieldValue[]
      await updateDoc(playlistRef, { videoIds })
    }
  }, [playlist, userId, videoId])
}
