import { UserPlaylists } from './Playlists'
import { useGetCurrentUserId } from '@/hooks/firebaseAuth'
import { CreateUserPlaylist } from './CreateUserPlaylist'
import Link from 'next/link'

type Props = {
  width: number
}
export function Menu({ width }: Props) {
  const currentUserId = useGetCurrentUserId()
  return (
    <div className="flex-shrink flex flex-col" style={{ width }}>
      <div className="" key="playlist">
        <Link href="/playlists/list" shallow={true}>
          <a>動画一覧</a>
        </Link>
      </div>
      <CreateUserPlaylist currentUserId={currentUserId} />
      <div className="border border-gray-300 my-5 mx-4" />
      <div className="overflow-y-scroll flex-1">
        {currentUserId && <UserPlaylists userId={currentUserId} />}
      </div>
    </div>
  )
}
