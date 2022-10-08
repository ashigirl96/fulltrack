import { VideoFirestoreId } from '@/atoms/firestore/video'
import { videoDocRef } from '@/lib/firestore/video'
import { useAsync } from '@/hooks/react-use/useAsync'
import { getDoc } from '@firebase/firestore'
import { VideoFirestore } from '@/types'

// TODO: まだ取ってきてないvideo一覧を取ってくる
export function useMaybeFetchVideos(videoIds: VideoFirestoreId[] | undefined) {
  const result = useAsync(async () => {
    const videos: VideoFirestore[] = []
    if (!videoIds) {
      return videos
    }
    for (const videoId of videoIds) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      videos.push((await getDoc(videoDocRef(videoId))).data()!)
    }
    return videos
  }, [videoIds])

  return {
    ...result,
    videos: result.value,
  }
}
