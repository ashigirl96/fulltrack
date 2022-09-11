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
      <div className="" tabIndex={0}>
        <div style={{ top: '64px' }} className="-mx-[32px] mb-[16] px-[32px]">
          <div className="grid-playlist">
            <div className="justify-self-end">#</div>
            <div>タイトル</div>
            <div>オリジナルタイトル</div>
            <div>再生時間</div>
          </div>
        </div>

        <div className="h-[2296px]">
          <div className="translate-y-0">
            {videoIds.map((videoId, index) => (
              <VideoRow
                key={`${videoId}-${index}`}
                videoId={videoId}
                playlistId={playlistId}
                readyEvent={readyEvent}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return <div>Hello</div>
}
