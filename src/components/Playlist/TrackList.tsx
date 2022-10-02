import { PlaylistState } from '@/types'
import { PlaylistTitle } from '@/components/Playlist/PlaylistTitle'
import { VideoRow } from '@/components/Playlist/VideoRow'
import type { ReturnTypeUsePlaylist } from '@/components/Playlist/usePlaylist'
import type { ReturnTypeReadyEventStateType } from '@/hooks/youtube_player'
import type { PlaylistStoreId } from '@/atoms/firestore/playlist'

export type TrackListProps = Pick<
  ReturnTypeUsePlaylist,
  'setIndexSelected' | 'indexSelected'
> & {
  playlistId: PlaylistStoreId
  playlist: PlaylistState
  readyEvent: ReturnTypeReadyEventStateType['readyEvent']
}
export function TrackList({
  playlistId,
  playlist,
  setIndexSelected,
  readyEvent,
  indexSelected,
}: TrackListProps) {
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

      <div className="max-h-[2296px]">
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
