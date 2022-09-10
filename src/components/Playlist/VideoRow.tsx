import { useVideoValue, VideoFirestoreId } from '@/atoms/firestore/video'
import { PlaylistStoreId } from '@/atoms/firestore/playlist'
import { useSetCurrentVideo } from '@/atoms/youtubePlayer'
import { secsToMS } from '@/lib/time'
import { VideoFirestore } from '@/types'

function useVideoDuration(video: VideoFirestore | null) {
  if (!video) {
    return '00:00'
  }
  return secsToMS(video.end - video.start)
}

type Props = {
  index: number
  videoId: VideoFirestoreId
  playlistId: PlaylistStoreId
}
export function VideoRow({ videoId, playlistId, index }: Props) {
  const video = useVideoValue(videoId)
  const setCurrentVideo = useSetCurrentVideo(playlistId, videoId)
  const duration = useVideoDuration(video)

  if (!video) {
    return <div>loading..</div>
  }

  return (
    <tr className="group h-16 hover:bg-gray-500" onClick={setCurrentVideo}>
      <td>{index}</td>
      <td>
        <div className="flex gap-2">
          <img src={video.thumbnailUrl} className="object-cover h-12 w-12" />
          <div className="flex flex-col gap-1">
            <div className="group-hover:text-white cursor-default">
              {video.title}
            </div>
            <div className="group-hover:text-white text-xs">
              {video.artists.join(',')}
            </div>
          </div>
        </div>
      </td>
      <td className="group-hover:text-white">
        <a href={`https://youtube.com/watch?v=${video.videoId}`}>
          {video.originalTitle}
        </a>
      </td>
      <td>{duration}</td>
    </tr>
  )
}
