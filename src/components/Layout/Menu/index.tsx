import { UserPlaylists, Playlists } from './Playlists'
import { useGetCurrentUserId } from '@/hooks/firebaseAuth'

type Props = {
  width: number
}
export function Menu({ width }: Props) {
  const currentUserId = useGetCurrentUserId()
  return (
    <div className="flex-shrink flex flex-col" style={{ width }}>
      <div className="hero-content bg-amber-200">動画一覧</div>
      <div className="hero-content bg-amber-200">プレイリストを作成する</div>
      <div className="border border-gray-300 my-5 mx-4" />
      <div className="overflow-y-scroll flex-1">
        {currentUserId && <Playlists />}
        {currentUserId && <UserPlaylists userId={currentUserId} />}
      </div>
    </div>
  )
}
