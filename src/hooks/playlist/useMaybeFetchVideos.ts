import { VideoFirestoreId, videoState } from '@/atoms/firestore/video'
import { videoCollectionRef } from '@/lib/firestore/video'
import { useAsync } from '@/hooks/react-use/useAsync'
import { VideoFirestore } from '@/types'
import { useRecoilSnapshot } from 'recoil'
import { getDocsByIds } from '@/lib/firestore/getDocsByIds'

export function useMaybeFetchVideos(videoIds: VideoFirestoreId[] | undefined) {
  const snapshot = useRecoilSnapshot()

  const result = useAsync(async () => {
    const videos: VideoFirestore[] = []
    if (!videoIds) {
      return videos
    }
    const unFetchedVideoIds = []
    for (const videoId of videoIds) {
      const video = await snapshot.getPromise(videoState(videoId))
      if (video) {
        videos.push(video)
      } else {
        unFetchedVideoIds.push(videoId)
      }
    }
    const unFetchedVideos = await getDocsByIds(
      videoCollectionRef,
      unFetchedVideoIds,
    )
    // const x = [...videos, ...unFetchedVideos]

    return [...videos, ...unFetchedVideos]
  }, [videoIds])

  return {
    ...result,
    videos: result.value,
  }
}
