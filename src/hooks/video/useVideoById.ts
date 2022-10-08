import { getDoc } from '@firebase/firestore'
import { videoDocRef } from '@/lib/firestore/video'
import { VideoFirestoreId } from '@/atoms/firestore/video'
import { useAsync } from '@/hooks/react-use/useAsync'

export function useVideoById(videoId: VideoFirestoreId) {
  const result = useAsync(
    async () => (await getDoc(videoDocRef(videoId))).data(),
    [videoId],
  )
  if (result.isLoading || !result.value) {
    return undefined
  }
  if (result.error) {
    return undefined
  }
  return result.value
}
