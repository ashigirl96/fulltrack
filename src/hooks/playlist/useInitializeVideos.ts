import { videoState } from '@/atoms/firestore/video'
import { useRecoilCallback } from 'recoil'
import { getDocsByIds } from '@/lib/firestore/getDocsByIds'
import { videoCollectionRef } from '@/lib/firestore/video'
import { useEffect, useState } from 'react'
import { PlaylistStore } from '@/types'

// TODO: リファクタリング
export function useInitializeVideos(playlist: PlaylistStore) {
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
            videoCollectionRef,
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

  return { completed }
}
