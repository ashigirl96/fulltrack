import { useUserPlaylists } from './usePlaylists'
import { PlaylistItem } from './PlaylistItem'
import Link from 'next/link'
import { UserId } from '@/types'
import { useSetSelectedContext } from '@/atoms/contextMenu'

type Props = {
  userId: UserId
}
export function UserPlaylists({ userId }: Props) {
  const { playlists, isLoading, error } = useUserPlaylists(userId)
  const setSelectedPlaylist = useSetSelectedContext()

  if (error) {
    return <div>{JSON.stringify(error)}</div>
  }
  if (isLoading) {
    return <div>Loading</div>
  }
  if (!playlists) {
    return <div>Please login...</div>
  }
  return (
    <div>
      {playlists.map((playlist) => {
        return (
          <div
            key={`playlist-${playlist.id}`}
            onContextMenu={(e) => {
              e.preventDefault()
              setSelectedPlaylist({ type: 'playlist', playlistId: playlist.id })
            }}
          >
            <Link href={`/playlists/${encodeURIComponent(playlist.id)}`}>
              <a>
                <PlaylistItem playlist={playlist} isOfficial={false} />
              </a>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

// export function Playlists() {
//   const { playlists, isLoading, error } = usePlaylists()
//   if (error) {
//     return <div>{JSON.stringify(error)}</div>
//   }
//   if (isLoading) {
//     return <div>Loading</div>
//   }
//   if (!playlists) {
//     return <div>Please login...</div>
//   }
//   return (
//     <div>
//       {playlists.map((playlist) => {
//         return (
//           <div key={`playlist-${playlist.id}`}>
//             <Link href={`/playlists/${encodeURIComponent(playlist.id)}`}>
//               <a>
//                 <PlaylistItem playlist={playlist} isOfficial={true} />
//               </a>
//             </Link>
//           </div>
//         )
//       })}
//     </div>
//   )
// }
