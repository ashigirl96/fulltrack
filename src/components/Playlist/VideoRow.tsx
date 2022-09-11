import { useVideoValue, VideoFirestoreId } from '@/atoms/firestore/video'
import { PlaylistStoreId } from '@/atoms/firestore/playlist'
import { useSetCurrentVideo } from '@/atoms/youtubePlayer/hooks'
import { secsToMS } from '@/lib/time'
import { VideoFirestore } from '@/types'
import { SetReadyEventStateType } from '@/hooks/youtube_player'
import React from 'react'

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
  readyEvent: SetReadyEventStateType[0]
}
export function VideoRow({ videoId, playlistId, index, readyEvent }: Props) {
  const video = useVideoValue(videoId)
  const setCurrentVideo = useSetCurrentVideo(playlistId, videoId, readyEvent)
  const duration = useVideoDuration(video)

  if (!video) {
    return <div>loading..</div>
  }

  return (
    <div
      role="row"
      className="group hover:bg-gray-500 h-14 grid-playlist"
      onClick={setCurrentVideo}
    >
      <div className="flex justify-self-end items-center">{index + 1}</div>
      <div className="flex justify-self-start items-center">
        <div className="ellipsis-one-line">
          <div className="flex gap-2">
            <img src={video.thumbnailUrl} className="object-cover h-12 w-12" />
            <div className="flex flex-col gap-1">
              <div className="group-hover:text-white cursor-default">
                <span className="ellipsis-one-line">{video.title}</span>
              </div>
              <div className="group-hover:text-white text-xs ellipsis-one-line">
                {video.artists.join(',')}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md-hidden">
        <div className="flex justify-self-start items-center">
          <a
            href={`https://youtube.com/watch?v=${video.videoId}`}
            className="ellipsis-one-line"
          >
            {video.originalTitle}
          </a>
        </div>
      </div>
      <div className="flex justify-self-end items-center">{duration}</div>
    </div>
  )
}
