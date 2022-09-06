import { usePlaylist } from './usePlaylist'
import { useRecoilValue } from 'recoil'
import { videoState } from '@/atoms/firestore/video'
import React from 'react'
import YouTubePlayer from '@/components/shared/YouTubePlayer'
import { useCurrentVideoTerm } from '@/hooks/youtube_player'

type Props = {
  playlistId: string
}
export function Playlist({ playlistId }: Props) {
  const { completed, videoIds } = usePlaylist(playlistId)
  const videoTerm = useCurrentVideoTerm()

  if (!completed) {
    return <div>loading</div>
  }

  if (videoIds) {
    return (
      <div className="bg-blue-100">
        {videoTerm && <YouTubePlayer />}
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
