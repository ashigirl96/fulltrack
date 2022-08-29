import { videoState } from '@/atoms/firestore/video'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import { playlistState } from '@/atoms/firestore/playlist'
import { getDocsByIds } from '@/lib/firestore/getDocsByIds'
import { videoCollection } from '@/lib/firestore/video'
import { useEffect, useState } from 'react'

export function usePlaylist(playlistId: string) {
  const playlist = useRecoilValue(playlistState(playlistId))
  const initializeVideoSelector = useRecoilCallback(
    ({ set, snapshot }) =>
      async () => {
        if (playlist) {
          const unFetchedVideoIds = []
          for (const videoId of playlist.videoIds) {
            const video = await snapshot.getPromise(videoState(videoId))
            if (!video) {
              unFetchedVideoIds.push(videoId)
            }
          }
          const unFetchedVideos = await getDocsByIds(
            videoCollection,
            unFetchedVideoIds,
          )
          unFetchedVideos.forEach((video) => {
            set(videoState(video.id), video)
          })
        }
      },
    [playlist],
  )

  const [completed, setCompleted] = useState(false)
  useEffect(() => {
    initializeVideoSelector().then(() => setCompleted(true))
  }, [initializeVideoSelector])

  return {
    completed,
    videoIds: playlist?.videoIds,
  }
}
