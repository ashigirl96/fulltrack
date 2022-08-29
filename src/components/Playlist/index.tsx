import { usePlaylist } from './usePlaylist'
import { useRecoilValue } from 'recoil'
import { videoState } from '@/atoms/firestore/video'

type Props = {
  playlistId: string
}
export function Playlist({ playlistId }: Props) {
  const { completed, videoIds } = usePlaylist(playlistId)

  if (!completed) {
    return <div>loading</div>
  }

  if (videoIds) {
    return (
      <div>
        {videoIds.map((videoId) => (
          <VideoItem videoId={videoId} />
        ))}
      </div>
    )
  }

  return <div>Hello</div>
}

type VideoItemProps = {
  videoId: string
}
export function VideoItem({ videoId }: VideoItemProps) {
  const video = useRecoilValue(videoState(videoId))

  if (!video) {
    return <div>loading..</div>
  }

  return <div>{video.title}</div>
}
