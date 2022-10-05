import { useCallback } from 'react'
import { userPlaylistDocRef } from '@/lib/firestore/playlist'
import { FieldValue, updateDoc } from '@firebase/firestore'
import { useGetCurrentUserId } from '@/hooks/firebaseAuth'
import { videoDocRef } from '@/lib/firestore/video'
import { PlaylistState } from '@/types'
import { removeFromArray } from '@/lib/array'

type Args = {
  videoIndex: number
  playlist: PlaylistState
}
export function useRemovePlaylistVideos({ videoIndex, playlist }: Args) {
  const userId = useGetCurrentUserId()
  return useCallback(async () => {
    if (userId) {
      const playlistRef = userPlaylistDocRef(userId, playlist.id)
      const videoIds = removeFromArray(playlist.videoIds, videoIndex).map((v) =>
        videoDocRef(v),
      ) as unknown as FieldValue[]
      await updateDoc(playlistRef, { videoIds })
    }
  }, [playlist.id, playlist.videoIds, userId, videoIndex])
}
