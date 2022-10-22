import { useCallback } from 'react'
import { PlaylistStore, UserId } from '@/types'
import { playlistDocRef } from '@/lib/firestore/playlist'
import { FieldValue, updateDoc, WithFieldValue } from '@firebase/firestore'
import { videoDocRef } from '@/lib/firestore/video'

type Args = {
  userId: UserId
  videoIds: WithFieldValue<string[]>
  playlist: PlaylistStore
}
export function useUnionPlaylistVideo({ userId, videoIds, playlist }: Args) {
  return useCallback(async () => {
    const playlistRef = playlistDocRef(userId, playlist.id)
    // TODO: refactor
    const _videoIds = [
      ...playlist.videoIds.map((v) => videoDocRef(v)),
      ...videoIds,
    ] as unknown as FieldValue[]
    await updateDoc(playlistRef, { videoIds: _videoIds })
  }, [playlist.id, playlist.videoIds, userId, videoIds])
}
