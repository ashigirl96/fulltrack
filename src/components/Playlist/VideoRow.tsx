import { VideoFirestoreId } from '@/atoms/firestore/video'
import { useVideoState } from '@/hooks/video/useVideoState'
import { PlaylistStoreId } from '@/atoms/firestore/playlist'
import { useSetCurrentVideo } from '@/atoms/youtubePlayer'

type Props = {
  index: number
  videoId: VideoFirestoreId
  playlistId: PlaylistStoreId
}
export function VideoRow({ videoId, playlistId, index }: Props) {
  const video = useVideoState(videoId)
  const setCurrentVideo = useSetCurrentVideo(playlistId, videoId)

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
            <div className="group-hover:text-white">{video.title}</div>
            <div className="group-hover:text-white text-xs">
              {video.artists.join(',')}
            </div>
          </div>
        </div>
      </td>
      <td className="group-hover:text-white">{video.originalTitle}</td>
      <td>4:00</td>
    </tr>
  )
}
