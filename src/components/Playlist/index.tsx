import { usePlaylist } from './usePlaylist'
import { useRecoilValue } from 'recoil'
import { videoState } from '@/atoms/firestore/video'
import React from 'react'
import dynamic from 'next/dynamic'
const YouTubePlayer = dynamic(
  () => import('@/components/shared/YouTubePlayer'),
  { ssr: false },
)

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
      <div className="bg-blue-500">
        <YouTubePlayer />
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

  return (
    <div>
      {video.title}/{video.videoId}
    </div>
  )
}
