import { useCallback } from 'react'
import { PlaylistStore, UserId } from '@/types'
import { playlistDocRef } from '@/lib/firestore/playlist'
import { updateDoc } from '@firebase/firestore'
import { VideoDocRef, videoDocRef } from '@/lib/firestore/video'

type Args = {
  userId: UserId
  videoIds: VideoDocRef[]
  playlist: PlaylistStore
}
export function useUnionPlaylistVideo({ userId, videoIds, playlist }: Args) {
  return useCallback(async () => {
    const playlistRef = playlistDocRef(userId, playlist.id)
    // TODO: refactor
    const _videoIds = [
      ...playlist.videoIds.map((v) => videoDocRef(v)),
      ...videoIds,
    ]
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    await updateDoc(playlistRef, { videoIds: _videoIds })
  }, [playlist.id, playlist.videoIds, userId, videoIds])
}
