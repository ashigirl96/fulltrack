import { UserPlaylists, Playlists } from './Playlists'
import { useGetCurrentUserId } from '@/hooks/firebaseAuth'
import { CreateUserPlaylist } from './CreateUserPlaylist'

type Props = {
  width: number
}
export function Menu({ width }: Props) {
  const currentUserId = useGetCurrentUserId()
  return (
    <div className="flex-shrink flex flex-col" style={{ width }}>
      <div className="hero-content bg-amber-200">動画一覧</div>
      <CreateUserPlaylist currentUserId={currentUserId} />
      <div className="border border-gray-300 my-5 mx-4" />
      <div className="overflow-y-scroll flex-1">
        {currentUserId && <Playlists />}
        {currentUserId && <UserPlaylists userId={currentUserId} />}
      </div>
    </div>
  )
}
