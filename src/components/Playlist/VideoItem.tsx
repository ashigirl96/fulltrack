import { VideoFirestoreId } from '@/atoms/firestore/video'
import { useVideoState } from '@/hooks/video/useVideoState'
import { PlaylistStoreId } from '@/atoms/firestore/playlist'
import { useSetCurrentVideo } from '@/atoms/youtubePlayer'

type Props = {
  videoId: VideoFirestoreId
  playlistId: PlaylistStoreId
}
export function VideoItem({ videoId, playlistId }: Props) {
  const video = useVideoState(videoId)
  const setCurrentVideo = useSetCurrentVideo(playlistId, videoId)

  if (!video) {
    return <div>loading..</div>
  }

  return (
    <div onClick={setCurrentVideo}>
      {video.title}/{video.videoId}
    </div>
  )
}
