import { UserPlaylists } from './Playlists'
import { useGetCurrentUserId } from '@/hooks/firebaseAuth'
import { CreateUserPlaylist, SignIn } from './CreateUserPlaylist'
import Link from 'next/link'

type Props = {
  width: number
}
export function Menu({ width }: Props) {
  const currentUserId = useGetCurrentUserId()
  return (
    <div className="flex-shrink flex flex-col" style={{ width }}>
      <div className="flex flex-col gap-1 m-4">
        <div className="" key="playlist">
          <Link href="/playlists/list" shallow={true}>
            <a>動画一覧</a>
          </Link>
        </div>
        {currentUserId ? (
          <CreateUserPlaylist currentUserId={currentUserId} />
        ) : (
          <SignIn />
        )}
      </div>
      <div className="border border-2 border-gray-700" />
      <div className="overflow-y-scroll flex-1 flex flex-col gap-1 m-4">
        {currentUserId && <UserPlaylists userId={currentUserId} />}
      </div>
    </div>
  )
}
