import React from 'react'
import { usePlaylist } from './usePlaylist'
import { VideoRow } from './VideoRow'
import { PlaylistStoreId } from '@/atoms/firestore/playlist'
import { SetReadyEventStateType } from '@/hooks/youtube_player'

type Props = {
  playlistId: PlaylistStoreId
  readyEvent: SetReadyEventStateType[0]
}
export function Playlist({ playlistId, readyEvent }: Props) {
  const { completed, videoIds } = usePlaylist(playlistId)

  if (!completed) {
    return <div>loading</div>
  }

  if (videoIds) {
    return (
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">#</th>
            <th className="text-left">タイトル</th>
            <th className="text-left">オリジナルタイトル</th>
            <th className="text-left">再生時間</th>
          </tr>
        </thead>
        <tbody>
          {videoIds.map((videoId, index) => (
            <VideoRow
              key={`${videoId}-${index}`}
              videoId={videoId}
              playlistId={playlistId}
              readyEvent={readyEvent}
              index={index}
            />
          ))}
        </tbody>
      </table>
    )
  }

  return <div>Hello</div>
}
