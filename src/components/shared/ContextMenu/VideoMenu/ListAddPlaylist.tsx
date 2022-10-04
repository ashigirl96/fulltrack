import { UserId } from '@/types'
import { useUserPlaylistCollection } from '@/hooks/playlist'
import { VideoFirestoreId } from '@/atoms/firestore/video'
import { useUpdatePlaylistVideos } from '@/hooks/playlist/useUpdatePlaylistVideos'

type Props = {
  userId: UserId
  videoId: VideoFirestoreId
}
export function ListAddPlaylist({ userId, videoId }: Props) {
  const { isLoading, error, playlists } = useUserPlaylistCollection(userId)
  const handleClick = useUpdatePlaylistVideos({ videoId })
  return (
    <li className="dropdown dropdown-right dropdown-end dropdown-open">
      <label tabIndex={0}>プレイリストに追加</label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {!isLoading && !error && (
          <>
            {playlists?.map((playlist) => (
              <li>
                <button onClick={() => handleClick(playlist.id)}>
                  {playlist.title}
                </button>
              </li>
            ))}
          </>
        )}
      </ul>
    </li>
  )
}
