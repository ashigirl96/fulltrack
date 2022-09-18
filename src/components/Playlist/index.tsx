import React from 'react'
import { usePlaylist } from './usePlaylist'
import { VideoRow } from './VideoRow'
import { PlaylistTitle } from './PlaylistTitle'

import { PlaylistStoreId } from '@/atoms/firestore/playlist'
import { SetReadyEventStateType } from '@/hooks/youtube_player'

type Props = {
  playlistId: PlaylistStoreId
  readyEvent: SetReadyEventStateType[0]
}
export function Playlist({ playlistId, readyEvent }: Props) {
  const { completed, playlist, indexSelected, setIndexSelected } =
    usePlaylist(playlistId)

  if (!completed) {
    return <div>loading</div>
  }

  if (playlist) {
    return (
      <div className="max-w-full px-4 relative" tabIndex={0}>
        <PlaylistTitle playlist={playlist} />
        <div
          className="mb-[16] sticky top-0 bg-primary text-primary-content z-10"
          tabIndex={2}
        >
          <div className="grid-playlist">
            <div className="justify-self-end">#</div>
            <div>タイトル</div>
            <div className="md-hidden">オリジナルタイトル</div>
            <div className="justify-self-end">再生時間</div>
          </div>
        </div>

        <div className="h-[2296px]">
          <div className="translate-y-0">
            {playlist.videoIds.map((videoId, index) => (
              <VideoRow
                key={`${videoId}-${index}`}
                videoId={videoId}
                playlistId={playlistId}
                readyEvent={readyEvent}
                index={index}
                indexSelected={indexSelected}
                setIndexSelected={setIndexSelected}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
  return <div>Hello</div>
}
