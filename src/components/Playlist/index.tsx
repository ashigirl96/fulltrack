import React from 'react'
import { usePlaylist } from './usePlaylist'
import { VideoItem } from './VideoItem'
import { PlaylistStoreId } from '@/atoms/firestore/playlist'

type Props = {
  playlistId: PlaylistStoreId
}
export function Playlist({ playlistId }: Props) {
  const { completed, videoIds } = usePlaylist(playlistId)

  if (!completed) {
    return <div>loading</div>
  }

  if (videoIds) {
    return (
      <div className="bg-blue-100">
        {videoIds.map((videoId, index) => (
          <VideoItem
            key={`${videoId}-${index}`}
            videoId={videoId}
            playlistId={playlistId}
          />
        ))}
      </div>
    )
  }

  return <div>Hello</div>
}
