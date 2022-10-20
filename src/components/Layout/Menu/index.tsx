import { Playlists } from './Playlists'
import { useGetCurrentUserId } from '@/hooks/firebaseAuth'
import { CreatePlaylist, SignIn } from './CreatePlaylist'
import Link from 'next/link'

type Props = {
  width: number
}
export function Menu({ width }: Props) {
  const currentUserId = useGetCurrentUserId()
  return (
    <div className="flex-shrink flex flex-col drawer-side" style={{ width }}>
      <ul className="menu p-4 overflow-y-auto bg-base-100 text-base-content flex flex-col">
        <li>
          <Link href="/" shallow={true}>
            <a>動画一覧</a>
          </Link>
        </li>
        <li>
          {currentUserId ? (
            <CreatePlaylist currentUserId={currentUserId} />
          ) : (
            <SignIn />
          )}
        </li>
        <div className="border border-2 border-gray-700 w-full my-4" />
        <ul className="overflow-y-scroll flex-1 hidden-scrollbar">
          {currentUserId && <Playlists userId={currentUserId} />}
        </ul>
      </ul>
    </div>
  )
}
