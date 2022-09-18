import { usePlaylist } from './usePlaylist'
import { TrackList } from './TrackList'
import { OfficialTracks } from './OfficialTracks'

import type { TrackListProps } from './TrackList'

// プレイリストに遷移したときに、video一覧を取得してレンダリングする
type Props = Pick<TrackListProps, 'playlistId' | 'readyEvent'>
export function PlaylistWrapper({ playlistId, readyEvent }: Props) {
  const { completed, playlist, indexSelected, setIndexSelected } =
    usePlaylist(playlistId)

  if (!completed) {
    return <div>loading</div>
  }

  if (playlist) {
    return (
      <TrackList
        playlistId={playlistId}
        readyEvent={readyEvent}
        playlist={playlist}
        indexSelected={indexSelected}
        setIndexSelected={setIndexSelected}
      />
    )
  }
  return <OfficialTracks />
}
